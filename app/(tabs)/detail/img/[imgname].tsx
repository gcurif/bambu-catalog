import { Button } from "@/components/ui/button";
import { CloseIcon, Icon } from "@/components/ui/icon";
import React from "react";
import { Image, StyleSheet, Text, View } from "react-native";
import resolveAssetSource from "react-native/Libraries/Image/resolveAssetSource";

const ImgZoom = () => {
  const img = require("@/assets/images/detail/1.jpeg");
  const { width, height } = resolveAssetSource(img);
  const heightPercentage = (height / width) * 100;

  return (
    <View style={styles.container} className="items-start">
      <Button>
        <Text>adsfdsfsdsada</Text>
        <Icon
          as={CloseIcon}
          size="lg"
          className="stroke-background-400 group-[:hover]/modal-close-button:stroke-background-700 group-[:active]/modal-close-button:stroke-background-900 group-[:focus-visible]/modal-close-button:stroke-background-900"
        />
      </Button>

      <Image
        source={img}
        style={{
          width: "100%",
          height: heightPercentage + "%",
          resizeMode: "contain",
          alignSelf: "flex-start",
        }}
      />
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
    fontSize: 24,
  },
});

export default ImgZoom;
