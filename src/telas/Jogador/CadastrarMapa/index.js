import React, { useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, TextInput, StatusBar, ScrollView, Image, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { styles } from './styles';
import { useUser } from "../../../context/UserContext.js";

import api from "../../../../services/api.js";


export default function CadastrarMapa({ navigation }) {
        const [nomeMapa, setNomeMapa] = useState('');
        const [imagemMapa, setImagemMapa] = useState('');
        console.log("====CADASTRAR Mapa====");
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
                                    <Text style={styles.label}>Nome:</Text>
                                    <View style={styles.inputContainer}>
                                         <TextInput
                                            style={styles.input}
                                            placeholder="Nome do mapa"
                                            placeholderTextColor="#999"
                                            value={nomeMapa}
                                            onChangeText={setNomeMapa}
                                        />
                                    </View> 
                                </View>
                                
                                <View style={styles.formRow}>
                                    <Text style={styles.label}>Imagem:</Text>
                                    <TouchableOpacity style={styles.buttonImage}
                                        onPress={() => saveData()}>
                                <Text style={styles.buttonText}>SELECIONAR MAPA</Text>
                            </TouchableOpacity>
                                </View>
                                 <View style={styles.formRow}>
                                    <Text style={styles.label}>Largura:</Text>
                                    <View style={styles.inputContainer}>
                                        <TextInput
                                            style={styles.input}
                                            placeholder="A largura do mapa"
                                            placeholderTextColor="#999"
                                            value={imagemMapa}
                                            onChangeText={setImagemMapa}
                                        />
                                    </View> 
                                </View>
                                  <View style={styles.formRow}>
                                    <Text style={styles.label}>Altura:</Text>
                                    <View style={styles.inputContainer}>
                                        <TextInput
                                            style={styles.input}
                                            placeholder="A altura do mapa"
                                            placeholderTextColor="#999"
                                            value={imagemMapa}
                                            onChangeText={setImagemMapa}
                                        />
                                    </View> 
                                </View>
                                
                                

                            </View>
                            
                            <TouchableOpacity style={styles.button}
                                 onPress={() => navigation.navigate("Mapa")}


                             
                             >
                                <Text style={styles.buttonText}>CRIAR MAPA</Text>
                            </TouchableOpacity>
                        </View>
                    </ScrollView>
                </View>
            );
        }
        
