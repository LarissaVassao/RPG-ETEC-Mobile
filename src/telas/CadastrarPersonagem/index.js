import React, { useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, TextInput, ScrollView, Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Picker } from "@react-native-picker/picker";

export default function CadastrarPersonagem({ navigation }) {
    const [nomePersonagem, setNomePersonagem] = useState('');
    const [jogador, setJogador] = useState('');
    const [nivelPersonagem, setNivelPersonagem] = useState('');
    const [antepassado, setAntepassado] = useState(0);

    
    const antepassados = [
        {ant: "Herdeiro", valor: 1},
        {ant: "Órfão", valor: 2},
        {ant: "Aposentado", valor: 3},
    ];

    let antepassadosItems = antepassados.map((v,k) => {
        return <Picker.Item key={k} value={k} label={v.ant} />
    })

    return (
        <View style={styles.mainContainer}>
            <View style={styles.header}>
                <Image 
                    style={styles.logo} 
                    resizeMode="contain" 
                    source={require('../../../assets/img/logo.png')}
                />
            </View>

            <TouchableOpacity 
                style={styles.backButton}
                onPress={() => navigation.navigate("TelaPrincipal")}
            >
                <Ionicons name="arrow-back-outline" size={30} color="#3B004F" />
            </TouchableOpacity>

            <ScrollView 
                contentContainerStyle={styles.scrollContainer}
                keyboardShouldPersistTaps="handled"
            >
                <View style={styles.content}>
                    <Text style={styles.title}>Ficha de Criação de Personagem</Text>
                    
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
                    
                    <TouchableOpacity style={styles.button}
                     onPress={() => navigation.navigate("Personagem")}>
                        <Text style={styles.buttonText}>CRIAR PERSONAGEM</Text>
                    </TouchableOpacity>
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
    backButton: {
        position: 'absolute',
        top: 15,
        left: 15,
        zIndex: 1,
    },
    scrollContainer: {
        flexGrow: 1,
        paddingTop: 10,
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
    formRow: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 15,
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
    pickerContainer: {
        flex: 1,
        borderBottomWidth: 1,
        borderBottomColor: '#ddd',
        justifyContent: 'center',
    },
    input: {
        paddingVertical: 5,
        fontSize: 15,
        color: '#333',
    },
    picker: {
        marginLeft: -5, // Compensa o padding interno do Picker
        height: 40, // Altura consistente com os inputs
        color: '#333',
    },
    button: {
        backgroundColor: '#623372',
        borderRadius: 8,
        padding: 16,
        alignItems: 'center',
        marginTop: 25,
    },
    buttonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: '700',
    },
});