import { Tabs } from "expo-router";
import React from "react";

import { HapticTab } from "@/components/haptic-tab";
import { IconFontAwesome } from "@/components/icons/IconFontAwesome";
import { useTheme } from "@react-navigation/native";

export default function TabLayout() {

  const { colors } = useTheme()

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
          tabBarLabelStyle: {
            fontSize: 12
          },
          tabBarIcon: ({ color }) => (
            <IconFontAwesome name="home" size={24} color={color} />
          ),
        }}
      />

      <Tabs.Screen
        name="music"
        options={{
          title: "Music",
          tabBarLabelStyle: {
            fontSize: 12
          },
          tabBarIcon: ({ color }) => (
            <IconFontAwesome name="music" size={24} color={color} />
          ),
        }}
      />

      <Tabs.Screen
        name="debt"
        options={{
          title: "Debt",
          tabBarLabelStyle: {
            fontSize: 12
          },
          tabBarIcon: ({ color }) => (
            <IconFontAwesome name="credit-card" size={24} color={color} />
          ),
        }}
      />

      {/* Settings */}
      <Tabs.Screen
        name="setting"
        options={{
          title: "Settings",
          tabBarLabelStyle: {
            fontSize: 12
          },
          tabBarIcon: ({ color }) => (
            <IconFontAwesome name="gear" size={24} color={color} />
          ),
        }}
      />
    </Tabs>
  );
}
