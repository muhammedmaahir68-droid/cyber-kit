import uuid
from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from app.db.database import get_db
from app.db.models import ScanSession, EvidenceItem
from app.services.carving_engine import carving_engine
from app.services.ml_triage import ml_triage_service

router = APIRouter(prefix="/scan", tags=["Scan"])

@router.post("/start")
def start_scan(db: Session = Depends(get_db)):
    session_id = str(uuid.uuid4())
    session = ScanSession(
        session_uuid=session_id,
        status="SCANNING",
        scanned_sectors=0,
        total_sectors=131072,
        write_blocker_active=True
    )
    db.add(session)
    db.commit()
    db.refresh(session)
    return {"status": "SUCCESS", "session_uuid": session_id, "message": "Field triage scan started."}

@router.get("/status/{session_uuid}")
def get_scan_status(session_uuid: str, db: Session = Depends(get_db)):
    session = db.query(ScanSession).filter(ScanSession.session_uuid == session_uuid).first()
    if not session:
        # Create virtual session for demo if not found
        session = ScanSession(session_uuid=session_uuid, status="SCANNING", scanned_sectors=65536)

    # Calculate simulated progress
    progress_percent = 75.0 if session.status == "SCANNING" else 100.0
    raw_carved = carving_engine.simulate_sector_carve(session_uuid, progress_percent)

    evidence_list = []
    for item in raw_carved:
        threat_class, conf = ml_triage_service.predict_threat(
            item["size_kb"], item["entropy"], item["exif_delta_hrs"], item["threat_density"], item["header_valid"]
        )
        evidence_list.append({
            "filename": item["filename"],
            "file_type": item["file_type"],
            "sector_offset": item["sector_offset"],
            "size_kb": item["size_kb"],
            "sha256_hash": item["sha256_hash"],
            "ml_threat_class": threat_class,
            "ml_confidence": conf,
            "summary": item["summary"]
        })

    return {
        "session_uuid": session_uuid,
        "device_model": session.device_model,
        "status": session.status,
        "progress_percent": progress_percent,
        "write_blocker_active": session.write_blocker_active,
        "session_hash": session.session_hash,
        "evidence_items": evidence_list
    }
