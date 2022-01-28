from unittest import result
from flask import Flask, send_file, jsonify, request
from app.search import get_similar
from app import extract_vector

extract_vector.init()

app = Flask(__name__,
            static_url_path='/',
            static_folder='public')

@app.route('/')
def index():
    return send_file('public/index.html')

@app.route('/api/search', methods=['POST'])
def search():
    if request.is_json:
        result, time = get_similar(request.get_json()['image'][23:])

        return jsonify({
            'images': result,
            'time': time
        })
    else:
        return jsonify({'message': 'bad request'}), 400