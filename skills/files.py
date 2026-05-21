import os
import subprocess
from core.ollama import query

SEARCH_ROOTS = [
    os.path.expanduser("~\\Desktop"),
    os.path.expanduser("~\\Documents"),
    os.path.expanduser("~\\Downloads"),
]

def _find_files(search_term: str, max_results: int = 5) -> list[str]:
    matches = []
    term = search_term.lower()

    for root in SEARCH_ROOTS:
        if not os.path.exists(root):
            continue
        for dirpath, _, filenames in os.walk(root):
            for filename in filenames:
                if term in filename.lower():
                    matches.append(os.path.join(dirpath, filename))
                    if len(matches) >= max_results:
                        return matches
    return matches

def _extract_search_term(command: str) -> str:
    result = query(
        command,
        system="Extract only the filename or file topic the user is searching for. Respond with 2-3 words max, no punctuation, no explanation."
    )
    return result.strip()

def run(command: str) -> str:
    search_term = _extract_search_term(command)
    matches = _find_files(search_term)

    if not matches:
        return f"No files found matching '{search_term}' in Desktop, Documents, or Downloads."

    if len(matches) == 1:
        subprocess.Popen(f'explorer "{matches[0]}"')
        return f"Opening: {os.path.basename(matches[0])}"

    result = f"Found {len(matches)} files matching '{search_term}':\n"
    for i, path in enumerate(matches, 1):
        result += f"{i}. {os.path.basename(path)} — {os.path.dirname(path)}\n"
    result += "\nSay 'open #1' or 'open [filename]' to open one."
    return result