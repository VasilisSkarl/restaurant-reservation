import React, { useState } from 'react';
import { View, TextInput, Button, Alert } from 'react-native';
import axios from 'axios';
import { StackNavigationProp } from '@react-navigation/stack';
import { RouteProp } from '@react-navigation/native';
import { RootStackParamList } from './App'; // Αν χρειαστεί, άλλαξε το path

// ✨ Βάλε εδώ το πραγματικό backend URL σου
const API_URL = 'http://<backend_ip>:<port>';

type ReservationFormScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Reserve'>;
type ReservationFormScreenRouteProp = RouteProp<RootStackParamList, 'Reserve'>;

interface Props {
  route: ReservationFormScreenRouteProp;
  navigation: ReservationFormScreenNavigationProp;
}

const ReservationFormScreen: React.FC<Props> = ({ route, navigation }) => {
  const { restaurantId, restaurantName } = route.params;

  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [peopleCount, setPeopleCount] = useState('');

  const handleSubmit = async () => {
    try {
      await axios.post(`${API_URL}/reservations`, {
        restaurant_id: restaurantId,
        date,
        time,
        people_count: peopleCount,
      });
      Alert.alert('Επιτυχία', 'Η κράτηση δημιουργήθηκε με επιτυχία');
      navigation.goBack();
    } catch (error) {
      Alert.alert('Σφάλμα', 'Αποτυχία δημιουργίας κράτησης');
    }
  };

  return (
    <View style={{ padding: 20 }}>
      <TextInput
        value={date}
        onChangeText={setDate}
        placeholder="Ημερομηνία (YYYY-MM-DD)"
        style={{ borderWidth: 1, marginBottom: 10, padding: 10 }}
      />
      <TextInput
        value={time}
        onChangeText={setTime}
        placeholder="Ώρα (HH:MM)"
        style={{ borderWidth: 1, marginBottom: 10, padding: 10 }}
      />
      <TextInput
        value={peopleCount}
        onChangeText={setPeopleCount}
        placeholder="Αριθμός ατόμων"
        keyboardType="numeric"
        style={{ borderWidth: 1, marginBottom: 20, padding: 10 }}
      />
      <Button title={`Κράτηση στο ${restaurantName}`} onPress={handleSubmit} />
    </View>
  );
};

export default ReservationFormScreen;
