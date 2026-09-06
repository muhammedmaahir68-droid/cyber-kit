import os
import shutil
import pptx
from pptx.util import Inches, Pt
from pptx.dml.color import RGBColor
from pptx.enum.text import PP_ALIGN, MSO_ANCHOR
from pptx.enum.shapes import MSO_SHAPE

def create_sih189_presentation():
    prs = pptx.Presentation()
    prs.slide_width = Inches(10.0)
    prs.slide_height = Inches(5.625)

    blank_layout = prs.slide_layouts[6]

    # Color Palette
    BG_DARK = RGBColor(10, 15, 30)          # Deep Navy Slate 950
    CARD_BG = RGBColor(15, 23, 42)          # Slate 900
    CARD_BORDER = RGBColor(30, 41, 59)      # Slate 800
    ACCENT_CYAN = RGBColor(56, 189, 248)    # Cyan 400
    ACCENT_PURPLE = RGBColor(192, 132, 252) # Purple 400
    ACCENT_EMERALD = RGBColor(52, 211, 153) # Emerald 400
    ACCENT_AMBER = RGBColor(251, 191, 36)   # Amber 400
    ACCENT_RED = RGBColor(248, 113, 113)    # Red 400
    TEXT_WHITE = RGBColor(255, 255, 255)    # Pure White
    TEXT_MUTED = RGBColor(148, 163, 184)    # Slate 400
    TEXT_LIGHT = RGBColor(203, 213, 225)    # Slate 300

    asset_dir = r"C:\Users\mahir\OneDrive\Documents\SIH_2026_AAROHAN-X_Presentation_Kit\Visual_Assets"

    def add_slide_header(slide, title_text, category_badge, slide_num):
        # Background fill
        bg_shape = slide.shapes.add_shape(MSO_SHAPE.RECTANGLE, 0, 0, Inches(10.0), Inches(5.625))
        bg_shape.fill.solid()
        bg_shape.fill.fore_color.rgb = BG_DARK
        bg_shape.line.fill.background()

        # Top Bar shape
        top_bar = slide.shapes.add_shape(MSO_SHAPE.RECTANGLE, 0, 0, Inches(10.0), Inches(0.55))
        top_bar.fill.solid()
        top_bar.fill.fore_color.rgb = CARD_BG
        top_bar.line.color.rgb = CARD_BORDER

        # Header Title (Left side)
        tb_title = slide.shapes.add_textbox(Inches(0.35), Inches(0.08), Inches(6.7), Inches(0.4))
        tf_title = tb_title.text_frame
        tf_title.word_wrap = True
        tf_title.margin_left = 0
        tf_title.margin_top = 0
        p = tf_title.paragraphs[0]
        p.text = f"SIH 2026 (PS 189) | {title_text.upper()}"
        p.font.size = Pt(11)
        p.font.bold = True
        p.font.color.rgb = ACCENT_CYAN
        p.font.name = "Segoe UI"

        # Badge & Slide Number (Right side)
        tb_num = slide.shapes.add_textbox(Inches(7.1), Inches(0.08), Inches(2.55), Inches(0.4))
        tf_num = tb_num.text_frame
        tf_num.word_wrap = False
        tf_num.margin_left = 0
        tf_num.margin_top = 0
        p_num = tf_num.paragraphs[0]
        p_num.text = f"[{category_badge}]  Slide {slide_num}/6"
        p_num.alignment = PP_ALIGN.RIGHT
        p_num.font.size = Pt(10)
        p_num.font.bold = True
        p_num.font.color.rgb = ACCENT_PURPLE
        p_num.font.name = "Segoe UI"

    # ==========================================
    # SLIDE 1: TITLE & PROBLEM STATEMENT DETAILS
    # ==========================================
    s1 = prs.slides.add_slide(blank_layout)
    add_slide_header(s1, "Title & Problem Statement Details", "IDEA SUBMISSION", 1)

    # Left Card
    c1 = s1.shapes.add_shape(MSO_SHAPE.ROUNDED_RECTANGLE, Inches(0.35), Inches(0.7), Inches(5.6), Inches(4.65))
    c1.fill.solid()
    c1.fill.fore_color.rgb = CARD_BG
    c1.line.color.rgb = ACCENT_CYAN
    c1.line.width = Pt(1.5)

    tf1 = c1.text_frame
    tf1.vertical_anchor = MSO_ANCHOR.TOP
    tf1.word_wrap = True
    tf1.margin_left = Inches(0.25)
    tf1.margin_right = Inches(0.25)
    tf1.margin_top = Inches(0.2)

    p = tf1.paragraphs[0]
    p.text = "AAROHAN-X"
    p.font.size = Pt(20)
    p.font.bold = True
    p.font.color.rgb = TEXT_WHITE
    p.font.name = "Segoe UI"

    p2 = tf1.add_paragraph()
    p2.text = "AI-Powered Criminal Network Analysis & Tactical Field Triage Ecosystem"
    p2.font.size = Pt(10.5)
    p2.font.bold = True
    p2.font.color.rgb = ACCENT_CYAN
    p2.space_after = Pt(8)

    meta_items = [
        ("Problem Statement ID", "189 (Smart India Hackathon 2026)"),
        ("Problem Statement Title", "AI-Powered Criminal Network Analysis System"),
        ("Organization", "Bureau of Police Research & Development (BPR&D) / MHA"),
        ("Theme / Category", "Smart Automation / Cyber Security (Hardware + Software)"),
        ("Team Name & ID", "AAROHAN-X  |  Team ID: T-SIH2026-89412"),
        ("Core Architecture", "3-Pillar Unified Intelligence: On-Scene Hardware Triage + GNN Link Topology + Dual ERSS Emergency Patrol Mesh")
    ]

    for label, val in meta_items:
        pm = tf1.add_paragraph()
        run1 = pm.add_run()
        run1.text = f"{label}: "
        run1.font.bold = True
        run1.font.size = Pt(9.5)
        run1.font.color.rgb = ACCENT_AMBER
        run1.font.name = "Segoe UI"
        
        run2 = pm.add_run()
        run2.text = val
        run2.font.bold = False
        run2.font.size = Pt(9)
        run2.font.color.rgb = TEXT_LIGHT
        run2.font.name = "Segoe UI"
        pm.space_after = Pt(4)

    # Right Card
    c1_right = s1.shapes.add_shape(MSO_SHAPE.ROUNDED_RECTANGLE, Inches(6.1), Inches(0.7), Inches(3.55), Inches(4.65))
    c1_right.fill.solid()
    c1_right.fill.fore_color.rgb = CARD_BG
    c1_right.line.color.rgb = CARD_BORDER

    img1_path = os.path.join(asset_dir, "ForensiX_Tactical_Device_Hero.jpg")
    if os.path.exists(img1_path):
        s1.shapes.add_picture(img1_path, Inches(6.25), Inches(0.85), Inches(3.25), Inches(2.55))

    tb_img1 = s1.shapes.add_textbox(Inches(6.2), Inches(3.5), Inches(3.35), Inches(1.75))
    tf_img1 = tb_img1.text_frame
    tf_img1.vertical_anchor = MSO_ANCHOR.TOP
    tf_img1.word_wrap = True
    p = tf_img1.paragraphs[0]
    p.text = "HARDWARE & ON-SCENE TRIAGE UNIT"
    p.font.size = Pt(9.5)
    p.font.bold = True
    p.font.color.rgb = ACCENT_EMERALD

    specs = [
        "• Make-in-India Handheld Unit (₹10,000 cost vs ₹25L Cellebrite)",
        "• FPGA Hardware Write-Blocker IC (100% Court-Admissible BNS 63)",
        "• 13 TOPS Hailo-8L NPU for 100% Offline GNN & Face Matching",
        "• Dual ERSS Patrol Mesh with Sleeping Officer DND Override Alert"
    ]
    for sp in specs:
        p = tf_img1.add_paragraph()
        p.text = sp
        p.font.size = Pt(8.5)
        p.font.color.rgb = TEXT_MUTED

    # ==========================================
    # SLIDE 2: PROPOSED SOLUTION & ARCHITECTURE
    # ==========================================
    s2 = prs.slides.add_slide(blank_layout)
    add_slide_header(s2, "Proposed Solution & Unified Architecture", "PROPOSED SOLUTION", 2)

    # Left Box: Problem at Hand
    c2_left = s2.shapes.add_shape(MSO_SHAPE.ROUNDED_RECTANGLE, Inches(0.35), Inches(0.7), Inches(4.55), Inches(4.65))
    c2_left.fill.solid()
    c2_left.fill.fore_color.rgb = CARD_BG
    c2_left.line.color.rgb = ACCENT_RED
    c2_left.line.width = Pt(1.2)

    tf2_l = c2_left.text_frame
    tf2_l.vertical_anchor = MSO_ANCHOR.TOP
    tf2_l.word_wrap = True
    tf2_l.margin_left = Inches(0.2)
    tf2_l.margin_right = Inches(0.2)
    tf2_l.margin_top = Inches(0.18)

    p = tf2_l.paragraphs[0]
    p.text = "PROBLEM AT HAND (PS 189 CHALLENGES)"
    p.font.size = Pt(10.5)
    p.font.bold = True
    p.font.color.rgb = ACCENT_RED

    points_left = [
        ("Fragmented Crime Data across 7 Siloed Sources", "FIRs, CDRs, Financial logs, Surveillance, Social media OSINT, Criminal history, and Intelligence agency reports are isolated across separate portals."),
        ("Labor-Intensive & Slow Manual Analysis", "Investigating officers spend 7 to 30 days manually cross-referencing paper records, leading to missed syndicate links and fugitive escapes."),
        ("Absence of On-Scene Triage Tools", "Seized storage drives are shipped to central labs without immediate threat discovery, creating massive evidence backlogs."),
        ("No Real-Time Patrol & Backup Link", "Traditional intelligence tools lack automated integration with Dial 100/112 ERSS emergency dispatch mesh.")
    ]

    for h, desc in points_left:
        p = tf2_l.add_paragraph()
        p.text = f"• {h}: "
        p.font.bold = True
        p.font.size = Pt(8.5)
        p.font.color.rgb = TEXT_WHITE
        p.space_before = Pt(4)
        run = p.add_run()
        run.text = desc
        run.font.bold = False
        run.font.size = Pt(8)
        run.font.color.rgb = TEXT_MUTED

    # Right Box: AAROHAN-X Solution (3 Pillars)
    c2_right = s2.shapes.add_shape(MSO_SHAPE.ROUNDED_RECTANGLE, Inches(5.1), Inches(0.7), Inches(4.55), Inches(4.65))
    c2_right.fill.solid()
    c2_right.fill.fore_color.rgb = CARD_BG
    c2_right.line.color.rgb = ACCENT_CYAN
    c2_right.line.width = Pt(1.2)

    tf2_r = c2_right.text_frame
    tf2_r.vertical_anchor = MSO_ANCHOR.TOP
    tf2_r.word_wrap = True
    tf2_r.margin_left = Inches(0.2)
    tf2_r.margin_right = Inches(0.2)
    tf2_r.margin_top = Inches(0.18)

    p = tf2_r.paragraphs[0]
    p.text = "AAROHAN-X 3-PILLAR UNIFIED SOLUTION"
    p.font.size = Pt(10.5)
    p.font.bold = True
    p.font.color.rgb = ACCENT_CYAN

    points_right = [
        ("Pillar 1: On-Scene Field Triage Unit", "Handheld hardware plugs directly into seized drives via an FPGA Hardware Write-Blocker IC, completing sector carving in <180s (BNS Sec 63 compliant)."),
        ("Pillar 2: GNN Criminal Network Analysis", "Spectral Graph Convolutional Networks (GCN) automatically build relationship maps, extract NLP entities, and isolate Kingpins with 98.6% link precision."),
        ("Pillar 3: Dual Dial 100/112 Emergency Mesh", "Auto-dispatches nearest patrol vans (<90s ETA) and triggers lockscreen DND override siren on nearest officer phone even if asleep."),
        ("128D Offline Facial Vector Matching", "Hailo-8L NPU queries All-India NCRB records in <2s offline without saving raw photos, ensuring 100% DPDP Act 2023 compliance.")
    ]

    for h, desc in points_right:
        p = tf2_r.add_paragraph()
        p.text = f"• {h}: "
        p.font.bold = True
        p.font.size = Pt(8.5)
        p.font.color.rgb = ACCENT_EMERALD
        p.space_before = Pt(4)
        run = p.add_run()
        run.text = desc
        run.font.bold = False
        run.font.size = Pt(8)
        run.font.color.rgb = TEXT_LIGHT

    # ==========================================
    # SLIDE 3: TECHNICAL APPROACH & METHODOLOGY
    # ==========================================
    s3 = prs.slides.add_slide(blank_layout)
    add_slide_header(s3, "Technical Approach & GNN Methodology", "TECHNICAL APPROACH", 3)

    steps = [
        ("1. Multi-Source Ingestion & NLP NER Pipeline", [
            "• Ingests 7 disparate data sources (FIRs, CDRs, Hawala logs, Surveillance).",
            "• SpaCy Transformer NER extracts entities (Suspects, Phones, Vehicle plates, Hawala IDs).",
            "• Parses structured & unstructured text across state police registries in <500ms."
        ], ACCENT_CYAN),
        ("2. Spectral GCN Link Prediction & Topology", [
            "• PyTorch Geometric Graph Convolutional Network constructs multi-entity graph.",
            "• Computes hidden connection probabilities between co-accused FIRs & CDR dumps.",
            "• Discovers cross-border syndicate links with 98.6% link prediction precision."
        ], ACCENT_PURPLE),
        ("3. Key Influencer & Kingpin Isolation", [
            "• Calculates GNN Betweenness Centrality & Eigenvector Centrality scores.",
            "• Isolates Vikram Singh @ Cyber-Ghost as Rank #1 Kingpin Node (0.964 Centrality).",
            "• Simulates network fragmentation upon targeted arrest of key financial hubs."
        ], ACCENT_AMBER),
        ("4. T-GAT Pattern Mining & Dual ERSS Mesh", [
            "• Temporal Graph Attention Network detects cell tower overlaps & smurfing.",
            "• Flags 3 suspects simultaneously pinging Tower #412 prior to crime execution.",
            "• Dual Dispatch auto-routes patrol vans & wakes sleeping officer phone on lockscreen."
        ], ACCENT_EMERALD)
    ]

    card_w = Inches(4.55)
    card_h = Inches(2.25)

    for idx, (title, bullets, color) in enumerate(steps):
        col = idx % 2
        row = idx // 2
        left_pos = Inches(0.35 + col * 4.75)
        top_pos = Inches(0.7 + row * 2.4)

        box = s3.shapes.add_shape(MSO_SHAPE.ROUNDED_RECTANGLE, left_pos, top_pos, card_w, card_h)
        box.fill.solid()
        box.fill.fore_color.rgb = CARD_BG
        box.line.color.rgb = color
        box.line.width = Pt(1.2)

        tf = box.text_frame
        tf.vertical_anchor = MSO_ANCHOR.TOP
        tf.word_wrap = True
        tf.margin_left = Inches(0.18)
        tf.margin_right = Inches(0.18)
        tf.margin_top = Inches(0.15)
        
        p = tf.paragraphs[0]
        p.text = title
        p.font.size = Pt(10)
        p.font.bold = True
        p.font.color.rgb = color

        for b in bullets:
            pb = tf.add_paragraph()
            pb.text = b
            pb.font.size = Pt(8)
            pb.font.color.rgb = TEXT_LIGHT
            pb.space_before = Pt(2)

    # ==========================================
    # SLIDE 4: FEASIBILITY, VIABILITY & HARDWARE
    # ==========================================
    s4 = prs.slides.add_slide(blank_layout)
    add_slide_header(s4, "Feasibility, Viability & Hardware Specs", "FEASIBILITY & VIABILITY", 4)

    # Comparison Table
    rows = 6
    cols = 3
    left = Inches(0.35)
    top = Inches(0.7)
    width = Inches(5.8)
    height = Inches(3.2)

    tbl_shape = s4.shapes.add_table(rows, cols, left, top, width, height)
    tbl = tbl_shape.table
    tbl.columns[0].width = Inches(1.5)
    tbl.columns[1].width = Inches(2.1)
    tbl.columns[2].width = Inches(2.2)

    headers = ["Parameter", "Legacy Lab Systems (Cellebrite)", "AAROHAN-X Tactical Unit"]
    for i, h in enumerate(headers):
        cell = tbl.cell(0, i)
        cell.text = h
        cell.fill.solid()
        cell.fill.fore_color.rgb = RGBColor(30, 41, 59)
        p = cell.text_frame.paragraphs[0]
        p.font.bold = True
        p.font.size = Pt(8.5)
        p.font.color.rgb = ACCENT_CYAN

    comparison_data = [
        ("Deployment Cost", "₹15,00,000 – ₹30,00,000 per lab", "₹10,000 – ₹15,000 (Make in India)"),
        ("Triage Speed", "7 to 30 Days lab backlog delay", "< 180 Seconds on-scene field triage"),
        ("Network Graph", "Manual paper & whiteboard drawings", "Spectral GCN Topology (98.6% precision)"),
        ("Write Protection", "Heavy external desktop equipment", "Integrated FPGA Read-Only IC (BNS 63)"),
        ("Emergency Mesh", "Zero Dial 100/112 ERSS integration", "Dual ERSS Patrol + Sleeping Officer Alert")
    ]

    for row_idx, data_row in enumerate(comparison_data, start=1):
        for col_idx, val in enumerate(data_row):
            cell = tbl.cell(row_idx, col_idx)
            cell.text = val
            cell.fill.solid()
            cell.fill.fore_color.rgb = CARD_BG
            p = cell.text_frame.paragraphs[0]
            p.font.size = Pt(8)
            p.font.color.rgb = ACCENT_EMERALD if col_idx == 2 else (ACCENT_RED if col_idx == 1 else TEXT_WHITE)

    # Bottom Hardware Bar
    hw_bar = s4.shapes.add_shape(MSO_SHAPE.ROUNDED_RECTANGLE, Inches(0.35), Inches(4.05), Inches(5.8), Inches(1.3))
    hw_bar.fill.solid()
    hw_bar.fill.fore_color.rgb = CARD_BG
    hw_bar.line.color.rgb = CARD_BORDER

    tf_hw = hw_bar.text_frame
    tf_hw.vertical_anchor = MSO_ANCHOR.TOP
    tf_hw.word_wrap = True
    tf_hw.margin_left = Inches(0.15)
    tf_hw.margin_top = Inches(0.1)
    p = tf_hw.paragraphs[0]
    p.text = "HARDWARE BILL OF MATERIALS (100% OFF-THE-SHELF MAKE-IN-INDIA)"
    p.font.size = Pt(9)
    p.font.bold = True
    p.font.color.rgb = ACCENT_AMBER

    p2 = tf_hw.add_paragraph()
    p2.text = "Raspberry Pi 5 (8GB RAM) + Hailo-8L NPU HAT (13 TOPS) + FPGA Write-Blocker IC + 1TB NVMe PCIe Gen4 SSD + 5-inch Gorilla Glass Touchscreen + 10,000mAh Battery (8+ hrs) + IP67 CNC Casing."
    p2.font.size = Pt(8)
    p2.font.color.rgb = TEXT_LIGHT

    # Right Hardware CAD Image
    cad_img = os.path.join(asset_dir, "Hardware_Step4_Exploded_3D_CAD_Diagram.jpg")
    if os.path.exists(cad_img):
        s4.shapes.add_picture(cad_img, Inches(6.35), Inches(0.7), Inches(3.3), Inches(4.65))

    # ==========================================
    # SLIDE 5: IMPACT, BENEFITS & BENEFICIARIES
    # ==========================================
    s5 = prs.slides.add_slide(blank_layout)
    add_slide_header(s5, "National Impact, Benefits & Beneficiaries", "IMPACT & BENEFITS", 5)

    metrics = [
        ("+85% FASTER DISCOVERY", [
            "• Cuts criminal network discovery from 30 days to <180s.",
            "• On-scene GNN triage eliminates forensic lab backlogs.",
            "• Instant warrant execution prevents inter-state fugitive escapes."
        ], ACCENT_CYAN),
        ("₹25 LAKHS SAVED / YR", [
            "• Replaces expensive proprietary forensic licenses.",
            "• Low ₹10,000 unit cost enables widespread Make-in-India procurement.",
            "• Zero recurring cloud API fees via local 13 TOPS Hailo NPU."
        ], ACCENT_EMERALD),
        ("16,000+ POLICE STATIONS", [
            "• Scalable architecture deploys across all 36 States & UTs.",
            "• Empowers beat constables, cyber cells & border checkpoints.",
            "• Unified CCTNS / NATGRID inter-state registry integration."
        ], ACCENT_PURPLE),
        ("<90-SEC EMERGENCY ETA", [
            "• Dual ERSS routing dispatches nearest patrol unit instantly.",
            "• Pushes lockscreen DND override siren to waking sleeping officer phone.",
            "• 4-Layer Anti-Prank Verification prevents false distress alarms."
        ], ACCENT_RED)
    ]

    for idx, (m_title, bullets, m_col) in enumerate(metrics):
        col = idx % 2
        row = idx // 2
        left_pos = Inches(0.35 + col * 4.75)
        top_pos = Inches(0.7 + row * 1.5)

        box = s5.shapes.add_shape(MSO_SHAPE.ROUNDED_RECTANGLE, left_pos, top_pos, Inches(4.55), Inches(1.35))
        box.fill.solid()
        box.fill.fore_color.rgb = CARD_BG
        box.line.color.rgb = m_col
        box.line.width = Pt(1.2)

        tf = box.text_frame
        tf.vertical_anchor = MSO_ANCHOR.TOP
        tf.word_wrap = True
        tf.margin_left = Inches(0.15)
        tf.margin_right = Inches(0.15)
        tf.margin_top = Inches(0.1)
        p = tf.paragraphs[0]
        p.text = m_title
        p.font.size = Pt(10)
        p.font.bold = True
        p.font.color.rgb = m_col

        for b in bullets:
            pb = tf.add_paragraph()
            pb.text = b
            pb.font.size = Pt(7.5)
            pb.font.color.rgb = TEXT_LIGHT
            pb.space_before = Pt(1)

    # Regulatory & Beneficiaries Box (Bottom)
    reg_box = s5.shapes.add_shape(MSO_SHAPE.ROUNDED_RECTANGLE, Inches(0.35), Inches(3.85), Inches(9.3), Inches(1.5))
    reg_box.fill.solid()
    reg_box.fill.fore_color.rgb = CARD_BG
    reg_box.line.color.rgb = ACCENT_AMBER

    tf_reg = reg_box.text_frame
    tf_reg.vertical_anchor = MSO_ANCHOR.TOP
    tf_reg.word_wrap = True
    tf_reg.margin_left = Inches(0.2)
    tf_reg.margin_right = Inches(0.2)
    tf_reg.margin_top = Inches(0.1)
    p = tf_reg.paragraphs[0]
    p.text = "REGULATORY COMPLIANCE & BENEFICIARIES"
    p.font.size = Pt(9.5)
    p.font.bold = True
    p.font.color.rgb = ACCENT_AMBER

    beneficiaries_text = [
        "• Primary Beneficiaries: State Police Departments, Cyber Crime Units, National Investigation Agency (NIA), Narcotics Control Bureau (NCB), Border Checkpoints, and Dial 100/112 ERSS Control Rooms.",
        "• DPDP Act 2023 Compliant: Processes only mathematical 128D facial vector hashes; zero citizen photos stored on device.",
        "• Legal Admissibility: FPGA Hardware Write-Blocker IC + SHA-256 evidence hashing meets Bharatiya Sakshya Adhiniyam (BNS 2023) Section 63 and Indian Evidence Act Section 65B court requirements."
    ]
    for b in beneficiaries_text:
        p = tf_reg.add_paragraph()
        p.text = b
        p.font.size = Pt(8)
        p.font.color.rgb = TEXT_LIGHT
        p.space_before = Pt(2)

    # ==========================================
    # SLIDE 6: RESEARCH, REFERENCES & CONCLUSION
    # ==========================================
    s6 = prs.slides.add_slide(blank_layout)
    add_slide_header(s6, "Research References & Conclusion", "RESEARCH & CONCLUSION", 6)

    # Left Container: Research Citations
    c6_left = s6.shapes.add_shape(MSO_SHAPE.ROUNDED_RECTANGLE, Inches(0.35), Inches(0.7), Inches(4.55), Inches(4.65))
    c6_left.fill.solid()
    c6_left.fill.fore_color.rgb = CARD_BG
    c6_left.line.color.rgb = ACCENT_PURPLE
    c6_left.line.width = Pt(1.2)

    tf6_l = c6_left.text_frame
    tf6_l.vertical_anchor = MSO_ANCHOR.TOP
    tf6_l.word_wrap = True
    tf6_l.margin_left = Inches(0.2)
    tf6_l.margin_right = Inches(0.2)
    tf6_l.margin_top = Inches(0.15)
    p = tf6_l.paragraphs[0]
    p.text = "ACADEMIC & GOVERNMENT RESEARCH CITATIONS"
    p.font.size = Pt(10)
    p.font.bold = True
    p.font.color.rgb = ACCENT_PURPLE

    citations = [
        ("Bureau of Police Research & Development (BPR&D)", "Smart Policing Directives and AI-driven predictive crime network guidelines."),
        ("Ministry of Home Affairs (MHA) BNS 2023", "Electronic evidence integrity standards under Bharatiya Sakshya Adhiniyam Sec 63."),
        ("NCRB & CCTNS 2.0 Integration Standards", "All-India crime registry schema & 128D facial embedding inter-state search protocols."),
        ("NIST Special Publication 800-86", "Guide to Integrating Forensic Techniques into Incident Response (Write-block verification)."),
        ("PyTorch Geometric (PyG) & Kipf-Welling GCN", "Semi-Supervised Classification with Spectral Graph Convolutional Networks (ICLR).")
    ]

    for src, desc in citations:
        p = tf6_l.add_paragraph()
        p.text = f"• {src}: "
        p.font.bold = True
        p.font.size = Pt(8.5)
        p.font.color.rgb = TEXT_WHITE
        p.space_before = Pt(3)
        run = p.add_run()
        run.text = desc
        run.font.bold = False
        run.font.size = Pt(8)
        run.font.color.rgb = TEXT_MUTED

    # Right Container: Live Deployment & Conclusion
    c6_right = s6.shapes.add_shape(MSO_SHAPE.ROUNDED_RECTANGLE, Inches(5.1), Inches(0.7), Inches(4.55), Inches(4.65))
    c6_right.fill.solid()
    c6_right.fill.fore_color.rgb = CARD_BG
    c6_right.line.color.rgb = ACCENT_CYAN
    c6_right.line.width = Pt(1.2)

    tf6_r = c6_right.text_frame
    tf6_r.vertical_anchor = MSO_ANCHOR.TOP
    tf6_r.word_wrap = True
    tf6_r.margin_left = Inches(0.2)
    tf6_r.margin_right = Inches(0.2)
    tf6_r.margin_top = Inches(0.15)
    p = tf6_r.paragraphs[0]
    p.text = "LIVE DEPLOYMENT & VERIFICATION"
    p.font.size = Pt(10)
    p.font.bold = True
    p.font.color.rgb = ACCENT_CYAN

    deliverables = [
        ("GitHub Codebase", "github.com/muhammedmaahir68-droid/cyber-kit (Open Source, Fully Documented)."),
        ("Live Web Application", "cyber-kit-police.vercel.app (Interactive GNN Topology & Dispatch UI)."),
        ("Backend FastAPI Server", "Cloud-deployed REST API with 6 dedicated `/api/v1/criminal-network/*` endpoints."),
        ("Hardware Assembly Blueprint", "Complete step-by-step 3D assembly guide and Make-in-India component schematics.")
    ]

    for label, desc in deliverables:
        p = tf6_r.add_paragraph()
        p.text = f"• {label}: "
        p.font.bold = True
        p.font.size = Pt(8.5)
        p.font.color.rgb = ACCENT_EMERALD
        p.space_before = Pt(3)
        run = p.add_run()
        run.text = desc
        run.font.bold = False
        run.font.size = Pt(8)
        run.font.color.rgb = TEXT_LIGHT

    # Final Pitch
    p_final = tf6_r.add_paragraph()
    p_final.space_before = Pt(10)
    p_final.text = "\"AAROHAN-X transforms fragmented multi-source crime data into an instant, court-admissible, and life-saving Criminal Network Intelligence Map on scene. Thank you!\""
    p_final.font.size = Pt(9)
    p_final.font.bold = True
    p_final.font.color.rgb = ACCENT_AMBER

    # Save to both paths
    out_path_1 = r"C:\Users\mahir\OneDrive\Documents\SIH_2026_AAROHAN-X_Presentation_Kit\SIH_Ideate_Template_AAROHAN-X.pptx"
    prs.save(out_path_1)
    print(f"Saved master presentation to: {out_path_1}")

    out_path_2 = r"C:\Users\mahir\AppData\Local\Packages\5319275A.WhatsAppDesktop_cv1g1gvanyjgm\LocalState\sessions\E1E5306A901D36AF8AC96879A11E2AE4D5601B06\transfers\2026-36\SIH_Ideate_Template_AAROHAN-X.pptx"
    try:
        os.makedirs(os.path.dirname(out_path_2), exist_ok=True)
        shutil.copy2(out_path_1, out_path_2)
        print(f"Copied presentation to WhatsApp transfer path: {out_path_2}")
    except Exception as e:
        print(f"Notice on WhatsApp copy: {e}")

if __name__ == "__main__":
    create_sih189_presentation()
