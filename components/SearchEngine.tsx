import { Button, ButtonIcon } from "@/components/ui/button";
import { Divider } from "@/components/ui/divider";
import { SearchIcon, TrashIcon } from "@/components/ui/icon";

import { Text } from "@/components/ui/text";
import { FilterSchemaItem } from "@/model/schema";
import React, { useState } from "react";

import { ScrollView, StyleSheet, View } from "react-native";
import Field from "./common/Field";
import FieldSelect from "./common/FieldSelect";
import FieldTextArea from "./common/FieldTextArea";

export interface SearchEngineProps {
  schema: FilterSchemaItem[] | undefined;
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
    if (onSearch) {
      onSearch(filters);
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Field
        placeholder="Codigo"
        value={filters.code || ""}
        onChange={(value) => handleFilterChange("code", value)}
        type="text"
      />
      <Divider className="mt-3 mb-3" />
      {schema
        .filter((item) => item.filterable)
        .map((item, index) => (
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
                    <FieldSelect
                      placeholder={item.name}
                      value={filters[item.name] || ""}
                      handleChange={(value) =>
                        handleFilterChange(item.name, value)
                      }
                      options={(item.options ?? []).map((opt) => ({
                        label: opt.name,
                        value: opt.name,
                        fav: opt.fav || false, // Assuming fav is optional
                      }))}
                    />
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
      {/* Botones */}
      <View style={styles.buttonsContainer}>
        <Button
          size="xl"
          className="rounded-full p-2.5"
          style={[styles.roundBtn, { backgroundColor: "green" }]}
          onPress={onSearchClick}
        >
          <Text style={styles.labelBtn}>Buscar</Text>
          <ButtonIcon as={SearchIcon} size="xl" style={styles.btnIcon} />
        </Button>
        <Button
          size="xl"
          className="rounded-full p-2.5"
          style={[styles.roundCleanBtn]}
          onPress={handleClear}
        >
          <Text style={styles.labelCleanBtn}>Limpiar</Text>
          <ButtonIcon as={TrashIcon} size="xl" style={styles.btnCleanIcon} />
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
    fontSize: 24,
  },
  heading: {
    marginBottom: 16,
  },
  roundBtn: {
    width: 130,
    height: 130,
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
  roundCleanBtn: {
    width: 80,
    height: 80,
    justifyContent: "center",
    alignItems: "center",
    color: "#fff",
    display: "flex",
    flexDirection: "column",
  },
  btnCleanIcon: {
    height: 23,
    width: 23,
  },
  labelCleanBtn: {
    color: "#fff",
    fontSize: 12,
  },
});
