from fastapi import APIRouter
from pydantic import BaseModel
from app.services.ml_triage import ml_triage_service

router = APIRouter(prefix="/ai", tags=["AI Triage"])

class PredictRequest(BaseModel):
    size_kb: float = 1250.0
    entropy: float = 7.95
    exif_delta_hrs: float = 48.5
    threat_density: float = 0.85
    header_valid: int = 1

@router.post("/predict")
def predict_threat(req: PredictRequest):
    threat_class, confidence = ml_triage_service.predict_threat(
        req.size_kb, req.entropy, req.exif_delta_hrs, req.threat_density, req.header_valid
    )
    return {
        "threat_class": threat_class,
        "confidence": confidence,
        "model_used": "Scikit-Learn Random Forest (Local Int8 Quantized)"
    }
