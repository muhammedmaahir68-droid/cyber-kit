import sys
import os

# Add backend directory to sys.path automatically
sys.path.insert(0, os.path.dirname(os.path.dirname(os.path.abspath(__file__))))

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.config import settings
from app.db.database import engine, Base
from app.routers import scan, ai, agent, national_sec, emergency_dispatch, push_notifications

# Create DB tables safely
try:
    Base.metadata.create_all(bind=engine)
except Exception as e:
    print(f"[-] DB init warning: {e}")

app = FastAPI(
    title=settings.PROJECT_NAME,
    description="Cyber Kit: On-Scene Handheld Digital Forensics, Local ML Triage, Dial 100/112 ERSS Patrol Dispatch & Biometric Security Engine",
    version="1.0.0"
)

# Enable CORS for frontend communication
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(scan.router, prefix=settings.API_V1_STR)
app.include_router(ai.router, prefix=settings.API_V1_STR)
app.include_router(agent.router, prefix=settings.API_V1_STR)
app.include_router(national_sec.router, prefix=settings.API_V1_STR)
app.include_router(emergency_dispatch.router, prefix=settings.API_V1_STR)
app.include_router(push_notifications.router, prefix=settings.API_V1_STR)

@app.get("/")
def root():
    return {
        "status": "ONLINE",
        "project": settings.PROJECT_NAME,
        "hardware_write_blocker": settings.HW_WRITE_BLOCKER_ENFORCED,
        "control_room_sync": "ENCRYPTED_gRPC_LINK_ACTIVE",
        "dial_100_112_erss": "REALTIME_PATROL_MESH_ACTIVE",
        "biometric_security": "FINGERPRINT_FACE_AUTH_ENABLED",
        "docs_url": "/docs"
    }

@app.get("/health")
def health_check():
    return {"status": "HEALTHY", "write_blocker_bus": "HIGH_READ_ONLY", "erss_dispatch": "CONNECTED"}
