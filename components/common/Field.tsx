import { Input, InputField } from "@/components/ui/input";
import React from 'react';

type FieldProps = {
  placeholder: string | undefined;
  value: any;
  handleChange: (value: any) => void;
  type: string;
};

const Field: React.FC<FieldProps> = ({ placeholder, value, handleChange, type }) => {

    const validateNumber = (value: string) => {
      const trimmed = value.trim();
      return (trimmed === "" || /^-?\d+(\.\d+)?$/.test(trimmed));
    };

    const handleInternalChange = (value: string) => {
      if (handleChange) {
        handleChange(value);
      }
    };

    const handleNumberChange = (value: string) => {
      if (validateNumber(value)) {
        handleInternalChange(value);
      }
    };

    return (
            <Input
              variant="outline"
              size="xl"
              style={{ backgroundColor: "rgba(255, 255, 255, 1)" }}
            >
              <InputField
                placeholder={placeholder}
                value={value}
                onChangeText={(value) =>
                  type === "number"
                    ? handleInternalChange(value)
                    : handleNumberChange(value)
                }
              />
            </Input>
    );
};

export default Field;