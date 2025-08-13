import { router, Stack, usePathname } from "expo-router";
import React, { useState } from "react";

import Login from "@/components/Login";
import { Fab, FabIcon, FabLabel } from "@/components/ui/fab";
import { ArrowLeftIcon } from "@/components/ui/icon";
import { useColorScheme } from "@/hooks/useColorScheme";

const users = {
  admin: {
    name: "Admin",
    pass: "123",
  },
  operador: {
    name: "Operador",
    pass: "123",
  },
};

export default function TabLayout() {
  const colorScheme = useColorScheme();
  const [user, setUser] = useState(users.admin);
  const pathname = usePathname();

  if (!user) {
    return (
      <>
        <Login onLogin={() => setUser(users.admin)} />
      </>
    );
  }
  return (
    <>
      <Stack
        screenOptions={{
          headerShown: false,
        }}
      />
      {pathname !== "/" && <BackButton />}
    </>
  );
}

const BackButton = () => {
  return (
    <Fab style={{ position: "absolute", top: 24, right: 20, width: 90, height: 90 }} onPress={() => router.back()}>
      <FabIcon as={ArrowLeftIcon} />
      <FabLabel style={{ fontSize: 12 }}>Volver</FabLabel>
    </Fab>
  );
};
