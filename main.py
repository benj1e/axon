from flask import Flask, request, jsonify
from flask_cors import CORS
from core.router import route
from skills import files
import os

app = Flask(__name__)
CORS(app)


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
from skills import files, settings as settings_skill


@app.route("/files/search", methods=["GET"])
def file_search():
    term = request.args.get("q", "").strip()
    if not term:
        return jsonify({"results": []})
    results = files.search(term)
    formatted = [
        {
            "name": os.path.basename(p),
            "path": p,
            "is_dir": os.path.isdir(p)
        } 
        for p in results
    ]
    return jsonify({"results": formatted})


@app.route("/settings/search", methods=["GET"])
def settings_search():
    term = request.args.get("q", "").strip()
    if not term:
        return jsonify({"results": []})
    results = settings_skill.search(term)
    return jsonify({"results": results})


@app.route("/files/open", methods=["POST"])
def file_open():
    data = request.get_json()
    path = data.get("path", "")
    result = files.open_file(path)
    return jsonify({"result": result})


@app.route("/open/url", methods=["POST"])
def open_url():
    data = request.get_json()
    url = data.get("url", "")
    if url:
        import webbrowser
        # open_new_tab reuses existing browser window if one is open
        webbrowser.open_new_tab(url)
    return jsonify({"ok": True})


if __name__ == "__main__":
    print("Axon running on http://localhost:5000")
    app.run(port=5000, debug=True)
