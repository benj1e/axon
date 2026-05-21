from core.ollama import classify_intent
from skills import files, email, settings, web

SKILL_MAP = {
    "files": files.run,
    # "email": email.run,
    # "settings": settings.run,
    # "web": web.run,
}

def route(command: str) -> dict:
    intent = classify_intent(command)
    
    skill_fn = SKILL_MAP.get(intent)
    
    if not skill_fn:
        return {
            "intent": "unknown",
            "result": "I'm not sure how to do that yet. Try asking about files, email, settings, or web search."
        }
    
    result = skill_fn(command)
    return {
        "intent": intent,
        "result": result
    }