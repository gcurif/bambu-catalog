import { Stack } from "expo-router";
import React, { useState } from "react";

import Login from "@/components/Login";
import { useColorScheme } from "@/hooks/useColorScheme";

const users = {
  admin : {
    name: "Admin",
    pass: "123"
  },
  operador : {
    name: "Operador",
    pass: "123"
  }
}

export default function TabLayout() {
  const colorScheme = useColorScheme();
  const [user, setUser] = useState(users.admin);

  if(!user){
    return <Login onLogin={() => setUser(users.admin)}/>;  // Show login screen
  }


  return (
    <Stack
      screenOptions={{
        headerShown: false
      }}
    />
  );
}
