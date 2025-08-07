import { Menu, MenuItem, MenuItemLabel } from "@/components/ui/menu";
import { Pressable } from "@/components/ui/pressable";
import { StyleSheet, View } from "react-native";
import { Input, InputField } from "../ui/input";

const FieldSelect = ({
  placeholder,
  value,
  handleChange,
  options,
}: FieldSelectProps) => {
  return (
    <View style={{ flex: 1, width: "100%" }}>
      <Menu
        placement="top"
        offset={5}
        disabledKeys={["Settings"]}
        trigger={({ ...triggerProps }) => {
          return (
            <Pressable {...triggerProps}>
              <Input
                variant="outline"
                size="3xl"
                style={styles.input}
                {...triggerProps}
              >
                <InputField
                  placeholder={placeholder}
                  value={value}
                  editable={false}
                />
              </Input>
            </Pressable>
          );
        }}
      >
        {options?.map((option) => (
          <MenuItem
            key={option.value}
            textValue={option.value}
            onPress={() => {
              handleChange?.(option.value);
            }}
          >
            <MenuItemLabel size="3xl">{option.label}</MenuItemLabel>
          </MenuItem>
        ))}
      </Menu>
    </View>
  );
};

type FieldSelectOption = {
  label: string;
  value: string;
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
    fontSize: 16,
    color: "#000",
  },
});

export default FieldSelect;
