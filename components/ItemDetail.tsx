import React from "react";
import { Image, Platform, StyleSheet, Text, View } from "react-native";

const ItemDetail: React.FC = () => {
  const item = {
    id: 1,
    code: "ITEM001",
    name: "Item Name",
    img: null,
    properties: [
      { name: "Marca", value: "Marca 1", order: 1 },
      { name: "Modelo", value: "Modelo 1", order: 2 },
      { name: "Año", value: "1990", order: 3 },
      { name: "Cilindrada", value: "432432", order: 4 },
      { name: "Color", value: "342234", order: 5 },
      { name: "Combustible", value: "dsfdsf", order: 6 },
    ],
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{item.name}</Text>
      <Text style={styles.code}>Código: {item.code}</Text>
      <View style={styles.imageContainer}>
        {item.img ? (
          <Image
            source={{ uri: item.img }}
            style={{ width: 250, height: 250 }}
          />
        ) : (
          <Image
            source={require("@/assets/images/default.jpg")}
            style={{ width: 250, height: 250 }}
          />
        )}
      </View>
      <View style={styles.detailsContainer}>
        {item.properties.map((property, index) => (
          <Text key={index} style={styles.detailText}>
            {property.name}: {property.value}
          </Text>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    display: "flex",
    flexDirection: "column",
    padding: 16,
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 8,
    backgroundColor: "#fff",
    marginHorizontal: 16,
    marginBottom: 16,
    ...Platform.select({
      android: {
        elevation: 6,
      },
      ios: {
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 4,
      },
    }),
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 8,
  },
  code: {
    marginBottom: 4,
  },
  detailText: {
    marginBottom: 4,
    flex: 1,
  },
  imageContainer: {
    justifyContent: "center",
    marginTop: 8,
  },
  detailsContainer: {
    display: "flex",
    flexDirection: "column",
    marginTop: 8,
  },
});

export default ItemDetail;
