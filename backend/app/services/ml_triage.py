import os
import joblib
import numpy as np

MODEL_PATH = os.path.join(os.path.dirname(os.path.dirname(os.path.dirname(__file__))), "data", "triage_model.joblib")

class MLTriageService:
    def __init__(self):
        self.model = None
        self._load_model()

    def _load_model(self):
        if os.path.exists(MODEL_PATH):
            try:
                self.model = joblib.load(MODEL_PATH)
                print(f"[+] Local Scikit-Learn Model Loaded from {MODEL_PATH}")
            except Exception as e:
                print(f"[-] Failed to load model: {e}")

    def predict_threat(self, size_kb: float, entropy: float, exif_delta_hrs: float, threat_density: float, header_valid: int):
        if self.model is not None:
            features = np.array([[size_kb, entropy, exif_delta_hrs, threat_density, header_valid]])
            pred_class = int(self.model.predict(features)[0])
            probs = self.model.predict_proba(features)[0]
            confidence = float(np.max(probs))
        else:
            # Fallback local heuristic predictor
            if threat_density > 0.7 or exif_delta_hrs > 48.0:
                pred_class = 2  # CONTRABAND
                confidence = 0.94
            elif header_valid == 0 or exif_delta_hrs > 12.0:
                pred_class = 1  # SUSPICIOUS
                confidence = 0.88
            else:
                pred_class = 0  # CLEAN
                confidence = 0.96

        class_map = {0: "CLEAN", 1: "SUSPICIOUS", 2: "CONTRABAND"}
        return class_map.get(pred_class, "CLEAN"), confidence

ml_triage_service = MLTriageService()
