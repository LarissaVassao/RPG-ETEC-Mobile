import React from "react";
import { StyleSheet, Text, View } from "react-native";

export default function  Usuario({ navigation }){
    return(
        <View style={styles.container}>
            <Text style={styles.texto}>Tela de Usuário</Text>

        </View>
    )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  texto: {
    fontFamily: 'Comic-Sans',
    fontSize: 40,
    color: '#8465',
  }
});