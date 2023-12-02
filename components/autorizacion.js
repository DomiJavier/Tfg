/*import { createContext, useContext, useState } from 'react';

const AuthContext = createContext();

export const Autorizacion = ({ children }) => {
  const [isAuthenticated, setAuthenticated] = useState(false);

  const login = () => {
    setAuthenticated(true);
  };

  const logout = () => {
    setAuthenticated(false);
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};*/
import React, { createContext, useContext, useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isAuthenticated, setAuthenticated] = useState(false);

  useEffect(() => {
    // Recuperar datos del usuario al inicio de la aplicación
    retrieveUser();
  }, []);

  const login = async (userData) => {
    // Guardar datos del usuario
    await AsyncStorage.setItem('user', JSON.stringify(userData));
    await AsyncStorage.setItem('isAuthenticated', 'true');
    setUser(userData);
    setAuthenticated(true);
  };

  const logout = async () => {
    // Eliminar datos del usuario al cerrar sesión
    await AsyncStorage.removeItem('user');
    await AsyncStorage.setItem('isAuthenticated', 'false');
    setUser(null);
    setAuthenticated(false);
  };
  const getId = async () => {
    return user.id;
  };
  const retrieveUser = async () => {
    // Recuperar datos del usuario almacenados
    const userData = await AsyncStorage.getItem('user');
    const authState = await AsyncStorage.getItem('isAuthenticated');
    
    if (userData && authState === 'true') {
      setUser(JSON.parse(userData));
      setAuthenticated(true);
    }
  };

  return (
    <AuthContext.Provider value={{ user, isAuthenticated, login, logout, getId }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};





