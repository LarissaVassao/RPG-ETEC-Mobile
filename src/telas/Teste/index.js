import React, { useState } from 'react';
import { View, StyleSheet, Image, Text, TextInput, StatusBar, TouchableOpacity, ScrollView, Modal} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function Teste({ navigation }) {
  const [activeView, setActiveView] = useState('red'); 
  const [rpgEquipments, setRpgEquipments] = useState([
    {
      id: 1,
      name: "Espada Longa",
      type: "arma",
      price: 150,
      rarity: "comum", 
      weight: 2.5,
      bonus: 5,
      description: "Uma espada longa forjada em aço de alta qualidade. Ideal para combate corpo a corpo.",
    },
  ]);
  const [selectedItem, setSelectedItem] = useState(null);

  const handleButtonPress = (color) => {
    setActiveView(color);
  };

  const handleTypeChange = (itemId, newType) => {
    setRpgEquipments(prev => prev.map(item => 
      item.id === itemId ? { ...item, type: newType } : item
    ));
  };

    return (
    <View style={styles.container}>
        <StatusBar backgroundColor="#E0F4FF" barStyle="dark-content" />      
            <TouchableOpacity 
              style={styles.backButton}
              onPress={() => navigation.navigate("TelaCampanha")}
            >
              <Ionicons name="arrow-back-outline" size={30} color="#00283D" />
            </TouchableOpacity>
      
            <View style={styles.columnStyle} />
      
            <View style={styles.namePlayer}>
              <Text style={styles.playerText}>Jogador(a):</Text>
              <TextInput
                style={styles.playerInput}
                placeholder="Digite seu nome"
                placeholderTextColor="#000"
              />
            </View>
      
            <View style={styles.characterBase}>
              <View style={styles.nameCharacter}>
                <TextInput 
                  style={styles.name}
                  placeholder="Nome do Personagem"
                  placeholderTextColor="#000"
                />
              </View>
      
              <View style={styles.ocupationCharacter}>
                <View style={styles.occupationItem}>
                  <Text style={styles.occupationLabel}>Classe:</Text>
                  <TextInput 
                    style={styles.occupationInput}
                    placeholder="Ex: Guerreiro"
                    placeholderTextColor="#666"
                  />
                </View>
                
                <View style={styles.occupationItem}>
                  <Text style={styles.occupationLabel}>Nível:</Text>
                  <TextInput 
                    style={styles.occupationInput}
                    placeholder="Ex: 1"
                    placeholderTextColor="#666"
                    keyboardType="numeric"
                  />
                </View>
              </View>
            </View>
            
            <Image 
              source={require('../../../assets/img/pessoa.png')}
              style={styles.imageStyle}
            />

      <View style={styles.buttonsContainer}>
        <TouchableOpacity 
          style={[styles.buttons, {backgroundColor: '#dceff9'}]} 
          onPress={() => handleButtonPress('red')}
        ><Ionicons name="person-circle-outline" size={80} color="#00283D"/></TouchableOpacity>
        <TouchableOpacity 
          style={[styles.buttons, {backgroundColor: '#96CFEE'}]} 
          onPress={() => handleButtonPress('green')}
        ><Ionicons name="person-circle-outline" size={80} color="#00283D"/></TouchableOpacity>
        <TouchableOpacity 
          style={[styles.buttons, {backgroundColor: '#2295D1'}]} 
          onPress={() => handleButtonPress('blue')}
        ><Ionicons name="person-circle-outline" size={80} color="#00283D"/></TouchableOpacity>
        <TouchableOpacity 
          style={[styles.buttons, {backgroundColor: '#124A69'}]} 
          onPress={() => handleButtonPress('pink')}
        ><Ionicons name="person-circle-outline" size={80} color="#00283D"/></TouchableOpacity>
      </View>

      

    </View>


    );
    }
    
    
    const styles = StyleSheet.create({
      colors: {
        primaryBlue: '#092534',
        secondaryBlue: '#1E3A53',
        lightBlue: '#0A2D42',
        darkBlue: '#124A69',
        gold: '#FFD700',
        white: '#FFFFFF',
        lightGray: '#CCCCCC',
        darkGray: '#333333'
      },
    
      container: {
        flex: 1,
        backgroundColor: '#fff',
      },
      mainContent: {
        flex: 1,
        marginTop: 250,
      },
      viewTitle: {
        fontSize: 27,
        fontWeight: 'bold',
        color: '#FFD700',
        textAlign: 'center',
        marginVertical: 10,
        marginTop: 5,
        textShadowColor: '#092534',
        textShadowOffset: { width: 1, height: 1 },
        textShadowRadius: 2,
      },
      scrollContent: {
        paddingBottom: 30,
        paddingHorizontal: 10,
      },
    
     
      backButton: {
        position: 'absolute',
        top: 5,
        left: 0,
        zIndex: 2,
        padding: 10,
        backgroundColor: 'rgba(86,131,185, 0.1)',
        borderRadius: 100,
      },
      columnStyle: {
        position: 'absolute',
        top: 0,
        width: 5,
        height: '100%',
        backgroundColor: '#E0F4FF',
      },
      namePlayer: {
        position: 'absolute',
        top: 0,
        width: '100%',
        height: 50,
        backgroundColor: '#E0F4FF',
        flexDirection: 'row',
        alignItems: 'center',
      },
      playerText: {
        fontSize: 16,
        color: '#000',
        marginLeft: 135, 
      },
      playerInput: {
        flex: 1,
        height: 50,
        backgroundColor: 'transparent',
        paddingHorizontal: 10,
        color: '#333',
        fontSize: 16,
      },
    
      characterBase: {
        position: 'absolute',
        top: 50,
        width: '100%',
        height: 100,
        backgroundColor: '#ffffffb6',
      },
      nameCharacter: {
        top: 0,
        marginLeft: 130, 
      },
      name:{
        fontSize: 25,
        fontWeight: 'bold'
      },
      ocupationCharacter: {
        marginLeft: 132,
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: '-15',
      },
      occupationItem: {
        flexDirection: 'row',
        alignItems: 'center',
        marginRight: '15',
      },
      occupationLabel: {
        fontSize: 15,
        color: '#000',
        marginRight: 5,
      },
      occupationInput: {
        width: 100,
        height: 40,
        borderColor: '#ccc',
      },
      imageStyle: {
        position: 'absolute',
        top: 0,
        left: 0,
        width: 130,
        height: 150,
        borderBottomRightRadius: 100,
        zIndex: 1,
        borderBottomColor: '#E0F4FF',
        borderWidth: 5,
        borderColor: '#E0F4FF',
      },
    
      buttonsContainer: {
        position: 'absolute',
        top: 170, 
        flexDirection: 'row',
        justifyContent: 'space-around',
        paddingHorizontal: 0,
      },
      buttons: {
        width: '23%',
        height: 80,
        borderRadius: 10,
        borderBottomEndRadius:0,
        borderBottomLeftRadius:0,
        marginInline: '1%',
        justifyContent: 'center', 
        alignItems: 'center', 
      },
    
      redView: {
        flex: 1,
        backgroundColor: '#dceff9',
        padding: 10,
      },
      greenView: {
        flex: 1,
        backgroundColor: '#96CFEE',
      },
      blueView: {
        flex: 1,
        backgroundColor: '#2295D1',
        padding: 10,
      },
      pinkView: {
        flex: 1,
        backgroundColor: '#124A69',
        padding: 10,
      },
    
      containerWithBorder: {
        backgroundColor: '#1E3A53',
        padding: 15,
        borderRadius: 10,
        borderWidth: 2,
        borderColor: '#FFD700',
        marginBottom: 15,
      },
      label: {
        color: '#FFD700',
        fontWeight: 'bold',
        fontSize: 16,
        marginBottom: 8,
      },
      input: {
        backgroundColor: '#0A2D42',
        color: '#FFD700',
        padding: 12,
        borderRadius: 8,
        borderWidth: 1,
        borderColor: '#5683B9',
        fontSize: 14,
      },
    
    sectionTitle: {
      fontSize: 27,
      fontWeight: 'bold',
      color: '#ffffffff',
      textAlign: 'center',
      marginBottom: 20,
      fontFamily: 'System',
      textShadowColor: '#a19420ff',
      textShadowOffset: { width: 1, height: 1 },
      textShadowRadius: 2,
    },
    tableContainer: {
      flex: 1,
      backgroundColor: '#cccccc8e',
      borderRadius: 12,
      overflow: 'hidden',
      borderWidth: 2,
      borderColor: '#09253494',
    },
      tableHeader: {
        flexDirection: 'row',
        backgroundColor: '#092534',
        padding: 15,
        borderBottomWidth: 2,
        borderBottomColor: '#FFD700',
      },
      headerText: {
        color: '#FFD700',
        fontWeight: 'bold',
        fontSize: 14,
        textAlign: 'center',
      },
      headerName: { flex: 3 },
      headerPrice: { flex: 1.5 },
      headerWeight: { flex: 1.5 },
      headerActions: { flex: 0.5 },
      
      tableRow: {
        flexDirection: 'row',
        padding: 12,
        borderBottomWidth: 1,
        borderBottomColor: '#444',
        alignItems: 'center',
        backgroundColor: '#333',
      },
      cellText: {
        fontSize: 14,
        color: '#FFF',
        textAlign: 'center',
      },
      cellName: { 
        flex: 3, 
        fontWeight: 'bold',
        color: '#FFD700',
      },
      cellPrice: { 
        flex: 1.5, 
        fontWeight: 'bold',
        color: '#FFD700',
      },
      cellWeight: { 
        flex: 1.5, 
        fontWeight: 'bold',
        color: '#FFD700',
      },
      cellActions: {
        flex: 0.5,
        alignItems: 'center',
        justifyContent: 'center',
      },
    
    credit: {
      color: '#FFD700',
      fontWeight: 'bold',
    },
    
      modalOverlay: {
        flex: 1,
        backgroundColor: 'rgba(0, 0, 0, 0.8)',
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
        height: '100%'
      },
      modalContainer: {
        backgroundColor: '#686868ff',
        padding: 25,
        borderRadius: 15,
        width: '90%',
        maxHeight: '80%', 
        borderWidth: 3,
        borderColor: '#ffffffff',
      },
      modalContentScroll: {
      maxHeight: 250, 
      },
      modalContentContainer: {
        paddingBottom: 20, 
      },
      modalHeader: {
        borderBottomWidth: 2,
        borderBottomColor: '#ffffffff',
        paddingBottom: 15,
        marginBottom: 15,
      },
      modalTitle: {
        fontSize: 22,
        fontWeight: 'bold',
        color: '#5bb5ffff',
        textAlign: 'center',
        marginBottom: 5,
      },
      modalType: {
        fontSize: 16,
        color: '#dadadaff',
        textAlign: 'center',
        textTransform: 'capitalize',
        fontStyle: 'italic',
      },
      modalInfoRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 12,
        padding: 10,
        backgroundColor: '#5e5e5eff',
        borderRadius: 6,
      },
      modalLabel: {
        color: '#a9e1ffff',
        fontWeight: 'bold',
        fontSize: 14,
        flex: 1,
      },
      modalValue: {
        color: '#FFF',
        fontSize: 14,
        fontWeight: '600',
        flex: 1,
        textAlign: 'right',
      },
      modalBonus: {
        color: '#00f7ffff',
        fontWeight: 'bold',
        fontSize: 16,
      },
     
      modalDescription: {
        color: '#CCC',
        fontSize: 14,
        lineHeight: 20,
        fontStyle: 'italic',
        marginTop: 8,
      },
      modalCloseButton: {
        backgroundColor: '#59a2f7ff',
        padding: 15,
        borderRadius: 8,
        alignItems: 'center',
        marginTop: 15,
        borderWidth: 1,
        borderColor: '#ffffffff',
      },
      modalCloseText: {
        color: '#ffffffff',
        fontWeight: 'bold',
        fontSize: 16,
      },
    
    comum: { color: '#FFFFFF' },
    raro: { color: '#0070DD' },
    epico: { color: '#A335EE' },
    lendario: { color: '#FF8000' },
    
      
    descriptionContainer: {
      marginTop: 20,
      padding: 12,
      backgroundColor: '#6e6e6eff',
      borderRadius: 8,
      borderLeftWidth: 4,
      borderLeftColor: '#092534',
    },
    
      containerBackground: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        
        marginBottom: 7, 
      },
    
      lifeBackground: {
        backgroundColor: '#79899D',
        width: '50%',
        height: 45,
        borderRadius: 50,
        borderColor: '#4B617C',
        borderWidth: 3,
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
      },
    
      subtractAndAdditionbox: {
        backgroundColor: '#79899D',
        width: '15%',
        height: 45,
        borderWidth: 3,
        borderColor: '#4B617C',
        borderRadius: 3
      },
    
      three: {
          top: 10,
          justifyContent: 'space-around',
          width: '90%',
          flexDirection: 'row',
    
      },
    
        
      scrollView: {
        flex: 1,
      },
      scrollContent: {
        paddingBottom: 20,
      },
      
  
    
    });