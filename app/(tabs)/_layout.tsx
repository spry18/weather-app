// app/(tabs)/_layout.tsx
import { Ionicons } from "@expo/vector-icons";
import { BottomTabNavigationOptions } from "@react-navigation/bottom-tabs";
import { Tabs } from "expo-router";
import { useWindowDimensions } from "react-native";

export default function Layout() {
  const { width } = useWindowDimensions();
  const isLargeScreen = width > 400;

  return (
    <Tabs
      screenOptions={({ route }): BottomTabNavigationOptions => ({
        tabBarStyle: {
          height: isLargeScreen ? 70 : 70,
          paddingBottom: isLargeScreen ? 10 : 6,
          paddingTop: isLargeScreen ? 10 : 4,
        },
        tabBarLabelStyle: {
          fontSize: isLargeScreen ? 16 : 12,
          fontWeight: "600",
        },
        tabBarIcon: ({ focused, color, size }) => {
          let iconName: keyof typeof Ionicons.glyphMap;

          if (route.name === "index") {
            iconName = focused ? "cloud" : "cloud-outline";
          } else if (route.name === "forecast") {
            iconName = focused ? "search" : "search-outline";
          } else {
            iconName = "alert";
          }

          return (
            <Ionicons
              name={iconName}
              size={isLargeScreen ? 26 : 20}
              color={color}
            />
          );
        },
        tabBarActiveTintColor: "#007BFF",
        tabBarInactiveTintColor: "#666",
        headerStyle: {
          height: isLargeScreen ? 90 : 70,
        },
        headerTitleStyle: {
          fontSize: isLargeScreen ? 24 : 18,
          fontWeight: "bold",
        },
      })}
    >
      <Tabs.Screen name="index" options={{ title: "City Weather" }} />
      <Tabs.Screen name="forecast" options={{ title: "Forecast Search" }} />
    </Tabs>
  );
}
