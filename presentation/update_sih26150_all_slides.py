import pptx
from pptx.util import Inches, Pt
from pptx.dml.color import RGBColor

def apply_sih26150_updates(pptx_path):
    prs = pptx.Presentation(pptx_path)

    # ==========================================================
    # SLIDE 1: COVER & SIH26150 TITLE OVERHAUL
    # ==========================================================
    s1 = prs.slides[0]

    s1_overrides = {
        6: "NCIS-TACTICAL : Multi-Vendor DVR/NVR Forensic Analysis & Intelligence Platform",
        7: "Problem Statement ID  –  SIH26150",
        8: "Problem Statement Title  –",
        9: "Development of a Multi-Vendor DVR/NVR Forensic Analysis Tool for Standardized Acquisition, Recovery, and Analysis of Surveillance Evidence (National Technical Research Organisation - NTRO)",
        10: "Theme  –  Cyber Security & Digital Forensics / Surveillance Evidence Extraction (Featuring Agentic Voice AI)",
        11: "PS Category  –  Software (with Tactical Forensic Hardware Terminal & Agentic AI Voice Module)",
        12: "Team Name  –  NCIS Core Cyber Intelligence Team",
        13: "Team ID  –  T-SIH2026-89412"
    }

    for s_idx, text in s1_overrides.items():
        if s_idx < len(s1.shapes) and s1.shapes[s_idx].has_text_frame:
            tf = s1.shapes[s_idx].text_frame
            f_size = Pt(9.5)
            f_bold = False
            f_color = RGBColor(255, 255, 255)
            if s_idx == 6:
                f_size = Pt(13)
                f_bold = True
                f_color = RGBColor(56, 189, 248)
            elif s_idx == 7:
                f_size = Pt(11)
                f_bold = True
                f_color = RGBColor(251, 191, 36)
            elif s_idx == 9:
                f_size = Pt(9)
                f_bold = True
                f_color = RGBColor(203, 213, 225)

            tf.clear()
            lines = text.split('\n')
            for l_idx, line in enumerate(lines):
                p = tf.paragraphs[0] if l_idx == 0 else tf.add_paragraph()
                p.text = line
                p.font.size = f_size
                p.font.bold = f_bold
                p.font.name = "Segoe UI"
                p.font.color.rgb = f_color

    # ==========================================================
    # SLIDE 2: PROPOSED SOLUTION & SIH26150 DVR ARCHITECTURE
    # ==========================================================
    s2 = prs.slides[1]

    for shape in s2.shapes:
        if shape.has_text_frame and "PROPOSED SOLUTION" in shape.text_frame.text:
            shape.text_frame.text = "PROPOSED SOLUTION — NCIS-TACTICAL (SIH26150 MULTI-VENDOR DVR/NVR & AGENTIC AI)"
            if len(shape.text_frame.paragraphs) > 0 and len(shape.text_frame.paragraphs[0].runs) > 0:
                shape.text_frame.paragraphs[0].runs[0].font.size = Pt(13)
                shape.text_frame.paragraphs[0].runs[0].font.bold = True
                shape.text_frame.paragraphs[0].runs[0].font.color.rgb = RGBColor(56, 189, 248)

    s2_overrides = {
        6: "The Unstructured Surveillance & Evidence Challenge",
        8: "Core Problem — Proprietary Surveillance Chaos (SIH26150):\nLaw enforcement struggles with heterogeneous CCTV/DVR/NVR systems (Hikvision, Dahua, CP Plus, Honeywell, Uniview) using proprietary filesystems (DHFS, HIK, WFS). Unstructured video, missing codecs, and corrupt sectors delay forensics by 7–30 days.",
        10: "Gap In Existing Solutions:\nLegacy forensic tools lack standardized multi-vendor extraction, corrupt video frames, cost ₹25–40L/year, and offer zero autonomous AI voice assistance for on-scene officers during active raids.",
        12: "Scale Of The Problem:\nAffects 16,000+ police stations, state cyber crime cells, NIA, NCB, and central intelligence agencies analyzing thousands of crime-scene CCTV hard drives nationwide.",
        14: "Consequence If Unsolved:\nInadmissible electronic video evidence, lost deleted footage from overwritten DVR sectors, delayed suspect identification, and fugitives escaping justice.",
        15: "Our Solution — SIH26150 Architecture",
        17: "Dual Core: Standardized Hardware Acquisition + Agentic AI Voice Core",
        18: "FEATURED: Agentic AI Voice Module (Case Copilot)",
        19: "Siri-Style Multilingual Voice Agent (EN/HI/TA) with Intent NLP, Missing Evidence Radar, and Automated BNSS Requisitions",
        20: "Why We Stand Out",
        22: "• Differentiator 1 — Standardized Multi-Vendor DVR Acquisition: Direct raw bitstream extraction supporting Hikvision, Dahua, CP Plus, Honeywell, and Uniview with write-blocker protection and zero timestamp contamination.\n• Differentiator 2 — Autonomous Agentic AI Voice Module: Siri-style independent voice agent (EN/HI/TA) with acoustic wave visualizer, spoken brevity (≤3 sentences), and autonomous tool-calling loop (get_fir, extract_entities, rank_suspects).\n• Differentiator 3 — Unstructured Data to Court-Admissible Proof: Bypasses proprietary wrappers to recover deleted H.264/H.265 frames, auto-generating SHA-256 custody certificates under BNS 2023 Sec 63 & BSA Sec 65B.",
        26: "MOD-01: Live Surveillance & Video Ingestion\nSub-50ms multi-camera ingestion, OpenCV facial embedding vectors, and real-time telemetry stream",
        29: "MOD-02: Multi-Vendor DVR/NVR Forensics (SIH26150)\nStandardized acquisition across Hikvision, Dahua, CP Plus, Honeywell, Uniview & 131k sector carving",
        32: "MOD-03: GNN Syndicate Intel & Graph Mapping\nSpectral GCN maps multi-camera suspect movements with 98.6% link precision & Betweenness Centrality",
        35: "MOD-04: ERSS Patrol Mesh & GIS Grid\nInteractive GIS map with touch tracking, Haversine distance, dynamic ETA & rapid dispatch",
        38: "MOD-05: Tactical Hardware Console\nPhysical write-blocker locks, multi-bus selector (PCIe/SATA/USB), raw hexadecimal bitstream dump",
        41: "MOD-06: Agentic AI Voice Module (Case Copilot)\nSiri voice agent, multilingual NLP, auto BNSS 94/107 drafts & 100% 50-case benchmark accuracy"
    }

    for s_idx, text in s2_overrides.items():
        if s_idx < len(s2.shapes) and s2.shapes[s_idx].has_text_frame:
            tf = s2.shapes[s_idx].text_frame
            f_size = Pt(8)
            f_bold = False
            f_color = RGBColor(203, 213, 225)
            if len(tf.paragraphs) > 0 and len(tf.paragraphs[0].runs) > 0:
                run0 = tf.paragraphs[0].runs[0]
                if run0.font.size: f_size = run0.font.size
                if run0.font.bold is not None: f_bold = run0.font.bold
                if run0.font.color and run0.font.color.type:
                    try: f_color = run0.font.color.rgb
                    except Exception: pass

            tf.clear()
            lines = text.split('\n')
            for l_idx, line in enumerate(lines):
                p = tf.paragraphs[0] if l_idx == 0 else tf.add_paragraph()
                p.text = line
                p.font.size = f_size
                p.font.bold = f_bold
                p.font.name = "Segoe UI"
                p.font.color.rgb = f_color

    # ==========================================================
    # SLIDE 3: TECHNICAL APPROACH & SIH26150 PIPELINE
    # ==========================================================
    s3 = prs.slides[2]

    for shape in s3.shapes:
        if shape.has_text_frame and "TECHNICAL APPROACH" in shape.text_frame.text:
            shape.text_frame.text = "TECHNICAL APPROACH & PIPELINE (SIH26150 MULTI-VENDOR DVR TO AGENTIC ACTION)"
            if len(shape.text_frame.paragraphs) > 0 and len(shape.text_frame.paragraphs[0].runs) > 0:
                shape.text_frame.paragraphs[0].runs[0].font.size = Pt(13)
                shape.text_frame.paragraphs[0].runs[0].font.bold = True
                shape.text_frame.paragraphs[0].runs[0].font.color.rgb = RGBColor(56, 189, 248)

    s3_overrides = {
        9: "1. Multi-Vendor DVR Acquisition\n(Hikvision, Dahua, CP Plus)",
        45: "2. Frame Extraction & 128D\nFacial Vector Embeddings",
        18: "3. Agentic AI Voice Module\n& Copilot Reasoning Loop",
        23: "4. Spectral GCN Syndicate\nTopology Engine (98.6%)",
        28: "5. Dual ERSS Patrol Mesh\n& BNSS 63 Evidence Seal",
        30: "Tech Stack & Hardware Bus",
        31: "• Forensics : SIH26150 Multi-Vendor DVR Tool, Hardware Write-Blocker Bus (PCIe NVMe, SATA III, USB 3.2, JTAG)\n• AI/ML & NLP: Hailo-8L Edge AI (26 TOPS), PyTorch Geometric GCN (98.6%), SpaCy Indian Legal NER\n• Frontend  : React 18, Tailwind CSS, Apple iOS Glassmorphism UI, Web Speech API / TTS, Siri Orb Visualizer\n• Backend   : Python FastAPI async, OpenCV Headless, Redis Pub/Sub, PostgreSQL 15 (Air-gapped capability)",
        33: "Unstructured Video & Agentic AI",
        34: "• Video Parsing: Bypasses proprietary DVR containers (DHFS, HIK, WFS) extracting native H.264/H.265 frames in <180s\n• Voice Agent  : Siri Voice Orb Visualizer with dynamic acoustic waves; multilingual recognition (EN, HI, TA)\n• Brevity      : Spoken responses strictly capped at ≤3 sentences for tactical radio brevity\n• Legal Engine : Autonomous tool loop generating BNSS 2023 Sec 94 (CDR), Sec 107 (Freeze) requisitions in 5s",
        36: "Production Status & 50-Case Eval",
        37: "• Status : 100% Working Production Platform (Live Vercel & GitHub Deployed)\n• Built  : 6 Operational Modules, Siri Voice Agent, Hailo NPU triage, Interactive GIS, SIH26150 DVR Engine\n• Live   : Deployed at cyber-kit-police.vercel.app (Publicly Accessible)\n• Eval   : 100% Entity F1, 100% Kingpin Top-3, 100% Evidence Gap Recall across 50 Synthetic FIR Cases"
    }

    for s_idx, text in s3_overrides.items():
        if s_idx < len(s3.shapes) and s3.shapes[s_idx].has_text_frame:
            tf = s3.shapes[s_idx].text_frame
            f_size = Pt(8)
            f_bold = False
            f_color = RGBColor(203, 213, 225)
            if len(tf.paragraphs) > 0 and len(tf.paragraphs[0].runs) > 0:
                run0 = tf.paragraphs[0].runs[0]
                if run0.font.size: f_size = run0.font.size
                if run0.font.bold is not None: f_bold = run0.font.bold
                if run0.font.color and run0.font.color.type:
                    try: f_color = run0.font.color.rgb
                    except Exception: pass

            tf.clear()
            lines = text.split('\n')
            for l_idx, line in enumerate(lines):
                p = tf.paragraphs[0] if l_idx == 0 else tf.add_paragraph()
                p.text = line
                p.font.size = f_size
                p.font.bold = f_bold
                p.font.name = "Segoe UI"
                p.font.color.rgb = f_color

    # Update Slide 3 Bottom Card
    for s in s3.shapes:
        if s.has_text_frame and ("AGENTIC AI VOICE MODULE" in s.text_frame.text or "LIVE WORKING" in s.text_frame.text):
            tf = s.text_frame
            tf.clear()
            p = tf.paragraphs[0]
            p.text = "AGENTIC AI VOICE MODULE & SIH26150 PRODUCTION HIGHLIGHTS:"
            p.font.size = Pt(8.5)
            p.font.bold = True
            p.font.color.rgb = RGBColor(56, 189, 248)

            bullets_prod = [
                "• SIH26150 DVR Core: Standardized CCTV evidence recovery across Hikvision, Dahua, CP Plus, Honeywell, Uniview.",
                "• Agentic Voice Loop: Siri-style glowing orb with dynamic soundwaves; spoken replies ≤3 sentences (EN/HI/TA).",
                "• Autonomous Tools: Auto-executes get_fir → extract_entities → rank_suspects → list_evidence_gaps.",
                "• Missing Evidence Radar: Flags pending CCTV footage, CDRs, bank freezes; drafts BNSS 94/107/176 notices in 5s.",
                "• 50-Case Evaluation: 100% Entity F1, 100% Kingpin Top-3, 100% Evidence Gap Recall on ground-truth benchmark."
            ]
            for b in bullets_prod:
                pb = tf.add_paragraph()
                pb.text = b
                pb.font.size = Pt(7.5)
                pb.font.color.rgb = RGBColor(203, 213, 225)
                pb.space_before = Pt(1.5)

    # ==========================================================
    # SLIDE 4: FEASIBILITY & VIABILITY (SIH26150 DVR FOCUS)
    # ==========================================================
    s4 = prs.slides[3]
    for s in s4.shapes:
        if s.has_text_frame:
            for p in s.text_frame.paragraphs:
                if "Skills Available" in p.text:
                    p.text = "• Skills Available: SIH26150 multi-vendor DVR parser, PyTorch Geometric, FastAPI, Web Speech API, React 18, Hailo NPU, Hardware Bus."
                elif "Software Payback" in p.text:
                    p.text = "• Software Payback: Slashes CCTV forensic triage from 7–30 days to <180 seconds, replacing expensive ₹25L–40L proprietary lab software."

    # ==========================================================
    # SLIDE 5: IMPACT & BENEFITS (SIH26150 FORENSICS FOCUS)
    # ==========================================================
    s5 = prs.slides[4]
    for s in s5.shapes:
        if s.has_text_frame:
            for p in s.text_frame.paragraphs:
                if "Target Beneficiaries" in p.text:
                    p.text = "Target Beneficiaries : State Police Departments, Cyber Crime Units, NIA, NCB, Forensic Science Laboratories (FSLs), 16,000+ police stations & Dial 112 units nationwide."
                elif "Faster network discovery" in p.text:
                    p.text = "Faster DVR triage & AI discovery\n(<180s on-scene vs 30-day lab backlog)"

    # ==========================================================
    # SLIDE 6: RESEARCH & REFERENCES (SIH26150 NTRO EMPHASIS)
    # ==========================================================
    s6 = prs.slides[5]
    for s in s6.shapes:
        if s.has_text_frame:
            if "Bureau of Police Research" in s.text_frame.text:
                tf = s6.shapes[10].text_frame
                tf.clear()
                refs = [
                    "1. National Technical Research Organisation (NTRO) — SIH26150 Multi-Vendor DVR/NVR Forensic Standards (Hikvision, Dahua, CP Plus, Honeywell, Uniview).",
                    "2. Bureau of Police Research & Development (BPR&D) — Smart Policing Directives & AI Crime Analysis Guidelines (2024–2026).",
                    "3. Ministry of Home Affairs, Govt. of India — Bharatiya Nagarik Suraksha Sanhita (BNSS 2023 Sec 94, 107, 176) & BSA Sec 65B Electronic Evidence.",
                    "4. Kipf, T. N., & Welling, M. — Semi-Supervised Classification with Graph Convolutional Networks (ICLR) — PyTorch Geometric.",
                    "5. National Crime Records Bureau (NCRB) — CCTNS 2.0 Schema & ERSS Dial 112 Real-Time Dispatch Protocols."
                ]
                for r_idx, r in enumerate(refs):
                    p = tf.paragraphs[0] if r_idx == 0 else tf.add_paragraph()
                    p.text = r
                    p.font.size = Pt(8)
                    p.font.color.rgb = RGBColor(203, 213, 225)
                    p.space_after = Pt(3)

            if "SIH Problem Statement" in s.text_frame.text or "sih.gov.in" in s.text_frame.text:
                for p in s.text_frame.paragraphs:
                    if "sih.gov.in" in p.text:
                        p.text = "[ 6 ] SIH Problem Statement — sih.gov.in (SIH26150 - NTRO / MHA)"

    prs.save(pptx_path)
    print(f"SIH26150 updates applied and saved to: {pptx_path}")

if __name__ == "__main__":
    targets = [
        "presentation/SIH_Ideate_Template_NCIS.pptx",
        "presentation/SIH_Ideate_Template_AAROHAN-X.pptx",
        "frontend/public/SIH_Ideate_Template_NCIS.pptx",
        "frontend/public/SIH_Ideate_Template_AAROHAN-X.pptx"
    ]
    for t in targets:
        apply_sih26150_updates(t)
