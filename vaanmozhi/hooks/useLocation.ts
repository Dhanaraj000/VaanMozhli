import { useEffect, useState } from 'react';
import * as Location from 'expo-location';

export interface LocationData {
  latitude: number;
  longitude: number;
  city: string;
  accuracy?: number;
  altitude?: number;
}

export function useLocation() {
  const [location, setLocation] = useState<LocationData | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [permissionStatus, setPermissionStatus] = useState<Location.PermissionStatus | null>(null);

  // Request location permission
  const requestLocationPermission = async () => {
    try {
      setIsLoading(true);
      const { status } = await Location.requestForegroundPermissionsAsync();
      setPermissionStatus(status);

      if (status !== 'granted') {
        setError('Location permission denied. Please enter your location manually.');
        return false;
      }

      // Get current location
      const currentLocation = await Location.getCurrentPositionAsync({
        accuracy: Location.Accuracy.Balanced,
      });

      // Reverse geocode to get city name
      const reverseGeocode = await Location.reverseGeocodeAsync({
        latitude: currentLocation.coords.latitude,
        longitude: currentLocation.coords.longitude,
      });

      const cityName = reverseGeocode[0]?.city || reverseGeocode[0]?.region || 'Unknown Location';

      const locationData: LocationData = {
        latitude: currentLocation.coords.latitude,
        longitude: currentLocation.coords.longitude,
        city: cityName,
        accuracy: currentLocation.coords.accuracy || undefined,
        altitude: currentLocation.coords.altitude || undefined,
      };

      setLocation(locationData);
      setError(null);
      return true;
    } catch (err: any) {
      setError(`Error getting location: ${err.message}`);
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  // Set location manually
  const setLocationManually = async (latitude: number, longitude: number) => {
    try {
      setIsLoading(true);

      // Reverse geocode to get city name
      const reverseGeocode = await Location.reverseGeocodeAsync({
        latitude,
        longitude,
      });

      const cityName = reverseGeocode[0]?.city || reverseGeocode[0]?.region || 'Unknown Location';

      const locationData: LocationData = {
        latitude,
        longitude,
        city: cityName,
      };

      setLocation(locationData);
      setError(null);
      return true;
    } catch (err: any) {
      setError(`Error setting location: ${err.message}`);
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  // Check initial permission status
  useEffect(() => {
    const checkPermission = async () => {
      try {
        const { status } = await Location.getForegroundPermissionsAsync();
        setPermissionStatus(status);

        if (status === 'granted') {
          await requestLocationPermission();
        }
      } catch (err) {
        console.error('Error checking location permission:', err);
      }
    };

    checkPermission();
  }, []);

  return {
    location,
    isLoading,
    error,
    permissionStatus,
    requestLocationPermission,
    setLocationManually,
  };
}
