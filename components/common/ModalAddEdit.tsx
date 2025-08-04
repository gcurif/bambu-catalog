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
import Field from "./Field";

const ModalAddEdit = ({
  value,
  onChangeValue,
  inputPlaceHolder,
  onConfirm,
  onCancel,
  onCloseClick,
  show,
}: ModalAddEditProps) => {
  return (
    <Modal isOpen={show} onClose={() => onCloseClick?.()} size="md">
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
          <Field
            placeholder={inputPlaceHolder}
            value={value}
            onChange={() => onChangeValue?.(value)}
            type="text"
          />
        </ModalBody>
        <ModalFooter>
          <Button
            variant="outline"
            action="secondary"
            onPress={() => {
              onCancel?.();
            }}
          >
            <ButtonText>Cancelar</ButtonText>
          </Button>
          <Button onPress={() => onConfirm?.(value)}>
            <ButtonText>Agregar</ButtonText>
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
};

export default ModalAddEdit;
