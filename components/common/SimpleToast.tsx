import React, { forwardRef, useImperativeHandle, useState } from "react";

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
  const [, setToastId] = useState<string>("");
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
            <Toast nativeID={uniqueToastId} action="muted" variant="solid" style={{ height: "40%", marginTop: '50%' }}>
              <ToastTitle>{headerMsg}</ToastTitle>
              <ToastDescription style={{ fontSize: 20 }}>{msg}</ToastDescription>
            </Toast>
          );
        },
      });
    },
  }));

  return null;
});

SimpleToast.displayName = "SimpleToast"; // Para que el nombre del componente sea correcto en DevTools
