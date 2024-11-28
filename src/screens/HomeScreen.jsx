import {
  View,
  Text,
  StyleSheet,
  useWindowDimensions,
  ActivityIndicator,
} from "react-native";
import React, { useEffect, useState } from "react";
import CustomSafeAreaView from "../components/CustomSafeAreaView";
import Header from "../components/Header";
import Btn from "../components/Btn";
import CustomText from "../components/CustomText";
import AsyncStorage from "@react-native-async-storage/async-storage";
import fetchRandomWordData from "../utils/wordServices";

const HomeScreen = () => {
  const { width, height } = useWindowDimensions();
  const [wordData, setWordData] = useState({
    word: "Loading...",
    definition: "Fetching definition...",
    example: "Fetching example...",
  });

  const [loading, setLoading] = useState(true);

  const fetchWord = async () => {

    setLoading(true);

    const data = await fetchRandomWordData();

    const timestamp = new Date().toLocaleString();

    const wordWithTimestamp = {
      ...data,
      timestamp,
    };

    if (data && data.word !== "Word not found in dictionary") {
      try {
        const storedData = await AsyncStorage.getItem("wordHistory");
  
        const wordHistory = storedData ? JSON.parse(storedData) : [];
  
        wordHistory.push(wordWithTimestamp);
  
        await AsyncStorage.setItem("wordHistory", JSON.stringify(wordHistory));
      } catch (error) {
      }
    }

    setWordData(data);
    setLoading(false);
  };

  useEffect(() => {
    fetchWord();
  }, []);

  const customStyle = {
    marginTop: height * 0.05,
    gap: 5,
  };

  return (
    <CustomSafeAreaView>
      <Header isHistory={true} title="Home" />

      {loading ? (
        <ActivityIndicator
          size="large"
          color="#ffffff"
          style={[{ gap: 0 }, customStyle]}
        />
      ) : (
        <>
          <View style={[customStyle, { marginLeft: 0 }]}>
            <CustomText
              variants="medium"
              styles={{ fontWeight: "bold", textAlign: "center" }}
            >
              {" "}
              Today's WordSphere{" "}
            </CustomText>

            <CustomText
              styles={{
                fontSize: height * 0.285,
                fontWeight: "bold",
                textAlign: "center",
              }}
            >
              {wordData.word?.charAt(0).toUpperCase() + wordData.word?.slice(1)}
            </CustomText>
          </View>

          <View style={[customStyle, { marginLeft: 0 }]}>
            <CustomText
              variants="medium"
              styles={{ fontWeight: "bold", textAlign: "center" }}
            >
              {" "}
              Definition{" "}
            </CustomText>

            <CustomText
              variants="small"
              styles={{ fontWeight: "semibold", textAlign: "center" }}
            >
              {wordData.definition}
            </CustomText>
          </View>

          <View style={[customStyle, { marginLeft: 0 }]}>
            <CustomText
              variants="medium"
              styles={{ fontWeight: "bold", textAlign: "center" }}
            >
              {" "}
              Example{" "}
            </CustomText>

            <CustomText
              variants="small"
              styles={{ fontWeight: "semibold", textAlign: "center" }}
            >
              {wordData.example}
            </CustomText>
          </View>

          <View style={styles.btnContainer}>
            <View style={styles.btn}>
              <Btn title="New Word" onPress={fetchWord} />
            </View>
          </View>
        </>
      )}
    </CustomSafeAreaView>
  );
};

const styles = StyleSheet.create({
  btnContainer: {
    flex: 1,
  },

  btn: {
    flex: 1,
    justifyContent: "flex-end",
    alignItems: "center",
  },
});

export default HomeScreen;
