# Cyber Kit — Enterprise Digital Forensics & Edge AI Triage Platform

**Cyber Kit** is an enterprise digital forensics and field threat triage platform designed for law enforcement. It features hardware write-blocker enforcement, raw sector carving, local ML model triage, offline Agentic AI reasoning, an **All-India NCRB Suspect Photo Scanner**, and **Dial 100/112 ERSS Emergency Patrol Mesh**.

---

## 🚀 Recommended Deployment: Render (Backend) + Vercel (Frontend)

This architecture deploys the **FastAPI Python Backend on Render** (for full persistent server execution, SQLite database, and ML models) and the **React SPA Frontend on Vercel** (for high-speed CDN delivery).

---

### Step 1: Deploy Backend on Render (`https://render.com`)

1. Log in to **[Render Dashboard](https://dashboard.render.com)**.
2. Click **New +** $\rightarrow$ **Web Service**.
3. Connect your GitHub repository: `muhammedmaahir68-droid/cyber-kit`.
4. Configure the Web Service settings:
   * **Name**: `cyber-kit-backend`
   * **Runtime**: `Python 3`
   * **Build Command**:  
     `pip install -r backend/requirements.txt && pip install pydantic-settings && PYTHONPATH=backend python backend/train_model.py`
   * **Start Command**:  
     `PYTHONPATH=backend python -m uvicorn app.main:app --host 0.0.0.0 --port $PORT`
5. Under **Environment Variables**, add:
   * **Key**: `PYTHONPATH` | **Value**: `backend`
   * **Key**: `PYTHON_VERSION` | **Value**: `3.10.12`
6. Click **Create Web Service**.
7. Copy your Render Backend URL (e.g. `https://cyber-kit-backend.onrender.com`).

---

### Step 2: Deploy Frontend on Vercel (`https://vercel.com`)

1. Log in to **[Vercel Dashboard](https://vercel.com/new)**.
2. Click **Import Repository** and select `muhammedmaahir68-droid/cyber-kit`.
3. Under **Environment Variables**, add:
   * **Key**: `VITE_API_URL`
   * **Value**: `https://cyber-kit-backend.onrender.com` *(Replace with your Render URL)*
4. Click **Deploy**.
5. Vercel will build and host your frontend on a fast global CDN (e.g. `https://cyber-kit.vercel.app`)!

---

## 💻 Local Quickstart Guide

### Option 1: Running via Python & Node
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

### Option 2: Running via Docker Compose
```bash
docker-compose up --build
```

---

## 📂 Architecture & Directory Structure

```
cyber kit/
├── backend/                             # Python FastAPI Backend
│   ├── app/
│   │   ├── main.py                     # FastAPI Entrypoint
│   │   ├── db/                         # SQLAlchemy Database ORM
│   │   ├── routers/                    # API Endpoints (/scan, /ai, /agent, /national-sec, /emergency)
│   │   └── services/                   # Carving engine, Local ML, Agentic AI
│   ├── data/                           # Forensic dataset & trained .joblib model
│   └── requirements.txt                # Python Dependencies
├── frontend/                            # React + Vite Frontend
│   ├── index.html                      # SPA entrypoint
│   ├── src/
│   │   ├── App.jsx                     # Unified 4-Core Layout
│   │   └── components/                 # FieldConsole, IntelligenceCenter, EmergencyMesh, UE5TwinView
├── render.yaml                          # Render Deployment Blueprint
├── vercel.json                          # Vercel React SPA Routing
├── docker-compose.yml                  # Docker Compose configuration
└── README.md                           # Documentation
```
