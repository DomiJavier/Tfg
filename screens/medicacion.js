import React, { useEffect, useState } from 'react';
import { View, Text, Button, StyleSheet, Image, TouchableOpacity, ImageBackground, Dimensions, FlatList, Modal, Alert } from "react-native";
import { useAuth } from '../components/autorizacion';
import tema from '../tema/tema'
import PushNotification from 'react-native-push-notification';
import { Formik, useField } from 'formik';
import DateTimePicker from '@react-native-community/datetimepicker';
import TextInputEstilizado from '../components/TextInputEstilizado';
import { validacion } from '../components/validacionMedicacion';


const Medicacion = () => {
  const { user, getId } = useAuth();
  const usuario2 = getId();
  const usuario = usuario2["_i"];
  const [modalVisible, setModalVisible] = useState(false);
  const [options, setOptions] = useState([]);
  const [tabla, setTabla] = useState([]);
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [selectedDate, setSelectedDate] = useState(new Date());
    const abrir = () => {
      setModalVisible(true);
    };
  
    const cerrar = () => {
      setModalVisible(false);
    };
    const handleMedicacion = async (values) => {
      const hora=values.hora;
      const fecha=values.date;
      const medicacion=values.medicacion;
      const usuario2 = getId();
      const usuario = usuario2["_i"];
      try {
        const response2 = await fetch('http://192.168.1.145:3000/NuevaMedicacion', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ hora, fecha, medicacion, usuario }),
        });
        Alert.alert("Datos introducidos");
      } catch (error) {
        console.error('Error:', error);
      }
    };
    /*const Notificaciones = async () => {
      console.log("LLEGA");
          try {
            const response2 = await fetch('http://192.168.1.145:3000/Notificaciones', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({ usuario }),
            });
    
            const data = await response2.json();
            console.log(data);
            // Cancela las notificaciones programadas previamente
            //CancelarNotificaciones();
            contador=1;
        // Programa nuevas notificaciones basadas en los datos
        console.log(contador);
        data.forEach((item) => {
          contador++;
          const fecha = new Date(item.fecha);
          fecha.setHours(item.hora);
          fecha.setMinutes(58);
          console.log(fecha);
          PushNotification.localNotificationSchedule({
            id: `${contador}`, // Asigna un ID único a cada notificación
            message: `Recordatorio: ${item.medicacion}`,
            date: fecha,
          });
          
        });
    
      } catch (error) {
        console.log("ERROR:DESPUÉS");
        console.error('Error al programar notificaciones:', error);
      }
    };
    const CancelarNotificaciones = () => {
      PushNotification.cancelAllLocalNotifications();
    };*/
    //Recoger Datos
    const Datos = async () => {
      try {
        const response = await fetch('http://192.168.1.145:3000/Medicacion', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ usuario }),
        });
        datos=await response.json();
        setTabla(datos.map((tabla) => ({ hora: tabla.hora, medicacion: tabla.medicacion, fecha: tabla.fecha})))
      } catch (error) {
        //console.error('Error al obtener datos del servidor:', error);
        setTabla({"medicacion": "vacío", hora: 0, "fecha": ''})
      }
    };
    useEffect(() => {
      Datos();
      const intervalo = setInterval(Datos, 10000);
      return () => clearInterval(intervalo);
    }, []);
    // Recoger Datos
    const renderItem = ({ item }) => (
      <View style={tema.fila}>
        <Text style={tema.celda}>{item.hora}</Text>
        <Text style={tema.celda}>{item.medicacion}</Text>
        <Text style={tema.celda}>{item.fecha}</Text>
      </View>
    );
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
      hora: '',
      date: new Date(),
      medicacion: ''
    }
    //<Text>Hola {user ? user.name : 'Usuario'} con id {user.id}</Text>
    //<Button style={tema.boton} title="Programar Notificaciones" onPress={Notificaciones} />
    return (
      <ImageBackground  source={require('../assets/img/fondo.jpg')} resizeMode={'cover'} style={tema.fondo}>
        <View style={tema.contenedor}> 
          <FlatList
            ListHeaderComponent={() => <View style={tema.cabecera}>
            <Text style={tema.cabeceraTexto}>Hora</Text>
            <Text style={tema.cabeceraTexto}>Medicación</Text>
            <Text style={tema.cabeceraTexto}>Fecha</Text>
          </View>}
            data={tabla}
            renderItem={renderItem}
          />
          <Button style={tema.boton} title="Abrir" onPress={abrir} />
        </View>
        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible}
          onRequestClose={cerrar}
        >
          
          <Formik initialValues={initialValues} validationSchema={validacion} onSubmit={values => handleMedicacion(values)}>
    {({ handleChange, handleSubmit, values, handleBlur, errors}) => {
      return (
        <View style={tema.modalForm}>
        
        
      <FormikInputValue
        placeholder="Hora"
        name="hora"
        keyboardType="numeric"
      />
      <Button
            title="Abrir Selector de Fechas"
            color="#00a200"
            onPress={() => setShowDatePicker(true)}
          />

          {showDatePicker && (
            <DateTimePicker
              name="date"
              value={selectedDate}
              mode="date"
              display="default"
              locale="es-ES"
              onChange={(event, selectedDate) => {
                setShowDatePicker(false);
                if (event.type === 'set' && selectedDate) {
                  setSelectedDate(selectedDate);
                  values.date=selectedDate;
                  handleChange("date");
                }
              }}
            />
            )}
      <FormikInputValue
        placeholder="Medicación"
        name="medicacion"
      />
      <View style={tema.Boton}><Button title="Registrar" onPress={handleSubmit} /></View>
      <View style={tema.Boton}><Button color="#ff5c5c" title="Cerrar" onPress={cerrar} /></View>
      </View>
      )}}
    </Formik>
            
          
        </Modal>
      </ImageBackground>
    );
  }
  export default Medicacion;