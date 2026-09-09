from flask import Flask, jsonify, request
from flask_cors import CORS
import requests

app = Flask(__name__)
CORS(app)

# Your API key
API_KEY = "147324f7bdc24fd52d9ddc0ff5092997"

def calculate_thermal_stress(temp, humidity):
    if temp >= 40 or (temp >= 35 and humidity > 60):
        return {"level": "EXTREME HAZARD", "advice": "Extreme risk of heat stroke. Stay indoors with cooling."}
    elif temp >= 35 or (temp >= 30 and humidity > 70):
        return {"level": "HIGH RISK", "advice": "Avoid prolonged outdoor exposure during peak hours."}
    elif temp >= 30:
        return {"level": "MODERATE", "advice": "Take frequent breaks in the shade and stay hydrated."}
    else:
        return {"level": "LOW RISK", "advice": "Normal heat conditions. Enjoy your day safely."}
from flask import Flask, jsonify, request
from flask_cors import CORS
import requests

app = Flask(__name__)
CORS(app)

# Your API key
API_KEY = "147324f7bdc24fd52d9ddc0ff5092997"

def calculate_thermal_stress(temp, humidity):
    if temp >= 40 or (temp >= 35 and humidity > 60):
        return {"level": "EXTREME HAZARD", "advice": "Extreme risk of heat stroke."}
    elif temp >= 35 or (temp >= 30 and humidity > 70):
        return {"level": "HIGH RISK", "advice": "Avoid prolonged outdoor activity."}
    elif temp >= 30:
        return {"level": "MODERATE", "advice": "Take frequent breaks in shade."}
    else:
        return {"level": "LOW RISK", "advice": "Normal heat conditions."}


@app.route('/api/weather', methods=['GET'])
def get_weather():
    city = request.args.get('city', 'London')
    url = f"http://api.openweathermap.org/data/2.5/weather?q={city}&appid={API_KEY}&units=metric"
    
    try:
        response = requests.get(url)
        data = response.json()
        
        if response.status_code != 200:
            return jsonify({"error": data.get("message", "Failed to fetch weather data")}), response.status_code
        
        temp = data['main']['temp']
        humidity = data['main']['humidity']
        weather_description = data['weather'][0]['description']
        
        stress_info = calculate_thermal_stress(temp, humidity)
        
        return jsonify({
            "city": data['name'],
            "country": data['sys']['country'],
            "temperature": temp,
            "humidity": humidity,
            "condition": weather_description,
            "alert": stress_info
        })
        
    except Exception as e:
        return jsonify({"error": str(e)}), 500

if __name__ == '__main__':
    app.run(debug=True)









