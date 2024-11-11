import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ScrollView, Button, Alert } from 'react-native';
import axios from 'axios';
import { getCriticalPatients } from '../services/api';

const CriticalPatientsScreen = ({ navigation }) => {
  const [criticalPatients, setCriticalPatients] = useState([]);

  // Fetch critical patients data from the backend
  const fetchCriticalPatients = async () => {
    try {
      const response = await getCriticalPatients() // Replace with your backend URL
      setCriticalPatients(response.data);
    } catch (error) {
      console.error('Error fetching critical patients:', error);
      Alert.alert('Error', 'Could not load critical patients');
    }
  };

  useEffect(() => {
    fetchCriticalPatients();
  }, []);

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Critical Patients</Text>
      {criticalPatients.length > 0 ? (
        criticalPatients.map((patient, index) => (
          <View key={index} style={styles.patientCard}>
            <Text style={styles.patientName}>{patient.name}</Text>
            <Text style={styles.patientInfo}>DOB: {new Date(patient.dob).toLocaleDateString()}</Text>
            <Text style={styles.patientInfo}>Status: {patient.status}</Text>
            <Button
              title="View Details"
              onPress={() => navigation.navigate('PatientDetails', { patientId: patient._id })}
            />
          </View>
        ))
      ) : (
        <Text>No critical patients available.</Text>
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  patientCard: {
    marginBottom: 15,
    padding: 15,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    backgroundColor: '#f9f9f9',
  },
  patientName: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  patientInfo: {
    fontSize: 16,
    marginBottom: 5,
    color: '#666',
  },
});

export default CriticalPatientsScreen;
