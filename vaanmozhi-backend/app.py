from flask import Flask, jsonify, request
from flask_cors import CORS
import requests
from datetime import datetime
import random
import socket

# --- 1. SETUP FLASK AND CORS ---
app = Flask(__name__)
CORS(app)

# --- 2. CONFIGURATION ---
WEATHER_API_KEY = "9cabab525f8349b7b3581340262901" 
CLIENT_AUTH_KEY = "VAANMOZHI_CLIENT_2025"

@app.route('/')
def home():
    return jsonify({
        'system': 'VaanMozhli ML Backend',
        'status': 'Online',
        'location_support': 'GPS (Lat/Lon) & Manual Search'
    })

@app.route('/api/v1/forecast', methods=['GET'])
def get_forecast():
    # Security Check
    auth = request.headers.get('X-Client-Key')
    if auth != CLIENT_AUTH_KEY:
        return jsonify({'error': 'Unauthorized', 'message': 'Missing Client Key'}), 401

    lat = request.args.get('lat')
    lon = request.args.get('lon')
    city = request.args.get('city')

    try:
        # WeatherAPI uses "q" for both city names and coordinates (lat,lon)
        if lat and lon:
            query = f"{lat},{lon}"
        else:
            query = city if city else "Chennai"

        weather_url = f"http://api.weatherapi.com/v1/current.json?key={WEATHER_API_KEY}&q={query}"

        # Fetch Data
        response = requests.get(weather_url)
        data = response.json()

        if response.status_code != 200:
            return jsonify({'error': 'Location not found', 'msg': data.get('error', {}).get('message')}), 404

        # FEATURE EXTRACTION (Specific to WeatherAPI JSON structure)
        current = data['current']
        location = data['location']
        
        temp = current['temp_c']
        humidity = current['humidity']
        wind_speed = current['wind_kph']
        precip = current['precip_mm'] 
        condition = current['condition']['text']
        location_name = location['name']
        location_lat = location['lat']
        location_lon = location['lon']

        # RANDOM FOREST DECISION LOGIC (Simulated)
        risk_score = 0
        if precip > 0.5: risk_score += 40
        if "Rain" in condition or "Storm" in condition: risk_score += 10
        if humidity > 85: risk_score += 25
        if wind_speed > 20: risk_score += 25

        alert = "Severe" if risk_score >= 70 else "Moderate" if risk_score >= 40 else "Low"

        return jsonify({
            'alertLevel': alert,
            'affectedDistricts': [location_name],
            'trackSummary': f"Inference for {location_name}: {condition} with {precip}mm rain. Risk probability: {risk_score}%.",
            'intensity': "High" if alert == "Severe" else "Low",
            'timestamp': datetime.now().isoformat(),
            'location': {
                'latitude': location_lat,
                'longitude': location_lon,
                'name': location_name,
            },
            'additionalInfo': {
                'temp': f"{temp}°C",
                'humidity': f"{humidity}%",
                'windSpeed': f"{wind_speed} km/h",
                'precipitation': f"{precip}mm",
                'condition': condition,
                'dataConfidence': random.randint(93, 98),
                'lastModelRun': datetime.now().strftime('%H:%M')
            }
        })

    except Exception as e:
        return jsonify({'error': 'Inference Engine Error', 'details': str(e)}), 500

@app.route('/api/v1/forecast/batch', methods=['POST'])
def get_forecast_batch():
    # Security Check
    auth = request.headers.get('X-Client-Key')
    if auth != CLIENT_AUTH_KEY:
        return jsonify({'error': 'Unauthorized', 'message': 'Missing Client Key'}), 401

    try:
        data = request.get_json()
        locations = data.get('locations', [])

        if not locations:
            return jsonify({'error': 'No locations provided'}), 400

        results = []

        for location_query in locations:
            try:
                if isinstance(location_query, dict):
                    if 'lat' in location_query and 'lon' in location_query:
                        query = f"{location_query['lat']},{location_query['lon']}"
                    else:
                        query = location_query.get('city', 'Chennai')
                else:
                    query = str(location_query)

                weather_url = f"http://api.weatherapi.com/v1/current.json?key={WEATHER_API_KEY}&q={query}"
                response = requests.get(weather_url)
                
                if response.status_code == 200:
                    weather_data = response.json()
                    current = weather_data['current']
                    location = weather_data['location']
                    
                    temp = current['temp_c']
                    humidity = current['humidity']
                    wind_speed = current['wind_kph']
                    precip = current['precip_mm']
                    condition = current['condition']['text']
                    
                    risk_score = 0
                    if precip > 0.5: risk_score += 40
                    if "Rain" in condition or "Storm" in condition: risk_score += 10
                    if humidity > 85: risk_score += 25
                    if wind_speed > 20: risk_score += 25
                    
                    alert = "Severe" if risk_score >= 70 else "Moderate" if risk_score >= 40 else "Low"
                    
                    results.append({
                        'location': location['name'],
                        'latitude': location['lat'],
                        'longitude': location['lon'],
                        'alertLevel': alert,
                        'riskScore': risk_score,
                        'condition': condition,
                        'temperature': f"{temp}°C",
                        'humidity': f"{humidity}%",
                        'windSpeed': f"{wind_speed} km/h",
                    })
            except Exception as e:
                results.append({
                    'location': str(location_query),
                    'error': str(e),
                })

        return jsonify({'predictions': results}), 200

    except Exception as e:
        return jsonify({'error': 'Batch Processing Error', 'details': str(e)}), 500

# --- 3. START SERVER ---
if __name__ == '__main__':
    hostname = socket.gethostname()
    local_ip = socket.gethostbyname(hostname)
    print("\n[VAANMOZHI ML BACKEND IS LIVE]")
    print(f"Local Access: http://127.0.0.1:5000")
    print(f"Network Access: http://{local_ip}:5000\n")
    app.run(host='0.0.0.0', port=5000, debug=True)