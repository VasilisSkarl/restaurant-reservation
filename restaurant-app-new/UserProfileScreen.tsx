import React, { useEffect, useState } from 'react';
import { View, Text, Button, FlatList, Alert } from 'react-native';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const API_URL = 'http://<backend_url>';

type Reservation = {
  reservation_id: string;
  restaurant_name: string;
  date: string;
  time: string;
};

const UserProfileScreen = () => {
  const [reservations, setReservations] = useState<Reservation[]>([]);

  useEffect(() => {
    const fetchReservations = async () => {
      try {
        const token = await AsyncStorage.getItem('jwt_token');
        const response = await axios.get(`${API_URL}/user/reservations`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setReservations(response.data);
      } catch (error) {
        Alert.alert('Error', 'Failed to fetch reservations');
      }
    };

    fetchReservations();
  }, []);

  const handleDelete = async (reservationId: string) => {
    try {
      const token = await AsyncStorage.getItem('jwt_token');
      await axios.delete(`${API_URL}/reservations/${reservationId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setReservations(reservations.filter((res) => res.reservation_id !== reservationId));
      Alert.alert('Success', 'Reservation deleted');
    } catch (error) {
      Alert.alert('Error', 'Failed to delete reservation');
    }
  };

  return (
    <View style={{ padding: 20 }}>
      <FlatList
        data={reservations}
        keyExtractor={(item) => item.reservation_id}
        renderItem={({ item }: { item: Reservation }) => (
          <View style={{ marginBottom: 10 }}>
            <Text>{item.restaurant_name}</Text>
            <Text>{item.date} at {item.time}</Text>
            <Button title="Delete" onPress={() => handleDelete(item.reservation_id)} />
          </View>
        )}
      />
    </View>
  );
};

export default UserProfileScreen;
