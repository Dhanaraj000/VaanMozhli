import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  ActivityIndicator,
  ScrollView,
} from 'react-native';
import { useLocation, LocationData } from '../hooks/useLocation';
import { useTyphoonData } from '../hooks/useTyphoonData';

export function MapSection() {
  const { location, isLoading, error, requestLocationPermission } = useLocation();
  const [customLocation, setCustomLocation] = useState<LocationData | null>(null);
  const [manualInput, setManualInput] = useState('');
  const [showSearch, setShowSearch] = useState(false);
  const [dataHistory, setDataHistory] = useState<any[]>([]);

  const displayLocation = location || customLocation;

  const { data: typhoonData, isLoading: dataLoading } = useTyphoonData(
    displayLocation?.latitude,
    displayLocation?.longitude,
    displayLocation?.city
  );

  // Track data history for predictions
  React.useEffect(() => {
    if (typhoonData) {
      setDataHistory(prev => {
        const updated = [typhoonData, ...prev].slice(0, 10); // Keep last 10 readings
        return updated;
      });
    }
  }, [typhoonData]);

  const handleSearch = () => {
    if (manualInput.trim()) {
      setCustomLocation({
        latitude: 0,
        longitude: 0,
        city: manualInput.trim(),
        accuracy: 0,
      });
      setManualInput('');
      setShowSearch(false);
    }
  };

  const getAlertColor = (level: string) => {
    const colors: { [key: string]: string } = {
      Severe: '#e74c3c',
      High: '#f39c12',
      Moderate: '#f1c40f',
      Low: '#27ae60',
    };
    return colors[level] || '#95a5a6';
  };

  return (
    <View style={styles.container}>
      {/* HEADER */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Weather Alert</Text>
        <Text style={styles.headerSubtitle}>Tamil Nadu Forecast</Text>
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* LOCATION SECTION */}
        <View style={styles.locationSection}>
          {!displayLocation ? (
            <View style={styles.locationPrompt}>
              <Text style={styles.promptIcon}>📍</Text>
              <Text style={styles.promptTitle}>Enable Location</Text>
              <Text style={styles.promptText}>
                Allow access to your location for real-time weather alerts
              </Text>

              <TouchableOpacity
                style={styles.primaryButton}
                onPress={requestLocationPermission}
                disabled={isLoading}
              >
                <Text style={styles.primaryButtonText}>
                  {isLoading ? 'Getting Location...' : 'Allow Location'}
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.secondaryButton}
                onPress={() => setShowSearch(true)}
              >
                <Text style={styles.secondaryButtonText}>Enter Manually</Text>
              </TouchableOpacity>
            </View>
          ) : (
            <>
              <View style={styles.locationCard}>
                <Text style={styles.locationIcon}>📍</Text>
                <View style={styles.locationInfo}>
                  <Text style={styles.locationName}>{displayLocation.city}</Text>
                  <Text style={styles.locationRegion}>Tamil Nadu, India</Text>
                </View>
                <TouchableOpacity
                  onPress={() => setShowSearch(!showSearch)}
                  style={styles.changeBtn}
                >
                  <Text style={styles.changeBtnText}>Change</Text>
                </TouchableOpacity>
              </View>

              {/* SEARCH BOX */}
              {showSearch && (
                <View style={styles.searchBox}>
                  <TextInput
                    style={styles.searchInput}
                    placeholder="Search city..."
                    placeholderTextColor="#bdc3c7"
                    value={manualInput}
                    onChangeText={setManualInput}
                  />
                  <View style={styles.searchButtons}>
                    <TouchableOpacity
                      style={styles.searchBtnConfirm}
                      onPress={handleSearch}
                    >
                      <Text style={styles.searchBtnText}>Search</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      style={styles.searchBtnCancel}
                      onPress={() => {
                        setShowSearch(false);
                        setManualInput('');
                      }}
                    >
                      <Text style={styles.searchBtnCancelText}>Cancel</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              )}
            </>
          )}
        </View>

        {displayLocation && (
          <>
            {/* LIVE WEATHER DATA */}
            {typhoonData && (
              <View style={styles.alertCard}>
                <View
                  style={[
                    styles.alertBadge,
                    { backgroundColor: getAlertColor(typhoonData.alertLevel) },
                  ]}
                >
                  <Text style={styles.alertText}>{typhoonData.alertLevel}</Text>
                </View>

                <Text style={styles.alertTitle}>Live Weather Data</Text>
                <Text style={styles.alertDescription}>
                  {typhoonData.trackSummary}
                </Text>

                {/* WEATHER DETAILS */}
                <View style={styles.detailsContainer}>
                  <View style={styles.detailRow}>
                    <View style={styles.detailCard}>
                      <Text style={styles.detailIcon}>🌡️</Text>
                      <Text style={styles.detailLabel}>Temperature</Text>
                      <Text style={styles.detailValue}>
                        {typhoonData.additionalInfo.temp}
                      </Text>
                    </View>
                    <View style={styles.detailCard}>
                      <Text style={styles.detailIcon}>💧</Text>
                      <Text style={styles.detailLabel}>Humidity</Text>
                      <Text style={styles.detailValue}>
                        {typhoonData.additionalInfo.humidity}
                      </Text>
                    </View>
                  </View>

                  <View style={styles.detailRow}>
                    <View style={styles.detailCard}>
                      <Text style={styles.detailIcon}>💨</Text>
                      <Text style={styles.detailLabel}>Wind Speed</Text>
                      <Text style={styles.detailValue}>
                        {typhoonData.additionalInfo.windSpeed}
                      </Text>
                    </View>
                    <View style={styles.detailCard}>
                      <Text style={styles.detailIcon}>🌧️</Text>
                      <Text style={styles.detailLabel}>Precipitation</Text>
                      <Text style={styles.detailValue}>
                        {typhoonData.additionalInfo.precipitation}
                      </Text>
                    </View>
                  </View>
                </View>

                {/* AFFECTED REGIONS */}
                {typhoonData.affectedDistricts && typhoonData.affectedDistricts.length > 0 && (
                  <View style={styles.regionsSection}>
                    <Text style={styles.regionsTitle}>Affected Regions</Text>
                    <View style={styles.regionsList}>
                      {typhoonData.affectedDistricts.map((district: string, idx: number) => (
                        <View key={idx} style={styles.regionTag}>
                          <Text style={styles.regionText}>{district}</Text>
                        </View>
                      ))}
                    </View>
                  </View>
                )}

                {/* API DATA INFO */}
                <View style={styles.dataInfoBox}>
                  <Text style={styles.dataInfoLabel}>Data Confidence:</Text>
                  <Text style={styles.dataInfoValue}>
                    {typhoonData.additionalInfo.dataConfidence}%
                  </Text>
                </View>

                {/* METADATA */}
                <Text style={styles.timestamp}>
                  Last updated: {new Date(typhoonData.timestamp).toLocaleString()}
                </Text>
              </View>
            )}

            {/* DATA HISTORY & PREDICTIONS */}
            {dataHistory.length > 0 && (
              <View style={styles.historyCard}>
                <Text style={styles.historyTitle}>📊 Data History & Predictions</Text>
                <Text style={styles.historySubtitle}>Last {dataHistory.length} readings</Text>

                {dataHistory.slice(0, 5).map((record, idx) => (
                  <View key={idx} style={styles.historyItem}>
                    <Text style={styles.historyTime}>
                      Reading {idx + 1} • {new Date(record.timestamp).toLocaleTimeString()}
                    </Text>
                    <View style={styles.historyData}>
                      <Text style={styles.historyDataPoint}>
                        🌡️ {record.additionalInfo.temp} | 💧 {record.additionalInfo.humidity} | 💨 {record.additionalInfo.windSpeed}
                      </Text>
                      <View
                        style={[
                          styles.historyAlertBadge,
                          { backgroundColor: getAlertColor(record.alertLevel) },
                        ]}
                      >
                        <Text style={styles.historyAlertText}>{record.alertLevel}</Text>
                      </View>
                    </View>
                  </View>
                ))}

                <View style={styles.predictionBox}>
                  <Text style={styles.predictionLabel}>🔮 Prediction Based on Trends:</Text>
                  <Text style={styles.predictionText}>
                    {dataHistory.length >= 2
                      ? `Monitoring ${dataHistory.length} data points. Current alert level: ${typhoonData?.alertLevel}`
                      : 'Collecting data for predictions...'}
                  </Text>
                </View>
              </View>
            )}

            {/* LOADING */}
            {dataLoading && (
              <View style={styles.loadingContainer}>
                <ActivityIndicator size="large" color="#3498db" />
                <Text style={styles.loadingText}>Loading weather data...</Text>
              </View>
            )}

            {/* ERROR MESSAGE */}
            {error && (
              <View style={styles.errorCard}>
                <Text style={styles.errorIcon}>⚠️</Text>
                <Text style={styles.errorMessage}>{error}</Text>
              </View>
            )}
          </>
        )}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ecf0f1',
  },
  header: {
    backgroundColor: '#2c3e50',
    paddingTop: 40,
    paddingBottom: 24,
    paddingHorizontal: 20,
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: '700',
    color: '#fff',
  },
  headerSubtitle: {
    fontSize: 14,
    color: '#bdc3c7',
    marginTop: 4,
  },
  content: {
    flex: 1,
    padding: 16,
  },

  locationSection: {
    marginBottom: 16,
  },
  locationPrompt: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 32,
    alignItems: 'center',
    marginTop: 24,
    elevation: 3,
  },
  promptIcon: {
    fontSize: 56,
    marginBottom: 16,
  },
  promptTitle: {
    fontSize: 22,
    fontWeight: '700',
    color: '#2c3e50',
    marginBottom: 8,
  },
  promptText: {
    fontSize: 14,
    color: '#7f8c8d',
    textAlign: 'center',
    marginBottom: 24,
    lineHeight: 20,
  },

  primaryButton: {
    backgroundColor: '#3498db',
    borderRadius: 10,
    paddingVertical: 14,
    paddingHorizontal: 24,
    width: '100%',
    alignItems: 'center',
    marginBottom: 12,
    elevation: 2,
  },
  primaryButtonText: {
    color: '#fff',
    fontWeight: '700',
    fontSize: 15,
  },
  secondaryButton: {
    backgroundColor: '#ecf0f1',
    borderRadius: 10,
    paddingVertical: 14,
    paddingHorizontal: 24,
    width: '100%',
    alignItems: 'center',
    borderWidth: 1.5,
    borderColor: '#bdc3c7',
  },
  secondaryButtonText: {
    color: '#2c3e50',
    fontWeight: '600',
    fontSize: 15,
  },

  locationCard: {
    backgroundColor: '#fff',
    borderRadius: 14,
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
    elevation: 2,
  },
  locationIcon: {
    fontSize: 32,
    marginRight: 12,
  },
  locationInfo: {
    flex: 1,
  },
  locationName: {
    fontSize: 18,
    fontWeight: '700',
    color: '#2c3e50',
  },
  locationRegion: {
    fontSize: 13,
    color: '#7f8c8d',
    marginTop: 2,
  },
  changeBtn: {
    backgroundColor: '#ecf0f1',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 6,
  },
  changeBtnText: {
    color: '#3498db',
    fontWeight: '600',
    fontSize: 12,
  },

  searchBox: {
    backgroundColor: '#fff',
    borderRadius: 14,
    padding: 14,
    marginBottom: 16,
    elevation: 2,
  },
  searchInput: {
    backgroundColor: '#f5f6fa',
    borderRadius: 10,
    paddingHorizontal: 14,
    paddingVertical: 12,
    fontSize: 14,
    color: '#2c3e50',
    marginBottom: 12,
  },
  searchButtons: {
    flexDirection: 'row',
    gap: 10,
  },
  searchBtnConfirm: {
    flex: 1,
    backgroundColor: '#27ae60',
    borderRadius: 10,
    paddingVertical: 10,
    alignItems: 'center',
  },
  searchBtnCancel: {
    flex: 1,
    backgroundColor: '#e74c3c',
    borderRadius: 10,
    paddingVertical: 10,
    alignItems: 'center',
  },
  searchBtnText: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 14,
  },
  searchBtnCancelText: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 14,
  },

  alertCard: {
    backgroundColor: '#fff',
    borderRadius: 14,
    padding: 16,
    marginBottom: 16,
    elevation: 3,
  },
  alertBadge: {
    alignSelf: 'flex-start',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 8,
    marginBottom: 12,
  },
  alertText: {
    color: '#fff',
    fontWeight: '700',
    fontSize: 14,
  },
  alertTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#2c3e50',
    marginBottom: 8,
  },
  alertDescription: {
    fontSize: 14,
    color: '#555',
    lineHeight: 21,
    marginBottom: 16,
  },

  detailsContainer: {
    marginBottom: 16,
  },
  detailRow: {
    flexDirection: 'row',
    gap: 10,
    marginBottom: 10,
  },
  detailCard: {
    flex: 1,
    backgroundColor: '#f8f9fa',
    borderRadius: 10,
    padding: 12,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#e9ecef',
  },
  detailIcon: {
    fontSize: 28,
    marginBottom: 6,
  },
  detailLabel: {
    fontSize: 12,
    color: '#7f8c8d',
    fontWeight: '500',
  },
  detailValue: {
    fontSize: 16,
    fontWeight: '700',
    color: '#2c3e50',
    marginTop: 4,
  },

  regionsSection: {
    marginBottom: 16,
  },
  regionsTitle: {
    fontSize: 14,
    fontWeight: '700',
    color: '#2c3e50',
    marginBottom: 10,
  },
  regionsList: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  regionTag: {
    backgroundColor: '#ecf0f1',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderWidth: 1,
    borderColor: '#bdc3c7',
  },
  regionText: {
    color: '#2c3e50',
    fontSize: 12,
    fontWeight: '600',
  },

  dataInfoBox: {
    backgroundColor: '#ecf0f1',
    borderRadius: 10,
    padding: 12,
    marginBottom: 12,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  dataInfoLabel: {
    fontSize: 13,
    fontWeight: '600',
    color: '#2c3e50',
  },
  dataInfoValue: {
    fontSize: 14,
    fontWeight: '700',
    color: '#3498db',
  },

  timestamp: {
    fontSize: 12,
    color: '#95a5a6',
    textAlign: 'center',
    fontStyle: 'italic',
  },

  historyCard: {
    backgroundColor: '#fff',
    borderRadius: 14,
    padding: 16,
    marginBottom: 16,
    elevation: 2,
    borderLeftWidth: 4,
    borderLeftColor: '#9b59b6',
  },
  historyTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#2c3e50',
    marginBottom: 4,
  },
  historySubtitle: {
    fontSize: 12,
    color: '#7f8c8d',
    marginBottom: 12,
  },
  historyItem: {
    backgroundColor: '#f8f9fa',
    borderRadius: 10,
    padding: 12,
    marginBottom: 10,
    borderLeftWidth: 3,
    borderLeftColor: '#3498db',
  },
  historyTime: {
    fontSize: 11,
    color: '#7f8c8d',
    fontWeight: '500',
    marginBottom: 6,
  },
  historyData: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  historyDataPoint: {
    fontSize: 12,
    color: '#2c3e50',
    fontWeight: '600',
    flex: 1,
  },
  historyAlertBadge: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 6,
    marginLeft: 8,
  },
  historyAlertText: {
    color: '#fff',
    fontSize: 11,
    fontWeight: '700',
  },

  predictionBox: {
    backgroundColor: '#ecf0f1',
    borderRadius: 10,
    padding: 12,
    marginTop: 12,
    borderLeftWidth: 3,
    borderLeftColor: '#9b59b6',
  },
  predictionLabel: {
    fontSize: 12,
    fontWeight: '700',
    color: '#2c3e50',
    marginBottom: 6,
  },
  predictionText: {
    fontSize: 12,
    color: '#555',
    lineHeight: 18,
  },

  loadingContainer: {
    alignItems: 'center',
    paddingVertical: 32,
  },
  loadingText: {
    marginTop: 12,
    fontSize: 14,
    color: '#7f8c8d',
  },

  errorCard: {
    backgroundColor: '#fadbd8',
    borderRadius: 10,
    padding: 14,
    marginBottom: 16,
    borderLeftWidth: 4,
    borderLeftColor: '#e74c3c',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  errorIcon: {
    fontSize: 24,
  },
  errorMessage: {
    flex: 1,
    color: '#c0392b',
    fontSize: 13,
    fontWeight: '500',
  },
});
