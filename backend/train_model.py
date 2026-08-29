import os
import pandas as pd
import numpy as np
from sklearn.ensemble import RandomForestClassifier
from sklearn.model_selection import train_test_split
from sklearn.metrics import classification_report
import joblib

DATASET_PATH = os.path.join(os.path.dirname(__file__), "data", "forensic_dataset.csv")
MODEL_PATH = os.path.join(os.path.dirname(__file__), "data", "triage_model.joblib")

def train_triage_model():
    print("[*] Loading Forensic Dataset...")
    if not os.path.exists(DATASET_PATH):
        raise FileNotFoundError(f"Dataset not found at {DATASET_PATH}")
    
    df = pd.read_csv(DATASET_PATH)
    X = df[['file_size_kb', 'entropy', 'exif_timestamp_delta_hrs', 'keyword_threat_density', 'header_valid']]
    y = df['threat_class']  # 0: CLEAN, 1: TAMPERED/SUSPICIOUS, 2: CONTRABAND/CRITICAL

    X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)
    
    clf = RandomForestClassifier(n_estimators=50, max_depth=5, random_state=42)
    clf.fit(X_train, y_train)
    
    acc = clf.score(X_test, y_test)
    print(f"[+] Model Trained Successfully. Test Accuracy: {acc * 100:.2f}%")
    
    os.makedirs(os.path.dirname(MODEL_PATH), exist_ok=True)
    joblib.dump(clf, MODEL_PATH)
    print(f"[+] Saved Trained ML Model to {MODEL_PATH}")

if __name__ == "__main__":
    train_triage_model()
