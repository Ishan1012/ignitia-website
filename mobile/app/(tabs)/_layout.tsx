import Ionicons from "@expo/vector-icons/Ionicons";
import { Tabs } from "expo-router";

export default function Layout() {

  return (
    <>
      <Tabs
        screenOptions={{
          tabBarStyle: {
            backgroundColor: "#222",
          },

          tabBarActiveTintColor: "#fff",
          tabBarInactiveTintColor: "#888",
          headerShown: false,
        }}
      >
        <Tabs.Screen name="home" options={{
          headerShown: false, tabBarIcon: ({ focused, color, size }) => (
            <Ionicons
              name={focused ? "home" : "home-outline"}
              size={size}
              color={color}
            />
          ),
        }} />
        <Tabs.Screen name="events" options={{
          headerShown: false, tabBarIcon: ({ focused, color, size }) => (
            <Ionicons
              name={focused ? "star" : "star-outline"}
              size={size}
              color={color}
            />
          ),
        }} />
        <Tabs.Screen name="gallery" options={{
          headerShown: false, tabBarIcon: ({ focused, color, size }) => (
            <Ionicons
              name={focused ? "images" : "images-outline"}
              size={size}
              color={color}
            />
          ),
        }} />
        <Tabs.Screen name="about" options={{
          headerShown: false, tabBarIcon: ({ focused, color, size }) => (
            <Ionicons
              name={focused ? "information-circle" : "information-circle-outline"}
              size={size}
              color={color}
            />
          ),
        }} />
      </Tabs>
    </>
  );
}
