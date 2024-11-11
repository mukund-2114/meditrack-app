import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { getTestsByPatientId } from '../services/api';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { useNavigation, useRoute } from '@react-navigation/native';
import dayjs from 'dayjs';

const AllTestsScreen = ({ route }) => {
  const navigation = useNavigation();
  const { patientId } = route.params;
  const [tests, setTests] = useState([]);

  useEffect(() => {
    fetchAllTests();
  }, []);

  console.log(tests)
  const fetchAllTests = async () => {
    try {
      const response = await getTestsByPatientId(patientId);
      setTests(response.data);
    } catch (error) {
      // console.error("Error fetching tests:", error);
    }
  };
  if(tests.length === 0){
    return <View style={styles.noTestsContainer}>
      <Text style={styles.noTestsText}>No tests found</Text>
      <TouchableOpacity 
        style={styles.addButton}
        onPress={() => navigation.navigate('AddTest', { patientId, fetchAllTests })}>
        <Icon name="add" size={24} color="white" />
      </TouchableOpacity>
    </View>
  }

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <Text style={styles.title}>All Tests</Text>
        
        {tests.map((test, index) => (
          <View key={index} style={styles.testItem}>
            <Text style={styles.testInfo}>Date: {dayjs(test.testDate).format('MM/DD/YYYY')}</Text>
            <Text style={styles.testInfo}>Type: {test.dataType}</Text>
            <Text style={styles.testInfo}>Reading: {test.reading}</Text>
            {test.criticalFlag && <Text style={styles.critical}>Critical</Text>}
            <TouchableOpacity 
              style={styles.editButton}
              onPress={() => navigation.navigate('EditTest', { 
                testId: test.id, 
                patientId, 
                fetchAllTests 
              })}>
  <Text style={styles.editButtonText}>Edit</Text>
</TouchableOpacity>

          </View>
        ))}
      </ScrollView>

      {/* Floating action button */}
      <TouchableOpacity 
        style={styles.addButton}
        onPress={() => navigation.navigate('AddTest', { patientId, fetchAllTests })}>
        <Icon name="add" size={24} color="white" />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
  },
  noTestsContainer:{
    flex:1,
    justifyContent:'center',
    alignItems:'center'
  },
  noTestsText:{
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    marginTop: 20,
  },
  scrollContent: {
    padding: 20,
    paddingBottom: 80, // Extra padding to avoid overlap with the button
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  testItem: {
    backgroundColor: '#ffffff',
    padding: 10,
    marginVertical: 5,
    borderRadius: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.3,
    shadowRadius: 2,
    elevation: 3,
  },
  testInfo: {
    fontSize: 16,
    color: 'gray',
  },
  critical: {
    color: 'red',
    fontWeight: 'bold',
  },
  editButton: {
    backgroundColor: '#007BFF',
    padding: 8,
    borderRadius: 5,
    marginTop: 10,
    alignItems: 'center',
  },
  editButtonText: {
    color: 'white',
    fontSize: 14,
    fontWeight: 'bold',
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
    elevation: 5, // To give it a raised effect
  }
});

export default AllTestsScreen;
