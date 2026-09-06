import os
import shutil
import pptx
from pptx.util import Pt

def update_template():
    src_path = r"C:\Users\mahir\AppData\Local\Packages\5319275A.WhatsAppDesktop_cv1g1gvanyjgm\LocalState\sessions\E1E5306A901D36AF8AC96879A11E2AE4D5601B06\transfers\2026-35\SIH_Ideate_Template_AAROHAN-X.pptx"
    
    prs = pptx.Presentation(src_path)
    print(f"Loaded original template from: {src_path} (Slides: {len(prs.slides)})")

    def set_shape_text(shape, paragraphs_list, font_size_pt=None):
        tf = shape.text_frame
        while len(tf.paragraphs) > len(paragraphs_list):
            p_elem = tf.paragraphs[-1]._p
            p_elem.getparent().remove(p_elem)
        
        for idx, text in enumerate(paragraphs_list):
            if idx < len(tf.paragraphs):
                p = tf.paragraphs[idx]
            else:
                p = tf.add_paragraph()
            
            if len(p.runs) > 0:
                p.runs[0].text = text
                if font_size_pt:
                    p.runs[0].font.size = Pt(font_size_pt)
                for r in p.runs[1:]:
                    r.text = ""
            else:
                p.text = text
                if font_size_pt:
                    p.font.size = Pt(font_size_pt)

    # ==========================================
    # SLIDE 1 IN-PLACE UPDATES
    # ==========================================
    s1 = prs.slides[0]
    for sh in s1.shapes:
        if sh.shape_id == 65:
            set_shape_text(sh, ["AAROHAN-X : AI-Powered Criminal Network Analysis & Tactical Field Triage Ecosystem"])
        elif sh.shape_id == 66:
            set_shape_text(sh, ["Problem Statement ID  –  189"])
        elif sh.shape_id == 68:
            set_shape_text(sh, ["AI-Powered Criminal Network Analysis System (Bureau of Police Research & Development / Ministry of Home Affairs)"])
        elif sh.shape_id == 69:
            set_shape_text(sh, ["Theme  –  Smart Automation / Cyber Security & Law Enforcement"])
        elif sh.shape_id == 70:
            set_shape_text(sh, ["PS Category  –  Hardware + Software (Hybrid Portable Field Unit)"])
        elif sh.shape_id == 71:
            set_shape_text(sh, ["Team Name  –  AAROHAN-X"])
        elif sh.shape_id == 72:
            set_shape_text(sh, ["Team ID  –  T-SIH2026-89412"])

    # ==========================================
    # SLIDE 2 IN-PLACE UPDATES
    # ==========================================
    s2 = prs.slides[1]
    for sh in s2.shapes:
        if sh.shape_id == 89:
            set_shape_text(sh, [
                "Core Problem : ",
                "Police & intelligence agencies collect vast crime data across 7 fragmented sources (FIRs, CDRs, Hawala, Surveillance, OSINT, NCRB, NATGRID). Manual correlation is slow, error-prone, and misses hidden criminal networks."
            ])
        elif sh.shape_id == 91:
            set_shape_text(sh, [
                "Gap In Existing Solutions : ",
                "Legacy forensic & intelligence tools operate in silos, cause 7-30 days lab delays, lack on-scene GNN link prediction, and have zero real-time patrol mesh integration for emergency dispatch."
            ])
        elif sh.shape_id == 93:
            set_shape_text(sh, [
                "Scale Of The Problem : ",
                "Affects 16,000+ police stations, state cyber cells, NIA, NCB, and emergency patrol units dealing with organized syndicates and cross-border crimes nationwide."
            ])
        elif sh.shape_id == 95:
            set_shape_text(sh, [
                "Consequence If Unsolved : ",
                "Delayed kingpin identification, fragmented evidence chains, financial hawala channels escaping detection, and fugitive escapes during active investigations."
            ])
        elif sh.shape_id == 98:
            set_shape_text(sh, ["Concept Diagram — AAROHAN-X ForensiX Tactical Ecosystem"])
        elif sh.shape_id == 99:
            set_shape_text(sh, ["FPGA Hardware Write-Blocker + Spectral GCN Network Topology + Dual Dial 100/112 ERSS Mesh"])
        elif sh.shape_id == 100:
            set_shape_text(sh, ["AI-POWERED CRIMINAL NETWORK ANALYSIS & REAL-TIME TACTICAL TRIAGE ECOSYSTEM"])
        elif sh.shape_id == 103:
            set_shape_text(sh, [
                "Differentiator 1 — Unified 3-Pillar Ecosystem: Combines on-scene hardware triage, GNN syndicate link prediction, and real-time Dial 100/112 ERSS patrol mesh.",
                "Differentiator 2 — Key Influencer Isolation: Uses Betweenness & Eigenvector Centrality to mathematically pinpoint Kingpins (Rank #1: Vikram Singh @ Cyber-Ghost).",
                "Differentiator 3 — Offline 128D Facial Search: Scans suspect photos & matches vectors against NCRB records in <2s offline (100% DPDP Act 2023 compliant)."
            ])
        elif sh.shape_id == 107:
            set_shape_text(sh, [
                "Multi-Source Data Ingestion",
                "Ingests FIRs, CDRs, Hawala logs & surveillance in <180s via FPGA Write-Blocker"
            ])
        elif sh.shape_id == 110:
            set_shape_text(sh, [
                "NLP Entity Extractor",
                "SpaCy NER parses suspects, vehicles, IMEIs & IPC sections in <500ms"
            ])
        elif sh.shape_id == 113:
            set_shape_text(sh, [
                "Spectral GCN Link Prediction",
                "Graph Neural Network maps syndicate edges with 98.6% link precision"
            ])
        elif sh.shape_id == 116:
            set_shape_text(sh, [
                "Kingpin Centrality Ranking",
                "Isolates syndicate leaders via Betweenness Centrality (0.964 score)"
            ])
        elif sh.shape_id == 119:
            set_shape_text(sh, [
                "Suspicious Pattern Detection",
                "T-GAT flags tower #412 overlaps, hawala smurfing & call bursts"
            ])
        elif sh.shape_id == 122:
            set_shape_text(sh, [
                "Dual ERSS Emergency Mesh",
                "Auto-routes patrol vans & wakes sleeping officer phone on lockscreen"
            ])

    # ==========================================
    # SLIDE 3 IN-PLACE UPDATES
    # ==========================================
    s3 = prs.slides[2]
    for sh in s3.shapes:
        if sh.shape_id == 139:
            set_shape_text(sh, ["Multi-Source Ingestion & NLP NER"])
        elif sh.shape_id == 141:
            set_shape_text(sh, ["Spectral GCN Link Topology Engine"])
        elif sh.shape_id == 149:
            set_shape_text(sh, ["Kingpin Centrality & Face Matching Core"])
        elif sh.shape_id == 154:
            set_shape_text(sh, ["Temporal Pattern Mining & Anomaly Detection"])
        elif sh.shape_id == 159:
            set_shape_text(sh, ["Investigator Insights & Dual Patrol Mesh"])
        elif sh.shape_id == 163:
            set_shape_text(sh, [
                "Frontend  : React + Tailwind + Canvas GNN Topology",
                "Backend   : Python + FastAPI + 6 Dedicated REST Endpoints",
                "AI/ML      : PyG GCN Link Engine, T-GAT, SpaCy NER, Hailo NPU",
                "Hardware  : Raspberry Pi 5, FPGA Write-Blocker, 1TB SSD"
            ], font_size_pt=7.5)
        elif sh.shape_id == 166:
            set_shape_text(sh, [
                "Network : On-scene local-first operation (100% offline ML & GNN)",
                "Cloud     : Encrypted sync to Central CCTNS/NATGRID Control Room",
                "Security : FPGA write-blocker IC + SHA-256 evidence log (BNS Sec 63)"
            ], font_size_pt=7.5)
        elif sh.shape_id == 169:
            set_shape_text(sh, [
                "Status: Working Functional Prototype (Tested & Verified)",
                "Built: GNN graph, Kingpin ranking, NLP extractor, 128D face, ERSS",
                "Demo: Live web dashboard (cyber-kit-police.vercel.app)"
            ], font_size_pt=7.5)
        elif sh.shape_id in [187, 189]:
            set_shape_text(sh, [
                "Live Working Prototype & SIH 189 Highlights:",
                "• Multi-Source Data Ingestion: Ingests all 7 required data sources in real time.",
                "• GNN Topology & Kingpin Isolation: 98.6% link precision with Centrality ranking.",
                "• Temporal Pattern Mining: Auto-detects tower overlaps & hawala smurfing.",
                "• Dual Emergency Dispatch: Auto-routes patrol vans & wakes sleeping officer phone."
            ], font_size_pt=7.5)

    # ==========================================
    # SLIDE 4 IN-PLACE UPDATES
    # ==========================================
    s4 = prs.slides[3]
    for sh in s4.shapes:
        if sh.shape_id == 200:
            set_shape_text(sh, [
                "Skills available: PyTorch Geometric, FastAPI, React, SpaCy NLP, FPGA C++",
                "Risk: Complex multi-source data — mitigated by robust NER & GNN link algorithms.",
                "Power: Low-power 5V rail gives 8+ hrs field battery life via 10,000mAh pack."
            ], font_size_pt=7.5)
        elif sh.shape_id == 202 and sh.has_table:
            tbl = sh.table
            def set_cell(r, c, txt, sz=7.5):
                cell = tbl.cell(r, c)
                cell.text = txt
                if len(cell.text_frame.paragraphs) > 0 and len(cell.text_frame.paragraphs[0].runs) > 0:
                    cell.text_frame.paragraphs[0].runs[0].font.size = Pt(sz)
            
            set_cell(0, 0, "Parameter", 8)
            set_cell(0, 1, "Legacy Lab Systems", 8)
            set_cell(0, 2, "AAROHAN-X Tactical Unit", 8)
            set_cell(1, 0, "Unit Cost", 7.5)
            set_cell(1, 1, "₹15–30 Lakhs per lab", 7.5)
            set_cell(1, 2, "₹10,000–15,000 (Make in India)", 7.5)
            set_cell(2, 0, "Triage Speed", 7.5)
            set_cell(2, 1, "7 to 30 Days lab delay", 7.5)
            set_cell(2, 2, "< 180 Seconds on-scene", 7.5)
            set_cell(3, 0, "Network Graph", 7.5)
            set_cell(3, 1, "Manual paper/whiteboards", 7.5)
            set_cell(3, 2, "Spectral GCN Graph (98.6%)", 7.5)
            set_cell(4, 0, "Legal Integrity", 7.5)
            set_cell(4, 1, "Manual paper logs", 7.5)
            set_cell(4, 2, "SHA-256 Sealed Log (BNS 63)", 7.5)

        elif sh.shape_id == 205:
            set_shape_text(sh, [
                "Maintenance: Modular off-the-shelf components, easy field replacement.",
                "Safety: Human-in-the-loop SP approval & 4-layer anti-prank SOS verification."
            ], font_size_pt=7.5)
        elif sh.shape_id == 208:
            set_shape_text(sh, [
                "Payback: Low unit cost; payback achieved in single major syndicate bust.",
                "Procurement: Direct police department & MHA procurement (Make in India).",
                "Simplicity: Intuitive tactical UI designed for beat constables & investigators."
            ], font_size_pt=7.5)
        elif sh.shape_id == 210 and sh.has_table:
            tbl = sh.table
            def set_cell2(r, c, txt, sz=7.5):
                cell = tbl.cell(r, c)
                cell.text = txt
                if len(cell.text_frame.paragraphs) > 0 and len(cell.text_frame.paragraphs[0].runs) > 0:
                    cell.text_frame.paragraphs[0].runs[0].font.size = Pt(sz)
            
            set_cell2(0, 0, "Factor", 8)
            set_cell2(0, 1, "Support Element", 8)
            set_cell2(1, 0, "Manufacturability", 7.5)
            set_cell2(1, 1, "100% off-the-shelf components, CNC casing", 7.5)
            set_cell2(2, 0, "Component Sourcing", 7.5)
            set_cell2(2, 1, "100% components available in India", 7.5)
            set_cell2(3, 0, "Scalability", 7.5)
            set_cell2(3, 1, "Scales across 16,000+ police stations", 7.5)
            set_cell2(4, 0, "Readiness", 7.5)
            set_cell2(4, 1, "Working prototype live on GitHub/Vercel", 7.5)

    # ==========================================
    # SLIDE 5 IN-PLACE UPDATES
    # ==========================================
    s5 = prs.slides[4]
    for sh in s5.shapes:
        if sh.shape_id == 227:
            set_shape_text(sh, ["Target Beneficiaries : State Police Departments, Cyber Crime Units, NIA, NCB, Border Checkpoints & 16,000+ police stations nationwide."])
        elif sh.shape_id == 231:
            set_shape_text(sh, ["faster criminal network discovery (180s vs 30 days)"])
        elif sh.shape_id == 243:
            set_shape_text(sh, [
                "Social Impact : Protects citizens by dismantling organized crime syndicates faster and auto-dispatching patrol units to distress calls in under 90 seconds.",
                "Builds public trust through transparent, tamper-proof SHA-256 evidence logs."
            ])
        elif sh.shape_id == 246:
            set_shape_text(sh, [
                "Economic Impact : Eliminates recurring proprietary lab software licenses, saving hundreds of crores annually for law enforcement agencies.",
                "Cuts investigation costs through automated multi-source data correlation on-scene."
            ])
        elif sh.shape_id == 249:
            set_shape_text(sh, [
                "Environmental Impact : Low-power 5V hardware, zero paper case file waste, reduces vehicle transit emissions for physical evidence transport.",
                "Reduces physical evidence transport, cutting related carbon emissions."
            ])
        elif sh.shape_id == 256:
            set_shape_text(sh, ["Digital Personal Data Protection (DPDP) Act 2023 compliance (128D vectors only)"])

    # ==========================================
    # SLIDE 6 IN-PLACE UPDATES
    # ==========================================
    s6 = prs.slides[5]
    for sh in s6.shapes:
        if sh.shape_id == 274:
            set_shape_text(sh, [
                "1. Bureau of Police Research & Development (BPR&D) — Smart Policing Directives & AI Crime Analysis Guidelines (2024).",
                "2. Ministry of Home Affairs, Govt. of India — Bharatiya Nyaya Sanhita (BNS 2023 / Sec 63 Electronic Evidence), effective July 1, 2024.",
                "3. Kipf, T. N., & Welling, M. — Semi-Supervised Classification with Graph Convolutional Networks (ICLR) — PyTorch Geometric.",
                "4. National Crime Records Bureau (NCRB) — CCTNS 2.0 Schema & ERSS Dial 112 Real-Time Dispatch Protocols."
            ])
        elif sh.shape_id == 279:
            set_shape_text(sh, [
                "[ 1 ) Full Documentation — github.com/muhammedmaahir68-droid/cyber-kit ]",
                "[ 2 ) Live Deployed Web App — cyber-kit-police.vercel.app ]",
                "[ 3 ) Cloud FastAPI Backend — /api/v1/criminal-network/* endpoints ]",
                "[ 4 ) Hardware Blueprint — ForensiX Tactical Unit (Make in India) ]",
                "[ 5 ) Interactive Demo — GNN Topology & Dual SOS Siren ]",
                "[ 6 ) SIH Problem Statement — sih.gov.in (PS 189 - BPR&D / MHA) ]"
            ])

    # Save modified presentation
    out_1 = r"C:\Users\mahir\OneDrive\Documents\SIH_2026_AAROHAN-X_Presentation_Kit\SIH_Ideate_Template_AAROHAN-X.pptx"
    prs.save(out_1)
    print(f"Saved updated original template to: {out_1}")

    out_2 = r"C:\Users\mahir\AppData\Local\Packages\5319275A.WhatsAppDesktop_cv1g1gvanyjgm\LocalState\sessions\E1E5306A901D36AF8AC96879A11E2AE4D5601B06\transfers\2026-36\SIH_Ideate_Template_AAROHAN-X.pptx"
    try:
        os.makedirs(os.path.dirname(out_2), exist_ok=True)
        shutil.copy2(out_1, out_2)
        print(f"Copied updated original template to: {out_2}")
    except Exception as e:
        print(f"Notice on transfer copy: {e}")

if __name__ == "__main__":
    update_template()
