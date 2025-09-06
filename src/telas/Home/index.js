import React, { useState } from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity, StatusBar, Modal, Pressable } from "react-native";
import { Ionicons } from '@expo/vector-icons';

export default function Home({ navigation }) {
  const [logoutModalVisible, setLogoutModalVisible] = useState(false);
  
  const handleLogout = () => {
    setLogoutModalVisible(true);
  };

  const confirmLogout = () => {
    setLogoutModalVisible(false);
    navigation.navigate("Login");
  };

  const cancelLogout = () => {
    setLogoutModalVisible(false);
  };

  return (
    <View style={styles.container}>
      <StatusBar backgroundColor="#F5F7FA" barStyle="dark-content" />
      
      <View style={styles.header}>
        <Image
          style={styles.logo}
          source={require('../../../assets/img/logo.png')}
        />
        <Text style={styles.welcomeText}>Bem-Vindo(a)!</Text>
      </View>

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

      <TouchableOpacity style={styles.helpButton}>
        <Ionicons name="help-outline" size={28} color="#2295D1" />
      </TouchableOpacity>

      <TouchableOpacity 
        style={styles.deslogButton}
        onPress={handleLogout}
      > 
        <Ionicons name="log-out-outline" size={28} color="#2295D1" />
      </TouchableOpacity>

      <Modal
        animationType="fade"
        transparent={true}
        visible={logoutModalVisible}
        onRequestClose={cancelLogout}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Sair da Conta</Text>
            <Text style={styles.modalMessage}>Tem certeza que deseja sair da sua conta?</Text>
            
            <View style={styles.modalButtons}>
              <Pressable 
                style={[styles.modalButton, styles.cancelButton]}
                onPress={cancelLogout}
              >
                <Text style={[styles.buttonText, styles.cancelButtonText]}>Cancelar</Text>
              </Pressable>
              
              <Pressable 
                style={[styles.modalButton, styles.confirmButton]}
                onPress={confirmLogout}
              >
                <Text style={[styles.buttonText, styles.confirmButtonText]}>Sair</Text>
              </Pressable>
            </View>
          </View>
        </View>
      </Modal>
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
    borderWidth: 1,
    borderColor: '#2295D1',

  },
  deslogButton: {
    position: 'absolute',
    top: 20,
    right: 30,
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#fff',
    borderWidth: 1.5,
    borderColor: '#E3F2FD',
    justifyContent: 'center',
    alignItems: 'center',

    borderWidth: 1,
    borderColor: '#2295D1',
  },
  // Estilos do Modal
  modalOverlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 25,
    alignItems: 'center',
    width: '80%',
    maxWidth: 340,
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#124A69',
  },
  modalMessage: {
    fontSize: 16,
    marginBottom: 20,
    textAlign: 'center',
    color: '#555',
  },
  modalButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    gap: 15,
  },
  modalButton: {
    flex: 1,
    paddingVertical: 12,
    borderRadius: 10,
    alignItems: 'center',
    elevation: 2,
  },
  cancelButton: {
    backgroundColor: '#f0f0f0',
  },
  confirmButton: {
    backgroundColor: '#2295D1',
  },
  cancelButtonText: {
    color: '#333',
    fontWeight: '600',
  },
  confirmButtonText: {
    color: 'white',
    fontWeight: '600',
  },
});