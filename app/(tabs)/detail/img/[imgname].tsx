import { Button } from "@/components/ui/button";
import { CloseIcon, Icon } from "@/components/ui/icon";
import { router, useLocalSearchParams } from "expo-router";
import React from "react";
import { Dimensions, Image, StyleSheet, Text, View } from "react-native";
import Zoom from "react-native-zoom-reanimated";
import resolveAssetSource from "react-native/Libraries/Image/resolveAssetSource";

const ImgZoom = () => {

    const { imgname } = useLocalSearchParams();

    const imgs = [
    require("@/assets/images/detail/1.jpeg"),
    require("@/assets/images/detail/2.jpeg"),
    require("@/assets/images/detail/3.jpeg"),
    require("@/assets/images/detail/4.jpeg"),
    require("@/assets/images/detail/5.jpeg"),
    require("@/assets/images/detail/6.jpeg"),
    require("@/assets/images/detail/7.jpeg"),
    require("@/assets/images/detail/8.jpeg"),
  ];

  const img = imgs[parseInt(imgname as string)];
  const { height: wHeight, width: wWidth } = Dimensions.get("window");
  const { width, height } = resolveAssetSource(img);
  const heightPercentage = (height / width) * wWidth;

  return (
    <View style={styles.container} className="items-start">
      <Button className="ml-2 mt-2 mb-2" onPress={() => router.back()}>
        <Text style={styles.text}>Volver</Text>
        <Icon
          as={CloseIcon}
          size="lg"
          className="stroke-background-400 group-[:hover]/modal-close-button:stroke-background-700 group-[:active]/modal-close-button:stroke-background-900 group-[:focus-visible]/modal-close-button:stroke-background-900"
        />
      </Button>
      <Zoom>
        <Image
          source={img}
          style={{
            width: wWidth,
            height: heightPercentage,
            resizeMode: "contain",
            alignSelf: "flex-start",
          }}
        />
      </Zoom>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "flex-start",
    alignItems: "center",
    flexDirection: "column",
  },
  text: {
    fontSize: 18,
    color: "#fff",
  },
});

export default ImgZoom;
