# Cyber Kit — On-Scene Digital Forensics & Edge AI Triage Platform

**Cyber Kit** is an enterprise digital forensics and field threat triage platform designed for law enforcement officers. It combines hardware-enforced read-only write blocking, raw storage sector carving, local quantized Machine Learning models, an **offline Agentic AI reasoning engine**, an **All-India NCRB Suspect Photo Scanner**, and **Dial 100/112 ERSS Emergency Patrol Dispatch**.

---

## ⚡ Deployment on Vercel

This repository is pre-configured with `vercel.json` for 1-click full-stack deployment on Vercel (building the React + Vite frontend and running the Python FastAPI backend serverless functions automatically).

### Option 1: Vercel Dashboard (Recommended)

1. Go to **[Vercel Dashboard](https://vercel.com/new)** and sign in.
2. Click **"Import Repository"** and select `muhammedmaahir68-droid/cyber-kit`.
3. Vercel will automatically detect `vercel.json`.
4. Click **"Deploy"**.
5. Once deployment completes, Vercel will provide your live public production URL (e.g., `https://cyber-kit.vercel.app`)!

---

### Option 2: Deploying via Vercel CLI

```bash
# 1. Install Vercel CLI
npm install -g vercel

# 2. Login to Vercel
vercel login

# 3. Deploy to production
cd "C:\Users\mahir\OneDrive\Desktop\cyber kit"
vercel --prod
```

---

## 💻 Local Quickstart Guide

### Option 1: Running with Python & Node
1. **Backend**:
   ```bash
   cd backend
   pip install -r requirements.txt
   pip install pydantic-settings
   python train_model.py
   python -m uvicorn app.main:app --host 0.0.0.0 --port 8000
   ```
2. **Frontend**:
   ```bash
   cd frontend
   npm install
   npm run dev
   ```
   Open `http://localhost:3000` in your browser.

---

### Option 2: Running with Docker Compose
```bash
docker-compose up --build
```
Access Frontend UI at `http://localhost:3000` and API docs at `http://localhost:8000/docs`.

---

## 📂 Project Structure

```
cyber kit/
├── api/
│   └── index.py                        # Vercel Serverless Function entrypoint
├── backend/
│   ├── app/
│   │   ├── main.py                     # FastAPI application entrypoint
│   │   ├── config.py                   # App settings & flags
│   │   ├── db/                         # Database ORM models
│   │   ├── routers/                    # API Endpoints (/scan, /ai, /agent, /national-sec, /emergency)
│   │   └── services/                   # Carving engine, Local ML, Agentic AI
│   └── data/                           # Forensic dataset & trained .joblib model
├── frontend/
│   ├── index.html                      # SPA entrypoint
│   ├── src/
│   │   ├── App.jsx                     # Unified 4-Core Layout
│   │   └── components/                 # FieldConsole, IntelligenceCenter, EmergencyMesh, UE5TwinView
├── k8s/                                # Kubernetes manifests
├── vercel.json                         # Vercel deployment configuration
├── requirements.txt                    # Root Python dependencies for Vercel
├── docker-compose.yml                  # Docker Compose setup
└── README.md                           # Documentation
```
