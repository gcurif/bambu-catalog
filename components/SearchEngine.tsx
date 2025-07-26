import { Button, ButtonIcon } from "@/components/ui/button";
import { Divider } from "@/components/ui/divider";
import { Heading } from "@/components/ui/heading";
import { ChevronDownIcon, EditIcon } from "@/components/ui/icon";
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

import { FilterSchemaItem } from "@/model/schema";
import React, { useState } from "react";

import { Platform, ScrollView, StyleSheet, View } from "react-native";

export interface SearchEngineProps {
  schema: FilterSchemaItem[];
  onSearch?: (searchTerm: string, filters: Record<string, string>) => void;
  onClear?: () => void;
}

export const SearchEngine: React.FC<SearchEngineProps> = ({
  schema = [],
  onSearch,
  onClear,
}) => {
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [filters, setFilters] = useState<Record<string, string>>({});

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
      <Heading style={styles.heading} size="lg">Buscar en Catalogo</Heading>
      <Heading size="sm">Busqueda general</Heading>
      <Input variant="outline" size="lg" style={styles.searchBar}>
        <InputField placeholder="Buscar..." value={searchTerm} />
      </Input>
      <Divider className="mt-0.5 mb-3" />
      {schema.map((item, index) => (
        <View key={index} style={styles.filterContainer}>
          <Heading size="sm">{item.name}</Heading>
          {item.type === "text" || item.type === "number" ? (
            <Input variant="outline" size="md">
              <InputField
                placeholder={item.name}
                value={filters[item.name] || ""}
              />
            </Input>
          ) : item.type === "option" ? (
            <Select>
              <SelectTrigger variant="outline" size="md">
                <SelectInput placeholder="Seleccionar opción" />
                <SelectIcon className="mr-3" as={ChevronDownIcon} />
              </SelectTrigger>
              <SelectPortal>
                <SelectBackdrop />
                <SelectContent>
                  <SelectDragIndicatorWrapper>
                    <SelectDragIndicator />
                  </SelectDragIndicatorWrapper>
                  {item.options?.map((opt, i) => (
                    <SelectItem
                      label={opt}
                      key={i}
                      value={opt}
                      onPress={() => handleFilterChange(item.name, opt)}
                    >
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
        <Button size="lg" className="rounded-full p-3.5">
          <ButtonIcon as={EditIcon} />
        </Button>
        <Button size="lg" className="rounded-full p-3.5">
          <ButtonIcon as={EditIcon} />
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
    marginBottom: 16,
    borderRadius: 12,
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
  heading: {
    marginBottom: 16,
  },
});
