import json
import traceback
from typing import List, Dict
from fastapi import APIRouter
from pydantic import BaseModel

router = APIRouter(prefix="/push", tags=["Web Push Notifications"])

# VAPID Keys for Web Push (generated for this project)
VAPID_PUBLIC_KEY = "BHeZKsSuj7QOtWGie-3bJOB4MZeWAYvt1q2b6n7Zq-G5qyommY82cxY_wZa6c2FYVq3-JXi7bf_1iWli_6gvg8E"
VAPID_PRIVATE_KEY = "E2Yk9reGoK10j0sRW1Of2MMQSavmVMhFbDiKMapp1gk"
VAPID_CLAIMS = {"sub": "mailto:cyberkit-police@aarohanx.in"}

# In-memory store for push subscriptions from all connected devices
PUSH_SUBSCRIPTIONS: List[Dict] = []

class PushSubscription(BaseModel):
    endpoint: str
    keys: dict  # {p256dh: str, auth: str}

class SOSPushPayload(BaseModel):
    title: str = "🚨 DIAL 100/112 EMERGENCY SOS ALERT"
    body: str = "CRITICAL: Women Safety SOS at Sector 4 Market. Officer #4412 dispatched!"
    crime_category: str = "WOMEN_SAFETY_SOS_CRITICAL"
    location: str = "Sector 4 Market (0.35 km away)"
    victim_phone: str = "+91-9988776655"

@router.get("/vapid-public-key")
def get_vapid_public_key():
    """Frontend calls this to get the VAPID public key for push subscription."""
    return {"public_key": VAPID_PUBLIC_KEY}

@router.post("/subscribe")
def subscribe_push(sub: PushSubscription):
    """Register a device's push subscription for real-time SOS alerts."""
    # Check if already subscribed (by endpoint)
    for existing in PUSH_SUBSCRIPTIONS:
        if existing.get("endpoint") == sub.endpoint:
            return {"status": "ALREADY_SUBSCRIBED", "total_devices": len(PUSH_SUBSCRIPTIONS)}

    PUSH_SUBSCRIPTIONS.append({
        "endpoint": sub.endpoint,
        "keys": sub.keys
    })

    return {
        "status": "SUBSCRIBED_OK",
        "total_devices": len(PUSH_SUBSCRIPTIONS),
        "message": f"Device registered for real-time SOS push notifications. {len(PUSH_SUBSCRIPTIONS)} device(s) in mesh."
    }

@router.get("/subscribers-count")
def get_subscribers_count():
    return {"total_devices": len(PUSH_SUBSCRIPTIONS)}

@router.post("/send-sos-push")
def send_sos_push_to_all(payload: SOSPushPayload):
    """Send real push notification to ALL subscribed officer phones."""
    from pywebpush import webpush, WebPushException

    results = []
    failed_indices = []

    push_data = json.dumps({
        "title": payload.title,
        "body": f"{payload.crime_category} at {payload.location}. Victim: {payload.victim_phone}. Officer dispatched! Target arrival <85s.",
        "crime_category": payload.crime_category,
        "location": payload.location,
        "victim_phone": payload.victim_phone
    })

    for i, sub in enumerate(PUSH_SUBSCRIPTIONS):
        try:
            webpush(
                subscription_info=sub,
                data=push_data,
                vapid_private_key=VAPID_PRIVATE_KEY,
                vapid_claims=VAPID_CLAIMS
            )
            results.append({"device": i + 1, "status": "PUSH_DELIVERED"})
        except WebPushException as e:
            print(f"[PUSH ERROR] Device {i+1}: {e}")
            if "410" in str(e) or "404" in str(e):
                failed_indices.append(i)
            results.append({"device": i + 1, "status": f"FAILED: {str(e)[:80]}"})
        except Exception as e:
            print(f"[PUSH ERROR] Device {i+1}: {traceback.format_exc()}")
            results.append({"device": i + 1, "status": f"ERROR: {str(e)[:80]}"})

    # Remove expired/invalid subscriptions
    for idx in reversed(failed_indices):
        PUSH_SUBSCRIPTIONS.pop(idx)

    return {
        "pushed_to": len(results),
        "active_devices": len(PUSH_SUBSCRIPTIONS),
        "results": results
    }
