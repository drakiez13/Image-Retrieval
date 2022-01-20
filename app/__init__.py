from flask import Flask, send_file, jsonify, request
from app.search import get_similar

app = Flask(__name__,
            static_url_path='/',
            static_folder='public')

@app.route('/')
def index():
    return send_file('public/index.html')

@app.route('/api/search', methods=['POST'])
def search():
    if request.is_json:
        return jsonify({
            'images': get_similar(),
        })
    else:
        return jsonify({'message': 'bad request'}), 400