import React, { useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, StatusBar, TextInput, ScrollView, KeyboardAvoidingView, Platform, Alert} from 'react-native';
import { Ionicons } from '@expo/vector-icons'; 
import { styles } from './styles';
import { useUser } from "../../context/UserContext.js";

import api from "../../../services/api.js";



export default function App({ navigation }) { 
  const [nomeCampanha, setNomeCampanha] = useState('');
  const [descricao, setDescricao] = useState('');
  const [senhaCampanha, setSenhaCampanha] = useState('');
  const { user } = useUser();

async function saveData() {   
        console.log(user)  
        console.log("saveData start");       ;
        if (nomeCampanha == "") {
          console.log("saveData error empty");  
          Alert.alert("Erro!", "Preencha o nome!");
          return;
        }
        else{
          console.log("saveData non-empty, proceding");  
          try{
            const res = await api.post('rpgetec/salvarCampanha.php',{nome: nomeCampanha, descricao: descricao, senha: senhaCampanha, id_usuario:user.id});
            console.log(res.data);
            if (!res.data.sucesso) {
              Alert.alert("Erro ao salvar", res.data.mensagem);              
              return;
            }
            
          Alert.alert("Salvo com Sucesso", "Sua campanha foi registrada com o seguinte ID: "+ res.data.id +", anote esse número!")
          navigation.navigate("EntrarCampanha");       

          }
          catch(error){console.log("ERRO" + error)}
    }     
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
            <Text style={styles.title}>Criar uma Campanha</Text>
            
            <View style={styles.formGroup}>
              <Text style={styles.label}>NOME DA CAMPANHA</Text>
              <TextInput
                style={styles.input}
                placeholder="Dê um nome para sua campanha"
                placeholderTextColor="#999"
                value={nomeCampanha}
                onChangeText={setNomeCampanha}
              />
              
            </View>
             <View style={styles.formGroup}>
              <Text style={styles.label}>SENHA PARA A CAMPANHA</Text>
              <TextInput
                style={styles.input}
                placeholder="Crie uma senha para sua campanha"
                placeholderTextColor="#999"
                keyboardType='secure'
                value={senhaCampanha}
                onChangeText={setSenhaCampanha}
              />
            </View>

            <View style={styles.formGroup}>
              <Text style={styles.label}>DESCRIÇÃO</Text>
              <TextInput
                style={[styles.input, styles.multilineInput]}
                placeholder="Descreva os objetivos e detalhes..."
                placeholderTextColor="#999"
                multiline
                numberOfLines={5}
                value={descricao}
                onChangeText={setDescricao}
              />
            </View>

            <TouchableOpacity style={styles.button}
              onPress={() => saveData()}
            >
              <Text style={styles.buttonText}>CRIAR CAMPANHA</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}
