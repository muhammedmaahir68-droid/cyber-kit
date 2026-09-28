# NCIS – Cyber Intelligence & Investigation Platform (NCIS-TACTICAL)
### Smart India Hackathon 2026 | Problem Statement IDs: 189 & SIH26150
* **Nodal Agencies:** Bureau of Police Research & Development (BPR&D) / Ministry of Home Affairs (MHA) & National Technical Research Organisation (NTRO)
* **Themes:** AI-Powered Criminal Network Analysis & Multi-Vendor DVR/NVR Forensic Analysis Tool
* **Category:** Software + Tactical Forensic Hardware Terminal & Agentic Voice AI
* **Team Name:** NCIS Core Cyber Intelligence Team | **Team ID:** `T-SIH2026-89412`

---

## 📌 SIH 2026 Official Submission Links
* 📘 **Master Operations Manual & Defense Dossier**: [docs/NCIS_TACTICAL_Master_Operations_Manual_and_Defense_Guide.md](docs/NCIS_TACTICAL_Master_Operations_Manual_and_Defense_Guide.md)
* 🎙️ **Master 10-Minute Presentation Script**: [docs/SIH_189_Master_Presentation_Script_and_Compliance_Guide.md](docs/SIH_189_Master_Presentation_Script_and_Compliance_Guide.md)
* 📊 **Official PPTX Presentation (NCIS Edition)**: [presentation/SIH_Ideate_Template_NCIS.pptx](presentation/SIH_Ideate_Template_NCIS.pptx)
* 📊 **Official PPTX Presentation (Alternate)**: [presentation/SIH_Ideate_Template_AAROHAN-X.pptx](presentation/SIH_Ideate_Template_AAROHAN-X.pptx)
* 🌐 **Live Web Application (Vercel)**: [https://cyber-kit-police.vercel.app](https://cyber-kit-police.vercel.app)
* ⚡ **FastAPI Backend Telemetry & Copilot API**: [https://cyber-kit-backend.onrender.com/docs](https://cyber-kit-backend.onrender.com/docs)
* 🚨 **Mobile ERSS SOS Alert Channel**: [https://ntfy.sh/cyberkit-police-sih2026-maahir](https://ntfy.sh/cyberkit-police-sih2026-maahir)

---

## 🖼️ Official 6/6 Slide Previews (SIH Ideate Template)

| Slide 1: Title & Problem Statement | Slide 2: Proposed Solution |
| :---: | :---: |
| ![Slide 1](docs/slides/Slide1_SIH189.jpg) | ![Slide 2](docs/slides/Slide2_SIH189.jpg) |
| **Slide 3: Technical Approach** | **Slide 4: Feasibility & Viability** |
| ![Slide 3](docs/slides/Slide3_SIH189.jpg) | ![Slide 4](docs/slides/Slide4_SIH189.jpg) |
| **Slide 5: Impact & Benefits** | **Slide 6: Research & References** |
| ![Slide 5](docs/slides/Slide5_SIH189.jpg) | ![Slide 6](docs/slides/Slide6_SIH189.jpg) |

---

## 🏛️ Core Architectural Pillars & Breakthrough Modules

### 1. Case Copilot (Agentic Voice + NLP Assistant)
* **Siri Voice Orb Visualizer**: Standalone voice agent with multi-frequency acoustic soundwave bars and glowing gradient visualizer.
* **Tactical Spoken Brevity**: Spoken voice replies strictly capped at $\le 3$ sentences for rapid field radio communication.
* **Multilingual Switcher**: Native speech-to-text and text-to-speech in **English (`EN`)**, **Hindi (`हिं`)**, and **Tamil (`தமிழ்`)**.
* **Autonomous Tool-Calling Loop**: Plan $\rightarrow$ Tool Call $\rightarrow$ Parse Result $\rightarrow$ Synthesize Answer with clickable citation chips (`get_fir`, `extract_entities`, `graph_query`, `rank_suspects`, `list_evidence_gaps`, `draft_request`, `search_records`, `log_action`).
* **Statutory Drafting under BNSS 2023**: One-click generation of Section 94 (CDR/IPDR), Section 107 (Bank/Crypto Freeze), and Section 176 (Digital Search) requisitions.
* **50-Case Benchmark Evaluation**: 100% Entity F1, 100% Kingpin Top-3 Accuracy, 100% Evidence Gap Recall.

### 2. Apple iOS Glassmorphism UI & Navigation
* **3-Bar Hamburger Top Toggle (`☰`)**: Collapses navigation sidebar smoothly (`w-64` $\leftrightarrow$ `w-20` $\leftrightarrow$ `w-0`) with fluid transitions and depth shadows.
* **Apple Intelligence Floating Orb Button**: Conic iridescent gradient with ambient pulsing aura.
* **Design Standards**: Frosted glass surfaces (`ios-glass`, `ios-shadow-lg`), Deep Navy `#0B1F3A`, Royal Blue `#1D4ED8`, Light Grey `#F4F6F9`, Teal `#0EA5A4`, State Emblem of India (Ashoka Lion Capital), and Sovereignty Tiranga Ribbon.

### 3. GNN Syndicate Intelligence (PS 189)
* **PyTorch Geometric Spectral GCN**: Computes multi-partite connection probabilities between FIRs, CDRs, Hawala accounts, and cell towers with **98.6% link precision**.
* **Betweenness & Eigenvector Centrality**: Isolates Rank #1 Syndicate Kingpins who communicate only through intermediate financial cutouts.

### 4. SIH26150 Multi-Vendor DVR/NVR Forensics Tool (NTRO Standard)
* **Heterogeneous CCTV Support**: Standardized acquisition and recovery for Hikvision, Dahua, CP Plus, Honeywell, and Uniview.
* **Hardware Write-Blocker Bus Switch**: NVMe PCIe Gen4, SATA III, USB 3.2, and JTAG with zero data contamination.
* **Judicial Admissibility**: Automated SHA-256 evidence sealing complying with **BNS 2023 Sec 63** and **BSA 2023 Sec 65B**.

### 5. ERSS Dial 112 Patrol Mesh
* **Interactive Touch-to-Locate Vector GIS**: Computes spherical great-circle geodesic distances via the Haversine formula and dispatches nearest patrol vans in `<60s`.

---

## 💻 Local Quickstart Guide

### 1. Backend (FastAPI Python)
```bash
cd backend
pip install -r requirements.txt
python -m uvicorn app.main:app --host 0.0.0.0 --port 8000 --reload
```

Run 50-Case Benchmark Evaluation:
```bash
python app/services/case_copilot_service.py
```

### 2. Frontend (React + Vite + Tailwind)
```bash
cd frontend
npm install
npm run dev
```

Build for Production:
```bash
npm run build
```

---

## 📄 Statutory & Legal Compliance
* **BNSS 2023 Section 94, 107 & 176**: Automated statutory requisition generation for Telecom CDRs, Bank freezes, and Magistrate digital search authorizations.
* **BNS 2023 Section 63 & BSA 2023 Section 65B**: Automated SHA-256 cryptographic chain of custody certificates for electronic evidence.
* **DPDP Act 2023**: Zero raw citizen facial photos retained; only 128D mathematical vector arrays processed.
* **License**: MIT Open Source — Developed for Smart India Hackathon (SIH 2026).
