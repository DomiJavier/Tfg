import React from "react";
//import RNPickerSelect from 'react-native-picker-select';
//import DropDownPicker from "react-native-dropdown-picker";
import MultiSelect from "react-native-multiple-select";
import { StyleSheet } from "react-native";



const SelectEstilizado = ({ style={}, ...props }) => {

    return <MultiSelect {...props}/>
}

export default SelectEstilizado;