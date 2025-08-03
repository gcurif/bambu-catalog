import React, { forwardRef, useImperativeHandle } from "react";

import {
  Toast,
  ToastDescription,
  ToastTitle,
  useToast,
} from "@/components/ui/toast";

export type SimpleToastRef = {
  show: (message: string, headerMsg: string) => void;
};

type Props = {};

export const SimpleToast = forwardRef<SimpleToastRef, Props>((_, ref) => {
  const [, setToastId] = React.useState<string>("");
  const toast = useToast();
  // Exponer la función al padre
  useImperativeHandle(ref, () => ({
    show: (msg: string, headerMsg: string) => {
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
              <ToastTitle>{headerMsg}</ToastTitle>
              <ToastDescription>{msg}</ToastDescription>
            </Toast>
          );
        },
      });
    },
  }));

  return null;
});

SimpleToast.displayName = "SimpleToast"; // Para que el nombre del componente sea correcto en DevTools
