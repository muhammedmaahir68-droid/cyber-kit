import matplotlib.pyplot as plt
import matplotlib.patches as patches

def draw_ncis_model_diagram(output_path="presentation/ncis_architecture_model_diagram.png"):
    fig = plt.figure(figsize=(15, 8.5), dpi=300)
    ax = fig.add_axes([0, 0, 1, 1])
    ax.set_facecolor('#071326')
    ax.set_xlim(0, 15)
    ax.set_ylim(0, 8.5)
    ax.axis('off')

    # Color Palette (Strictly matching project theme)
    c_bg_dark = '#071326'
    c_header = '#0B1F3A'
    c_card_bg = '#0F2744'
    c_card_inner = '#13335A'
    c_blue = '#1D4ED8'
    c_teal = '#0EA5A4'
    c_amber = '#F59E0B'
    c_green = '#16A34A'
    c_red = '#DC2626'
    c_sky = '#38BDF8'
    c_text_bright = '#FFFFFF'
    c_text_dim = '#CBD5E1'

    # ──────────────────────────────────────────────────────────
    # 1. TOP HEADER BANNER
    # ──────────────────────────────────────────────────────────
    header_box = patches.FancyBboxPatch(
        (0.4, 7.4), 14.2, 0.85,
        boxstyle="round,pad=0.08,rounding_size=0.15",
        facecolor=c_header, edgecolor='#1E3A5F', linewidth=1.5
    )
    ax.add_patch(header_box)

    # Tricolor accent on left
    ax.plot([0.45, 0.45], [7.45, 8.2], color='#FF9933', linewidth=4)
    ax.plot([0.48, 0.48], [7.45, 8.2], color='#FFFFFF', linewidth=4)
    ax.plot([0.51, 0.51], [7.45, 8.2], color='#138808', linewidth=4)

    ax.text(0.7, 7.95, "NCIS-TACTICAL : SYSTEM ARCHITECTURE & AI MODEL PIPELINE",
            color=c_text_bright, fontsize=13, fontweight='bold', family='sans-serif')
    ax.text(0.7, 7.6, "SIH26150 Multi-Vendor DVR/NVR Forensics (NTRO)  •  Agentic AI Voice Module (Case Copilot)  •  BNSS 2023 Sec 94/107/176",
            color=c_sky, fontsize=8.5, family='sans-serif')

    badge_box = patches.FancyBboxPatch(
        (12.3, 7.55), 2.15, 0.55,
        boxstyle="round,pad=0.05,rounding_size=0.1",
        facecolor='#102A43', edgecolor=c_teal, linewidth=1.2
    )
    ax.add_patch(badge_box)
    ax.text(13.37, 7.82, "LIVE BENCHMARK: 100%", color=c_teal, fontsize=8, fontweight='bold', ha='center', va='center')

    # ──────────────────────────────────────────────────────────
    # 2. FIVE ARCHITECTURAL PILLARS (COLUMNS)
    # ──────────────────────────────────────────────────────────
    columns = [
        {
            "x": 0.4, "w": 2.65,
            "title": "1. MULTI-VENDOR INGESTION",
            "subtitle": "SIH26150 Forensic Bus & Streams",
            "accent": c_sky,
            "items": [
                ("Tactical HW Write-Blocker", "PCIe NVMe / SATA III / USB 3.2 / JTAG raw switch"),
                ("Multi-Vendor DVR Parsers", "Hikvision (HIK), Dahua (DHFS), CP Plus, Uniview"),
                ("Unstructured Surveillance", "Raw H.264/H.265 video streams & CCTV DVR disks"),
                ("Multi-Source Crime Intel", "FIR texts (Hindi/Eng), CDR dumps, WhatsApp freelists")
            ]
        },
        {
            "x": 3.3, "w": 2.65,
            "title": "2. UNSTRUCTURED NLP & VISION",
            "subtitle": "Cognitive Feature Extraction",
            "accent": c_blue,
            "items": [
                ("128D Facial Embeddings", "OpenCV & ResNet vector extraction from CCTV frames"),
                ("Indian Legal NLP NER", "SpaCy legal parser: Accused, IMEI, UPI, Vehicles"),
                ("Timestamp Alignment", "Multi-DVR clock drift synchronization & GPS geotag"),
                ("Hailo-8L Edge AI (26 TOPS)", "Real-time on-scene sector carving (131k sectors)")
            ]
        },
        {
            "x": 6.2, "w": 2.7,
            "title": "3. AGENTIC AI VOICE MODULE",
            "subtitle": "Case Copilot Autonomous Loop",
            "accent": c_teal,
            "items": [
                ("Siri Voice Orb Visualizer", "Dynamic acoustic waves; hands-free tactical audio"),
                ("Multilingual Speech AI", "Web Speech & Whisper: English, Hindi, Tamil (≤3 sent)"),
                ("Autonomous Tool Calling", "Loop: get_fir → extract → rank_suspects → draft"),
                ("Missing Evidence Radar", "Flags missing CDR, CCTV, Bank Freezes under BNSS")
            ]
        },
        {
            "x": 9.15, "w": 2.65,
            "title": "4. SPECTRAL GCN ENGINE",
            "subtitle": "Syndicate Topology & Graph Intel",
            "accent": c_amber,
            "items": [
                ("PyTorch Geometric GCN", "Spectral graph convolutions with 98.6% link precision"),
                ("Kingpin Centrality Isolation", "Betweenness & Degree metrics isolate cartel heads"),
                ("Hawala & Money Mules", "Multi-hop cross-border financial trail unmasking"),
                ("Cross-FIR Syndicate Graph", "Connects fragmented crimes across 16,000+ stations")
            ]
        },
        {
            "x": 12.05, "w": 2.55,
            "title": "5. ACTION & JUDICIAL SEAL",
            "subtitle": "Dial 112 & Court Admissibility",
            "accent": c_green,
            "items": [
                ("ERSS Dial 112 Patrol Mesh", "Interactive GIS vector map with Haversine dynamic ETA"),
                ("<60s Tactical Dispatch", "Instant nearest interceptor siren deployment"),
                ("BNSS 2023 Statutory Drafts", "Auto-requisitions: Sec 94 (CDR), Sec 107 (Freeze) in 5s"),
                ("Judicial Evidence Seal", "SHA-256 bitstream hash under BNS 63 & BSA Sec 65B")
            ]
        }
    ]

    for col in columns:
        cx, cw = col["x"], col["w"]
        accent = col["accent"]

        # Outer Column Card
        card = patches.FancyBboxPatch(
            (cx, 1.45), cw, 5.75,
            boxstyle="round,pad=0.06,rounding_size=0.15",
            facecolor=c_card_bg, edgecolor=accent, linewidth=1.5
        )
        ax.add_patch(card)

        # Header Pill
        header_pill = patches.FancyBboxPatch(
            (cx + 0.08, 6.45), cw - 0.16, 0.65,
            boxstyle="round,pad=0.04,rounding_size=0.1",
            facecolor=c_header, edgecolor=accent, linewidth=1.0
        )
        ax.add_patch(header_pill)

        ax.text(cx + cw/2, 6.9, col["title"], color=accent, fontsize=7.8, fontweight='bold', ha='center', va='center')
        ax.text(cx + cw/2, 6.62, col["subtitle"], color=c_text_dim, fontsize=6.5, ha='center', va='center')

        # Sub-cards inside column
        item_y = 5.25
        for title, desc in col["items"]:
            icard = patches.FancyBboxPatch(
                (cx + 0.1, item_y), cw - 0.2, 1.05,
                boxstyle="round,pad=0.04,rounding_size=0.08",
                facecolor=c_card_inner, edgecolor='#1E3A5F', linewidth=0.8
            )
            ax.add_patch(icard)

            # Bullet dot
            ax.scatter(cx + 0.22, item_y + 0.82, color=accent, s=16, zorder=5)

            ax.text(cx + 0.32, item_y + 0.82, title, color=c_text_bright, fontsize=7.2, fontweight='bold', va='center')
            
            # Multi-line description
            ax.text(cx + 0.2, item_y + 0.45, desc, color=c_text_dim, fontsize=6.2, va='center', wrap=True)

            item_y -= 1.2

    # ──────────────────────────────────────────────────────────
    # 3. INTER-COLUMN DATAFLOW ARROWS
    # ──────────────────────────────────────────────────────────
    arrow_props = dict(arrowstyle="->,head_width=0.35,head_length=0.45", color=c_sky, lw=2.2)
    ax.annotate("", xy=(3.3, 4.3), xytext=(3.05, 4.3), arrowprops=arrow_props)
    ax.annotate("", xy=(6.2, 4.3), xytext=(5.95, 4.3), arrowprops=arrow_props)
    ax.annotate("", xy=(9.15, 4.3), xytext=(8.9, 4.3), arrowprops=arrow_props)
    ax.annotate("", xy=(12.05, 4.3), xytext=(11.8, 4.3), arrowprops=arrow_props)

    # ──────────────────────────────────────────────────────────
    # 4. BOTTOM CROSS-CUTTING COMPLIANCE & SPECS BAR
    # ──────────────────────────────────────────────────────────
    bottom_box = patches.FancyBboxPatch(
        (0.4, 0.35), 14.2, 0.95,
        boxstyle="round,pad=0.08,rounding_size=0.15",
        facecolor=c_header, edgecolor='#1E3A5F', linewidth=1.5
    )
    ax.add_patch(bottom_box)

    specs = [
        ("SIH26150 DVR ENGINE", "Universal CCTV Frame Decoders for Hikvision, Dahua, CP Plus, Honeywell & Uniview", c_sky),
        ("AGENTIC VOICE COPILOT", "Siri Voice Orb Visualizer • Multi-turn English/Hindi/Tamil • Spoken Brevity ≤3 Sentences", c_teal),
        ("STATUTORY JURISPRUDENCE", "Strict Human-in-the-Loop Verification • BNSS 2023 Sec 94/107/176 • BSA Sec 65B Certified", c_green),
        ("LIVE DEPLOYMENT", "cyber-kit-police.vercel.app • React 18 + Python FastAPI + PyTorch Geometric + Hailo Edge NPU", c_amber)
    ]

    bx = 0.65
    for title, desc, color in specs:
        bpill = patches.FancyBboxPatch(
            (bx, 0.45), 3.25, 0.75,
            boxstyle="round,pad=0.04,rounding_size=0.08",
            facecolor='#102A43', edgecolor=color, linewidth=1.0
        )
        ax.add_patch(bpill)
        ax.text(bx + 1.62, 0.95, title, color=color, fontsize=7.2, fontweight='bold', ha='center', va='center')
        ax.text(bx + 1.62, 0.65, desc, color=c_text_dim, fontsize=5.8, ha='center', va='center', wrap=True)
        bx += 3.45

    plt.savefig(output_path, dpi=300, facecolor='#071326')
    plt.close()
    print(f"Model diagram generated successfully at: {output_path}")

if __name__ == "__main__":
    draw_ncis_model_diagram("presentation/ncis_architecture_model_diagram.png")
    draw_ncis_model_diagram("frontend/public/ncis_architecture_model_diagram.png")
