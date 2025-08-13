import { GlobalPresets, GlobalStyles } from "@/constants/GlobalStyles";
import { getUserByUsrNameAndPass } from "@/data/data";
import { User } from "@/model/schema";
import React from "react";
import { StyleSheet, Text, View } from "react-native";
import Field from "./common/Field";
import Loading from "./common/Loading";
import SimpleAlert from "./common/SimpleAlert";
import { Button } from "./ui/button";

type LoginProps = {
  onLogin: (user: User) => void;
};

const Login: React.FC<LoginProps> = ({ onLogin }) => {
  const [loading, setLoading] = React.useState(false);
  const [username, setUsername] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [showError, setShowError] = React.useState(false);

  const login = () => {
    setLoading(true);
    getUserByUsrNameAndPass(username, password)
      .then((user) => {
        setLoading(false);
        if (user) {
          onLogin(user);
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
        <View style={{ width: "85%" }}>
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
