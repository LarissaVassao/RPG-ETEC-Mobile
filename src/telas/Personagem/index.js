import React, { useState } from 'react';
import { View, StyleSheet, Image, Text, TextInput, StatusBar, TouchableOpacity, ScrollView, Modal} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function Personagem({ navigation }) {
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

      <View style={styles.mainContent}>

        {activeView === 'red' && 
        <View style={styles.redView}>
          <Text style={styles.viewTitle}>Atributos do Personagem</Text>  
            <ScrollView contentContainerStyle={styles.redScrollContent}>

              <View style={styles.resourcesContainer}>
                <View style={styles.resourceRow}>
                  <Text style={styles.resourceLabel}>Vida:</Text>
                  <View style={styles.resourceControl}>
                    <TouchableOpacity style={styles.resourceButton}>
                      <Ionicons name="remove-outline" size={24} color="#FFF" />
                    </TouchableOpacity>
                    <TextInput
                      style={styles.resourceInput}
                      placeholder="100/100"
                      placeholderTextColor="#FFD700"
                      defaultValue="100/100"
                    />
                    <TouchableOpacity style={styles.resourceButton}>
                      <Ionicons name="add-outline" size={24} color="#FFF" />
                    </TouchableOpacity>
                  </View>
                </View>

                <View style={styles.resourceRow}>
                  <Text style={styles.resourceLabel}>Mental:</Text>
                  <View style={styles.resourceControl}>
                    <TouchableOpacity style={styles.resourceButton}>
                      <Ionicons name="remove-outline" size={24} color="#FFF" />
                    </TouchableOpacity>
                    <TextInput
                      style={styles.resourceInput}
                      placeholder="50/50"
                      placeholderTextColor="#FFD700"
                      defaultValue="50/50"
                    />
                    <TouchableOpacity style={styles.resourceButton}>
                      <Ionicons name="add-outline" size={24} color="#FFF" />
                    </TouchableOpacity>
                  </View>
                </View>

                <View style={styles.resourceRow}>
                  <Text style={styles.resourceLabel}>Energia:</Text>
                  <View style={styles.resourceControl}>
                    <TouchableOpacity style={styles.resourceButton}>
                      <Ionicons name="remove-outline" size={24} color="#FFF" />
                    </TouchableOpacity>
                    <TextInput
                      style={styles.resourceInput}
                      placeholder="80/80"
                      placeholderTextColor="#FFD700"
                      defaultValue="80/80"
                    />
                    <TouchableOpacity style={styles.resourceButton}>
                      <Ionicons name="add-outline" size={24} color="#FFF" />
                    </TouchableOpacity>
                  </View>
                </View>
              </View>

              <View style={styles.statsRow}>
                <View style={styles.statContainer}>
                  <TextInput
                    style={styles.statInput}
                    placeholder="10"
                    placeholderTextColor="#FFD700"
                    keyboardType="numeric"
                  />
                  <Text style={styles.statLabel}>CA</Text>
                </View>

                <View style={styles.statContainer}>
                  <TextInput
                    style={styles.statInput}
                    placeholder="50"
                    placeholderTextColor="#FFD700"
                    keyboardType="numeric"
                  />
                  <Text style={styles.statLabel}>Carga</Text>
                </View>

                <View style={styles.statContainer}>
                  <TextInput
                    style={styles.statInput}
                    placeholder="9m"
                    placeholderTextColor="#FFD700"
                  />
                  <Text style={styles.statLabel}>Movimento</Text>
                </View>
              </View>

              <View style={styles.creditContainer}>
                <Text style={styles.creditLabel}>Créditos:</Text>
                <TextInput
                  style={styles.creditInput}
                  placeholder="1000"
                  placeholderTextColor="#FFD700"
                  keyboardType="numeric"
                />
              </View>

              <View style={styles.attributesGrid}>
                <View style={styles.attributeRow}>
                  <View style={styles.attributeItem}>
                    <TextInput
                      style={styles.attributeInput}
                      placeholder="10"
                      placeholderTextColor="#FFD700"
                      keyboardType="numeric"
                    />
                    <Text style={styles.attributeLabel}>Força</Text>
                  </View>

                  <View style={styles.attributeItem}>
                    <TextInput
                      style={styles.attributeInput}
                      placeholder="12"
                      placeholderTextColor="#FFD700"
                      keyboardType="numeric"
                    />
                    <Text style={styles.attributeLabel}>Agilidade</Text>
                  </View>

                  <View style={styles.attributeItem}>
                    <TextInput
                      style={styles.attributeInput}
                      placeholder="14"
                      placeholderTextColor="#FFD700"
                      keyboardType="numeric"
                    />
                    <Text style={styles.attributeLabel}>Constituição</Text>
                  </View>
                </View>

          <View style={styles.attributeRow}>
            <View style={styles.attributeItem}>
              <TextInput
                style={styles.attributeInput}
                placeholder="8"
                placeholderTextColor="#FFD700"
                keyboardType="numeric"
              />
              <Text style={styles.attributeLabel}>Vontade</Text>
            </View>

            <View style={styles.attributeItem}>
              <TextInput
                style={styles.attributeInput}
                placeholder="16"
                placeholderTextColor="#FFD700"
                keyboardType="numeric"
              />
              <Text style={styles.attributeLabel}>Inteligência</Text>
            </View>

            <View style={styles.attributeItem}>
              <TextInput
                style={styles.attributeInput}
                placeholder="14"
                placeholderTextColor="#FFD700"
                keyboardType="numeric"
              />
              <Text style={styles.attributeLabel}>Percepção</Text>
            </View>
          </View>

          <View style={styles.luckRow}>
            <View style={styles.luckContainer}>
              <TextInput
                style={styles.luckInput}
                placeholder="18"
                placeholderTextColor="#FFD700"
                keyboardType="numeric"
              />
              <Text style={styles.luckLabel}>Sorte</Text>
            </View>
          </View>

              </View>
            </ScrollView>
        </View>}

        {activeView === 'green' && (
            <View style={styles.greenView}>
              <Text style={styles.viewTitle}>Habilidades</Text>
              <ScrollView contentContainerStyle={styles.scrollContent}>
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


                      
            </ScrollView>
            </View>
        )}
          
        {activeView === 'blue' && 
          <View style={styles.blueView}>
            <Text style={styles.viewTitle}>Inventário de Equipamentos</Text>              
              <View style={styles.tableContainer}>
                <View style={styles.tableHeader}>
                  <Text style={[styles.headerText, styles.headerName]}>Nome do Item</Text>
                  <Text style={[styles.headerText, styles.headerPrice]}>Valor</Text>
                  <Text style={[styles.headerText, styles.headerWeight]}>Peso</Text>
                  <View style={[styles.headerText, styles.headerActions]} />
                </View>

                <ScrollView style={styles.tableBody}>
                  {rpgEquipments.map((item) => (
                    <TouchableOpacity 
                      key={item.id} 
                      style={styles.tableRow}
                      onPress={() => setSelectedItem(item)}
                    >
                      <Text style={[styles.cellText, styles.cellName]}>{item.name}</Text>

                      <Text style={[styles.cellText, styles.cellPrice]}>
                        {item.price} <Text style={styles.credit}>cr</Text>
                      </Text>

                      <Text style={[styles.cellText, styles.cellWeight]}>
                        {item.weight || 0} <Text style={styles.credit}>kg</Text>
                      </Text>

                      <View style={styles.cellActions}>
                        <TouchableOpacity onPress={() => setSelectedItem(item)}>
                          <Ionicons name="information-circle-outline" size={24} color="#FFD700" />
                        </TouchableOpacity>
                      </View>
                    </TouchableOpacity>
                  ))}
                </ScrollView>
              </View>

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

                    <View style={styles.modalHeader}>
                      <Text style={styles.modalTitle}>{selectedItem.name}</Text>
                      <Text style={styles.modalType}>{selectedItem.type}</Text>
                    </View>

                    <ScrollView 
                      style={styles.modalContentScroll}
                      contentContainerStyle={styles.modalContentContainer}
                    >
                      <View style={styles.modalInfoRow}>
                        <Text style={styles.modalLabel}>Valor:</Text>
                        <Text style={styles.modalValue}>
                          {selectedItem.price} <Text style={styles.credit}>céditos</Text>
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

                      <View style={styles.descriptionContainer}>
                        <Text style={styles.modalLabel}>Descrição:</Text>
                        <Text style={styles.modalDescription}>
                          {selectedItem.description}
                        </Text>
                      </View>
                    </ScrollView>

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


        {activeView === 'pink' && 
          <View style={styles.pinkView}>
            <Text style={styles.viewTitle}>Aparência do Personagem</Text>            
            <ScrollView contentContainerStyle={styles.appearanceContainer}>
              <View style={styles.appearanceItem}>
                <Text style={styles.appearanceLabel}>Cor dos Olhos:</Text>
                <TextInput
                  style={styles.appearanceInput}
                  placeholder="Ex: Azuis, Verdes, Castanhos..."
                  placeholderTextColor="#CCC"
                />
              </View>

              <View style={styles.appearanceItem}>
                <Text style={styles.appearanceLabel}>Estilo e Cor do Cabelo:</Text>
                <TextInput
                  style={styles.appearanceInput}
                  placeholder="Ex: Loiro longo, Negro curto..."
                  placeholderTextColor="#CCC"
                />
              </View>

              <View style={styles.appearanceItem}>
                <Text style={styles.appearanceLabel}>Características Físicas:</Text>
                <TextInput
                  style={styles.appearanceInput}
                  placeholder="Ex: Cicatriz no rosto, Tatuagens..."
                  placeholderTextColor="#CCC"
                  multiline={true}
                />
              </View>

              <View style={styles.appearanceItem}>
                <Text style={styles.appearanceLabel}>Altura:</Text>
                <TextInput
                  style={styles.appearanceInput}
                  placeholder="Ex: 1,80m."
                  placeholderTextColor="#CCC"
                />
              </View>

              <View style={styles.appearanceItem}>
                <Text style={styles.appearanceLabel}>Idade:</Text>
                <TextInput
                  style={styles.appearanceInput}
                  placeholder="Ex: 25 anos"
                  placeholderTextColor="#CCC"
                  keyboardType="numeric"
                />
              </View>

              <View style={styles.appearanceItem}>
                <Text style={styles.appearanceLabel}>Tom de Pele:</Text>
                <TextInput
                  style={styles.appearanceInput}
                  placeholder="Ex: Bronzeada, Pálida, Morena..."
                  placeholderTextColor="#CCC"
                />
              </View>

              <View style={styles.appearanceItem}>
                <Text style={styles.appearanceLabel}>Vestimentas e Acessórios:</Text>
                <TextInput
                  style={styles.appearanceInput}
                  placeholder="Ex: Armadura de couro, Capa vermelha..."
                  placeholderTextColor="#CCC"
                  multiline={true}
                />
              </View>

              <View style={styles.appearanceItem}>
                <Text style={styles.appearanceLabel}>Personalidade:</Text>
                <TextInput
                  style={[styles.appearanceInput, styles.bioInput]}
                  placeholder="Descreva a personalidade, maneirismos e traços característicos..."
                  placeholderTextColor="#CCC"
                  multiline={true}
                  numberOfLines={4}
                  textAlignVertical="top"
                />
              </View>

              <View style={styles.appearanceItem}>
                <Text style={styles.appearanceLabel}>Biografia e História:</Text>
                <TextInput
                  style={[styles.appearanceInput, styles.bioInput]}
                  placeholder="Conte a história do seu personagem, sua origem, motivações e objetivos..."
                  placeholderTextColor="#CCC"
                  multiline={true}
                  numberOfLines={6}
                  textAlignVertical="top"
                />
              </View>

            </ScrollView>
          </View>}
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
  
 skillTitle: {
  fontSize: 27,
  fontWeight: 'bold',
  color: '#FFD700',
  textAlign: 'center',
  marginTop: 10,
  marginBottom: 15,
  textShadowColor: '#251083ff',
  textShadowOffset: { width: 1, height: 1 },
  textShadowRadius: 2,
},

skillContainer: {
  marginBottom: 12,
  width: '95%',
  alignSelf: 'center'
},

skillBackground: {
  flexDirection: 'row',
  alignItems: 'center',
  justifyContent: 'space-between',
  backgroundColor: '#1F4E79',
  paddingVertical: 10,
  paddingHorizontal: 10,
  borderRadius: 8,
  borderWidth: 1,
  borderColor: '#FFD700',
},

skillText: {
  flex: 1,
  fontSize: 20,
  fontWeight: 'bold',
  color: '#FFD700',
},

skillTouchable: {
  padding: 2,
  backgroundColor: '#092534',
  borderRadius: 6,
  marginHorizontal: 5,
},

skillInput: {
  width: 50,
  height: 35,
  backgroundColor: '#FFF',
  borderRadius: 5,
  textAlign: 'center',
  fontWeight: 'bold',
  color: '#092534',
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
  appearanceTitle: {
    fontSize: 27,
    fontWeight: 'bold',
    color: '#FFD700',
    textAlign: 'center',
    marginBottom: 20,
    textShadowColor: '#000',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 2,
  },
  appearanceContainer: {
    paddingBottom: 30,
  },
  appearanceItem: {
    marginBottom: 15,
    backgroundColor: '#0A2D42',
    padding: 15,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#FFD700',
  },
  appearanceLabel: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#FFD700',
    marginBottom: 8,
  },
  appearanceInput: {
    backgroundColor: '#1E3A53',
    color: '#FFF',
    padding: 12,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#5683B9',
    fontSize: 14,
  },
  bioInput: {
    minHeight: 100,
    textAlignVertical: 'top',
  },

  redScrollContent: {
    paddingBottom: 30, 
  },
  redViewTitle: {
    fontSize: 27,
    fontWeight: 'bold',
    color: '#092534',
    textAlign: 'center',
    marginBottom: 20,
    textShadowColor: '#FFD700',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 2,
  },
  resourcesContainer: {
    backgroundColor: '#1E3A53',
    padding: 15,
    borderRadius: 10,
    marginBottom: 20,
    borderWidth: 2,
    borderColor: '#FFD700',
  },
  resourceRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
  },
  resourceLabel: {
    color: '#FFD700',
    fontWeight: 'bold',
    width: 80,
    fontSize: 16,
  },
  resourceControl: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  resourceButton: {
    backgroundColor: '#092534',
    padding: 8,
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
    minWidth: 40,
  },
  resourceInput: {
    flex: 1,
    color: '#FFD700',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
    backgroundColor: '#0A2D42',
    borderRadius: 8,
    padding: 10,
    marginHorizontal: 10,
    borderWidth: 1,
    borderColor: '#5683B9',
    minWidth: 100,
  },
  statsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  statContainer: {
    backgroundColor: '#1E3A53',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    flex: 1,
    marginHorizontal: 5,
    borderWidth: 2,
    borderColor: '#FFD700',
  },
  statInput: {
    color: '#FFD700',
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    backgroundColor: '#0A2D42',
    borderRadius: 8,
    padding: 5,
    minWidth: 60,
    borderWidth: 1,
    borderColor: '#5683B9',
  },
  statLabel: {
    color: '#FFD700',
    fontWeight: 'bold',
    marginTop: 5,
    fontSize: 14,
  },
  creditContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#1E3A53',
    padding: 15,
    borderRadius: 10,
    marginBottom: 20,
    borderWidth: 2,
    borderColor: '#FFD700',
  },
  creditLabel: {
    color: '#FFD700',
    fontWeight: 'bold',
    fontSize: 16,
    marginRight: 10,
  },
  creditInput: {
    flex: 1,
    color: '#FFD700',
    fontSize: 18,
    fontWeight: 'bold',
    backgroundColor: '#0A2D42',
    borderRadius: 8,
    padding: 10,
    borderWidth: 1,
    borderColor: '#5683B9',
    textAlign: 'center',
  },
  attributesGrid: {
    marginBottom: 20,
  },
  attributeRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  attributeItem: {
    backgroundColor: '#1E3A53',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    flex: 1,
    marginHorizontal: 5,
    borderWidth: 2,
    borderColor: '#FFD700',
  },
  attributeInput: {
    color: '#FFD700',
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    backgroundColor: '#0A2D42',
    borderRadius: 8,
    padding: 10,
    minWidth: 70,
    borderWidth: 1,
    borderColor: '#5683B9',
  },
  attributeLabel: {
    color: '#FFD700',
    fontWeight: 'bold',
    marginTop: 8,
    fontSize: 14,
    textAlign: 'center',
  },
 luckRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 20,
  },
  luckContainer: {
    backgroundColor: '#1E3A53',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    width: '50%', 
    borderWidth: 2,
    borderColor: '#FFD700',
  },
  luckInput: {
    color: '#FFD700',
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    backgroundColor: '#0A2D42',
    borderRadius: 8,
    padding: 10,
    minWidth: 70,
    borderWidth: 1,
    borderColor: '#5683B9',
  },
  luckLabel: {
    color: '#FFD700',
    fontWeight: 'bold',
    marginTop: 8,
    fontSize: 14,
    textAlign: 'center',
  },

});