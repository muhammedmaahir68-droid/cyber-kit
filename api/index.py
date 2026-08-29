import sys
import os

# Add backend directory to sys.path for module importing on Vercel
sys.path.append(os.path.join(os.path.dirname(__file__), "..", "backend"))

from app.main import app

# Vercel Python runtime entrypoint
handler = app
