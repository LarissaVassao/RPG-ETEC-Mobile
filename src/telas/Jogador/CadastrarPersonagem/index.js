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
  {nome: "Estudante", valor: 1, pericia1: "atualidades", valor1: 2, pericia2: "analise", valor2: 1, credito: 0},
  {nome: "Artista Marcial", valor: 2, pericia1: "luta", valor1: 2, pericia2: "atletismo", valor2: 1, credito: 1},
  {nome: "Fazendeiro", valor: 3, pericia1: "sobrevivencia", valor1: 2, pericia2: "lamina", valor2: 1, credito: 2},
  {nome: "Policial", valor: 4, pericia1: "rifles", valor1: 1, pericia2: "pistolas", valor2: 2, credito: 2},
  {nome: "Professor", valor: 5, pericia1: "acalmar", valor1: 1, pericia2: "intuicao", valor2: 1, pericia3: "atualidades", valor3: 1, credito: 1},
  {nome: "Mecânico", valor: 6, pericia1: "mecanica", valor1: 2, pericia2: "direcao", valor2: 1, credito: 2},
  {nome: "Criminoso", valor: 7, pericia1: "arrombamento", valor1: 1, pericia2: "furtividade", valor2: 2, credito: 0},
  {nome: "Herdeiro", valor: 8, credito: 10},
  {nome: "Segurança", valor: 9, pericia1: "pistola", valor1: 1, pericia2: "procurar", valor2: 2, credito: 2},
  {nome: "Artista", valor: 10, pericia1: "arte", valor1: 2, pericia2: "persuadir", valor2: 1, credito: 1},
  {nome: "Médico", valor: 11, pericia1: "medicina", valor1: 2, pericia2: "intuicao", valor2: 1, credito: 5},
  {nome: "Paramédico", valor: 12, pericia1: "primeiros socorros", valor1: 2, pericia2: "acalmar", valor2: 1, credito: 2},
  {nome: "Bombeiro", valor: 13, pericia1: "acalmar", valor1: 1, pericia2: "atletismo", valor2: 1, pericia3: "primeiros socorros", valor3: 1, credito: 2},
  {nome: "Influencer Digital", valor: 14, pericia1: "persuadir", valor1: 2, pericia2: "enganar", valor2: 1, credito: 1},
  {nome: "Empreendedor", valor: 15, pericia1: "persuadir", valor1: 2, pericia2: "financas", valor2: 1, credito: 2},
  {nome: "Assalariado", valor: 16, pericia1: "informatica", valor1: 2, pericia2: "persuadir", valor2: 1, credito: 1},
  {nome: "Filósofo", valor: 17, pericia1: "atualidades", valor1: 2, pericia2: "analise", valor2: 1, credito: 0},
  {nome: "Advogado", valor: 18, pericia1: "persuadir", valor1: 2, pericia2: "enganar", valor2: 1, credito: 3},
  {nome: "Órfão", valor: 19, pericia1: "intuicao", valor1: 2, pericia2: "furtividade", valor2: 1, credito: 0},
  {nome: "Trambiqueiro", valor: 20, pericia1: "enganar", valor1: 1, pericia2: "persuadir", valor2: 1, pericia3: "atualidades", valor3: 1, credito: 1},
  {nome: "Atleta", valor: 21, pericia1: "atletismo", valor1: 2, pericia2: "acrobacia", valor2: 1, credito: 3},
  {nome: "Modelo", valor: 22, pericia1: "charme", valor1: 2, pericia2: "acrobacia", valor2: 1, credito: 3},
  {nome: "Jornalista", valor: 23, pericia1: "atualidades", valor1: 2, pericia2: "analise", valor2: 1, credito: 2},
  {nome: "Ator", valor: 24, pericia1: "persuadir", valor1: 1, pericia2: "charme", valor2: 2, credito: 3},
  {nome: "Veterinário", valor: 26, pericia1: "medicina", valor1: 2, pericia2: "adestrar", valor2: 1, credito: 2},
  {nome: "Coveiro", valor: 27, pericia1: "atletismo", valor1: 2, pericia2: "acalmar", valor2: 1, credito: 1},
  {nome: "Mordomo", valor: 28, pericia1: "servicos", valor1: 2, pericia2: "procurar", valor2: 1, credito: 2},
  {nome: "Pescador", valor: 29, pericia1: "atletismo", valor1: 1, pericia2: "sobrevivencia", valor2: 2, credito: 1},
  {nome: "Paparazzi", valor: 31, pericia1: "furtividade", valor1: 1, pericia2: "fotografia", valor2: 2, credito: 1},
  {nome: "Psicólogo", valor: 32, pericia1: "acalmar", valor1: 2, pericia2: "intuicao", valor2: 1, credito: 3},
  {nome: "Motorista", valor: 33, pericia1: "direcao", valor1: 3, credito: 1},
  {nome: "Aposentado", valor: 34, pericia1: "intuicao", valor1: 2, pericia2: "charme", valor2: 1, credito: 1},
  {nome: "Cientista", valor: 35, pericia1: "atualidades", valor1: 2, pericia2: "analise", valor2: 1, credito: 3},
  {nome: "Desempregado", valor: 36, pericia1: "iniciativa", valor1: 1, pericia2: "procurar", valor2: 2, credito: 0},
  {nome: "Fanático", valor: 37, pericia1: "fanatismo", valor1: 3, credito: 1}
];


    let antepassadosItems = antepassados.map((v,k) => {
        return <Picker.Item key={k} value={k} label={v.nome} />
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
