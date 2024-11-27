import {
  View,
  Text,
  StyleSheet,
  useWindowDimensions,
  ScrollView,
  TouchableOpacity,
  Image,
} from "react-native";
import React, { useEffect, useState } from "react";
import CustomSafeAreaView from "../components/CustomSafeAreaView";
import Header from "../components/Header";
import CustomText from "../components/CustomText";
import Btn from "../components/Btn";
import { ChevronDownIcon, ChevronUpIcon, TrashIcon } from "react-native-heroicons/outline";
import AsyncStorage from "@react-native-async-storage/async-storage";

const HistoryScreen = () => {
  const { width, height } = useWindowDimensions();
  const [isToggled, setIsToggled] = useState({});
  const [historyData, setHistoryData] = useState([]);

  const customStyle = {
    gap: 5,
  };

  const toggleCard = (index) => {
    setIsToggled((prev) => ({
      ...prev,
      [index]: !prev[index],
    }));
  };

  const fetchHistory = async () => {
    try {
      const storedData = await AsyncStorage.getItem("wordHistory");
      if (storedData) {
        setHistoryData(JSON.parse(storedData));
      }
    } catch (error) {
      console.error("Error fetching history data from AsyncStorage", error);
    }
  };

  const deleteCard = async (index) => {
    try {
      const updatedHistory = historyData.filter((item, i) => i !== index);
      setHistoryData(updatedHistory); 

      await AsyncStorage.setItem("wordHistory", JSON.stringify(updatedHistory));
    } catch (error) {
      console.error("Error deleting card from AsyncStorage", error);
    }
  };

  const clearHistory = async () => {
    try {
      await AsyncStorage.removeItem("wordHistory");
      setHistoryData([]); 
    } catch (error) {
    }
  };


  useEffect(() => {
    fetchHistory(); 
  }, []);

  return (
    <CustomSafeAreaView>
      <Header isBackBtn={true} title="History" />

{
   historyData?.length === 0 ? (

    <View
    style ={{
      flex:1,
      justifyContent:'center',
      alignItems:'center'
    }}
    >
      
      <Image 
       source={require('../assets/images/nothing.png')}
       style = {{
        width: width * 0.8,
        height: height * 0.4,
        resizeMode:'cover'
       }}
      />

      <CustomText variants="large" styles={{fontWeight:'bold'}} >Nothing to show </CustomText>
    </View>
  ) : (

    <ScrollView
      showsVerticalScrollIndicator={false}
    >
      {historyData?.map((info, index) => {
    
            const toggled = isToggled[index];
    
        return (
          <View key={index} style={[styles.cardContainer, customStyle]}>
            <TouchableOpacity
              style={{
                position: "absolute",
                right: 26,
                paddingHorizontal: 10,
                paddingVertical: 10,
                zIndex:1
              }}
            >
              {toggled ? (
                <ChevronUpIcon
                  size={24}
                  color="black"
                  onPress={() => toggleCard(index)}
                />
              ) : (
                <ChevronDownIcon
                  size={24}
                  color="black"
                  onPress={() => toggleCard(index)}
                />
              )}
            </TouchableOpacity>
    
            <TouchableOpacity
              style={{
                position: "absolute",
                right: 0,
                paddingHorizontal: 10,
                paddingVertical: 10,
                zIndex:1
              }}
              onPress={() => deleteCard(index)}
            >
    
                <TrashIcon
                  size={20}
                  color="black"
                />
             
            </TouchableOpacity>
    
            <CustomText
              variants="medium"
              styles={{
                fontWeight: "bold",
                textAlign: "center",
                color: "black",
              }}
            >
              {" "}
              Today's WordSphere{" "}
            </CustomText>
    
            <CustomText
              styles={{
                fontSize: height * 0.285,
                fontWeight: "bold",
                textAlign: "center",
                color: "black",
              }}
            >
              {info?.word?.charAt(0)?.toUpperCase() + info?.word?.slice(1) }
            </CustomText>
    
            <CustomText
              variants="medium"
              styles={{
                fontWeight: "bold",
                textAlign: "center",
                color: "black",
              }}
            >
              {" "}
              Definition{" "}
            </CustomText>
    
            <CustomText
              variants="small"
              styles={{
                fontWeight: "semibold",
                textAlign: "center",
                color: "black",
              }}
            >
              {info?.definition}
            </CustomText>
    
            <CustomText
              variants="medium"
              styles={{
                fontWeight: "bold",
                textAlign: "center",
                color: "black",
              }}
            >
              {" "}
              Example{" "}
            </CustomText>
    
            <CustomText
              variants="small"
              styles={{
                fontWeight: "semibold",
                textAlign: "center",
                color: "black",
              }}
            >
              {info?.example}
            </CustomText>

            <CustomText
              variants="small"
              styles={{
                textAlign: "center",
                color: "black",
              }}
            >
              {info?.timestamp}
            </CustomText>
          </View>
        );
      })}
    </ScrollView>
  )
}

      <View style={styles.btnContainer}>
        <View style={styles.btn}>
          <Btn title="Clear History" onPress={clearHistory} />
        </View>
      </View>
    </CustomSafeAreaView>
  );
};

const styles = StyleSheet.create({
  cardContainer: {
    width: "100%",
    backgroundColor: "white",
    padding: 4,
    marginVertical: 8,
    paddingVertical: 12,
    borderRadius: 8,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 2,
    position: "relative",
  },

  btnContainer: {
    flex:1
  },

  btn: {
    flex:1,
    justifyContent: "flex-end",
    alignItems: "center",
  },
});

export default HistoryScreen;
