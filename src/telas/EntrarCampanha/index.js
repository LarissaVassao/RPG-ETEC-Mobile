import React, { useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, StatusBar, TextInput, ScrollView, KeyboardAvoidingView, Platform } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function App({ navigation }) { 
  const [id, setID] = useState('');
  const [senha, setSenha] = useState('');

  return (
    <KeyboardAvoidingView 
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <StatusBar backgroundColor="#F5F7FA" barStyle="dark-content" />
      
      {/* Botão de voltar no canto superior esquerdo */}
      <TouchableOpacity 
        style={styles.backButton}
        onPress={() => navigation.navigate("Home")}
      >
        <Ionicons name="arrow-back-outline" size={30} color="#2295D1" />
      </TouchableOpacity>
      
      <ScrollView 
        contentContainerStyle={styles.scrollContainer}
        keyboardShouldPersistTaps="handled"
      >
        <View style={styles.content}>
          <View style={styles.formContainer}>
            <Text style={styles.title}>Entrar em uma Campanha</Text>
            
            <View style={styles.formGroup}>
              <Text style={styles.label}>ID DA CAMPANHA</Text>
              <TextInput
                style={styles.input}
                placeholder="Digite o id da campanha"
                placeholderTextColor="#999"
                value={id}
                onChangeText={setID}
              />
            </View>

            <View style={styles.formGroup}>
              <Text style={styles.label}>SENHA</Text>
              <TextInput
                style={styles.input}
                placeholder="Digite a senha para entrar"
                placeholderTextColor="#999"
                value={senha}
                onChangeText={setSenha}
                secureTextEntry
              />
            </View>

            <TouchableOpacity 
              style={styles.button}
              onPress={() => navigation.navigate("TelaCampanha")}
            >
              <Text style={styles.buttonText}>ENTRAR CAMPANHA</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F7FA',
  },
  scrollContainer: {
    flexGrow: 1,
    justifyContent: 'center',
  },
  content: {
    flex: 1,
    padding: 24,
    justifyContent: 'center',
  },
  formContainer: {
    width: '100%',
    maxWidth: 400,
    alignSelf: 'center',
  },
  backButton: {
    position: 'absolute',
    left: 20,      // Posicionado à esquerda
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#092534',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 10,    // Z-index alto para garantir que fique acima de outros elementos
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 4,
  },
  title: {
    fontSize: 40,
    fontWeight: '800',
    color: '#124A69',
    marginBottom: 30,
    textAlign: 'center',
  },
  formGroup: {
    marginBottom: 25,
  },
  label: {
    fontSize: 12,
    fontWeight: '700',
    color: '#2295D1',
    marginBottom: 8,
    letterSpacing: 1,
    textTransform: 'uppercase',
  },
  input: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 16,
    fontSize: 16,
    color: '#333',
    borderWidth: 1,
    borderColor: '#9ebcccff',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  button: {
    backgroundColor: '#2295D1',
    borderRadius: 10,
    padding: 18,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 30,
    shadowColor: '#124A69',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 6,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '700',
    letterSpacing: 1,
  },
});