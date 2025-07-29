import { Button, ButtonIcon } from "@/components/ui/button";
import { Divider } from "@/components/ui/divider";
import { Heading } from "@/components/ui/heading";
import { ChevronDownIcon, SearchIcon, TrashIcon } from "@/components/ui/icon";
import { Input, InputField } from "@/components/ui/input";
import {
  Select,
  SelectBackdrop,
  SelectContent,
  SelectDragIndicator,
  SelectDragIndicatorWrapper,
  SelectIcon,
  SelectInput,
  SelectItem,
  SelectPortal,
  SelectTrigger,
} from "@/components/ui/select";

import { Text } from "@/components/ui/text";
import { FilterSchemaItem } from "@/model/schema";
import React, { useState } from "react";

import { Platform, ScrollView, StyleSheet, View } from "react-native";

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
    console.log(`Filter changed: ${key} = ${value}`);
    setFilters((prev) => ({ ...prev, [key]: value }));
  };

  const handleFilterChangeNumber = (key: string, value: string) => {
    if (!/^-?\d+(\.\d+)?$/.test(value.trim())) return; // ignora si no es número válido
    const numericValue = String(Number(value));
    handleFilterChange(key, numericValue);
  };

  // Removed duplicate filters declaration

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
      <Input variant="outline" size="xl" style={styles.searchBar}>
        <InputField
          placeholder="Busqueda general"
          value={filters.general || ""}
          onChangeText={(value) => handleFilterChange("general", value)}
        />
      </Input>
      <Input variant="outline" size="xl" style={styles.searchBar}>
        <InputField
          placeholder="Busqueda por codigo"
          value={filters.code || ""}
          onChangeText={(value) => handleFilterChange("code", value)}
        />
      </Input>
      <Divider className="mt-0.5 mb-3" />
      {schema.map((item, index) => (
        <View key={index} style={styles.filterContainer}>
          {item.type === "text" || item.type === "number" ? (
            <Input variant="outline" size="xl">
              <InputField
                placeholder={`Filtrar por: ${item.name}`}
                value={filters[item.name] || ""}
                onChangeText={(value) =>
                  item.type === "number"
                    ? handleFilterChangeNumber(item.name, value)
                    : handleFilterChange(item.name, value)
                }
              />
            </Input>
          ) : item.type === "option" ? (
            <Select
              selectedValue={filters[item.name] || ""}
              onValueChange={(value) => handleFilterChange(item.name, value)}
            >
              <SelectTrigger variant="outline" size="xl">
                <SelectInput placeholder={`Filtrar por: ${item.name}`} />
                <SelectIcon className="mr-3" as={ChevronDownIcon} />
              </SelectTrigger>
              <SelectPortal>
                <SelectBackdrop />
                <SelectContent>
                  <SelectDragIndicatorWrapper>
                    <SelectDragIndicator />
                  </SelectDragIndicatorWrapper>
                  {item.options?.map((opt, i) => (
                    <SelectItem label={opt} key={i} value={opt}>
                      {opt}
                    </SelectItem>
                  ))}
                </SelectContent>
              </SelectPortal>
            </Select>
          ) : null}
        </View>
      ))}
      {/* Botones */}
      <View style={styles.buttonsContainer}>
        <Button
          size="xl"
          className="rounded-full p-3.5"
          style={[styles.roundBtn]}
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
