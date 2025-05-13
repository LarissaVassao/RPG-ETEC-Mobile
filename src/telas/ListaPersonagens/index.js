import React, { useState } from 'react';
import {  StyleSheet, Text, View, TouchableOpacity} from "react-native";
import { Ionicons } from '@expo/vector-icons'; 

export default function  ListaPersonagens({ navigation }){
    return(
        <View style={styles.container}>
           <TouchableOpacity 
                style={styles.backButton}
                onPress={() => navigation.navigate("Home")}
            >
                <Ionicons name="arrow-back-outline" size={30} color="#3B004F" />
            </TouchableOpacity>
            
           <Text style={styles.title}>Lorem ipsum?</Text>
           <Text style={styles.texto}>
Maecenas tempus purus sit amet pretium dictum. Integer bibendum in ipsum eget venenatis. Vivamus eget orci est. Integer venenatis tortor ut volutpat scelerisque. Nunc laoreet magna semper neque bibendum venenatis. In hac habitasse platea dictumst. Nulla convallis purus in tempus commodo. Curabitur eget ornare tortor. Nullam tristique, nisl non aliquam finibus, enim neque aliquam erat, non fermentum nisi diam ac leo. Etiam luctus blandit nunc, vitae bibendum leo. Vestibulum ultrices fermentum mi, vitae suscipit libero fermentum sit amet. Nam purus orci, interdum facilisis mauris non, vulputate lobortis nunc. Suspendisse dolor libero, pretium vitae maximus lacinia, luctus vitae lacus.</Text>
          
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