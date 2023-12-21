import { StyleSheet, Text, View, SafeAreaView } from "react-native";
import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Login from "../screens/Login";
import Register from "../screens/Register";
import HomeScreen from "../screens/HomeScreen";
import ProductInfoScreen from "../screens/ProductInfoScreen";
import AddAddressScreen from "../screens/AddAddressScreen";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Entypo } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";
import { FontAwesome5 } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import ProfileScreen from "../screens/ProfileScreen";
import MenuScreen from "../screens/MenuScreen";
import ChangePasswordScreen from "../screens/ChangePasswordScreen";
import ComplaintsScreen from "../screens/ComplaintsScreen";
import OrderScreen from "../screens/OrderScreen";
import ForgotPasswordScreen from "../screens/ForgotPasswordScreen";
import PaymentScreen from "../screens/PaymentScreen";
import PaymentHistoryScreen from "../screens/PaymentHistoryScreen";

const StackNavigation = () => {
  const Stack = createNativeStackNavigator();
  const Tab = createBottomTabNavigator();
  function BottomTab() {
    return (
      <Tab.Navigator screenOptions={{style:{height:90,}}}>
        <Tab.Screen
          name="HomeScreen"
          component={HomeScreen}
          options={{
            tabBarLabel: "Home",
            tabBarLabelStyle: { color: "grey" },
            headerShown: false,
            tabBarIcon: ({ focused }) =>
              focused ? (
                <Entypo name="home" size={33} color="#5B9BD5" />
              ) : (
                <AntDesign name="home" size={33} color="grey" />
              ),
          }}
        />
        <Tab.Screen
          name="ProfileScreen"
          component={ProfileScreen}
          options={{
            tabBarLabel: "Profile",
            tabBarLabelStyle: { color: "grey" },
            headerShown: false,
            tabBarIcon: ({ focused }) =>
              focused ? (
                <FontAwesome5 name="user-alt" size={30} color="#5B9BD5" />
              ) : (
                <FontAwesome5 name="user" size={30} color="grey" />
              ),
          }}
        />
        <Tab.Screen
          name="OrderScreen"
          component={OrderScreen}
          options={{
            tabBarLabel: "Orders",
            tabBarLabelStyle: { color: "grey" },
            headerShown: false,
            tabBarIcon: ({ focused }) =>
              focused ? (
                <MaterialCommunityIcons name="shopping" size={32} color="#5B9BD5" />
              ) : (
                <MaterialCommunityIcons name="shopping-outline" size={32} color="grey" />
              ),
          }}
        />
        <Tab.Screen
          name="MenuScreen"
          component={MenuScreen}
          options={{
            tabBarLabel: "Menu",
            tabBarLabelStyle: { color: "grey" },
            headerShown: false,
            tabBarIcon: ({ focused }) =>
              focused ? (
                <Ionicons name="menu" size={40} color="#5B9BD5" />
              ) : (
                <Ionicons name="menu-outline" size={40} color="grey" />
              ),
          }}
        />
      </Tab.Navigator>
    );
  }
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Login"
          component={Login}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Register"
          component={Register}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Main"
          component={BottomTab}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Info"
          component={ProductInfoScreen}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="Address"
          component={AddAddressScreen}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="password"
          component={ChangePasswordScreen}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="complaints"
          component={ComplaintsScreen}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="forgotPassword"
          component={ForgotPasswordScreen}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="payment"
          component={PaymentScreen}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="paymentHistory"
          component={PaymentHistoryScreen}
          options={{headerShown: false}}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default StackNavigation;

const styles = StyleSheet.create({});
