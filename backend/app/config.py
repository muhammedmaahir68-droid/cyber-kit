import os
from pydantic_settings import BaseSettings

class Settings(BaseSettings):
    PROJECT_NAME: str = "Cyber Kit Digital Forensics & AI Triage Engine"
    API_V1_STR: str = "/api/v1"
    
    # On Vercel Serverless, use /tmp directory for SQLite writable database
    DATABASE_URL: str = os.getenv(
        "DATABASE_URL", 
        "sqlite:////tmp/cyber_kit.db" if os.getenv("VERCEL") else "sqlite:///./cyber_kit.db"
    )
    HW_WRITE_BLOCKER_ENFORCED: bool = True
    MODEL_PATH: str = os.path.join(os.path.dirname(os.path.dirname(__file__)), "data", "triage_model.joblib")

settings = Settings()
