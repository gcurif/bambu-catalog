import Loading from "@/components/common/Loading";
import ModalAddEdit from "@/components/common/ModalAddEdit";
import ModalDelete from "@/components/common/ModalDelete";
import { SimpleToast, SimpleToastRef } from "@/components/common/SimpleToast";
import { Button, ButtonIcon } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Heading } from "@/components/ui/heading";
import { EditIcon, StarIcon, TrashIcon } from "@/components/ui/icon";
import { Text } from "@/components/ui/text";
import { GlobalPresets } from "@/constants/GlobalStyles";
import { getSchemaItemById, setSchemaOptions } from "@/data/data";
import { FilterSchemaItem, FilterSchemaOption } from "@/model/schema";
import { useLocalSearchParams } from "expo-router";
import React, { useEffect, useRef, useState } from "react";
import { ScrollView, View } from "react-native";

export default function EditOptionScreen() {
  const { schemaId } = useLocalSearchParams();
  const [schemaItem, setSchemaItem] = useState<FilterSchemaItem | null>(null);
  const [showModalAddEdit, setShowModalAddEdit] = useState(false);
  const [showModalDelete, setShowModalDelete] = useState(false);
  const [modalItem, setModalItem] = useState<FilterSchemaOption | null>(null);
  const [newOptionValue, setNewOptionValue] = useState<string>("");

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

  useEffect(() => {
    console.log("Schema item updated:", schemaItem);
    if (schemaItem && schemaItem.options) {
      setSchemaOptions(schemaItem.id, schemaItem.options);
      setModalItem(null);
    }
  }, [schemaItem]);

  useEffect(() => {
    console.log("show modal :", showModalAddEdit);
    if (!showModalAddEdit) {
      setNewOptionValue("");
      setModalItem(null);
    }
  }, [showModalAddEdit]);

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
        toastRef.current?.show(
          ` ${updatedOpt.name} ${updatedOpt.fav ? "a favoritos" : "Quitado de favoritos"}`, 
          "Opción actualizada"
        );
      }
    } else if (action === "delete") {
      setModalItem(updatedOpt);
      setShowModalDelete(true);
      console.log("Deleting option:", updatedOpt, index);
    } else if (action === "edit") {
      setNewOptionValue(updatedOpt.name);
      setModalItem(updatedOpt);
      setShowModalAddEdit(true);
      console.log("Editing option:", updatedOpt, index);
    }
  };

  const toastRef = useRef<SimpleToastRef>(null);

  const sort = (a: FilterSchemaOption, b: FilterSchemaOption) => {
    if (a.fav && !b.fav) return -1;
    if (!a.fav && b.fav) return 1;
    return a.name.localeCompare(b.name);
  };

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
        value={newOptionValue}
        show={showModalAddEdit}
        onCloseClick={() => {
          setShowModalAddEdit(false);
        }}
        onCancel={() => {
          setShowModalAddEdit(false);
        }}
        onConfirm={(value) => {
          console.log("ejecutando on confirm", value);
          if (schemaItem) {
            console.log("entrando si existe el schemaItem:", schemaItem);
            if(modalItem){
              console.log("Editing existing option:", modalItem.name, "to", value);
              const updatedOptions = schemaItem.options?.map((opt) =>
                opt.name === modalItem.name ? { ...opt, name: newOptionValue } : opt
              );
              setSchemaItem({ ...schemaItem, options: updatedOptions });
            } else{
              console.log("Adding new option:", value);
              const newOption = { name: newOptionValue, fav: false };
              setSchemaItem({ ...schemaItem, options: [...(schemaItem.options || []), newOption] });
            }
          }
          setShowModalAddEdit(false);
        }}
        onChangeValue={(value) => {
            setNewOptionValue(value);
        }}
      />
      <ModalDelete
        show={showModalDelete}
        onCloseClick={() => {
          setShowModalDelete(false);
        }}
        onConfirm={() => {
          if (schemaItem && modalItem) {
            const updatedOptions = schemaItem.options?.filter(
              (opt) => opt.name !== modalItem.name
            );
            setSchemaItem({ ...schemaItem, options: updatedOptions });
          }
          setShowModalDelete(false);
        }}
      />
      <SimpleToast ref={toastRef} />
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
