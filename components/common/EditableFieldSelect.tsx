
import FieldSelect from "./FieldSelect";

const EditableFieldSelect = ({
  placeholder,
  value,
  handleChange,
  options,
}: EditableFieldSelectProps) => {
  return (
    <FieldSelect
      placeholder={placeholder}
      value={value}
      handleChange={handleChange}
      options={options}
    />
  );
};

type EditableFieldSelectOption = {
  label: string;
  value: string;
};

type EditableFieldSelectProps = {
  placeholder?: string;
  value?: string;
  handleChange?: (value: string) => void;
  options?: EditableFieldSelectOption[];
};

export default EditableFieldSelect;
