import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, TextInput } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { getPatients } from '../services/api';

const PatientsListScreen = ({ navigation }) => {
  const [patients, setPatients] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    // Fetch patients from API
    fetchData()
    
  }, []);

  const fetchData = async ()=>{
    const fetchedPatients = await getPatients();  // Replace with actual API call
    setPatients(fetchedPatients);
  }

  const renderPatientItem = ({ item }) => (
    <TouchableOpacity 
      style={styles.patientItem}
      onPress={() => navigation.navigate('PatientFile', { patientId: item.id })}
    >
      <Text style={styles.patientName}>{item.name}</Text>
      <Text style={styles.patientCondition}>{item.condition}</Text>
    </TouchableOpacity>
  );

  const filteredPatients = Array.isArray(patients) 
  ? patients.filter(patient => 
      patient.name.toLowerCase().includes(searchQuery.toLowerCase())
    )
  : [];

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.searchBar}
        placeholder="Search patients..."
        value={searchQuery}
        onChangeText={setSearchQuery}
      />
      <FlatList
        data={patients}
        renderItem={renderPatientItem}
        keyExtractor={item => item.id.toString()}
      />
      <TouchableOpacity 
        style={styles.addButton}
        onPress={() => navigation.navigate('AddPatient')}
      >
        <Icon name="add" size={24} color="white" />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#F5F5F5',
  },
  searchBar: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 10,
  },
  patientItem: {
    backgroundColor: 'white',
    padding: 15,
    borderRadius: 5,
    marginBottom: 10,
  },
  patientName: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  patientCondition: {
    fontSize: 14,
    color: 'gray',
  },
  addButton: {
    position: 'absolute',
    right: 20,
    bottom: 20,
    backgroundColor: '#007AFF',
    width: 50,
    height: 50,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default PatientsListScreen;