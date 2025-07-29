import { Button, ButtonText } from "@/components/ui/button";
import { Heading } from "@/components/ui/heading";
import { ChevronDownIcon, CloseIcon, Icon } from "@/components/ui/icon";
import { Input, InputField } from "@/components/ui/input";
import {
  Modal,
  ModalBackdrop,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
} from "@/components/ui/modal";
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
  const [showModalAdd, setShowModalAdd] = useState(false);
  const [showModalEdit, setShowModalEdit] = useState(false);
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
              <Select
                selectedValue={filters[item.name] || ""}
                onValueChange={(value) => handleFilterChange(item.name, value)}
                style={{ flex: 1, width: "100%" }}
              >
                <SelectTrigger variant="outline" size="xl">
                  <SelectInput placeholder={item.name} />
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
                  style={{ marginRight: 4, flex: 1 }}
                  onPress={() => {
                    setShowModalAdd(true);
                  }}
                  variant="outline"
                >
                  <Text>Agregar</Text>
                </Button>
                <Button
                  size="lg"
                  style={{ marginRight: 4, flex: 1 }}
                  onPress={() => {
                    setShowModalEdit(true);
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
                  style={{ flex: 1 }}
                >
                  <Text>Eliminar</Text>
                </Button>
              </View>
            </View>
          ) : null}
        </View>
      ))}
      <Modal
        isOpen={showModalAdd}
        onClose={() => {
          setShowModalAdd(false);
        }}
        size="md"
      >
        <ModalBackdrop />
        <ModalContent>
          <ModalHeader>
            <Heading size="md" className="text-typography-950">
              Agregar nueva opción
            </Heading>
            <ModalCloseButton>
              <Icon
                as={CloseIcon}
                size="md"
                className="stroke-background-400 group-[:hover]/modal-close-button:stroke-background-700 group-[:active]/modal-close-button:stroke-background-900 group-[:focus-visible]/modal-close-button:stroke-background-900"
              />
            </ModalCloseButton>
          </ModalHeader>
          <ModalBody>
            <Input variant="outline" size="xl">
              <InputField placeholder="Nombre del item" />
            </Input>
          </ModalBody>
          <ModalFooter>
            <Button
              variant="outline"
              action="secondary"
              onPress={() => {
                setShowModalAdd(false);
              }}
            >
              <ButtonText>Cancelar</ButtonText>
            </Button>
            <Button
              onPress={() => {
                setShowModalAdd(false);
              }}
            >
              <ButtonText>Agregar</ButtonText>
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
      <Modal
        isOpen={showModalEdit}
        onClose={() => {
          setShowModalEdit(false);
        }}
        size="md"
      >
        <ModalBackdrop />
        <ModalContent>
          <ModalHeader>
            <Heading size="md" className="text-typography-950">
              Editar opción
            </Heading>
            <ModalCloseButton>
              <Icon
                as={CloseIcon}
                size="md"
                className="stroke-background-400 group-[:hover]/modal-close-button:stroke-background-700 group-[:active]/modal-close-button:stroke-background-900 group-[:focus-visible]/modal-close-button:stroke-background-900"
              />
            </ModalCloseButton>
          </ModalHeader>
          <ModalBody>
            <Input variant="outline" size="xl">
              <InputField
                placeholder="Nombre del item"
                value={valueToEdit}
                onChangeText={setValueToEdit}
              />
            </Input>
          </ModalBody>
          <ModalFooter>
            <Button
              variant="outline"
              action="secondary"
              onPress={() => {
                setShowModalEdit(false);
              }}
            >
              <ButtonText>Cancelar</ButtonText>
            </Button>
            <Button
              onPress={() => {
                setShowModalEdit(false);
              }}
            >
              <ButtonText>Guardar</ButtonText>
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
      <Modal
        isOpen={showModalDelete}
        onClose={() => {
          setShowModalDelete(false);
        }}
        size="md"
      >
        <ModalBackdrop />
        <ModalContent>
          <ModalHeader>
            <Heading size="md" className="text-typography-950">
              ¿Esta seguro que desea eliminar esta opción?
            </Heading>
            <ModalCloseButton>
              <Icon
                as={CloseIcon}
                size="md"
                className="stroke-background-400 group-[:hover]/modal-close-button:stroke-background-700 group-[:active]/modal-close-button:stroke-background-900 group-[:focus-visible]/modal-close-button:stroke-background-900"
              />
            </ModalCloseButton>
          </ModalHeader>
          <ModalFooter>
            <Button
              variant="outline"
              action="secondary"
              onPress={() => {
                setShowModalDelete(false);
              }}
            >
              <ButtonText>Volver</ButtonText>
            </Button>
            <Button
              onPress={() => {
                setShowModalDelete(false);
              }}
            >
              <ButtonText>Eliminar</ButtonText>
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
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
