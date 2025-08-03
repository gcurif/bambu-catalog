import { Button, ButtonIcon } from "@/components/ui/button";
import { Divider } from "@/components/ui/divider";
import { Heading } from "@/components/ui/heading";
import { SearchIcon, TrashIcon } from "@/components/ui/icon";

import { Text } from "@/components/ui/text";
import { FilterSchemaItem } from "@/model/schema";
import React, { useState } from "react";

import { ScrollView, StyleSheet, View } from "react-native";
import Field from "./common/Field";
import FieldSelect from "./common/FieldSelect";

export interface SearchEngineProps {
  schema: FilterSchemaItem[];
  onSearch?: (filters: Record<string, string>) => void;
  onClear?: () => void;
}

export const SearchEngine: React.FC<SearchEngineProps> = ({
  schema = [],
  onSearch,
  onClear,
}) => {
  const [filters, setFilters] = useState<Record<string, string>>({});

  const handleFilterChange = (key: string, value: string) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
  };

  const handleClear = () => {
    setFilters({});
    onClear?.();
  };

  const onSearchClick = () => {
    console.log("Search clicked", filters);
    if (onSearch) {
      onSearch(filters);
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Heading style={styles.heading} size="xl">
        Buscar
      </Heading>
      <Field
        placeholder="Busqueda por codigo"
        value={filters.code || ""}
        onChange={(value) => handleFilterChange("code", value)}
        type="text"
      />
      <Divider className="mt-0.5 mb-3" />
      {schema.map((item, index) => (
        <View key={index} style={styles.filterContainer}>
          {item.type === "text" || item.type === "number" ? (
            <Field
              placeholder={`Filtrar por: ${item.name}`}
              value={filters[item.name] || ""}
              onChange={(value) => handleFilterChange(item.name, value)}
              type={item.type}
            />
          ) : item.type === "option" ? (
            <FieldSelect
              placeholder={item.name}
              value={filters[item.name] || ""}
              handleChange={(value) => handleFilterChange(item.name, value)}
              options={(item.options ?? []).map((opt) => ({
                label: opt,
                value: opt,
              }))}
            />
          ) : null}
        </View>
      ))}
      {/* Botones */}
      <View style={styles.buttonsContainer}>
        <Button
          size="xl"
          className="rounded-full p-3.5"
          style={[styles.roundBtn, { backgroundColor: "green" }]}
          onPress={onSearchClick}
        >
          <ButtonIcon as={SearchIcon} size="xl" />
          <Text style={styles.labelBtn}>Buscar</Text>
        </Button>
        <Button
          size="xl"
          className="rounded-full p-3.5"
          style={[styles.roundBtn]}
          onPress={handleClear}
        >
          <ButtonIcon as={TrashIcon} size="xl" />
          <Text style={styles.labelBtn}>Limpiar</Text>
        </Button>
      </View>
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
  buttonsContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginTop: 24,
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
