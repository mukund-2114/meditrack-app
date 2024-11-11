import React,{useEffect, useState} from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { getCriticalPatients, getPatients } from '../services/api';

const DashboardScreen = ({ navigation }) => {
  

  const [patientsCount, setPatientsCount] = useState(0);
  const [criticalPatientsCount, setCriticalPatientsCount] = useState(0);

  const getAllCount = async () => {
    const patients = await getPatients();
    setPatientsCount(patients.data.length);

    const criticalPatients = await getCriticalPatients();
    setCriticalPatientsCount(criticalPatients.data.length);
  }
  const widgets = [
    { title: 'Patients', icon: 'people', value: `${patientsCount}` , onPress: () => navigation.navigate('PatientsList') },
    { title: 'Critical Patients', icon: 'accessibility', value: `${criticalPatientsCount}` ,onPress: () => navigation.navigate('CriticalPatients') },
    { title: 'Profile', icon: 'account-circle' ,onPress: () => navigation.navigate('Profile') },
    { title: 'Settings', icon: 'settings', onPress: () => navigation.navigate('Settings') },
  ];
  

  useEffect(() => {
    getAllCount();
  }, []);

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Dashboard</Text>
      
      <View style={styles.widgetContainer}>
        {widgets.map((widget, index) => (
          <TouchableOpacity key={index} style={styles.widget} onPress={widget.onPress}>
          
            <Icon name={widget.icon} size={30} color="#007AFF" />
            <Text style={styles.widgetValue}>{widget.value}</Text>
            <Text style={styles.widgetTitle}>{widget.title}</Text>
          
          </TouchableOpacity>
        ))}
      </View>

      {/* <View style={styles.menuContainer}>
        {menuItems.map((item, index) => (
          <TouchableOpacity key={index} style={styles.menuItem} onPress={item.onPress}>
            <Icon name={item.icon} size={24} color="#007AFF" />
            <Text style={styles.menuItemText}>{item.title}</Text>
          </TouchableOpacity>
        ))}
      </View> */}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    marginTop: 50,
    backgroundColor: '#F5F5F5',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  widgetContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
    flexWrap: 'wrap',
  },
  widget: {
    backgroundColor: 'white',
    padding: 15,
    marginBottom:15,
    borderRadius: 10,
    alignItems: 'center',
    width: '45%',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  widgetValue: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 5,
  },
  widgetTitle: {
    fontSize: 12,
    color: 'gray',
    marginTop: 5,
  },
  menuContainer: {
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
  },
  menuItemText: {
    marginLeft: 15,
    fontSize: 16,
  },
});

export default DashboardScreen;