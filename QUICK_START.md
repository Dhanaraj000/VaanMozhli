# 🚀 Quick Reference Guide

## Instant Setup (5 minutes)

### Windows
```powershell
# Run installation script
.\install.ps1

# Then start backend
cd vaanmozhi-backend
python app.py

# In another terminal, start frontend
cd vaanmozhi
npm start
```

### Linux/Mac
```bash
# Run installation script
./install.sh

# Then start backend
cd vaanmozhi-backend
python app.py

# In another terminal, start frontend
cd vaanmozhi
npm start
```

---

## Key Files at a Glance

| File | Purpose | Status |
|------|---------|--------|
| `vaanmozhi/components/map-section.tsx` | Map UI component | ✅ New |
| `vaanmozhi/hooks/useLocation.ts` | Location management | ✅ New |
| `vaanmozhi/hooks/useTyphoonData.ts` | Weather data | ✅ Modified |
| `vaanmozhi/app/(tabs)/index.tsx` | Landing page | ✅ Modified |
| `vaanmozhi/package.json` | Frontend deps | ✅ Modified |
| `vaanmozhi-backend/app.py` | Backend API | ✅ Modified |

---

## Most Important Documentation

1. **Start Here**: [SETUP_GUIDE.md](SETUP_GUIDE.md)
2. **Having Issues?**: [TESTING_GUIDE.md](TESTING_GUIDE.md)
3. **What Changed?**: [CODE_CHANGES_REFERENCE.md](CODE_CHANGES_REFERENCE.md)
4. **Full Details**: [IMPLEMENTATION_SUMMARY.md](IMPLEMENTATION_SUMMARY.md)

---

## API Quick Reference

### Test Backend
```bash
curl -H "X-Client-Key: VAANMOZHI_CLIENT_2025" \
  http://127.0.0.1:5000/api/v1/forecast?city=Chennai
```

### Location Query
```bash
# By city
http://127.0.0.1:5000/api/v1/forecast?city=Chennai

# By coordinates
http://127.0.0.1:5000/api/v1/forecast?lat=13.0827&lon=80.2707
```

### Batch Query
```bash
curl -X POST \
  -H "X-Client-Key: VAANMOZHI_CLIENT_2025" \
  -H "Content-Type: application/json" \
  -d '{"locations": [{"city": "Chennai"}, "Bangalore"]}' \
  http://127.0.0.1:5000/api/v1/forecast/batch
```

---

## Common Commands

### Frontend
```bash
cd vaanmozhi
npm start              # Start dev server
npm install            # Install dependencies
npm run lint           # Check code
npm run reset-project  # Reset to template
```

### Backend
```bash
cd vaanmozhi-backend
python app.py          # Run server
pip install -r requirements.txt  # Install deps
python -m flask shell  # Debug shell
```

---

## Features Checklist

- [x] Map component with interactive display
- [x] GPS location detection
- [x] Manual location entry (city names)
- [x] Coordinate input support
- [x] Real-time weather data
- [x] Weather alerts on map
- [x] Location-based API
- [x] Batch processing API
- [x] Error handling
- [x] Complete documentation

---

## Troubleshooting Quick Fixes

### Dependencies Not Installing
```bash
npm cache clean --force
rm -rf node_modules package-lock.json
npm install
```

### Port Already in Use (5000)
```bash
# Windows
netstat -ano | findstr :5000
taskkill /PID {PID} /F

# Mac/Linux
lsof -i :5000
kill -9 {PID}
```

### Location Not Working
1. Check app permissions on device
2. Enable GPS
3. Try manual location entry
4. Check firewall

### Map Not Showing
1. Verify location is set
2. Check coordinates are valid
3. Ensure MapView has height
4. Clear app cache

---

## Alert Levels Guide

| Level | Color | Risk Score | Action |
|-------|-------|-----------|--------|
| Low | 🟢 Green | < 40% | Normal |
| Moderate | 🟡 Yellow | 40-69% | Watch |
| High | 🟠 Orange | 70-79% | Warning |
| Severe | 🔴 Red | 80%+ | Emergency |

---

## File Structure

```
VaanMozhli/
├── vaanmozhi/                    # Frontend
│   ├── components/
│   │   └── map-section.tsx       # ✨ NEW MAP
│   ├── hooks/
│   │   ├── useLocation.ts        # ✨ NEW LOCATION
│   │   └── useTyphoonData.ts
│   ├── app/(tabs)/
│   │   └── index.tsx             # Home with map
│   └── package.json
├── vaanmozhi-backend/            # Backend
│   └── app.py                    # Enhanced API
├── Documentation/
│   ├── SETUP_GUIDE.md
│   ├── TESTING_GUIDE.md
│   ├── IMPLEMENTATION_SUMMARY.md
│   └── CODE_CHANGES_REFERENCE.md
└── Scripts/
    ├── install.sh
    └── install.ps1
```

---

## Performance Targets

| Metric | Target |
|--------|--------|
| Location Fetch | < 3s |
| Map Load | < 2s |
| API Response | < 500ms |
| Total Flow | < 5s |
| Auto Refresh | 30s |

---

## Important URLs

- **Frontend**: http://localhost:19000 (Expo)
- **Backend**: http://localhost:5000
- **API**: http://localhost:5000/api/v1/forecast

---

## Next Steps

1. **Install**: Run `./install.sh` or `.\install.ps1`
2. **Start Backend**: `cd vaanmozhi-backend && python app.py`
3. **Start Frontend**: `cd vaanmozhi && npm start`
4. **Test**: See [TESTING_GUIDE.md](TESTING_GUIDE.md)
5. **Deploy**: Configure and deploy to production

---

## Getting Help

### For Setup Issues
→ Read [SETUP_GUIDE.md](SETUP_GUIDE.md)

### For Testing/Debugging
→ Read [TESTING_GUIDE.md](TESTING_GUIDE.md)

### For Code Questions
→ Read [CODE_CHANGES_REFERENCE.md](CODE_CHANGES_REFERENCE.md)

### For Implementation Details
→ Read [IMPLEMENTATION_SUMMARY.md](IMPLEMENTATION_SUMMARY.md)

---

## ⚡ Quick Test

**Terminal 1:**
```bash
cd vaanmozhi-backend
python app.py
```

**Terminal 2:**
```bash
cd vaanmozhi
npm start
# Select platform (w for web)
```

**Terminal 3:**
```bash
curl -H "X-Client-Key: VAANMOZHI_CLIENT_2025" \
  "http://127.0.0.1:5000/api/v1/forecast?city=Chennai"
```

---

## Version Info

- **React Native**: 0.81.4
- **Expo**: ~54.0.12
- **Python**: 3.8+
- **Flask**: 3.1.2
- **Node**: 16+

---

## 🎯 Success Checklist

- [ ] Dependencies installed
- [ ] Backend running on :5000
- [ ] Frontend running on :19000
- [ ] Location permission requested
- [ ] Manual location entry works
- [ ] Map displays
- [ ] Weather alerts show
- [ ] API responds in < 500ms

---

**All set! Start with SETUP_GUIDE.md** 🚀
