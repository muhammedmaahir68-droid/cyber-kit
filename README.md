# AAROHAN-X — AI-Powered Criminal Network Analysis & Tactical Field Triage Ecosystem
### Smart India Hackathon 2026 | Problem Statement ID: 189
**Organization:** Bureau of Police Research & Development (BPR&D) / Ministry of Home Affairs  
**Theme:** Smart Automation / Cyber Security & Law Enforcement | **Category:** Hardware + Software (Hybrid Tactical Field Unit)  
**Team Name:** AAROHAN-X | **Team ID:** `T-SIH2026-89412`

---

## 📌 SIH 2026 Official Submission Links
* 📊 **Official PPTX Presentation (Direct Download)**: [Download SIH_Ideate_Template_AAROHAN-X.pptx](https://raw.githubusercontent.com/muhammedmaahir68-droid/cyber-kit/main/presentation/SIH_Ideate_Template_AAROHAN-X.pptx)
* 🌐 **Live Web Application (Vercel)**: [https://cyber-kit-police.vercel.app](https://cyber-kit-police.vercel.app)
* ⚡ **FastAPI Backend API Docs (Render)**: [https://cyber-kit-backend.onrender.com/docs](https://cyber-kit-backend.onrender.com/docs)
* 🚨 **Mobile ERSS SOS Push Notification Channel**: [https://ntfy.sh/cyberkit-police-sih2026-maahir](https://ntfy.sh/cyberkit-police-sih2026-maahir)

---

## 🖼️ Official 6/6 Slide Previews (SIH Ideate Template)

| Slide 1: Title & Problem Statement | Slide 2: Proposed Solution |
| :---: | :---: |
| ![Slide 1](https://raw.githubusercontent.com/muhammedmaahir68-droid/cyber-kit/main/presentation/slides/Original_Template_Slide1.jpg) | ![Slide 2](https://raw.githubusercontent.com/muhammedmaahir68-droid/cyber-kit/main/presentation/slides/Original_Template_Slide2.jpg) |
| **Slide 3: Technical Approach** | **Slide 4: Feasibility & Viability** |
| ![Slide 3](https://raw.githubusercontent.com/muhammedmaahir68-droid/cyber-kit/main/presentation/slides/Original_Template_Slide3.jpg) | ![Slide 4](https://raw.githubusercontent.com/muhammedmaahir68-droid/cyber-kit/main/presentation/slides/Original_Template_Slide4.jpg) |
| **Slide 5: Impact & Benefits** | **Slide 6: Research & References** |
| ![Slide 5](https://raw.githubusercontent.com/muhammedmaahir68-droid/cyber-kit/main/presentation/slides/Original_Template_Slide5.jpg) | ![Slide 6](https://raw.githubusercontent.com/muhammedmaahir68-droid/cyber-kit/main/presentation/slides/Original_Template_Slide6.jpg) |

---

## 🏛️ Core 3-Pillar Unified Architecture

1. **Pillar 1: On-Scene Hardware Write-Blocker & Field Triage**
   * Plugs directly into seized evidence drives with hardware-enforced `WRITE_ENABLE = FALSE`.
   * Sector carving completed in `<180s` with SHA-256 evidence sealing (100% compliant with Bharatiya Sakshya Adhiniyam Sec 63 / Indian Evidence Act Sec 65B).

2. **Pillar 2: GNN Criminal Network Analysis & Kingpin Centrality**
   * Multi-source data ingestion across all 7 disparate sources (FIRs, CDRs, Hawala transactions, Surveillance, OSINT, NCRB, NATGRID).
   * PyTorch Geometric Spectral Graph Convolutional Network (GCN) mapping cross-border links with **98.6% link precision**.
   * Betweenness & Eigenvector Centrality isolating Rank #1 Syndicate Kingpins (e.g. *Vikram Singh @ Cyber-Ghost*).
   * 128D Offline Facial Recognition on Hailo-8L NPU (13 TOPS) in `<2s` (100% DPDP Act 2023 compliant).

3. **Pillar 3: Dual Dial 100/112 ERSS Emergency Patrol Mesh**
   * Automated patrol van routing with under-90-second arrival target.
   * Lockscreen DND override push alert waking nearest sleeping officer's personal phone on duty.
   * 4-Layer Anti-Prank Verification eliminating false distress alarms.

---

## 💻 Local Quickstart Guide

### 1. Backend (FastAPI Python)
```bash
cd backend
pip install -r requirements.txt
python -m uvicorn app.main:app --host 0.0.0.0 --port 8000 --reload
```

### 2. Frontend (React + Vite + Tailwind)
```bash
cd frontend
npm install
npm run dev
```

---

## 📄 License & Compliance
* **BNS 2023 Section 63**: Automated SHA-256 cryptographic chain of custody.
* **DPDP Act 2023**: Zero raw facial photos retained; only 128D numerical vector arrays processed locally.
* **License**: MIT Open Source — Developed for Smart India Hackathon (SIH 2026).
