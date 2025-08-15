import Loading from "@/components/common/Loading";
import ModalAddEdit from "@/components/common/ModalAddEdit";
import ModalDelete from "@/components/common/ModalDelete";
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
  const [showModalAddEdit, setShowModalAddEdit] = useState(false);
  const [showModalDelete, setShowModalDelete] = useState(false);
  const [modalItem, setModalItem] = useState<FilterSchemaOption | null>(null);

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
    if (action === "fav") {
      if (schemaItem && schemaItem.options) {
        const updatedOptions = schemaItem.options.map((opt, i) =>
          i === index ? updatedOpt : opt
        );
        setSchemaItem({ ...schemaItem, options: updatedOptions });
        setSchemaOptions(schemaItem.id, updatedOptions);
      }
    } else if (action === "delete") {
      setModalItem(updatedOpt);
      setShowModalDelete(true);
      console.log("Deleting option:", updatedOpt, index);
    } else if (action === "edit") {
      setModalItem(updatedOpt);
      setShowModalAddEdit(true);
      console.log("Editing option:", updatedOpt, index);
    }
  };

  const sort = (a: FilterSchemaOption, b: FilterSchemaOption) => {
    if (a.fav && !b.fav) return -1;
    if (!a.fav && b.fav) return 1;
    return a.name.localeCompare(b.name);
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
        <ScrollView style={{ marginTop: 16, maxHeight: "70%" }}>
          {schemaItem.options?.sort(sort).map((opt, index) => (
            <Option
              key={index}
              opt={opt}
              onChange={(updatedOpt, action) =>
                handleOptionChange(updatedOpt, action, index)
              }
            />
          ))}
        </ScrollView>
      )}
      <Button
        style={{ height: 50 }}
        onPress={() => {
          setModalItem(null);
          setShowModalAddEdit(true);
        }}
        className="mt-4"
      >
        <Text size="xl" style={{ color: "#fff" }}>
          Agregar nueva opción
        </Text>
      </Button>
      <ModalAddEdit
        value={modalItem?.name || ""}
        show={showModalAddEdit}
        onCloseClick={() => {
          setModalItem(null);
          setShowModalAddEdit(false);
        }}
        onCancel={() => {
          setModalItem(null);
          setShowModalAddEdit(false);
        }}
        onConfirm={(value) => {
          if (schemaItem) {
            const updatedOptions = [
              ...(schemaItem.options || []),
              { name: value, fav: false },
            ];
            setSchemaItem({ ...schemaItem, options: updatedOptions });
            setSchemaOptions(schemaItem.id, updatedOptions);
          }
          setShowModalAddEdit(false);
        }}
        onChangeValue={(value) => {
          console.log("Modal value changed:", value);
          setModalItem({ name: value, fav: modalItem?.fav ?? null });
        }}
      />
      <ModalDelete
        show={showModalDelete}
        onCloseClick={() => {
          setModalItem(null);
          setShowModalDelete(false);
        }}
        onConfirm={() => {
          if (schemaItem && modalItem) {
            const updatedOptions = schemaItem.options?.filter(
              (opt) => opt.name !== modalItem.name
            );
            setSchemaItem({ ...schemaItem, options: updatedOptions });
            setSchemaOptions(schemaItem.id, updatedOptions || []);
          }
          setShowModalDelete(false);
        }}
      />
    </View>
  );
}

const Option = ({
  opt,
  onChange,
}: {
  opt: FilterSchemaOption;
  onChange: (
    updatedOpt: FilterSchemaOption,
    action: "edit" | "delete" | "fav"
  ) => void;
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
          <Button
            size="md"
            style={{ marginHorizontal: 4 }}
            onPress={() => onChange({ ...opt, fav: !opt.fav }, "fav")}
          >
            <ButtonIcon
              as={StarIcon}
              size="xl"
              color={opt.fav ? "#FFD700" : "#fff"}
            />
          </Button>
          <Button
            size="md"
            style={{ marginHorizontal: 4 }}
            onPress={() => onChange(opt, "edit")}
          >
            <ButtonIcon as={EditIcon} size="xl" color="#fff" />
          </Button>
          <Button
            size="md"
            style={{ marginHorizontal: 4 }}
            onPress={() => onChange(opt, "delete")}
          >
            <ButtonIcon as={TrashIcon} size="xl" color="#fff" />
          </Button>
        </View>
      </View>
    </Card>
  );
};
