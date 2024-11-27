import { View, Text, SafeAreaView, StyleSheet } from 'react-native';
import React from 'react';

const CustomSafeAreaView = ({children}) => {
  return (

    <SafeAreaView style = {styles.container} >
      {children}
    </SafeAreaView>

  );
};

const styles = StyleSheet.create({

  container:{
    flex:1,
    paddingHorizontal:5,
    backgroundColor:'black',
    paddingTop:2,
    paddingBottom:5,
    position:'relative'
  },
});

export default CustomSafeAreaView;