import { useEffect, useState } from 'react';

export interface AdditionalInfo {
  temp: string;
  humidity: string;
  windSpeed: string;
  precipitation?: string;
  condition?: string;
  dataConfidence: number;
  lastModelRun: string;
}

export interface LocationData {
  latitude: number;
  longitude: number;
  name: string;
}

export interface TyphoonForecast {
  alertLevel: 'Low' | 'Moderate' | 'High' | 'Severe';
  affectedDistricts: string[];
  trackSummary: string;
  intensity: string;
  timestamp: string;
  nextUpdate?: string;
  location?: LocationData;
  additionalInfo: AdditionalInfo;
}

export function useTyphoonData(latitude?: number, longitude?: number, city?: string) {
  const [data, setData] = useState<TyphoonForecast | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchRealData = async () => {
      try {
        setIsLoading(true);
        
        let API_URL = 'http://127.0.0.1:5000/api/v1/forecast';
        
        // Add location parameters if provided
        const params = new URLSearchParams();
        if (latitude && longitude) {
          params.append('lat', latitude.toString());
          params.append('lon', longitude.toString());
        } else if (city) {
          params.append('city', city);
        }
        
        if (params.toString()) {
          API_URL += '?' + params.toString();
        }
        
        console.log('🔄 Fetching from backend:', API_URL);
        
        const response = await fetch(API_URL, {
          method: 'GET',
          headers: {
            'X-Client-Key': 'VAANMOZHI_CLIENT_2025',
            'Content-Type': 'application/json',
          },
        });

        console.log('📡 Response status:', response.status);

        if (!response.ok) {
          throw new Error(`HTTP ${response.status}`);
        }

        const json = await response.json();
        console.log('✅ Got backend data:', json);
        
        setData(json);
        setError(null);
        
      } catch (err: any) {
        console.error('❌ Connection error:', err);
        setError(`Backend connection failed: ${err.message}`);
      } finally {
        setIsLoading(false);
      }
    };

    fetchRealData();
    const interval = setInterval(fetchRealData, 30000);
    
    return () => clearInterval(interval);
  }, [latitude, longitude, city]);

  return { data, isLoading, error };
}
