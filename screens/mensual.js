import React, { useEffect, useState } from 'react';
import { Modal, View, Text, Button, StyleSheet, Image, TouchableOpacity, ImageBackground, Dimensions, FlatList, ScrollView } from "react-native";
import { useAuth } from '../components/autorizacion';
import tema from '../tema/tema'
import { BarChart, LineChart } from "react-native-chart-kit";
const Mensual = ({navigation}) => {
 
    const { user, getId } = useAuth();
    const usuario2 = getId();
    const usuario = usuario2["_i"];
    const [options, setOptions] = useState([]);
    const [meses, setMeses] = useState([]);
    const [tabla, setTabla] = useState([]);
    const [modalVisible, setModalVisible] = useState(false);
    
    const convertirNumeroAMes = (numeroDeMes) => {
      const fecha = new Date(2000, numeroDeMes - 1, 1); // Restamos 1 porque los meses en JavaScript son 0-indexados
      const fecha2 = fecha.toLocaleString('es', { month: 'long' }); // Puedes ajustar el locale según tus preferencias
      return fecha2.charAt(0).toUpperCase() + fecha2.slice(1);
    };
    const abrir = () => {
      setModalVisible(true);
    };
  
    const cerrar = () => {
      setModalVisible(false);
    };
    const Datos = async () => {
      try {
        const response = await fetch('http://192.168.1.145:3000/Mensual', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ usuario }),
        });
        datos=await response.json();

        setOptions(datos.map((option) => (option.id)))
        setMeses(datos.map((option) => (convertirNumeroAMes(option.mes))))
        setTabla(datos.map((option) => ({"mes": convertirNumeroAMes(option.mes), "cantidad": option.id})))
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
        <Text style={tema.celda}>{item.mes}</Text>
        <Text style={tema.celda}>{item.cantidad}</Text>
      </View>
    );
    /*const data = {
      labels: ["January", "February", "March", "April", "May", "June"],
      datasets: [
        {
          data: [20, 45, 28, 80, 99, 43]
        }
      ]
    };*/
    const data = {
      labels: [meses],
      datasets: [
        {
          data: options,
        },
      ]
    }
    const chartConfig = {

      backgroundColor: '#ffffff',
          backgroundGradientFrom: '#ffffff',
          backgroundGradientTo: '#ffffff',
          decimalPlaces: 0,
          color: (opacity = 1) => `rgba(108, 148, 255, ${opacity})`,
          labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
          strokeWidth: 0,
          barPercentage: 0.1
    };
    //<Text>Hola {user ? user.name : 'Usuario'} con id {user.id}</Text>

    return (
      <ImageBackground  source={require('../assets/img/fondo.jpg')} resizeMode={'cover'} style={tema.fondo}>
        <View style={tema.contenedor2}>
        
        <FlatList
        data={tabla}
        renderItem={renderItem}
      />
        <Button title="Detalles" onPress={abrir} />
        
        </View>
        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible}
          onRequestClose={cerrar}
        >
          <View style={tema.contenedor2}>
            <BarChart
              data={data}
              width={Dimensions.get("window").width}
              height={256}
              chartConfig={chartConfig}
              fromZero
              absolute
              withVerticalLabels={false}
              withInnerLines={false}
              showValuesOnTopOfBars
        
            />
            <Button title="Cerrar" onPress={cerrar} />
          </View>
        </Modal>
      </ImageBackground>
    );
  }
  export default Mensual;