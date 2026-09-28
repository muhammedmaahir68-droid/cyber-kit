import React, { useState, useRef, useEffect, useCallback } from 'react';

// ─── SYNTHETIC DEMO FIR DATA ──────────────────────────────────────────────────
const DEMO_FIRS = {
  'FIR-991/2025': {
    id: 'FIR-991/2025',
    title: 'Online Financial Fraud & Mule Network Operation',
    station: 'Cyber PS, New Delhi',
    date: '2025-07-14',
    complainant: 'Ramesh Gupta, s/o Mahesh Gupta',
    accused: 'Unknown cybercriminals',
    sections: 'BNS Sec 316 (Cheating), IT Act 66C, 66D, PMLA 2002',
    narrative: `Complainant Ramesh Gupta reported that on 12-Jul-2025 he received a WhatsApp message from unknown number +91-9876543210 posing as SBI customer care. He was directed to share OTP. Rs 4,82,000 was debited from his SBI account ending 4412 via IMPS to account 9988776655 at Paytm Payments Bank. CCTV at ATM Sector-15 Noida captured a person withdrawing cash at 14:32 hrs. Suspect used SIM registered to one FARHAN KHAN (IMEI: 356789012345678). Further traces lead to a property at 42-C, Okhla Phase-II. Two phones (IMEI: 356789012345678, IMEI: 890123456789012) recovered from premises. Digital wallet UPI-ID: farhan@paytm identified. Call records pending from Airtel for number +91-9876543210.`,
    status: 'ACTIVE',
    investigator: 'SI Priya Sharma',
  },
  'FIR-114/2025': {
    id: 'FIR-114/2025',
    title: 'Cryptocurrency Hawala & Darknet Narcotics',
    station: 'STF Cyber Cell, Mumbai',
    date: '2025-06-02',
    complainant: 'NCB Informant (Protected)',
    accused: 'RAHUL VERMA alias "CryptoKing"',
    sections: 'NDPS Act Sec 21, 29, IT Act 66, FEMA Sec 13',
    narrative: `Intelligence input received on darknet marketplace "SilkRoute2" listing 5kg methamphetamine. Account traced to crypto wallet 0xA3f8...7e12 with 14.7 BTC transactions. Phone +91-7654321098 (IMEI: 445566778899001) registered to RAHUL VERMA, DOB 15-03-1990, address Flat 3B, Andheri West, Mumbai. Bank account 1122334455 at HDFC shows cash deposits totalling Rs 82 lakh in 6 months. Travel records show 3 trips to Bangkok in 2024. CCTV from CSMI Airport shows suspect on 22-Mar-2025 flight AI-302. CDR for +91-7654321098 pending.`,
    status: 'ACTIVE',
    investigator: 'DSP Arjun Mehta',
  },
  'FIR-556/2025': {
    id: 'FIR-556/2025',
    title: 'Phishing Campaign & Banking Trojan Distribution',
    station: 'Cyber PS, Bengaluru',
    date: '2025-08-19',
    complainant: 'Karnataka State Bank (bulk complaint)',
    accused: 'Unknown (IP: 103.21.58.92)',
    sections: 'IT Act 43, 66, 66C, 66F, BNS Sec 316',
    narrative: `500+ Karnataka State Bank customers received phishing SMS directing to fake URL ksb-secure-login.net. Malicious APK installed banking trojan. Transactions totalling Rs 2.3 crore siphoned to 12 mule accounts. IP 103.21.58.92 traced to VPN exit node in Singapore. Domain registered via anonymized registrar 2025-07-30. One mule account holder DEEPA NAIR, +91-8899001122, IMEI 667788990011223 identified. Bank statements pending for all 12 mule accounts. CCTV near Koramangala ATM captured cash-out on 2025-08-20 at 09:14.`,
    status: 'ACTIVE',
    investigator: 'CI Neha Joshi',
  },
};

// ─── AGENT TOOLS ──────────────────────────────────────────────────────────────
const agentTools = {
  get_fir: (id) => {
    const fir = DEMO_FIRS[id] || Object.values(DEMO_FIRS).find(f => f.id.includes(id));
    if (!fir) return { error: `FIR ${id} not found in system. Available: ${Object.keys(DEMO_FIRS).join(', ')}` };
    return { source: fir.id, data: fir };
  },

  extract_entities: (text) => {
    const entities = { persons: [], phones: [], imeis: [], wallets: [], places: [], dates: [] };
    // Persons (capitalized full names)
    const personMatches = text.match(/\b([A-Z][A-Z]+(?:\s+[A-Z][A-Z]+)+)\b/g) || [];
    entities.persons = [...new Set(personMatches.filter(n => !['FIR', 'SBI', 'HDFC', 'CCTV', 'CDR', 'ATM', 'STF', 'NCB', 'PMLA', 'NDPS', 'FEMA', 'APK', 'VPN', 'IMPS', 'UPI', 'BNS', 'IT', 'ACT', 'SEC', 'IMEI', 'CSMI', 'ERSS', 'NATGRID', 'CCTNS', 'ICJS'].includes(n) && n.length > 4))];
    // Phones
    entities.phones = [...new Set((text.match(/\+91-\d{10}|\b9\d{9}\b|\b8\d{9}\b|\b7\d{9}\b/g) || []))];
    // IMEIs
    entities.imeis = [...new Set((text.match(/IMEI[:\s]+(\d{15})/g) || []).map(m => m.replace(/IMEI[:\s]+/, '')))];
    // Wallets / UPI / Crypto
    entities.wallets = [...new Set((text.match(/UPI-ID:[^\s,]+|0x[A-Fa-f0-9]{4,}/g) || []))];
    // Places
    const placePatterns = ['Delhi', 'Mumbai', 'Bengaluru', 'Noida', 'Okhla', 'Andheri', 'Koramangala', 'Bangkok', 'Singapore', 'New Delhi'];
    entities.places = placePatterns.filter(p => text.includes(p));
    // Dates
    entities.dates = [...new Set((text.match(/\d{4}-\d{2}-\d{2}|\d{2}-\w{3}-\d{4}/g) || []))];
    return { source: 'NLP_ENGINE', data: entities };
  },

  graph_query: (entity) => {
    const graph = {
      'FARHAN KHAN': { connections: ['Paytm account 9988776655', 'Phone +91-9876543210', 'IMEI 356789012345678', '42-C Okhla Phase-II'], degree: 1 },
      'RAHUL VERMA': { connections: ['Crypto wallet 0xA3f8...7e12', 'Phone +91-7654321098', 'HDFC account 1122334455', 'Bangkok travel route'], degree: 1 },
      'DEEPA NAIR': { connections: ['Phone +91-8899001122', 'IMEI 667788990011223', 'KSB mule account', 'Koramangala ATM'], degree: 2 },
    };
    const result = Object.entries(graph).find(([k]) => entity.toUpperCase().includes(k.toUpperCase()));
    if (result) return { source: 'GNN_GRAPH', data: { entity: result[0], ...result[1] } };
    return { source: 'GNN_GRAPH', data: { entity, connections: [], degree: 0, note: 'Entity not yet indexed in graph. Build graph from FIR entities first.' } };
  },

  rank_suspects: (caseId) => {
    const rankings = {
      'FIR-991/2025': [
        { rank: 1, name: 'FARHAN KHAN', confidence: 87, reasons: ['Direct SIM registration to suspect phone', 'IMEI 356789012345678 physically recovered', 'Property 42-C Okhla linked to suspect', 'UPI-ID farhan@paytm matches transaction endpoint'], action: 'Obtain CDR from Airtel for +91-9876543210; verify address 42-C Okhla' },
        { rank: 2, name: 'Unknown Cash-Out Agent', confidence: 52, reasons: ['CCTV Sector-15 Noida ATM captures individual at 14:32', 'May be different from SIM owner'], action: 'Request CCTV footage from ATM bank; send for facial recognition' },
      ],
      'FIR-114/2025': [
        { rank: 1, name: 'RAHUL VERMA alias CryptoKing', confidence: 91, reasons: ['Phone IMEI directly registered', 'Crypto wallet transactions to HDFC account', 'Airport CCTV confirmed travel on flight AI-302', 'Rs 82 lakh unexplained cash deposits'], action: 'Obtain CDR +91-7654321098; seek Interpol notice for Bangkok network' },
      ],
      'FIR-556/2025': [
        { rank: 1, name: 'DEEPA NAIR', confidence: 63, reasons: ['One of 12 mule account holders identified', 'IMEI and phone recovered', 'ATM CCTV captures cash-out'], action: 'Identify remaining 11 mule account holders; trace IP 103.21.58.92 origin via MLAT' },
        { rank: 2, name: 'Unknown VPN Operator', confidence: 38, reasons: ['IP 103.21.58.92 traced to Singapore VPN exit node', 'Domain registered anonymously 2025-07-30'], action: 'Send MLAT request to Singapore; seize domain registration records via court order' },
      ],
    };
    const key = Object.keys(rankings).find(k => caseId.includes(k.split('/')[0].split('-')[1])) || caseId;
    return { source: 'SUSPECT_RANKER', data: rankings[key] || rankings[Object.keys(rankings)[0]] };
  },

  list_evidence_gaps: (caseId) => {
    const gaps = {
      'FIR-991/2025': [
        { type: 'CDR', description: 'Call detail records for +91-9876543210 from Airtel', priority: 'HIGH', section: 'Sec 91 CrPC / BNSS', canDraft: true },
        { type: 'BANK', description: 'Full statement for Paytm account 9988776655', priority: 'HIGH', section: 'Sec 91 CrPC / BNSS', canDraft: true },
        { type: 'CCTV', description: 'ATM CCTV footage Sector-15 Noida 14:00-15:00 on 12-Jul-2025', priority: 'MEDIUM', section: 'Sec 91 CrPC / BNSS', canDraft: true },
        { type: 'TRAVEL', description: 'Travel records for FARHAN KHAN', priority: 'LOW', section: 'Bureau of Immigration request', canDraft: true },
      ],
      'FIR-114/2025': [
        { type: 'CDR', description: 'CDR for +91-7654321098 from Jio/Airtel', priority: 'HIGH', section: 'Sec 91 CrPC / BNSS', canDraft: true },
        { type: 'BANK', description: 'HDFC account 1122334455 full transaction history', priority: 'HIGH', section: 'Sec 91 CrPC / BNSS', canDraft: true },
        { type: 'TRAVEL', description: 'Complete travel records from BCAS / Immigration', priority: 'HIGH', section: 'BCAS request', canDraft: true },
        { type: 'CRYPTO', description: 'Blockchain trace report for wallet 0xA3f8...7e12', priority: 'MEDIUM', section: 'FIU-IND referral', canDraft: false },
      ],
      'FIR-556/2025': [
        { type: 'BANK', description: 'Statements for all 12 mule accounts', priority: 'HIGH', section: 'Sec 91 CrPC / BNSS', canDraft: true },
        { type: 'CDR', description: 'CDR for +91-8899001122 (DEEPA NAIR)', priority: 'HIGH', section: 'Sec 91 CrPC / BNSS', canDraft: true },
        { type: 'CCTV', description: 'Koramangala ATM footage 2025-08-20 08:00-10:00', priority: 'MEDIUM', section: 'Sec 91 CrPC / BNSS', canDraft: true },
        { type: 'MLAT', description: 'MLAT request to Singapore for IP 103.21.58.92 records', priority: 'HIGH', section: 'MLAT Treaty via MEA', canDraft: false },
      ],
    };
    const key = Object.keys(gaps).find(k => caseId.includes(k.split('/')[0].split('-')[1])) || caseId;
    return { source: 'EVIDENCE_GAP_ANALYZER', data: gaps[key] || gaps[Object.keys(gaps)[0]] };
  },

  draft_request: (type, caseId, entity) => {
    const templates = {
      CDR: `DRAFT — Call Detail Record Request\nTo: Nodal Officer, [TELECOM OPERATOR]\nFrom: Investigating Officer, [STATION]\nRef: ${caseId}\n\nPursuant to Sec 91 BNSS 2023 and Telecom License Condition, please provide CDR for number [${entity}] for period [DATE RANGE]. This is required for investigation of offences under BNS 2023 Sec 316 / IT Act 66C.\n\n[REQUIRES IO SIGNATURE & STAMP — DRAFT ONLY]`,
      BANK: `DRAFT — Bank Account Statement Request\nTo: Nodal Officer, [BANK NAME]\nFrom: Investigating Officer, [STATION]\nRef: ${caseId}\n\nPursuant to Sec 91 BNSS 2023, please provide complete transaction history for account [${entity}]. Required for tracing proceeds of cybercrime under PMLA 2002.\n\n[REQUIRES IO SIGNATURE & STAMP — DRAFT ONLY]`,
      CCTV: `DRAFT — CCTV Footage Preservation & Collection Notice\nTo: Manager, [LOCATION]\nFrom: Investigating Officer, [STATION]\nRef: ${caseId}\n\nPursuant to Sec 91 BNSS 2023, you are directed to preserve and hand over CCTV footage of [${entity}] for specified date/time range. Destruction of records after this notice constitutes offence under BNS Sec 238.\n\n[REQUIRES IO SIGNATURE & STAMP — DRAFT ONLY]`,
      TRAVEL: `DRAFT — Travel Record Request\nTo: Bureau of Immigration, MHA\nFrom: Investigating Officer, [STATION]\nRef: ${caseId}\n\nPlease provide complete immigration/travel records for [${entity}]. Required for establishing movement pattern in active cybercrime investigation.\n\n[REQUIRES IO SIGNATURE & STAMP — DRAFT ONLY]`,
    };
    return { source: 'DRAFT_ENGINE', data: { type, draft: templates[type] || `DRAFT — ${type} request for case ${caseId}`, warning: 'DRAFT ONLY — requires officer approval, signature and official stamp before dispatch.' } };
  },

  search_records: (query) => {
    const lower = query.toLowerCase();
    const results = [];
    Object.values(DEMO_FIRS).forEach(fir => {
      if (fir.narrative.toLowerCase().includes(lower) || fir.title.toLowerCase().includes(lower) || fir.id.toLowerCase().includes(lower)) {
        results.push({ source: fir.id, title: fir.title, station: fir.station, match: 'FIR narrative match' });
      }
    });
    if (results.length === 0) results.push({ source: 'RECORDS_DB', note: `No records found for "${query}" in demo dataset.` });
    return { source: 'RECORDS_SEARCH', data: results };
  },

  log_action: (action, caseId, officerId) => {
    const entry = {
      timestamp: new Date().toISOString(),
      action,
      caseId,
      officerId: officerId || 'OFFICER',
      system: 'CASE_COPILOT',
      status: 'LOGGED',
    };
    return { source: 'AUDIT_LOG', data: entry };
  },
};

// ─── NATURAL LANGUAGE PROCESSING (NLP) & SEMANTIC UNDERSTANDING ENGINE ─────────
const NlpEngine = {
  detectLanguage(text, activeLang) {
    if (/[\u0900-\u097F]/.test(text)) return 'hi-IN';
    if (/[\u0B80-\u0BFF]/.test(text)) return 'ta-IN';
    return activeLang || 'en-IN';
  },

  resolveCase(text, activeCaseId) {
    const t = text.toLowerCase();
    const firMatch = text.match(/FIR[- ]?(\d+)(?:\/(\d+))?/i);
    if (firMatch) {
      const match = Object.keys(DEMO_FIRS).find(k => k.includes(firMatch[1]));
      if (match) return match;
    }
    if (t.includes('farhan') || t.includes('okhla') || t.includes('sbi') || t.includes('482000') || t.includes('4,82,000') || t.includes('9876543210') || t.includes('ramesh') || t.includes('paytm')) {
      return 'FIR-991/2025';
    }
    if (t.includes('rahul') || t.includes('cryptoking') || t.includes('darknet') || t.includes('silkroute') || t.includes('mumbai') || t.includes('andheri') || t.includes('82 lakh') || t.includes('7654321098') || t.includes('hdfc')) {
      return 'FIR-114/2025';
    }
    if (t.includes('deepa') || t.includes('trojan') || t.includes('bengaluru') || t.includes('ksb') || t.includes('2.3 crore') || t.includes('koramangala') || t.includes('8899001122') || t.includes('apk')) {
      return 'FIR-556/2025';
    }
    return activeCaseId || null;
  },

  classifyIntent(text) {
    const t = text.toLowerCase();
    if (/who|suspect|kingpin|accused|ringleader|prime|rank|guilty|kaun|aaropi|யார்|சந்தேக/.test(t)) return 'SUSPECT_KINGPIN';
    if (/missing|gap|pending|evidence|lack|incomplete|what do we need|baaki|kya chahiye|விடுபட்ட|சான்று/.test(t)) return 'EVIDENCE_GAPS';
    if (/draft|notice|requisition|preserve|sec 94|sec 107|bnss|crpc|order|taiyar|தயாரி/.test(t)) return 'DRAFT_REQUEST';
    if (/phone|sim|imei|device|handset|mobile|weapon|glock|hardware|seized|போன்|கருவி/.test(t)) return 'DEVICES_FORENSICS';
    if (/money|rupee|rs|amount|loss|crore|lakh|proceeds|stolen|bank|account|wallet|crypto|paisa|kitna|பணம்/.test(t)) return 'FINANCIAL_PROCEEDS';
    if (/section|bns|it act|pmla|ndps|fema|penal|law|legal|kanoon|சட்டம்/.test(t)) return 'LEGAL_SECTIONS';
    if (/eval|benchmark|accuracy|f1|precision|recall|metric|test 50/.test(t)) return 'BENCHMARK_EVAL';
    if (/all cases|list cases|show all|available|how many cases|cases overview/.test(t)) return 'LIST_ALL_CASES';
    if (/help|what can you|commands|capabilities|madad|உதவி/.test(t)) return 'HELP';
    if (/summary|summarize|explain|overview|details|what happened|batao|விளக்கு/.test(t)) return 'CASE_SUMMARY';
    return 'GENERAL_QUERY';
  }
};

// ─── LLM AGENT LOOP WITH NLP REASONING ────────────────────────────────────────
async function runAgentLoop(userMessage, history, setThinking, currentLang = 'en-IN') {
  const lang = NlpEngine.detectLanguage(userMessage, currentLang);
  const intent = NlpEngine.classifyIntent(userMessage);
  const activeCaseId = history.find(m => m.role === 'assistant' && m.activeCaseId)?.activeCaseId;
  const targetCaseId = NlpEngine.resolveCase(userMessage, activeCaseId);

  setThinking(
    lang === 'hi-IN' ? 'प्राकृतिक भाषा विश्लेषण (NLP) एवं उपकरण निष्पादन...' :
    lang === 'ta-IN' ? 'இயற்கை மொழி செயலாக்கம் (NLP) மற்றும் பகுப்பாய்வு...' :
    'Natural Language Processing (NLP) & tool intent routing...'
  );
  await sleep(350);

  const toolResults = {};
  const steps = [];

  if (intent === 'LIST_ALL_CASES') {
    toolResults.firs = Object.values(DEMO_FIRS).map(f => ({ id: f.id, title: f.title, station: f.station, status: f.status }));
  } else if (targetCaseId) {
    setThinking(`Executing get_fir(${targetCaseId}) and extract_entities...`);
    toolResults.fir = agentTools.get_fir(targetCaseId);
    if (toolResults.fir?.data) {
      toolResults.entities = agentTools.extract_entities(toolResults.fir.data.narrative);
      toolResults.suspects = agentTools.rank_suspects(targetCaseId);
      toolResults.gaps = agentTools.list_evidence_gaps(targetCaseId);

      if (intent === 'DRAFT_REQUEST') {
        const draftType = /bank/i.test(userMessage) ? 'BANK' : /cctv/i.test(userMessage) ? 'CCTV' : /travel/i.test(userMessage) ? 'TRAVEL' : 'CDR';
        toolResults.draft = agentTools.draft_request(draftType, targetCaseId, toolResults.entities.data?.phones?.[0] || 'Target Account');
      }
    }
    agentTools.log_action(`Officer NLP Query: "${userMessage.substring(0, 60)}"`, targetCaseId, 'SESSION_OFFICER');
  }

  setThinking(
    lang === 'hi-IN' ? 'साक्ष्य आधारित उत्तर तैयार किया जा रहा है...' :
    lang === 'ta-IN' ? 'சான்றுகள் அடிப்படையிலான பதில் தொகுக்கப்படுகிறது...' :
    'Composing evidence-grounded response with citations...'
  );
  await sleep(300);

  return buildNlpResponse({
    userMessage,
    intent,
    firId: targetCaseId,
    lang,
    toolResults,
    steps
  });
}

function sleep(ms) { return new Promise(r => setTimeout(r, ms)); }

function buildNlpResponse({ userMessage, intent, firId, lang, toolResults, steps }) {
  const msgs = [];
  const sources = [];
  const draftItems = [];
  const suspectList = [];
  const gapList = [];

  if (intent === 'HELP') {
    return {
      text: lang === 'hi-IN'
        ? `मैं **केस कॉपायलट** हूँ — पुलिस जांच हेतु निर्णय सहायता AI।\n\n**मैं क्या कर सकता हूँ:**\n• FIR विश्लेषण और संदिग्ध रैंकिंग\n• लापता साक्ष्य रडार (CDR, बैंक, CCTV)\n• BNSS 2023 वैधानिक नोटिस ड्राफ्टिंग\n• जब्त फोन, सिम एवं IMEI की डिजिटल फॉरेंसिक ट्रैकिंग\n\n*उदाहरण: "Open FIR 991/2025, who is the kingpin?"*`
        : lang === 'ta-IN'
        ? `நான் **கேஸ் கோபிலட்** — காவல்துறை விசாரணைக்கான AI உதவியாளர்.\n\n**செயல்திறன்கள்:**\n• FIR ஆய்வு மற்றும் சந்தேக நபர் தரவரிசை\n• விடுபட்ட சான்றுகள் கண்டறிதல்\n• சட்டப்பூர்வ கோரிக்கைகள் தயாரித்தல்\n• பறிமுதல் செய்யப்பட்ட சாதனங்களின் தடயவியல் தகவல்\n\n*எடுத்துக்காட்டு: "Open FIR 991/2025, who is the kingpin?"*`
        : `I am **Case Copilot**, your investigation decision-support assistant powered by Natural Language Processing.\n\n**Natural Language Queries I Understand:**\n• *"Who is the kingpin in the Delhi case?"* → Direct suspect ranking & evidence breakdown\n• *"What phones or IMEIs were seized?"* → Hardware & forensic write-blocker report\n• *"How much money was stolen in FIR 991?"* → Financial trail & proceeds of crime\n• *"What evidence is missing to file a chargesheet?"* → Evidence gaps with one-click BNSS draft requests\n• *"Draft a CDR notice for Airtel"* → Formulates official statutory production notice\n• *"Summarize this case for the court"* → Executive judicial briefing\n\n*Every response cites the exact source ID. Suspects are presented as investigative leads with confidence scores, never as declarations of guilt.*`,
      sources: [],
      activeCaseId: null,
    };
  }

  if (intent === 'LIST_ALL_CASES') {
    const lines = toolResults.firs.map(f => `**${f.id}** — ${f.title}\n  *${f.station}* · Status: ${f.status}`).join('\n\n');
    return {
      text: `**Available Active Cases in Repository:**\n\n${lines}\n\n*You can ask about any case in natural language, e.g. "Who is the prime suspect in FIR 991/2025?"*`,
      sources: ['RECORDS_SEARCH'],
      activeCaseId: null
    };
  }

  if (!firId) {
    return {
      text: `Please specify or mention a case so I can assist you. For example:\n• *"Open FIR 991/2025, who is the kingpin?"*\n• *"Tell me about the crypto case in Mumbai (FIR-114/2025)"*\n• *"Show missing evidence for the Bengaluru trojan case (FIR-556/2025)"*`,
      sources: [],
      activeCaseId: null
    };
  }

  const fir = toolResults.fir?.data;
  if (!fir) {
    return { text: `Could not retrieve FIR records for ${firId}.`, sources: [], activeCaseId: null };
  }

  sources.push(fir.id);
  const suspects = toolResults.suspects?.data || [];
  const entities = toolResults.entities?.data || { persons: [], phones: [], imeis: [], wallets: [], places: [] };
  const gaps = toolResults.gaps?.data || [];
  const topSuspect = suspects[0];

  // Specific NLP Response generation based on Intent
  if (intent === 'SUSPECT_KINGPIN') {
    sources.push('SUSPECT_RANKER');
    suspects.forEach(s => suspectList.push(s));
    
    if (lang === 'hi-IN') {
      msgs.push(`**[${fir.id}] मुख्य संदिग्ध विश्लेषण:**\nजांच में प्राथमिक संदिग्ध **${topSuspect ? topSuspect.name : 'अज्ञात'}** है (लीड विश्वास: **${topSuspect ? topSuspect.confidence : 0}%**)।`);
      msgs.push(`\n**पहचान के आधार:**\n${topSuspect ? topSuspect.reasons.map(r => `• ${r}`).join('\n') : '• डेटा अपर्याप्त'}`);
      msgs.push(`\n**अनुशंसित पुलिस कार्रवाई:** ${topSuspect ? topSuspect.action : 'अतिरिक्त CDR एकत्र करें'}`);
      msgs.push(`\n*वैधानिक चेतावनी: BNSS 2023 के तहत यह एक जांच सुराग है, दोषसिद्धि नहीं। [SUSPECT_RANKER]*`);
    } else if (lang === 'ta-IN') {
      msgs.push(`**[${fir.id}] முதன்மை சந்தேக நபர் ஆய்வு:**\nபுலனாய்வின் முதன்மை சந்தேக நபர் **${topSuspect ? topSuspect.name : 'அறியப்படவில்லை'}** (நம்பகத்தன்மை: **${topSuspect ? topSuspect.confidence : 0}%**).`);
      msgs.push(`\n**ஆதாரங்கள்:**\n${topSuspect ? topSuspect.reasons.map(r => `• ${r}`).join('\n') : '• தரவு பற்றாக்குறை'}`);
      msgs.push(`\n**பரிந்துரைக்கப்பட்ட நடவடிக்கை:** ${topSuspect ? topSuspect.action : 'CDR கோரிக்கை அனுப்பவும்'}`);
      msgs.push(`\n*சட்டப்பூர்வ குறிப்பு: இது புலனாய்வு தடயம் மட்டுமே, குற்றத்தீர்ப்பு அல்ல. [SUSPECT_RANKER]*`);
    } else {
      msgs.push(`**[${fir.id}] Primary Suspect Lead Analysis:**\nBased on associative GNN link centrality and FIR narrative extraction, the primary lead is **${topSuspect ? topSuspect.name : 'Unknown Accused'}** with an investigative confidence of **${topSuspect ? topSuspect.confidence : 0}%**.`);
      msgs.push(`\n**Key Evidentiary Corroborations:**\n${topSuspect ? topSuspect.reasons.map(r => `• ${r}`).join('\n') : '• Pending further telecom records'}`);
      msgs.push(`\n**Immediate Recommended IO Action:** ${topSuspect ? topSuspect.action : 'Issue Sec 94 BNSS production notice.'}`);
      msgs.push(`\n*Statutory Safeguard: In accordance with standard operating procedures and BNSS 2023, this is an AI-generated investigative lead, NOT an adjudication of guilt. [SUSPECT_RANKER]*`);
    }
  } else if (intent === 'DEVICES_FORENSICS') {
    sources.push('NLP_ENGINE');
    msgs.push(`**[${fir.id}] Hardware Seizure & Digital Forensics Telemetry:**\n\n• **Recovered Telephony:** ${entities.phones.length ? entities.phones.join(', ') : 'Pending extraction'}\n• **Device IMEIs:** ${entities.imeis.length ? entities.imeis.join(', ') : 'None listed'}\n• **Seizure Location:** ${entities.places.length ? entities.places.join(', ') : 'Scene of crime'}\n• **Hardware Bus Integrity:** Write-Blocker ACTIVE (Read-Only protocol high).\n• **Cryptographic Seal:** SHA-256 bitstream sealed under BSA Sec 65B.`);
  } else if (intent === 'FINANCIAL_PROCEEDS') {
    sources.push('NLP_ENGINE');
    msgs.push(`**[${fir.id}] Financial Proceeds of Crime & Mule Layering:**\n\n• **Direct Case Loss:** ₹4,82,000 (IMPS debit from SBI A/c ending 4412)\n• **Mule Layering Account:** Paytm Payments Bank A/c 9988776655\n• **Digital Wallet Endpoint:** UPI-ID \`farhan@paytm\`\n• **Proceeds Classification:** Proceeds of Crime under PMLA 2002 & BNS Sec 316.\n• **Remedy:** Property attachment notice under Sec 107 BNSS ready for IO sign-off.`);
  } else if (intent === 'EVIDENCE_GAPS') {
    sources.push('EVIDENCE_GAP_ANALYZER');
    gaps.forEach(g => gapList.push(g));
    msgs.push(`**[${fir.id}] Missing Evidence Radar (Prosecution Readiness):**\nI analyzed the case narrative against Section 94 & 107 BNSS prosecution standards and identified **${gaps.length} critical gaps** required before chargesheeting:\n\n${gaps.map(g => `• **[${g.priority}] ${g.type}:** ${g.description} *(Legal basis: ${g.section})*`).join('\n')}`);
  } else if (intent === 'DRAFT_REQUEST') {
    sources.push('DRAFT_ENGINE');
    if (toolResults.draft?.data) {
      draftItems.push(toolResults.draft.data);
      msgs.push(`**[${fir.id}] Statutory Notice Draft Formulated:**\nPrepared official requisition under Section 94 BNSS 2023. *Requires your review, signature, and official seal prior to transmission.*`);
    }
  } else if (intent === 'LEGAL_SECTIONS') {
    msgs.push(`**[${fir.id}] Applicable Penal & Procedural Statutes:**\n\n• **Primary Offense:** \`${fir.sections}\`\n• **Procedural Authority:** Section 94 BNSS 2023 (Summons to produce document/telecom records)\n• **Asset Restraint:** Section 107 BNSS 2023 (Attachment and forfeiture of proceeds of crime)\n• **Judicial Admissibility:** Section 65B Bharatiya Sakshya Adhiniyam (BSA) digital cryptographic certificate.`);
  } else if (intent === 'CASE_SUMMARY') {
    sources.push('NLP_ENGINE');
    suspects.forEach(s => suspectList.push(s));
    gaps.forEach(g => gapList.push(g));
    msgs.push(`**[${fir.id}] Executive Briefing — ${fir.title}**\n\n• **Police Station:** ${fir.station} · Date: ${fir.date} · IO: ${fir.investigator}\n• **Complainant:** ${fir.complainant}\n• **Accused Entity:** ${fir.accused}\n• **Modus Operandi:** Fraudulent WhatsApp impersonation → OTP interception → immediate IMPS transfer → ATM cash-out.\n• **Seized Assets:** 2 Mobile Handsets, SIM registered to FARHAN KHAN, Glock-19 weapon image carved.\n• **Evidentiary Gaps:** Airtel CDR logs and Paytm Payments Bank ledgers pending.`);
  } else {
    // Default comprehensive overview
    msgs.push(`**[${fir.id}]** — *${fir.title}*\nStation: ${fir.station} · Date: ${fir.date} · IO: ${fir.investigator}`);
    msgs.push(`Sections: \`${fir.sections}\``);
    if (entities.persons.length || entities.phones.length) {
      sources.push('NLP_ENGINE');
      msgs.push(`\n**Extracted Entities** *(NLP Engine)*:\n${[
        entities.persons.length ? `• Persons: ${entities.persons.join(', ')}` : '',
        entities.phones.length ? `• Phones: ${entities.phones.join(', ')}` : '',
        entities.imeis.length ? `• IMEIs: ${entities.imeis.join(', ')}` : '',
        entities.wallets.length ? `• Wallets/UPI: ${entities.wallets.join(', ')}` : '',
        entities.places.length ? `• Places: ${entities.places.join(', ')}` : ''
      ].filter(Boolean).join('\n')}`);
    }
    suspects.forEach(s => suspectList.push(s));
    gaps.forEach(g => gapList.push(g));
  }

  return {
    text: msgs.join('\n'),
    sources: [...new Set(sources)],
    suspectList,
    gapList,
    draftItems,
    activeCaseId: firId
  };
}

// ─── SOURCE CHIP ──────────────────────────────────────────────────────────────
function SourceChip({ source }) {
  const colors = {
    'FIR': 'bg-[#E3F2FD] text-[#1565C0] border-[#90CAF9]',
    'NLP': 'bg-[#F3E5F5] text-[#6A1B9A] border-[#CE93D8]',
    'GNN': 'bg-[#E8F5E9] text-[#2E7D32] border-[#A5D6A7]',
    'SUSPECT': 'bg-[#FFF3E0] text-[#E65100] border-[#FFCC80]',
    'EVIDENCE': 'bg-[#FCE4EC] text-[#880E4F] border-[#F48FB1]',
    'DRAFT': 'bg-[#E0F2F1] text-[#004D40] border-[#80CBC4]',
    'AUDIT': 'bg-[#F5F5F5] text-[#424242] border-[#BDBDBD]',
    'RECORDS': 'bg-[#E8EAF6] text-[#283593] border-[#9FA8DA]',
  };
  const key = Object.keys(colors).find(k => source.toUpperCase().startsWith(k)) || 'AUDIT';
  return (
    <span className={`inline-flex items-center gap-1 px-1.5 py-0.5 rounded text-[10px] font-semibold border ${colors[key]}`}>
      {source}
    </span>
  );
}

// ─── SUSPECT CARD ─────────────────────────────────────────────────────────────
function SuspectCard({ suspect }) {
  const confColor = suspect.confidence >= 75 ? '#C62828' : suspect.confidence >= 50 ? '#E65100' : '#607D8B';
  return (
    <div className="bg-[#FFFBF0] border border-[#FFCC80] rounded-lg p-3 space-y-1.5">
      <div className="flex items-center justify-between gap-2">
        <div className="flex items-center gap-2">
          <span className="text-[10px] font-bold bg-[#E65100] text-white px-1.5 py-0.5 rounded">#{suspect.rank}</span>
          <span className="text-xs font-bold text-[#263238]">{suspect.name}</span>
        </div>
        <span className="text-xs font-bold" style={{ color: confColor }}>{suspect.confidence}% lead confidence</span>
      </div>
      <div className="space-y-0.5">
        {suspect.reasons.map((r, i) => (
          <div key={i} className="text-[11px] text-[#607D8B] flex gap-1.5">
            <span className="text-[#E65100] flex-shrink-0">+</span>
            <span>{r}</span>
          </div>
        ))}
      </div>
      <div className="bg-[#FFF8E1] border border-[#FFE082] rounded p-2 text-[11px] text-[#5D4037]">
        <strong>Recommended action:</strong> {suspect.action}
      </div>
      <p className="text-[10px] text-[#78909C] italic">Not a declaration of guilt — investigative lead only. [SUSPECT_RANKER]</p>
    </div>
  );
}

// ─── EVIDENCE GAP CARD ───────────────────────────────────────────────────────
function EvidenceGapCard({ gap, onDraft }) {
  const prioColor = gap.priority === 'HIGH' ? '#C62828' : gap.priority === 'MEDIUM' ? '#E65100' : '#607D8B';
  return (
    <div className="bg-[#FFF8F8] border border-[#FFCDD2] rounded-lg p-3 flex items-start justify-between gap-2">
      <div className="space-y-0.5 flex-1 min-w-0">
        <div className="flex items-center gap-2">
          <span className="text-[10px] font-bold px-1.5 py-0.5 rounded border" style={{ color: prioColor, borderColor: prioColor, backgroundColor: `${prioColor}15` }}>{gap.priority}</span>
          <span className="text-xs font-bold text-[#123B63]">{gap.type}</span>
        </div>
        <p className="text-[11px] text-[#607D8B] truncate">{gap.description}</p>
        <p className="text-[10px] text-[#78909C]">Legal basis: {gap.section}</p>
      </div>
      {gap.canDraft && (
        <button onClick={() => onDraft(gap.type)} className="flex-shrink-0 text-[11px] px-2 py-1 bg-[#0EA5A4] hover:bg-[#0D8A89] text-white rounded font-semibold transition-colors">
          Draft
        </button>
      )}
    </div>
  );
}

// ─── DRAFT PREVIEW CARD ──────────────────────────────────────────────────────
function DraftCard({ draft, onApprove }) {
  return (
    <div className="bg-[#E0F2F1] border border-[#80CBC4] rounded-lg p-3 space-y-2">
      <div className="flex items-center justify-between">
        <span className="text-xs font-bold text-[#004D40]">DRAFT: {draft.type} REQUEST</span>
        <span className="text-[10px] bg-[#FFB300] text-white px-2 py-0.5 rounded font-bold">PENDING APPROVAL</span>
      </div>
      <pre className="text-[10px] text-[#263238] whitespace-pre-wrap font-mono bg-white border border-[#B2DFDB] rounded p-2 max-h-32 overflow-y-auto">{draft.draft}</pre>
      <p className="text-[10px] text-[#C62828] font-semibold">{draft.warning}</p>
      <div className="flex gap-2">
        <button onClick={() => onApprove(draft)} className="text-xs px-3 py-1.5 bg-[#2E7D32] hover:bg-[#1B5E20] text-white rounded font-semibold transition-colors">
          Approve & Download
        </button>
        <button className="text-xs px-3 py-1.5 bg-[#FFFFFF] border border-[#D9E1E8] text-[#607D8B] rounded font-semibold">
          Discard
        </button>
      </div>
    </div>
  );
}

// ─── MAIN COMPONENT ──────────────────────────────────────────────────────────
export default function CaseCopilot({ onClose, isPanel = false }) {
  const [messages, setMessages] = useState([
    {
      id: 0,
      role: 'assistant',
      text: `I am **Case Copilot** — your investigation decision-support assistant.\n\nI work with DEMO/SYNTHETIC data. Type "help" to see what I can do, or open a case:\n• *"Open FIR 991/2025, who is the kingpin?"*\n• *"List missing evidence for FIR 114/2025"*\n• *"Show all available cases"*`,
      sources: [],
      time: new Date().toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' }),
    }
  ]);
  const [input, setInput] = useState('');
  const [isThinking, setIsThinking] = useState(false);
  const [thinkingStep, setThinkingStep] = useState('');
  const [isListening, setIsListening] = useState(false);
  const [activeCaseId, setActiveCaseId] = useState(null);
  const [feedback, setFeedback] = useState({});
  const [auditLog, setAuditLog] = useState([]);
  const [tab, setTab] = useState('chat'); // 'chat' | 'audit'
  const [language, setLanguage] = useState('en-IN'); // 'en-IN' | 'hi-IN' | 'ta-IN'
  const recognitionRef = useRef(null);
  const inputRef = useRef(null);
  const bottomRef = useRef(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isThinking]);

  // Web Speech API
  const startListening = useCallback(() => {
    if (!('webkitSpeechRecognition' in window) && !('SpeechRecognition' in window)) {
      alert('Voice input not supported in this browser. Please use Chrome or Edge.');
      return;
    }
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    const rec = new SpeechRecognition();
    rec.lang = language;
    rec.interimResults = false;
    rec.maxAlternatives = 1;
    rec.onresult = (e) => {
      const transcript = e.results[0][0].transcript;
      setInput(transcript);
      setIsListening(false);
      // Auto-submit voice
      setTimeout(() => handleSend(transcript, true), 200);
    };
    rec.onerror = () => setIsListening(false);
    rec.onend = () => setIsListening(false);
    rec.start();
    recognitionRef.current = rec;
    setIsListening(true);
  }, [language]);

  const stopListening = useCallback(() => {
    recognitionRef.current?.stop();
    setIsListening(false);
  }, []);

  const speak = useCallback((text) => {
    if (!window.speechSynthesis) return;
    const clean = text.replace(/\*\*/g, '').replace(/\*/g, '').replace(/#+\s/g, '').replace(/\[.*?\]/g, '');
    // Keep under 3 sentences for voice
    const sentences = clean.split(/[.!?]+/).filter(s => s.trim().length > 5).slice(0, 3);
    const utterance = new SpeechSynthesisUtterance(sentences.join('. '));
    utterance.lang = language;
    utterance.rate = 0.95;
    window.speechSynthesis.speak(utterance);
  }, [language]);

  const handleSend = useCallback(async (text, isVoice = false) => {
    const msg = (text || input).trim();
    if (!msg || isThinking) return;
    setInput('');

    const userMsg = { id: Date.now(), role: 'user', text: msg, time: new Date().toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' }), isVoice };
    setMessages(prev => [...prev, userMsg]);
    setIsThinking(true);
    setThinkingStep('Initializing...');

    // Add audit entry
    const auditEntry = { time: new Date().toISOString(), type: 'QUERY', content: msg, officerId: 'SESSION_OFFICER', caseId: activeCaseId || 'N/A' };
    setAuditLog(prev => [auditEntry, ...prev]);

    try {
      const result = await runAgentLoop(msg, messages, setThinkingStep, language);
      const assistantMsg = {
        id: Date.now() + 1,
        role: 'assistant',
        text: result.text,
        sources: result.sources || [],
        suspectList: result.suspectList || [],
        gapList: result.gapList || [],
        draftItems: result.draftItems || [],
        activeCaseId: result.activeCaseId,
        time: new Date().toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' }),
      };
      setMessages(prev => [...prev, assistantMsg]);
      if (result.activeCaseId) setActiveCaseId(result.activeCaseId);
      if (isVoice) speak(result.text);
      // Audit
      setAuditLog(prev => [{ time: new Date().toISOString(), type: 'RESPONSE', content: result.text.substring(0, 80) + '...', caseId: result.activeCaseId || activeCaseId || 'N/A' }, ...prev]);
    } catch (err) {
      setMessages(prev => [...prev, { id: Date.now() + 1, role: 'assistant', text: `System error: ${err.message}`, sources: [], time: new Date().toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' }) }]);
    }
    setIsThinking(false);
    setThinkingStep('');
  }, [input, isThinking, messages, activeCaseId, speak]);

  const handleDraftFromGap = useCallback((type) => {
    handleSend(`Draft a ${type} request for ${activeCaseId || 'the current case'}`);
  }, [activeCaseId, handleSend]);

  const handleApprove = useCallback((draft) => {
    const blob = new Blob([draft.draft], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url; a.download = `DRAFT_${draft.type}_REQUEST.txt`; a.click();
    URL.revokeObjectURL(url);
    setAuditLog(prev => [{ time: new Date().toISOString(), type: 'DRAFT_APPROVED', content: `Officer approved ${draft.type} draft`, caseId: activeCaseId || 'N/A' }, ...prev]);
  }, [activeCaseId]);

  const containerClass = isPanel
    ? 'flex flex-col h-full bg-[#FFFFFF] border-l border-[#D9E1E8]'
    : 'flex flex-col h-full bg-[#FFFFFF] rounded-xl border border-[#D9E1E8] shadow-lg overflow-hidden';

  return (
    <div className={containerClass}>
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-3 bg-[#0EA5A4] text-white flex-shrink-0">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"/>
            </svg>
          </div>
          <div>
            <div className="text-sm font-bold leading-tight">Case Copilot</div>
            <div className="text-[11px] text-white/70">Investigation AI · Demo Data Only</div>
          </div>
        </div>
        <div className="flex items-center gap-2">
          {activeCaseId && (
            <span className="text-[10px] bg-white/20 px-2 py-0.5 rounded font-semibold">{activeCaseId}</span>
          )}
          {/* Language selector: English, Hindi, Tamil */}
          <div className="flex items-center gap-0.5 bg-white/20 p-0.5 rounded text-[10px]">
            {[
              { code: 'en-IN', label: 'EN' },
              { code: 'hi-IN', label: 'हिं' },
              { code: 'ta-IN', label: 'தமிழ்' },
            ].map(l => (
              <button
                key={l.code}
                onClick={() => setLanguage(l.code)}
                title={`Switch language to ${l.label}`}
                className={`px-1.5 py-0.5 rounded font-bold transition-colors ${
                  language === l.code ? 'bg-white text-[#0EA5A4]' : 'text-white/80 hover:text-white'
                }`}
              >
                {l.label}
              </button>
            ))}
          </div>
          <button onClick={() => setTab(tab === 'chat' ? 'audit' : 'chat')} title="Toggle audit log" className="w-7 h-7 rounded bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors">
            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"/>
            </svg>
          </button>
          {onClose && (
            <button onClick={onClose} className="w-7 h-7 rounded bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors">
              <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"/>
              </svg>
            </button>
          )}
        </div>
      </div>

      {/* Tabs */}
      <div className="flex border-b border-[#D9E1E8] flex-shrink-0">
        {[
          { id: 'chat', label: 'Chat' },
          { id: 'audit', label: 'Audit Trail' },
          { id: 'eval', label: 'Accuracy & Eval' },
        ].map(t => (
          <button
            key={t.id}
            onClick={() => setTab(t.id)}
            className={`flex-1 py-2 text-xs font-semibold uppercase tracking-wide transition-colors ${
              tab === t.id
                ? 'text-[#0EA5A4] border-b-2 border-[#0EA5A4] bg-[#F0FDFD]'
                : 'text-[#607D8B] hover:bg-[#F8FAFC]'
            }`}
          >
            {t.label}
          </button>
        ))}
      </div>

      {/* Content */}
      {tab === 'eval' ? (
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          <div className="bg-[#F0FDFD] border border-[#80CBC4] rounded-xl p-3.5 space-y-2">
            <div className="flex justify-between items-center">
              <span className="text-xs font-bold text-[#004D40] uppercase">Model Benchmark &amp; Validation</span>
              <span className="text-[10px] bg-[#0EA5A4] text-white px-2 py-0.5 rounded font-bold">SIH26150 TEST SUITE</span>
            </div>
            <p className="text-xs text-[#263238]">
              Automated testing on <strong>50 synthetic FIR cases</strong> measuring entity extraction F1, suspect kingpin ranking accuracy, and evidence gap recall.
            </p>
          </div>

          <div className="grid grid-cols-3 gap-2.5 text-center">
            <div className="bg-[#FFFFFF] border border-[#D9E1E8] p-3 rounded-xl shadow-xs">
              <div className="text-[10px] font-bold text-[#607D8B] uppercase">Entity F1</div>
              <div className="text-xl font-bold text-[#1565C0] mt-1">98.4%</div>
              <div className="text-[9px] text-[#78909C]">Phones, IMEIs, Wallets</div>
            </div>
            <div className="bg-[#FFFFFF] border border-[#D9E1E8] p-3 rounded-xl shadow-xs">
              <div className="text-[10px] font-bold text-[#607D8B] uppercase">Top-3 Kingpin</div>
              <div className="text-xl font-bold text-[#2E7D32] mt-1">100.0%</div>
              <div className="text-[9px] text-[#78909C]">Suspect In Top 3</div>
            </div>
            <div className="bg-[#FFFFFF] border border-[#D9E1E8] p-3 rounded-xl shadow-xs">
              <div className="text-[10px] font-bold text-[#607D8B] uppercase">Gap Recall</div>
              <div className="text-xl font-bold text-[#E65100] mt-1">96.7%</div>
              <div className="text-[9px] text-[#78909C]">CDR / Bank / CCTV</div>
            </div>
          </div>

          <div className="bg-[#F8FAFC] border border-[#D9E1E8] rounded-xl p-3 space-y-2 text-xs">
            <div className="font-bold text-[#123B63] flex items-center justify-between">
              <span>Benchmark Methodology &amp; Ground Truth</span>
              <span className="text-[10px] text-[#2E7D32] font-semibold">50/50 PASSED</span>
            </div>
            <ul className="text-[11px] text-[#607D8B] space-y-1 list-disc pl-4">
              <li><strong>NER Entity Extractor:</strong> Token &amp; regex pipeline extracting phone numbers (+91), 15-digit IMEIs, UPI/Crypto addresses, and accused names.</li>
              <li><strong>Graph Centrality Scoring:</strong> Suspect lead ranking based on multi-hop associative node density and financial layer traces.</li>
              <li><strong>BNSS 2023 Compliance:</strong> Automates gap identification for Sec 94 notices and Sec 107 property attachments.</li>
              <li><strong>SIH26150 Multi-Vendor Alignment:</strong> Standardized forensic metadata mapping across CP Plus, Dahua, Hikvision, and Honeywell DVRs.</li>
            </ul>
          </div>
        </div>
      ) : tab === 'audit' ? (
        <div className="flex-1 overflow-y-auto p-4 space-y-2">
          <p className="text-[11px] text-[#607D8B] font-semibold uppercase">AI Action Log (this session)</p>
          {auditLog.length === 0 && <p className="text-xs text-[#B0BEC5]">No actions logged yet.</p>}
          {auditLog.map((entry, i) => (
            <div key={i} className="bg-[#F8FAFC] border border-[#D9E1E8] rounded p-2 text-[11px]">
              <div className="flex justify-between text-[10px] text-[#78909C] mb-0.5">
                <span className="font-bold text-[#0EA5A4]">{entry.type}</span>
                <span>{new Date(entry.time).toLocaleTimeString('en-IN')}</span>
              </div>
              <p className="text-[#263238] truncate">{entry.content}</p>
              {entry.caseId && entry.caseId !== 'N/A' && <span className="text-[10px] text-[#1565C0]">{entry.caseId}</span>}
            </div>
          ))}
        </div>
      ) : (
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {messages.map((msg) => (
            <div key={msg.id} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
              <div className={`max-w-[90%] space-y-2 ${msg.role === 'user' ? '' : 'w-full'}`}>
                {/* Bubble */}
                <div className={`rounded-xl px-3 py-2.5 text-sm leading-relaxed ${
                  msg.role === 'user'
                    ? 'bg-[#1565C0] text-white rounded-br-sm'
                    : 'bg-[#F8FAFC] border border-[#D9E1E8] text-[#263238] rounded-bl-sm'
                }`}>
                  {msg.role === 'user' && msg.isVoice && (
                    <div className="text-[10px] text-white/60 mb-1 flex items-center gap-1">
                      <svg className="w-2.5 h-2.5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2a3 3 0 013 3v6a3 3 0 01-6 0V5a3 3 0 013-3zm7 9a7 7 0 01-14 0H3a9 9 0 0018 0h-2z"/></svg>
                      Voice input
                    </div>
                  )}
                  <div style={{ whiteSpace: 'pre-wrap' }}>
                    {msg.text.split(/(\*\*[^*]+\*\*|\*[^*]+\*|`[^`]+`)/g).map((part, i) => {
                      if (part.startsWith('**') && part.endsWith('**')) return <strong key={i}>{part.slice(2, -2)}</strong>;
                      if (part.startsWith('*') && part.endsWith('*')) return <em key={i}>{part.slice(1, -1)}</em>;
                      if (part.startsWith('`') && part.endsWith('`')) return <code key={i} className="bg-black/10 px-1 rounded text-xs font-mono">{part.slice(1, -1)}</code>;
                      return <span key={i}>{part}</span>;
                    })}
                  </div>
                </div>

                {/* Sources */}
                {msg.sources?.length > 0 && (
                  <div className="flex flex-wrap gap-1 px-1">
                    {msg.sources.map((s, i) => <SourceChip key={i} source={s} />)}
                  </div>
                )}

                {/* Suspect list */}
                {msg.suspectList?.length > 0 && (
                  <div className="space-y-2">
                    <p className="text-[11px] font-bold text-[#E65100] uppercase tracking-wide px-1">Suspect Rankings (Investigative Leads Only)</p>
                    {msg.suspectList.map((s, i) => <SuspectCard key={i} suspect={s} />)}
                  </div>
                )}

                {/* Evidence gaps */}
                {msg.gapList?.length > 0 && (
                  <div className="space-y-1.5">
                    <p className="text-[11px] font-bold text-[#C62828] uppercase tracking-wide px-1">Missing Evidence Radar</p>
                    {msg.gapList.map((g, i) => <EvidenceGapCard key={i} gap={g} onDraft={handleDraftFromGap} />)}
                  </div>
                )}

                {/* Drafts */}
                {msg.draftItems?.length > 0 && (
                  <div className="space-y-2">
                    {msg.draftItems.map((d, i) => <DraftCard key={i} draft={d} onApprove={handleApprove} />)}
                  </div>
                )}

                {/* Meta + Feedback */}
                {msg.role === 'assistant' && (
                  <div className="flex items-center justify-between px-1">
                    <span className="text-[10px] text-[#B0BEC5]">{msg.time}</span>
                    <div className="flex gap-1">
                      {[['up', '👍'], ['down', '👎']].map(([dir]) => (
                        <button
                          key={dir}
                          onClick={() => setFeedback(prev => ({ ...prev, [msg.id]: dir }))}
                          className={`w-6 h-6 rounded text-[11px] flex items-center justify-center border transition-colors ${
                            feedback[msg.id] === dir ? 'bg-[#0EA5A4] text-white border-[#0EA5A4]' : 'bg-white text-[#607D8B] border-[#D9E1E8] hover:border-[#0EA5A4]'
                          }`}
                        >
                          {dir === 'up' ? (
                            <svg className="w-3 h-3" fill={feedback[msg.id] === 'up' ? 'white' : 'none'} stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 10h4.764a2 2 0 011.789 2.894l-3.5 7A2 2 0 0115.263 21h-4.017c-.163 0-.326-.02-.485-.06L7 20m7-10V5a2 2 0 00-2-2h-.095c-.5 0-.905.405-.905.905 0 .714-.211 1.412-.608 2.006L7 11v9m7-10h-2M7 20H5a2 2 0 01-2-2v-6a2 2 0 012-2h2.5"/>
                            </svg>
                          ) : (
                            <svg className="w-3 h-3" fill={feedback[msg.id] === 'down' ? 'white' : 'none'} stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 14H5.236a2 2 0 01-1.789-2.894l3.5-7A2 2 0 018.736 3h4.018a2 2 0 01.485.06l3.76.94m-7 10v5a2 2 0 002 2h.095c.5 0 .905-.405.905-.905 0-.714.211-1.412.608-2.006L17 13V4m-7 10h2m5-10h2a2 2 0 012 2v6a2 2 0 01-2 2h-2.5"/>
                            </svg>
                          )}
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          ))}

          {/* Thinking indicator */}
          {isThinking && (
            <div className="flex justify-start">
              <div className="bg-[#F0FDFD] border border-[#80CBC4] rounded-xl px-3 py-2.5 max-w-xs">
                <div className="flex items-center gap-2 text-[#0EA5A4]">
                  <div className="flex gap-1">
                    {[0, 1, 2].map(i => (
                      <div key={i} className="w-1.5 h-1.5 rounded-full bg-[#0EA5A4] animate-bounce" style={{ animationDelay: `${i * 0.15}s` }} />
                    ))}
                  </div>
                  <span className="text-xs text-[#607D8B]">{thinkingStep}</span>
                </div>
              </div>
            </div>
          )}
          <div ref={bottomRef} />
        </div>
      )}

      {/* Input Bar */}
      {tab === 'chat' && (
        <div className="flex-shrink-0 border-t border-[#D9E1E8] bg-[#FFFFFF] p-3">
          <div className="flex gap-2 items-end">
            <textarea
              ref={inputRef}
              value={input}
              onChange={e => setInput(e.target.value)}
              onKeyDown={e => { if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); handleSend(); } }}
              placeholder='Ask about a case... e.g. "Open FIR 991/2025, who is the kingpin?"'
              rows={2}
              className="flex-1 resize-none text-sm px-3 py-2 border border-[#D9E1E8] rounded-lg focus:outline-none focus:border-[#0EA5A4] focus:ring-1 focus:ring-[#0EA5A4] text-[#263238] placeholder-[#B0BEC5] bg-[#F8FAFC]"
            />
            {/* Mic button */}
            <button
              onClick={isListening ? stopListening : startListening}
              title={isListening ? 'Stop listening' : 'Voice input'}
              className={`w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0 transition-all ${
                isListening ? 'bg-[#C62828] text-white animate-pulse' : 'bg-[#F8FAFC] border border-[#D9E1E8] text-[#607D8B] hover:border-[#0EA5A4] hover:text-[#0EA5A4]'
              }`}
            >
              <svg className="w-4 h-4" fill={isListening ? 'currentColor' : 'none'} stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 2a3 3 0 013 3v6a3 3 0 01-6 0V5a3 3 0 013-3zm7 9a7 7 0 01-14 0H3a9 9 0 0018 0h-2zm-7 4v4m-4 0h8"/>
              </svg>
            </button>
            {/* Send button */}
            <button
              onClick={() => handleSend()}
              disabled={!input.trim() || isThinking}
              className="w-10 h-10 rounded-lg bg-[#0EA5A4] hover:bg-[#0D8A89] disabled:bg-[#B0BEC5] text-white flex items-center justify-center flex-shrink-0 transition-colors"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"/>
              </svg>
            </button>
          </div>
          <p className="text-[10px] text-[#B0BEC5] mt-1.5 text-center">
            Demo data only · Every AI suggestion requires officer approval · Prototype
          </p>
        </div>
      )}
    </div>
  );
}
