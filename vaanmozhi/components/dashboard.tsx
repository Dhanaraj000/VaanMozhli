import React, { useState, useEffect } from 'react';
// We use simple HTML elements for Web Dashboard
// If this file gives errors about View/Text, tell me immediately!

import { AlertTriangle, Map as MapIcon, Activity, Droplets, MapPin, Search } from 'lucide-react';

const VaanMozhliUI = () => {
  const [prediction, setPrediction] = useState({ 
    risk: "Analyzing...", 
    chance: "0%", 
    area: "Waiting for Location..." 
  });
  const [loading, setLoading] = useState(false);
  const [searchInput, setSearchInput] = useState("");

  // --- FETCH LOGIC ---
  const fetchPrediction = async (lat?: number, lon?: number, city?: string) => {
    setLoading(true);
    try {
      // NOTE: If running on phone, use your Laptop IP (e.g., http://192.168.1.5:5000)
      // If running on Laptop Browser, localhost is fine.
      let url = 'http://127.0.0.1:5000/api/v1/forecast';
      
      const params = new URLSearchParams();
      if (lat && lon) {
        params.append('lat', lat.toString());
        params.append('lon', lon.toString());
      } else if (city) {
        params.append('city', city);
      }
      if (params.toString()) url += `?${params.toString()}`;

      const response = await fetch(url, {
        headers: { 'X-Client-Key': 'VAANMOZHI_CLIENT_2025' }
      });
      const data = await response.json();
      
      setPrediction({
        risk: data.alertLevel || "Unknown",
        chance: data.additionalInfo ? `${data.additionalInfo.dataConfidence}%` : "0%",
        area: data.affectedDistricts ? data.affectedDistricts[0] : city || "Unknown Area"
      });
    } catch (err) {
      console.error("Backend Error:", err);
      alert("Cannot connect to Backend. Is python app.py running?");
    } finally {
      setLoading(false);
    }
  };

  // --- LOCATION LOGIC ---
  const handleLiveLocation = () => {
    if (!navigator.geolocation) {
      alert("Geolocation is not supported by your browser");
      return;
    }
    
    // Request Location immediately
    navigator.geolocation.getCurrentPosition(
      (position) => {
        fetchPrediction(position.coords.latitude, position.coords.longitude);
      },
      (error) => {
        console.error("Location blocked:", error);
        alert("Location access denied. Please allow location in browser settings.");
      }
    );
  };

  // Auto-run on start
  useEffect(() => {
    // Try to get location automatically, if fails, load Chennai
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
            (pos) => fetchPrediction(pos.coords.latitude, pos.coords.longitude),
            () => fetchPrediction(undefined, undefined, "Chennai")
        );
    } else {
        fetchPrediction(undefined, undefined, "Chennai");
    }
  }, []);

  return (
    <div style={{ display: 'flex', height: '100vh', backgroundColor: '#0f172a', color: 'white', fontFamily: 'sans-serif' }}>
      
      {/* SIDEBAR */}
      <div style={{ width: '320px', backgroundColor: '#1e293b', padding: '24px', display: 'flex', flexDirection: 'column', borderRight: '1px solid #334155' }}>
        
        {/* HEADER */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '40px' }}>
          <div style={{ backgroundColor: '#2563eb', padding: '8px', borderRadius: '8px' }}>
            <Droplets size={24} color="white" />
          </div>
          <h1 style={{ fontSize: '20px', fontWeight: 'bold', margin: 0 }}>VaanMozhli</h1>
        </div>

        {/* SEARCH & GPS */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            <div style={{ position: 'relative' }}>
                <input 
                    type="text" 
                    placeholder="Search District..." 
                    value={searchInput}
                    onChange={(e) => setSearchInput(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && fetchPrediction(undefined, undefined, searchInput)}
                    style={{ width: '100%', padding: '12px 12px 12px 40px', backgroundColor: '#0f172a', border: '1px solid #334155', borderRadius: '12px', color: 'white' }}
                />
                <div style={{ position: 'absolute', left: '12px', top: '12px' }}><Search size={16} color="#64748b"/></div>
            </div>

            <button 
                onClick={handleLiveLocation}
                style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', padding: '12px', backgroundColor: '#334155', border: 'none', borderRadius: '12px', color: 'white', cursor: 'pointer', fontWeight: 'bold' }}
            >
                <MapPin size={16} /> {loading ? "Locating..." : "Use Live Location"}
            </button>
        </div>

        <hr style={{ borderColor: '#334155', margin: '24px 0' }} />

        {/* ALERT CARD */}
        <div style={{ 
            padding: '16px', 
            borderRadius: '12px', 
            borderLeft: `4px solid ${prediction.risk === 'Severe' ? '#ef4444' : '#22c55e'}`,
            backgroundColor: prediction.risk === 'Severe' ? 'rgba(239, 68, 68, 0.1)' : 'rgba(34, 197, 94, 0.1)'
        }}>
            <div style={{ display: 'flex', gap: '12px' }}>
                <AlertTriangle color={prediction.risk === 'Severe' ? '#ef4444' : '#22c55e'} size={24} />
                <div>
                    <p style={{ margin: 0, fontWeight: 'bold' }}>{prediction.risk} Risk</p>
                    <p style={{ margin: '4px 0 0 0', fontSize: '12px', color: '#cbd5e1' }}>{prediction.area}</p>
                    <p style={{ margin: '8px 0 0 0', fontSize: '12px', fontWeight: 'bold', color: '#60a5fa' }}>{prediction.chance} Confidence</p>
                </div>
            </div>
        </div>

      </div>

      {/* MAP AREA */}
      <div style={{ flex: 1, position: 'relative', backgroundColor: '#020617', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <div style={{ textAlign: 'center', padding: '32px', backgroundColor: 'rgba(15, 23, 42, 0.8)', borderRadius: '16px', border: '1px dashed #334155' }}>
            <MapIcon size={48} color="#64748b" style={{ margin: '0 auto 16px auto', display: 'block' }} />
            <p style={{ margin: 0, color: '#94a3b8', fontWeight: 'bold' }}>Live ML Inference Active</p>
            <p style={{ margin: '8px 0 0 0', fontSize: '12px', color: '#64748b' }}>Processing weather features for {prediction.area}...</p>
        </div>
      </div>

    </div>
  );
};

export default VaanMozhliUI;