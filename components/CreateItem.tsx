import { FilterSchemaItem } from "@/model/schema";
import React, { useRef, useState } from "react";

// UI Components
import { Button, ButtonIcon } from "@/components/ui/button";
import { Divider } from "@/components/ui/divider";
import { Heading } from "@/components/ui/heading";
import {
  AddIcon
} from "@/components/ui/icon";
import { Input, InputField } from "@/components/ui/input";
import { Text } from "@/components/ui/text";

// Select Components

// Modal Components


import { Platform, ScrollView, StyleSheet, View } from "react-native";
import Field from "./common/Field";
import FieldSelect from "./common/FieldSelect";
import ModalAddEdit from "./common/ModalAddEdit";
import { SimpleToast, SimpleToastRef } from "./common/SimpleToast";

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
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Heading style={styles.heading} size="xl">
        Agregar nuevo
      </Heading>
      <Input variant="outline" size="xl" style={styles.searchBar}>
        <InputField
          placeholder="Codigo"
          value={searchTerm}
          onChangeText={setSearchTerm}
        />
      </Input>
      <Divider className="mt-0.5 mb-3" />
      {schema.map((item, index) => (
        <View key={index} style={styles.filterContainer}>
          {item.type === "text" || item.type === "number" ? (
            <Field
              placeholder={item.name}
              value={filters[item.name] || ""}
              handleChange={(value) => handleFilterChange(item.name, value)}
              type={item.type}
            />
          ) : item.type === "option" ? (
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <FieldSelect
                placeholder={item.name}
                value={filters[item.name] || ""}
                handleChange={(value) => handleFilterChange(item.name, value)}
                options={(item.options ?? []).map((opt) => ({
                  label: opt,
                  value: opt,
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
          ) : null}
        </View>
      ))}
      {/* Botones */}
      <View style={styles.buttonsContainer}>
        <Button
          size="xl"
          className="rounded-full p-3.5"
          style={[styles.roundBtn]}
          onPress={() => { showSuccessToast("Producto agregado correctamente!", "OK"); }}
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
  container: {
    padding: 16,
  },
  searchBar: {
    marginBottom: 8,
    backgroundColor: "rgba(255, 255, 255, 1)",
  },
  picker: {
    height: 48,
  },
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderRadius: 12,
    paddingHorizontal: 12,
    marginBottom: 16,
  },
  searchInput: {
    flex: 1,
    paddingVertical: Platform.OS === "ios" ? 12 : 8,
  },
  icon: {
    marginHorizontal: 8,
  },
  filterContainer: {
    marginBottom: 8,
    display: "flex",
    flexDirection: "column",
  },
  label: {
    marginBottom: 4,
    fontWeight: "bold",
  },
  input: {
    borderWidth: 1,
    borderRadius: 8,
    padding: 10,
  },
  pickerWrapper: {
    borderWidth: 1,
    borderRadius: 8,
  },
  buttonsContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginTop: 24,
  },
  circleButton: {
    alignItems: "center",
    justifyContent: "center",
    width: 90,
    height: 90,
    borderRadius: 45,
    borderWidth: 1,
    color: "#fff",
  },
  searchBtn: {
    backgroundColor: "green",
  },
  labelInput: {
    marginBottom: 8,
    fontWeight: "bold",
  },
  labelBtn: {
    color: "#fff",
    fontWeight: "bold",
  },
  heading: {
    marginBottom: 16,
  },
  roundBtn: {
    width: 100,
    height: 100,
    justifyContent: "center",
    alignItems: "center",
    color: "#fff",
    display: "flex",
    flexDirection: "column",
  },
});
