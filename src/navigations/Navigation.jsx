import { View, Text, StatusBar } from "react-native";
import React from "react";
import HomeScreen from "../screens/HomeScreen";
import CustomSafeAreaView from "../components/CustomSafeAreaView";
import HistoryScreen from "../screens/HistoryScreen";
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";

const Stack = createStackNavigator();

const Navigation = () => {

  return (


    <NavigationContainer>

      <StatusBar barStyle={"light-content"} backgroundColor={"black"} />

      <Stack.Navigator initialRouteName="Home" screenOptions={{headerShown:false}}  >

        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="History" component={HistoryScreen} />

      </Stack.Navigator>

      
    </NavigationContainer>
  );
};

export default Navigation;
