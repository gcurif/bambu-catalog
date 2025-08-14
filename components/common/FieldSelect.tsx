import {
  Modal,
  ModalBackdrop,
  ModalBody,
  ModalContent,
} from "@/components/ui/modal";
import { Pressable } from "@/components/ui/pressable";
import { useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { Input, InputField } from "../ui/input";

const FieldSelect = ({
  placeholder,
  value,
  handleChange,
  options,
}: FieldSelectProps) => {
  const [isOpen, setIsOpen] = useState(false);
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
        <ModalContent style={{ width: '70%'}}>
          <ModalBody
            className="bg-white"
            contentContainerClassName="items-center justify-center p-1 gap-3"
          >
            {options?.map((option) => (
              <View key={option.value}>
                <Pressable
                  onPress={() => {
                    handleChange?.(option.value);
                    setIsOpen(false);
                  }}
                >
                  <Text style={{ fontSize: 18 }}>{option.label}</Text>
                </Pressable>
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
