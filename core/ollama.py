import requests
import json

OLLAMA_URL = "http://localhost:11434/api/generate"
MODEL = "mistral"


def query(prompt: str, system: str = "") -> str:
    payload = {"model": MODEL, "prompt": prompt, "system": system, "stream": False}

    try:
        response = requests.post(OLLAMA_URL, json=payload, timeout=100)
        response.raise_for_status()
        return response.json().get("response", "").strip()
    except requests.exceptions.ConnectionError:
        return "ERROR: Ollama is not running. Start it with: ollama serve"
    except Exception as e:
        return f"ERROR: {str(e)}"


def classify_intent(command: str) -> str:
    system = """You are an intent classifier for a desktop AI agent.
Classify the user's command into exactly one of these categories:
- files
- email  
- settings
- web
- unknown

pick "files" if the user is asking about finding, opening, or managing files on their computer.
pick "email" if the user is asking about reading, writing, or managing their email.
pick "settings" if the user is asking about changing or viewing system settings.
pick "web" if the user is asking about searching the web or interacting with online content.

Respond with ONLY the category name, nothing else."""

    result = query(command, system=system)
    result = result.lower().strip()

    print(result)

    valid = {"files", "email", "settings", "web"}
    return result if result in valid else "unknown"
