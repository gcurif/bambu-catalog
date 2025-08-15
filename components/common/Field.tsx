import { Input, InputField } from "@/components/ui/input";
import React from "react";
import { StyleSheet } from "react-native";

type FieldProps = {
  placeholder: string | undefined;
  value: any;
  onChange: (value: any) => void;
  type: "text" | "number" | "password";
  styles?: StyleSheet.NamedStyles<any>;
  className?: string;
  autoCapitalize?: "none" | "sentences" | "words" | "characters";
  inputRef?: React.RefObject<any>;
  lgBorder?: boolean;
};

const Field: React.FC<FieldProps & { inputRef?: any }> = ({
  placeholder,
  value,
  onChange,
  type = "text",
  styles,
  className,
  autoCapitalize,
  inputRef,
  lgBorder = false,
}) => {
  const validateNumber = (value: string) => {
    const trimmed = value.trim();
    return trimmed === "" || /^-?\d+(\.\d+)?$/.test(trimmed);
  };

  const handleNumberChange = (value: string) => {
    if (validateNumber(value)) {
      onChange?.(value === "" ? "" : Number(value));
    }
  };

  return (
    <Input
      variant="outline"
      size="3xl"
      style={[styles, lgBorder ? stylesInternal.inputLgBorder : stylesInternal.input]}
      className={className}
      type={type}
    >
      <InputField
        ref={inputRef}
        placeholder={placeholder}
        value={value}
        type={type === "password" ? "password" : "text"}
        onChangeText={(value) =>
          type === "number" ? handleNumberChange(value) : onChange?.(value)
        }
        keyboardType={type === "number" ? "numeric" : "default"}
        autoCapitalize={autoCapitalize}
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
    fontSize: 15,
    height: 68,
    color: "#000",
  },
  inputLgBorder: {
    backgroundColor: "rgba(255, 255, 255, 1)",
    borderColor: "rgba(47, 144, 255, 1)",
    borderWidth: 2,
    borderRadius: 8,
    padding: 8,
    fontSize: 15,
    height: 68,
    color: "#000",
  },
});

export default Field;
