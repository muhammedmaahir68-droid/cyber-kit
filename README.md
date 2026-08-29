# Cyber Kit — On-Scene Digital Forensics & Offline AI Triage Platform

**Cyber Kit** is a full-stack digital forensics and threat triage platform designed for field law enforcement officers. It combines hardware-enforced read-only write blocking, raw storage sector carving, local quantized Machine Learning models, and a **100% offline Agentic AI reasoning engine** (with 0 external API dependencies).

---

## Key Features

1. **Frontend Dashboard**:
   - Built with React + Vite and Tailwind CSS.
   - Includes a **Real-Time Unreal Engine 5 3D Digital Twin Showcase** canvas displaying 3D tactical scene rendering, camera controls, glowing USB-OTG telemetry streams, and device HUD.
   - Interactive Sector Carving Map, AI Evidence Gallery, Offline Agentic AI Reasoning Trace, and SHA-256 Chain of Custody Report Exporter.

2. **Backend Engine (FastAPI & Python)**:
   - File carving engine for raw sector header/footer parsing (`JPEG`, `PNG`, `SQLite` freelists).
   - Local Machine Learning Triage service (`scikit-learn` Random Forest trained on `forensic_dataset.csv`).
   - Offline **Agentic AI Reasoner** running 4-phase reasoning trajectories (`PERCEIVE` $\rightarrow$ `ASSESS` $\rightarrow$ `CORRELATE` $\rightarrow$ `SYNTHESIZE`) without external LLM/API calls.

3. **Database**:
   - SQLAlchemy ORM supporting SQLite (for local edge hardware) or PostgreSQL (for production cluster deployment).

4. **Containerization & Cloud Native Orchestration**:
   - `Dockerfile.backend`: Multi-stage Python 3.11 image with automatic ML model training.
   - `Dockerfile.frontend`: Multi-stage Node/Nginx container.
   - `docker-compose.yml`: Multi-container local orchestration.
   - `k8s/`: Complete Kubernetes manifests (`Deployments`, `Services`, `PVC`, `Ingress`).

---

## Quickstart Guide

### Option 1: Running Locally with Python & Node

1. **Backend**:
   ```bash
   cd backend
   pip install -r requirements.txt
   python train_model.py
   uvicorn app.main:app --host 0.0.0.0 --port 8000
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
- Access Frontend UI at `http://localhost:3000`
- Access Backend API Docs at `http://localhost:8000/docs`

---

### Option 3: Deploying to Kubernetes Cluster

```bash
kubectl apply -f k8s/postgres-pv.yaml
kubectl apply -f k8s/postgres-deployment.yaml
kubectl apply -f k8s/backend-deployment.yaml
kubectl apply -f k8s/frontend-deployment.yaml
kubectl apply -f k8s/ingress.yaml
```

---

## Project Structure

```
cyber kit/
├── backend/
│   ├── app/
│   │   ├── main.py                     # FastAPI application entrypoint
│   │   ├── config.py                   # App configuration & write-blocker flag
│   │   ├── db/                         # Database ORM & session setup
│   │   ├── routers/                    # API Endpoints (/scan, /ai, /agent)
│   │   └── services/                   # Carving engine, Local ML, Agentic AI
│   ├── data/                           # Forensic dataset & trained .joblib model
│   ├── train_model.py                  # Local Scikit-Learn training script
│   └── Dockerfile.backend              # Backend container definition
├── frontend/
│   ├── index.html                      # Single page app index
│   ├── src/
│   │   ├── App.jsx                     # Main React dashboard layout
│   │   └── components/
│   │       └── UnrealEngine5Showcase.jsx # Interactive 3D UE5 Showcase Canvas
│   └── Dockerfile.frontend             # Frontend Nginx container definition
├── k8s/                                # Kubernetes manifests (Deployments, Services, Ingress)
├── docker-compose.yml                  # Docker Compose configuration
└── README.md                           # Documentation
```
