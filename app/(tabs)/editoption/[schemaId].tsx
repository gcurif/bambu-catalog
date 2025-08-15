import Loading from "@/components/common/Loading";
import { Button, ButtonIcon } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Heading } from "@/components/ui/heading";
import { EditIcon, StarIcon, TrashIcon } from "@/components/ui/icon";
import { Text } from "@/components/ui/text";
import { GlobalPresets } from "@/constants/GlobalStyles";
import { getSchemaItemById, setSchemaOptions } from "@/data/data";
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

  const handleOptionChange = (
    updatedOpt: FilterSchemaOption,
    action: "edit" | "delete" | "fav",
    index: number
  ) => {

    if (action === 'edit' || action === 'fav') {
      if (schemaItem && schemaItem.options) {
        const updatedOptions = schemaItem.options.map((opt, i) =>
          i === index ? updatedOpt : opt
        );
        setSchemaItem({ ...schemaItem, options: updatedOptions });
        setSchemaOptions(schemaItem.id, updatedOptions);
      }
    } else if (action === 'delete') {
      console.log("Deleting option:", updatedOpt, index);
    }

  };

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
      {!schemaItem && <Loading show={true} label="Cargando..." />}

      {schemaItem && (
        <ScrollView style={{ marginTop: 16, maxHeight: "80%" }}>
          {schemaItem.options
            ?.sort((opt) => (opt.fav ? -1 : 1))
            .map((opt, index) => (
              <Option key={index} opt={opt} onChange={(updatedOpt, action) => handleOptionChange(updatedOpt, action, index)} />
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

const Option = ({
  opt,
  onChange,
}: {
  opt: FilterSchemaOption;
  onChange: (updatedOpt: FilterSchemaOption, action: "edit" | "delete" | "fav" ) => void;
}) => {
  return (
    <Card className="mt-2 p-4">
      <View
        style={{
          flex: 1,
          flexDirection: "column",
          alignItems: "flex-start",
          justifyContent: "space-between",
        }}
      >
        <Text style={{ fontSize: 24, marginBottom: 8 }}> {opt.name}</Text>
        <View style={{ flexDirection: "row", justifyContent: "flex-end" }}>
          <Button size="md" style={{ marginHorizontal: 4 }} onPress={() => onChange({...opt, fav: !opt.fav}, "fav")}>
            <ButtonIcon
              as={StarIcon}
              size="xl"
              color={opt.fav ? "#FFD700" : "#fff"}
            />
          </Button>
          <Button size="md" style={{ marginHorizontal: 4 }} onPress={() => onChange(opt, "edit")}>
            <ButtonIcon as={EditIcon} size="xl" color="#fff" />
          </Button>
          <Button size="md" style={{ marginHorizontal: 4 }} onPress={() => onChange(opt, "delete")}>
            <ButtonIcon as={TrashIcon} size="xl" color="#fff" />
          </Button>
        </View>
      </View>
    </Card>
  );
};
