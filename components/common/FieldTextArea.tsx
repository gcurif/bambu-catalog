import { Textarea, TextareaInput } from "@/components/ui/textarea";

import React from "react";
import { StyleSheet } from "react-native";

type FieldTextAreaProps = {
  placeholder: string | undefined;
  value: any;
  onChange: (value: any) => void;
  type: string;
  styles?: StyleSheet.NamedStyles<any>;
};

const FieldTextArea: React.FC<FieldTextAreaProps> = ({
  placeholder,
  value,
  onChange,
  type,
  styles,
}) => {
  return (
    <Textarea size="xl" style={[styles, stylesInternal.input]}>
      <TextareaInput
        placeholder={placeholder}
        value={value}
        style={{ fontSize: 22, fontWeight: "500" }}
        onChangeText={(value) => onChange?.(value)}
      />
    </Textarea>
  );
};

const stylesInternal = StyleSheet.create({
  input: {
    backgroundColor: "rgba(255, 255, 255, 1)",
    borderColor: "rgba(47, 144, 255, 1)",
    borderWidth: 2,
    borderRadius: 8,
    paddingLeft: 8,
    paddingTop: 2,
    fontSize: 15,
    height: 160,
    color: "#000",
  },
});

export default FieldTextArea;
