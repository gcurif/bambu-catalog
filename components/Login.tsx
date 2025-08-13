import { GlobalStyles } from "@/constants/GlobalStyles";
import { getUserByUsrNameAndPass } from "@/data/data";
import { User } from "@/model/schema";
import React from "react";
import { StyleSheet, Text, View } from "react-native";
import Field from "./common/Field";
import { Button } from "./ui/button";

type LoginProps = {
  onLogin: (user: User) => void;
};

const Login: React.FC<LoginProps> = ({ onLogin }) => {

  const [loading, setLoading] = React.useState(false)
  const [username, setUsername] = React.useState("");
  const [password, setPassword] = React.useState("");


  const login = () => {
    setLoading(true);
    getUserByUsrNameAndPass(username, password)
      .then((user) => {
        setLoading(false);
        if (user) {
          onLogin(user);
        } else {
          alert("Usuario o contraseña incorrectos");
        }
      })
      .catch((error) => {
        setLoading(false);
        console.error("Error al iniciar sesión:", error);
        alert("Error al iniciar sesión. Inténtalo de nuevo más tarde.");
      } );

  }

  return (
    <View style={GlobalStyles.container}>
      { loading ? (
      <View style={{ flexDirection: "column", alignItems: "center", marginTop: 32, width: "100%", justifyContent: "center" }}>
        <Field
          placeholder="Usuario"
          value={username}
          onChange={setUsername}
          type="text"
        />
        <Field
          placeholder="Contraseña"
          value={password}
          onChange={setPassword}
          type="password"
        />
        <Button onPress={login}>
          <Text style={GlobalStyles.buttonText}>Iniciar Sesión</Text>
        </Button>
      </View>) : (<Text style={styles.text}>Cargando...</Text>)}
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
