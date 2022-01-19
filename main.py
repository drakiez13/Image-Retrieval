from flask import Flask, send_file

app = Flask(__name__,
            static_url_path='',
            static_folder='public')

@app.route('/')
def index():
    return send_file('public/index.html')

app.run('0.0.0.0', 8080)