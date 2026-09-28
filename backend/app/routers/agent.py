from fastapi import APIRouter
from pydantic import BaseModel
from typing import List, Dict, Any
from app.services.agentic_reasoner import agentic_reasoner
from app.services.carving_engine import carving_engine
from app.services.ml_triage import ml_triage_service

router = APIRouter(prefix="/agent", tags=["Agentic AI"])

class AgenticAnalysisRequest(BaseModel):
    session_uuid: str = "FX-DEMO-2026"

@router.post("/analyze")
def run_agentic_analysis(req: AgenticAnalysisRequest):
    # Retrieve carved items for session
    raw_carved = carving_engine.simulate_sector_carve(req.session_uuid, 100.0)
    evidence_items = []
    for item in raw_carved:
        t_class, conf = ml_triage_service.predict_threat(
            item["size_kb"], item["entropy"], item["exif_delta_hrs"], item["threat_density"], item["header_valid"]
        )
        item["ml_threat_class"] = t_class
        item["ml_confidence"] = conf
        evidence_items.append(item)

    traces = agentic_reasoner.run_reasoning_loop(req.session_uuid, evidence_items)
    
    return {
        "session_uuid": req.session_uuid,
        "agent_mode": "100% Offline Local Agentic AI",
        "steps_count": len(traces),
        "traces": traces,
        "summary": "Agentic reasoning cycle completed with 0 external API calls."
    }

from app.services.case_copilot_service import case_copilot_service

class CopilotQueryRequest(BaseModel):
    query: str
    case_id: str = "FIR-991/2025"

@router.get("/copilot/eval")
def get_copilot_evaluation_benchmark():
    """Runs accuracy benchmark on 50 synthetic FIR cases: Entity F1, Kingpin Top-3, Evidence Gap Recall"""
    return case_copilot_service.run_benchmark_evaluation()

@router.get("/copilot/cases")
def list_copilot_cases():
    """Returns synthetic cases available for investigation"""
    return [
        {"case_id": c["case_id"], "title": c["title"], "snippet": c["narrative"][:120] + "..."}
        for c in case_copilot_service.cases.values()
    ]

@router.post("/copilot/query")
def query_copilot(req: CopilotQueryRequest):
    """Processes an investigation query with NER entity extraction, suspect ranking, and evidence gap detection"""
    entities = case_copilot_service.extract_entities(req.query)
    suspects = case_copilot_service.rank_suspects(req.case_id)
    gaps = case_copilot_service.list_evidence_gaps(req.case_id)
    return {
        "case_id": req.case_id,
        "query": req.query,
        "extracted_entities": entities,
        "suspect_rankings": suspects,
        "evidence_gaps": gaps,
        "status": "PROCESSED"
    }
