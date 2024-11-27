import {
  View,
  Text,
  StyleSheet,
  Image,
  useWindowDimensions,
  TouchableOpacity,
} from "react-native";
import React from "react";
import BackBtn from "./BackBtn";
import CustomText from "./CustomText";
import { useNavigation } from '@react-navigation/native';

const Header = ({ title, isBackBtn, isHistory }) => {
  const { width, height } = useWindowDimensions();

  const navigation = useNavigation();

  const customStyles = {
    width: width * 0.1,
    height: height * 0.05,
    borderRadius: (width * 0.12) / 2,
  };

  return (
    <View style={styles.container}>
      {isBackBtn && (
        <View
          style={{
            position: "absolute",
            left: 0,
          }}
        >
          <BackBtn />
        </View>
      )}

      <View style={styles.titleContainer}>
        <CustomText variants="large" styles={{ fontWeight: "bold" }}>
          {title}
        </CustomText>
      </View>

      {isHistory && (
        <TouchableOpacity
          activeOpacity={0.8}
          style={[styles.imgContainer, customStyles]}
          onPress={() => navigation.navigate("History")}
        >
          <Image
            source={require("../assets/images/history.png")}
            style={{
              width: width * 0.05,
              height: height * 0.025,
              resizeMode: "cover",
            }}
          />
        </TouchableOpacity>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    padding: 5,
    position: "relative",
  },

  titleContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },

  imgContainer: {
    backgroundColor: "white",
    justifyContent: "center",
    alignItems: "center",
    position: "absolute",
    right: 0,
  },
});

export default Header;
