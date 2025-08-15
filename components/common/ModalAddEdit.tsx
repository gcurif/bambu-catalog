import { Button, ButtonText } from "@/components/ui/button";
import { Heading } from "@/components/ui/heading";
import { CloseIcon, Icon } from "@/components/ui/icon";
import {
  Modal,
  ModalBackdrop,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
} from "@/components/ui/modal";
import React from "react";
import { StyleSheet } from "react-native";
import Field from "./Field";

const ModalAddEdit = ({
  value,
  onChangeValue,
  inputPlaceHolder,
  onConfirm,
  onCancel,
  onCloseClick,
  show,
  title = "Agregar/Editar Opción",
}: ModalAddEditProps) => {
  const fieldRef = React.useRef(null);
  React.useEffect(() => {
    console.log("ModalAddEdit mounted", fieldRef);
    if (fieldRef.current) {
      fieldRef.current.focus();
    }
  }, [show]);

  return (
    <Modal isOpen={show} onClose={() => onCloseClick?.()} size="lg">
      <ModalBackdrop />
      <ModalContent>
        <ModalHeader>
          <Heading size="xl" className="text-typography-950">
            {title}
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
          <Field
            lgBorder={true}
            inputRef={fieldRef}
            placeholder={inputPlaceHolder}
            value={value}
            onChange={(val) => onChangeValue?.(val)}
            type="text"
          />
        </ModalBody>
        <ModalFooter>
          <Button
            size="xl"
            variant="outline"
            action="secondary"
            onPress={() => {
              onCancel?.();
            }}
          >
            <ButtonText size="xl" style={{ fontSize: 20 }}>
              Cancelar
            </ButtonText>
          </Button>
          <Button onPress={() => onConfirm?.(value)} size="xl">
            <ButtonText size="xl" style={{ fontSize: 20 }}>
              Agregar
            </ButtonText>
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

type ModalAddEditProps = {
  value: string;
  onConfirm: (value: string) => void;
  onChangeValue?: (value: string) => void;
  onCancel?: () => void;
  onCloseClick: () => void;
  inputPlaceHolder?: string;
  show: boolean;
  title: string;
};

const inputStyle = StyleSheet.create({
  input: {
    borderColor: "rgba(47, 144, 255, 1)",
    borderWidth: 2,
  }
});



export default ModalAddEdit;
