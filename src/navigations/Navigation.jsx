import { View, Text, StatusBar } from "react-native";
import React from "react";
import HomeScreen from "../screens/HomeScreen";

const Navigation = () => {

  return (

    <View>

      <StatusBar barStyle={"light-content"} backgroundColor={"black"} />

      <HomeScreen />
      
    </View>
  );
};

export default Navigation;
