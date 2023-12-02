import React, {useEffect} from 'react';

import { NavigationContainer } from '@react-navigation/native';
import { AuthProvider, useAuth } from './components/autorizacion';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from '@expo/vector-icons/Ionicons';
import { configurePushNotifications } from './components/notificaciones';

const Tab = createBottomTabNavigator();

import Acceso from './screens/acceso'
import Home from './screens/home';
import Crisis from './screens/crisis';
import Mensual from './screens/mensual';
import Sintomas from './screens/sintomas';
import Horario from './screens/horario';
import Medicacion from './screens/medicacion';
/*useEffect(() => {
    configurePushNotifications();
  }, []);*/
const App = () => {
  return (
    <NavigationContainer>
      <AuthProvider>
        <MainNavigator />
      </AuthProvider>
    </NavigationContainer>
    
  );
}

const MainNavigator = () => {

  const { isAuthenticated } = useAuth();
  return (
    <Tab.Navigator
      screenOptions={({route}) => ({
        headerShown: false,
        //tabBarShowLabel: false,
        tabBarIcon: ({color, focused, size}) => {
          let icono;
          if (route.name=== "Inicio"){
            icono = "home"
          }
          else if(route.name=== "Crisis"){
            icono = "body"
          }
          else if(route.name=== "Acceso"){
            icono = "at-circle"
          }
          else if(route.name=== "Mensual"){
            icono = "analytics"
          }
          else if(route.name=== "Síntomas"){
            icono = "clipboard"
          }
          else if(route.name=== "Horario"){
            icono = "alarm"
          }
          else if(route.name=== "Medicación"){
            icono = "bandage"
          }
          else{
            icono = "settings"
          }
          return <Ionicons name={icono} color={color} size={size}/>
        }
      })}
    >
      {isAuthenticated ? (
        <>
          <Tab.Screen name="Inicio" component={Home}/>
          <Tab.Screen name="Crisis" component={Crisis}/>
          <Tab.Screen name="Mensual" component={Mensual}/>
          <Tab.Screen name="Síntomas" component={Sintomas}/>
          <Tab.Screen name="Horario" component={Horario}/>
          <Tab.Screen name="Medicación" component={Medicacion}/>
        </>
      ) : (
        <>
        <Tab.Screen name="Acceso" component={Acceso}/>
        </>
      )}
    </Tab.Navigator>
  );
};

export default App;