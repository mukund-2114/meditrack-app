import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, ScrollView } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

const PatientFileScreen = ({ route, navigation }) => {
  const { patientId } = route.params;
  const [patientData, setPatientData] = useState(null);

  useEffect(() => {
    // Fetch patient data from API using patientId
    // This is a placeholder. Replace with actual API call
    setPatientData({
      id: patientId,
      name: 'John Doe',
      condition: 'Stable',
      photo: 'https://example.com/patient-photo.jpg',
      description: 'Patient with mild symptoms, under observation.'
    });
  }, [patientId]);

  if (!patientData) return <Text>Loading...</Text>;

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Image source={{ uri: patientData.photo }} style={styles.photo} />
        <View style={styles.patientInfo}>
          <Text style={styles.name}>{patientData.name}</Text>
          <Text style={styles.condition}>{patientData.condition}</Text>
        </View>
      </View>
      
      <Text style={styles.description}>{patientData.description}</Text>
      
      <View style={styles.buttonContainer}>
        <TouchableOpacity 
          style={styles.button}
          onPress={() => navigation.navigate('PatientDetails', { patientId })}
        >
          <Icon name="person" size={24} color="white" />
          <Text style={styles.buttonText}>Details</Text>
        </TouchableOpacity>
        <TouchableOpacity 
          style={styles.button}
          onPress={() => navigation.navigate('Tests', { patientId })}
        >
          <Icon name="science" size={24} color="white" />
          <Text style={styles.buttonText}>Tests</Text>
        </TouchableOpacity>
        <TouchableOpacity 
          style={styles.button}
          onPress={() => navigation.navigate('Prescriptions', { patientId })}
        >
          <Icon name="receipt" size={24} color="white" />
          <Text style={styles.buttonText}>Prescriptions</Text>
        </TouchableOpacity>
        <TouchableOpacity 
          style={styles.button}
          onPress={() => navigation.navigate('Billing', { patientId })}
        >
          <Icon name="attach-money" size={24} color="white" />
          <Text style={styles.buttonText}>Billing</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#F5F5F5',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  photo: {
    width: 80,
    height: 80,
    borderRadius: 40,
    marginRight: 20,
  },
  patientInfo: {
    flex: 1,
  },
  name: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  condition: {
    fontSize: 18,
    color: 'gray',
  },
  description: {
    fontSize: 16,
    marginBottom: 20,
  },
  buttonContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  button: {
    width: '48%',
    backgroundColor: '#007AFF',
    padding: 15,
    borderRadius: 5,
    alignItems: 'center',
    marginBottom: 10,
    flexDirection: 'row',
    justifyContent: 'center',
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
    marginLeft: 10,
  },
});

export default PatientFileScreen;