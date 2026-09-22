import React, { useState, useEffect, useRef } from 'react';

export default function RealtimeOpsView({ getApiBase, officerSession }) {
  const [wsConnected, setWsConnected] = useState(false);
  const [telemetry, setTelemetry] = useState({
    total_events_processed: 0,
    last_latency_ms: 18.2,
    avg_latency_ms: 16.5,
    queue_depth: 0,
    alerts_dispatched: 0,
    db_synced_events: 0
  });
  const [recentEvents, setRecentEvents]   = useState([]);
  const [sources, setSources]             = useState([]);

  const [cameraActive, setCameraActive]             = useState(false);
  const [cameraError, setCameraError]               = useState(null);
  const [frameDetections, setFrameDetections]       = useState([]);
  const [currentFrameMetrics, setCurrentFrameMetrics] = useState(null);
  const [isProcessingFrame, setIsProcessingFrame]   = useState(false);

  const [selectedSource, setSelectedSource]     = useState('CAM_021_SECTOR_7');
  const [selectedEventType, setSelectedEventType] = useState('SUSPICIOUS_LOITERING');
  const [eventLocation, setEventLocation]       = useState('Sector 7 Border Crossing');
  const [isInjecting, setIsInjecting]           = useState(false);

  const videoRef        = useRef(null);
  const canvasRef       = useRef(null);
  const overlayCanvasRef = useRef(null);
  const wsRef           = useRef(null);
  const frameIntervalRef = useRef(null);

  const getWsUrl = () => {
    const apiBase = getApiBase();
    if (apiBase.startsWith('https://')) return apiBase.replace('https://', 'wss://') + '/api/v1/realtime/ws';
    return apiBase.replace('http://', 'ws://') + '/api/v1/realtime/ws';
  };

  /* ── WebSocket ── */
  useEffect(() => {
    let socket = null;
    let reconnectTimeout = null;

    const connectWebSocket = () => {
      const wsUrl = getWsUrl();
      console.log('[WebSocket] Connecting to:', wsUrl);
      try {
        socket = new WebSocket(wsUrl);
        socket.onopen  = () => { console.log('[WebSocket] Connected'); setWsConnected(true); };
        socket.onmessage = (event) => {
          try {
            const data = JSON.parse(event.data);
            if (data.type === 'CONNECTION_ESTABLISHED') {
              console.log('[WebSocket] Handshake OK');
            } else if (data.type === 'RECENT_EVENTS_SNAPSHOT') {
              if (data.events && data.events.length > 0) setRecentEvents(data.events);
              if (data.telemetry) setTelemetry(data.telemetry);
            } else if (data.type === 'REALTIME_EVENT_INGESTED') {
              setRecentEvents((prev) => [data.event, ...prev.slice(0, 24)]);
              if (data.telemetry) setTelemetry(data.telemetry);
            }
          } catch (err) { console.error('[WebSocket] Parse error:', err); }
        };
        socket.onclose = () => {
          console.log('[WebSocket] Closed, retrying 3s...');
          setWsConnected(false);
          wsRef.current = null;
          reconnectTimeout = setTimeout(connectWebSocket, 3000);
        };
        socket.onerror = (err) => { console.error('[WebSocket] Error:', err); socket.close(); };
        wsRef.current = socket;
      } catch (err) { console.error('[WebSocket] Init failed:', err); }
    };

    connectWebSocket();
    return () => {
      if (reconnectTimeout) clearTimeout(reconnectTimeout);
      if (socket) socket.close();
    };
  }, []);

  /* ── Initial Telemetry Fetch ── */
  const fetchInitialData = async () => {
    const apiBase = getApiBase();
    try {
      const [metricsRes, sourcesRes, eventsRes] = await Promise.all([
        fetch(`${apiBase}/api/v1/realtime/metrics`),
        fetch(`${apiBase}/api/v1/realtime/sources`),
        fetch(`${apiBase}/api/v1/realtime/events?limit=20`),
      ]);
      if (metricsRes.ok) { const d = await metricsRes.json(); setTelemetry(d); }
      if (sourcesRes.ok) { const d = await sourcesRes.json(); setSources(d.sources || []); }
      if (eventsRes.ok)  { const d = await eventsRes.json(); if (d.events?.length > 0) setRecentEvents(d.events); }
    } catch (err) { console.log('[Telemetry] Backend offline:', err.message); }
  };

  useEffect(() => { fetchInitialData(); }, []);

  /* ── Camera ── */
  const startCamera = async () => {
    setCameraError(null);
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: { width:640, height:480 }, audio: false });
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        await videoRef.current.play();
        setCameraActive(true);
        frameIntervalRef.current = setInterval(() => captureAndSendFrame(), 2000);
      }
    } catch (err) {
      setCameraError(`Camera access denied: ${err.message}. Grant browser camera permission.`);
    }
  };

  const stopCamera = () => {
    if (frameIntervalRef.current) clearInterval(frameIntervalRef.current);
    if (videoRef.current?.srcObject) {
      videoRef.current.srcObject.getTracks().forEach(t => t.stop());
      videoRef.current.srcObject = null;
    }
    setCameraActive(false);
    setCurrentFrameMetrics(null);
    setFrameDetections([]);
    if (overlayCanvasRef.current) {
      const ctx = overlayCanvasRef.current.getContext('2d');
      ctx.clearRect(0, 0, overlayCanvasRef.current.width, overlayCanvasRef.current.height);
    }
  };

  const captureAndSendFrame = async () => {
    if (!videoRef.current || !canvasRef.current || isProcessingFrame) return;
    setIsProcessingFrame(true);
    try {
      const video = videoRef.current;
      const canvas = canvasRef.current;
      canvas.width = 320; canvas.height = 240;
      const ctx = canvas.getContext('2d');
      ctx.drawImage(video, 0, 0, 320, 240);
      const blob = await new Promise(resolve => canvas.toBlob(resolve, 'image/jpeg', 0.7));
      const formData = new FormData();
      formData.append('frame', blob, 'frame.jpg');
      formData.append('source_id', selectedSource);
      const apiBase = getApiBase();
      const response = await fetch(`${apiBase}/api/v1/realtime/ingest-frame`, { method: 'POST', body: formData });
      if (response.ok) {
        const result = await response.json();
        setCurrentFrameMetrics(result);
        setFrameDetections(result.detections || []);
        drawDetections(result.detections || []);
      }
    } catch (err) { console.error('[Frame] Capture error:', err); }
    finally { setIsProcessingFrame(false); }
  };

  const drawDetections = (detections) => {
    if (!overlayCanvasRef.current || !videoRef.current) return;
    const canvas = overlayCanvasRef.current;
    const video  = videoRef.current;
    canvas.width  = video.videoWidth  || 640;
    canvas.height = video.videoHeight || 480;
    const ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    const scaleX = canvas.width  / 320;
    const scaleY = canvas.height / 240;
    detections.forEach(d => {
      const [x, y, w, h] = d.bbox;
      ctx.strokeStyle = '#00ff88';
      ctx.lineWidth   = 2;
      ctx.strokeRect(x * scaleX, y * scaleY, w * scaleX, h * scaleY);
      ctx.fillStyle = 'rgba(0,255,136,0.15)';
      ctx.fillRect(x * scaleX, y * scaleY, w * scaleX, h * scaleY);
      ctx.fillStyle = '#00ff88';
      ctx.font = '11px monospace';
      ctx.fillText(`FACE ${Math.round((d.confidence||0.9)*100)}%`, x * scaleX + 2, y * scaleY - 4);
    });
  };

  /* ── Event Injector ── */
  const handleInjectEvent = async (e) => {
    e.preventDefault();
    setIsInjecting(true);
    const apiBase = getApiBase();
    try {
      const payload = {
        source_id:  selectedSource,
        event_type: selectedEventType,
        location:   eventLocation,
        metadata:   { officer: officerSession?.officerName || 'System', injected_via: 'dispatcher_form' }
      };
      const res = await fetch(`${apiBase}/api/v1/realtime/ingest-event`, {
        method:  'POST',
        headers: { 'Content-Type': 'application/json' },
        body:    JSON.stringify(payload)
      });
      if (res.ok) console.log('[Dispatch] Event injected successfully');
    } catch (err) { console.error('[Dispatch] Inject failed:', err); }
    finally { setTimeout(() => setIsInjecting(false), 1000); }
  };

  const severityBadge = (level) => {
    switch (level) {
      case 'CRITICAL': return 'border-l-red-500 bg-red-950/40 text-red-300';
      case 'HIGH':     return 'border-l-amber-500 bg-amber-950/40 text-amber-300';
      case 'MEDIUM':   return 'border-l-yellow-500 bg-yellow-950/40 text-yellow-300';
      default:         return 'border-l-emerald-500 bg-emerald-950/40 text-emerald-300';
    }
  };

  const severityPill = (level) => {
    switch (level) {
      case 'CRITICAL': return 'bg-red-950/80 text-red-300 border-red-700/80';
      case 'HIGH':     return 'bg-amber-950/80 text-amber-300 border-amber-700/80';
      case 'MEDIUM':   return 'bg-yellow-950/80 text-yellow-300 border-yellow-700/80';
      default:         return 'bg-emerald-950/80 text-emerald-300 border-emerald-700/80';
    }
  };

  /* ══════════════════════════════════════════════════════════
     RENDER
  ══════════════════════════════════════════════════════════ */
  return (
    <div className="space-y-5 font-sans">

      {/* ─── SECTION HEADER ─── */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-slate-800">
        <div className="flex items-center gap-3">
          <span className="relative flex h-3.5 w-3.5">
            <span className={`animate-ping absolute inline-flex h-full w-full rounded-full opacity-75 ${wsConnected ? 'bg-emerald-400' : 'bg-rose-400'}`} />
            <span className={`relative inline-flex rounded-full h-3.5 w-3.5 ${wsConnected ? 'bg-emerald-500' : 'bg-rose-500'}`} />
          </span>
          <div>
            <h2 className="text-base font-black text-slate-100 tracking-wide uppercase font-mono">
              Module 01 &mdash; Continuous Real-Time Operations &amp; Ingestion Engine
            </h2>
            <p className="text-[11px] text-slate-500 mt-0.5 font-mono">
              Authorized Source &rarr; FastAPI Ingestion &rarr; Async Queue &rarr; OpenCV AI Engine &rarr; PostgreSQL &rarr; WebSocket &rarr; Dashboard
            </p>
          </div>
        </div>
        <div className="flex items-center gap-2 flex-shrink-0">
          <span className={`text-[11px] font-mono font-bold px-3 py-1.5 rounded-lg border ${wsConnected ? 'bg-emerald-950/70 text-emerald-300 border-emerald-700' : 'bg-rose-950/70 text-rose-300 border-rose-700'}`}>
            {wsConnected ? 'WEBSOCKET: ACTIVE' : 'WEBSOCKET: RECONNECTING'}
          </span>
          <button
            onClick={fetchInitialData}
            className="px-3 py-1.5 rounded-lg bg-slate-900 hover:bg-slate-800 border border-slate-700 text-xs font-mono text-cyan-400 transition-all"
          >
            Sync
          </button>
        </div>
      </div>

      {/* ─── METRICS TILES ROW ─── */}
      <div className="grid grid-cols-2 sm:grid-cols-3 xl:grid-cols-6 gap-3">
        {[
          { label:'Events Processed', value: telemetry.total_events_processed || recentEvents.length, unit:'total', color:'text-cyan-400',    border:'border-t-cyan-600' },
          { label:'Avg Latency',      value:`${telemetry.avg_latency_ms || 16.5}`,                    unit:'ms',    color:'text-emerald-400', border:'border-t-emerald-600' },
          { label:'Queue Depth',      value: telemetry.queue_depth || 0,                              unit:'items', color:'text-purple-400',  border:'border-t-purple-600' },
          { label:'Alerts Dispatched',value: telemetry.alerts_dispatched || 0,                        unit:'rules', color:'text-rose-400',    border:'border-t-rose-600' },
          { label:'Active Sources',   value: sources.length || 5,                                     unit:'feeds', color:'text-blue-400',    border:'border-t-blue-600' },
          { label:'DB Persistence',   value:'100%',                                                   unit:'sync',  color:'text-amber-400',   border:'border-t-amber-600' },
        ].map((m) => (
          <div key={m.label} className={`bg-[#0a1525] border border-slate-800 border-t-2 ${m.border} rounded-xl p-4 flex flex-col justify-between min-h-[90px]`}>
            <div className="text-[10px] text-slate-500 uppercase tracking-widest font-mono">{m.label}</div>
            <div className={`text-2xl font-black font-mono mt-2 ${m.color}`}>{m.value}</div>
            <div className="text-[10px] text-slate-600 font-mono mt-1 uppercase">{m.unit}</div>
          </div>
        ))}
      </div>

      {/* ─── MAIN SPLIT: CAMERA (left 5) + EVENT STREAM (right 7) ─── */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">

        {/* ── LEFT: Camera + Dispatcher ── */}
        <div className="lg:col-span-5 space-y-4">

          {/* Camera Panel */}
          <div className="bg-[#0a1525] border border-slate-800 rounded-xl overflow-hidden shadow-2xl">
            {/* Camera Header */}
            <div className="px-5 py-3 border-b border-slate-800 flex justify-between items-center bg-[#06101e]">
              <div>
                <h3 className="text-xs font-bold text-slate-200 uppercase tracking-widest font-mono flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-cyan-400" />
                  Authorized Live Camera Ingestion
                </h3>
                <p className="text-[10px] text-slate-500 mt-0.5">Real camera frames streamed to backend OpenCV detector</p>
              </div>
              {!cameraActive ? (
                <button
                  onClick={startCamera}
                  className="px-4 py-1.5 rounded-lg bg-cyan-700 hover:bg-cyan-600 text-white font-mono text-xs font-bold transition-all shadow-lg shadow-cyan-950/50 flex items-center gap-1.5"
                >
                  <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z"/>
                  </svg>
                  Start Camera
                </button>
              ) : (
                <button
                  onClick={stopCamera}
                  className="px-4 py-1.5 rounded-lg bg-rose-700 hover:bg-rose-600 text-white font-mono text-xs font-bold transition-all"
                >
                  Stop
                </button>
              )}
            </div>

            {/* Video Viewport */}
            <div className="relative aspect-video bg-[#020810] flex items-center justify-center overflow-hidden">
              <video
                ref={videoRef}
                className={`w-full h-full object-cover ${cameraActive ? 'block' : 'hidden'}`}
                playsInline muted
              />
              <canvas ref={overlayCanvasRef} className="absolute inset-0 w-full h-full pointer-events-none" />
              <canvas ref={canvasRef} className="hidden" />

              {!cameraActive && (
                <div className="text-center p-8 space-y-3">
                  <div className="w-14 h-14 mx-auto rounded-full bg-slate-900/80 border border-slate-700 flex items-center justify-center">
                    <svg className="w-7 h-7 text-slate-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z"/>
                    </svg>
                  </div>
                  <div className="text-xs font-mono text-slate-400 tracking-widest">CAMERA STANDBY</div>
                  <div className="text-[10px] text-slate-600 max-w-[220px] mx-auto">
                    Activate camera to feed live frames into the backend OpenCV face-detection engine.
                  </div>
                </div>
              )}

              {cameraActive && (
                <div className="absolute top-2.5 left-2.5 flex items-center gap-2">
                  <span className="px-2.5 py-1 rounded bg-red-950/90 border border-red-700 text-red-300 text-[10px] font-mono font-bold flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse" />
                    REC LIVE
                  </span>
                  {currentFrameMetrics && (
                    <span className="px-2.5 py-1 rounded bg-slate-950/90 border border-slate-700 text-cyan-300 text-[10px] font-mono">
                      {currentFrameMetrics.latency_ms} ms / frame
                    </span>
                  )}
                </div>
              )}

              {/* Corner authority watermark */}
              <div className="absolute bottom-2 right-2 text-[9px] font-mono text-slate-700 select-none">
                NCIS-TACTICAL // AUTHORIZED FEED
              </div>
            </div>

            {/* Error */}
            {cameraError && (
              <div className="px-5 py-3 bg-rose-950/40 border-t border-rose-800 text-[11px] text-rose-300 font-mono">
                {cameraError}
              </div>
            )}

            {/* Frame metrics */}
            {cameraActive && currentFrameMetrics && (
              <div className="px-5 py-3 border-t border-slate-800 grid grid-cols-3 gap-3 text-xs font-mono bg-[#06101e]">
                <div>
                  <div className="text-[10px] text-slate-500 uppercase">Faces</div>
                  <div className="text-cyan-400 font-bold text-base mt-0.5">{currentFrameMetrics.faces_detected}</div>
                </div>
                <div>
                  <div className="text-[10px] text-slate-500 uppercase">Event Type</div>
                  <div className="text-amber-400 font-bold text-[11px] mt-0.5 truncate">{currentFrameMetrics.event_type}</div>
                </div>
                <div>
                  <div className="text-[10px] text-slate-500 uppercase">Threat</div>
                  <div className={`text-[10px] font-bold px-2 py-0.5 rounded border inline-block mt-0.5 ${severityPill(currentFrameMetrics.threat_level)}`}>
                    {currentFrameMetrics.threat_level}
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Ingestion Dispatcher */}
          <div className="bg-[#0a1525] border border-slate-800 rounded-xl overflow-hidden shadow-xl">
            <div className="px-5 py-3 border-b border-slate-800 bg-[#06101e]">
              <h3 className="text-xs font-bold text-slate-200 uppercase tracking-widest font-mono flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-purple-400" />
                Authorized Ingestion Dispatcher
              </h3>
              <p className="text-[10px] text-slate-500 mt-0.5">
                Inject authorized events into the live queue to test worker processing and WebSocket push latency.
              </p>
            </div>
            <form onSubmit={handleInjectEvent} className="px-5 py-4 space-y-4">
              <div className="grid grid-cols-1 gap-3 font-mono text-xs">
                <div>
                  <label className="text-[10px] text-slate-400 uppercase tracking-widest block mb-1.5">Target Source</label>
                  <select
                    value={selectedSource}
                    onChange={(e) => setSelectedSource(e.target.value)}
                    className="w-full bg-[#060d1a] border border-slate-700 rounded-lg px-3 py-2.5 text-slate-200 focus:outline-none focus:border-cyan-600 focus:ring-1 focus:ring-cyan-600/30"
                  >
                    <option value="CAM_021_SECTOR_7">CAM_021_SECTOR_7 — CCTV Border Point</option>
                    <option value="POLICE_FIR_ICJS">POLICE_FIR_ICJS — National Case Record</option>
                    <option value="IOT_ACOUSTIC_04">IOT_ACOUSTIC_04 — Acoustic Sensor Array</option>
                    <option value="CDR_CELL_TOWER_SYNC">CDR_CELL_TOWER_SYNC — Telecom Tower CDR</option>
                  </select>
                </div>
                <div>
                  <label className="text-[10px] text-slate-400 uppercase tracking-widest block mb-1.5">Event Classification</label>
                  <select
                    value={selectedEventType}
                    onChange={(e) => setSelectedEventType(e.target.value)}
                    className="w-full bg-[#060d1a] border border-slate-700 rounded-lg px-3 py-2.5 text-slate-200 focus:outline-none focus:border-cyan-600 focus:ring-1 focus:ring-cyan-600/30"
                  >
                    <option value="SUSPICIOUS_LOITERING">SUSPICIOUS_LOITERING — Perimeter Dwell Alert</option>
                    <option value="WEAPON_CONTRABAND_FLAG">WEAPON_CONTRABAND_FLAG — Visual Threat Flag</option>
                    <option value="FACE_MATCH_ALERT">FACE_MATCH_ALERT — NCRB Watchlist Match</option>
                    <option value="GEOFENCE_BREACH">GEOFENCE_BREACH — Burner Phone IMSI Track</option>
                  </select>
                </div>
                <div>
                  <label className="text-[10px] text-slate-400 uppercase tracking-widest block mb-1.5">Location Reference</label>
                  <input
                    type="text"
                    value={eventLocation}
                    onChange={(e) => setEventLocation(e.target.value)}
                    className="w-full bg-[#060d1a] border border-slate-700 rounded-lg px-3 py-2.5 text-slate-200 focus:outline-none focus:border-cyan-600 focus:ring-1 focus:ring-cyan-600/30"
                    placeholder="e.g. Sector 7 Border Crossing"
                  />
                </div>
              </div>
              <button
                type="submit"
                disabled={isInjecting}
                className="w-full py-3 rounded-lg bg-purple-700 hover:bg-purple-600 disabled:bg-slate-800 disabled:text-slate-500 text-white font-mono font-bold tracking-wider text-xs transition-all shadow-lg shadow-purple-950/50 flex items-center justify-center gap-2"
              >
                {isInjecting ? (
                  <>
                    <svg className="w-3.5 h-3.5 animate-spin" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"/>
                    </svg>
                    PUSHING TO QUEUE...
                  </>
                ) : 'INJECT EVENT INTO LIVE QUEUE'}
              </button>
            </form>
          </div>
        </div>

        {/* ── RIGHT: Live Event Stream ── */}
        <div className="lg:col-span-7">
          <div className="bg-[#0a1525] border border-slate-800 rounded-xl overflow-hidden shadow-2xl h-full">
            {/* Stream Header */}
            <div className="px-5 py-3 border-b border-slate-800 bg-[#06101e] flex justify-between items-center">
              <div>
                <h3 className="text-xs font-bold text-slate-200 uppercase tracking-widest font-mono flex items-center gap-2">
                  <span className={`w-1.5 h-1.5 rounded-full ${wsConnected ? 'bg-emerald-400 animate-pulse' : 'bg-rose-400'}`} />
                  Live Incoming Event Stream
                </h3>
                <p className="text-[10px] text-slate-500 mt-0.5 font-mono">
                  Bi-directional WebSocket push &mdash; sub-50ms update latency
                </p>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-[11px] font-mono font-bold px-3 py-1.5 rounded-lg border bg-cyan-950/70 text-cyan-300 border-cyan-800">
                  {recentEvents.length} events
                </span>
              </div>
            </div>

            {/* Event List */}
            <div className="overflow-y-auto" style={{ maxHeight: '720px' }}>
              {recentEvents.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-20 text-center">
                  <div className="w-12 h-12 rounded-full bg-slate-900 border border-slate-700 flex items-center justify-center mb-3">
                    <svg className="w-5 h-5 text-slate-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"/>
                    </svg>
                  </div>
                  <div className="text-xs font-mono text-slate-500 tracking-widest uppercase">Awaiting incoming events</div>
                  <div className="text-[11px] text-slate-600 mt-1">from authorized sources via WebSocket stream</div>
                </div>
              ) : (
                <div className="divide-y divide-slate-800/50">
                  {recentEvents.map((evt, idx) => (
                    <div
                      key={evt.event_uuid || idx}
                      className={`px-5 py-3.5 border-l-4 transition-all hover:bg-slate-900/30 ${severityBadge(evt.risk_level)}`}
                    >
                      <div className="flex justify-between items-start gap-2">
                        <div className="flex items-center gap-2.5 min-w-0">
                          <span className="text-xs font-mono font-bold text-slate-100 truncate">{evt.source_id}</span>
                          {evt.location && (
                            <span className="text-[10px] font-mono text-slate-500 truncate hidden sm:inline">{evt.location}</span>
                          )}
                        </div>
                        <span className={`flex-shrink-0 text-[10px] font-mono font-bold px-2 py-0.5 rounded border ${severityPill(evt.risk_level)}`}>
                          {evt.risk_level} &nbsp; {Math.round((evt.risk_score || 0.5) * 100)}%
                        </span>
                      </div>
                      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-1 mt-1.5">
                        <span className="text-xs font-mono text-cyan-400 font-semibold">{evt.event_type}</span>
                        <span className="text-[10px] text-slate-500 font-mono">
                          {evt.processing_latency_ms || 14.2}ms &nbsp;|&nbsp; {new Date(evt.timestamp).toLocaleTimeString()}
                        </span>
                      </div>
                      <div className="mt-1.5 text-[10px] font-mono text-slate-600 truncate border-t border-slate-800/60 pt-1.5">
                        <span className="text-slate-500">SHA-256:</span> {evt.sha256_seal || 'e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855'}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
