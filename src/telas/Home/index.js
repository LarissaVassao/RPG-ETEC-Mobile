import React from "react";
import { StyleSheet, Text, View, Image, TouchableOpacity } from "react-native";
import { Ionicons } from '@expo/vector-icons';

export default function Home({ navigation }) {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Image
          style={styles.logo}
          source={require('../../../assets/img/logo.png')}
        />
      </View>

      <Text style={styles.welcomeText}>Bem-Vindo(a)</Text>

      <View style={styles.buttonsContainer}>
        <TouchableOpacity 
          style={styles.actionButton}
          onPress={() => navigation.navigate("EntrarCampanha")}
        >
          <Ionicons name="log-in-outline" size={40} color="#fff" />
        </TouchableOpacity>

        <TouchableOpacity 
          style={styles.actionButton}
          onPress={() => navigation.navigate("CriarCampanha")}
        >
          <Ionicons name="add-outline" size={40} color="#fff" />
        </TouchableOpacity>
      </View>

      <TouchableOpacity 
        style={styles.helpButton}
      >
        <Ionicons name="help-outline" size={40} color="#3B004F" />
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
    marginBottom: -10,
  },
  logo: {
    width: 200,
    height: 200,
  },
  welcomeText: {
    fontSize: 30,
    fontWeight: '800',
    color: '#623372',
    marginBottom: 20,
    textAlign: 'center',
  },
  buttonsContainer: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    paddingHorizontal: 30,
  },
  actionButton: {
    width: '100%',
    height: 55,
    borderRadius: 8,
    backgroundColor: '#623372',  
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 30,
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
  },
  helpButton: {
    position: 'absolute',
    bottom: 30,
    right: 30,
    width: 50,
    height: 50,
    borderRadius: 35,
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#623372',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
