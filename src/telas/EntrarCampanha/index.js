import React, { useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, StatusBar, TextInput, ScrollView, KeyboardAvoidingView, Platform, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { styles } from './styles';
import { useUser } from "../context/UserContext";
import api from "../../../services/api.js";

export default function App({ navigation }) { 
  const [idCampanha, setIdCampanha] = useState('');
  const [senha, setSenha] = useState('');
  const { user } = useUser();

async function login(){
  try{
    const res = await  api.get('rpgetec/checarCampanhas.php', {params: {id: idCampanha, senha: senha, idUsuario: user.idUsuario}});
    if (res.data.success)
    {
    navigation.navigate("TelaCampanha", {idCampanha})
    }
    else{
      Alert.alert("Senha ou ID incorreto(s)!")
    }
  }catch(error){console.log(error);}
  }


  return (
    <KeyboardAvoidingView 
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <StatusBar backgroundColor="#F5F7FA" barStyle="dark-content" />
      
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
                value={idCampanha}
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
              onPress={() => login()}
            >
              <Text style={styles.buttonText}>ENTRAR CAMPANHA</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

