import hashlib
import datetime
from fastapi import APIRouter, Depends
from pydantic import BaseModel
from typing import Optional
from sqlalchemy.orm import Session
from app.db.database import get_db

router = APIRouter(prefix="/national-sec", tags=["National Security & Control Room"])

class ThreatMatchRequest(BaseModel):
    session_uuid: str = "FX-20260829-9941"
    suspect_identifier: str = "+91-9876543210"

class PhotoScanRequest(BaseModel):
    photo_b64: Optional[str] = "DATA_SUSPECT_FACE"
    suspect_preset: Optional[str] = "SERIOUS_MURDER" # SERIOUS_MURDER, MINOR_THEFT, CLEAN_RECORD, CUSTOM

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
    return {"status": "MATCH_FOUND", "matches_count": len(matches), "matches": matches}

@router.post("/scan-suspect-photo")
def scan_suspect_photo_all_india(req: PhotoScanRequest, db: Session = Depends(get_db)):
    preset = req.suspect_preset or "SERIOUS_MURDER"

    if preset == "CLEAN_RECORD":
        return {
            "status": "NO_CRIMINAL_RECORD_FOUND",
            "ncrb_record_id": "NCRB-IND-2026-CLEAN",
            "suspect_name": "Citizen Profile: Verified (Clean Record)",
            "facial_match_confidence": 0.991,
            "crime_severity": "NO_CRIME_REGISTERED",
            "warrant_status": "NO_ACTIVE_WARRANTS",
            "operating_states": [],
            "serious_crimes_involved": [],
            "minor_crimes_involved": [],
            "cases_summary": "NO CRIMINAL CASES OR FIRs REGISTERED ACROSS ALL INDIA (NCRB / CCTNS CLEAR)",
            "action_required": "VERIFIED CITIZEN — No Police Action Required",
            "control_room_alerted": "SYSTEM LOG: CLEAR VERIFICATION RECORDED"
        }

    if preset == "MINOR_THEFT":
        return {
            "status": "ALL_INDIA_CRIME_RECORD_MATCH_FOUND",
            "ncrb_record_id": "NCRB-IND-2024-33102",
            "suspect_name": "Ramesh Kumar @ Chhotu",
            "facial_match_confidence": 0.942,
            "crime_severity": "MODERATE_PROPERTY_OFFENSE",
            "warrant_status": "LOCAL_SUMMONS_ACTIVE",
            "operating_states": ["Delhi NCR", "Haryana (Gurugram)"],
            "serious_crimes_involved": [],
            "minor_crimes_involved": [
                {"fir_no": "FIR #112/2024", "station": "Kotwali PS Delhi", "offense": "Theft & Pickpocketing (IPC 379 / BNS 303)"},
                {"fir_no": "FIR #88/2023", "station": "Excise Branch PS Gurugram", "offense": "Illicit Liquor Bootlegging (Excise Act Sec 61)"}
            ],
            "cases_summary": "REGISTERED CASES: 2 Property/Theft & Bootlegging Offenses (No Capital Crimes)",
            "action_required": "NOTICE FOR INQUIRY — Issue Local Summons & File Field Entry",
            "control_room_alerted": "LOCAL BEAT PATROL NOTIFIED"
        }
    
    # Default / SERIOUS_MURDER
    return {
        "status": "ALL_INDIA_CRIME_RECORD_MATCH_FOUND",
        "ncrb_record_id": "NCRB-IND-2025-88412",
        "suspect_name": "Vikram Singh @ Vicky (Alias: Cyber-Ghost)",
        "facial_match_confidence": 0.986,
        "crime_severity": "HIGH_SEVERITY_CAPITAL_CRIME",
        "warrant_status": "INTER_STATE_ARREST_WARRANT_ACTIVE",
        "operating_states": ["Delhi NCR", "Maharashtra (Mumbai)", "Punjab", "Karnataka"],
        "serious_crimes_involved": [
            {"fir_no": "FIR #991/2025", "station": "Special Cell PS Delhi", "offense": "Attempted Murder & Extortion (IPC 307/384 / BNS 109)"},
            {"fir_no": "FIR #412/2024", "station": "Crime Branch Unit 4 Mumbai", "offense": "Homicide & Syndicate Gang Crime (IPC 302/120B / BNS 103)"}
        ],
        "minor_crimes_involved": [
            {"fir_no": "FIR #108/2023", "station": "State Cyber Cell Mohali", "offense": "Vehicle Theft & Identity Fraud"}
        ],
        "cases_summary": "REGISTERED CASES: 3 Severe Capital & Syndicate Crimes (Attempted Murder & Homicide)",
        "action_required": "IMMEDIATE ON-SCENE ARREST & DETENTION — Inter-State Fugitive Warrant Executable",
        "control_room_alerted": "DELHI, MUMBAI & PUNJAB PCR NOTIFIED VIA MESH"
    }

@router.post("/request-approval")
def request_departmental_approval(req: dict, db: Session = Depends(get_db)):
    sig_hash = hashlib.sha256(f"{req.get('session_uuid')}_{datetime.datetime.utcnow()}".encode()).hexdigest()
    return {
        "status": "APPROVED_DIGITALLY_SIGNED",
        "approving_authority": "Superintendent of Police (Anti-Terror Squad)",
        "clearance_level": "LEVEL_3_SECRET_CLEARANCE",
        "digital_signature_hash": sig_hash
    }
