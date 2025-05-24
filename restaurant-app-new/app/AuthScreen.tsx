import React, { useState } from 'react';
import { View, TextInput, Button, Text, Alert, StyleSheet } from 'react-native';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';

const API_URL = 'http://192.168.1.5:5000/api/auth'; // Άλλαξε το αν αλλάξει η IP σου

const AuthScreen = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isRegistering, setIsRegistering] = useState(false);

  const navigation = useNavigation();

  const handleAuth = async () => {
    const endpoint = isRegistering ? 'register' : 'login';

    try {
      const response = await axios.post(`${API_URL}/${endpoint}`, { email, password });

      if (!isRegistering) {
        await AsyncStorage.setItem('jwt_token', response.data.token);
        Alert.alert('Success', 'Login successful!');
        navigation.navigate('Search' as never); // Μετάβαση στη σελίδα αναζήτησης μετά το login
      } else {
        Alert.alert('Success', 'Registration successful!');
        setIsRegistering(false); // Μετάβαση σε Login μετά την εγγραφή
      }
    } catch (err: any) {
      Alert.alert('Error', err.response?.data?.message || 'Something went wrong');
    }
  };

  const handleLogout = async () => {
    await AsyncStorage.removeItem('jwt_token');
    Alert.alert('Logout', 'Token cleared. You can now login again.');
    // Αν θέλεις, μπορείς να κάνεις reset πεδία εδώ ή navigation πάλι στο Auth
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>
        {isRegistering ? 'Create Account' : 'Login'}
      </Text>

      <TextInput
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        style={styles.input}
        autoCapitalize="none"
        keyboardType="email-address"
      />

      <TextInput
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
        style={styles.input}
      />

      <Button title={isRegistering ? 'Register' : 'Login'} onPress={handleAuth} />

      <Text
        style={styles.toggleText}
        onPress={() => setIsRegistering(!isRegistering)}
      >
        {isRegistering
          ? 'Already have an account? Login'
          : "Don't have an account? Register"}
      </Text>

      {/* Κουμπί Logout για να καθαρίσεις το token */}
      <View style={{ marginTop: 20 }}>
        <Button title="Logout (Clear Token)" onPress={handleLogout} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { padding: 20, marginTop: 100 },
  input: {
    borderWidth: 1,
    borderColor: '#999',
    padding: 10,
    marginBottom: 15,
    borderRadius: 6,
  },
  title: {
    fontSize: 24,
    marginBottom: 25,
    textAlign: 'center',
  },
  toggleText: {
    color: '#0066cc',
    marginTop: 20,
    textAlign: 'center',
  },
});

export default AuthScreen;
