import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, Button, Alert, Image, LogBox  } from 'react-native';
import TextInputEstilizado from '../components/TextInputEstilizado';
import { Formik, useField } from 'formik';
import { validacion } from '../components/validacionAcceso';
import { useAuth } from '../components/autorizacion';
import tema from '../tema/tema';

const Acceso = () => {
  LogBox.ignoreAllLogs();
  const { login } = useAuth();
  const handleLogin = async (values) => {
    console.log("Login");
    const usuario=values.usuario;
    const password=values.pass;
    try {
      const response = await fetch('http://192.168.1.145:3000/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ usuario, password }),
      });

      const data = await response.json();
      if (data.success) {
        const userData = { id: 1, name: usuario }; // Simulación de datos del usuario
        login(userData);
        Alert.alert('Credenciales Correctas');
        console.log("Credenciales Correctas");
      } else {
        console.log("Credenciales incorrectas");
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };
  

  const FormikInputValue = ({ name, ...props }) => {
    const [field,meta,helpers] = useField(name)
    return (
      <>
       <TextInputEstilizado
         value={field.value}
          onChangeText={value => helpers.setValue(value)}
          {... props}
       />
        {meta.error && <Text style={tema.error}>{meta.error}</Text>}
      </>
    )
  }
  const initialValues = {
    usuario: '',
    pass: ''
  }
  /*const validate = values => {
    const errors = {}

    if (!values.usuario){
        errors.usuario = "Se necesita un Usuario"
      }
      else if (!/^[A-Z0-9._%+-]{4,25}$/i.test(values.usuario)){
        errors.usuario = "Formáto inválido"
      }
      console.log(errors)
  }*/
    
  
  //
  return (
    
    <Formik initialValues={initialValues} validationSchema={validacion} onSubmit={values => handleLogin(values)}>
    {({ handleChange, handleSubmit, values}) => {
      return (
        <View style={tema.contenedorA}>
          <Image source={require('../assets/img/logo-preview.png')} style={{height:200, width:200, alignSelf: 'center', margin: 10}}/>
      <FormikInputValue
        placeholder="Usuario"
        name="usuario"
      />
      <FormikInputValue
        placeholder="Contraseña"
        secureTextEntry
        name="pass"
      />
      <Button title="Acceso" onPress={handleSubmit} />
    </View>
      )}}
    </Formik>
  );
};

export default Acceso;