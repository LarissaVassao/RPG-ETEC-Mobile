import React, { useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, StatusBar, TextInput, ScrollView, KeyboardAvoidingView, Platform, Alert} from 'react-native';
import { Ionicons } from '@expo/vector-icons'; 

import api from "../../../services/api.js";



export default function App({ navigation }) { 
  const [nomeCampanha, setNomeCampanha] = useState('');
  const [descricao, setDescricao] = useState('');
  const {senhaCampanha, setSenhaCampanha} = useState('');

async function saveData() {     
        console.log("saveData start");       ;
        if (nomeCampanha == "") {
          console.log("saveData error empty");  
          Alert.alert("Erro!", "Preencha o nome!");
          return;
        }
        else{
          console.log("saveData non-empty, proceding");  
          try{
            const res = await api.post('rpgetec/salvarCampanha.php',{nome: nomeCampanha, descricao: descricao, senha: senhaCampanha});
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
    minHeight: '100%',
  },
  formContainer: {
    width: '100%',
    maxWidth: 400,
    alignSelf: 'center',
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
  multilineInput: {
    minHeight: 140,
    textAlignVertical: 'top',
  },
  button: {
    backgroundColor: '#2295D1',
    borderRadius: 10,
    padding: 18,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 20,
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
  backButton: {
    position: 'absolute',
    top: 20,
    left: 20,      
   width: 60,
    height: 60,
    borderRadius: 50,
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#2295D1',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 10,    
    // shadowOffset: { width: 0, height: 2 },
    // shadowOpacity: 0.2,
    // shadowRadius: 4,
    // elevation: 4,
  },
});