import subprocess
from rapidfuzz import process, fuzz

SETTINGS_MAP = {
    # Display
    "display": "ms-settings:display",
    "monitor": "ms-settings:display",
    "resolution": "ms-settings:display",
    "brightness": "ms-settings:display",
    "night light": "ms-settings:nightlight",
    "screen": "ms-settings:display",
    # Sound
    "sound": "ms-settings:sound",
    "volume": "ms-settings:sound",
    "audio": "ms-settings:sound",
    "microphone": "ms-settings:privacy-microphone",
    "speakers": "ms-settings:sound",
    # Network
    "wifi": "ms-settings:network-wifi",
    "network": "ms-settings:network",
    "internet": "ms-settings:network",
    "vpn": "ms-settings:network-vpn",
    "airplane mode": "ms-settings:network-airplanemode",
    "proxy": "ms-settings:network-proxy",
    "ethernet": "ms-settings:network-ethernet",
    "hotspot": "ms-settings:network-mobilehotspot",
    # Bluetooth & Devices
    "bluetooth": "ms-settings:bluetooth",
    "devices": "ms-settings:connecteddevices",
    "printers": "ms-settings:printers",
    "mouse": "ms-settings:mousetouchpad",
    "touchpad": "ms-settings:devices-touchpad",
    "keyboard": "ms-settings:typing",
    "typing": "ms-settings:typing",
    "pen": "ms-settings:pen",
    "camera": "ms-settings:privacy-webcam",
    # Personalization
    "personalization": "ms-settings:personalization",
    "background": "ms-settings:personalization-background",
    "wallpaper": "ms-settings:personalization-background",
    "colors": "ms-settings:personalization-colors",
    "dark mode": "ms-settings:personalization-colors",
    "light mode": "ms-settings:personalization-colors",
    "themes": "ms-settings:themes",
    "lockscreen": "ms-settings:lockscreen",
    "lock screen": "ms-settings:lockscreen",
    "taskbar": "ms-settings:taskbar",
    "start menu": "ms-settings:personalization-start",
    "fonts": "ms-settings:fonts",
    # Apps
    "apps": "ms-settings:appsfeatures",
    "uninstall": "ms-settings:appsfeatures",
    "default apps": "ms-settings:defaultapps",
    "startup apps": "ms-settings:startupapps",
    "optional features": "ms-settings:optionalfeatures",
    # Accounts
    "accounts": "ms-settings:yourinfo",
    "email accounts": "ms-settings:emailandaccounts",
    "sign in": "ms-settings:signinoptions",
    "password": "ms-settings:signinoptions",
    "face recognition": "ms-settings:signinoptions-launchfaceenrollment",
    "fingerprint": "ms-settings:signinoptions-launchfingerprintenrollment",
    "family": "ms-settings:family-group",
    "sync": "ms-settings:sync",
    # System
    "notifications": "ms-settings:notifications",
    "focus assist": "ms-settings:quiethours",
    "do not disturb": "ms-settings:quiethours",
    "power": "ms-settings:powersleep",
    "sleep": "ms-settings:powersleep",
    "battery": "ms-settings:batterysaver",
    "storage": "ms-settings:storagesense",
    "disk": "ms-settings:storagesense",
    "multitasking": "ms-settings:multitasking",
    "clipboard": "ms-settings:clipboard",
    "remote desktop": "ms-settings:remotedesktop",
    "about": "ms-settings:about",
    "rename pc": "ms-settings:about",
    # Time & Language
    "time": "ms-settings:dateandtime",
    "date": "ms-settings:dateandtime",
    "timezone": "ms-settings:dateandtime",
    "language": "ms-settings:regionlanguage",
    "region": "ms-settings:regionlanguage",
    "speech": "ms-settings:speech",
    # Gaming
    "game mode": "ms-settings:gaming-gamemode",
    "xbox": "ms-settings:gaming-xboxnetworking",
    "game bar": "ms-settings:gaming-gamebar",
    "captures": "ms-settings:gaming-gamedvr",
    # Privacy
    "privacy": "ms-settings:privacy",
    "location": "ms-settings:privacy-location",
    "diagnostics": "ms-settings:privacy-feedback",
    "activity history": "ms-settings:privacy-activityhistory",
    "permissions": "ms-settings:privacy",
    # Update & Security
    "update": "ms-settings:windowsupdate",
    "windows update": "ms-settings:windowsupdate",
    "security": "ms-settings:windowsdefender",
    "windows security": "ms-settings:windowsdefender",
    "firewall": "ms-settings:windowsdefender",
    "recovery": "ms-settings:recovery",
    "backup": "ms-settings:backup",
    "activation": "ms-settings:activation",
    "developer": "ms-settings:developers",
}


def search(term: str, max_results: int = 5) -> list[dict]:
    """Return ranked settings matches for live UI search."""
    if not term.strip():
        return []
    keys = list(SETTINGS_MAP.keys())
    matches = process.extract(
        term.lower(), keys, scorer=fuzz.token_set_ratio, limit=max_results
    )
    return [
        {"name": key.title(), "uri": SETTINGS_MAP[key], "score": score}
        for key, score, _ in matches
        if score > 40
    ]


def run(command: str) -> str:
    query = command.replace("settings ", "").strip().lower()

    if not query:
        subprocess.Popen(["start", "ms-settings:"], shell=True)
        return "Opened Settings"

    # Exact match first
    if query in SETTINGS_MAP:
        subprocess.Popen(["start", SETTINGS_MAP[query]], shell=True)
        return f"Opened {query.title()} settings"

    # Contains match
    for key, uri in SETTINGS_MAP.items():
        if query in key or key in query:
            subprocess.Popen(["start", uri], shell=True)
            return f"Opened {key.title()} settings"

    # Fuzzy fallback
    results = search(query, max_results=1)
    if results:
        best = results[0]
        subprocess.Popen(["start", best["uri"]], shell=True)
        return f"Opened {best['name']} settings"

    # Last resort
    subprocess.Popen(["start", "ms-settings:"], shell=True)
    return f"Opened Settings (no match for '{query}')"
