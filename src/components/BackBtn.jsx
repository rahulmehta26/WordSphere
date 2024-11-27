import { View, Text, StyleSheet, useWindowDimensions, TouchableOpacity } from 'react-native';
import React from 'react';
import {ArrowLeftIcon as ArrowLeftOutline} from 'react-native-heroicons/outline'
import { useNavigation } from '@react-navigation/native';

const BackBtn = () => {

  const {width, height} = useWindowDimensions();

  const navigation = useNavigation();

  const customStyles = {
    width: width * 0.10, 
    height: height * 0.05, 
    borderRadius: (width * 0.12) / 2, 
  };

  return (
    <TouchableOpacity 
    activeOpacity={0.8} 
    style = {[styles.container, customStyles]} 
    onPress={() => navigation.goBack()}
    >

      <ArrowLeftOutline color={"black"} size={18} strokeWidth={2} />
      
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({

  container:{
    backgroundColor:'white',
    justifyContent:'center',
    alignItems:'center'
  }
})

export default BackBtn;