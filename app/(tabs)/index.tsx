import { Button, ButtonIcon } from "@/components/ui/button";
import { AddIcon, EditIcon, SearchIcon } from "@/components/ui/icon";
import { GlobalPresets } from "@/constants/GlobalStyles";
import { router } from "expo-router";
import React from "react";
import { StyleSheet, Text, View } from "react-native";

const MainMenu = () => (
  <View style={styles.container}>
    <OptionButton
      title="Busqueda"
      icon={SearchIcon}
      onPress={() => router.push("/search")}
    />
    <OptionButton
      title="Agregar Nuevo"
      icon={AddIcon}
      onPress={() => router.push("/add")}
    />
    <OptionButton
      title="Editar Opciones"
      icon={EditIcon}
      onPress={() => router.push("/edit")}
    />
    <OptionButton
      title="Cambiar Usuario"
      icon={EditIcon}
      onPress={() => router.push("/edit")}
    />
    {/*
          {
    <OptionButton
      title="Busqueda Rapida"
      icon={SearchIcon}
      onPress={() => console.log("Settings pressed")}
    />  
      
      */}
  </View>
);

interface OptionButtonProps {
  title: string;
  onPress: () => void;
  icon?: React.ComponentType<any>;
}

const OptionButton: React.FC<OptionButtonProps> = ({
  title,
  onPress,
  icon,
}) => (
  <Button onPress={onPress} style={styles.button} size="xl">
    <ButtonIcon as={icon} size="xl" style={styles.btnIcon} />

    <Text style={styles.buttonText}>{title}</Text>
  </Button>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: GlobalPresets.backgroundColor,
  },
  text: {
    fontSize: 24,
    fontWeight: "bold",
  },
  button: {
    backgroundColor: "#00645cff",
    padding: 16,
    borderRadius: 8,
    marginBottom: 20,
    height: 120,
    width: "90%",
    justifyContent: "center",
    wordWrap: "normal",
  },
  buttonText: {
    color: "#ffffff",
    fontSize: 24,
  },
  btnIcon: {
    height: 42,
    width: 42,
    marginBottom: 8,
  },
});

export default MainMenu;
