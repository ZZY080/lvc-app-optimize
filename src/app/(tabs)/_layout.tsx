import CustomIcon from "@/src/components/Common/CustomIcon/CustomIcon";
import { Tabs } from "expo-router";
import React from "react";
import { useTranslation } from "react-i18next";

const TabLayout = () => {
  const { t, i18n } = useTranslation();
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: "#6562A9", // 激活颜色
        tabBarInactiveTintColor: "#A1A1AA", // 默认颜色
        headerShown: false,
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: t("tab-bar:home"),
          tabBarIcon: ({ color }) => (
            <CustomIcon name="home-fill" size={24} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="solution"
        options={{
          title: t("tab-bar:solution"),
          tabBarIcon: ({ color }) => (
            <CustomIcon name="company-fill" size={24} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="counselor"
        options={{
          title: t("tab-bar:counselor"),
          tabBarIcon: ({ color }) => (
            <CustomIcon name="customization-fill" size={24} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="insight"
        options={{
          title: t("tab-bar:insight"),
          tabBarIcon: ({ color }) => (
            <CustomIcon name="global-fill" size={24} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="my"
        options={{
          title: t("tab-bar:my"),
          tabBarIcon: ({ color }) => (
            <CustomIcon
              name="customer-businessman-fill"
              size={24}
              color={color}
            />
          ),
        }}
      />
    </Tabs>
  );
};

export default TabLayout;
