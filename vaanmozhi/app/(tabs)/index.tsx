import { ActivityIndicator, ScrollView, StyleSheet, Text, View } from 'react-native';
import { TyphoonForecast, useTyphoonData } from '../../hooks/useTyphoonData';

// Main component
export default function HomeScreen() {
  const { data, isLoading, error } = useTyphoonData();

  const getAlertColor = (level: TyphoonForecast['alertLevel']) => {
    switch (level) {
      case 'Severe': return '#dc2626'; // Red
      case 'High': return '#ea580c';   // Orange  
      case 'Moderate': return '#d97706'; // Yellow
      default: return '#059669';      // Green
    }
  };

  const getAlertEmoji = (level: TyphoonForecast['alertLevel']) => {
    switch (level) {
      case 'Severe': return '🔴';
      case 'High': return '🟠';
      case 'Moderate': return '🟡';
      default: return '🟢';
    }
  };

  const renderWeatherStatus = () => {
    if (isLoading) {
      return (
        <View style={[styles.statusContainer, { borderColor: '#6b7280' }]}>
          <ActivityIndicator size="large" color="#2563eb" />
          <Text style={styles.loadingText}>
            📡 Connecting to backend server...
          </Text>
          <Text style={styles.subLoadingText}>
            Fetching real-time Tamil Nadu weather data...
          </Text>
        </View>
      );
    }

    if (error) {
      return (
        <View style={[styles.statusContainer, { borderColor: '#dc2626' }]}>
          <Text style={styles.errorText}>
            ⚠️ Backend Error: {error}
          </Text>
          <Text style={styles.errorSubText}>
            Make sure your Python server is running!
          </Text>
        </View>
      );
    }

    if (data) {
      const alertColor = getAlertColor(data.alertLevel);
      const alertEmoji = getAlertEmoji(data.alertLevel);
      
      return (
        <View style={[styles.statusContainer, { borderColor: alertColor }]}>
          <View style={[styles.alertHeader, { backgroundColor: alertColor }]}>
            <Text style={styles.alertLevel}>
              {alertEmoji} {data.alertLevel.toUpperCase()} ALERT
            </Text>
          </View>
          
          <Text style={styles.summary}>
            {data.trackSummary}
          </Text>
          
          <View style={styles.districtsContainer}>
            <Text style={styles.districtsTitle}>📍 Affected Districts:</Text>
            <Text style={styles.districts}>
              {data.affectedDistricts.join(' • ')}
            </Text>
          </View>
          
          <View style={styles.timeContainer}>
            <Text style={styles.updateTime}>
              🕐 Next Update: {new Date(data.nextUpdate).toLocaleTimeString()}
            </Text>
            <Text style={styles.timestamp}>
              Last Updated: {new Date().toLocaleTimeString()}
            </Text>
          </View>
          
          <View style={styles.backendInfo}>
            <Text style={styles.backendText}>
              🐍 LIVE DATA FROM PYTHON BACKEND SERVER
            </Text>
          </View>
        </View>
      );
    }

    return (
      <View style={styles.statusContainer}>
        <Text style={styles.noDataText}>
          ✅ No active weather alerts for Tamil Nadu
        </Text>
      </View>
    );
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>🌀 வான்மொழி</Text>
        <Text style={styles.titleEnglish}>VAANMOZHI</Text>
        <Text style={styles.subtitle}>Tamil Nadu Weather Alert System</Text>
        <Text style={styles.liveIndicator}>🔴 LIVE BACKEND</Text>
      </View>

      {renderWeatherStatus()}

      <View style={styles.infoGrid}>
        <View style={styles.infoCard}>
          <Text style={styles.cardTitle}>📡 Backend Features</Text>
          <Text style={styles.cardText}>
            • Real Python Flask server{'\n'}
            • Live API communication{'\n'}
            • Automatic 30-second updates{'\n'}
            • Tamil Nadu district data{'\n'}
            • Full-stack application
          </Text>
        </View>

        <View style={styles.infoCard}>
          <Text style={styles.cardTitle}>🚨 Alert System</Text>
          <View style={styles.legendContainer}>
            <Text style={[styles.legendItem, {color: '#059669'}]}>🟢 LOW - Normal conditions</Text>
            <Text style={[styles.legendItem, {color: '#d97706'}]}>🟡 MODERATE - Watch status</Text>
            <Text style={[styles.legendItem, {color: '#ea580c'}]}>🟠 HIGH - Warning issued</Text>
            <Text style={[styles.legendItem, {color: '#dc2626'}]}>🔴 SEVERE - Emergency alert</Text>
          </View>
        </View>
      </View>

      <View style={styles.footer}>
        <Text style={styles.footerText}>
          Full-Stack App: React Native + Python Flask • வான்மொழி v1.0
        </Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8fafc',
  },
  header: {
    backgroundColor: '#1e40af',
    padding: 25,
    alignItems: 'center',
    marginBottom: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 2,
  },
  titleEnglish: {
    fontSize: 16,
    color: '#bfdbfe',
    letterSpacing: 2,
    marginBottom: 5,
  },
  subtitle: {
    fontSize: 14,
    color: '#dbeafe',
    marginBottom: 8,
  },
  liveIndicator: {
    fontSize: 12,
    color: '#fef2f2',
    backgroundColor: '#059669',
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 10,
    overflow: 'hidden',
  },
  statusContainer: {
    margin: 16,
    borderRadius: 12,
    borderWidth: 3,
    backgroundColor: 'white',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 6,
    elevation: 5,
    overflow: 'hidden',
  },
  alertHeader: {
    padding: 15,
    alignItems: 'center',
  },
  alertLevel: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'white',
    letterSpacing: 1,
  },
  summary: {
    fontSize: 16,
    padding: 20,
    textAlign: 'center',
    lineHeight: 24,
    color: '#1f2937',
  },
  districtsContainer: {
    paddingHorizontal: 20,
    marginBottom: 15,
  },
  districtsTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#374151',
    marginBottom: 5,
  },
  districts: {
    fontSize: 14,
    color: '#6b7280',
    lineHeight: 20,
  },
  timeContainer: {
    backgroundColor: '#f9fafb',
    padding: 15,
    borderTopWidth: 1,
    borderTopColor: '#e5e7eb',
  },
  updateTime: {
    fontSize: 12,
    color: '#6b7280',
    marginBottom: 3,
  },
  timestamp: {
    fontSize: 10,
    color: '#9ca3af',
    textAlign: 'right',
  },
  backendInfo: {
    backgroundColor: '#dcfce7',
    padding: 10,
    alignItems: 'center',
  },
  backendText: {
    fontSize: 10,
    color: '#166534',
    fontWeight: 'bold',
  },
  loadingText: {
    fontSize: 16,
    textAlign: 'center',
    marginTop: 15,
    color: '#2563eb',
    fontWeight: '500',
  },
  subLoadingText: {
    fontSize: 12,
    textAlign: 'center',
    marginTop: 5,
    color: '#6b7280',
  },
  errorText: {
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#dc2626',
    padding: 20,
  },
  errorSubText: {
    fontSize: 12,
    textAlign: 'center',
    color: '#6b7280',
    paddingBottom: 15,
  },
  noDataText: {
    fontSize: 16,
    textAlign: 'center',
    padding: 30,
    color: '#059669',
    fontWeight: '500',
  },
  infoGrid: {
    marginHorizontal: 16,
    gap: 12,
  },
  infoCard: {
    backgroundColor: 'white',
    padding: 16,
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 2,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#1f2937',
  },
  cardText: {
    fontSize: 14,
    lineHeight: 20,
    color: '#374151',
  },
  legendContainer: {
    gap: 6,
  },
  legendItem: {
    fontSize: 13,
    fontWeight: '500',
  },
  footer: {
    margin: 20,
    padding: 15,
    alignItems: 'center',
  },
  footerText: {
    fontSize: 11,
    color: '#9ca3af',
    textAlign: 'center',
  },
});
