import { FilterSchemaItem } from "@/model/schema";
import React, { useRef, useState } from "react";

import { Button, ButtonIcon } from "@/components/ui/button";
import { Divider } from "@/components/ui/divider";
import { Heading } from "@/components/ui/heading";
import { AddIcon } from "@/components/ui/icon";
import { Text } from "@/components/ui/text";

import { ScrollView, StyleSheet, View } from "react-native";
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
      <Field
        placeholder="Buscar"
        value={searchTerm}
        onChange={setSearchTerm}
        type="text"
      />
      <Divider className="mt-3 mb-3" />
      {schema.map((item, index) => (
        <View key={index} style={styles.filterContainer}>
          {item.type === "text" || item.type === "number" ? (
            <Field
              placeholder={item.name}
              value={filters[item.name] || ""}
              onChange={(value) => handleFilterChange(item.name, value)}
              type={item.type}
            />
          ) : item.type === "option" ? (
            <View style={{ flexDirection: "row", alignItems: "center", width: "100%" }}>
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
      <View style={styles.buttonsContainer}>
        <Button
          size="xl"
          className="rounded-full p-3.5"
          style={styles.roundBtn}
          onPress={() => {
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
