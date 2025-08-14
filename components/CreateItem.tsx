import { FilterSchemaItem } from "@/model/schema";
import React, { useRef, useState } from "react";

import { Button, ButtonIcon } from "@/components/ui/button";
import { Heading } from "@/components/ui/heading";
import { AddIcon } from "@/components/ui/icon";
import { Text } from "@/components/ui/text";

import { uploadImg } from "@/data/dropbox";
import { ScrollView, StyleSheet, View } from "react-native";
import Field from "./common/Field";
import FieldSelect from "./common/FieldSelect";
import FieldTextArea from "./common/FieldTextArea";
import ModalAddEdit from "./common/ModalAddEdit";
import { SimpleToast, SimpleToastRef } from "./common/SimpleToast";

import * as ImagePicker from "expo-image-picker";

export interface SearchEngineProps {
  schema: FilterSchemaItem[];
  onSearch?: (searchTerm: string, filters: Record<string, string>) => void;
  onClear?: () => void;
}

export const CreateItem: React.FC<SearchEngineProps> = ({
  schema = [],
  onSearch,
  onClear,
}) => {
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [filters, setFilters] = useState<Record<string, string>>({});
  const [showModalAdd, setShowModalAdd] = useState(false);
  const [newOption, setNewOption] = useState<string>("");

  const handleFilterChange = (key: string, value: string) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
  };

  const succesToastRef = useRef<SimpleToastRef>(null);
  const showSuccessToast = (message: string, headerMsg: string) => {
    succesToastRef.current?.show(message, headerMsg);
  };

  const [imgs, setImgs] = useState<string[]>([]);
  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      // Better typing than string array:
      allowsEditing: false,
      mediaTypes: ['images', 'videos'],
      allowsMultipleSelection: true,
      quality: 1,
    });

    // handle result if needed
    if (!result.canceled) {
      console.log("Selected images:", result);
      const selectedImages = result.assets.map((asset) => asset.uri);
      setImgs(selectedImages);
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Heading style={styles.heading} size="xl">
        Agregar nuevo
      </Heading>

      <Field
        placeholder="Codigo"
        value={filters.code || ""}
        onChange={(value) => handleFilterChange("code", value)}
        type="text"
        className="mb-2"
      />

      {schema.map((item, index) => (
        <View key={index} style={styles.filterContainer}>
          {(() => {
            switch (item.type) {
              case "text":
              case "number":
                return (
                  <Field
                    placeholder={item.name}
                    value={filters[item.name] || ""}
                    onChange={(value) => handleFilterChange(item.name, value)}
                    type={item.type}
                  />
                );
              case "option":
                return (
                  <View
                    style={{
                      flexDirection: "row",
                      alignItems: "center",
                      width: "100%",
                    }}
                  >
                    <FieldSelect
                      placeholder={item.name}
                      value={filters[item.name] || ""}
                      handleChange={(value) =>
                        handleFilterChange(item.name, value)
                      }
                      options={(item.options ?? []).map((opt) => ({
                        label: opt.name,
                        value: opt.name,
                        fav: opt.fav || false,
                      }))}
                    />
                    <Button
                      size="sm"
                      style={{
                        marginLeft: 8,
                        backgroundColor: "rgba(255, 255, 255, 1)",
                      }}
                      onPress={() => setShowModalAdd(true)}
                      variant="outline"
                    >
                      <Text>+</Text>
                    </Button>
                  </View>
                );
              case "textlg":
                return (
                  <FieldTextArea
                    placeholder={item.name}
                    value={filters[item.name] || ""}
                    onChange={(value) => handleFilterChange(item.name, value)}
                    type={item.type}
                  />
                );
              default:
                return null;
            }
          })()}
        </View>
      ))}

      <Button style={{ height: 50}}  onPress={pickImage}>
        <Text size="xl" style={{ color: "#fff" }}>{imgs.length > 0 ? 'Cambiar Fotos' : "Agregar Fotos"} </Text>
      </Button>
      {imgs.length > 0 && (
        <Text size="xl" >Se agregaran {imgs.length} fotos</Text>
      )}

      <View style={styles.buttonsContainer}>
        <Button
          size="xl"
          className="rounded-full p-3.5"
          style={styles.roundBtn}
          onPress={() => {

            uploadImg(imgs[0]).then((url) => {
              console.log("Uploaded image URL:", url);
            });

            showSuccessToast("Producto agregado correctamente!", "OK");
          }}
        >
          <ButtonIcon as={AddIcon} size="xl" />
          <Text style={styles.labelBtn}>Agregar</Text>
        </Button>
      </View>

      <ModalAddEdit
        show={showModalAdd}
        onCloseClick={() => setShowModalAdd(false)}
        onConfirm={(value) => {
          setNewOption(value);
          setShowModalAdd(false);
          showSuccessToast("Producto agregado correctamente!", "OK");
        }}
        value={newOption}
        onChangeValue={setNewOption}
      />

      <SimpleToast ref={succesToastRef} />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: { padding: 16 },
  filterContainer: {
    marginBottom: 8,
    display: "flex",
    flexDirection: "column",
  },
  buttonsContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginTop: 24,
    marginBottom: 200,
  },
  labelBtn: {
    color: "#fff",
    fontSize: 22,
  },
  heading: {
    marginBottom: 16,
  },
  roundBtn: {
    width: 145,
    height: 145,
    justifyContent: "center",
    alignItems: "center",
    color: "#fff",
    display: "flex",
    flexDirection: "column",
  },
  btnIcon: {
    height: 32,
    width: 32,
  },
});
