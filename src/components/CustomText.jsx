import { View, Text, useWindowDimensions, StyleSheet } from "react-native";
import React from "react";

const CustomText = ({ children, styles, variants = 'small' }) => {
  const { width, height } = useWindowDimensions();

  const fontSizes = {
    small: { fontSize: height * 0.02 },
    medium: { fontSize: height * 0.028 },
    large: { fontSize: height * 0.0385 },
  };

  return (
    <Text style={[style.text, styles, { fontSize: fontSizes[variants].fontSize }]}>
      {children}
    </Text>
  );
};

const style = StyleSheet.create({
  text:{
    color: "white",  
  }
})

export default CustomText;
