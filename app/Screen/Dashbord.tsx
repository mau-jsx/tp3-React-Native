import { Feather, Ionicons, MaterialIcons } from "@expo/vector-icons";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import React from "react";
import { Platform } from "react-native";
import Calculadora from "./Calculadora";
import Productos from "./ProductList";
import Tareas from "./Tareas";
import UserCreate from "./UserCreate";

const Tab = createBottomTabNavigator();

export default function Dashbord() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          if (route.name === "Inicio") {
            return (
              <Ionicons
                name={focused ? "person" : "person-outline"}
                size={24}
                color={color}
              />
            );
          } else if (route.name === "Calculadora") {
            return (
              <MaterialIcons
                name={focused ? "calculate" : "calculate"}
                size={24}
                color={color}
              />
            );
          } else if (route.name === "Productos") {
            return (
              <Feather
                name={focused ? "package" : "box"}
                size={24}
                color={color}
              />
            );
          } else if (route.name === "Tareas") {
            return (
              <MaterialIcons
                name={focused ? "assignment" : "assignment"}
                size={24}
                color={color}
              />
            );
          }
        },
        tabBarActiveTintColor: "#8e44ad",
        tabBarInactiveTintColor: "#aaa",
        tabBarStyle: {
          backgroundColor: "#1e1e2e",
          borderTopWidth: 0,
          elevation: 10,
          height: Platform.OS === "ios" ? 90 : 70,
          borderTopLeftRadius: 20,
          borderTopRightRadius: 20,
          position: "absolute",
        },
        tabBarLabelStyle: {
          fontSize: 12,
          fontWeight: "600",
          marginBottom: Platform.OS === "ios" ? 10 : 5,
        },
        headerShown: false,
      })}
    >
      <Tab.Screen name="Inicio" component={UserCreate} />
      <Tab.Screen name="Calculadora" component={Calculadora} />
      <Tab.Screen name="Productos" component={Productos} />
      <Tab.Screen name="Tareas" component={Tareas} />
    </Tab.Navigator>
  );
}
