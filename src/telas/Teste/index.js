import React, { useState } from 'react';
import { View, StyleSheet, Image, Text, TextInput, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';


export default function Home({ navigation }) {
  const [activeView, setActiveView] = useState('red'); // Inicia com redView visível

  const handleButtonPress = (color) => {
    setActiveView(color);
  };

  return (
    <View style={styles.container}>
      <View style={styles.bar} />
      <TouchableOpacity 
        style={styles.backButton}
        onPress={() => navigation.navigate("Home")}
        >
        <Ionicons name="arrow-back-outline" size={30} color="#3B004F" />
      </TouchableOpacity>

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
          style={[styles.buttons, {backgroundColor: '#FF5733'}]} 
          onPress={() => handleButtonPress('red')}
        ><Ionicons name="person-circle-outline" size={80} color="#3B004F"/> </TouchableOpacity>
        <TouchableOpacity 
          style={[styles.buttons, {backgroundColor: '#33FF57'}]} 
          onPress={() => handleButtonPress('green')}
        ><Ionicons name="person-circle-outline" size={80} color="#3B004F"/> </TouchableOpacity>
        <TouchableOpacity 
          style={[styles.buttons, {backgroundColor: '#3357FF'}]} 
          onPress={() => handleButtonPress('blue')}
        ><Ionicons name="person-circle-outline" size={80} color="#3B004F"/></TouchableOpacity>
        <TouchableOpacity 
          style={[styles.buttons, {backgroundColor: '#F033FF'}]} 
          onPress={() => handleButtonPress('pink')}
        ><Ionicons name="person-circle-outline" size={80} color="#3B004F"/></TouchableOpacity>
      </View>

      {activeView === 'red' && <View style={styles.redView}> 
        
        </View>}
      {activeView === 'green' && <View style={styles.greenView} >
        
        </View>}
      {activeView === 'blue' && <View style={styles.blueView} >
        
        </View>}
      {activeView === 'pink' && <View style={styles.pinkView} >
        
        </View>}
    </View>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    position: 'relative',
  },
  namePlayer: {
    position: 'absolute',
    top: 40,
    width: '100%',
    height: 50,
    backgroundColor: '#D9EAFF',
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
  backButton: {
  position: 'absolute',
  top: 40,
  left: 0,
  zIndex: 2,
  padding: 10,
  backgroundColor: 'rgba(86,131,185, 0.1)', // Branco com 50% de transparência
  borderRadius: 100,
},
  bar: {
    position: 'absolute',
    top: 0,
    width: '100%',
    height: 40,
    backgroundColor: '#5683B9',
  },
  imageStyle: {
    position: 'absolute',
    top: 40,
    left: 0,
    width: 130,
    height: 150,
    borderBottomRightRadius: 100,
    zIndex: 1,
    borderBottomColor: '#D9EAFF',
  },
  characterBase: {
    position: 'absolute',
    top: 90,
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

  
  buttonsContainer: {
    position: 'absolute',
    top: 200, 
    //width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingHorizontal: 0,
  },
  buttons: {
    width: 89,
    height: 80,
    borderRadius: 10,
    borderBottomEndRadius:0,
    borderBottomLeftRadius:0,
    marginInline: 5,
    justifyContent: 'center', // Centraliza verticalmente
    alignItems: 'center', 
  },

    redView: {
    position: 'absolute',
    top: 280,
    width: '100%',
    height: '100%',
    backgroundColor: '#FF5733',
  },
  greenView: {
    position: 'absolute',
    top: 280,
    width: '100%',
    height: '100%',
    backgroundColor: '#33FF57',
  },
  blueView: {
    position: 'absolute',
    top: 280,
    width: '100%',
    height: '100%',
    backgroundColor: '#3357FF',
  },
  pinkView: {
    position: 'absolute',
    top: 280,
    width: '100%',
    height: '100%',
    backgroundColor: '#F033FF',
  },
});