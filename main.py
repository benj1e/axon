from flask import Flask, request, jsonify
from core.router import route
import threading
import keyboard

app = Flask(__name__)

@app.route("/command", methods=["POST"])
def handle_command():
    data = request.get_json()
    command = data.get("command", "").strip()
    
    if not command:
        return jsonify({"error": "No command provided"}), 400
    
    response = route(command)
    return jsonify(response)

@app.route("/health", methods=["GET"])
def health():
    return jsonify({"status": "ok"})

if __name__ == "__main__":
    print("Axon running on http://localhost:5000")
    app.run(port=5000, debug=False)