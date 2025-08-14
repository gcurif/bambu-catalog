import { Button } from "@/components/ui/button";
import { GlobalStyles } from "@/constants/GlobalStyles";
import { router } from "expo-router";
import React from "react";
import { Image, Platform, StyleSheet, Text, View } from "react-native";
import { Divider } from "./ui/divider";

const ItemDetail: React.FC<{
  item: {
    name: string;
    code: string;
    [key: string]: any;
  };
}> = ({ item }) => {


  console.log('item',item);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{item.name}</Text>
      <Text style={styles.code}>Código: {item.code}</Text>
      <View style={{ display: "flex", flexDirection: "row", flexWrap: "wrap" }}>
        <View style={styles.imageContainer}>
          {item.img ? (
            /*<Image
            source={{ uri: item.img }}
            style={{ width: 250, height: 250 }}
          />*/
            <Image source={item.img} style={{ width: 200, height: 200 }} />
          ) : (
            <Image
              source={require("@/assets/images/default.jpg")}
              style={{ width: 200, height: 200 }}
            />
          )}
        </View>
        <View style={styles.detailsContainer}>
          {Object.entries(item).map(([key, value], index) => (
            <>
              <Text key={index} style={styles.detailText}>
                {key}: {value}
              </Text>
              <Divider className="my-1" />
            </>
          ))}
        </View>
      </View>
      <Button
        size="xl"
        className="p-3.5 mt-4"
        style={{ width: 200 }}
        onPress={() => {
          router.push("/(tabs)/detail/321321");
        }}
      >
        <Text style={GlobalStyles.buttonText}>Ver Imagenes</Text>
      </Button>
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
    fontSize: 18,
  },
  detailText: {
    marginBottom: 4,
    flex: 1,
    fontSize: 18,
    fontWeight: 600,
  },
  imageContainer: {
    justifyContent: "center",
    marginTop: 8,
    marginRight: 16,
  },
  detailsContainer: {
    display: "flex",
    flexDirection: "column",
    marginTop: 8,
  },
});

export default ItemDetail;
