import React from "react";
import { StyleSheet, TextInput } from "react-native";
import tema from "../tema/tema";


const TextInputEstilizado = ({ style={}, ...props }) => {
    const inputStyle = {
        ...tema.TextInput,
        ...style
    }
    return <TextInput style={inputStyle} {...props}/>
}

export default TextInputEstilizado;