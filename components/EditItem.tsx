import { Button } from "@/components/ui/button";
import { Heading } from "@/components/ui/heading";
import { Text } from "@/components/ui/text";
import { FilterSchemaItem } from "@/model/schema";
import React, { useState } from "react";

import { ScrollView, StyleSheet, View } from "react-native";
import FieldSelect from "./common/FieldSelect";
import ModalAddEdit from "./common/ModalAddEdit";
import ModalDelete from "./common/ModalDelete";

export interface SearchEngineProps {
  schema: FilterSchemaItem[];
  onSearch?: (searchTerm: string, filters: Record<string, string>) => void;
}

export const EditItem: React.FC<SearchEngineProps> = ({
  schema = [],
  onSearch,
}) => {
  const [filters, setFilters] = useState<Record<string, string>>({});
  const [showModalAddEdit, setShowModalAddEdit] = useState(false);
  const [showModalDelete, setShowModalDelete] = useState(false);
  const [valueToEdit, setValueToEdit] = useState<string>("");

  const handleFilterChange = (key: string, value: string) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
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
  filterContainer: {
    marginBottom: 8,
    display: "flex",
    flexDirection: "column",
  },
  heading: {
    marginBottom: 16,
  },
});
