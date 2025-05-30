import React, { useState } from 'react';
import {  StyleSheet, Text, View, TouchableOpacity} from "react-native";
import { Ionicons } from '@expo/vector-icons'; 

export default function  ListaPersonagens({ navigation }){
    return(
        <View style={styles.container}>
         
            <TouchableOpacity 
                style={styles.botaoCriar}
                onPress={() => navigation.navigate("CadastrarPersonagem")}
            >
                <View style={styles.conteudoBotao}>
                    <Text style={styles.textoBotao}>CRIAR PERSONAGEM</Text>
                    <Ionicons name="add-outline" size={30} color="#fff" /> 
                </View>
            </TouchableOpacity>

           <Text style={styles.title}>Lista de personagens:</Text>
         
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

  title: {
    fontSize: 20,
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
  },
  botaoCriar:{
    position: 'absolute',
    width: '90%',
    top: 0,
    zIndex: 1,
    borderBottomEndRadius: 20,
    borderBottomStartRadius:20,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#3B004F',
    height: 50
  },
  conteudoBotao: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  textoBotao: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '700',
    letterSpacing: 1,
    marginRight: 10,
  },
});