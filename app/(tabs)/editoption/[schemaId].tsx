import { Button, ButtonIcon } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Heading } from "@/components/ui/heading";
import { EditIcon, StarIcon, TrashIcon } from "@/components/ui/icon";
import { Text } from "@/components/ui/text";
import { GlobalPresets } from "@/constants/GlobalStyles";
import { getSchemaItemById } from "@/data/data";
import { FilterSchemaItem, FilterSchemaOption } from "@/model/schema";
import { useLocalSearchParams } from "expo-router";
import React, { useEffect, useState } from "react";
import { ScrollView, View } from "react-native";

export default function EditOptionScreen() {
  const { schemaId } = useLocalSearchParams();
  const [schemaItem, setSchemaItem] = useState<FilterSchemaItem | null>(null);

  useEffect(() => {
    getSchemaItemById(schemaId as string)
      .then((item) => {
        if (!item) {
          console.error(`No schema found with id: ${schemaId}`);
        } else {
          console.log("Schema item:", item);
          setSchemaItem(item);
        }
      })
      .catch((error) => {
        console.error("Error fetching schema item:", error);
      });
  }, []);

  console.log("Schema item:", schemaItem);

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: GlobalPresets.backgroundColor,
        padding: 16,
      }}
    >
      <Heading size="xl">
        Lista de opciones disponibles para: {schemaItem?.name}
      </Heading>
      {schemaItem && (
        <ScrollView style={{ marginTop: 16, maxHeight: "80%" }}>
          {schemaItem.options
            ?.sort((opt) => (opt.fav ? -1 : 1))
            .map((opt, index) => (
              <Option key={index} opt={opt} />
            ))}
        </ScrollView>
      )}
      <Button style={{ height: 50 }} onPress={() => null} className="mt-4">
        <Text size="xl" style={{ color: "#fff" }}>
          Agregar nueva opción
        </Text>
      </Button>
    </View>
  );
}

const Option = ({ opt }: { opt: FilterSchemaOption }) => {
  return (
    <Card className="mt-2 p-4">
      <View
        style={{
          flex: 1,
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <Text style={{ fontSize: 24 }}> {opt.name}</Text>
        <View style={{ flexDirection: "row", justifyContent: "flex-end" }}>
          <Button size="md" style={{ marginHorizontal: 4 }}>
            <ButtonIcon
              as={StarIcon}
              size="xl"
              color={opt.fav ? "#FFD700" : "#fff"}
            />
          </Button>
          <Button size="md" style={{ marginHorizontal: 4 }}>
            <ButtonIcon as={EditIcon} size="xl" color="#fff" />
          </Button>
          <Button size="md" style={{ marginHorizontal: 4 }}>
            <ButtonIcon as={TrashIcon} size="xl" color="#fff" />
          </Button>
        </View>
      </View>
    </Card>
  );
};
