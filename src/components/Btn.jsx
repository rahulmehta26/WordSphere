import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  useWindowDimensions,
} from "react-native";
import React from "react";
import CustomText from "./CustomText";

const Btn = ({ title, onPress }) => {
  const { width, height } = useWindowDimensions();

  const customStyles = {
    width: width * 0.9,
    height: height * 0.065,
    marginVertical: height * 0.005
  };

  return (
    <TouchableOpacity
      activeOpacity={0.8}
      style={[styles.container, customStyles]}
      onPress={onPress}
    >
      <CustomText
        variants="medium"
        styles={{ alignSelf: "center", fontWeight: "bold", color:'black' }}
      >
        {title}
      </CustomText>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    borderRadius: 4,
    padding: 10,
  },
});

export default Btn;
