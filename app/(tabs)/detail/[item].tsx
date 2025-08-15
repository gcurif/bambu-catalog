import Loading from "@/components/common/Loading";
import { Heading } from "@/components/ui/heading";
import { GlobalStyles } from "@/constants/GlobalStyles";
import { findItemById } from "@/data/data";
import { Item, ItemImg } from "@/model/schema";
import 'core-js/actual/object/group-by';
import { router, useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";
import {
  Dimensions,
  Image,
  Pressable,
  ScrollView,
  Text,
  View,
} from "react-native";

interface ImgSlot {
  imgs: ItemImg[];
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

  imgs2.forEach((img: ItemImg, index: number) => {
    const orientation = img.width > img.height ? "single" : "double";
    if (orientation === "double") {
      if (lastDoubleSlot) {
        lastDoubleSlot.imgs.push(img);
        imgSlots.push(lastDoubleSlot);
        lastDoubleSlot = null; // Reset after pairing
      } else {
        lastDoubleSlot = { imgs: [img], orientation: "double" };
      }
    } else {
      imgSlots.push({ imgs: [img], orientation });
    }
  });

  const { single = [], double = [] } = Object.groupBy(
    imgSlots,
    (slot) => slot.orientation
  );
  const max = Math.max(single.length, double.length);
  const slotsToshow = [];

  const goToImgZoom = (imgSrc: ItemImg, item: Item) => {
    router.push({
      pathname: "/(tabs)/detail/img/[imgname]",
      params: {
        imgname: imgSrc.publicUrl,
        width: imgSrc.width,
        height: imgSrc.height,
        label: item.name,
      },
    });
  };

  for (let i = 0; i < max; i++) {
    if (single[i]) {
      slotsToshow.push(
        <SingleImgView
          imgSrc={single[i].imgs[0]}
          width={singleImgWidth}
          height={singleImgHeight}
          imgId="0"
          onClick={(img) => goToImgZoom(img, item as Item)}
        />
      );
    }
    if (double[i]) {
      slotsToshow.push(
        <DoubleImgView
          imgSrc1={double[i].imgs[0]}
          imgSrc2={double[i].imgs[1]}
          width={doubleImgWidth}
          height={doubleImgHeight}
          imgSep={imgSep}
          imgId1="0"
          imgId2="1"
          onClick={(img) => goToImgZoom(img, item as Item)}
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
          <Text style={{ fontSize: 24 }}>{item?.name}</Text>
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
  onClick: (imgSrc: any) => void;
};

type DoubleImgViewProps = {
  imgSrc1: any;
  imgSrc2: any;
  width: number;
  height: number;
  imgSep?: number;
  imgId1?: string;
  imgId2?: string;
  onClick: (imgSrc: any) => void;
};

const SingleImgView = ({
  imgSrc,
  width,
  height,
  imgId,
  onClick,
}: SingleImgViewProps) => {
  return (
    <View className="mt-4">
      <Pressable onPress={() => onClick(imgSrc)}>
        <Image
          source={{ uri: imgSrc.publicUrl }}
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
  onClick,
}: DoubleImgViewProps) => {
  return (
    <View className="mt-4 flex-row">
      <Pressable onPress={() => onClick(imgSrc1)}>
        <Image
          source={{ uri: imgSrc1.publicUrl }}
          style={{ width: width, height: height, resizeMode: "stretch" }}
        />
      </Pressable>
      {imgSrc2 && (
        <Pressable onPress={() => onClick(imgSrc2)}>
          <Image
            source={{ uri: imgSrc2.publicUrl }}
            style={{
              width: width,
              height: height,
              marginLeft: imgSep || 8,
              resizeMode: "stretch",
            }}
          />
        </Pressable>
      )}
    </View>
  );
};
