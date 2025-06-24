import React, { useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, TextInput, ScrollView, Image} from 'react-native';
import {Picker} from '@react-native-picker/picker';
import { Ionicons } from '@expo/vector-icons';
//import CadastrarPersonagem from '../CadastrarPersonagem';

export default function Personagem({ navigation }) {
    const [nomePersonagem, setNomePersonagem] = useState('');
    const [jogador, setJogador] = useState('');
    const [nivel, setNivel] = useState('');
    const [idade, setIdade] = useState('');
    const [antepassado, setAntepassado] = useState('Médico');
    
    const antepassados = [
    { label: 'Médico', value: 'Médico' },
    { label: 'Professor', value: 'Professor' },
    { label: 'Artista', value: 'Artista' }
  ];

  const atributosDef = [
    { key: 'forca', label: 'Força' },
    { key: 'agilidade', label: 'Agilidade' },
    { key: 'constituicao', label: 'Constituição' },
    { key: 'vontade', label: 'Vontade' },
    { key: 'inteligencia', label: 'Inteligência' },
    { key: 'percepcao', label: 'Percepção' },
    { key: 'sorte', label: 'Sorte' }
  ];

  const periciasDef = [
    { key: 'acalmar', label: 'Acalmar' },
    { key: 'acrobacia', label: 'Acrobacia' },
    { key: 'atletismo', label: 'Atletismo' },
    { key: 'atualidades', label: 'Atualidades' },
    { key: 'analise', label: 'Análise' },
    { key: 'charme', label: 'Charme' },
    { key: 'eletronicos', label: 'Eletrônicos' },
    { key: 'enganar', label: 'Enganar' },
    { key: 'furtividade', label: 'Furtividade' },
    { key: 'informatica', label: 'Informática' },
    { key: 'iniciativa', label: 'Iniciativa' },
    { key: 'intimidacao', label: 'Intimidação' },
    { key: 'intuicao', label: 'Intuição' },
    { key: 'medicina', label: 'Medicina' },
    { key: 'mecanica', label: 'Mecânica' },
    { key: 'persuasao', label: 'Persuasão' },
    { key: 'primeirosSocorros', label: 'Primeiros-Socorros' },
    { key: 'procurar', label: 'Procurar' }
  ];

  const [atributos, setAtributos] = useState(
    atributosDef.reduce((acc, a) => ({ ...acc, [a.key]: '1' }), {})
  );
  const [pericias, setPericias] = useState(
    periciasDef.reduce((acc, p) => ({ ...acc, [p.key]: '1' }), {})
  );
  const alterarPericia = (pericia, valor) =>{
    setPericias({...pericias, [pericia]: valor})
  }
  const alterarAtributo = (atributo, valor) =>{
    setAtributos({...atributos, [atributo]: valor})
  }

let antepassadosItems = antepassados.map((item,id) => {
        return <Picker.Item key={item.value} value={item.value} label={item.label} />
    })

    return (
        <View style={styles.mainContainer}>
            <ScrollView 
                contentContainerStyle={styles.scrollContainer}
                keyboardShouldPersistTaps="handled"
                
            >
                <View style={styles.header}>
                <Image 
                    style={styles.logo} 
                    resizeMode="contain" 
                    source={require('../../../assets/img/logo.png')}
                />
            </View>

            <TouchableOpacity 
                style={styles.backButton}
                onPress={() => navigation.navigate("TelaCampanha")}
            >
                <Ionicons name="arrow-back-outline" size={30} color="#3B004F" />
            </TouchableOpacity>

                <View style={styles.content}>
                    <Text style={styles.title}>Personagem</Text>
                    
                    <View style={styles.formRow}>
                        <Text style={styles.label}>Nome:</Text>
                        <View style={styles.inputContainer}>
                            <TextInput
                                style={styles.input}
                                placeholder="Nome do personagem"
                                placeholderTextColor="#999"
                                value={nomePersonagem}
                                onChangeText={setNomePersonagem}
                            />
                        </View>
                    </View>
                    
                    <View style={styles.formRow}>
                        <Text style={styles.label}>Jogador:</Text>
                        <View style={styles.inputContainer}>
                            <TextInput
                                style={styles.input}
                                placeholder="Seu nome"
                                placeholderTextColor="#999"
                                value={jogador}
                                onChangeText={setJogador}
                            />
                        </View>
                    </View>
                    <View style={styles.formRow}>
                        <Text style={styles.label}>Antepassado:</Text>
                        <View style={styles.pickerContainer}>
                            <Picker
                                style={styles.picker}
                                selectedValue={antepassado}
                                onValueChange={(itemValue) => setAntepassado(itemValue)}
                                dropdownIconColor="#623372"
                            >
                                {antepassadosItems}
                            </Picker>
                        </View>
                    </View>
                    <View style={styles.wrapRow}>
                        <View style={styles.combinedRow}>
                            <Text style={styles.label}>Nível:</Text>
                            <View style={styles.inputContainer}>
                                <TextInput
                                    style={styles.input}
                                    placeholder="Nível"
                                    placeholderTextColor="#999"
                                    value={nivel}
                                    onChangeText={setNivel}
                                    keyboardType="numeric"
                                />
                            </View>
                        </View>
                        
                        <View style={styles.combinedRow}>
                            <Text style={styles.label}>Idade:</Text>
                            <View style={styles.inputContainer}>
                                <TextInput
                                    style={styles.input}
                                    placeholder="Idade"
                                    placeholderTextColor="#999"
                                    value={idade}
                                    onChangeText={setIdade}
                                    keyboardType="numeric"
                                />
                            </View>
                        </View>
                    </View>
                    
                    <View>                        
                        <Text style={styles.sectionTitle}>Atributos</Text>
                        <View style={styles.wrapRow}>
                        {atributosDef.map(({ key, label }) => (
                        <View style={styles.combinedRow} key={key}>
                            <Text style={styles.label}>{label}:</Text>
                            <View style={styles.inputContainer}>
                                <TextInput
                                style={styles.input}
                                value={atributos[key]}
                                keyboardType="numeric"
                                textAlign="center"
                                onChangeText={val => alterarAtributo(key, val)}
                                />
                            </View>
                            </View>
                        ))}</View>
                        {/* ---------- PERÍCIAS ---------- */}
                        <Text style={styles.sectionTitle}>Perícias</Text>
                        <View style={styles.wrapRow}>
                        {periciasDef.map(({ key, label }) => (
                        <View style={styles.combinedRow} key={key}>
                            <Text style={styles.label}>{label}:</Text>
                            <View style={styles.inputContainer}>
                                <TextInput
                                style={styles.input}
                                value={pericias[key]}
                                keyboardType="numeric"
                                textAlign="center"
                                onChangeText={val => alterarPericia(key, val)}
                                />
                            </View>
                            </View>
                        ))}</View>
                    </View>
                </View>
            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    mainContainer: {
        flex: 1,
        backgroundColor: '#fff',
    },
    header: {
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        paddingTop: 75,
        height: 60,
    },
    logo: {
        width: 75,
        height: 75,
    },
    pickerContainer: {
    borderWidth: 1,
    width: 150,
    height: 50,
    borderColor: '#ddd',
    borderRadius: 8,
    overflow: 'hidden',       
    backgroundColor: '#fff',
  },
  picker: {
    height: 50,               
    width: '100%',
  },
    backButton: {
        position: 'absolute',
        top: 15,
        left: 15,
        zIndex: 1,
    },
    scrollContainer: {
        paddingTop: 10,          
        paddingBottom: 10,
    },
    content: {
        padding: 20,
    },
    title: {
        fontSize: 22,
        fontWeight: '800',
        color: '#623372',
        marginBottom: 25,
        textAlign: 'center',
    },
    sectionTitle: {
        fontSize: 18,
        fontWeight: '700',
        color: '#623372',
        marginTop: 20,
        marginBottom: 15,
        textAlign: 'center',
    },
    formRow: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 15,
        marginVertical: 5,
    },
    combinedRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 15,
        width: '48%'
    },
    wrapRow: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    label: {
        width: 90,
        fontSize: 14,
        fontWeight: '600',
        color: '#623372',
        marginRight: 7,
        textAlign: 'right',
    },
    inputContainer: {
        flex: 1,
        borderBottomWidth: 1,
        borderBottomColor: '#ddd',
    },
    inputContainer: {
        flex: 1,
        borderBottomWidth: 1,
        borderBottomColor: '#ddd',
        justifyContent: 'center',
    },
    input: {
        paddingVertical: 5,
        fontSize: 15,
        color: '#333',
        textAlign: 'center',
    },
    input: {
        paddingVertical: 5,
        fontSize: 15,
        color: '#333',
        textAlign: 'center',
    },
});