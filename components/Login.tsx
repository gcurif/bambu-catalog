import { GlobalStyles } from "@/constants/GlobalStyles";
import React from "react";
import { StyleSheet, Text, View } from "react-native";
import Field from "./common/Field";
import { Button } from "./ui/button";

type LoginProps = {
  onLogin: () => void;
};

const Login: React.FC<LoginProps> = ({ onLogin }) => {
  return (
    <View style={GlobalStyles.container}>
      <View style={{ flexDirection: "column", alignItems: "center", marginTop: 32, width: "100%", justifyContent: "center" }}>
        <Field placeholder="Usuario" value="" onChange={() => {}} type="text" />
        <Field
          placeholder="Contraseña"
          value=""
          onChange={() => {}}
          type="password"
        />
        <Button onPress={() => onLogin?.()}>
          <Text style={GlobalStyles.buttonText}>Iniciar Sesión</Text>
        </Button>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
  },
  text: {
    fontSize: 24,
    color: "#333",
  },
});

export default Login;
