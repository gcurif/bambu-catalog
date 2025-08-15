import {
  Modal,
  ModalBackdrop,
  ModalBody,
  ModalContent,
} from "@/components/ui/modal";
import { Pressable } from "@/components/ui/pressable";
import { useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { Divider } from "../ui/divider";
import { Icon, StarIcon } from "../ui/icon";
import { Input, InputField } from "../ui/input";

const FieldSelect = ({
  placeholder,
  value,
  handleChange,
  options,
}: FieldSelectProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const sort = (a: FieldSelectOption, b: FieldSelectOption) => {
    if (a.fav && !b.fav) return -1;
    if (!a.fav && b.fav) return 1;
    return a.label.localeCompare(b.label);
  };
  return (
    <View style={{ flex: 1, width: "100%" }}>
      <Pressable onPress={() => setIsOpen(true)}>
        <Input
          variant="outline"
          size="3xl"
          style={styles.input}
          onTouchEnd={() => setIsOpen(true)}
        >
          <InputField
            placeholder={placeholder}
            value={value}
            editable={false}
          />
        </Input>
      </Pressable>
      <Modal isOpen={isOpen} onClose={() => setIsOpen(false)}>
        <ModalBackdrop />
        <ModalContent style={{ width: "75%" }}>
          <ModalBody
            className="bg-white"
            contentContainerClassName="items-center justify-center p-1 gap-3"
          >
            {options
              ?.sort(sort)
              .map((option) => (
                <View key={option.value} style={{ width: "100%" }}>
                  <Pressable
                    style={{
                      flexDirection: "row",
                      justifyContent: "space-between",
                      width: "100%",
                      padding: 6,
                      alignItems: "center",
                    }}
                    onPress={() => {
                      handleChange?.(option.value);
                      setIsOpen(false);
                    }}
                  >
                    <Text style={{ fontSize: 19 }}>{option.label}</Text>
                    {option.fav && (
                      <Icon as={StarIcon} size="xl" color="#eeca00ff" />
                    )}
                  </Pressable>
                  <Divider style={{ marginVertical: 4 }} />
                </View>
              ))}
          </ModalBody>
        </ModalContent>
      </Modal>
    </View>
  );
};

type FieldSelectOption = {
  label: string;
  value: string;
  fav: boolean;
};

type FieldSelectProps = {
  placeholder?: string;
  value?: string;
  handleChange?: (value: string) => void;
  options?: FieldSelectOption[];
};

const styles = StyleSheet.create({
  picker: {
    fontSize: 28,
  },
  input: {
    backgroundColor: "rgba(255, 255, 255, 1)",
    borderColor: "rgba(217, 235, 255, 1)",
    borderWidth: 1,
    borderRadius: 8,
    padding: 8,
    fontSize: 15,
    height: 68,
    color: "#000",
  },
});

export default FieldSelect;
