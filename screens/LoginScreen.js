import React, { useState } from 'react';
import { View, TextInput, Button, StyleSheet, Image, Text, ImageBackground, Touchable, TouchableOpacity } from 'react-native';
import meditrack from '../../assets/meditrack-logo1.png';
import background from '../../assets/bg.png'; 
import background2 from '../../assets/page-turner.png'; 

const LoginScreen = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    navigation.navigate('Dashboard');
  };

  return (
    <ImageBackground 
      source={background}  // Set the background image
      style={styles.backgroundImage}
      resizeMode="cover"  // Ensures the image covers the screen
    >
      <View style={styles.container}>
        <Image
          source={meditrack}
          style={styles.logo}
        />
        <TextInput
          style={styles.input}
          placeholder="Email"
          value={email}
          onChangeText={setEmail}
        />
        <TextInput
          style={styles.input}
          placeholder="Password"
          value={password}  
          onChangeText={setPassword}
          secureTextEntry
        />
        <TouchableOpacity style={styles.btn}>
          <Button title="Login" color={'#044956'} onPress={handleLogin}/>
        </TouchableOpacity>
        <Text style={styles.registerText}>
          Don't have an account? &nbsp;
          <Text 
            style={styles.registerLink} 
            onPress={() => navigation.navigate('Register')}
          > 
               Register
          </Text>
        </Text>
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  backgroundImage: {
    flex: 1,  // Ensures the background image covers the entire screen
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
  },
  logo: {
    width: 200,
    height: 200,
    alignSelf: 'center',
    marginBottom: 20,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius:50,
    marginBottom: 10,
    paddingHorizontal: 15,
    paddingVertical:10,
    fontSize:16,
    backgroundColor: 'white',  // Adds a white background to input fields
  },
  registerText: {
    marginTop: 20,
    textAlign: 'center',
    fontSize: 16,
    fontWeight:'bold'
    
  },
  registerLink: {
    color: 'blue',
    textDecorationLine: 'underline',
    fontWeight:'bold'
  },
  btn:{
    backgroundColor: '#044956',
    borderRadius: 50,
    overflow:'hidden',
    paddingVertical: 3,
    marginTop:20,
    fontSize: 16,
  }
});

export default LoginScreen;
