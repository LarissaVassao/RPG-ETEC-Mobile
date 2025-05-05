import React from "react";
import { StyleSheet, Text, View, Image, TouchableOpacity } from "react-native";
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';

export default function Home({ navigation }) {
  return (
    <View style={styles.container}>
      {/* Cabeçalho com Logo */}
      <View style={styles.header}>
        <Image
          style={styles.logo}
          source={require('../../../assets/img/logo.png')}
        />
      </View>

      {/* Saudação */}
      <Text style={styles.welcomeText}>Bem-vindo</Text>

      {/* Área de Botões com Gradiente */}
      <View style={styles.buttonsContainer}>
        {/* Botão Entrar com Gradiente */}
        <TouchableOpacity 
          style={styles.actionButton}
          onPress={() => navigation.navigate("EntrarCampanha")}
        >
          <LinearGradient
            colors={['#623372', '#b673ff']}
            style={styles.gradient}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
          >
            <Ionicons name="log-in-outline" size={40} color="#fff" />
          </LinearGradient>
        </TouchableOpacity>

        {/* Botão Criar com Gradiente Invertido */}
        <TouchableOpacity 
          style={styles.actionButton}
          onPress={() => navigation.navigate("CriarCampanha")}
        >
          <LinearGradient
            colors={['#b673ff', '#623372']}
            style={styles.gradient}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
          >
            <Ionicons name="add-outline" size={40} color="#fff" />
          </LinearGradient>
        </TouchableOpacity>
      </View>

      {/* Botão de Ajuda */}
      <TouchableOpacity 
        style={styles.helpButton}
        onPress={() => navigation.navigate("Tutorial")}
      >
        <Ionicons name="help-outline" size={30} color="#3B004F" />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingTop: 40,
  },
  header: {
    alignItems: 'center',
    marginBottom: 20,
  },
  logo: {
    width: 120,
    height: 120,
  },
  welcomeText: {
    fontSize: 24,
    color: '#3B004F',
    fontWeight: '600',
    textAlign: 'center',
    marginBottom: 40,
  },
  buttonsContainer: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    paddingHorizontal: 40,
  },
  actionButton: {
    width: '100%',
    height: 80,
    borderRadius: 8,
    overflow: 'hidden',
    marginBottom: 20,
    elevation: 3,
  },
  gradient: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  helpButton: {
    position: 'absolute',
    bottom: 30,
    right: 30,
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#3B004F',
    justifyContent: 'center',
    alignItems: 'center',
  },
});