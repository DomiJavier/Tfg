import React from "react";
import { StyleSheet, TextInput } from "react-native";

const styles = StyleSheet.create({
    Input:{
        margin: 5
    }
})

const TextEstilizado = ({ style={}, ...props }) => {
    const inputStyle = {
        ...styles.Input,
        ...style
    }
    return <TextInput style={inputStyle} {...props}/>
}

export default TextEstilizado;