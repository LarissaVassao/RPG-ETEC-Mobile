import React, { useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, TextInput, StatusBar, ScrollView, Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Picker } from "@react-native-picker/picker";
import { styles } from './styles';


export default function CadastrarPersonagem({ navigation }) {
    const [nomePersonagem, setNomePersonagem] = useState('');
    const [jogador, setJogador] = useState('');
    const [nivelPersonagem, setNivelPersonagem] = useState('');
    const [antepassado, setAntepassado] = useState(0);

    
    const antepassados = [
        {ant: "Médico", valor: 1},
        {ant: "Professor", valor: 2},
        {ant: "Artista", valor: 3},
    ];

    let antepassadosItems = antepassados.map((v,k) => {
        return <Picker.Item key={k} value={k} label={v.ant} />
    })

    return (
        <View style={styles.mainContainer}>
            <StatusBar backgroundColor="#F5F7FA" barStyle="dark-content" />
            
            <View style={styles.header}>
                <Image 
                    style={styles.logo} 
                    resizeMode="contain" 
                    source={require('../../../../assets/img/logo.png')}
                />
            </View>

            <TouchableOpacity 
                style={styles.backButton}
                onPress={() => navigation.navigate("TelaCampanha")}
            >
                <Ionicons name="arrow-back-outline" size={30} color="#124A69" />
            </TouchableOpacity>

            <ScrollView 
                contentContainerStyle={styles.scrollContainer}
                keyboardShouldPersistTaps="handled"
            >
                <View style={styles.content}>
                    <Text style={styles.title}>Ficha de Criação de Personagem</Text>
                    
                    <View style={styles.formContainer}>
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
                            <Text style={styles.label}>Nível:</Text>
                            <View style={styles.inputContainer}>
                                <TextInput
                                    style={styles.input}
                                    placeholder="Nível"
                                    placeholderTextColor="#999"
                                    value={nivelPersonagem}
                                    onChangeText={setNivelPersonagem}
                                    keyboardType="numeric"
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
                    </View>
                    
                    <TouchableOpacity style={styles.button}
                     onPress={() => navigation.navigate("Personagem")}>
                        <Text style={styles.buttonText}>CRIAR PERSONAGEM</Text>
                    </TouchableOpacity>
                </View>
            </ScrollView>
        </View>
    );
}
