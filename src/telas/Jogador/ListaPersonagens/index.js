 import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Image, ScrollView, StatusBar, Modal, Pressable} from "react-native";
import { Ionicons } from '@expo/vector-icons'; 

import api from "../../../../services/api.js";

export default function ListaPersonagens({ navigation }) {
    // Estado para armazenar a lista de personagens
    const [personagens, setPersonagens] = useState([]);

    useEffect(() => {
        const listarPersonagens = async () => {
            try {
              
                const res = await api.get("rpgetec/listarPersonagens.php", {params: {id_campanha: 1}});
                console.log(res.data);
                if(res.data.success){
                const personagensMapeados = res.data.personagens.map(p => ({
                    key: p.id,
                    nome: p.nome,
                    imagem: require('../../../../assets/img/logo.png') 
                })); 
                setPersonagens(personagensMapeados);
              }
            } catch (error) {
                console.error("Erro ao buscar personagens:", error);
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
                
                {/*
                Caso for Mestre
                <TouchableOpacity 
                    style={styles.createButton}
                    onPress={() => navigation.navigate("CadastrarPersonagem")}
                >
                    <Ionicons name="add-outline" size={22} color="#fff" />
                </TouchableOpacity> */}
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
                                onPress={() => navigation.navigate("Personagem", { id: personagem.id })}
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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8fafc',
  },
  header: {
    backgroundColor: '#124A69',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 12,
    height: 60,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  headerTitle: {
    color: '#fff',
    fontSize: 20,
    fontWeight: '600',
    letterSpacing: 0.3,
  },
  backButton: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  createButton: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    padding: 16,
    paddingBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: '700',
    color: '#124A69',
    marginBottom: 20,
    textAlign: 'center',
    marginTop: 5,
  },
  charactersList: {
    marginBottom: 20,
  },
  characterCard: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 12,
    marginBottom: 12,
    flexDirection: 'row',
    alignItems: 'center',
    elevation: 1,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    borderLeftWidth: 3,
    borderLeftColor: '#2295D1',
  },
  characterImage: {
    width: 45,
    height: 45,
    borderRadius: 22,
    backgroundColor: '#e3f2fd',
  },
  characterInfo: {
    flex: 1,
    marginLeft: 12,
  },
  characterName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#124A69',
    marginBottom: 3,
  },
  archiveButton: {
    padding: 8,
  },
  emptyText: {
    textAlign: 'center',
    fontSize: 16,
    color: '#666',
    marginTop: 20,
    fontStyle: 'italic',
  },
  // Estilos do Modal
  modalOverlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    padding: 20,
  },
  modalContent: {
    backgroundColor: 'white',
    borderRadius: 15,
    padding: 25,
    width: '90%',
    maxWidth: 400,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  modalHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginLeft: 10,
    color: '#333',
  },
  modalMessage: {
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 25,
    color: '#555',
    lineHeight: 22,
  },
  modalButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
  modalButton: {
    borderRadius: 8,
    padding: 12,
    elevation: 2,
    minWidth: 100,
    alignItems: 'center',
  },
  cancelButton: {
    backgroundColor: '#f1f1f1',
    marginRight: 10,
    flex: 1,
  },
  confirmButton: {
    backgroundColor: '#c00000',
    marginLeft: 10,
    flex: 1,
  },
  cancelButtonText: {
    color: '#333',
    fontWeight: 'bold',
    fontSize: 16,
  },
  confirmButtonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
  },
});