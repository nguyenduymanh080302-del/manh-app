import { Tabs } from "expo-router";
import React from "react";

import { HapticTab } from "@/components/haptic-tab";
import { IconSymbol } from "@/components/icons/icon-symbol";
import { colors } from "@/constants/_colors";

export default function TabLayout() {

  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: colors.primary,
        tabBarButton: HapticTab,
      }}
    >
      {/* Home */}
      <Tabs.Screen
        name="index"
        options={{
          title: "Home",
          tabBarIcon: ({ color }) => (
            <IconSymbol name="home" size={28} color={color} />
          ),
        }}
      />

      <Tabs.Screen
        name="music"
        options={{
          title: "Music",
          tabBarIcon: ({ color }) => (
            <IconSymbol name="music-note" size={28} color={color} />
          ),
        }}
      />

      <Tabs.Screen
        name="debt"
        options={{
          title: "Debt",
          tabBarIcon: ({ color }) => (
            <IconSymbol name="credit-card" size={28} color={color} />
          ),
        }}
      />

      {/* Settings */}
      <Tabs.Screen
        name="setting"
        options={{
          title: "Settings",
          tabBarIcon: ({ color }) => (
            <IconSymbol name="settings" size={28} color={color} />
          ),
        }}
      />
    </Tabs>
  );
}
