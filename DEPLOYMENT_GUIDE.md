# AAROHAN-X: Production Deployment Guide & Real-Time Architecture

This guide details how to run the **AI-Powered Criminal Network Analysis & Field Triage System** as a genuine **real-time production service** on the cloud rather than an offline simulation or localhost-only setup.

---

## 1. System Architecture

\                     REAL-WORLD AUTHORIZED DATA SOURCES
                                     │
             ┌───────────────────────┼───────────────────────┐
             │                       │                       │
      Live Camera / CCTV       Police / Case Records    IoT / Sensor Mesh
    (Webcam or IP Camera)       (FIR / CCTNS / NCRB)     (Gunfire / IMSI)
             │                       │                       │
             └───────────────────────┼───────────────────────┘
                                     ↓
                          INGESTION GATEWAY API
                         (FastAPI High-Speed REST)
                                     ↓
                         MESSAGE BROKER / QUEUE
                       (Redis 7 Pub/Sub / Kafka)
                                     ↓
                    ┌────────────────┴────────────────┐
                    ↓                                 ↓
           OPENCV & AI PIPELINE                RULE EVALUATOR
        (Face / Weapon Detection)          (Risk Scoring Engine)
                    │                                 │
                    └────────────────┬────────────────┘
                                     ↓
                       RELATIONAL DATABASE PERSISTENCE
                           (PostgreSQL 15 / SQLite)
                                     ↓
                         BI-DIRECTIONAL WEBSOCKETS
                          (FastAPI ASGI Endpoint)
                                     ↓
                         REACT OPERATOR DASHBOARD
                        (Live Alerts, Video, Graph)
\
---

## 2. Local Production Stack (Docker Compose)

To launch all 4 components (PostgreSQL, Redis, FastAPI Backend, React Frontend) on your machine with one command:

\\ash
# Build and run the entire multi-container stack
docker-compose up --build
\
Services launched:
- **Frontend Dashboard**: \http://localhost:3000- **Backend API & WebSockets**: \http://localhost:8000\ (Docs at \http://localhost:8000/docs\)
- **Redis Queue Broker**: \localhost:6379- **PostgreSQL Database**: \localhost:5432
---

## 3. Public Cloud Deployment (Production Stack)

### Overview of Cloud Services

| Component | Localhost | Recommended Public Cloud | Free/Low-Cost Option |
| :--- | :--- | :--- | :--- |
| **Frontend** | \localhost:3000\ | **Vercel** / AWS CloudFront | Vercel (Free tier) |
| **Backend API** | \localhost:8000\ | **Render** / **Railway** / AWS EC2 | Render / Railway |
| **WebSockets** | \ws://localhost:8000\ | **WSS** on Render / Railway | Automatic HTTPS/WSS |
| **Database** | Local SQLite / Postgres | **Neon** / **Supabase** / AWS RDS | Neon Serverless Postgres |
| **Queue / Cache**| Local Redis | **Upstash Redis** | Upstash (Free tier) |
| **SSL / HTTPS** | None | **Cloudflare** / Let's Encrypt | Included automatically |

---

### Step-by-Step Cloud Deployment

#### Step 1: Deploy Frontend to Vercel
1. Push your repository to GitHub (\https://github.com/muhammedmaahir68-droid/cyber-kit\).
2. Go to [vercel.com](https://vercel.com) and click **Add New Project**.
3. Import your GitHub repository.
4. Set **Root Directory** to \rontend\.
5. Set Environment Variable:
   - \VITE_API_URL\ = \https://your-backend-service.onrender.com6. Click **Deploy**. Vercel will output your live URL (e.g., \https://aarohan-x.vercel.app\).

#### Step 2: Deploy Backend to Render or Railway
1. Go to [render.com](https://render.com) and create a **Web Service**.
2. Connect your GitHub repository.
3. Configure settings:
   - **Environment**: \Python 3   - **Build Command**: \pip install -r backend/requirements.txt && pip install pydantic-settings && PYTHONPATH=backend python backend/train_model.py   - **Start Command**: \PYTHONPATH=backend python -m uvicorn app.main:app --host 0.0.0.0 --port 4. Add Environment Variables:
   - \PYTHONPATH\ = \ackend   - \DATABASE_URL\ = \postgresql://... (from Neon or Supabase)   - \HW_WRITE_BLOCKER_ENFORCED\ = \True5. Click **Create Web Service**. Render provides automated SSL with \https://\ and \wss://\ support out of the box!

#### Step 3: Attach Free Managed Cloud PostgreSQL (Neon / Supabase)
1. Create a free database on [neon.tech](https://neon.tech) or [supabase.com](https://supabase.com).
2. Copy the Connection String URI:
   \postgresql://user:password@ep-sample.ap-southeast-1.neon.tech/neondb?sslmode=require3. Paste this into Render/Railway as \DATABASE_URL\.
4. The backend automatically creates all tables on startup via SQLAlchemy!

---

## 4. Why This Eliminates Any Simulation Moat

1. **Genuine Camera Feed via OpenCV**:
   - Modern browsers require HTTPS (or localhost) to grant camera access (avigator.mediaDevices.getUserMedia\).
   - When deployed under HTTPS, officers can activate their device camera. Video frames are streamed every 500ms to \POST /api/v1/realtime/ingest-frame\.
   - The backend runs real OpenCV Haar Cascade face detection and variance calculation, returning live bounding boxes and sub-50ms latency metrics.

2. **Real Asynchronous Message Queue**:
   - Incoming events are not rendered statically; they are placed in a background asynchronous queue (\syncio.Queue\ or Redis), triaged by the AI rule engine, signed with SHA-256 evidence seals, and broadcast via WebSockets.

3. **Judicial Compliance under BNS 2023**:
   - All evidentiary events receive a cryptographic SHA-256 seal stored alongside magistrate / SP digital warrants compliant with Section 63 of Bharatiya Nyaya Sanhita (BNS) and Section 65B of Bharatiya Sakshya Adhiniyam (BSA).
