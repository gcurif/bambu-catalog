import { Tabs } from "expo-router";
import React from "react";
import { Platform } from "react-native";

import { HapticTab } from "@/components/HapticTab";
import { IconSymbol } from "@/components/ui/IconSymbol";
import TabBarBackground from "@/components/ui/TabBarBackground";
import { Colors } from "@/constants/Colors";
import { useColorScheme } from "@/hooks/useColorScheme";

export default function TabLayout() {
  const colorScheme = useColorScheme();

  return (
    <Tabs
      screenOptions={{
        tabBarPosition: "bottom",
        tabBarInactiveTintColor: "#f0f0f0ff",
        tabBarActiveTintColor: Colors[colorScheme ?? "light"].tint,
        headerShown: false,
        tabBarButton: HapticTab,
        tabBarBackground: TabBarBackground,
        tabBarStyle: Platform.select({
          ios: {
            // Use a transparent background on iOS to show the blur effect
            position: "absolute",
          },
          default: {
            height: 0,
            backgroundColor: "#757b7eff",
          },
        }),
        tabBarLabelStyle: {
          fontSize: 16,
        },
        tabBarItemStyle: {
          backgroundColor: "#151718",
          height: 64,
          bottom: 50,
          borderTopStartRadius: 100,
          borderTopEndRadius: 100,
        },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Buscar",
          tabBarIcon: ({ color }) => (
            <IconSymbol size={32} name="search" color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="add"
        options={{
          title: "Agregar",
          tabBarIcon: ({ color }) => (
            <IconSymbol size={32} name="plus" color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="edit"
        options={{
          title: "Editar",
          tabBarIcon: ({ color }) => (
            <IconSymbol size={32} name="edit.fill" color={color} />
          ),
        }}
      />
      <Tabs.Screen
        // Name of the route to hide.
        name="detail"
        options={{
          // This tab will no longer show up in the tab bar.
          href: null,
        }}
      />
    </Tabs>
  );
}
