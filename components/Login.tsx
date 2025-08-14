import { GlobalPresets, GlobalStyles } from "@/constants/GlobalStyles";
import { getUserByUsrNameAndPass } from "@/data/data";
import { User } from "@/model/schema";
import * as SecureStore from "expo-secure-store";
import React, { useEffect } from "react";
import { StyleSheet, Text, View } from "react-native";
import Field from "./common/Field";
import Loading from "./common/Loading";
import SimpleAlert from "./common/SimpleAlert";
import { Button } from "./ui/button";
import { Heading } from "./ui/heading";

type LoginProps = {
  onLogin: (user: User) => void;
};

const Login: React.FC<LoginProps> = ({ onLogin }) => {
  const [loading, setLoading] = React.useState(false);
  const [username, setUsername] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [showError, setShowError] = React.useState(false);

  useEffect(() => {
    setLoading(true);
    // Cargar el usuario desde SecureStore al iniciar el componente
    SecureStore.getItemAsync("user")
      .then((user) => {
        if (user) {
          setLoading(false);
          const parsedUser = JSON.parse(user);
          onLogin(parsedUser);
        }
        setLoading(false);
      })
      .catch((error) => {
        setLoading(false);
        console.error("Error al cargar el usuario de SecureStore:", error);
      });
  }, []);

  const login = () => {
    setLoading(true);
    getUserByUsrNameAndPass(username, password)
      .then((user) => {
        setLoading(false);
        if (user) {
          onLogin(user);
          SecureStore.setItemAsync(
            "user",
            JSON.stringify({ ...user, password: "***" })
          ) // Guardar el usuario en SecureStore
            .then(() => {
              console.log("Usuario guardado en SecureStore");
            })
            .catch((error) => {
              console.error(
                "Error al guardar el usuario en SecureStore:",
                error
              );
            });
        } else {
          setShowError(true);
        }
      })
      .catch((error) => {
        setLoading(false);
        console.error("Error al iniciar sesión:", error);
        setShowError(true);
      });
  };

  return (
    <View
      style={{
        backgroundColor: GlobalPresets.backgroundColor,
        flexDirection: "column",
        alignItems: "center",
        width: "100%",
        height: "100%",
        justifyContent: "center",
      }}
    >
      {loading ? (
        <Loading show={loading} label="Cargando..." />
      ) : (
        <View style={{ width: "85%", height: "60%" }}>
          <Heading size="3xl" className="text-center">
            Iniciar Sesión
          </Heading>
          <Field
            placeholder="Usuario"
            value={username}
            onChange={setUsername}
            type="text"
            className="mt-6"
            autoCapitalize="none"
          />
          <Field
            placeholder="Contraseña"
            value={password}
            onChange={setPassword}
            type="password"
            className="mt-4 mb-4"
          />
          <Button onPress={login} style={{ height: 60 }}>
            <Text style={GlobalStyles.buttonText}>Iniciar Sesión</Text>
          </Button>
        </View>
      )}
      <SimpleAlert
        show={showError}
        title="Incorrecto"
        message="Usuario o contraseña incorrectos"
        onClose={() => setShowError(false)}
      />
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
