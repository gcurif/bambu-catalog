import { Button } from "@/components/ui/button";
import { Heading } from "@/components/ui/heading";
import { Text } from "@/components/ui/text";
import { FilterSchemaItem } from "@/model/schema";
import React, { useState } from "react";

import { Platform, ScrollView, StyleSheet, View } from "react-native";
import FieldSelect from "./common/FieldSelect";
import ModalAddEdit from "./common/ModalAddEdit";
import ModalDelete from "./common/ModalDelete";

export interface SearchEngineProps {
  schema: FilterSchemaItem[];
  onSearch?: (searchTerm: string, filters: Record<string, string>) => void;
  onClear?: () => void;
}

export const EditItem: React.FC<SearchEngineProps> = ({
  schema = [],
  onSearch,
  onClear,
}) => {
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [filters, setFilters] = useState<Record<string, string>>({});
  const [showModalAddEdit, setShowModalAddEdit] = useState(false);
  const [showModalDelete, setShowModalDelete] = useState(false);
  const [valueToEdit, setValueToEdit] = useState<string>("");

  const handleFilterChange = (key: string, value: string) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
  };

  const handleClear = () => {
    setSearchTerm("");
    setFilters({});
    onClear?.();
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Heading style={styles.heading} size="xl">
        Opciones
      </Heading>
      {schema.map((item, index) => (
        <View key={index} style={styles.filterContainer}>
          {item.type === "text" || item.type === "number" ? null : item.type ===
            "option" ? (
            <View
              style={{
                flexDirection: "column",
                alignItems: "center",
                marginTop: 16,
              }}
            >
              <FieldSelect
                placeholder={item.name}
                value={filters[item.name] || ""}
                handleChange={(value) => handleFilterChange(item.name, value)}
                options={(item.options ?? []).map((opt) => ({
                  label: opt,
                  value: opt,
                }))}
              />
              <View
                style={{
                  flexDirection: "row",
                  marginTop: 8,
                  justifyContent: "space-around",
                  alignItems: "center",
                }}
              >
                <Button
                  size="lg"
                  style={{ marginRight: 4, flex: 1, backgroundColor: "rgba(255, 255, 255, 1)" }}
                  onPress={() => {
                    setShowModalAddEdit(true);
                  }}
                  variant="outline"
                >
                  <Text>Agregar</Text>
                </Button>
                <Button
                  size="lg"
                  style={{ marginRight: 4, flex: 1, backgroundColor: "rgba(255, 255, 255, 1)" }}
                  onPress={() => {
                    setShowModalAddEdit(true);
                    setValueToEdit(filters[item.name]);
                  }}
                  variant="outline"
                >
                  <Text>Editar</Text>
                </Button>
                <Button
                  size="lg"
                  onPress={() => {
                    setShowModalDelete(true);
                  }}
                  variant="outline"
                  style={{ flex: 1, backgroundColor: "rgba(255, 255, 255, 1)" }}
                >
                  <Text>Eliminar</Text>
                </Button>
              </View>
            </View>
          ) : null}
        </View>
      ))}
      <ModalAddEdit
        show={showModalAddEdit}
        onCloseClick={() => setShowModalAddEdit(false)}
        onConfirm={(value) => {
          setFilters((prev) => ({ ...prev, [value]: value }));
          setShowModalAddEdit(false);
        }}
        value=""
        onChangeValue={() => {}}
      />
      <ModalDelete
        show={showModalDelete}
        onCloseClick={() => setShowModalDelete(false)}
        onConfirm={() => {
          setFilters((prev) => {
            const newFilters = { ...prev };
            delete newFilters[valueToEdit];
            return newFilters;
          });
          setShowModalDelete(false);
        }}
      />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
  },
  searchBar: {
    marginBottom: 8,
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
