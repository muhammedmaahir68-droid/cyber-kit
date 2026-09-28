import pptx
from pptx.dml.color import RGBColor
from pptx.util import Pt

def update_deck(src_path, dst_paths):
    prs = pptx.Presentation(src_path)

    # General replacements across ALL shapes on ALL slides
    global_replacements = [
        ("AAROHAN-X", "NCIS"),
        ("Aarohan-X", "NCIS"),
        ("aarohan-x", "ncis"),
    ]

    # Specific shape overrides by slide (0-indexed)
    slide_overrides = {
        0: {
            0: "NCIS",
            4: "SIH 2026 — Idea Submission — NCIS",
            10: "Theme  –  Smart Automation / Cyber Security & Law Enforcement (Featuring Case Copilot Voice AI)",
            11: "PS Category  –  Software (with Tactical Forensic Hardware Terminal & Siri Voice Agent)",
            12: "Team Name  –  NCIS Core Cyber Intelligence Team",
        },
        1: {
            0: "NCIS",
            1: "PROPOSED SOLUTION — NCIS-TACTICAL (WITH CASE COPILOT & SIH26150)",
            4: "SIH 2026 — Idea Submission — NCIS",
            10: "Gap In Existing Solutions :\nLegacy forensic tools (Cellebrite, EnCase) cost ₹25–40L/year, impose 7–30 days lab delay, lack autonomous AI copilot assistance, and have zero real-time GIS patrol mesh integration for emergency dispatch.",
            17: "Concept Diagram — NCIS Unified Dual Architecture",
            18: "NCIS-TACTICAL: 6 Operational Modules + Case Copilot Voice AI + Tactical Hardware",
            19: "6 OPERATIONAL MODULES (CORE) + CASE COPILOT AGENTIC VOICE AI + TACTICAL HARDWARE",
            22: "• Differentiator 1 — Unified 6-Module Core & Case Copilot: Fulfills PS 189 with Live Surveillance, Digital Forensics, GNN Syndicate Graph, ERSS Patrol Mesh, Tactical Hardware, and Autonomous Agentic Voice/NLP Copilot.\n• Differentiator 2 — Siri Voice Agent & Missing Evidence Radar: Siri-style independent voice agent (EN/HI/TA), Web Speech API mic + TTS (≤3 sentences), missing evidence radar, and interactive GIS touch tracking with Haversine dynamic ETA.\n• Differentiator 3 — SIH26150 Multi-Vendor DVR & Judicial Seal: Hardware write-blocker bus switch, multi-vendor DVR/NVR extraction (Hikvision, Dahua, CP Plus), and BNS 2023 Sec 63 / BSA Sec 65B SHA-256 court evidence.",
            26: "MOD-01: Live Surveillance\nSub-50ms live camera ingestion, OpenCV face detection, and WebSocket stream",
            29: "MOD-02: Digital Forensics & SIH26150 DVR\n131,072 sector carving with Hailo NPU (26 TOPS) & multi-vendor DVR forensics",
            32: "MOD-03: GNN Syndicate Intel\nSpectral GCN maps syndicate topology with 98.6% precision & Centrality",
            35: "MOD-04: ERSS Patrol Mesh\nInteractive GIS map with touch tracking, Haversine distance & rapid dispatch",
            38: "MOD-05: Tactical Hardware\nPhysical write-blocker locks, multi-bus selector (PCIe/SATA/USB), raw hex dump",
            41: "MOD-06: Case Copilot Voice AI\nSiri voice agent, multilingual NLP, auto BNSS 94/107 drafts & 100% 50-case benchmark",
        },
        2: {
            0: "NCIS",
            4: "SIH 2026 — Idea Submission — NCIS",
            18: "Case Copilot Voice &\nNLP Tool-Calling Engine",
            31: "• Frontend  : React 18, Tailwind CSS, Apple iOS Glassmorphism UI, Web Speech API / TTS, Siri Orb Visualizer, Vector GIS\n• Backend   : Python FastAPI, OpenCV Headless, Redis, PostgreSQL, Case Copilot Autonomous Engine\n• AI/ML & NLP: PyTorch Geometric GCN (98.6%), Indian Legal NLP NER, Hailo NPU (26 TOPS), Whisper/Web Speech\n• Forensics : SIH26150 DVR/NVR Tool, Tactical Write-Blocker Bus (PCIe NVMe, SATA III, USB 3.2, JTAG)",
            34: "• Network  : Cloud server real-time deployment + 100% offline air-gapped field capability\n• Cloud    : Encrypted telemetry sync with CCTNS 2.0, ICJS, and NATGRID control rooms\n• Security : MHA Root CA verification, FIPS 140-3 handshake, BNS Sec 63 & BSA Sec 65B SHA-256 seal, DPDP 2023 vectors\n• Legal AI  : Automated statutory drafting under BNSS 2023 Sec 94 (CDR), Sec 107 (Bank Freeze), Sec 176 (Search)",
            37: "• Status : 100% Working Production Platform (Live Vercel & GitHub Deployed)\n• Built  : 6 Operational Modules, Siri Voice Agent, Hailo NPU triage, Interactive GIS, SIH26150 DVR Engine\n• Live   : Deployed at cyber-kit-police.vercel.app (Publicly Accessible)",
            42: "Live Working Production Platform & SIH 189 Highlights:\n• Case Copilot Agentic Voice: Independent Siri voice agent (EN/HI/TA) with 100% accuracy on 50 synthetic FIR cases.\n• Spectral GCN Topology: 98.6% link precision with Betweenness Centrality kingpin ranking.\n• Modern iOS Glass UI: Apple iOS frosted glass theme, 3-bar collapsible sidebar toggle & glowing Siri orb trigger.\n• Tactical Hardware & SIH26150: Physical write-blocker bus switch with raw bitstream hex dump & multi-vendor DVR engine.",
            44: "Live Working Production Platform & SIH 189 Highlights:\n• Case Copilot Agentic Voice: Independent Siri voice agent (EN/HI/TA) with 100% accuracy on 50 synthetic FIR cases.\n• Spectral GCN Topology: 98.6% link precision with Betweenness Centrality kingpin ranking.\n• Modern iOS Glass UI: Apple iOS frosted glass theme, 3-bar collapsible sidebar toggle & glowing Siri orb trigger.\n• Tactical Hardware & SIH26150: Physical write-blocker bus switch with raw bitstream hex dump & multi-vendor DVR engine.",
        },
        3: {
            0: "NCIS",
            4: "SIH 2026 — Idea Submission — NCIS",
            8: "• Skills Available: PyTorch Geometric, FastAPI, Web Speech API, React 18, Hailo NPU, Hardware Bus & DVR Protocols.\n• Software Core: Cloud server real-time deployment with zero proprietary licensing costs & agentic copilot loop.\n• Hardware Extension: Field-grade tactical write-blocker terminal running on low-power 12V/5V DC rails.",
            13: "• Maintenance: Cloud software updates instantly; modular hardware parts; automated 50-case benchmark evaluation.\n• Safety: Human-in-the-loop SP approval for all Copilot actions & 4-layer anti-prank SOS verification.",
            16: "• Software Payback: Immediate; replaces expensive multi-lakh yearly proprietary licenses (Cellebrite, i2).\n• Copilot Efficiency: Slashes statutory requisition drafting from 4 hours to 5 seconds per case.\n• Operational Simplicity: iOS-inspired glassmorphic UI with Siri voice interaction designed specifically for field officers.",
            21: "• Emissions: Low-power 5V hardware, zero paper waste via automated digital legal drafts.\n• Policy Alignment: Supports Digital India, Smart Policing & BNSS 2023 procedural compliance.",
        },
        4: {
            0: "NCIS",
            4: "SIH 2026 — Idea Submission — NCIS",
            6: "Target Beneficiaries : State Police Departments, Cyber Crime Units, NIA, NCB, Border Checkpoints, 16,000+ police stations & Dial 112 emergency patrol units nationwide.",
            10: "Faster network discovery\n(5s AI triage vs 30-day backlog)",
            15: "100.0%",
            16: "Case Copilot benchmark\naccuracy across 50 FIR cases",
            22: "• Citizen Protection: Fast syndicate disruption, multilingual voice reporting (EN/HI/TA) & GIS dispatch in <60s.\n• Judicial Integrity: Tamper-proof SHA-256 evidence chain certified under BSA Sec 65B & BNSS 2023 Sec 63.",
            25: "• License Savings: Eliminates recurring lab software licenses, saving ₹25–40L per unit.\n• Investigation Speed: Slashes evidence triage delay from 30 days to under 180 seconds, and legal drafting to 5 seconds.",
            28: "• Tamper-Proof Evidence: Hardware write-blocker protects physical bus integrity on-scene.\n• Green Tech: 100% digital evidence flow on low-power 5V hardware, zero paper waste.",
            35: "DPDP Act 2023 & BNSS 2023 Certified",
        },
        5: {
            0: "NCIS",
            4: "SIH 2026 — Idea Submission — NCIS",
            10: "1. Bureau of Police Research & Development (BPR&D) — Smart Policing Directives & AI Crime Analysis Guidelines (2024–2026).\n2. Ministry of Home Affairs, Govt. of India — Bharatiya Nagarik Suraksha Sanhita (BNSS 2023 Sec 94, 107, 176) & BSA Sec 65B Electronic Evidence.\n3. National Technical Research Organisation (NTRO) — SIH26150 Multi-Vendor DVR/NVR Forensic Standards (Hikvision, Dahua, CP Plus, Honeywell, Uniview).\n4. Kipf, T. N., & Welling, M. — Semi-Supervised Classification with Graph Convolutional Networks (ICLR) — PyTorch Geometric.\n5. National Crime Records Bureau (NCRB) — CCTNS 2.0 Schema & ERSS Dial 112 Real-Time Dispatch Protocols.",
            15: "[ 1 ] Full Documentation & Source — github.com/muhammedmaahir68-droid/cyber-kit\n[ 2 ] Live Production Portal — cyber-kit-police.vercel.app\n[ 3 ] Case Copilot AI API — /copilot/query, /copilot/eval, /copilot/cases\n[ 4 ] Tactical Hardware Terminal — Physical Write-Blocker Acquisition Bus\n[ 5 ] Interactive GIS Tracking & GNN Demo — cyber-kit-police.vercel.app\n[ 6 ] SIH Problem Statements — sih.gov.in (PS 189 - BPR&D / MHA & SIH26150 - NTRO)",
        }
    }

    for slide_idx, slide in enumerate(prs.slides):
        overrides = slide_overrides.get(slide_idx, {})
        for s_idx, shape in enumerate(slide.shapes):
            if not shape.has_text_frame:
                continue

            # Check if specific override applies
            if s_idx in overrides:
                new_text = overrides[s_idx]
                tf = shape.text_frame
                # Preserve font size & formatting if possible
                first_font_size = None
                first_font_bold = None
                first_font_name = None
                first_color = None
                if len(tf.paragraphs) > 0 and len(tf.paragraphs[0].runs) > 0:
                    first_font_size = tf.paragraphs[0].runs[0].font.size
                    first_font_bold = tf.paragraphs[0].runs[0].font.bold
                    first_font_name = tf.paragraphs[0].runs[0].font.name
                    if tf.paragraphs[0].runs[0].font.color and tf.paragraphs[0].runs[0].font.color.type:
                        try:
                            first_color = tf.paragraphs[0].runs[0].font.color.rgb
                        except Exception:
                            pass

                # Clear and set new text
                tf.clear()
                lines = new_text.split('\n')
                for l_idx, line in enumerate(lines):
                    if l_idx == 0:
                        p = tf.paragraphs[0]
                    else:
                        p = tf.add_paragraph()
                    p.text = line
                    if first_font_size:
                        p.font.size = first_font_size
                    if first_font_bold is not None:
                        p.font.bold = first_font_bold
                    if first_font_name:
                        p.font.name = first_font_name
                    if first_color:
                        p.font.color.rgb = first_color
            else:
                # Apply global replacements
                for p in shape.text_frame.paragraphs:
                    for old, new in global_replacements:
                        if old in p.text:
                            # Replace in text while trying to keep runs
                            full_p = p.text.replace(old, new)
                            p.text = full_p

    # Save to all destination paths
    for path in dst_paths:
        prs.save(path)
        print(f"Saved updated presentation to: {path}")

if __name__ == "__main__":
    src = "presentation/SIH_Ideate_Template_AAROHAN-X.pptx"
    destinations = [
        "presentation/SIH_Ideate_Template_AAROHAN-X.pptx",
        "presentation/SIH_Ideate_Template_NCIS.pptx"
    ]
    update_deck(src, destinations)
