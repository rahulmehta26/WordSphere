import {
  View,
  StyleSheet,
} from "react-native";
import React, { useEffect } from "react";
import CustomSafeAreaView from "../components/CustomSafeAreaView";
import Animated, {
  Easing,
  useAnimatedStyle,
  useSharedValue,
  withDelay,
  withTiming,
} from "react-native-reanimated";
import { useNavigation } from "@react-navigation/native";

const SplashScreen = () => {

  const navigation = useNavigation()

  const text = "WordSphere";
  const letters = text.split("");

  const animations = letters.map(() => useSharedValue(50));

  useEffect(() => {
    animations.forEach((animation, index) => {
      animation.value = withDelay(
        index * 500,
        withTiming(0, {
          duration: 400,
          easing: Easing.out(Easing.ease),
        })
      );
    });

    const totalAnimationDuration = letters.length * 500 + 500;

    const timeout = setTimeout(() => {
      navigation.navigate("Home"); 
    }, totalAnimationDuration);

    return () => clearTimeout(timeout);

  }, []);

  

  return (
    <CustomSafeAreaView customStyle={styles.container}>

      <View style={styles.textContainer}>
        {letters.map((letter, index) => {
          const animatedStyle = useAnimatedStyle(() => ({
            transform: [{ translateY: animations[index].value }],
            opacity: animations[index].value === 50 ? 0 : 1,
          }));

          return (
            <Animated.Text key={index} style={[styles.letter, animatedStyle]}>
              {letter}
            </Animated.Text>
          );
        })}
      </View>
    </CustomSafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },

  textContainer: {
    flexDirection: "row",
  },

  letter: {
    fontSize: 32,
    fontWeight: "bold",
    marginHorizontal: 2,
    color: "white",
  },
});

export default SplashScreen;
