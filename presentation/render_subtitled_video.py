import subprocess
import os

SEGMENTS = [
    {
        "start": "0:00:00.00", "end": "0:00:05.50",
        "title": "NCIS-TACTICAL : NEXT-GEN PLATFORM", "tag": "SIH26150 (NTRO)",
        "sub": "AI-Powered Cyber Crime & Forensic Investigation Suite • Govt. of India"
    },
    {
        "start": "0:00:05.50", "end": "0:00:12.50",
        "title": "SOVEREIGN LAW ENFORCEMENT ACCESS", "tag": "ROLE-BASED AUTH",
        "sub": "Secure Officer Login • Authorized Under BNS 2023 Sec 63 & BSA Sec 65B"
    },
    {
        "start": "0:00:12.50", "end": "0:00:23.50",
        "title": "COMMAND DASHBOARD & EVIDENCE RADAR", "tag": "128 ACTIVE CASES",
        "sub": "Multi-Jurisdiction Real-Time Telemetry & Suspect Confidence Scoring"
    },
    {
        "start": "0:00:23.50", "end": "0:00:33.50",
        "title": "CROSS-STATION SUSPECT REGISTRY", "tag": "128D BIOMETRICS",
        "sub": "Deterministic On-Device Facial Matching • Instant All-India Criminal Lookup"
    },
    {
        "start": "0:00:33.50", "end": "0:00:52.50",
        "title": "ON-DEVICE BIOMETRIC INGESTION", "tag": "BNSS SEC 173",
        "sub": "Local 16x16 Pixel Hash • Zero Server Latency • Tamper-Evident Record Creation"
    },
    {
        "start": "0:00:52.50", "end": "0:00:59.50",
        "title": "NATIONWIDE ICJS & CCTNS 2.0 SYNC", "tag": "INTEROPERABLE",
        "sub": "Case Synchronized Across 16,000+ Police Stations • Cryptographic Record Lock"
    },
    {
        "start": "0:00:59.50", "end": "0:01:08.50",
        "title": "CASE COPILOT : AGENTIC AI ASSISTANT", "tag": "AGENTIC VOICE",
        "sub": "Autonomous Decision Support • Siri Voice Orb with Dynamic Acoustic Waves"
    },
    {
        "start": "0:01:08.50", "end": "0:01:22.50",
        "title": "MULTILINGUAL AUTONOMOUS AI REASONING", "tag": "EN / HI / TA",
        "sub": "Multi-Turn Audio AI (≤3 Sentences) • 100% Accuracy on 50 Synthetic FIR Benchmark"
    },
    {
        "start": "0:01:22.50", "end": "0:01:34.50",
        "title": "PRATIBIMB : VECTOR GIS TACTICAL MAP", "tag": "INFRA GRID",
        "sub": "Live Cellular Tower Vectors • Cross-Border Syndicate Hotspot Clusters"
    },
    {
        "start": "0:01:34.50", "end": "0:01:46.50",
        "title": "CRIME SYNDICATE DOSSIER & ENFORCEMENT", "tag": "BNS 111 WARRANT",
        "sub": "Vikram (SYND) Kingpin Identified • 1-Click Bank Freeze & Sec 94 Subpoena"
    },
    {
        "start": "0:01:46.50", "end": "0:01:58.50",
        "title": "GNN SYNDICATE TOPOLOGY ENGINE", "tag": "SPECTRAL GCN",
        "sub": "PyTorch Geometric Graph Convolutions • 98.6% Link Precision & Centrality"
    },
    {
        "start": "0:01:58.50", "end": "0:02:08.50",
        "title": "TACTICAL FIELD UNIT (FORENSIX EDGE)", "tag": "MAKE IN INDIA",
        "sub": "₹12,000 Unit Cost vs ₹25L Foreign Tools • Hailo-8L (26 TOPS) • 100% Air-Gapped"
    },
    {
        "start": "0:02:08.50", "end": "0:02:22.50",
        "title": "SIH26150 MULTI-VENDOR SURVEILLANCE", "tag": "SUB-50MS CCTV",
        "sub": "Standardized Acquisition Across Hikvision, Dahua & CP Plus • Perimeter Alerts"
    },
    {
        "start": "0:02:22.50", "end": "0:02:35.50",
        "title": "HARDWARE WRITE-BLOCKER TERMINAL", "tag": "BNS SEC 63",
        "sub": "Physical FPGA Read-Only Bus Lock • Port A/B/C • Zero Evidence Contamination"
    },
    {
        "start": "0:02:35.50", "end": "0:02:50.50",
        "title": "RAW BITSTREAM CARVING & EVIDENCE SEAL", "tag": "131K SECTORS",
        "sub": "Bit-for-Bit Disk Hex Dump • Real-Time SHA-256 WebCrypto Custody Seal (100%)"
    },
    {
        "start": "0:02:50.50", "end": "0:02:59.50",
        "title": "ON-THE-FLY NPU ARTIFACT CARVING", "tag": "HAILO-8L NPU",
        "sub": "Carved: Glock 19 (96.4%), WhatsApp Crypto Mixer SQLite, Narcotics Packaging"
    },
    {
        "start": "0:02:59.50", "end": "0:03:14.50",
        "title": "ERSS DIAL 112 PATROL MESH", "tag": "RAPID ARRIVAL",
        "sub": "Automated Geodesic Interceptor Routing • Haversine Distance • Under 60s ETA"
    },
    {
        "start": "0:03:14.50", "end": "0:03:26.50",
        "title": "CRITICAL EMERGENCY SOS DISPATCH", "tag": "TARGET ETA: 84S",
        "sub": "Sector 4 Patrol Van Deployed (0.35 km away) • Overrides Officer Silent / DND Mode"
    },
    {
        "start": "0:03:26.50", "end": "0:03:36.50",
        "title": "FIELD OFFICER MOBILE PHONE PAIRING", "tag": "LOCKSCREEN MESH",
        "sub": "PWA & NTFY Instant Vibration Alert • Continuous Ground Interceptor Push"
    },
    {
        "start": "0:03:36.50", "end": "0:03:48.50",
        "title": "DIGITAL FORENSICS ARTIFACT VAULT", "tag": "MULTI-VENDOR DVR",
        "sub": "Seized Samsung S23 Connected • Standardized CCTV & Mobile Bitstream Carving"
    },
    {
        "start": "0:03:48.50", "end": "0:03:54.50",
        "title": "ALL-INDIA NCRB DOSSIER SCANNER", "tag": "94.2% FACE MATCH",
        "sub": "128D Vector Match: Ramesh Kumar • Active Local Summons (FIR #112/2024)"
    },
    {
        "start": "0:03:54.50", "end": "0:04:02.50",
        "title": "BSA SEC 65B & BNS SEC 63 CERTIFICATE", "tag": "SEALED & VERIFIED",
        "sub": "Court-Admissible Electronic Certificate with SHA-256 Digital Vault Hash"
    },
    {
        "start": "0:04:02.50", "end": "0:04:07.70",
        "title": "END-TO-END CRIME INTELLIGENCE", "tag": "SIH26150 (NTRO)",
        "sub": "FIR #991/2025 Real-Time NLP Parsing • Built for Smart India Hackathon 2026"
    }
]

def generate_ass(output_path="presentation/ncis_subtitles.ass"):
    header = """[Script Info]
Title: NCIS Tactical SIH26150 Lower Thirds
ScriptType: v4.00+
WrapStyle: 0
ScaledBorderAndShadow: yes
YCbCr Matrix: TV.709
PlayResX: 3840
PlayResY: 1732

[V4+ Styles]
Format: Name, Fontname, Fontsize, PrimaryColour, SecondaryColour, OutlineColour, BackColour, Bold, Italic, Underline, StrikeOut, ScaleX, ScaleY, Spacing, Angle, BorderStyle, Outline, Shadow, Alignment, MarginL, MarginR, MarginV, Encoding
Style: TacticalBadge,Segoe UI,40,&H00FFFFFF,&H00000000,&H00000000,&HEE071326,-1,0,0,0,100,100,1,0,3,18,0,2,100,100,18,1

[Events]
Format: Layer, Start, End, Style, Name, MarginL, MarginR, MarginV, Effect, Text
"""
    lines = [header]
    for seg in SEGMENTS:
        # Construct ASS line with fade-in and fade-out
        t = f"{{\\fad(250,250)}}{{\\b1\\fs42\\c&H00FFFFFF}}{seg['title']}  {{\\b1\\fs30\\c&H00A4A50E}}●  {seg['tag']}\\N{{\\b0\\fs28\\c&H00E2E8F0}}{seg['sub']}"
        lines.append(f"Dialogue: 0,{seg['start']},{seg['end']},TacticalBadge,,0,0,18,,{t}\n")

    with open(output_path, "w", encoding="utf-8") as f:
        f.writelines(lines)
    print(f"Generated ASS subtitles: {output_path}")

def generate_srt(output_path="presentation/ncis_subtitles.srt"):
    lines = []
    for idx, seg in enumerate(SEGMENTS, 1):
        # Convert 0:00:00.00 to 00:00:00,000
        def to_srt_time(t_str):
            parts = t_str.split(':')
            h = int(parts[0])
            m = int(parts[1])
            s, cs = parts[2].split('.')
            ms = int(cs) * 10
            return f"{h:02d}:{m:02d}:{int(s):02d},{ms:03d}"

        s_time = to_srt_time(seg['start'])
        e_time = to_srt_time(seg['end'])
        text = f"{seg['title']} [{seg['tag']}]\n{seg['sub']}"
        lines.append(f"{idx}\n{s_time} --> {e_time}\n{text}\n\n")

    with open(output_path, "w", encoding="utf-8") as f:
        f.writelines(lines)
    print(f"Generated SRT subtitles: {output_path}")

if __name__ == "__main__":
    generate_ass("presentation/ncis_subtitles.ass")
    generate_srt("presentation/ncis_subtitles.srt")
    generate_srt("C:/Users/mahir/Downloads/NCIS_SIH26150_Subtitles_CapCut.srt")
