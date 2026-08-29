import uuid
import datetime
from fastapi import APIRouter, Depends
from pydantic import BaseModel
from sqlalchemy.orm import Session
from app.db.database import get_db
from app.db.models import BiometricAuthLog, EmergencyDispatchAlert

router = APIRouter(prefix="/emergency", tags=["Emergency Dispatch & Biometrics"])

class BiometricLoginRequest(BaseModel):
    officer_badge_id: str = "OFFICER #4412 (Delhi Cyber Cell)"
    fingerprint_scanned: bool = True
    face_image_b64: str = "DATA_FACE_SCAN"

class SOSAlertPayload(BaseModel):
    crime_category: str = "WOMEN_SAFETY_SOS_CRITICAL"
    victim_phone: str = "+91-9988776655"
    latitude: float = 28.6139
    longitude: float = 77.2090

@router.post("/biometric-login")
def authenticate_officer(req: BiometricLoginRequest, db: Session = Depends(get_db)):
    auth_log = BiometricAuthLog(
        officer_badge_id=req.officer_badge_id,
        fingerprint_match=req.fingerprint_scanned,
        face_auth_confidence=0.988,
        device_unlock_status="UNLOCKED_FULL_CLEARANCE"
    )
    db.add(auth_log)
    db.commit()
    db.refresh(auth_log)

    return {
        "status": "UNLOCKED_FULL_CLEARANCE",
        "officer_badge_id": req.officer_badge_id,
        "fingerprint_verified": True,
        "face_match_confidence": 0.988,
        "clearance": "DEFENSE_CYBER_LEVEL_3",
        "mobile_linked": "POLICE_MOBILE_S22_PAIRED_BLE",
        "timestamp": auth_log.timestamp.isoformat()
    }

@router.post("/sos-alert")
def trigger_sos_alert(req: SOSAlertPayload, db: Session = Depends(get_db)):
    alert_id = str(uuid.uuid4())
    alert = EmergencyDispatchAlert(
        alert_uuid=alert_id,
        source_system="DIAL_100_112_ERSS_NATIONAL",
        crime_category=req.crime_category,
        victim_latitude=req.latitude,
        victim_longitude=req.longitude,
        distress_level="RED_ALERT_CRIME_IN_PROGRESS",
        assigned_patrol_unit="NEAREST_BEAT_PATROL_UNIT_4",
        estimated_arrival_secs=90,
        status="DISPATCHED_EN_ROUTE"
    )
    db.add(alert)
    db.commit()
    db.refresh(alert)

    return {
        "alert_uuid": alert_id,
        "source_system": "DIAL_100_112_ERSS",
        "crime_category": req.crime_category,
        "victim_location": {"lat": req.latitude, "lng": req.longitude},
        "assigned_patrol_unit": "NEAREST_BEAT_PATROL_UNIT_4",
        "estimated_arrival_secs": 90,
        "dispatch_status": "INTERCEPT_DISPATCHED",
        "nearest_patrol_distance_km": 0.45,
        "message": "CRITICAL EMERGENCY: Nearest patrol unit alerted via device Mesh."
    }

@router.get("/active-alerts")
def get_active_alerts(db: Session = Depends(get_db)):
    return {
        "active_alerts_count": 2,
        "alerts": [
          {
            "alert_uuid": "ERSS-2026-9912",
            "source_system": "DIAL_100 / 112 ERSS",
            "crime_category": "WOMEN_SAFETY_SOS_CRITICAL",
            "distress_level": "RED_ALERT_IMMEDIATE_THREAT",
            "victim_phone": "+91-9988776655",
            "location": "Sector 4 Market (0.45 km away)",
            "assigned_unit": "PATROL_VAN_SECTOR_4 (En Route)",
            "arrival_time_target": "1m 30s",
            "audio_ai_analysis": "Distress screams detected by emergency mic"
          },
          {
            "alert_uuid": "ERSS-2026-8840",
            "source_system": "DIAL_100 / 112 ERSS",
            "crime_category": "ATTEMPTED_ARMED_ROBBERY",
            "distress_level": "HIGH_PRIORITY",
            "victim_phone": "+91-9811223344",
            "location": "Main Highway Junction (1.2 km away)",
            "assigned_unit": "TRAFFIC_POLICE_UNIT_12",
            "arrival_time_target": "2m 45s",
            "audio_ai_analysis": "Gunshot signature recognized by audio sensor"
          }
        ]
    }
