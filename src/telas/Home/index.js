import React from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity, StatusBar } from "react-native";
import { Ionicons } from '@expo/vector-icons';

export default function Home({ navigation }) {
  return (
    <View style={styles.container}>
    <StatusBar backgroundColor="#F5F7FA" barStyle="dark-content" />
      
      {/* Cabeçalho */}
      <View style={styles.header}>
        <Image
          style={styles.logo}
          source={require('../../../assets/img/logo.png')}
        />
        <Text style={styles.welcomeText}>Bem-Vindo(a)!</Text>
      </View>

      {/* Botões principais */}
      <View style={styles.buttonsContainer}>
        <TouchableOpacity 
          style={styles.actionButton}
          onPress={() => navigation.navigate("EntrarCampanha")}
          activeOpacity={0.9}
        >
          <View style={styles.buttonContent}>
            <Ionicons name="log-in-outline" size={28} color="#fff" />
            <Text style={styles.buttonText}>Entrar em Campanha</Text>
          </View>
        </TouchableOpacity>

        <TouchableOpacity 
          style={styles.actionButton}
          onPress={() => navigation.navigate("CriarCampanha")}
          activeOpacity={0.9}
        >
          <View style={styles.buttonContent}>
            <Ionicons name="add-outline" size={28} color="#fff" />
            <Text style={styles.buttonText}>Criar Campanha</Text>
          </View>
        </TouchableOpacity>
      </View>

      {/* Botão de ajuda flutuante */}
      <TouchableOpacity style={styles.helpButton}>
        <Ionicons name="help-outline" size={28} color="#2295D1" />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F7FA',
    paddingHorizontal: 20,
  },
  header: {
    alignItems: 'center',
    marginTop: 100,
    marginBottom: 60,
  },
  logo: {
    width: 160,
    height: 160,
  },
  welcomeText: {
    fontSize: 28,
    fontWeight: '800',
    color: '#124A69',
    textAlign: 'center',
    marginBottom: 8,
  },

  buttonsContainer: {
    width: '100%',
    alignItems: 'center',
    gap: 20,
  },
  actionButton: {
    width: '100%',
    maxWidth: 400,
    backgroundColor: '#2295D1',  
    paddingVertical: 15,
    borderRadius: 16,
    elevation: 6,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    top: -30
  },
  buttonContent: {
    flexDirection: 'row',
    alignItems: 'center',
    left: 10,
    gap: 12,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '700',
  },
  helpButton: {
    position: 'absolute',
    bottom: 40,
    right: 30,
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#fff',
    borderWidth: 1.5,
    borderColor: '#E3F2FD',
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.15,
    shadowRadius: 6,
  },
});