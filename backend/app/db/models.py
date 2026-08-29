import datetime
from sqlalchemy import Column, Integer, String, Float, Boolean, DateTime, Text
from app.db.database import Base

class ScanSession(Base):
    __tablename__ = "scan_sessions"

    id = Column(Integer, primary_key=True, index=True)
    session_uuid = Column(String, unique=True, index=True)
    device_model = Column(String, default="SAMSUNG-SM-S901B (512GB)")
    status = Column(String, default="READY")
    total_sectors = Column(Integer, default=131072)
    scanned_sectors = Column(Integer, default=0)
    write_blocker_active = Column(Boolean, default=True)
    session_hash = Column(String, default="e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855")
    created_at = Column(DateTime, default=datetime.datetime.utcnow)

class EvidenceItem(Base):
    __tablename__ = "evidence_items"

    id = Column(Integer, primary_key=True, index=True)
    session_uuid = Column(String, index=True)
    filename = Column(String)
    file_type = Column(String)  # IMAGE, CHAT, DOCUMENT, AUDIO
    sector_offset = Column(Integer)
    size_kb = Column(Float)
    sha256_hash = Column(String)
    ml_threat_class = Column(String)  # CLEAN, SUSPICIOUS, CONTRABAND
    ml_confidence = Column(Float)
    summary = Column(Text)
    created_at = Column(DateTime, default=datetime.datetime.utcnow)

class AgenticTrace(Base):
    __tablename__ = "agentic_traces"

    id = Column(Integer, primary_key=True, index=True)
    session_uuid = Column(String, index=True)
    step_number = Column(Integer)
    phase = Column(String)  # PERCEIVE, ASSESS, CORRELATE, SYNTHESIZE
    thought_process = Column(Text)
    action_taken = Column(String)
    created_at = Column(DateTime, default=datetime.datetime.utcnow)

class NationalThreatMatch(Base):
    __tablename__ = "national_threat_matches"

    id = Column(Integer, primary_key=True, index=True)
    session_uuid = Column(String, index=True)
    suspect_identifier = Column(String)
    database_source = Column(String) # CCTNS, NATGRID, ICJS, MAC Watchlist
    threat_category = Column(String) # COUNTER_TERRORISM, CYBER_CRIME, WANTED_FUGITIVE
    match_confidence = Column(Float)
    approval_status = Column(String, default="PENDING_SP_APPROVAL")
    created_at = Column(DateTime, default=datetime.datetime.utcnow)

class DepartmentalApproval(Base):
    __tablename__ = "departmental_approvals"

    id = Column(Integer, primary_key=True, index=True)
    session_uuid = Column(String, index=True)
    requesting_officer_id = Column(String)
    approving_authority = Column(String) # Superintendent of Police / Cyber Cell Chief
    clearance_level = Column(String) # LEVEL_3_NATIONAL_SECURITY
    status = Column(String, default="APPROVED")
    digital_signature_hash = Column(String)
    timestamp = Column(DateTime, default=datetime.datetime.utcnow)

class BiometricAuthLog(Base):
    __tablename__ = "biometric_auth_logs"

    id = Column(Integer, primary_key=True, index=True)
    officer_badge_id = Column(String)
    fingerprint_match = Column(Boolean, default=True)
    face_auth_confidence = Column(Float, default=0.985)
    device_unlock_status = Column(String, default="UNLOCKED_LEVEL_3")
    timestamp = Column(DateTime, default=datetime.datetime.utcnow)

class EmergencyDispatchAlert(Base):
    __tablename__ = "emergency_dispatch_alerts"

    id = Column(Integer, primary_key=True, index=True)
    alert_uuid = Column(String, unique=True, index=True)
    source_system = Column(String, default="DIAL_100_112_ERSS")
    crime_category = Column(String) # WOMEN_SAFETY_SOS, ATTEMPTED_MURDER, VIOLENT_ATTACK
    victim_latitude = Column(Float)
    victim_longitude = Column(Float)
    distress_level = Column(String, default="CRITICAL_RED_ALERT")
    assigned_patrol_unit = Column(String) # PATROL_VAN_SECTOR_4
    estimated_arrival_secs = Column(Integer, default=105)
    status = Column(String, default="DISPATCHED_EN_ROUTE")
    created_at = Column(DateTime, default=datetime.datetime.utcnow)

class CriminalRecordMatch(Base):
    __tablename__ = "criminal_record_matches"

    id = Column(Integer, primary_key=True, index=True)
    suspect_name = Column(String)
    ncrb_record_id = Column(String, unique=True)
    facial_match_score = Column(Float)
    fir_numbers = Column(Text) # FIR #991/2025 Delhi, FIR #412/2024 Mumbai
    charges = Column(Text) # Armed Robbery, Extortion, Cyber Fraud
    warrant_status = Column(String, default="INTER_STATE_ARREST_WARRANT_ACTIVE")
    operating_states = Column(String, default="Delhi, Maharashtra, Punjab")
    timestamp = Column(DateTime, default=datetime.datetime.utcnow)
