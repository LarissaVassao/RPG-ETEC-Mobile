import React, { useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, TextInput, StatusBar, ScrollView, Image, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Picker } from "@react-native-picker/picker";
import { styles } from './styles';
import { useUser } from "../../../context/UserContext.js";

import api from "../../../../services/api.js";



export default function CadastrarPersonagem({ navigation }) {
    const [nomePersonagem, setNomePersonagem] = useState('');
    const [jogador, setJogador] = useState('');
    const [nivelPersonagem, setNivelPersonagem] = useState(1);
    const [antepassado, setAntepassado] = useState(1);
    const { user, campanha } = useUser();

    console.log("====CADASTRAR PERSONAGEM====");

const antepassados = [
  {nome: "Advogado", valor: 18, pericia1: "Persuasão", valor1: 2, pericia2: "Enganar", valor2: 1, credito: 3},
  {nome: "Aposentado", valor: 34, pericia1: "Intuição", valor1: 2, pericia2: "Charme", valor2: 1, credito: 1},
  {nome: "Artista", valor: 10, pericia1: "Arte", valor1: 2, pericia2: "Persuasão", valor2: 1, credito: 1},
  {nome: "Artista Marcial", valor: 2, pericia1: "Luta", valor1: 2, pericia2: "Atletismo", valor2: 1, credito: 1},
  {nome: "Atleta", valor: 21, pericia1: "Atletismo", valor1: 2, pericia2: "Acrobacia", valor2: 1, credito: 3},
  {nome: "Ator", valor: 24, pericia1: "Persuasão", valor1: 1, pericia2: "Charme", valor2: 2, credito: 3},
  {nome: "Assalariado", valor: 16, pericia1: "Informática", valor1: 2, pericia2: "Persuasão", valor2: 1, credito: 1},
  {nome: "Bombeiro", valor: 13, pericia1: "Acalmar", valor1: 1, pericia2: "Atletismo", valor2: 1, pericia3: "Primeiros-Socorros", valor3: 1, credito: 2},
  {nome: "Cientista", valor: 35, pericia1: "Atualidades", valor1: 2, pericia2: "Análise", valor2: 1, credito: 3},
  {nome: "Coveiro", valor: 27, pericia1: "Atletismo", valor1: 2, pericia2: "Acalmar", valor2: 1, credito: 1},
  {nome: "Criminoso", valor: 7, pericia1: "Arrombamento", valor1: 1, pericia2: "Furtividade", valor2: 2, credito: 0},
  {nome: "Desempregado", valor: 36, pericia1: "Iniciativa", valor1: 1, pericia2: "Procurar", valor2: 2, credito: 0},
  {nome: "Estudante", valor: 1, pericia1: "Atualidades", valor1: 2, pericia2: "Análise", valor2: 1, credito: 0},
  {nome: "Empreendedor", valor: 15, pericia1: "Persuasão", valor1: 2, pericia2: "Finanças", valor2: 1, credito: 2},
  {nome: "Fazendeiro", valor: 3, pericia1: "Sobrevivência", valor1: 2, pericia2: "Lâmina", valor2: 1, credito: 2},
  {nome: "Fanático", valor: 37, pericia1: "Fanatismo", valor1: 3, credito: 1},
  {nome: "Filósofo", valor: 17, pericia1: "Atualidades", valor1: 2, pericia2: "Análise", valor2: 1, credito: 0},
  {nome: "Herdeiro", valor: 8, credito: 10},
  {nome: "Influencer Digital", valor: 14, pericia1: "Persuasão", valor1: 2, pericia2: "Enganar", valor2: 1, credito: 1},
  {nome: "Jornalista", valor: 23, pericia1: "Atualidades", valor1: 2, pericia2: "Análise", valor2: 1, credito: 2},
  {nome: "Mecânico", valor: 6, pericia1: "Mecânica", valor1: 2, pericia2: "Direção", valor2: 1, credito: 2},
  {nome: "Modelo", valor: 22, pericia1: "Charme", valor1: 2, pericia2: "Acrobacia", valor2: 1, credito: 3},
  {nome: "Motorista", valor: 33, pericia1: "Direção", valor1: 3, credito: 1},
  {nome: "Mordomo", valor: 28, pericia1: "Serviços", valor1: 2, pericia2: "Procurar", valor2: 1, credito: 2},
  {nome: "Órfão", valor: 19, pericia1: "Intuição", valor1: 2, pericia2: "Furtividade", valor2: 1, credito: 0},
  {nome: "Paramédico", valor: 12, pericia1: "Primeiros Socorros", valor1: 2, pericia2: "Acalmar", valor2: 1, credito: 2},
  {nome: "Paparazzi", valor: 31, pericia1: "Furtividade", valor1: 1, pericia2: "Fotografia", valor2: 2, credito: 1},
  {nome: "Pescador", valor: 29, pericia1: "Atletismo", valor1: 1, pericia2: "Sobrevivência", valor2: 2, credito: 1},
  {nome: "Policial", valor: 4, pericia1: "Rifles", valor1: 1, pericia2: "Pistolas", valor2: 2, credito: 2},
  {nome: "Professor", valor: 5, pericia1: "Acalmar", valor1: 1, pericia2: "Intuição", valor2: 1, pericia3: "Atualidades", valor3: 1, credito: 1},
  {nome: "Psicólogo", valor: 32, pericia1: "Acalmar", valor1: 2, pericia2: "Intuição", valor2: 1, credito: 3},
  {nome: "Segurança", valor: 9, pericia1: "Pistolas", valor1: 1, pericia2: "Procurar", valor2: 2, credito: 2},
  {nome: "Trambiqueiro", valor: 20, pericia1: "Enganar", valor1: 1, pericia2: "Persuasão", valor2: 1, pericia3: "Atualidades", valor3: 1, credito: 1},
  {nome: "Veterinário", valor: 26, pericia1: "Medicina", valor1: 2, pericia2: "Adestrar", valor2: 1, credito: 2}
];

async function saveData() {   
  console.log(user);
  console.log("ANTEPASSADO: " + antepassado);
  console.log("saveData start");      

  const antepassadoObj = antepassados.find(a => a.valor === antepassado)
  //limpar Valor (id)
  const { valor, ...antepassadoLimpo } = antepassadoObj;
  if (nomePersonagem === "" || !antepassadoObj || jogador === "" || nivelPersonagem === "") {
    console.log("saveData error empty");  
    Alert.alert("Erro!", "Preencha todos os dados!");
    return;
  }

  try {
    console.log("saveData non-empty, proceeding");  
    console.log("Campanha:", campanha);
    // 🧠 Montar objeto de perícias a partir do antepassado
    const pericias = {};

    // Se o antepassado tiver pericia1, pericia2, pericia3 etc., adiciona no objeto
if (antepassadoObj.pericia1) pericias[antepassadoObj.pericia1] = antepassadoObj.valor1 ?? 0;
if (antepassadoObj.pericia2) pericias[antepassadoObj.pericia2] = antepassadoObj.valor2 ?? 0;
if (antepassadoObj.pericia3) pericias[antepassadoObj.pericia3] = antepassadoObj.valor3 ?? 0;

    // 🧩 Enviar JSON completo para o backend
    const payload = {
  nome: nomePersonagem,
  id_usuario: user.id,
  id_campanha: campanha,
  antepassado: antepassadoLimpo,
  nivel: nivelPersonagem,
  pericias: pericias
};

    console.log("Payload enviado ao backend:");
    console.log(JSON.stringify(payload, null, 2));

    const res = await api.post('rpgetec/salvarPersonagem.php', payload);
    console.log("Resposta do backend:", res.data);

    if (!res.data.sucesso) {
      Alert.alert("Erro ao salvar", res.data.mensagem);
      console.error(res.data);              
      return;
    }
    console.log("Pericias detectadas no antepassado:", antepassadoObj);
    navigation.navigate("Personagem", { idPersonagem: res.data.id });       

  } catch (error) {
    console.error("Erro ao salvar personagem:", error);
    Alert.alert("Erro", "Ocorreu um erro ao salvar o personagem.");
  }
}


    let antepassadosItems = antepassados.map((v,k) => {
        return <Picker.Item key={k} value={v.valor} label={v.nome} />
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
                     onPress={() => saveData()}>
                        <Text style={styles.buttonText}>CRIAR PERSONAGEM</Text>
                    </TouchableOpacity>
                </View>
            </ScrollView>
        </View>
    );
}
