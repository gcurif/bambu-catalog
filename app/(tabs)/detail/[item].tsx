import Loading from "@/components/common/Loading";
import { Heading } from "@/components/ui/heading";
import { GlobalStyles } from "@/constants/GlobalStyles";
import { findItemById } from "@/data/data";
import { Item } from "@/model/schema";
import { router, useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";
import { Dimensions, Image, Pressable, ScrollView, View } from "react-native";

interface ImgSlot {
  imgSrc: string | string[];
  orientation: "single" | "double";
}

export default function DetalleUnidad() {
  const { item: itemId } = useLocalSearchParams();
  const [loading, setLoading] = useState(true);
  const [item, setItem] = useState<Item | null>(null);

  const { height: wHeight, width: wWidth } = Dimensions.get("window");

  const marginLeft = 16;
  const marginRight = 16;
  const singleImgWidth = wWidth - marginLeft - marginRight;
  const singleImgHeight = wHeight / 3;

  const imgSep = 8;
  const doubleImgWidth = (wWidth - marginLeft - marginRight - imgSep) / 2;
  const doubleImgHeight = wHeight / 2.5;

  useEffect(() => {
    findItemById(itemId as string).then((item) => {
      console.log("Item:", item);
      if (!item) {
        console.error("Item not found:", itemId);
        return;
      }
      console.log("Item found:", item);
      setItem(item);
      setLoading(false);
    });
  }, []);

  const imgs2 = item?.imgs || [];
  console.log("Item images:", imgs2);

  const imgSlots: ImgSlot[] = [];
  let lastDoubleSlot: ImgSlot | null = null;

  imgs2.forEach((img, index) => {
    console.log("Processing image:", img, "at index:", index);
    const orientation = img.width > img.height ? "single" : "double";

    if (orientation === "double") {
      if (lastDoubleSlot) {
        imgSlots.push({
          imgSrc: [...lastDoubleSlot.imgSrc, img.publicUrl],
          orientation: "double",
        });
        lastDoubleSlot = null; // Reset after pairing
      } else {
        lastDoubleSlot = { imgSrc: [img.publicUrl], orientation: "double" };
      }
    } else {
      imgSlots.push({ imgSrc: img.publicUrl, orientation });
    }
  });

  const { single = [], double = [] } = Object.groupBy(
    imgSlots,
    (slot) => slot.orientation
  );
  const max = Math.max(single.length, double.length);
  const slotsToshow = [];

  for (let i = 0; i < max; i++) {
    if (single[i]) {
      slotsToshow.push(
        <SingleImgView
          imgSrc={single[i].imgSrc}
          width={singleImgWidth}
          height={singleImgHeight}
          imgId="0"
        />
      );
    }
    if (double[i]) {
      slotsToshow.push(
        <DoubleImgView
          imgSrc1={double[i].imgSrc[0]}
          imgSrc2={double[i].imgSrc[1]}
          width={doubleImgWidth}
          height={doubleImgHeight}
          imgSep={imgSep}
          imgId1="0"
          imgId2="1"
        />
      );
    }
  }

  return (
    <ScrollView style={GlobalStyles.containerScrollable}>
      {loading ? (
        <Loading label="Cargando..." show={loading} />
      ) : (
        <View
          className="justify-start"
          style={{ marginLeft: 16, marginRight: 16 }}
        >
          <Heading size="3xl" className="mt-10 mb-4">
            Galeria
          </Heading>
          {slotsToshow}
        </View>
      )}
    </ScrollView>
  );
}

type SingleImgViewProps = {
  imgSrc: any;
  width: number;
  height: number;
  imgId?: string;
};

type DoubleImgViewProps = {
  imgSrc1: any;
  imgSrc2: any;
  width: number;
  height: number;
  imgSep?: number;
  imgId1?: string;
  imgId2?: string;
};

const SingleImgView = ({
  imgSrc,
  width,
  height,
  imgId,
}: SingleImgViewProps) => {
  return (
    <View className="mt-4">
      <Pressable onPress={() => router.push(`/(tabs)/detail/img/${imgId}`)}>
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
  imgId1,
  imgId2,
  width,
  height,
  imgSep,
}: DoubleImgViewProps) => {
  return (
    <View className="mt-4 flex-row">
      <Pressable onPress={() => router.push(`/(tabs)/detail/img/${imgId1}`)}>
        <Image
          source={imgSrc1}
          style={{ width: width, height: height, resizeMode: "stretch" }}
        />
      </Pressable>
      <Pressable onPress={() => router.push(`/(tabs)/detail/img/${imgId2}`)}>
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
