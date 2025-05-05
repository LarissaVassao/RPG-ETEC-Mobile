import React, { useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, TextInput, ScrollView } from 'react-native';

export default function App() {
  const [nomeCampanha, setNomeCampanha] = useState('');
  const [descricao, setDescricao] = useState('');

  return (
    <ScrollView 
      contentContainerStyle={styles.container}
      keyboardShouldPersistTaps="handled"
    >
      <View style={styles.content}>
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

        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>CRIAR CAMPANHA</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: '#fff',
  },
  content: {
    flex: 1,
    padding: 24,
    paddingTop: 40,
  },
  title: {
    fontSize: 26,
    fontWeight: '800',
    color: '#623372',
    marginBottom: 30,
    textAlign: 'center',
  },
  formGroup: {
    marginBottom: 25,
  },
  label: {
    fontSize: 12,
    fontWeight: '700',
    color: '#b673ff',
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
    borderWidth: 2,
    borderColor: '#e9ecef',
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
    backgroundColor: '#623372',
    borderRadius: 10,
    padding: 18,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 20,
    shadowColor: '#623372',
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