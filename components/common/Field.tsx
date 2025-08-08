import { Input, InputField } from "@/components/ui/input";
import React from 'react';
import { StyleSheet } from "react-native";

type FieldProps = {
  placeholder: string | undefined;
  value: any;
  onChange: (value: any) => void;
  type: string;
  styles?: StyleSheet.NamedStyles<any>;
};

const Field: React.FC<FieldProps> = ({ placeholder, value, onChange, type, styles }) => {

    const validateNumber = (value: string) => {
      const trimmed = value.trim();
      return (trimmed === "" || /^-?\d+(\.\d+)?$/.test(trimmed));
    };

    const handleNumberChange = (value: string) => {
      if (validateNumber(value)) {
        onChange?.(value);
      }
    };

    return (
            <Input
              variant="outline"
              size="3xl"
              style={[styles, stylesInternal.input]}
            >
              <InputField
                placeholder={placeholder}
                value={value}
                onChangeText={(value) =>
                  type === "number"
                    ? handleNumberChange(value)
                    : onChange?.(value)
                }
              />
            </Input>
    );
};

const stylesInternal = StyleSheet.create({
  input: {
    backgroundColor: "rgba(255, 255, 255, 1)",
    borderColor: "rgba(217, 235, 255, 1)",
    borderWidth: 1,
    borderRadius: 8,
    padding: 8,
    fontSize: 16,
    color: "#000",
  }
});


export default Field;