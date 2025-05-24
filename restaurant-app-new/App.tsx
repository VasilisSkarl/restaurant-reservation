import React, { useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import AsyncStorage from '@react-native-async-storage/async-storage';

import AuthScreen from './app/AuthScreen';
import RestaurantSearchScreen from './RestaurantSearchScreen';
import ReservationFormScreen from './ReservationFormScreen';

const Stack = createNativeStackNavigator();

export default function App() {
  // Αρχικά δεν ξέρουμε ποιο route να φορτώσουμε
  const [initialRoute, setInitialRoute] = useState<string | null>(null);

  useEffect(() => {
    // Έλεγχος αν υπάρχει token στο AsyncStorage
    AsyncStorage.getItem('jwt_token').then(token => {
      console.log('JWT Token found:', token);
      if (token) {
        setInitialRoute('Search');  // Αν υπάρχει token, πάμε στην αναζήτηση
      } else {
        setInitialRoute('Auth');    // Αν όχι, πάμε στο login/register
      }
    });
  }, []);

  if (!initialRoute) {
    // Εδώ μπορείς να βάλεις ένα loading spinner ή απλά null μέχρι να διαπιστωθεί το αρχικό route
    return null;
  }

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName={initialRoute}>
        <Stack.Screen
          name="Auth"
          component={AuthScreen}
          options={{ headerShown: false }} // Προαιρετικό: κρύβει το header
        />
        <Stack.Screen
          name="Search"
          component={RestaurantSearchScreen}
          options={{ title: 'Search Restaurants' }}
        />
        <Stack.Screen
          name="Reserve"
          component={ReservationFormScreen}
          options={{ title: 'Make a Reservation' }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
