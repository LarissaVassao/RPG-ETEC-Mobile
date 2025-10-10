 import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Image, ScrollView, StatusBar, Modal, Pressable} from "react-native";
import { Ionicons } from '@expo/vector-icons'; 
import { styles } from './styles';
import { useUser } from "../../../context/UserContext.js";


import api from "../../../../services/api.js";

export default function ListaPersonagens({ navigation }) {
    // Estado para armazenar a lista de personagens
    const [personagens, setPersonagens] = useState([]);
    const [mestre, setMestre] = useState(false);
    const { user, campanha } = useUser();
    console.log("====LISTAR PERSONAGENS====");

    useEffect(() => {
        const listarPersonagens = async () => {
            try{
            
            console.log("Id da Campanha: "+campanha);
            console.log("Id da Usuario: "+user.id);
            const res = await api.get("rpgetec/verificarMestre.php", {params: {id_campanha: campanha, id_usuario: user.id}});
            console.log("Resultado de verificar mestre: "+res.data.mestre);
            setMestre(res.data.mestre);
              
            try {
                
                const res = await api.get("rpgetec/listarPersonagens.php", {params: {id_campanha: campanha, mestre: mestre, id_usuario: user.id}});
                console.log('CAMPANHA:' + campanha)
                console.log(res.data);
                if(res.data.success){
                const personagensMapeados = res.data.personagens.map(p => ({
                    id: p.id,
                    nome: p.nome,
                    imagem: require('../../../../assets/img/logo.png') 
                })); 
                setPersonagens(personagensMapeados);
              }
            } catch (error) {
                console.error("Erro ao buscar personagens:", error);
            }  }catch (error) {
                console.error("Erro ao verificar se mestre:", error);
            }
        };

        listarPersonagens();
    }, []);
    // Estados para controlar o modal
    const [modalVisible, setModalVisible] = useState(false);
    const [personagemParaDeletar, setPersonagemParaDeletar] = useState(null);

    // Função para abrir o modal de confirmação
    const confirmarDelecao = (id) => {
        setPersonagemParaDeletar(id);
        setModalVisible(true);
    };

    // Função para deletar um personagem
    const deletarPersonagem = () => {
        if (personagemParaDeletar) {
            setPersonagens(personagens.filter(personagem => personagem.id !== personagemParaDeletar));
            setModalVisible(false);
            setPersonagemParaDeletar(null);
        }
    };

    // Função para cancelar a deleção
    const cancelarDelecao = () => {
        setModalVisible(false);
        setPersonagemParaDeletar(null);
    };

    return(
        <View style={styles.container}>
            <StatusBar backgroundColor="#124A69" barStyle="light-content" />
            
            <View style={styles.header}>
                <TouchableOpacity 
                    style={styles.backButton}
                    onPress={() => navigation.navigate("Home")}
                >
                    <Ionicons name="arrow-back-outline" size={20} color="#fff" />
                </TouchableOpacity>
                
                <Text style={styles.headerTitle}>Lista de Personagens</Text>
                

                    <TouchableOpacity 
                        style={styles.createButton}
                        onPress={() => navigation.navigate("CadastrarPersonagem")}
                    >
                        <Ionicons name="add-outline" size={22} color="#fff" />
                    </TouchableOpacity>

            </View>

            <ScrollView 
                style={styles.scrollView}
                contentContainerStyle={styles.scrollContent}
                showsVerticalScrollIndicator={false}
            >
                <Text style={styles.title}>Personagens</Text>
                
                <View style={styles.charactersList}>
                    {personagens.length === 0 ? (
                        <Text style={styles.emptyText}>Nenhum personagem criado ainda.</Text>
                    ) : (
                        personagens.map((personagem) => (
                            <TouchableOpacity 
                                key={personagem.id}
                                style={styles.characterCard}
                                onPress={() => navigation.navigate("Personagem", { idPersonagem: personagem.id })}
                            >
                                <Image 
                                    style={styles.characterImage} 
                                    resizeMode="cover" 
                                    source={personagem.imagem} 
                                />
                                <View style={styles.characterInfo}>
                                    <Text style={styles.characterName}>{personagem.nome}</Text>
                                </View>
                                {/* 
                                  Caso for Mestre
                                
                                <TouchableOpacity 
                                    style={styles.archiveButton}
                                    onPress={() => confirmarDelecao(personagem.id)}
                                >
                                    <Ionicons name="archive" size={30} color="#c00000" />
                                </TouchableOpacity> */}
                            </TouchableOpacity>
                        ))
                    )}
                </View>

            </ScrollView>

            {/* Modal de Confirmação */}
            <Modal
                animationType="fade"
                transparent={true}
                visible={modalVisible}
                onRequestClose={cancelarDelecao}
            >
                <View style={styles.modalOverlay}>
                    <View style={styles.modalContent}>
                        <View style={styles.modalHeader}>
                            <Ionicons name="warning" size={32} color="#ffcc00" />
                            <Text style={styles.modalTitle}>Confirmar Exclusão</Text>
                        </View>
                        
                        <Text style={styles.modalMessage}>
                            Tem certeza que deseja excluir este personagem? Esta ação não pode ser desfeita.
                        </Text>
                        
                        <View style={styles.modalButtons}>
                            <Pressable 
                                style={[styles.modalButton, styles.cancelButton]}
                                onPress={cancelarDelecao}
                            >
                                <Text style={styles.cancelButtonText}>Cancelar</Text>
                            </Pressable>
                            <Pressable 
                                style={[styles.modalButton, styles.confirmButton]}
                                onPress={deletarPersonagem}
                            >
                                <Text style={styles.confirmButtonText}>Excluir</Text>
                            </Pressable>
                        </View>
                    </View>
                </View>
            </Modal>
            
        </View>
    )
}
