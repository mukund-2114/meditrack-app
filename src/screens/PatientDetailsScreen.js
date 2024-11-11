import React, { useEffect, useState } from 'react';
import { View, Text, Button, StyleSheet, ScrollView, Image } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { getCriticalPatients, getPatientById, getTestsByPatientId } from '../services/api';
import dayjs from 'dayjs'; // Import dayjs for date formatting

const PatientDetailsScreen = () => {
  const route = useRoute();
  const navigation = useNavigation();
  const { patientId } = route.params; // Get the patientId from the route parameters
  const [patient, setPatient] = useState(null);
  const [criticalCondition, setCriticalCondition] = useState(""); // Changed to string
  const [recentTests, setRecentTests] = useState([]);

  // Fetch patient details from the server
  const fetchPatientDetails = async () => {
    try {
      const response = await getPatientById(patientId);
      setPatient(response.data);
    } catch (error) {
      console.error("Error fetching patient details:", error);
    }
  };
  const randomAvatar = `https://avatar.iran.liara.run/public/${Math.random(0,500)*10}`;

  // Fetch the recent tests for the patient
  const fetchRecentTests = async () => {
    try {
      const response = await getTestsByPatientId(patientId);
      const tests = response.data;
      setRecentTests(tests.slice(0, 3)); // Get the most recent 3 tests

      // Check if the latest test is critical or stable
      if (tests.length > 0) {
        const latestTest = tests[0];
        const bloodOxygen = latestTest.dataType === 'Blood Oxygen' ? latestTest.reading : null;
        
        if (bloodOxygen && bloodOxygen < 90) {
          setCriticalCondition("Critical"); // Set string value instead of boolean
        } else {
          setCriticalCondition("Stable"); // Set string value instead of boolean
        }
      }
    } catch (error) {
      console.error("Error fetching patient tests:", error);
    }
  };

  useEffect(() => {
    fetchPatientDetails();
    fetchRecentTests();
  }, [patientId]);

  return (
    <ScrollView style={styles.container}>
      {patient ? (
        <>
          <View style={styles.header}>
            <Image
              source={{
                uri: randomAvatar,
              }}
              style={styles.avatar}
            />
            <Text style={styles.patientName}>{patient.name}</Text>
            <Text style={styles.patientInfo}>DOB: {new Date(patient.dob).toLocaleDateString()}</Text>
            <Text style={styles.patientInfo}>Gender: {patient.gender}</Text>
            <Text style={styles.patientInfo}>Address: {patient.address}</Text>
            <Text style={styles.patientInfo}>Contact: {patient.contactNumber}</Text>
            <Text style={styles.patientInfo}>Status: {patient.status}</Text>
          </View>

          {/* Critical Condition Highlight */}
          <View style={[styles.criticalConditionContainer, patient.status === "Critical" && styles.criticalCondition]}>
            <Text style={patient.status === "Critical" ? styles.criticalConditionText : styles.stableConditionText}>
              {patient.status === "Critical" ? 'Critical Condition' : 'Stable Condition'}
            </Text>
          </View>

          {/* Recent Tests Section */}
          <View style={styles.testsContainer}>
            <Text style={styles.sectionTitle}>Recent Tests</Text>
            {recentTests.length > 0 ? (
              recentTests.map((test, index) => (
                <View key={index} style={styles.testItem}>
                  <Text style={styles.testInfo}>Test Type: {test.dataType}</Text>
                  <Text style={styles.testInfo}>Reading: {test.reading}</Text>
                  {/* Format the date to display the day of the week */}
                  <Text style={styles.testInfo}>Date: {dayjs(test.testDate).format('MM/DD/YYYY')}</Text>
                </View>
              ))
            ) : (
              <Text>No recent tests available.</Text>
            )}

            <Button
              title="View All Tests"
              onPress={() => navigation.navigate('AllTests', { patientId })}
            />
          </View>
        </>
      ) : (
        <Text>Loading patient details...</Text>
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
  header: {
    alignItems: 'center',
    marginBottom: 20,
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 10,
  },
  patientName: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  patientInfo: {
    fontSize: 16,
    marginBottom: 5,
    color: '#666',
  },
  criticalConditionContainer: {
    marginBottom: 20,
    padding: 10,
    borderRadius: 5,
    borderWidth: 1,
    alignItems: 'center',
  },
  criticalCondition: {
    backgroundColor: '#ffcccc',
    borderColor: '#ff0000',
  },
  criticalConditionText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#ff0000',
  },
  stableConditionText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#00ff00',
  },
  testsContainer: {
    marginTop: 20,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  testItem: {
    marginBottom: 10,
    padding: 10,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 5,
  },
  testInfo: {
    fontSize: 16,
    color: '#333',
  },
});

export default PatientDetailsScreen;
