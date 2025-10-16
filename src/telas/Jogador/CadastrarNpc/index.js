import React, { useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, TextInput, StatusBar, ScrollView, Image, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { styles } from './styles';
import { useUser } from "../../../context/UserContext.js";

import api from "../../../../services/api.js";

export default function CadastrarNpc({ navigation }) {
    const [nomeNpc, setNomeNpc] = useState('');
    const [vida, setVida] = useState('10');
    const [mental, setMental] = useState('10');
    const [energia, setEnergia] = useState('10');
    const [forca, setForca] = useState('1');
    const [agilidade, setAgilidade] = useState('1');
    const [constituicao, setConstituicao] = useState('1');
    const [inteligencia, setInteligencia] = useState('1');
    const [percepcao, setPercepcao] = useState('1');
    const [vontade, setVontade] = useState('1');
    const [sorte, setSorte] = useState('1');
    
    const { user, campanha } = useUser();

    console.log("====CADASTRAR NPC====");

    async function saveData() {   
        console.log("saveData start");      

        if (nomeNpc === "") {
            console.log("saveData error empty");  
            Alert.alert("Erro!", "Preencha o nome do NPC!");
            return;
        }

        try {
            console.log("saveData non-empty, proceeding");  
            console.log("Campanha:", campanha);

            // 🧩 Enviar JSON completo para o backend
            const payload = {
                nome: nomeNpc,
                id_campanha: campanha,
                vida: parseInt(vida) || 10,
                mental: parseInt(mental) || 10,
                energia: parseInt(energia) || 10,
                atributos: {
                    forca: parseInt(forca) || 1,
                    agilidade: parseInt(agilidade) || 1,
                    constituicao: parseInt(constituicao) || 1,
                    inteligencia: parseInt(inteligencia) || 1,
                    percepcao: parseInt(percepcao) || 1,
                    vontade: parseInt(vontade) || 1,
                    sorte: parseInt(sorte) || 1
                }
            };

            console.log("Payload enviado ao backend:");
            console.log(JSON.stringify(payload, null, 2));

            const res = await api.post('rpgetec/salvarNpc.php', payload);
            console.log("Resposta do backend:", res.data);

            if (!res.data.sucesso) {
                Alert.alert("Erro ao salvar", res.data.mensagem);
                console.error(res.data);              
                return;
            }

            Alert.alert("Sucesso!", "NPC criado com sucesso!");
            navigation.navigate("ListaNpc");       

        } catch (error) {
            console.error("Erro ao salvar NPC:", error);
            Alert.alert("Erro", "Ocorreu um erro ao salvar o NPC.");
        }
    }

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
                    <Text style={styles.title}>Criação de NPC</Text>
                    
                    <View style={styles.formContainer}>
                        {/* Nome do NPC */}
                        <View style={styles.formRow}>
                            <Text style={styles.label}>Nome do NPC:</Text>
                            <View style={styles.inputContainer}>
                                <TextInput
                                    style={styles.input}
                                    placeholder="Nome do NPC"
                                    placeholderTextColor="#999"
                                    value={nomeNpc}
                                    onChangeText={setNomeNpc}
                                />
                            </View>
                        </View>

                        {/* Atributos Principais */}
                        <Text style={styles.sectionTitle}>Atributos Principais</Text>
                        
                        <View style={styles.attributesGrid}>
                            <View style={styles.attributeRow}>
                                <View style={styles.attributeContainer}>
                                    <Text style={styles.attributeLabel}>Vida</Text>
                                    <TextInput
                                        style={styles.attributeInput}
                                        value={vida}
                                        onChangeText={setVida}
                                        keyboardType="numeric"
                                    />
                                </View>
                                <View style={styles.attributeContainer}>
                                    <Text style={styles.attributeLabel}>Mental</Text>
                                    <TextInput
                                        style={styles.attributeInput}
                                        value={mental}
                                        onChangeText={setMental}
                                        keyboardType="numeric"
                                    />
                                </View>
                                <View style={styles.attributeContainer}>
                                    <Text style={styles.attributeLabel}>Energia</Text>
                                    <TextInput
                                        style={styles.attributeInput}
                                        value={energia}
                                        onChangeText={setEnergia}
                                        keyboardType="numeric"
                                    />
                                </View>
                            </View>
                        </View>

                        {/* Atributos Secundários */}
                        <Text style={styles.sectionTitle}>Atributos Secundários</Text>
                        
                        <View style={styles.attributesGrid}>
                            <View style={styles.attributeRow}>
                                <View style={styles.attributeContainer}>
                                    <Text style={styles.attributeLabel}>Força</Text>
                                    <TextInput
                                        style={styles.attributeInput}
                                        value={forca}
                                        onChangeText={setForca}
                                        keyboardType="numeric"
                                    />
                                </View>
                                <View style={styles.attributeContainer}>
                                    <Text style={styles.attributeLabel}>Agilidade</Text>
                                    <TextInput
                                        style={styles.attributeInput}
                                        value={agilidade}
                                        onChangeText={setAgilidade}
                                        keyboardType="numeric"
                                    />
                                </View>
                                <View style={styles.attributeContainer}>
                                    <Text style={styles.attributeLabel}>Constituição</Text>
                                    <TextInput
                                        style={styles.attributeInput}
                                        value={constituicao}
                                        onChangeText={setConstituicao}
                                        keyboardType="numeric"
                                    />
                                </View>
                            </View>
                            
                            <View style={styles.attributeRow}>
                                <View style={styles.attributeContainer}>
                                    <Text style={styles.attributeLabel}>Inteligência</Text>
                                    <TextInput
                                        style={styles.attributeInput}
                                        value={inteligencia}
                                        onChangeText={setInteligencia}
                                        keyboardType="numeric"
                                    />
                                </View>
                                <View style={styles.attributeContainer}>
                                    <Text style={styles.attributeLabel}>Percepção</Text>
                                    <TextInput
                                        style={styles.attributeInput}
                                        value={percepcao}
                                        onChangeText={setPercepcao}
                                        keyboardType="numeric"
                                    />
                                </View>
                                <View style={styles.attributeContainer}>
                                    <Text style={styles.attributeLabel}>Vontade</Text>
                                    <TextInput
                                        style={styles.attributeInput}
                                        value={vontade}
                                        onChangeText={setVontade}
                                        keyboardType="numeric"
                                    />
                                </View>
                            </View>
                            
                            <View style={styles.attributeRow}>
                                <View style={[styles.attributeContainer, styles.singleAttribute]}>
                                    <Text style={styles.attributeLabel}>Sorte</Text>
                                    <TextInput
                                        style={styles.attributeInput}
                                        value={sorte}
                                        onChangeText={setSorte}
                                        keyboardType="numeric"
                                    />
                                </View>
                            </View>
                        </View>
                    </View>
                    
                    <TouchableOpacity style={styles.button} onPress={saveData}>
                        <Text style={styles.buttonText}>CRIAR NPC</Text>
                    </TouchableOpacity>
                </View>
            </ScrollView>
        </View>
    );
}