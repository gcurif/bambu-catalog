import { useLocalSearchParams } from "expo-router";
import React from "react";
import { Dimensions, Image, ImageSourcePropType, StyleSheet, View } from "react-native";
import Zoom from "react-native-zoom-reanimated";

const ImgZoom = () => {

  const { imgname, width, height } = useLocalSearchParams();
  const { height: wHeight, width: wWidth } = Dimensions.get("window");


  //const { width, height } = resolveAssetSource(imgname);
  const heightPercentage = (parseInt(height as string, 10) / parseInt(width as string, 10)) * wWidth;

  return (
    <View style={styles.container} className="items-start">
      
      <Zoom>
        <Image
          source={imgname as ImageSourcePropType}
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
