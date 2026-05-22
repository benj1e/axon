import os
import re
import json
import time
import subprocess
from rapidfuzz import fuzz, process

BASE_DIR = os.path.dirname(os.path.abspath(__file__))
EVERYTHING_CLI = os.path.join(BASE_DIR, "..", "assets", "bin", "es.exe")
EVERYTHING_EXE = os.path.join(BASE_DIR, "..", "assets", "bin", "Everything.exe")
FRECENCY_PATH = os.path.join(BASE_DIR, "..", "registry", "frecency.json")

USER_FOLDERS = [
    os.path.expanduser("~\\Documents"),
    os.path.expanduser("~\\Downloads"),
    os.path.expanduser("~\\Desktop"),
    os.path.expanduser("~\\Pictures"),
    os.path.expanduser("~\\Music"),
    os.path.expanduser("~\\Videos"),
    os.path.expanduser("~\\OneDrive"),  # common on Windows
]

# ── Frecency store ──────────────────────────────────────────────────────────

def _load_frecency() -> dict:
    try:
        with open(FRECENCY_PATH, "r") as f:
            return json.load(f)
    except Exception:
        return {}

def _save_frecency(data: dict):
    try:
        with open(FRECENCY_PATH, "w") as f:
            json.dump(data, f)
    except Exception:
        pass

def _record_open(path: str):
    """Call this every time a file is opened — builds the frecency model."""
    data = _load_frecency()
    entry = data.get(path, {"count": 0, "last": 0})
    entry["count"] += 1
    entry["last"] = time.time()
    data[path] = entry
    _save_frecency(data)

def _frecency_score(path: str, data: dict) -> float:
    """Higher = more relevant. Combines frequency + recency."""
    entry = data.get(path)
    if not entry:
        return 0.0
    count = entry.get("count", 0)
    last = entry.get("last", 0)
    age_hours = (time.time() - last) / 3600
    # Decay: score halves every 24 hours of non-use
    recency = count / (1 + age_hours / 24)
    return recency

# ── Everything ──────────────────────────────────────────────────────────────

def _ensure_everything_running():
    try:
        result = subprocess.run(["tasklist"], capture_output=True, text=True)
        if "Everything.exe" not in result.stdout:
            subprocess.Popen(
                [EVERYTHING_EXE, "-startup"],
                stdout=subprocess.DEVNULL,
                stderr=subprocess.DEVNULL,
            )
    except Exception:
        pass

def _everything_search(term: str, max_results: int = 50) -> list[str]:
    if not os.path.exists(EVERYTHING_CLI):
        return []
    try:
        result = subprocess.run(
            [EVERYTHING_CLI, "-n", str(max_results), term],
            capture_output=True, text=True, timeout=5,
        )
        return [l.strip() for l in result.stdout.splitlines() if l.strip()]
    except Exception as e:
        print(f"Everything error: {e}")
        return []
# ── Ranking ─────────────────────────────────────────────────────────────────

def _rank(term: str, paths: list[str], limit: int = 10) -> list[str]:
    if not paths:
        return []

    frecency_data = _load_frecency()
    filenames = [os.path.basename(p) for p in paths]

    # RapidFuzz scores — token_set_ratio handles partial/out-of-order words
    fuzzy_scores = {
        paths[i]: fuzz.token_set_ratio(term, filenames[i])
        for i in range(len(paths))
    }

    # Combine fuzzy + frecency into final score
    def score(path):
        fuzzy = fuzzy_scores.get(path, 0)
        frecency = _frecency_score(path, frecency_data) * 10  # weight boost
        return fuzzy + frecency

    ranked = sorted(paths, key=score, reverse=True)
    return ranked[:limit]

# ── Public API ───────────────────────────────────────────────────────────────

def search(term: str, max_results: int = 10) -> list[str]:
    """Called by Electron file search popup — fast, ranked results."""
    _ensure_everything_running()
    if not term.strip():
        return []
    raw = _everything_search(term, max_results=50)
    return _rank(term, raw, limit=max_results)

def open_file(path: str) -> str:
    if not os.path.exists(path):
        return f"File not found: {path}"
    _record_open(path)  # ← builds frecency model over time
    subprocess.Popen(f'explorer "{path}"')
    return f"Opened: {os.path.basename(path)}"

def run(command: str) -> str:
    return "USE_FILE_POPUP"