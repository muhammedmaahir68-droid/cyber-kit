import pptx
from pptx.util import Inches, Pt
from pptx.dml.color import RGBColor
from pptx.enum.text import PP_ALIGN

def fix_deck_contrast_and_fit(pptx_path):
    prs = pptx.Presentation(pptx_path)

    # High-contrast color definitions (for white slide background)
    c_navy = RGBColor(11, 31, 58)      # #0B1F3A - Deep Navy (Headings)
    c_blue = RGBColor(29, 78, 216)     # #1D4ED8 - Royal Blue (Key subheaders)
    c_teal = RGBColor(15, 118, 110)    # #0F766E - Dark Teal (AI Copilot highlights)
    c_amber = RGBColor(180, 83, 9)     # #B45309 - Dark Amber (Warning/Alerts, readable on white)
    c_red = RGBColor(185, 28, 28)      # #B91C1C - Dark Red (High Risk, readable on white)
    c_dark = RGBColor(15, 23, 42)      # #0F172A - Deep Charcoal/Slate (Main Body Text)
    c_slate = RGBColor(30, 41, 59)     # #1E293B - Dark Slate (Secondary Body Text)

    # ══════════════════════════════════════════════════════════
    # SLIDE 1: RESTORE HIGH CONTRAST & PRESERVE PORTABLE KIT
    # ══════════════════════════════════════════════════════════
    s1 = prs.slides[0]

    # Shape 6: Main Title
    if len(s1.shapes) > 6 and s1.shapes[6].has_text_frame:
        tf = s1.shapes[6].text_frame
        tf.clear()
        p = tf.paragraphs[0]
        p.text = "NCIS-TACTICAL : Multi-Vendor DVR/NVR Forensic Analysis & Intelligence Platform"
        p.font.size = Pt(13)
        p.font.bold = True
        p.font.name = "Segoe UI"
        p.font.color.rgb = c_blue

    # Shape 7: Problem Statement ID
    if len(s1.shapes) > 7 and s1.shapes[7].has_text_frame:
        tf = s1.shapes[7].text_frame
        tf.clear()
        p = tf.paragraphs[0]
        p.text = "Problem Statement ID  –  SIH26150"
        p.font.size = Pt(11)
        p.font.bold = True
        p.font.name = "Segoe UI"
        p.font.color.rgb = c_amber

    # Shape 8: Problem Statement Title Label
    if len(s1.shapes) > 8 and s1.shapes[8].has_text_frame:
        tf = s1.shapes[8].text_frame
        tf.clear()
        p = tf.paragraphs[0]
        p.text = "Problem Statement Title  –"
        p.font.size = Pt(9.5)
        p.font.bold = True
        p.font.name = "Segoe UI"
        p.font.color.rgb = c_navy

    # Shape 9: Problem Statement Full Title
    if len(s1.shapes) > 9 and s1.shapes[9].has_text_frame:
        tf = s1.shapes[9].text_frame
        tf.clear()
        p = tf.paragraphs[0]
        p.text = "Development of a Multi-Vendor DVR/NVR Forensic Analysis Tool for Standardized Acquisition, Recovery, and Analysis of Surveillance Evidence (National Technical Research Organisation - NTRO)"
        p.font.size = Pt(9)
        p.font.bold = True
        p.font.name = "Segoe UI"
        p.font.color.rgb = c_dark

    # Shape 10: Theme
    if len(s1.shapes) > 10 and s1.shapes[10].has_text_frame:
        tf = s1.shapes[10].text_frame
        tf.clear()
        p = tf.paragraphs[0]
        p.text = "Theme  –  Cyber Security & Digital Forensics / Surveillance Evidence Extraction"
        p.font.size = Pt(9)
        p.font.bold = True
        p.font.name = "Segoe UI"
        p.font.color.rgb = c_dark

    # Shape 11: PS Category
    if len(s1.shapes) > 11 and s1.shapes[11].has_text_frame:
        tf = s1.shapes[11].text_frame
        tf.clear()
        p = tf.paragraphs[0]
        p.text = "PS Category  –  Software (with Tactical Forensic Hardware Terminal & Agentic AI Voice Module)"
        p.font.size = Pt(9)
        p.font.bold = True
        p.font.name = "Segoe UI"
        p.font.color.rgb = c_dark

    # Shape 12: Team Name
    if len(s1.shapes) > 12 and s1.shapes[12].has_text_frame:
        tf = s1.shapes[12].text_frame
        tf.clear()
        p = tf.paragraphs[0]
        p.text = "Team Name  –  NCIS Core Cyber Intelligence Team"
        p.font.size = Pt(9)
        p.font.bold = True
        p.font.name = "Segoe UI"
        p.font.color.rgb = c_dark

    # Shape 13: Team ID
    if len(s1.shapes) > 13 and s1.shapes[13].has_text_frame:
        tf = s1.shapes[13].text_frame
        tf.clear()
        p = tf.paragraphs[0]
        p.text = "Team ID  –  T-SIH2026-89412"
        p.font.size = Pt(9)
        p.font.bold = True
        p.font.name = "Segoe UI"
        p.font.color.rgb = c_dark

    # ══════════════════════════════════════════════════════════
    # SLIDE 2: HIGH CONTRAST & PERFECT BOX FIT
    # ══════════════════════════════════════════════════════════
    s2 = prs.slides[1]

    # Slide 2 Header
    for shape in s2.shapes:
        if shape.has_text_frame and "PROPOSED SOLUTION" in shape.text_frame.text:
            tf = shape.text_frame
            tf.clear()
            p = tf.paragraphs[0]
            p.text = "PROPOSED SOLUTION — NCIS-TACTICAL (SIH26150 MULTI-VENDOR DVR/NVR & AGENTIC AI)"
            p.font.size = Pt(13)
            p.font.bold = True
            p.font.name = "Segoe UI"
            p.font.color.rgb = c_navy

    # Column 1 Header (Shape 6)
    if len(s2.shapes) > 6 and s2.shapes[6].has_text_frame:
        tf = s2.shapes[6].text_frame
        tf.clear()
        p = tf.paragraphs[0]
        p.text = "The Unstructured Surveillance & Evidence Challenge"
        p.font.size = Pt(10.5)
        p.font.bold = True
        p.font.color.rgb = c_navy

    # Column 1 Boxes (8, 10, 12, 14)
    c1_boxes = {
        8: ("Core Problem (SIH26150):", "Heterogeneous CCTV systems (Hikvision, Dahua, CP Plus, Honeywell) use proprietary filesystems (DHFS, HIK, WFS). Missing codecs and corrupt sectors delay forensics by 7–30 days.", c_amber),
        10: ("Gap In Existing Solutions:", "Legacy tools lack multi-vendor extraction, corrupt video frames, cost ₹25–40L/yr, and offer zero autonomous AI voice assistance during active on-scene raids.", c_red),
        12: ("Scale Of The Problem:", "Affects 16,000+ police stations, state cyber cells, NIA, NCB, and central agencies analyzing thousands of crime-scene CCTV hard drives nationwide.", c_navy),
        14: ("Consequence If Unsolved:", "Inadmissible electronic video evidence, lost deleted footage from overwritten DVR sectors, delayed kingpin identification, and fugitives escaping justice.", c_blue)
    }

    for s_idx, (title, body, h_color) in c1_boxes.items():
        if s_idx < len(s2.shapes) and s2.shapes[s_idx].has_text_frame:
            tf = s2.shapes[s_idx].text_frame
            tf.word_wrap = True
            tf.margin_left = Inches(0.08)
            tf.margin_right = Inches(0.08)
            tf.margin_top = Inches(0.05)
            tf.margin_bottom = Inches(0.05)
            tf.clear()

            p0 = tf.paragraphs[0]
            p0.text = title
            p0.font.size = Pt(7.8)
            p0.font.bold = True
            p0.font.name = "Segoe UI"
            p0.font.color.rgb = h_color
            p0.space_after = Pt(1)

            p1 = tf.add_paragraph()
            p1.text = body
            p1.font.size = Pt(7.0)
            p1.font.bold = False
            p1.font.name = "Segoe UI"
            p1.font.color.rgb = c_dark
            p1.space_before = Pt(0)

    # Column 2 Headers
    if len(s2.shapes) > 15 and s2.shapes[15].has_text_frame:
        tf = s2.shapes[15].text_frame
        tf.clear()
        p = tf.paragraphs[0]
        p.text = "Our Solution — SIH26150 Architecture"
        p.font.size = Pt(10.5)
        p.font.bold = True
        p.font.color.rgb = c_navy

    if len(s2.shapes) > 17 and s2.shapes[17].has_text_frame:
        tf = s2.shapes[17].text_frame
        tf.clear()
        p = tf.paragraphs[0]
        p.text = "System Model: Multi-Vendor DVR + Agentic Voice AI"
        p.font.size = Pt(8.0)
        p.font.bold = True
        p.font.color.rgb = c_teal

    if len(s2.shapes) > 18 and s2.shapes[18].has_text_frame:
        tf = s2.shapes[18].text_frame
        tf.clear()
        p = tf.paragraphs[0]
        p.text = "Why We Stand Out"
        p.font.size = Pt(10.5)
        p.font.bold = True
        p.font.color.rgb = c_navy

    # Column 2 Box 20: Differentiators (PREVENT OVERFLOW)
    if len(s2.shapes) > 20 and s2.shapes[20].has_text_frame:
        tf = s2.shapes[20].text_frame
        tf.word_wrap = True
        tf.margin_left = Inches(0.08)
        tf.margin_right = Inches(0.08)
        tf.margin_top = Inches(0.06)
        tf.margin_bottom = Inches(0.06)
        tf.clear()

        diffs = [
            ("• Differentiator 1 — Standardized Multi-Vendor DVR Ingestion:",
             "Direct raw bitstream extraction supporting Hikvision, Dahua, CP Plus, Honeywell & Uniview with write-blocker protection and zero timestamp contamination."),
            ("• Differentiator 2 — Autonomous Agentic AI Voice Module:",
             "Siri-style independent voice agent (EN/HI/TA) with acoustic wave visualizer, spoken brevity (≤3 sentences), and autonomous tool-calling loop (get_fir, rank_suspects)."),
            ("• Differentiator 3 — Unstructured Data to Court-Admissible Proof:",
             "Bypasses proprietary wrappers to recover deleted H.264/H.265 frames, auto-generating SHA-256 custody certificates under BNS 2023 Sec 63 & BSA Sec 65B.")
        ]

        for d_idx, (d_title, d_desc) in enumerate(diffs):
            p_t = tf.paragraphs[0] if d_idx == 0 else tf.add_paragraph()
            p_t.text = d_title
            p_t.font.size = Pt(7.2)
            p_t.font.bold = True
            p_t.font.name = "Segoe UI"
            p_t.font.color.rgb = c_blue if d_idx == 0 else (c_teal if d_idx == 1 else c_navy)
            p_t.space_before = Pt(2) if d_idx > 0 else Pt(0)
            p_t.space_after = Pt(1)

            p_d = tf.add_paragraph()
            p_d.text = d_desc
            p_d.font.size = Pt(6.8)
            p_d.font.bold = False
            p_d.font.name = "Segoe UI"
            p_d.font.color.rgb = c_dark
            p_d.space_before = Pt(0)
            p_d.space_after = Pt(1)

    # Column 3: Key Features (Shapes 21, 24, 27, 30, 33, 36, 39)
    if len(s2.shapes) > 21 and s2.shapes[21].has_text_frame:
        tf = s2.shapes[21].text_frame
        tf.clear()
        p = tf.paragraphs[0]
        p.text = "Key Features"
        p.font.size = Pt(10.5)
        p.font.bold = True
        p.font.color.rgb = c_navy

    c3_modules = {
        24: ("MOD-01: Live Surveillance & Video Ingestion", "Sub-50ms multi-camera ingestion, OpenCV facial embedding vectors, and real-time stream."),
        27: ("MOD-02: Multi-Vendor DVR/NVR Forensics (SIH26150)", "Standardized acquisition across Hikvision, Dahua, CP Plus, Honeywell & 131k sector carving."),
        30: ("MOD-03: GNN Syndicate Intel & Graph Mapping", "Spectral GCN maps suspect networks with 98.6% precision & Betweenness Centrality."),
        33: ("MOD-04: ERSS Patrol Mesh & GIS Grid", "Interactive GIS map with touch tracking, Haversine distance, dynamic ETA & rapid dispatch."),
        36: ("MOD-05: Tactical Hardware Console", "Physical write-blocker locks, multi-bus selector (PCIe/SATA/USB), raw hex bitstream dump."),
        39: ("MOD-06: Agentic AI Voice Module (Case Copilot)", "Siri voice agent, multilingual NLP, auto BNSS 94/107 drafts & 100% benchmark accuracy.")
    }

    for s_idx, (m_title, m_desc) in c3_modules.items():
        if s_idx < len(s2.shapes) and s2.shapes[s_idx].has_text_frame:
            tf = s2.shapes[s_idx].text_frame
            tf.word_wrap = True
            tf.margin_left = Inches(0.04)
            tf.margin_right = Inches(0.04)
            tf.margin_top = Inches(0.02)
            tf.margin_bottom = Inches(0.02)
            tf.clear()

            p0 = tf.paragraphs[0]
            p0.text = m_title
            p0.font.size = Pt(7.5)
            p0.font.bold = True
            p0.font.name = "Segoe UI"
            p0.font.color.rgb = c_teal if "MOD-06" in m_title else (c_blue if "MOD-02" in m_title else c_navy)
            p0.space_after = Pt(1)

            p1 = tf.add_paragraph()
            p1.text = m_desc
            p1.font.size = Pt(6.8)
            p1.font.bold = False
            p1.font.name = "Segoe UI"
            p1.font.color.rgb = c_dark
            p1.space_before = Pt(0)

    # ══════════════════════════════════════════════════════════
    # SLIDE 3: HIGH CONTRAST & PREVENT OVERFLOW COLLISION
    # ══════════════════════════════════════════════════════════
    s3 = prs.slides[2]

    # Slide 3 Header
    for shape in s3.shapes:
        if shape.has_text_frame and "TECHNICAL APPROACH" in shape.text_frame.text:
            tf = shape.text_frame
            tf.clear()
            p = tf.paragraphs[0]
            p.text = "TECHNICAL APPROACH & PIPELINE (SIH26150 MULTI-VENDOR DVR TO AGENTIC ACTION)"
            p.font.size = Pt(13)
            p.font.bold = True
            p.font.name = "Segoe UI"
            p.font.color.rgb = c_navy

    # Flowchart Step Boxes (Shapes 9, 45, 18, 23, 28)
    flow_steps = {
        9: "1. Multi-Vendor DVR\nAcquisition (SIH26150)",
        45: "2. NLP Extraction &\n128D Face Vectors",
        18: "3. Agentic AI Voice &\nCopilot Reasoning Loop",
        23: "4. Spectral GCN\nTopology Engine (98.6%)",
        28: "5. Dual ERSS Mesh &\nBNSS 63 Judicial Seal"
    }

    for s_idx, f_text in flow_steps.items():
        if s_idx < len(s3.shapes) and s3.shapes[s_idx].has_text_frame:
            tf = s3.shapes[s_idx].text_frame
            tf.word_wrap = True
            tf.margin_left = Inches(0.04)
            tf.margin_right = Inches(0.04)
            tf.clear()
            lines = f_text.split('\n')
            for l_idx, line in enumerate(lines):
                p = tf.paragraphs[0] if l_idx == 0 else tf.add_paragraph()
                p.text = line
                p.font.size = Pt(7.2)
                p.font.bold = True
                p.font.name = "Segoe UI"
                p.font.color.rgb = c_navy
                p.alignment = PP_ALIGN.CENTER

    # Middle Row: 3 Dashed Boxes (Shapes 30/31, 33/34, 36/37)
    # Box Titles
    if len(s3.shapes) > 30 and s3.shapes[30].has_text_frame:
        s3.shapes[30].text_frame.paragraphs[0].text = "Tech Stack & Hardware Bus"
        s3.shapes[30].text_frame.paragraphs[0].font.size = Pt(9)
        s3.shapes[30].text_frame.paragraphs[0].font.bold = True
        s3.shapes[30].text_frame.paragraphs[0].font.color.rgb = c_navy

    if len(s3.shapes) > 33 and s3.shapes[33].has_text_frame:
        s3.shapes[33].text_frame.paragraphs[0].text = "Unstructured Video & Agentic AI"
        s3.shapes[33].text_frame.paragraphs[0].font.size = Pt(9)
        s3.shapes[33].text_frame.paragraphs[0].font.bold = True
        s3.shapes[33].text_frame.paragraphs[0].font.color.rgb = c_navy

    if len(s3.shapes) > 36 and s3.shapes[36].has_text_frame:
        s3.shapes[36].text_frame.paragraphs[0].text = "Production Status & 50-Case Eval"
        s3.shapes[36].text_frame.paragraphs[0].font.size = Pt(9)
        s3.shapes[36].text_frame.paragraphs[0].font.bold = True
        s3.shapes[36].text_frame.paragraphs[0].font.color.rgb = c_navy

    # Content Box 31 (Tech Stack): 4 concise bullet points
    if len(s3.shapes) > 31 and s3.shapes[31].has_text_frame:
        tf = s3.shapes[31].text_frame
        tf.word_wrap = True
        tf.margin_left = Inches(0.08)
        tf.margin_right = Inches(0.08)
        tf.margin_top = Inches(0.05)
        tf.margin_bottom = Inches(0.05)
        tf.clear()
        bullets31 = [
            ("• Forensics :", " SIH26150 Multi-Vendor DVR Tool, Hardware Bus (PCIe, SATA, USB)"),
            ("• AI/ML/NLP :", " Hailo NPU (26 TOPS), PyG Spectral GCN (98.6%), Legal SpaCy NER"),
            ("• Frontend  :", " React 18, Tailwind CSS, Apple iOS Glassmorphism, Web Speech API"),
            ("• Backend   :", " Python FastAPI async, OpenCV Headless, Redis Pub/Sub, PostgreSQL")
        ]
        for idx, (label, val) in enumerate(bullets31):
            p = tf.paragraphs[0] if idx == 0 else tf.add_paragraph()
            p.text = label + val
            p.font.size = Pt(6.8)
            p.font.bold = False
            p.font.name = "Segoe UI"
            p.font.color.rgb = c_dark
            p.space_after = Pt(1)

    # Content Box 34 (Unstructured Video & Agentic AI): PREVENT OVERFLOW INTO TITLE
    if len(s3.shapes) > 34 and s3.shapes[34].has_text_frame:
        tf = s3.shapes[34].text_frame
        tf.word_wrap = True
        tf.margin_left = Inches(0.08)
        tf.margin_right = Inches(0.08)
        tf.margin_top = Inches(0.05)
        tf.margin_bottom = Inches(0.05)
        tf.clear()
        bullets34 = [
            ("• Video Parsing:", " Decodes DHFS, HIK, WFS extracting H.264/H.265 frames in <180s"),
            ("• Voice Copilot:", " Siri Voice Orb Visualizer with multi-turn audio (EN, HI, TA)"),
            ("• Spoken Voice :", " Concise replies strictly ≤3 sentences for tactical radio brevity"),
            ("• Legal Engine :", " Auto-generates BNSS 2023 Sec 94/107 requisitions in under 5s")
        ]
        for idx, (label, val) in enumerate(bullets34):
            p = tf.paragraphs[0] if idx == 0 else tf.add_paragraph()
            p.text = label + val
            p.font.size = Pt(6.8)
            p.font.bold = False
            p.font.name = "Segoe UI"
            p.font.color.rgb = c_dark
            p.space_after = Pt(1)

    # Content Box 37 (Production Status & Eval)
    if len(s3.shapes) > 37 and s3.shapes[37].has_text_frame:
        tf = s3.shapes[37].text_frame
        tf.word_wrap = True
        tf.margin_left = Inches(0.08)
        tf.margin_right = Inches(0.08)
        tf.margin_top = Inches(0.05)
        tf.margin_bottom = Inches(0.05)
        tf.clear()
        bullets37 = [
            ("• Deployment :", " 100% Live production portal at cyber-kit-police.vercel.app"),
            ("• Architecture:", " 6 Operational Modules, Siri Voice Agent, Hailo NPU edge triage"),
            ("• Benchmarks  :", " 100% Entity F1, 100% Kingpin Top-3, 100% Evidence Gap Recall"),
            ("• Compliance  :", " Full adherence to BNSS 2023, BSA Sec 65B, BNS 63 & DPDP 2023")
        ]
        for idx, (label, val) in enumerate(bullets37):
            p = tf.paragraphs[0] if idx == 0 else tf.add_paragraph()
            p.text = label + val
            p.font.size = Pt(6.8)
            p.font.bold = False
            p.font.name = "Segoe UI"
            p.font.color.rgb = c_dark
            p.space_after = Pt(1)

    # Title for Bottom Row: Shape 38
    if len(s3.shapes) > 38 and s3.shapes[38].has_text_frame:
        tf = s3.shapes[38].text_frame
        tf.clear()
        p = tf.paragraphs[0]
        p.text = "Operational Platform: Live Interface + Agentic AI Voice Module & Benchmark"
        p.font.size = Pt(10.5)
        p.font.bold = True
        p.font.name = "Segoe UI"
        p.font.color.rgb = c_navy

    # Bottom Right Card: AGENTIC AI VOICE MODULE & PRODUCTION HIGHLIGHTS
    for shape in s3.shapes:
        if shape.has_text_frame and ("AGENTIC AI VOICE MODULE" in shape.text_frame.text or "LIVE WORKING" in shape.text_frame.text):
            tf = shape.text_frame
            tf.word_wrap = True
            tf.margin_left = Inches(0.1)
            tf.margin_right = Inches(0.1)
            tf.margin_top = Inches(0.08)
            tf.clear()

            p0 = tf.paragraphs[0]
            p0.text = "AGENTIC AI VOICE MODULE & SIH26150 HIGHLIGHTS:"
            p0.font.size = Pt(8.5)
            p0.font.bold = True
            p0.font.name = "Segoe UI"
            p0.font.color.rgb = c_blue
            p0.space_after = Pt(2)

            bullets_highlights = [
                "• SIH26150 DVR Core: Standardized CCTV evidence recovery across Hikvision, Dahua, CP Plus & Honeywell.",
                "• Agentic Voice Loop: Siri-style glowing orb with dynamic soundwaves; spoken replies ≤3 sentences (EN/HI/TA).",
                "• Autonomous Tools: Auto-executes get_fir → extract_entities → rank_suspects → list_evidence_gaps.",
                "• Missing Evidence Radar: Flags pending CCTV footage, CDRs, bank freezes; drafts BNSS 94/107 notices in 5s.",
                "• 50-Case Evaluation: 100% Entity F1, 100% Kingpin Top-3, 100% Evidence Gap Recall on ground-truth benchmark."
            ]
            for b in bullets_highlights:
                pb = tf.add_paragraph()
                pb.text = b
                pb.font.size = Pt(7.0)
                pb.font.bold = False
                pb.font.name = "Segoe UI"
                pb.font.color.rgb = c_dark
                pb.space_before = Pt(1)

    prs.save(pptx_path)
    print(f"High-contrast formatting and fit applied to: {pptx_path}")

if __name__ == "__main__":
    targets = [
        "presentation/SIH_Ideate_Template_NCIS.pptx",
        "presentation/SIH_Ideate_Template_AAROHAN-X.pptx",
        "frontend/public/SIH_Ideate_Template_NCIS.pptx",
        "frontend/public/SIH_Ideate_Template_AAROHAN-X.pptx"
    ]
    for t in targets:
        fix_deck_contrast_and_fit(t)
