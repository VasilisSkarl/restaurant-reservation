import React, { useState } from 'react';
import { View, TextInput, Button, Alert, StyleSheet, Text } from 'react-native';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const API_URL = 'http://192.168.1.5:5000/api/reservations'; // άλλαξέ το αν αλλάξει IP

const ReservationFormScreen = () => {
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [guests, setGuests] = useState('');

  const handleReservation = async () => {
    const token = await AsyncStorage.getItem('jwt_token');

    try {
      await axios.post(API_URL, { date, time, guests }, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      Alert.alert('✅ Success', 'Reservation created!');
      setDate('');
      setTime('');
      setGuests('');
    } catch (error: any) {
      Alert.alert('❌ Error', error.response?.data?.message || 'Something went wrong');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>🪑 Make a Reservation</Text>

      <TextInput placeholder="Date (YYYY-MM-DD)" value={date} onChangeText={setDate} style={styles.input} />
      <TextInput placeholder="Time (HH:MM)" value={time} onChangeText={setTime} style={styles.input} />
      <TextInput placeholder="Number of guests" value={guests} onChangeText={setGuests} style={styles.input} keyboardType="numeric" />

      <Button title="Book Table" onPress={handleReservation} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { padding: 20, marginTop: 100 },
  title: { fontSize: 24, marginBottom: 20, textAlign: 'center' },
  input: {
    borderWidth: 1,
    borderColor: '#999',
    padding: 10,
    marginBottom: 15,
    borderRadius: 6,
  },
});

export default ReservationFormScreen;
