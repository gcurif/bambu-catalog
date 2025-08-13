import { Dimensions, StyleSheet } from "react-native";

const backgroundColor = "rgba(217, 235, 255, 1)";

export const GlobalPresets = {
  backgroundColor
}


export const GlobalStyles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "flex-start",
    gap: 8,
    backgroundColor: backgroundColor,
    height: Dimensions.get('window').height + 64,
  },
  containerScrollable: {
    flexDirection: "column",
    backgroundColor: backgroundColor,
    height: Dimensions.get('window').height + 64,
  },
  buttonText:{
    color: "#fff",
    fontWeight: "bold",
  }
});

