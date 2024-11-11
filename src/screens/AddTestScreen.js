import React, { useState } from 'react';
import { View, Text, Button, StyleSheet, TextInput, Alert } from 'react-native';
import RNPickerSelect from 'react-native-picker-select';
import { useNavigation, useRoute } from '@react-navigation/native';
import axios from 'axios';
import DateTimePicker from 'react-native-ui-datepicker';
import dayjs from 'dayjs';
import { addPatientTest } from '../services/api';

const AddTestScreen = () => {
  const route = useRoute();
  const navigation = useNavigation();
  const { patientId, fetchAllTests } = route.params;

  const [testType, setTestType] = useState('');
  const [reading, setReading] = useState('');
  const [testDate, setTestDate] = useState(dayjs()); // Default to current date
  const [showDatePicker, setShowDatePicker] = useState(false); // To control visibility of the DatePicker
  const [testTypes] = useState(['Blood Pressure', 'Respiratory Rate', 'Blood Oxygen Level','Heartbeat Rate']);

  // Handle the Date picker change
  const handleDateChange = (date) => {
    setTestDate(date); // Update the state with the selected date
    setShowDatePicker(false); // Close the DatePicker
  };

  const handleAddTest = async () => {
    if (!testType || !reading || !testDate) {
      Alert.alert('Error', 'Please fill in all fields.');
      return;
    }

    try {
      // Convert the date to ISO string format before sending it
      const formattedDate = testDate.toISOString(); 

      const newTest = {
        patientId,
        dataType: testType,
        reading: reading,
        testDate: formattedDate, // Send the formatted date
      };

      // Make a POST request to add the new test
      await addPatientTest(patientId, newTest);
      Alert.alert('Success', 'Test added successfully!');
      fetchAllTests();
      navigation.goBack(); // Navigate back to the previous screen after successful test addition
    } catch (error) {
      console.error("Error adding test:", error);
      Alert.alert('Error', 'There was an issue adding the test.');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Add Test</Text>

      {/* Test Type Drop-Down using RNPickerSelect */}
      <Text style={styles.label}>Test Type</Text>
      <RNPickerSelect
        onValueChange={(value) => setTestType(value)}
        items={testTypes.map((type) => ({ label: type, value: type }))} 
        style={{
          inputIOS: styles.picker,
          inputAndroid: styles.picker,
        }}
        placeholder={{
          label: 'Select Test Type...',
          value: null,
        }}
        value={testType}
      />

      {/* Test Reading */}
      <Text style={styles.label}>Test Reading</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter test reading"
        value={reading}
        onChangeText={setReading}
        keyboardType="numeric"
      />

      {/* Test Date */}
      <Text style={styles.label}>Test Date</Text>
      <DateTimePicker
        mode="single"
        maxDate={dayjs()}
        date={testDate.toDate()} // Pass the raw JavaScript date object here
        onChange={(params) => handleDateChange(dayjs(params.date))}
      />

      {/* Submit Button */}
      <Button title="Add Test" onPress={handleAddTest} />
    </View>
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
    textAlign: 'center',
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    marginBottom: 8,
    color: '#333',
  },
  picker: {
    height: 50,
    borderColor: '#ddd',
    borderWidth: 1,
    paddingLeft: 10,
    marginBottom: 20,
  },
  input: {
    height: 40,
    borderColor: '#ddd',
    borderWidth: 1,
    paddingLeft: 10,
    marginBottom: 20,
  },
});

export default AddTestScreen;
