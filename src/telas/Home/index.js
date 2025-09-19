import React, { useState } from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity, StatusBar, Modal, Pressable } from "react-native";
import { Ionicons } from '@expo/vector-icons';
import { styles } from './styles';

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
          onPress={() => navigation.navigate("EntrarCampanha", {email, idUsuario})}
          activeOpacity={0.9}
        >
          <View style={styles.buttonContent}>
            <Ionicons name="log-in-outline" size={28} color="#fff" />
            <Text style={styles.buttonText}>Entrar em Campanha</Text>
          </View>
        </TouchableOpacity>

        <TouchableOpacity 
          style={styles.actionButton}
          onPress={() => navigation.navigate("CriarCampanha", {email, idUsuario})}
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

