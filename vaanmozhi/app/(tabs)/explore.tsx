import { ScrollView, StyleSheet, Text, View } from 'react-native';

export default function ExploreScreen() {
  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>🗺️ Weather Maps</Text>
        <Text style={styles.subtitle}>Interactive Tracking Dashboard</Text>
      </View>

      <View style={styles.comingSoonCard}>
        <Text style={styles.comingSoonTitle}>🚧 Coming Soon</Text>
        <Text style={styles.comingSoonText}>
          • Interactive Tamil Nadu cyclone tracking maps{'\n'}
          • Satellite imagery and radar views{'\n'}
          • Real-time wind speed visualization{'\n'}
          • Flood risk assessment zones{'\n'}
          • Evacuation route planning{'\n'}
          • District-wise detailed forecasts
        </Text>
      </View>

      <View style={styles.infoCard}>
        <Text style={styles.cardTitle}>📊 Current Data Sources</Text>
        <Text style={styles.cardText}>
          • India Meteorological Department (IMD){'\n'}
          • Tamil Nadu State Disaster Management{'\n'}
          • Bay of Bengal Monitoring Systems{'\n'}
          • Coastal Weather Stations
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
    backgroundColor: '#059669',
    padding: 25,
    alignItems: 'center',
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 5,
  },
  subtitle: {
    fontSize: 14,
    color: '#d1fae5',
  },
  comingSoonCard: {
    margin: 16,
    padding: 20,
    backgroundColor: 'white',
    borderRadius: 12,
    borderWidth: 2,
    borderColor: '#fbbf24',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 3,
  },
  comingSoonTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#f59e0b',
    marginBottom: 10,
    textAlign: 'center',
  },
  comingSoonText: {
    fontSize: 14,
    color: '#374151',
    lineHeight: 22,
  },
  infoCard: {
    margin: 16,
    padding: 20,
    backgroundColor: 'white',
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#1f2937',
    marginBottom: 10,
  },
  cardText: {
    fontSize: 14,
    color: '#374151',
    lineHeight: 20,
  },
});
