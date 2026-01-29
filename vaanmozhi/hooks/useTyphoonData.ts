import { useEffect, useState } from 'react';

export interface TyphoonForecast {
  alertLevel: 'Low' | 'Moderate' | 'High' | 'Severe';
  nextUpdate: string;
  affectedDistricts: string[];
  trackSummary: string;
}

export function useTyphoonData() {
  const [data, setData] = useState<TyphoonForecast | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchRealData = async () => {
      try {
        setIsLoading(true);
        
        const API_URL = 'http://127.0.0.1:5000/api/v1/forecast';
        
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
  }, []);

  return { data, isLoading, error };
}
