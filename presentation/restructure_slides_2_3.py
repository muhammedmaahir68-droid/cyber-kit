import pptx
from pptx.util import Inches, Pt
from pptx.dml.color import RGBColor
from pptx.enum.text import PP_ALIGN, MSO_ANCHOR

def restructure_deck(pptx_path):
    prs = pptx.Presentation(pptx_path)

    # ──────────────────────────────────────────────────────────
    # SLIDE 2: PROPOSED SOLUTION & UNSTRUCTURED DATA CHALLENGE
    # ──────────────────────────────────────────────────────────
    s2 = prs.slides[1]
    
    # Update Slide 2 Header
    for shape in s2.shapes:
        if shape.has_text_frame:
            if "PROPOSED SOLUTION" in shape.text_frame.text:
                shape.text_frame.text = "PROPOSED SOLUTION — NCIS-TACTICAL (WITH AGENTIC AI VOICE MODULE & SIH26150)"
                if len(shape.text_frame.paragraphs) > 0 and len(shape.text_frame.paragraphs[0].runs) > 0:
                    shape.text_frame.paragraphs[0].runs[0].font.size = Pt(13)
                    shape.text_frame.paragraphs[0].runs[0].font.bold = True
                    shape.text_frame.paragraphs[0].runs[0].font.color.rgb = RGBColor(56, 189, 248)

    s2_overrides = {
        6: "The Unstructured Data Challenge",
        8: "Core Problem — Unstructured Evidence Chaos:\nPolice collect unstructured evidence across 7 disparate sources: FIR narrative text, call audio recordings, CCTV video feeds, WhatsApp chat freelists, and Hawala ledgers. Manual correlation takes 7–30 days, missing syndicate links.",
        10: "Gap In Existing Solutions:\nLegacy forensic tools (Cellebrite, EnCase) cost ₹25–40L/year, impose 7–30 days lab delay, cannot parse unstructured Indian multilingual text, and lack an autonomous AI voice copilot for real-time investigation.",
        12: "Scale Of The Problem:\nAffects 16,000+ police stations, state cyber crime cells, NIA, NCB, and Dial 112 emergency patrol units dealing with cross-border syndicates nationwide.",
        14: "Consequence If Unsolved:\nDelayed kingpin identification, fragmented evidence chains, financial hawala channels escaping detection, and fugitive escapes during active investigations.",
        15: "Our Solution — NCIS Architecture",
        17: "Dual Core: Tactical Edge Hardware + Cloud/Air-Gapped AI",
        18: "FEATURED: Agentic AI Voice Module (Case Copilot)",
        19: "Siri-Style Multilingual Voice Agent (EN/HI/TA) with Intent NLP, Missing Evidence Radar, and Automated BNSS Requisitions",
        20: "Why We Stand Out",
        22: "• Differentiator 1 — Autonomous Agentic AI Voice Module: Siri-style independent voice agent with dynamic acoustic soundwaves, multilingual NLP (EN/HI/TA), spoken brevity (≤3 sentences), and autonomous tool-calling loop.\n• Differentiator 2 — Unstructured Data to Structured GNN: Converts raw Hindi/English FIR text, CCTV video, and CDR dumps into a unified multi-partite graph with 98.6% link prediction precision.\n• Differentiator 3 — SIH26150 Multi-Vendor DVR & Judicial Seal: Hardware write-blocker bus switch, multi-vendor DVR/NVR extraction (Hikvision, Dahua, CP Plus), and BNS 2023 Sec 63 / BSA Sec 65B SHA-256 court evidence.",
        26: "MOD-01: Live Surveillance & Video Ingestion\nSub-50ms live camera ingestion, OpenCV face detection, and WebSocket telemetry stream",
        29: "MOD-02: Digital Forensics & SIH26150 DVR/NVR\n131,072 sector carving with Hailo NPU (26 TOPS) & multi-vendor DVR forensics (Hikvision, Dahua)",
        32: "MOD-03: GNN Syndicate Intel & Graph Mapping\nSpectral GCN maps syndicate topology with 98.6% precision & Betweenness Centrality kingpins",
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

    # ──────────────────────────────────────────────────────────
    # SLIDE 3: TECHNICAL APPROACH, PIPELINE & DUPLICATE CLEANUP
    # ──────────────────────────────────────────────────────────
    s3 = prs.slides[2]

    # Update Slide 3 Header
    for shape in s3.shapes:
        if shape.has_text_frame:
            if "TECHNICAL APPROACH" in shape.text_frame.text:
                shape.text_frame.text = "TECHNICAL APPROACH & PIPELINE (UNSTRUCTURED DATA TO AGENTIC ACTION)"
                if len(shape.text_frame.paragraphs) > 0 and len(shape.text_frame.paragraphs[0].runs) > 0:
                    shape.text_frame.paragraphs[0].runs[0].font.size = Pt(13)
                    shape.text_frame.paragraphs[0].runs[0].font.bold = True
                    shape.text_frame.paragraphs[0].runs[0].font.color.rgb = RGBColor(56, 189, 248)

    # Update Top Flow Steps in Slide 3
    s3_flow_overrides = {
        9: "1. Multi-Source Unstructured\nIngestion (FIRs, Audio, CCTV)",
        45: "2. NLP Entity Extraction\n& 128D Face Vectors",
        18: "3. Agentic AI Voice Module\n& Copilot Reasoning Loop",
        23: "4. Spectral GCN Syndicate\nTopology Engine (98.6%)",
        28: "5. Dual ERSS Patrol Mesh\n& BNSS 63 Evidence Seal",
        30: "Tech Stack & Compute",
        31: "• Frontend  : React 18, Tailwind CSS, Apple iOS Glassmorphism UI, Web Speech API / TTS, Siri Orb Visualizer\n• Backend   : Python FastAPI async, OpenCV Headless, Redis Pub/Sub, PostgreSQL 15, Hailo-8L Edge AI (26 TOPS)\n• AI/ML & NLP: PyTorch Geometric GCN (98.6%), Indian Legal NLP NER, Whisper/Web Speech, Brandes' Centrality\n• Forensics : SIH26150 Multi-Vendor DVR/NVR Tool, Hardware Write-Blocker Bus (PCIe NVMe, SATA III, USB 3.2)",
        33: "Unstructured Data & Agentic AI",
        34: "• Ingestion : Ingests raw unstructured Hindi/English FIR text, CCTV video streams, and audio in <500ms\n• Voice AI  : Siri Voice Orb Visualizer with dynamic acoustic waves; multilingual recognition (EN, HI, TA)\n• Brevity   : Spoken voice responses strictly capped at ≤3 sentences for rapid tactical radio protocol\n• Statutory : Autonomous tool calling generating BNSS 2023 Sec 94 (CDR), Sec 107 (Freeze) requisitions in 5s",
        36: "Production Status & 50-Case Eval",
        37: "• Status : 100% Working Production Platform (Live Vercel & GitHub Deployed)\n• Built  : 6 Operational Modules, Siri Voice Agent, Hailo NPU triage, Interactive GIS, SIH26150 DVR Engine\n• Live   : Deployed at cyber-kit-police.vercel.app (Publicly Accessible)\n• Eval   : 100% Entity F1, 100% Kingpin Top-3, 100% Evidence Gap Recall across 50 Synthetic FIR Cases"
    }

    for s_idx, text in s3_flow_overrides.items():
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

    # Update Title (Shape 38)
    if len(s3.shapes) > 38 and s3.shapes[38].has_text_frame:
        s3.shapes[38].text_frame.text = "Operational Platform: Live Interface + Agentic AI Voice Module & Benchmark"

    # Shape 42: Clean structured text for the Right Card
    if len(s3.shapes) > 42 and s3.shapes[42].has_text_frame:
        s42 = s3.shapes[42]
        s42.left = 4480560
        s42.top = 3520440
        s42.width = 4434840
        s42.height = 1298448
        tf42 = s42.text_frame
        tf42.word_wrap = True
        tf42.margin_left = Inches(0.1)
        tf42.margin_right = Inches(0.1)
        tf42.margin_top = Inches(0.08)
        tf42.clear()

        p = tf42.paragraphs[0]
        p.text = "AGENTIC AI VOICE MODULE & PRODUCTION HIGHLIGHTS:"
        p.font.size = Pt(8.5)
        p.font.bold = True
        p.font.color.rgb = RGBColor(56, 189, 248)

        bullets_prod = [
            "• Agentic Voice Loop: Siri-style glowing orb with dynamic soundwaves; spoken replies ≤3 sentences (EN/HI/TA).",
            "• Autonomous Tools: Auto-executes get_fir → extract_entities → rank_suspects → list_evidence_gaps.",
            "• Missing Evidence Radar: Flags pending CDRs, bank freezes, CCTV gaps; drafts BNSS 94/107/176 notices in 5s.",
            "• 50-Case Evaluation: 100% Entity F1, 100% Kingpin Top-3, 100% Evidence Gap Recall on ground-truth benchmark.",
            "• Live Platform: Deployed at cyber-kit-police.vercel.app with Apple iOS glassmorphic UI & 3-bar sidebar toggle (☰)."
        ]
        for b in bullets_prod:
            pb = tf42.add_paragraph()
            pb.text = b
            pb.font.size = Pt(7.5)
            pb.font.color.rgb = RGBColor(203, 213, 225)
            pb.space_before = Pt(1.5)

    # Safely remove redundant overlapping shapes:
    # Shape 44 is exact duplicate of Shape 42
    # Shape 43 is exact duplicate of Picture 41
    # Shape 39 is lingering text "[ Prototype photo / dashboard screenshot ]"
    shapes_to_remove = []
    for s_idx in [44, 43, 39]:
        if s_idx < len(s3.shapes):
            shapes_to_remove.append(s3.shapes[s_idx])

    for shape in shapes_to_remove:
        try:
            sp = shape._element
            sp.getparent().remove(sp)
            print("Removed redundant shape successfully.")
        except Exception as e:
            print(f"Could not remove shape: {e}")

    prs.save(pptx_path)
    print(f"Restructured and saved: {pptx_path}")

if __name__ == "__main__":
    targets = [
        "presentation/SIH_Ideate_Template_NCIS.pptx",
        "presentation/SIH_Ideate_Template_AAROHAN-X.pptx",
        "frontend/public/SIH_Ideate_Template_NCIS.pptx",
        "frontend/public/SIH_Ideate_Template_AAROHAN-X.pptx"
    ]
    for t in targets:
        restructure_deck(t)
