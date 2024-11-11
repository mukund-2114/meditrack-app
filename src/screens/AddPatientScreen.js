// src/screens/AddPatientScreen.js
import React, { useState } from 'react';
import { View, TextInput, Button, StyleSheet, ScrollView, Alert } from 'react-native';
import { addPatient } from '../services/api';

const AddPatientScreen = ({ navigation }) => {
  const [name, setName] = useState('');
  const [dob, setDob] = useState('');
  const [gender, setGender] = useState('');
  const [address, setAddress] = useState('');
  const [contactNumber, setContactNumber] = useState('');

  const handleAddPatient = async () => {
    // Prepare patient data for submission
    const patientData = { name, dob, gender, address, contactNumber };
    
    
    try {
      await addPatient(patientData);
      Alert.alert('Success', 'Patient added successfully', [
        { text: 'OK', onPress: () => navigation.navigate('PatientsList') }
      ]);
    } catch (error) {
      Alert.alert('Error', error.message || 'Failed to add patient');
    }
  };

  return (
    <ScrollView style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Name"
        value={name}
        onChangeText={setName}
      />
      <TextInput
        style={styles.input}
        placeholder="Date of Birth (YYYY-MM-DD)"
        value={dob}
        onChangeText={setDob}
      />
      <TextInput
        style={styles.input}
        placeholder="Gender"
        value={gender}
        onChangeText={setGender}
      />
      <TextInput
        style={styles.input}
        placeholder="Address"
        value={address}
        onChangeText={setAddress}
      />
      <TextInput
        style={styles.input}
        placeholder="Contact Number"
        value={contactNumber}
        onChangeText={setContactNumber}
        keyboardType="phone-pad"
      />
      <Button title="Add Patient" onPress={handleAddPatient} color="#044956" />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 10,
  },
});

export default AddPatientScreen;
