import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Image, ScrollView, StatusBar, Modal, Pressable } from "react-native";
import { Ionicons } from '@expo/vector-icons'; 
import { styles } from './styles.js';
import { useUser } from "../../../context/UserContext.js";
import api from "../../../../services/api.js";

export default function ListaNpc({ navigation }) {
    // Estado para armazenar a lista de NPCs
    const [npcs, setNpcs] = useState([]);
    const [mestre, setMestre] = useState(false);
    const { user, campanha } = useUser();
    console.log("====LISTAR NPCS====");

    useEffect(() => {
        const listarNpcs = async () => {
            try {
                console.log("Id da Campanha: " + campanha);
                console.log("Id do Usuário: " + user.id);
                
                // Verificar se é mestre
                const resMestre = await api.get("rpgetec/verificarMestre.php", {
                    params: { id_campanha: campanha, id_usuario: user.id }
                });
                console.log("Resultado de verificar mestre: " + resMestre.data.mestre);
                setMestre(resMestre.data.mestre);

                // Listar NPCs
                try {
                    const res = await api.get("rpgetec/listarNpcs.php", {
                        params: { id_campanha: campanha }
                    });
                    console.log('CAMPANHA: ' + campanha);
                    console.log(res.data);
                    
                    if (res.data.success) {
                        const npcsMapeados = res.data.npcs.map(npc => ({
                            id: npc.id,
                            nome: npc.nome,
                            imagem: npc.imagem ? { uri: npc.imagem } : require('../../../../assets/img/logo.png')
                        }));
                        setNpcs(npcsMapeados);
                    }
                } catch (error) {
                    console.error("Erro ao buscar NPCs:", error);
                }
            } catch (error) {
                console.error("Erro ao verificar se mestre:", error);
            }
        };

        listarNpcs();
    }, [campanha, user.id]);

    // Estados para controlar o modal
    const [modalVisible, setModalVisible] = useState(false);
    const [npcParaDeletar, setNpcParaDeletar] = useState(null);

    // Função para abrir o modal de confirmação
    const confirmarDelecao = (id) => {
        setNpcParaDeletar(id);
        setModalVisible(true);
    };

    // Função para deletar um NPC
    const deletarNpcs = async () => {
        if (npcParaDeletar) {
            try {
                await api.delete("rpgetec/deletarNpcs.php", {
                    data: { id_npc: npcParaDeletar }
                });
                setNpcs(npcs.filter(npc => npc.id !== npcParaDeletar));
            } catch (error) {
                console.error("Erro ao deletar NPCs:", error);
            } finally {
                setModalVisible(false);
                setNpcParaDeletar(null);
            }
        }
    };

    // Função para cancelar a deleção
    const cancelarDelecao = () => {
        setModalVisible(false);
        setNpcParaDeletar(null);
    };

    return (
        <View style={styles.container}>
            <StatusBar backgroundColor="#124A69" barStyle="light-content" />
            
            <View style={styles.header}>
                <TouchableOpacity 
                    style={styles.backButton}
                    onPress={() => navigation.navigate("Home")}
                >
                    <Ionicons name="arrow-back-outline" size={20} color="#fff" />
                </TouchableOpacity>
                
                <Text style={styles.headerTitle}>Lista de NPCs</Text>
                
                {mestre && (
                    <TouchableOpacity 
                        style={styles.createButton}
                        onPress={() => navigation.navigate("CadastrarNpc")}
                    >
                        <Ionicons name="add-outline" size={22} color="#fff" />
                    </TouchableOpacity>
                )}
            </View>

            <ScrollView 
                style={styles.scrollView}
                contentContainerStyle={styles.scrollContent}
                showsVerticalScrollIndicator={false}
            >
                <Text style={styles.title}>NPCs da Campanha</Text>
                
                <View style={styles.npcsList}>
                    {npcs.length === 0 ? (
                        <Text style={styles.emptyText}>Nenhum NPC criado ainda.</Text>
                    ) : (
                        npcs.map((npc) => (
                            <TouchableOpacity 
                                key={npc.id}
                                style={styles.npcCard}
                                onPress={() => navigation.navigate("DetalhesNpc", { idNpc: npc.id })}
                            >
                                <Image 
                                    style={styles.npcImage} 
                                    resizeMode="cover" 
                                    source={npc.imagem} 
                                />
                                <View style={styles.npcInfo}>
                                    <Text style={styles.npcName}>{npc.nome}</Text>
                                </View>
                                
                                {mestre && (
                                    <TouchableOpacity 
                                        style={styles.archiveButton}
                                        onPress={() => confirmarDelecao(npc.id)}
                                    >
                                        <Ionicons name="trash-outline" size={24} color="#c00000" />
                                    </TouchableOpacity>
                                )}
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
                            Tem certeza que deseja excluir este NPC? Esta ação não pode ser desfeita.
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
                                onPress={deletarNpcs}
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