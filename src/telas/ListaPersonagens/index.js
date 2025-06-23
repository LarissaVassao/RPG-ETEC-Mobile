import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Image } from "react-native";
import { Ionicons } from '@expo/vector-icons'; 

export default function ListaPersonagens({ navigation }) {
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

            <TouchableOpacity 
            style={styles.botaoPersonagem} 
            onPress={() => navigation.navigate("Personagem")}
            >
                <View style={styles.conteudoBotaoPersonagem}>
                    <Image 
                        style={styles.imagemBotao} 
                        resizeMode="contain" 
                        source={require('../../../assets/img/logo.png')} 
                    />
                    <Text style={styles.textoBotaoPersonagem}>[NomePersonagem]</Text>         
                </View>
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: '800',
    color: '#623372',
    marginBottom: 30,
    marginTop: 70,
    textAlign: 'center',
  },
  botaoCriar: {
    width: '100%',
    borderBottomEndRadius: 20,
    borderBottomStartRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#623372',
    height: 50,
    position: 'absolute',
    top: 0,
    zIndex: 1,
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
  botaoPersonagem: {
    width: '95%',
    height: 60,
    borderTopWidth: 1.5,
    borderBottomWidth: 1.5,
    borderColor: '#623372',
    borderRadius: 0,
  },
  conteudoBotaoPersonagem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    paddingHorizontal: 10,
    height: '100%',
  },
  imagemBotao: {
    height: 40,
    width: 40,
    resizeMode: 'contain',
  },
  textoBotaoPersonagem: {
    fontSize: 20,
    fontWeight: '400',
    color: '#3B004F',
    marginLeft: 10,
    flex: 1,
    textAlignVertical: 'center', 
    
  },
});