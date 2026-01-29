🌀 Vaanmozhi - Tamil Nadu Weather Alert System
Table of Contents
Project Documentation & README
Table of Contents
Project Overview
Technical Architecture
Installation Guide
1. Navigate to frontend directory
2. Install dependencies
or alternatively: yarn install
3. Start development server
4. For web development
5. For mobile testing with tunnel
1. Navigate to backend directory
2. Create Python virtual environment
3. Activate virtual environment
Windows:
macOS/Linux:
4. Install Python dependencies
5. Start Flask development server
API Documentation
Deployment Instructions
In vaanmozhi directory
Generate requirements file
Create Procfile (no extension)
Build Android APK
Build iOS (requires macOS + Apple Developer account)
Usage Examples
Expected output:
🌀
 VAANMOZHI BACKEND SERVER STARTING...
* Running on http://127.0.0.1:5000
Press 'w' for web browser
Scan QR code for mobile testing
Expected: {"status": "healthy", ...}
Expected: Weather forecast JSON data
Backend (Railway)
Frontend (Netlify)
Project Structure
Security and Performance
Troubleshooting Guide
Contributing and Development
1. Fork the repository
2. Create feature branch
3. Make changes and commit
4. Push to your fork
5. Create pull request on GitHub
Contact and Support
License
Project Documentation & README
A comprehensive full-stack mobile application for real-time weather monitoring and cyclone tracking specifically designed
for Tamil Nadu, India.
Table of Contents
1. Project Overview
2. Technical Architecture
3. Installation Guide
4. API Documentation
5. Deployment Instructions
6. Usage Examples
Project Overview
Vaanmozhi (வா ன்மொ ழி) meaning "Language of the Sky" is a professional emergency management application that provides real￾time weather alerts and cyclone tracking for Tamil Nadu state.
Key Features
✅ Real-time Weather Alerts with 4-tier severity system
✅ District-wise Coverage for all 38 Tamil Nadu districts
✅ Cross-platform Support (iOS, Android, Web)
✅ Live Backend Integration with Python Flask API
✅ Professional Emergency UI with Tamil-English bilingual support
✅ Automatic Data Updates every 30 seconds
Alert System Classification
🟢
LOW: Normal weather conditions
🟡
MODERATE: Watch conditions with light disturbances
🟠
HIGH: Warning issued, coastal areas on alert
🔴
SEVERE: Emergency evacuation recommended
Technical Architecture
Frontend Technology Stack
Framework: React Native with Expo SDK 49+
Language: TypeScript for type safety
Platforms: iOS, Android, Web (cross-platform)
State Management: Custom React hooks
Styling: React Native StyleSheet API
Backend Technology Stack
Framework: Python Flask 2.3+
API Design: RESTful services with JSON responses
Authentication: Custom client key validation
CORS: Cross-origin resource sharing enabled
Data: Time-based weather scenario simulation
Development Environment
IDE: Visual Studio Code with integrated terminals
Version Control: Git with GitHub integration
Package Management: npm/yarn (frontend), pip (backend)
Testing: Expo Go for mobile testing, browser for web
Installation Guide
Prerequisites
System Requirements:
Node.js 18.0 or higher
Python 3.8 or higher
Git for version control
Modern web browser or mobile device
Development Tools:
VS Code (recommended)
Expo CLI: npm install -g @expo/cli
Python virtual environment support
Frontend Installation
# 1. Navigate to frontend directory<a></a>
cd vaanmozhi
# 2. Install dependencies<a></a>
npm install
# or alternatively: yarn install<a></a>
# 3. Start development server<a></a>
npx expo start
# 4. For web development<a></a>
npx expo start --web
# 5. For mobile testing with tunnel<a></a>
npx expo start --tunnel
Backend Installation
# 1. Navigate to backend directory<a></a>
cd vaanmozhi-backend
# 2. Create Python virtual environment<a></a>
python -m venv venv
# 3. Activate virtual environment<a></a>
# Windows:<a></a>
venv\Scripts\activate
# macOS/Linux:<a></a>
source venv/bin/activate
# 4. Install Python dependencies<a></a>
pip install -r requirements.txt
# 5. Start Flask development server<a></a>
python app.py
Base URL: http://localhost:5000/api/v1
Authentication: Required for all endpoints
Content Type: application/json
X-Client-Key: VAANMOZHI_CLIENT_2025
Content-Type: application/json
Returns current weather forecast data for Tamil Nadu.
Request Example:
GET /api/v1/forecast
Headers:
X-Client-Key: VAANMOZHI_CLIENT_2025
Content-Type: application/json
Response Format:
{
"alertLevel": "Severe",
"affectedDistricts": [
"Chennai", "Cuddalore", "Villupuram",
"Kanchipuram", "Tiruvallur"
],
"trackSummary": "🌪️ SEVERE WEATHER WARNING! Cyclonic storm approaching Tamil Nadu coast. Immediate evacuat
"nextUpdate": "2025-10-10T01:35:00.000Z",
"timestamp": "2025-10-10T01:30:00.000Z",
"source": "Vaanmozhi Weather Network",
"intensity": "Very High"
}
Development Workflow
1. Start Backend Server: Run Flask server on port 5000
2. Start Frontend App: Launch Expo development server
3. Web Access: Press 'w' in terminal or go to localhost:8081
4. Mobile Access: Scan QR code with Expo Go app
5. Live Development: Both servers support hot reloading
API Documentation
Base Configuration
Authentication Headers
Core Endpoints
GET /forecast
Returns complete list of monitored Tamil Nadu districts.
Response Example:
{
"districts": [
"Chennai", "Coimbatore", "Madurai", "Tiruchirappalli",
"Salem", "Tirunelveli", "Cuddalore", "Vellore", ...
],
"total_count": 38,
"state": "Tamil Nadu",
"country": "India"
}
Server health check endpoint for system monitoring.
Response Example:
{
"status": "healthy",
"server": "Vaanmozhi Weather Backend",
"timestamp": "2025-10-10T01:30:00.000Z",
"uptime": "operational"
}
Step 1: Build Production Version
# In vaanmozhi directory<a></a>
npx expo export:web
Step 2: Deploy to Netlify
Step 1: Prepare Backend for Production
# Generate requirements file<a></a>
pip freeze &gt; requirements.txt
# Create Procfile (no extension)<a></a>
echo "web: python app.py" &gt; Procfile
Step 2: Deploy to Railway
GET /districts
GET /health
Deployment Instructions
Frontend Deployment (Netlify)
1. Visit netlify.com
2. Create account or sign in
3. Drag and drop the web-build folder
4. Your app gets a URL like: https://vaanmozhi-weather.netlify.app
Backend Deployment (Railway)
1. Visit railway.app
2. Sign up with GitHub account
3. Click "New Project" → "Deploy from GitHub repo"
4. Connect your repository
5. Automatic deployment begins
6. Get URL like: https://vaanmozhi-backend.up.railway.app
Update API Configuration
After backend deployment, update frontend:
In hooks/useTyphoonData.ts, change:
// Replace localhost with your Railway URL
const API_URL = 'https://your-backend-url.up.railway.app/api/v1/forecast';
Rebuild and redeploy frontend with new API URL.
Mobile Distribution Options
Option 1: Expo Go (Instant Access)
Users download Expo Go app from app stores
Share your hosted web URL or QR code
Works immediately without app store submission
Option 2: Native App Building
# Build Android APK<a></a>
npx expo build:android
# Build iOS (requires macOS + Apple Developer account)<a></a>
npx expo build:ios
Option 3: App Store Distribution
Use Expo Application Services (EAS)
Submit to Google Play Store and Apple App Store
Users download like standard mobile apps
Usage Examples
Local Development Testing
Start Backend Server:
cd vaanmozhi-backend
venv\Scripts\activate
python app.py
# Expected output:<a></a>
# 🌀 VAANMOZHI BACKEND SERVER STARTING...<a></a>
# * Running on http://127.0.0.1:5000<a></a>
Start Frontend App:
cd vaanmozhi
npx expo start
# Press 'w' for web browser<a></a>
# Scan QR code for mobile testing<a></a>
Test Health Endpoint:
curl http://localhost:5000/health
# Expected: {"status": "healthy", ...}<a></a>
Test Forecast Endpoint:
curl -H "X-Client-Key: VAANMOZHI_CLIENT_2025" \
http://localhost:5000/api/v1/forecast
# Expected: Weather forecast JSON data<a></a>
Environment Variables for Production:
# Backend (Railway)<a></a>
PORT=5000
FLASK_ENV=production
# Frontend (Netlify)<a></a>
API_BASE_URL=https://your-backend-url.up.railway.app/api/v1
VaanMozhli/
├── 📁 vaanmozhi/ # React Native Frontend
│ ├── 📁 app/
│ │ └── 📁 (tabs)/
│ │ ├── 📄 index.tsx # Main weather dashboard
│ │ └── 📄 explore.tsx # Maps and features
│ ├── 📁 hooks/
│ │ └── 📄 useTyphoonData.ts # API integration hook
│ ├── 📁 constants/
│ ├── 📄 package.json # Frontend dependencies
│ └── 📄 app.json # Expo configuration
├── 📁 vaanmozhi-backend/ # Python Flask Backend
│ ├── 📄 app.py # Main Flask server
│ ├── 📄 requirements.txt # Python dependencies
│ └── 📄 simple.py # Testing server
└── 📄 README.md # Project documentation
API Authentication: Client key validation for all requests
CORS Protection: Controlled cross-origin resource sharing
Input Validation: Sanitization of all user inputs
Error Handling: No sensitive information exposure in errors
API Testing Examples
Production Environment Setup
Project Structure
Security and Performance
Security Features
Performance Optimization
Frontend Performance:
Efficient React hook dependencies
Proper cleanup of intervals and event listeners
Loading states with user feedback
Error boundaries for graceful error handling
Backend Performance:
Lightweight Flask server architecture
Efficient time-based data simulation
Optimized JSON response formatting
Proper HTTP status code implementation
Troubleshooting Guide
Common Issues and Solutions
Issue 1: "Cannot connect to backend"
✅ Verify backend server is running on port 5000
✅ Check firewall settings and port accessibility
✅ Ensure correct API URL in frontend configuration
Issue 2: "CORS error in browser"
✅ Verify Flask-CORS is installed and configured
✅ Check CORS headers in backend responses
✅ Ensure proper request headers from frontend
Issue 3: "Expo app won't load"
✅ Check network connectivity
✅ Ensure devices are on same WiFi network
✅ Try clearing Expo cache: npx expo start --clear
Issue 4: "Authentication errors"
✅ Verify client key: VAANMOZHI_CLIENT_2025
✅ Check request headers format
✅ Ensure proper header case sensitivity
Contributing and Development
Code Style Guidelines
TypeScript/JavaScript:
Use ES6+ features and arrow functions
Implement proper TypeScript interfaces
Follow React hooks best practices
Use meaningful variable and function names
Python:
Follow PEP 8 style guidelines
Use descriptive function and variable names
Implement proper error handling
Add docstrings for functions and classes
Git Workflow
# 1. Fork the repository<a></a>
git fork https://github.com/Dhanaraj000/VaanMozhli.git
# 2. Create feature branch<a></a>
git checkout -b feature/new-feature
# 3. Make changes and commit<a></a>
git add .
git commit -m "Add new feature: description"
# 4. Push to your fork<a></a>
git push origin feature/new-feature
# 5. Create pull request on GitHub<a></a>
Contact and Support
Developer: Dhanaraj
GitHub: @Dhanaraj000
Repository: https://github.com/Dhanaraj000/VaanMozhli
Issues: Submit bug reports via GitHub Issues
Features: Request enhancements via GitHub Discussions
License
This project is licensed under the MIT License.
Permission is granted for:
Commercial and private use
Modification and distribution
Patent use
Conditions:
Include original license and copyright notice
No warranty or liability guarantees
Built with ❤️ for Tamil Nadu Emergency Management and Public Safety
Vaanmozhi (வா ன்மொ ழி) - "Language of the Sky"
Bringing real-time weather information to the people of Tamil Nadu
