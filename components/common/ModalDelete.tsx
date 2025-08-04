import {
  Modal,
  ModalBackdrop,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader
} from "@/components/ui/modal";
import { Button, ButtonText } from "../ui/button";
import { Heading } from "../ui/heading";
import { CloseIcon, Icon } from "../ui/icon";

type ModalDeleteProps = {
  show: boolean;
  onCloseClick: () => void;
  onConfirm?: () => void;
};

const ModalDelete = ({
  show,
  onCloseClick,
  onConfirm
}: ModalDeleteProps) => {
    return (
      <Modal
        isOpen={show}
        onClose={() => onCloseClick?.()}
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
              onPress={() => onCloseClick?.()}
            >
              <ButtonText>Volver</ButtonText>
            </Button>
            <Button
              onPress={() => onConfirm?.()}
            >
              <ButtonText>Eliminar</ButtonText>
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    );
  };

  export default ModalDelete;
