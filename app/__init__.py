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

@app.route('/api/search/oxbuild', methods=['POST'])
def search_oxbuild():
    if request.is_json:
        result, time = get_similar(request.get_json()['image'][23:], 'oxbuild')

        return jsonify({
            'images': result,
            'time': time
        })
    else:
        return jsonify({'message': 'bad request'}), 400

@app.route('/api/search/paris', methods=['POST'])
def search_paris():
    if request.is_json:
        result, time = get_similar(request.get_json()['image'][23:], 'paris')

        return jsonify({
            'images': result,
            'time': time
        })
    else:
        return jsonify({'message': 'bad request'}), 400