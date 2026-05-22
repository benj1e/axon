from core.ollama import classify_intent, chat
from skills import files, email, settings, web

SKILL_MAP = {
    "files": files.run,
    # "email": email.run,
    "settings": settings.run,
    # "web": web.run,
}


def route(command: str) -> dict:
    # Strip mode prefixes from CommandCenter
    for prefix in ["web ", "email ", "settings ", "ask "]:
        if command.lower().startswith(prefix):
            intent = prefix.strip()
            skill_fn = SKILL_MAP.get(intent)
            if skill_fn:
                return {"intent": intent, "result": skill_fn(command[len(prefix):])}

    intent = classify_intent(command)
    skill_fn = SKILL_MAP.get(intent)

    if skill_fn:
        return {"intent": intent, "result": skill_fn(command)}

    # Fallback — just answer it
    return {"intent": "ask", "result": chat(command)}