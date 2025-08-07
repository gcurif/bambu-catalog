import { Heading } from "@/components/ui/heading";
import { GlobalStyles } from "@/constants/GlobalStyles";
import { router, useLocalSearchParams } from "expo-router";
import {
  Dimensions,
  Image,
  Pressable,
  ScrollView,
  Text,
  View,
} from "react-native";

export default function DetalleUnidad() {
  const { item } = useLocalSearchParams();

  const { height: wHeight, width: wWidth } = Dimensions.get("window");

  const imgLgHeight = wHeight / 3;

  const marginLeft = 16;
  const marginRight = 16;
  const singleImgWidth = wWidth - marginLeft - marginRight;
  const singleImgHeight = wHeight / 3;

  const imgSep = 8;
  const doubleImgWidth = (wWidth - marginLeft - marginRight - imgSep) / 2;
  const doubleImgHeight = wHeight / 2.5;

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
  return (
    <ScrollView style={GlobalStyles.containerScrollable}>
      <View
        className="justify-start"
        style={{ marginLeft: 16, marginRight: 16 }}
      >
        <Heading size="3xl" className="mt-10 mb-4">
          Galeria
        </Heading>
        <SingleImgView
          imgSrc={imgs[0]}
          width={singleImgWidth}
          height={singleImgHeight}
        />
        <DoubleImgView
          imgSrc1={imgs[3]}
          imgSrc2={imgs[4]}
          width={doubleImgWidth}
          height={doubleImgHeight}
          imgSep={imgSep}
        />
        <SingleImgView
          imgSrc={imgs[2]}
          width={singleImgWidth}
          height={singleImgHeight}
        />
        <SingleImgView
          imgSrc={imgs[7]}
          width={singleImgWidth}
          height={singleImgHeight}
        />
        <DoubleImgView
          imgSrc1={imgs[5]}
          imgSrc2={imgs[6]}
          width={doubleImgWidth}
          height={doubleImgHeight}
          imgSep={imgSep}
        />
      </View>
      <Text style={{ display: "none" }}>Detalle de unidad: {item}</Text>
    </ScrollView>
  );
}

type SingleImgViewProps = {
  imgSrc: any;
  width: number;
  height: number;
};

type DoubleImgViewProps = {
  imgSrc1: any;
  imgSrc2: any;
  width: number;
  height: number;
  imgSep?: number;
};

const SingleImgView = ({ imgSrc, width, height }: SingleImgViewProps) => {
  return (
    <View className="mt-4">
      <Pressable onPress={() => router.push('/(tabs)/detail/img/1')}>
        <Image
          source={imgSrc}
          style={{ width: width, height: height, resizeMode: "stretch" }}
        />
      </Pressable>
    </View>
  );
};

const DoubleImgView = ({
  imgSrc1,
  imgSrc2,
  width,
  height,
  imgSep,
}: DoubleImgViewProps) => {
  return (
    <View className="mt-4 flex-row">
      <Pressable onPress={() => router.push('/(tabs)/detail/img/1')}>
        <Image
          source={imgSrc1}
          style={{ width: width, height: height, resizeMode: "stretch" }}
        />
      </Pressable>
      <Pressable onPress={() => router.push('/(tabs)/detail/img/1')}>
        <Image
          source={imgSrc2}
          style={{
            width: width,
            height: height,
            marginLeft: imgSep || 8,
            resizeMode: "stretch",
          }}
        />
      </Pressable>
    </View>
  );
};
