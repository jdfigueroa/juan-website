#!/usr/bin/env python3
"""
Download any image listed in tools/media-manifest.json that isn't in
assets/media/ yet. Used once to move the images off Cargo; safe to re-run.

    python3 tools/fetch_media.py
"""
import json, os, sys, urllib.request

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
MEDIA = os.path.join(ROOT, "assets", "media")
manifest = json.load(open(os.path.join(ROOT, "tools", "media-manifest.json")))
os.makedirs(MEDIA, exist_ok=True)

missing = {k: v for k, v in manifest.items() if not os.path.exists(os.path.join(MEDIA, k))}
print(f"{len(manifest)} in manifest, {len(missing)} to download")
failed = []
for i, (name, url) in enumerate(sorted(missing.items()), 1):
    dest = os.path.join(MEDIA, name)
    try:
        req = urllib.request.Request(url, headers={"User-Agent": "Mozilla/5.0"})
        with urllib.request.urlopen(req, timeout=120) as r:
            data = r.read()
        with open(dest, "wb") as f:
            f.write(data)
        print(f"[{i}/{len(missing)}] {name} ({len(data)//1024} KB)")
    except Exception as e:
        failed.append(name)
        print(f"[{i}/{len(missing)}] FAILED {name}: {e}")

if failed:
    print(f"{len(failed)} failed")
    sys.exit(1)
