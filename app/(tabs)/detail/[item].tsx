import { Heading } from "@/components/ui/heading";
import { GlobalStyles } from "@/constants/GlobalStyles";
import { useLocalSearchParams } from "expo-router";
import { Dimensions, Image, ScrollView, Text, View } from "react-native";

export const unstable_settings = {
  // Esto hace que NO aparezca como un tab
  initialRouteName: "index",
};

export default function DetalleUnidad() {
  const { item } = useLocalSearchParams();

  const wHeight = Dimensions.get("window").height;
  const wWidth = Dimensions.get("window").width;

  const imgLgHeight = wHeight / 3;

  const imgs = [
    require("@/assets/images/detail/1.jpeg"),
    require("@/assets/images/detail/2.jpeg"),
    require("@/assets/images/detail/3.jpeg"),
    require("@/assets/images/detail/4.jpeg"),
    require("@/assets/images/detail/5.jpeg"),
  ];
;
  return (
    <ScrollView style={GlobalStyles.containerScrollable}>
      <View className="justify-start" style={{ marginLeft: 16, marginRight: 16 }}>
        <Heading size="3xl" className="mt-10 mb-4">
          Galeria
        </Heading>
        <View className="mt-4">
          <Image
            source={imgs[0]}
            style={{ width: wWidth - 32, height: imgLgHeight, resizeMode: "stretch" }}
          />
        </View>
        <View className="flex-row mt-4">
          <Image
            source={imgs[3]}
            style={{ width: wWidth*0.5-20, maxHeight: wHeight/2.5, resizeMode: "stretch" }}
          />
          <Image
            source={imgs[4]}
            style={{
              width: wWidth*0.5-20,
              marginLeft: 8,
              maxHeight: wHeight/2.5,
              resizeMode: "stretch",
            }}
          />
        </View>
      </View>
      <Text style={{ display: "none" }}>Detalle de unidad: {item}</Text>
    </ScrollView>
  );
}
