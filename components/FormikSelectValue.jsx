import React from "react";
import { useState, Text } from "react";
import MultiSelect from "react-native-multiple-select";

const FormikSelectValue = ({ name, ...props }) => {
    const [field,meta,helpers] = useField(name);
    const [isOpen, setIsOpen] = useState(false);
  
    return (
      <>
       <MultiSelect
         value={field.value}
         onValueChange={value => helpers.setValue(value)}
         open={isOpen}
         setOpen={setIsOpen(!isOpen)}
         maxHeight={100}
          {... props}
       />
        {meta.error && <Text style={styles.error}>{meta.error}</Text>}
      </>
    )
  }
export default FormikSelectValue;