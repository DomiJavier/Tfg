import React, { useEffect, useState } from 'react';
import { View, Text, Button, StyleSheet, ScrollView, Alert, ImageBackground, TouchableOpacity, Image } from "react-native";
import { useAuth } from '../components/autorizacion';
import { Formik, useField, useFormikContext } from 'formik';
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import SelectEstilizado from '../components/SelectEstilizado';
import TextInputEstilizado from '../components/TextInputEstilizado';
import { validacion } from '../components/validacionCrisis';
import tema from '../tema/tema';


const Crisis = () => {
    const { user, getId } = useAuth();
    const [options, setOptions] = useState([]);
    //TIEMPO
    const [segundos, setSegundos] = useState(0);
    const [timerRunning, setTimerRunning] = useState(true);
    const navigation = useNavigation();
    useEffect(() => {
      let interval;
      if (timerRunning) {
        interval = setInterval(() => {
          setSegundos((prevSegundos) => prevSegundos + 1);
        }, 1000);
      }
      return () => clearInterval(interval);
    }, [timerRunning]);
  
    const iniciarParar = () => {
      setTimerRunning((prevTimerRunning) => !prevTimerRunning);
    };
  
    const segundosMinutos = (segundos) => {
      return Math.floor(segundos / 60);
    };
    const tiempo = (segundos) => {
      const minutos = Math.floor(segundos / 60);
      const segundosRestantes = segundos % 60;
      return `${minutos} Minuto/s y ${segundosRestantes} segundo/s`;
    };

    useFocusEffect(
      React.useCallback(() => {
        setSegundos(0);
        setTimerRunning(true);
        return () => {
          // Limpiar temporizador al salir de la pantalla
          setTimerRunning(false);
        };
      }, [])
    );
    //

    const handleCrisis = async (values) => {
      const duracion=values.duracion;
      const sintomas=values.sintomas;
      const usuario2 = getId();
      const usuario = usuario2["_i"];
      Alert.alert("Crisis recogida");
      try {
        const response2 = await fetch('http://192.168.1.145:3000/crisis', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ duracion, usuario, sintomas }),
        });

        const data = await response2.json();
        console.log("Crisis recogida");
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
    const FormikSelectValue = ({ name, ...props }) => {
      const [field,meta,helpers] = useField(name)
      const { setFieldValue } = useFormikContext();

      const onSelectedItemsChange = (selectedItems) => {
        // Set Selected Items
        setSelectedItems(selectedItems);
      };
      return (
        <>
         <SelectEstilizado
          uniqueKey="id"
          selectedItems={field.value}
          selectText="Seleccionar Síntomas"
          searchInputPlaceholderText="Buscar..."
          onSelectedItemsChange={(selectedItems) => setFieldValue(name, selectedItems)}
          selectedItems={field.value}
            {... props}
         />
          {meta.error && <Text style={tema.error}>{meta.error}</Text>}
        </>
      )
    }
    const initialValues = {
      duracion: '',
      sintomas: []
    }
    useEffect(() => {
        // Obtener las opciones desde el servidor API
        fetch('http://192.168.1.145:3000/sintomas')
          .then((response) => response.json())
          .then((data) => setOptions(data))
          .catch((error) => console.error(error));
      }, []);
      return (
        <Formik initialValues={initialValues} validationSchema={validacion} onSubmit={values => handleCrisis(values)}>
        {({ handleChange, handleSubmit, values}) => {
          return (
            <ImageBackground  source={require('../assets/img/fondo.jpg')} resizeMode={'cover'} style={tema.fondo}>
   <ScrollView style={tema.Scontenedor}> 
    <View style={tema.Temporizador}>
      <Text style={timerRunning ? ({color:'red'}) : ({color:'blue'}) }>Tiempo transcurrido: {tiempo(segundos)} </Text>
    </View>
   <TouchableOpacity onPress={iniciarParar}><Image source={require('../assets/img/crisis.png')} style={{height:200, width:200, alignSelf: 'center', margin: 10}}/></TouchableOpacity>
          <FormikInputValue
            placeholder="Duración"
            name="duracion"
            keyboardType="numeric"
          />
          <FormikSelectValue
            submitButtonColor="rgb(82, 106, 255)"
            submitButtonText="Guardar"
            styleMainWrapper={tema.TextInput}
            name="sintomas"
            items={options.map((option) => ({ name: option.sintoma, id: option.id}))}
          />
          <View style={tema.Boton}>
            <Button title="Registrar" onPress={handleSubmit} />
          </View>
          </ScrollView>
        </ImageBackground>
          )}}
        </Formik>
      );
    /*const handleLogin = async (values) => {
      const usuario=values.usuario;
      const password=values.pass;
      try {
        const response = await fetch('http://192.168.1.145:3000/sintomas', {
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
        } else {
          Alert.alert('Credenciales incorrectas');
        }
      } catch (error) {
        console.error('Error:', error);
      }
    };*/
  };
  export default Crisis;