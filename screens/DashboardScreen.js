import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

const DashboardScreen = ({ navigation }) => {
  const widgets = [
    { title: 'Appointments', icon: 'event', value: '5' },
    { title: 'Billed', icon: 'attach-money', value: '$1,200' },
    { title: 'Tasks', icon: 'assignment', value: '3' },
  ];

  const menuItems = [
    { title: 'Appointments', icon: 'event', onPress: () => navigation.navigate('Appointments') },
    { title: 'Patients', icon: 'people', onPress: () => navigation.navigate('PatientsList') },
    { title: 'Billings', icon: 'account-balance', onPress: () => navigation.navigate('Billings') },
    { title: 'Settings', icon: 'settings', onPress: () => navigation.navigate('Settings') },
  ];

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Dashboard</Text>
      
      <View style={styles.widgetContainer}>
        {widgets.map((widget, index) => (
          <View key={index} style={styles.widget}>
            <Icon name={widget.icon} size={30} color="#007AFF" />
            <Text style={styles.widgetValue}>{widget.value}</Text>
            <Text style={styles.widgetTitle}>{widget.title}</Text>
          </View>
        ))}
      </View>

      <View style={styles.menuContainer}>
        {menuItems.map((item, index) => (
          <TouchableOpacity key={index} style={styles.menuItem} onPress={item.onPress}>
            <Icon name={item.icon} size={24} color="#007AFF" />
            <Text style={styles.menuItemText}>{item.title}</Text>
          </TouchableOpacity>
        ))}
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
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  widgetContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  widget: {
    backgroundColor: 'white',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    width: '30%',
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