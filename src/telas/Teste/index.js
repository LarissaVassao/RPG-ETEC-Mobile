import React, { useState } from 'react';
import { View, StyleSheet, Image, Text, TextInput, TouchableOpacity,ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';


export default function Home({ navigation }) {
  const [activeView, setActiveView] = useState('red'); 

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
        ><Ionicons name="person-circle-outline" size={80} color="#00283D"/> </TouchableOpacity>
        <TouchableOpacity 
          style={[styles.buttons, {backgroundColor: '#96CFEE'}]} 
          onPress={() => handleButtonPress('green')}
        ><Ionicons name="person-circle-outline" size={80} color="#00283D"/> </TouchableOpacity>
        <TouchableOpacity 
          style={[styles.buttons, {backgroundColor: '#2295D1'}]} 
          onPress={() => handleButtonPress('blue')}
        ><Ionicons name="person-circle-outline" size={80} color="#00283D"/></TouchableOpacity>
        <TouchableOpacity 
          style={[styles.buttons, {backgroundColor: '#124A69'}]} 
          onPress={() => handleButtonPress('pink')}
        ><Ionicons name="person-circle-outline" size={80} color="#00283D"/></TouchableOpacity>
      </View>

      {activeView === 'red' && <View style={styles.redView}> 

          <View style={{flexDirection: 'row', width: '90%', top: 10}}>
            <View style={{justifyContent: 'space-around', marginRight: 10, marginLeft: 10}}>
              <Text>Vida:</Text>
              <Text>Mental:</Text>
              <Text>Energia:</Text>
            </View>
            
            <View style={{flex: 1, paddingHorizontal: -7}}>
              <View style={styles.containerBackground}>
                <View style={styles.subtractAndAdditionbox}></View>   
                <View style={styles.lifeBackground}>  
                  <View style={styles.boxT}></View>
                  <View style={styles.boxT}></View>     
                </View>
                <View style={styles.subtractAndAdditionbox}></View>
              </View>
              
              <View style={styles.containerBackground}>
                <View style={styles.subtractAndAdditionbox}></View>   
                <View style={styles.lifeBackground}>  
                  <View style={styles.boxT}></View>
                  <View style={styles.boxT}></View>     
                </View>
                <View style={styles.subtractAndAdditionbox}></View>
              </View>
              
              <View style={styles.containerBackground}>
                <View style={styles.subtractAndAdditionbox}></View>   
                <View style={styles.lifeBackground}>  
                  <View style={styles.boxT}></View>
                  <View style={styles.boxT}></View>     
                </View>
                <View style={styles.subtractAndAdditionbox}></View>
              </View>
            </View>

          </View>

          <View style={styles.three}> 
            <View> 
              
              <Text>CA</Text>

             </View>

            <View> <Text>|</Text> </View>

            <View>  <Text>Carga</Text> </View>

            <View> <Text>|</Text> </View>

            <View>  <Text>Movimento</Text> </View>

          </View>

          <View style={styles.creditBackground}>       <Text>Crédito</Text> </View>

          {/* CA | Carga | Movimento */}

          {/* <View>
            <View style={styles.attributeContainer}> 
              <View style={styles.attributesBackgroundTop}>  </View>
              <View style={styles.attributesBackgroundTop}>  </View>
              <View style={styles.attributesBackgroundTop}>  </View>
            </View>
            
            <View style={[styles.attributeContainer, {marginTop: 120}]}> 
              <View style={styles.attributesBackgroundBottom}>  </View>
              <View style={styles.attributesBackgroundBottom}>  </View>
              <View style={styles.attributesBackgroundBottom}>  </View>
            </View>
            
            <View style={[styles.attributeContainerLuck]}> 
              <View style={styles.attributeBackgroundLuck}> <Text>Colcocar sorte </Text> </View> 
            </View>
          </View> */}


        </View>}
      {activeView === 'green' && <View style={styles.greenView} >
        {/* Adicionar o scrollview */}
            <View style={styles.skillContainer}>
              
              <View style={styles.skillBackground}>
              <TouchableOpacity style={styles.skillTouchable}></TouchableOpacity>  
              <Text skillText>AAAAAAAAA</Text>
              </View>

            </View>
          <Text>Pericia</Text>

        </View>}
      {activeView === 'blue' && <View style={styles.blueView} >
          <Text>Mochila - Armadura</Text>
        </View>}
      {activeView === 'pink' && <View style={styles.pinkView} >
          <Text>Olho</Text>
          <Text>Cabelo</Text>        
          <Text>Aparencia</Text> 
          <Text>Tamanho</Text> 
          <Text>Biografia</Text>
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
    backgroundColor: '#E0F4FF',
    flexDirection: 'row',
    alignItems: 'center',
  },
  columnStyle: {
    position: 'absolute',
    top: 40,
    width: 5,
    height: '100%',
    backgroundColor: '#E0F4FF',
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
  backgroundColor: 'rgba(86,131,185, 0.1)',
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
    borderBottomColor: '#E0F4FF',
    borderWidth: 5,
    borderColor: '#E0F4FF',
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
    top: 210, 
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
    position: 'absolute',
    top: 290,
    width: '100%',
    height: '100%',
    backgroundColor: '#dceff9',
  },
  greenView: {
    position: 'absolute',
    top: 290,
    width: '100%',
    height: '100%',
    backgroundColor: '#96CFEE',
  },
  blueView: {
    position: 'absolute',
    top: 290,
    width: '100%',
    height: '100%',
    backgroundColor: '#2295D1',
  },
  pinkView: {
    position: 'absolute',
    top: 290,
    width: '100%',
    height: '100%',
    backgroundColor: '#124A69',
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

  


  skillContainer: {
     width: '95%',
     alignSelf: 'center',
     top: 10
  },
  skillBackground: {
    height: 50,
    width: '100%',
    backgroundColor: '#ff00aa',
    borderColor: '#2e1f29ff',
    borderWidth: 2,
    borderRadius: 10,
    flexDirection: 'row',

  },
  skillText: {

  },
  skillTouchable: {
    backgroundColor: '#aaa',
    height: '85%',
    width: 50,
  },

  attributeContainer:{
    position: 'absolute',
    top: 1, 
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingHorizontal: 2, 
  },
  attributesBackgroundTop:{
    width: '30%',
    height: 110,
    backgroundColor: '#124A69',
    marginInline: 5,
    borderTopEndRadius: 10,
    borderTopStartRadius: 10,

  },
 attributesBackgroundBottom:{
    width: '30%',
    height: 110,
    backgroundColor: '#124A69',
    marginInline: 5,
    borderBottomEndRadius: 10,
    borderBottomStartRadius: 10,

  },
   attributeContainerLuck:{
    position: 'absolute',
    alignItems: 'center',
    width: '100%',
  },
  attributeBackgroundLuck: {
    top: 250,
    width: '70%',
    height: 110,
    backgroundColor: '#124A69',
    borderRadius: 10
  },
  attributesName: {

  },
  attributesValue: {

  },



});