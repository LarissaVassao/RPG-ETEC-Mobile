import React, { useState } from 'react';
import {  StyleSheet, Text, View, TouchableOpacity} from "react-native";
import { Ionicons } from '@expo/vector-icons'; 

export default function  TelaCampanha({ navigation }){
    return(
        <View style={styles.container}>
         <TouchableOpacity 
                         style={styles.backButton}
                         onPress={() => navigation.navigate("Home")}
                     >
                         <Ionicons name="arrow-back-outline" size={30} color="#3B004F" />
           </TouchableOpacity>
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