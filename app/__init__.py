from flask import Flask, send_file

app = Flask(__name__,
            static_url_path='/',
            static_folder='public')

@app.route('/')
def index():
    return send_file('public/index.html')

@app.route('/api/search')
def search():
    pass