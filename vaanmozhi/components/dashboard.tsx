import React, { useState } from 'react';
import { AlertTriangle, Map as MapIcon, Shield, Activity, Droplets } from 'lucide-react';

const VaanMozhliUI = () => {
  const [prediction, setPrediction] = useState({ risk: "High", chance: "87%", area: "Adyar, Chennai" });

  return (
    <div className="flex h-screen bg-slate-900 text-white font-sans">
      {/* Sidebar */}
      <div className="w-80 bg-slate-800 border-r border-slate-700 p-6 flex flex-col">
        <div className="flex items-center gap-3 mb-10">
          <div className="bg-blue-600 p-2 rounded-lg">
            <Droplets size={24} />
          </div>
          <h1 className="text-xl font-bold tracking-tight">VaanMozhli</h1>
        </div>

        <div className="space-y-6 flex-1">
          {/* Model Status Card */}
          <div className="bg-slate-900/50 rounded-xl p-4 border border-slate-700">
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-semibold text-slate-400 uppercase">ML Model Status</span>
              <span className="flex h-2 w-2 rounded-full bg-green-500 animate-pulse"></span>
            </div>
            <p className="text-sm font-medium">Random Forest Classifier</p>
            <div className="mt-2 h-1.5 w-full bg-slate-700 rounded-full overflow-hidden">
              <div className="h-full bg-blue-500 w-[70%]"></div>
            </div>
          </div>

          {/* Current Prediction */}
          <div>
            <h3 className="text-xs font-semibold text-slate-400 uppercase mb-3">Active Alerts</h3>
            <div className={`p-4 rounded-xl border-l-4 ${prediction.risk === 'High' ? 'bg-red-500/10 border-red-500' : 'bg-green-500/10 border-green-500'}`}>
              <div className="flex items-start gap-3">
                <AlertTriangle className="text-red-500" size={20} />
                <div>
                  <p className="font-bold text-sm">{prediction.risk} Risk Detected</p>
                  <p className="text-xs text-slate-300 mt-1">{prediction.area}</p>
                  <p className="text-xs font-bold mt-2 text-red-400">{prediction.chance} Confidence</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <button className="bg-blue-600 hover:bg-blue-700 py-3 rounded-xl font-bold transition-all">
          Trigger SOS Alert
        </button>
      </div>

      {/* Main Content (Map Area) */}
      <div className="flex-1 relative bg-slate-950">
        {/* Top Stats Bar */}
        <div className="absolute top-6 left-6 right-6 flex gap-4 z-10">
          <div className="bg-slate-800/80 backdrop-blur-md p-4 rounded-2xl border border-slate-700 flex items-center gap-4 flex-1">
            <div className="p-2 bg-blue-500/20 rounded-lg text-blue-400"><Activity size={20}/></div>
            <div>
              <p className="text-xs text-slate-400">Current Rainfall</p>
              <p className="text-lg font-bold">12.4 mm/hr</p>
            </div>
          </div>
          <div className="bg-slate-800/80 backdrop-blur-md p-4 rounded-2xl border border-slate-700 flex items-center gap-4 flex-1">
            <div className="p-2 bg-orange-500/20 rounded-lg text-orange-400"><Shield size={20}/></div>
            <div>
              <p className="text-xs text-slate-400">Safe Zones Nearby</p>
              <p className="text-lg font-bold">4 Locations</p>
            </div>
          </div>
        </div>

        {/* Map Placeholder - In your real project, replace with <MapContainer> */}
        <div className="w-full h-full flex items-center justify-center bg-[url('https://api.mapbox.com/styles/v1/mapbox/dark-v10/static/80.27,13.08,12,0/1200x800?access_token=YOUR_TOKEN')] bg-cover opacity-60">
           <div className="text-center bg-slate-900/80 p-6 rounded-2xl border border-slate-700 border-dashed">
             <MapIcon size={48} className="mx-auto mb-4 text-slate-500" />
             <p className="text-slate-400">Interactive ML Map Layer Active</p>
             <p className="text-xs text-slate-500 mt-1">Overlaying Elevation (DEM) + Real-time Rainfall</p>
           </div>
        </div>
      </div>
    </div>
  );
};

export default VaanMozhliUI;