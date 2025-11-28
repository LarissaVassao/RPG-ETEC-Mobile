import React, { useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, TextInput, StatusBar, ScrollView, Image, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { styles } from './styles';
import { useUser } from "../../../context/UserContext.js";
import * as ImagePicker from 'expo-image-picker'; // Para seleção de imagem
import api from "../../../../services/api.js";

export default function CadastrarMapa({ navigation }) {
    const { campanha } = useUser();
    const [nomeMapa, setNomeMapa] = useState('');
    const [largura, setLargura] = useState('20');
    const [altura, setAltura] = useState('20');
    const [cellSize, setCellSize] = useState('50');
    const [imagemMapa, setImagemMapa] = useState(null);
    const [uploading, setUploading] = useState(false);

    console.log("====CADASTRAR Mapa====");

    // Selecionar imagem da galeria
    const selecionarImagem = async () => {
        try {
            const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
            
            if (status !== 'granted') {
                Alert.alert('Permissão necessária', 'Precisamos de acesso à galeria para selecionar uma imagem.');
                return;
            }

            const result = await ImagePicker.launchImageLibraryAsync({
                mediaTypes: ImagePicker.MediaTypeOptions.Images,
                allowsEditing: true,
                quality: 0.8,
            });

            if (!result.canceled && result.assets && result.assets.length > 0) {
                setImagemMapa(result.assets[0]);
            }
        } catch (error) {
            console.error('Erro ao selecionar imagem:', error);
            Alert.alert('Erro', 'Não foi possível selecionar a imagem.');
        }
    };

    // Upload da imagem para o servidor
    const uploadImagem = async (mapaId) => {
        if (!imagemMapa) return null;

        const formData = new FormData();
        formData.append('imagem', {
            uri: imagemMapa.uri,
            type: 'image/jpeg',
            name: `mapa_${mapaId}.jpg`
        });
        formData.append('id_mapa', mapaId.toString());

        try {
            const response = await api.post('rpgetec/uploadMapa.php', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            return response.data;
        } catch (error) {
            console.error('Erro no upload:', error);
            return null;
        }
    };

    // Salvar dados do mapa
    const saveData = async () => {
        // Validações
        if (!nomeMapa.trim()) {
            Alert.alert('Campo obrigatório', 'Por favor, informe o nome do mapa.');
            return;
        }

        if (!largura || !altura || !cellSize) {
            Alert.alert('Campo obrigatório', 'Por favor, informe largura, altura e tamanho da célula.');
            return;
        }

        const larguraNum = parseInt(largura);
        const alturaNum = parseInt(altura);
        const cellSizeNum = parseInt(cellSize);

        if (isNaN(larguraNum) || isNaN(alturaNum) || isNaN(cellSizeNum)) {
            Alert.alert('Valor inválido', 'Largura, altura e tamanho da célula devem ser números.');
            return;
        }

        if (larguraNum <= 0 || alturaNum <= 0 || cellSizeNum <= 0) {
            Alert.alert('Valor inválido', 'Largura, altura e tamanho da célula devem ser maiores que zero.');
            return;
        }

        setUploading(true);

        try {
            // Primeiro, salvar os dados básicos do mapa
            const mapaData = {
                nome: nomeMapa,
                id_campanha: campanha,
                largura: larguraNum,
                altura: alturaNum,
                cellSize: cellSizeNum
            };

            console.log('Enviando dados do mapa:', mapaData);

            const response = await api.post('rpgetec/salvarMapa.php', mapaData);
            
            if (response.data.sucesso) {
                const mapaId = response.data.id;
                
                // Se há imagem, fazer upload
                if (imagemMapa) {
                    const uploadResult = await uploadImagem(mapaId);
                    if (!uploadResult || !uploadResult.sucesso) {
                        Alert.alert('Aviso', 'Mapa criado, mas houve um problema ao fazer upload da imagem.');
                    }
                }

                Alert.alert(
                    'Sucesso!', 
                    'Mapa criado com sucesso!',
                    [
                        {
                            text: 'OK',
                            onPress: () => navigation.navigate('Mapa', { 
                                id: mapaId,
                                mestre: true // Assumindo que quem cria é mestre
                            })
                        }
                    ]
                );
            } else {
                throw new Error(response.data.mensagem || 'Erro ao criar mapa');
            }
        } catch (error) {
            console.error('Erro ao salvar mapa:', error);
            Alert.alert('Erro', error.message || 'Não foi possível criar o mapa. Tente novamente.');
        } finally {
            setUploading(false);
        }
    };

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
                    <Text style={styles.title}>Ficha de Criação de Mapa</Text>
                    
                    <View style={styles.formContainer}>
                        <View style={styles.formRow}>
                            <Text style={styles.label}>Nome do Mapa:</Text>
                            <View style={styles.inputContainer}>
                                <TextInput
                                    style={styles.input}
                                    placeholder="Digite o nome do mapa"
                                    placeholderTextColor="#999"
                                    value={nomeMapa}
                                    onChangeText={setNomeMapa}
                                />
                            </View> 
                        </View>
                        
                        <View style={styles.formRow}>
                            <Text style={styles.label}>Imagem de Fundo (opcional):</Text>
                            <TouchableOpacity 
                                style={[
                                    styles.buttonImage, 
                                    imagemMapa && styles.buttonImageSelected
                                ]}
                                onPress={selecionarImagem}
                                disabled={uploading}
                            >
                                <Text style={styles.buttonText}>
                                    {imagemMapa ? 'IMAGEM SELECIONADA' : 'SELECIONAR MAPA'}
                                </Text>
                            </TouchableOpacity>
                            {imagemMapa && (
                                <Text style={styles.imageInfo}>
                                    Imagem selecionada: {imagemMapa.fileName || 'Imagem'}
                                </Text>
                            )}
                        </View>

                        <View style={styles.formRow}>
                            <Text style={styles.label}>Largura (número de células):</Text>
                            <View style={styles.inputContainer}>
                                <TextInput
                                    style={styles.input}
                                    placeholder="Ex: 20"
                                    placeholderTextColor="#999"
                                    value={largura}
                                    onChangeText={setLargura}
                                    keyboardType="numeric"
                                />
                            </View> 
                        </View>

                        <View style={styles.formRow}>
                            <Text style={styles.label}>Altura (número de células):</Text>
                            <View style={styles.inputContainer}>
                                <TextInput
                                    style={styles.input}
                                    placeholder="Ex: 20"
                                    placeholderTextColor="#999"
                                    value={altura}
                                    onChangeText={setAltura}
                                    keyboardType="numeric"
                                />
                            </View> 
                        </View>

                        <View style={styles.formRow}>
                            <Text style={styles.label}>Tamanho da Célula (pixels):</Text>
                            <View style={styles.inputContainer}>
                                <TextInput
                                    style={styles.input}
                                    placeholder="Ex: 50"
                                    placeholderTextColor="#999"
                                    value={cellSize}
                                    onChangeText={setCellSize}
                                    keyboardType="numeric"
                                />
                            </View> 
                        </View>

                    </View>
                    
                    <TouchableOpacity 
                        style={[
                            styles.button,
                            uploading && styles.buttonDisabled
                        ]}
                        onPress={saveData}
                        disabled={uploading}
                    >
                        <Text style={styles.buttonText}>
                            {uploading ? 'CRIANDO...' : 'CRIAR MAPA'}
                        </Text>
                    </TouchableOpacity>
                </View>
            </ScrollView>
        </View>
    );
}