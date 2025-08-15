// UserContext.tsx
import { User } from "@/model/schema";
import React, { createContext, useContext, useState } from "react";

// Creamos el contexto
const UserContext = createContext<{
  user: User | null;
  setUser: React.Dispatch<React.SetStateAction<User | null>>;
}>({
  user: null,
  setUser: () => {}
});

// Hook para usar el contexto más fácil
export function useUser() {
  return useContext(UserContext);
}

// Provider para envolver la app
export function UserProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
}
