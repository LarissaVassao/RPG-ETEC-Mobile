import React, { useState } from 'react';
import {  StyleSheet, Text, View, TouchableOpacity} from "react-native";
import { Ionicons } from '@expo/vector-icons'; 

export default function  TelaCampanha({ navigation }){
    return(
        <View style={styles.container}>
         
        </View>
    )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',

    padding: 50
  },
  texto: {
    fontFamily: 'Comic-Sans',
    fontSize: 40,
    color: '#8465',
  },
  title: {
    fontSize: 26,
    fontWeight: '800',
    color: '#623372',
    marginBottom: 30,
    textAlign: 'center',
  },
  backButton: {
    position: 'absolute',
    top: 15,
    left: 15,
    zIndex: 1,
},
    texto:{
      textAlign: 'justify'
    }
});