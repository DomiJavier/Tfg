import React from "react";
import { Text } from "react-native";
import TextInputEstilizado from "./TextInputEstilizado";

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
export default FormikInputValue;