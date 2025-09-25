import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Image, ScrollView, StatusBar, Modal, Pressable} from "react-native";
import { Ionicons } from '@expo/vector-icons'; 
import { styles } from './styles';
import { useUser } from "../../../context/UserContext.js";

import api from "../../../../services/api.js";

export default function ListaMapas({ navigation }) {
    // Estado para armazenar a lista de mapas
    const [mapas, setMapas] = useState([]);
    const [mestre, setMestre] = useState(false);
    const { user, campanha } = useUser();

    useEffect(() => {
        const listarMapas = async () => {
            try {
                console.log("Id da Campanha: "+campanha);
                console.log("Id da Usuario: "+user.id);
                const res = await api.get("rpgetec/verificarMestre.php", {params: {id_campanha: campanha, id_usuario: user.id}});
                console.log("Resultado de verificar mestre: "+res.data);
                setMestre(res.data);
                  
                try {
                    const res = await api.get("rpgetec/listarMapas.php", {params: {id_campanha: campanha, mestre: mestre}});
                    console.log(campanha)
                    console.log(res.data);
                    if(res.data.success){
                    const mapasMapeados = res.data.mapas.map(m => ({
                        key: m.id,
                        nome: m.nome,
                        imagem: require('../../../../assets/img/logo.png') 
                    })); 
                    setMapas(mapasMapeados);
                  }
                } catch (error) {
                    console.error("Erro ao buscar mapas:", error);
                }  
            } catch (error) {
                console.error("Erro ao verificar se mestre:", error);
            }
        };

        listarMapas();
    }, []);

    // Estados para controlar o modal
    const [modalVisible, setModalVisible] = useState(false);
    const [mapaParaDeletar, setMapaParaDeletar] = useState(null);

    // Função para abrir o modal de confirmação
    const confirmarDelecao = (id) => {
        setMapaParaDeletar(id);
        setModalVisible(true);
    };

    // Função para deletar um mapa
    const deletarMapa = () => {
        if (mapaParaDeletar) {
            setMapas(mapas.filter(mapa => mapa.id !== mapaParaDeletar));
            setModalVisible(false);
            setMapaParaDeletar(null);
        }
    };

    // Função para cancelar a deleção
    const cancelarDelecao = () => {
        setModalVisible(false);
        setMapaParaDeletar(null);
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
                
                <Text style={styles.headerTitle}>Lista de Mapas</Text>
                
                {mestre && (
                    <TouchableOpacity 
                        style={styles.createButton}
                        onPress={() => navigation.navigate("Mapa")}
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
                <Text style={styles.title}>Mapas</Text>
                
                <View style={styles.mapasList}>
                    {mapas.length === 0 ? (
                        <Text style={styles.emptyText}>Nenhum mapa criado ainda.</Text>
                    ) : (
                        mapas.map((mapa) => (
                            <TouchableOpacity 
                                key={mapa.id}
                                style={styles.mapaCard}
                                onPress={() => navigation.navigate("Mapa", { id: mapa.id })}
                            >
                                <Image 
                                    style={styles.mapaImage} 
                                    resizeMode="cover" 
                                    source={mapa.imagem} 
                                />
                                <View style={styles.mapaInfo}>
                                    <Text style={styles.mapaName}>{mapa.nome}</Text>
                                </View>
                                {/* 
                                  Caso for Mestre
                                
                                <TouchableOpacity 
                                    style={styles.archiveButton}
                                    onPress={() => confirmarDelecao(mapa.id)}
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
                            Tem certeza que deseja excluir este mapa? Esta ação não pode ser desfeita.
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
                                onPress={deletarMapa}
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