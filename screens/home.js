import { View, Text, Button, StyleSheet, Image, TouchableOpacity, ImageBackground, Dimensions } from "react-native";
import { useAuth } from '../components/autorizacion';
import tema from '../tema/tema'

const Home = ({navigation}) => {
    const { user, logout } = useAuth();

    //<Text>Hola {user ? user.name : 'Usuario'} con id {user.id}</Text>
    return (
      <ImageBackground  source={require('../assets/img/fondo.jpg')} resizeMode={'cover'} style={tema.fondo}>
        <View style={tema.contenedor}> 
        <TouchableOpacity onPress={()=>{navigation.navigate('Crisis')}}><Image source={require('../assets/img/crisis.png')} style={{height:200, width:200, alignSelf: 'center', margin: 10}}/></TouchableOpacity>
        <Button title="Cerrar sesión" onPress={logout} />
        </View>
      </ImageBackground>
    );
  }
  export default Home;