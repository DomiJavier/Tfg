import React, { useEffect, useState } from 'react';
import { View, Text, Button, StyleSheet, Image, TouchableOpacity, FlatList, ImageBackground, Dimensions, Modal } from "react-native";
import { useAuth } from '../components/autorizacion';
import tema from '../tema/tema'
import { LineChart, PieChart, BarChart } from "react-native-chart-kit";
import { useIsFocused } from '@react-navigation/native';

const Sintomas = () => {
    
    const { user, getId } = useAuth();
    const usuario2 = getId();
    const usuario = usuario2["_i"];
    const [options, setOptions] = useState([]);
    const [modalVisible, setModalVisible] = useState(false);
    const abrir = () => {
      setModalVisible(true);
    };
  
    const cerrar = () => {
      setModalVisible(false);
    };
    const Datos = async () => {
      try {
        const response = await fetch('http://192.168.1.145:3000/SintomasG', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ usuario }),
        });
        datos=await response.json();
        setOptions(datos.map((option) => ({ name: option.sintoma, population: option.contador, legendFontSize: 15, color:option.color})))
      } catch (error) {
        console.error('Error al obtener datos del servidor:', error);
      }
    };
    useEffect(() => {
      Datos();
      const intervalo = setInterval(Datos, 10000);
      return () => clearInterval(intervalo);
    }, []);
    const renderItem = ({ item }) => (
      <View style={tema.fila}>
        <Text style={tema.celda}>{item.name}</Text>
        <Text style={tema.celda}>{item.population}</Text>
      </View>
    );

    const chartConfig = {

      backgroundColor: '#ffffff',
          backgroundGradientFrom: '#ffffff',
          backgroundGradientTo: '#ffffff',
          decimalPlaces: 2,
          color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
          labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,

    };
    //<Text>Hola {user ? user.name : 'Usuario'} con id {user.id}</Text>
    return (
      <ImageBackground  source={require('../assets/img/fondo.jpg')} resizeMode={'cover'} style={tema.fondo}>
        <View style={tema.contenedor2}>

        <PieChart
        data={options}
        width={Dimensions.get("window").width}
        height={220}
        chartConfig={chartConfig}
        accessor={"population"}
        backgroundColor={"transparent"}
      />
      <Button title="Detalles" onPress={abrir} />
        </View>
        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible}
          onRequestClose={cerrar}
        >
          <View style={tema.modal}>
            <FlatList
              data={options}
              renderItem={renderItem}
            />
            <Button title="Cerrar" onPress={cerrar} />
          </View>
        </Modal>
      </ImageBackground>
    );
  }
  export default Sintomas;