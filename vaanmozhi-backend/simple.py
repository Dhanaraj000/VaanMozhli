from flask import Flask, jsonify
from datetime import datetime

app = Flask(__name__)

@app.route('/')
def hello():
    return f"Vaanmozhi Server is running! Time: {datetime.now()}"

if __name__ == '__main__':
    print("Starting simple server on port 5000...")
    try:
        app.run(host='0.0.0.0', port=5000, debug=False)
    except Exception as e:
        print(f"Error: {e}")
        input("Press Enter to close...")
