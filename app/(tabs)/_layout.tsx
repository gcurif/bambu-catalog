import { router, Stack, useGlobalSearchParams, usePathname } from "expo-router";
import React, { useEffect, useState } from "react";

import Login from "@/components/Login";
import { Fab, FabIcon, FabLabel } from "@/components/ui/fab";
import { ArrowLeftIcon } from "@/components/ui/icon";
import { User } from "@/model/schema";


const LOGIN_STATUS = {
  loggedIn: 1,
  loggedOut: 2,
};

export default function TabLayout() {
  const pathname = usePathname();
  const debug = true;

  const { logout} = useGlobalSearchParams();

  const [loginStatus, setLoginStatus] = useState(LOGIN_STATUS.loggedOut);
  console.log("logout", logout, pathname);
    useEffect(() => {
    if (logout) {
      console.log("Logout detectado en layout");
      setLoginStatus(LOGIN_STATUS.loggedOut);
    }
  }, [logout])

  if (loginStatus === LOGIN_STATUS.loggedOut && !debug) {
    return (
      <>
        <Login onLogin={(user : User) => setLoginStatus(user ? LOGIN_STATUS.loggedIn : LOGIN_STATUS.loggedOut)} />
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
