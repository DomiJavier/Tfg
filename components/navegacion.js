import React, { useState, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import AsyncStorage from '@react-native-async-storage/async-storage';

import Acceso from '../screens/acceso';
import Home from '../screens/home';

const Stack = createStackNavigator();

const Navegacion = () => {
  

  useEffect(() => {
    checkIfLoggedIn();
  }, []);

  const checkIfLoggedIn = async () => {
    // Verificar si el usuario está autenticado (usando AsyncStorage o cualquier otro método)
    const userData = await AsyncStorage.getItem('userData');

    if (userData) {
      setUser(JSON.parse(userData));
    }
  };

  return (
    <NavigationContainer>
      <Stack.Navigator>
        {usuario ? (
          <Stack.Screen name="Home" component={Home} />
        ) : (
          <Stack.Screen
            name="Acceso"
            component={Acceso}
          />
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Navegacion;