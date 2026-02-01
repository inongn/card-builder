#!/usr/bin/env python3
import json
import urllib.request

API_KEY = "AIzaSyCy6Gpf8hunxCVIOEXxEGphicHUmUSRrtk"

# Test different API endpoints
endpoints = [
    f"https://generativelanguage.googleapis.com/v1/models/gemini-1.5-flash:generateContent?key={API_KEY}",
    f"https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key={API_KEY}",
    f"https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key={API_KEY}",
]

payload = {
    "contents": [{
        "parts": [{
            "text": "Translate to Spanish: Hello"
        }]
    }]
}

for endpoint in endpoints:
    print(f"\nTesting: {endpoint[:80]}...")
    try:
        data = json.dumps(payload).encode('utf-8')
        req = urllib.request.Request(
            endpoint,
            data=data,
            headers={"Content-Type": "application/json"}
        )
        
        with urllib.request.urlopen(req) as response:
            result = json.loads(response.read().decode('utf-8'))
            print(f"✓ SUCCESS!")
            print(f"Response: {result}")
            break
    except Exception as e:
        print(f"✗ FAILED: {e}")
