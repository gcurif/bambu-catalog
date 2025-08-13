import { Button, ButtonText } from "@/components/ui/button";
import { Heading } from "@/components/ui/heading";
import {
  Modal,
  ModalBackdrop,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
} from "@/components/ui/modal";
import { Text } from "@/components/ui/text";
import React from "react";

interface SimpleAlertProps {
  show: boolean;
  message: string;
  onClose: () => void;
  title?: string;
}

export default function SimpleAlert({
  show,
  message,
  onClose,
  title = "Alerta",
}: SimpleAlertProps) {
  return (
    <Modal isOpen={show} onClose={onClose}>
      <ModalBackdrop />
      <ModalContent>
        <ModalHeader className="items-center">
          <Heading size="xl">{title}</Heading>
          <ModalCloseButton onPress={onClose} />
        </ModalHeader>

        {/* 👇 OJO: usar contentContainerClassName para layout de los hijos */}
        <ModalBody
          className="bg-white"
          contentContainerClassName="items-center justify-center p-4 gap-3"
        >
          <Text size="xl" className="text-center">
            {message}
          </Text>
        </ModalBody>

        <ModalFooter className="justify-center">
          <Button action="primary" onPress={onClose}>
            <ButtonText size="xl">OK</ButtonText>
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}
