import { StyleSheet } from "react-native";

const backgroundColor = "rgba(217, 235, 255, 1)";


export const GlobalStyles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "flex-start",
    gap: 8,
    backgroundColor: backgroundColor,
    height: "100%",
  },
  containerScrollable: {
    flexDirection: "column",
    backgroundColor: backgroundColor,
    height: "100%",
  },
  buttonText:{
    color: "#fff",
    fontWeight: "bold",
  }
});
