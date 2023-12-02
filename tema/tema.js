import React from "react";
import { StyleSheet } from "react-native";

const tema = StyleSheet.create({
    fondo: {
      flex: 1,
      justifyContent: 'center',
    },
    contenedorA: {
      flex: 1,
      justifyContent: 'center',
      margin: 12,
    },
    Temporizador: {
      margin: 5,
      padding: 20,
    },
    Boton: {
      margin: 8,
    },
    Scontenedor: {
      margin: 30,
      backgroundColor: 'rgba(255, 255, 255, 0.8)',
      borderRadius: 10,
      paddingBottom: 40,
      paddingLeft: 40,
      paddingRight: 40
    },
    contenedor: {
        margin: 30,
        backgroundColor: 'rgba(255, 255, 255, 0.8)',
        borderRadius: 10,
        padding: 40
      },
      contenedor2: {
        backgroundColor: 'rgba(255, 255, 255, 0.8)',
        borderRadius: 10,
      },
      modal: {
        backgroundColor: 'rgba(255, 255, 255, 1)',
        borderRadius: 10,
        margin:5
      },
      modalForm: {
        margin: 5,
        backgroundColor: 'rgba(255, 255, 255, 1)',
        borderRadius: 10,
        padding: 40,
      },
    error: {
      color: 'red'
    },
    cerrar: {
      alignItems: 'center',
      backgroundColor: '#ff5c5c',
      padding: 10
    },
    TextInput:{
        borderRadius: 8,
        borderWidth: 1,
        borderColor: 'black',
        backgroundColor: '#ffff',
        paddingHorizontal: 20,
        paddingVertical: 10, 
        marginTop: 5,
        marginBottom: 5
    },
    cabecera: {
      flexDirection: 'row',
      paddingVertical: 8,
      borderBottomWidth: 1,
      borderBottomColor: '#ccc',
    },
    cabeceraTexto: {
      fontWeight: 'bold',
      flex: 1,
      textAlign:"center"
    },
    fila: {
      flexDirection: 'row',
      paddingVertical: 8,
      borderBottomWidth: 1,
      borderBottomColor: '#eee',
    },
    celda: {
      flex: 1,
      textAlign:"center",
    },
  });

  export default tema;