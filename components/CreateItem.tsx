import { FilterSchemaItem } from "@/model/schema";
import React, { useState } from "react";

// UI Components
import { Button, ButtonIcon, ButtonText } from "@/components/ui/button";
import { Divider } from "@/components/ui/divider";
import { Heading } from "@/components/ui/heading";
import {
  AddIcon,
  ChevronDownIcon,
  CloseIcon,
  Icon,
} from "@/components/ui/icon";
import { Input, InputField } from "@/components/ui/input";
import { Text } from "@/components/ui/text";

// Select Components
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

// Modal Components
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
  Toast,
  ToastDescription,
  ToastTitle,
  useToast,
} from "@/components/ui/toast";

import { Platform, ScrollView, StyleSheet, View } from "react-native";

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
  const [toastId, setToastId] = React.useState<string>("");

  const handleFilterChange = (key: string, value: string) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
  };

  const handleClear = () => {
    setSearchTerm("");
    setFilters({});
    onClear?.();
  };

  const toast = useToast();
  const showSuccessToast = () => {
    const newId = Math.random().toString();
    setToastId(newId);
    toast.show({
      id: newId,
      placement: "top",
      duration: 3000,
      render: ({ id }) => {
        const uniqueToastId = "toast-" + id;
        return (
          <Toast nativeID={uniqueToastId} action="muted" variant="solid">
            <ToastTitle>OK</ToastTitle>
            <ToastDescription>
              Producto agregado correctamente!
            </ToastDescription>
          </Toast>
        );
      },
    });
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
            <Input variant="outline" size="xl">
              <InputField
                placeholder={item.name}
                value={filters[item.name] || ""}
                onChangeText={(value) => handleFilterChange(item.name, value)}
              />
            </Input>
          ) : item.type === "option" ? (
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <Select
                selectedValue={filters[item.name] || ""}
                onValueChange={(value) => handleFilterChange(item.name, value)}
                style={{ flex: 1 }}
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
              <Button
                size="sm"
                style={{ marginLeft: 8 }}
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
          onPress={showSuccessToast}
        >
          <ButtonIcon as={AddIcon} size="xl" />
          <Text style={styles.labelBtn}>Agregar</Text>
        </Button>
      </View>
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
