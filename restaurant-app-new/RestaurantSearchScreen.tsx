import React from 'react';
import { View, Text, Button } from 'react-native';
import { useNavigation, NavigationProp } from '@react-navigation/native';

// Ονόματα οθονών που έχεις στο Stack
type RootStackParamList = {
  Auth: undefined;
  Search: undefined;
  Reserve: undefined;
  // πρόσθεσε κι άλλες αν έχεις
};

const RestaurantSearchScreen = () => {
  // Δίνουμε τον τύπο πού θα περιμένει το navigation
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();

  return (
    <View style={{ padding: 40 }}>
      <Text style={{ fontSize: 18, marginBottom: 20 }}>
        🔍 Welcome to the Search Screen
      </Text>
      <Button title="Make a Reservation" onPress={() => navigation.navigate('Reserve')} />
    </View>
  );
};

export default RestaurantSearchScreen;
