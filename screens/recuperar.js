import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, Button, Alert, Image, LogBox  } from 'react-native';
import TextInputEstilizado from '../components/TextInputEstilizado';
import { Formik, useField } from 'formik';
import { validacion } from '../components/validacionAcceso';
import { useAuth } from '../components/autorizacion';
import tema from '../tema/tema';



const Recuperar = () => {

    const handleRecuperar = async (values) => {
      console.log("Recuperar");
      const usuario=values.usuario;
      const password=values.pass;
      try {
        const response = await fetch('http://192.168.1.145:3000/recuperar', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ usuario, password }),
        });
  
        const data = await response.json();
        if (data.success) {
          Alert.alert('Contraseña cambiada');
          console.log("Contraseña cambiada");
        } else {
          console.log("Contraseña no cambiada");
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
      pass: ''
    }
    return (
      
      <Formik initialValues={initialValues} validationSchema={validacion} onSubmit={values => handleRecuperar(values)}>
      {({ handleChange, handleSubmit, values}) => {
        return (
          <View style={tema.contenedorA}>
            <View style={tema.contenedorM}><Text style={tema.TextoPasado}> Recuperar Contraseña </Text></View>
            <FormikInputValue
              placeholder="Usuario"
              name="usuario"
            />
            <FormikInputValue
              placeholder="Contraseña"
              secureTextEntry
              name="pass"
            />
          <Button title="Recuperar" color="" onPress={handleSubmit} />
      </View>
        )}}
      </Formik>
    );
  };
  export default Recuperar;