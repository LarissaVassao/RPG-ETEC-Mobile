import React, { useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, TextInput, StatusBar, ScrollView, Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Picker } from "@react-native-picker/picker";

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
                    source={require('../../../assets/img/logo.png')}
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
        backgroundColor: "#F5F7FA",
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
        color: '#124A69',
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
        color: '#2295D1',
        marginRight: 7,
        textAlign: 'right',
    },
    inputContainer: {
        flex: 1,
        backgroundColor: '#fff',
        borderWidth: 1,
        borderColor: '#ddd',
        borderRadius: 8,
        paddingHorizontal: 10,
        paddingVertical: 2,
        elevation: 2,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.1,
        shadowRadius: 2,
    },
    pickerContainer: {
        flex: 1,
        backgroundColor: '#fff',
        borderWidth: 1,
        borderColor: '#ddd',
        borderRadius: 8,
        elevation: 2,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.1,
        shadowRadius: 2,
        justifyContent: 'center',
        // Aumentar a altura para evitar corte
        minHeight: 50,
    },
    input: {
        fontSize: 15,
        color: '#333',
        paddingVertical: 8,
        // Garantir que o texto não seja cortado
        minHeight: 40,
    },
    picker: {
        // Ajustes para garantir que o texto fique visível
        height: 50,
        color: '#333',
        // Remover padding negativo que pode estar cortando o texto
        margin: 0,
        padding: 0,
        // Garantir que o Picker ocupe todo o espaço disponível
        width: '100%',
    },
    button: {
        backgroundColor: '#2295D1',
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