import React, { useState } from 'react';
import { View, StyleSheet, Image, Text, TextInput, TouchableOpacity, ScrollView, Modal} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import {Picker} from '@react-native-picker/picker';


export default function Home({ navigation }) {
  const [activeView, setActiveView] = useState('red'); 

  const handleButtonPress = (color) => {
    setActiveView(color);
  };

  // Estados e dados (coloque no início do seu componente)
const [rpgEquipments, setRpgEquipments] = useState([
  {
    id: 1,
    name: "Espada Longa",
    type: "arma",
    price: 150,
    rarity: "comum",
    bonus: 5,
    description: "Uma espada longa forjada em aço de alta qualidade. Ideal para combate corpo a corpo."
  },

]);

const [selectedItem, setSelectedItem] = useState(null);

const handleTypeChange = (itemId, newType) => {
  setRpgEquipments(prev => prev.map(item => 
    item.id === itemId ? { ...item, type: newType } : item
  ));
};


  return (
    <View style={styles.container}>
      {/* Header Fixo */}
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


 <View style={styles.mainContent}>


      {activeView === 'red' && <View style={styles.redView}> 

          <View style={{flexDirection: 'row', width: '90%', top: 10}}>
            <View style={{justifyContent: 'space-around', marginRight: 10, marginLeft: 10}}>
              <Text>Vida:</Text>
              <Text>Mental:</Text>
              <Text>Energia:</Text>
            </View>
            
            <View style={{flex: 1, paddingHorizontal: -7}}>
              <View style={styles.containerBackground}>
                <View style={styles.subtractAndAdditionbox}>
                  <Ionicons name="remove-outline" size={40} color="#fff" />
                </View>   
                <View style={styles.lifeBackground}>  
                  <View style={styles.boxT}></View>
                  <View style={styles.boxT}></View>     
                </View>
                <View style={styles.subtractAndAdditionbox}>
                  <Ionicons name="add-outline" size={40} color="#fff" />
                </View>
              </View>
              
              <View style={styles.containerBackground}>
                <View style={styles.subtractAndAdditionbox}>
                  <Ionicons name="remove-outline" size={40} color="#fff" />
                </View>   
                <View style={styles.lifeBackground}>  
                  <View style={styles.boxT}></View>
                  <View style={styles.boxT}></View>     
                </View>
                <View style={styles.subtractAndAdditionbox}>
                  <Ionicons name="add-outline" size={40} color="#fff" />
                </View>
              </View>
              
              <View style={styles.containerBackground}>
                <View style={styles.subtractAndAdditionbox}>
                  <Ionicons name="remove-outline" size={40} color="#fff" />
                </View>   
                <View style={styles.lifeBackground}>  
                  <View style={styles.boxT}></View>
                  <View style={styles.boxT}></View>     
                </View>
                <View style={styles.subtractAndAdditionbox}>
                  <Ionicons name="add-outline" size={40} color="#fff" />
                </View>
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
               {/* CA | Carga | Movimento */}

          <View style={styles.creditBackground}>       <Text>Crédito</Text> </View>

          {/* Credito centralizado com text imput do lado */}

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

      {activeView === 'green' && <ScrollView 
            style={styles.greenView}
            contentContainerStyle={styles.scrollContent}
          >
            <Text style={styles.skillTitle}>Habilidades</Text>
            <View style={styles.skillContainer}>
              <View style={styles.skillBackground}>
                <Text style={styles.skillText}>Acalmar</Text>
                <TouchableOpacity style={styles.skillTouchable}>
                  <Ionicons name="remove-outline" size={40} color="#fff" />
                </TouchableOpacity> 
                <TextInput 
                  style={styles.skillInput}
                  placeholderTextColor="#ccc"
                />
                <TouchableOpacity style={styles.skillTouchable}>
                  <Ionicons name="add-outline" size={40} color="#fff" />
                </TouchableOpacity>  
              </View>
            </View>

            <View style={styles.skillContainer}>
              <View style={styles.skillBackground}>
                <Text style={styles.skillText}>Acrobacia</Text>
                <TouchableOpacity style={styles.skillTouchable}>
                  <Ionicons name="remove-outline" size={40} color="#fff" />
                </TouchableOpacity> 
                <TextInput 
                  style={styles.skillInput}
                  
                  placeholderTextColor="#ccc"
                />
                <TouchableOpacity style={styles.skillTouchable}>
                  <Ionicons name="add-outline" size={40} color="#fff" />
                </TouchableOpacity>  
              </View>
            </View>
            <View style={styles.skillContainer}>
              <View style={styles.skillBackground}>
                <Text style={styles.skillText}>Atletismo</Text>
                <TouchableOpacity style={styles.skillTouchable}>
                  <Ionicons name="remove-outline" size={40} color="#fff" />
                </TouchableOpacity> 
                <TextInput 
                  style={styles.skillInput}
                  placeholderTextColor="#ccc"
                />
                <TouchableOpacity style={styles.skillTouchable}>
                  <Ionicons name="add-outline" size={40} color="#fff" />
                </TouchableOpacity>  
              </View>
            </View>

            <View style={styles.skillContainer}>
              <View style={styles.skillBackground}>
                <Text style={styles.skillText}>Atualidades</Text>
                <TouchableOpacity style={styles.skillTouchable}>
                  <Ionicons name="remove-outline" size={40} color="#fff" />
                </TouchableOpacity> 
                <TextInput 
                  style={styles.skillInput}
                  placeholderTextColor="#ccc"
                />
                <TouchableOpacity style={styles.skillTouchable}>
                  <Ionicons name="add-outline" size={40} color="#fff" />
                </TouchableOpacity>  
              </View>
            </View>

            <View style={styles.skillContainer}>
              <View style={styles.skillBackground}>
                <Text style={styles.skillText}>Análise</Text>
                <TouchableOpacity style={styles.skillTouchable}>
                  <Ionicons name="remove-outline" size={40} color="#fff" />
                </TouchableOpacity> 
                <TextInput 
                  style={styles.skillInput}
                  placeholderTextColor="#ccc"
                />
                <TouchableOpacity style={styles.skillTouchable}>
                  <Ionicons name="add-outline" size={40} color="#fff" />
                </TouchableOpacity>  
              </View>
            </View>

            <View style={styles.skillContainer}>
              <View style={styles.skillBackground}>
                <Text style={styles.skillText}>Charme</Text>
                <TouchableOpacity style={styles.skillTouchable}>
                  <Ionicons name="remove-outline" size={40} color="#fff" />
                </TouchableOpacity> 
                <TextInput 
                  style={styles.skillInput}
                  placeholderTextColor="#ccc"
                />
                <TouchableOpacity style={styles.skillTouchable}>
                  <Ionicons name="add-outline" size={40} color="#fff" />
                </TouchableOpacity>  
              </View>
            </View>

            <View style={styles.skillContainer}>
              <View style={styles.skillBackground}>
                <Text style={styles.skillText}>Eletronicos</Text>
                <TouchableOpacity style={styles.skillTouchable}>
                  <Ionicons name="remove-outline" size={40} color="#fff" />
                </TouchableOpacity> 
                <TextInput 
                  style={styles.skillInput}
                  placeholderTextColor="#ccc"
                />
                <TouchableOpacity style={styles.skillTouchable}>
                  <Ionicons name="add-outline" size={40} color="#fff" />
                </TouchableOpacity>  
              </View>
            </View>

            <View style={styles.skillContainer}>
              <View style={styles.skillBackground}>
                <Text style={styles.skillText}>Enganar</Text>
                <TouchableOpacity style={styles.skillTouchable}>
                  <Ionicons name="remove-outline" size={40} color="#fff" />
                </TouchableOpacity> 
                <TextInput 
                  style={styles.skillInput}
                  placeholderTextColor="#ccc"
                />
                <TouchableOpacity style={styles.skillTouchable}>
                  <Ionicons name="add-outline" size={40} color="#fff" />
                </TouchableOpacity>  
              </View>
            </View>

            <View style={styles.skillContainer}>
              <View style={styles.skillBackground}>
                <Text style={styles.skillText}>Furtividade</Text>
                <TouchableOpacity style={styles.skillTouchable}>
                  <Ionicons name="remove-outline" size={40} color="#fff" />
                </TouchableOpacity> 
                <TextInput 
                  style={styles.skillInput}
                  placeholderTextColor="#ccc"
                />
                <TouchableOpacity style={styles.skillTouchable}>
                  <Ionicons name="add-outline" size={40} color="#fff" />
                </TouchableOpacity>  
              </View>
            </View>

            <View style={styles.skillContainer}>
              <View style={styles.skillBackground}>
                <Text style={styles.skillText}>Informática</Text>
                <TouchableOpacity style={styles.skillTouchable}>
                  <Ionicons name="remove-outline" size={40} color="#fff" />
                </TouchableOpacity> 
                <TextInput 
                  style={styles.skillInput}
                  placeholderTextColor="#ccc"
                />
                <TouchableOpacity style={styles.skillTouchable}>
                  <Ionicons name="add-outline" size={40} color="#fff" />
                </TouchableOpacity>  
              </View>
            </View>

            <View style={styles.skillContainer}>
              <View style={styles.skillBackground}>
                <Text style={styles.skillText}>Iniciativa</Text>
                <TouchableOpacity style={styles.skillTouchable}>
                  <Ionicons name="remove-outline" size={40} color="#fff" />
                </TouchableOpacity> 
                <TextInput 
                  style={styles.skillInput}
                  placeholderTextColor="#ccc"
                />
                <TouchableOpacity style={styles.skillTouchable}>
                  <Ionicons name="add-outline" size={40} color="#fff" />
                </TouchableOpacity>  
              </View>
            </View>

            <View style={styles.skillContainer}>
              <View style={styles.skillBackground}>
                <Text style={styles.skillText}>Intimidação</Text>
                <TouchableOpacity style={styles.skillTouchable}>
                  <Ionicons name="remove-outline" size={40} color="#fff" />
                </TouchableOpacity> 
                <TextInput 
                  style={styles.skillInput}
                  placeholderTextColor="#ccc"
                />
                <TouchableOpacity style={styles.skillTouchable}>
                  <Ionicons name="add-outline" size={40} color="#fff" />
                </TouchableOpacity>  
              </View>
            </View>

            <View style={styles.skillContainer}>
              <View style={styles.skillBackground}>
                <Text style={styles.skillText}>Intuição</Text>
                <TouchableOpacity style={styles.skillTouchable}>
                  <Ionicons name="remove-outline" size={40} color="#fff" />
                </TouchableOpacity> 
                <TextInput 
                  style={styles.skillInput}
                  placeholderTextColor="#ccc"
                />
                <TouchableOpacity style={styles.skillTouchable}>
                  <Ionicons name="add-outline" size={40} color="#fff" />
                </TouchableOpacity>  
              </View>
            </View>

            <View style={styles.skillContainer}>
              <View style={styles.skillBackground}>
                <Text style={styles.skillText}>Medicina</Text>
                <TouchableOpacity style={styles.skillTouchable}>
                  <Ionicons name="remove-outline" size={40} color="#fff" />
                </TouchableOpacity> 
                <TextInput 
                  style={styles.skillInput}
                  placeholderTextColor="#ccc"
                />
                <TouchableOpacity style={styles.skillTouchable}>
                  <Ionicons name="add-outline" size={40} color="#fff" />
                </TouchableOpacity>  
              </View>
            </View>

            <View style={styles.skillContainer}>
              <View style={styles.skillBackground}>
                <Text style={styles.skillText}>Mecânica</Text>
                <TouchableOpacity style={styles.skillTouchable}>
                  <Ionicons name="remove-outline" size={40} color="#fff" />
                </TouchableOpacity> 
                <TextInput 
                  style={styles.skillInput}
                  placeholderTextColor="#ccc"
                />
                <TouchableOpacity style={styles.skillTouchable}>
                  <Ionicons name="add-outline" size={40} color="#fff" />
                </TouchableOpacity>  
              </View>
            </View>

            <View style={styles.skillContainer}>
              <View style={styles.skillBackground}>
                <Text style={styles.skillText}>Persuasão</Text>
                <TouchableOpacity style={styles.skillTouchable}>
                  <Ionicons name="remove-outline" size={40} color="#fff" />
                </TouchableOpacity> 
                <TextInput 
                  style={styles.skillInput}
                  placeholderTextColor="#ccc"
                />
                <TouchableOpacity style={styles.skillTouchable}>
                  <Ionicons name="add-outline" size={40} color="#fff" />
                </TouchableOpacity>  
              </View>
            </View>

            <View style={styles.skillContainer}>
              <View style={styles.skillBackground}>
                <Text style={styles.skillText}>Primeiros-Socorros</Text>
                <TouchableOpacity style={styles.skillTouchable}>
                  <Ionicons name="remove-outline" size={40} color="#fff" />
                </TouchableOpacity> 
                <TextInput 
                  style={styles.skillInput}
                  placeholderTextColor="#ccc"
                />
                <TouchableOpacity style={styles.skillTouchable}>
                  <Ionicons name="add-outline" size={40} color="#fff" />
                </TouchableOpacity>  
              </View>
            </View>

            <View style={styles.skillContainer}>
              <View style={styles.skillBackground}>
                <Text style={styles.skillText}>Procurar</Text>
                <TouchableOpacity style={styles.skillTouchable}>
                  <Ionicons name="remove-outline" size={40} color="#fff" />
                </TouchableOpacity> 
                <TextInput 
                  style={styles.skillInput}
                  placeholderTextColor="#ccc"
                />
                <TouchableOpacity style={styles.skillTouchable}>
                  <Ionicons name="add-outline" size={40} color="#fff" />
                </TouchableOpacity>  
              </View>
            </View>


            
          </ScrollView>}


      {activeView === 'blue' && <View style={styles.blueView} >
     
          {/* Título da Seção */}
          <Text style={styles.sectionTitle}>Inventário de Equipamentos</Text>
          
          {/* Tabela de Equipamentos */}
          <View style={styles.tableContainer}>
            {/* Cabeçalho da Tabela */}
            <View style={styles.tableHeader}>
              <Text style={[styles.headerText, styles.headerName]}>Nome do Item</Text>
              <Text style={[styles.headerText, styles.headerType]}>Tipo</Text>
              <Text style={[styles.headerText, styles.headerPrice]}>Valor</Text>
              <View style={[styles.headerText, styles.headerActions]} />
            </View>

            {/* Linhas da Tabela */}
            <ScrollView style={styles.tableBody}>
              {rpgEquipments.map((item, index) => (
                <TouchableOpacity 
                  key={item.id} 
                  style={styles.tableRow}
                  onPress={() => setSelectedItem(item)}
                >
                  {/* Nome do Item */}
                  <Text style={[styles.cellText, styles.cellName]}>{item.name}</Text>
                  
                  {/* Combobox de Tipo */}
                  <View style={styles.cellType}>
                    <Picker
                      selectedValue={item.type}
                      style={styles.picker}
                      onValueChange={(itemValue) => handleTypeChange(item.id, itemValue)}
                      dropdownIconColor="#8B4513"
                    >
                      <Picker.Item label="Arma" value="arma" />
                      <Picker.Item label="Armadura" value="armadura" />
                      <Picker.Item label="Escudo" value="escudo" />
                      <Picker.Item label="Tesouro" value="tesouro" />
                      <Picker.Item label="Poção" value="pocao" />
                      <Picker.Item label="Amuleto" value="amuleto" />
                      <Picker.Item label="Anel" value="anel" />
                      <Picker.Item label="Consumível" value="consumivel" />
                    </Picker>
                  </View>

                  {/* Preço em Ouro */}
                  <Text style={[styles.cellText, styles.cellPrice]}>
                    {item.price} <Text style={styles.goldText}></Text>
                  </Text>

                  {/* Ícone de Informações */}
                  <View style={styles.cellActions}>
                    <Ionicons name="information-circle-outline" size={24} color="#8B4513" />
                  </View>
                </TouchableOpacity>
              ))}
            </ScrollView>
          </View>

          {/* Modal de Descrição */}
          <Modal
            visible={!!selectedItem}
            animationType="fade"
            transparent={true}
            onRequestClose={() => setSelectedItem(null)}
          >
            <View style={styles.modalOverlay}>
              <View style={styles.modalContainer}>
                {selectedItem && (
                  <>
                    {/* Cabeçalho do Modal */}
                    <View style={styles.modalHeader}>
                      <Text style={styles.modalTitle}>{selectedItem.name}</Text>
                      <Text style={styles.modalType}>{selectedItem.type}</Text>
                    </View>

                    {/* Informações do Item */}
                    <View style={styles.modalContent}>
                      <View style={styles.modalInfoRow}>
                        <Text style={styles.modalLabel}>Valor:</Text>
                        <Text style={styles.modalValue}>
                          {selectedItem.price} <Text style={styles.goldText}>peças de ouro</Text>
                        </Text>
                      </View>

                      <View style={styles.modalInfoRow}>
                        <Text style={styles.modalLabel}>Raridade:</Text>
                        <Text style={[styles.modalValue, styles[selectedItem.rarity]]}>
                          {selectedItem.rarity}
                        </Text>
                      </View>

                      {selectedItem.bonus && (
                        <View style={styles.modalInfoRow}>
                          <Text style={styles.modalLabel}>Bônus:</Text>
                          <Text style={styles.modalBonus}>+{selectedItem.bonus}</Text>
                        </View>
                      )}

                      {/* Descrição */}
                      <View style={styles.descriptionContainer}>
                        <Text style={styles.modalLabel}>Descrição:</Text>
                        <Text style={styles.modalDescription}>
                          {selectedItem.description}
                        </Text>
                      </View>
                    </View>

                    {/* Botão de Fechar */}
                    <TouchableOpacity 
                      style={styles.modalCloseButton}
                      onPress={() => setSelectedItem(null)}
                    >
                      <Text style={styles.modalCloseText}>Fechar</Text>
                    </TouchableOpacity>
                  </>
                )}
              </View>
            </View>
          </Modal>
        </View>}
      {activeView === 'pink' && <View style={styles.pinkView} >
          <Text>Olho</Text>
          <Text>Cabelo</Text>        
          <Text>Aparencia</Text> 
          <Text>Tamanho</Text> 
          <Text>Biografia</Text>
        </View>}
        </View>
    </View>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
   mainContent: {
    flex: 1,
    marginTop: 290, // Ajuste esta altura conforme necessário
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

  //azul

  //

  // Estilos
blueView: {
  flex: 1,
  padding: 15,
  backgroundColor: '#1a1a1a',
},
sectionTitle: {
  fontSize: 24,
  fontWeight: 'bold',
  color: '#FFD700',
  textAlign: 'center',
  marginBottom: 20,
  fontFamily: 'System',
  textShadowColor: '#8B4513',
  textShadowOffset: { width: 1, height: 1 },
  textShadowRadius: 2,
},
tableContainer: {
  flex: 1,
  backgroundColor: '#2c2c2c',
  borderRadius: 12,
  overflow: 'hidden',
  borderWidth: 2,
  borderColor: '#8B4513',
},
tableHeader: {
  flexDirection: 'row',
  backgroundColor: '#8B4513',
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
headerType: { flex: 2 },
headerPrice: { flex: 1 },
headerActions: { flex: 0.5 },
tableBody: {
  flex: 1,
},
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
cellType: { 
  flex: 2,
  justifyContent: 'center',
},
cellPrice: { 
  flex: 1, 
  fontWeight: 'bold',
  color: '#FFD700',
},
cellActions: {
  flex: 0.5,
  alignItems: 'center',
  justifyContent: 'center',
},
picker: {
  height: 30,
  width: '100%',
  backgroundColor: '#444',
  color: '#ffffffff',
  borderRadius: 6,
  borderWidth: 1,
  borderColor: '#8B4513',
},
goldText: {
  color: '#FFD700',
  fontWeight: 'bold',
},
modalOverlay: {
  flex: 1,
  backgroundColor: 'rgba(0, 0, 0, 0.8)',
  justifyContent: 'center',
  alignItems: 'center',
  padding: 20,
},
modalContainer: {
  backgroundColor: '#2c2c2c',
  padding: 25,
  borderRadius: 15,
  width: '90%',
  maxHeight: '80%',
  borderWidth: 3,
  borderColor: '#8B4513',
},
modalHeader: {
  borderBottomWidth: 2,
  borderBottomColor: '#8B4513',
  paddingBottom: 15,
  marginBottom: 20,
},
modalTitle: {
  fontSize: 22,
  fontWeight: 'bold',
  color: '#FFD700',
  textAlign: 'center',
  marginBottom: 5,
},
modalType: {
  fontSize: 16,
  color: '#8B4513',
  textAlign: 'center',
  textTransform: 'capitalize',
  fontStyle: 'italic',
},
modalContent: {
  flex: 1,
},
modalInfoRow: {
  flexDirection: 'row',
  justifyContent: 'space-between',
  alignItems: 'center',
  marginBottom: 12,
  padding: 8,
  backgroundColor: '#333',
  borderRadius: 6,
},
modalLabel: {
  color: '#8B4513',
  fontWeight: 'bold',
  fontSize: 14,
},
modalValue: {
  color: '#FFF',
  fontSize: 14,
  fontWeight: '600',
},
modalBonus: {
  color: '#00FF00',
  fontWeight: 'bold',
  fontSize: 16,
},
comum: { color: '#FFFFFF' },
raro: { color: '#0070DD' },
épico: { color: '#A335EE' },
lendario: { color: '#FF8000' },
descriptionContainer: {
  marginTop: 20,
  padding: 12,
  backgroundColor: '#333',
  borderRadius: 8,
  borderLeftWidth: 4,
  borderLeftColor: '#8B4513',
},
modalDescription: {
  color: '#CCC',
  fontSize: 14,
  lineHeight: 20,
  fontStyle: 'italic',
  marginTop: 8,
},
modalCloseButton: {
  backgroundColor: '#8B4513',
  padding: 15,
  borderRadius: 8,
  alignItems: 'center',
  marginTop: 25,
  borderWidth: 1,
  borderColor: '#FFD700',
},
modalCloseText: {
  color: '#FFD700',
  fontWeight: 'bold',
  fontSize: 16,
},

  ///

  ///



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

  //skill
  
  skillTitle: {
  textAlign: 'center',
  fontSize:30,
  top: 2,
  fontWeight: 'bold'
  },
  skillContainer: {
    width: '95%',
    alignSelf: 'center',
    marginTop: 10,
    marginBottom: 15,
  },
  skillBackground: {
    width: '100%',
    backgroundColor: '#f8f8f8',
    borderColor: '#e0e0e0',
    borderWidth: 1,
    borderRadius: 12,
    padding: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 10, 
  },
  skillText: {
    color: '#333',
    fontWeight: 'bold',
    fontSize: 18,
    flex:5,
    textAlign: 'center'
  },
  skillTouchable: {
    backgroundColor: '#9c9c9cff',
    height: 40,
    width: 40,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  skillInput: {
    backgroundColor: '#9c9c9cff',
    height: 40,
    flex: 1,
    borderRadius: 8,
    paddingHorizontal: 10,
    width: 10,
    color: '#ffffffff',
    fontSize: 18,
    textAlign: 'center',
    fontWeight: 'bold'
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