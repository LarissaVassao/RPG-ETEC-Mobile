import React, { useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Image, ScrollView, StatusBar } from "react-native";
import { Ionicons } from '@expo/vector-icons'; 

export default function ListaPersonagens({ navigation }) {
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
                    <TouchableOpacity 
                        style={styles.characterCard}
                        onPress={() => navigation.navigate("Personagem")}
                    >
                        <Image 
                            style={styles.characterImage} 
                            resizeMode="cover" 
                            source={require('../../../../assets/img/logo.png')} 
                        />
                        <View style={styles.characterInfo}>
                            <Text style={styles.characterName}>Nome do Personagem</Text>
                        </View>
                        <Ionicons name="chevron-forward" size={20} color="#9ebccc" />
                    </TouchableOpacity>

                    <TouchableOpacity 
                        style={styles.characterCard}
                        onPress={() => navigation.navigate("Personagem")}
                    >
                        <Image 
                            style={styles.characterImage} 
                            resizeMode="cover" 
                            source={require('../../../../assets/img/logo.png')} 
                        />
                        <View style={styles.characterInfo}>
                            <Text style={styles.characterName}>Outro Personagem</Text>
                        </View>
                        <Ionicons name="chevron-forward" size={20} color="#9ebccc" />
                    </TouchableOpacity>

                    <TouchableOpacity 
                        style={styles.characterCard}
                        onPress={() => navigation.navigate("Personagem")}
                    >
                        <Image 
                            style={styles.characterImage} 
                            resizeMode="cover" 
                            source={require('../../../../assets/img/logo.png')} 
                        />
                        <View style={styles.characterInfo}>
                            <Text style={styles.characterName}>Personagem Exemplo</Text>
                        </View>
                        <Ionicons name="chevron-forward" size={20} color="#9ebccc" />
                    </TouchableOpacity>
                </View>

            </ScrollView>

            
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
  
});