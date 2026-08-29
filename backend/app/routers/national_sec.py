import hashlib
import datetime
from fastapi import APIRouter, Depends
from pydantic import BaseModel
from sqlalchemy.orm import Session
from app.db.database import get_db
from app.db.models import NationalThreatMatch, DepartmentalApproval, CriminalRecordMatch

router = APIRouter(prefix="/national-sec", tags=["National Security & Control Room"])

class ThreatMatchRequest(BaseModel):
    session_uuid: str = "FX-20260829-9941"
    suspect_identifier: str = "+91-9876543210"

class ApprovalRequestPayload(BaseModel):
    session_uuid: str = "FX-20260829-9941"
    requesting_officer_id: str = "OFFICER #4412 (Cyber Cell Delhi)"
    approving_authority: str = "Superintendent of Police (Anti-Terror Squad)"
    clearance_level: str = "LEVEL_3_SECRET_CLEARANCE"

class PhotoScanRequest(BaseModel):
    photo_b64: str = "DATA_SUSPECT_FACE"
    location_captured: str = "Delhi NCR Sector 4"

@router.post("/check-watchlist")
def check_national_watchlist(req: ThreatMatchRequest, db: Session = Depends(get_db)):
    matches = [
        {
            "database_source": "NATGRID / MAC Counter-Terrorism Database",
            "threat_category": "HIGH_PRIORITY_TERRORISM_ALERT",
            "suspect_alias": "Target-Alpha",
            "match_confidence": 0.964,
            "required_clearance": "LEVEL_3_SP_APPROVAL_REQUIRED",
            "recommended_action": "Immediate On-Scene Detention & Cyber Cell Escalation"
        },
        {
            "database_source": "CCTNS Inter-State Wanted Registry",
            "threat_category": "CYBER_FINANCIAL_SYNDICATE",
            "suspect_alias": "Fugitive-Cyber-88",
            "match_confidence": 0.912,
            "required_clearance": "LEVEL_2_INSPECTOR_CLEARANCE",
            "recommended_action": "Seize Storage Drives & Issue Digital Custody Warrant"
        }
    ]
    
    return {
        "status": "MATCH_FOUND",
        "query_identifier": req.suspect_identifier,
        "control_room_sync": "ENCRYPTED_gRPC_LINK_ACTIVE",
        "matches_count": len(matches),
        "matches": matches
    }

@router.post("/scan-suspect-photo")
def scan_suspect_photo_all_india(req: PhotoScanRequest, db: Session = Depends(get_db)):
    # Simulates 128D facial embedding extraction & query against NCRB National Crime Records Database
    return {
        "status": "ALL_INDIA_CRIME_RECORD_MATCH_FOUND",
        "ncrb_record_id": "NCRB-IND-2025-88412",
        "suspect_name": "Vikram Singh @ Vicky (Alias: Cyber-Ghost)",
        "facial_match_confidence": 0.986,
        "warrant_status": "INTER_STATE_ARREST_WARRANT_ACTIVE",
        "operating_states": ["Delhi NCR", "Maharashtra (Mumbai)", "Punjab", "Karnataka"],
        "fir_history": [
            {"fir_no": "FIR #991/2025", "station": "Cyber Crime PS Special Cell Delhi", "offense": "Cyber Fraud & Extortion (IPC 420/384)"},
            {"fir_no": "FIR #412/2024", "station": "Crime Branch Crime Unit 4 Mumbai", "offense": "Armed Robbery & Syndicate Crime (IPC 392/120B)"},
            {"fir_no": "FIR #108/2023", "station": "State Cyber Cell Mohali Punjab", "offense": "Financial Fraud & Identity Theft"}
        ],
        "action_required": "IMMEDIATE DETENTION — Inter-State Fugitive Warrant Executable On-Scene",
        "control_room_alerted": "DELHI & MUMBAI PCR NOTIFIED VIA MESH"
    }

@router.post("/request-approval")
def request_departmental_approval(req: ApprovalRequestPayload, db: Session = Depends(get_db)):
    sig_hash = hashlib.sha256(f"{req.session_uuid}_{req.approving_authority}_{datetime.datetime.utcnow()}".encode()).hexdigest()
    
    approval = DepartmentalApproval(
        session_uuid=req.session_uuid,
        requesting_officer_id=req.requesting_officer_id,
        approving_authority=req.approving_authority,
        clearance_level=req.clearance_level,
        status="APPROVED_DIGITALLY_SIGNED",
        digital_signature_hash=sig_hash
    )
    db.add(approval)
    db.commit()
    db.refresh(approval)

    return {
        "status": "APPROVED_DIGITALLY_SIGNED",
        "session_uuid": req.session_uuid,
        "approving_authority": req.approving_authority,
        "clearance_level": req.clearance_level,
        "digital_signature_hash": sig_hash,
        "timestamp": approval.timestamp.isoformat()
    }
