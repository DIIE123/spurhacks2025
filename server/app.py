from flask import Flask, request, send_file, jsonify
from io import BytesIO
import os

from helpers.convert import convert_midi_to_xml

from flask_cors import CORS

app = Flask(__name__)
CORS(app)

@app.route("/")
def home():
    return "MIDI to SHEET MUSIC"

@app.route("/sheet-music", methods=["POST"])
def sheet_music():
    
    file = request.files.get('file')
    if not file or file.filename == "":
        return jsonify({'error': 'No MIDI file found'}), 400
    try:
        os.makedirs("outputs", exist_ok=True)
        midi_path = os.path.join("outputs", file.filename)
        file.save(midi_path)

        xml_path = convert_midi_to_xml(midi_path)

        return send_file(xml_path, mimetype="application/xml", as_attachment=True)

    except Exception as e:
        print("EXCEPTION OCCURRED:", str(e), flush=True)
        return jsonify({'error': str(e)}), 500

if __name__ == '__main__':
    app.run(debug=True)