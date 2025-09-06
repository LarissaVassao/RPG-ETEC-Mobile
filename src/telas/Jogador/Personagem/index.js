import React, { useState } from 'react';
import { View, StyleSheet, Image, Text, TextInput, StatusBar, TouchableOpacity, ScrollView, Modal} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Picker } from "@react-native-picker/picker";

export default function Personagem({ navigation }) {
  const [activeView, setActiveView] = useState('red'); 
  const [rpgEquipments, setRpgEquipments] = useState([
    {
      id: 1,
      name: "Espada Longa",
      type: "arma",
      price: 150,
      weight: 2.5,
      description: "Uma espada longa forjada em aço de alta qualidade. Ideal para combate corpo a corpo.",
    },
  ]);
  const [selectedItem, setSelectedItem] = useState(null);
  const [createModalVisible, setCreateModalVisible] = useState(false);
  const [newEquipment, setNewEquipment] = useState({
    name: '',
    type: 'item',
    description: '',
    requirement: '',
    damage: '',
    critical: '',
    price: 0, // Adicione este campo
    weight: 0  // Adicione este campo
  });
  
  // Estados para os modais de edição
  const [editModalVisible, setEditModalVisible] = useState(false);
  const [editingField, setEditingField] = useState('');
  const [currentValue, setCurrentValue] = useState('');
  const [tempValue, setTempValue] = useState('');
  
  // Estados para os valores dos atributos
  const [vida, setVida] = useState('10/10');
  const [mental, setMental] = useState('10/10');
  const [energia, setEnergia] = useState('10/10');
  const [ca, setCa] = useState('10');
  const [carga, setCarga] = useState('50');
  const [movimento, setMovimento] = useState('9m');
  const [creditos, setCreditos] = useState('1');
  const [forca, setForca] = useState('10');
  const [agilidade, setAgilidade] = useState('12');
  const [constituicao, setConstituicao] = useState('14');
  const [vontade, setVontade] = useState('8');
  const [inteligencia, setInteligencia] = useState('16');
  const [percepcao, setPercepcao] = useState('14');
  const [sorte, setSorte] = useState('18');

  // Estados para as habilidades
  const [habilidades, setHabilidades] = useState({
    acalmar: '1',
    acrobacia: '1',
    atletismo: '1',
    atualidades: '1',
    analise: '1',
    charme: '1',
    eletronicos: '1',
    enganar: '1',
    furtividade: '1',
    informatica: '1',
    iniciativa: '1',
    intimidacao: '1',
    intuicao: '1',
    medicina: '1',
    mecanica: '1',
    persuasao: '1',
    primeirosSocorros: '1',
    procurar: '1'
  });

  // Estados para o nome do personagem e modal
  const [characterName, setCharacterName] = useState('Nome do Personagem');
  const [tempCharacterName, setTempCharacterName] = useState('');
  const [editNameModalVisible, setEditNameModalVisible] = useState(false);

  const [editingEquipment, setEditingEquipment] = useState(null);
  const [editEquipmentModalVisible, setEditEquipmentModalVisible] = useState(false);

  const handleButtonPress = (color) => {
    setActiveView(color);
  };

  const handleTypeChange = (itemId, newType) => {
    setRpgEquipments(prev => prev.map(item => 
      item.id === itemId ? { ...item, type: newType } : item
    ));
  };

  const handleCreateEquipment = () => {
    if (!newEquipment.name.trim()) {
      alert('Por favor, digite um nome para o equipamento');
      return;
    }

    const newItem = {
      id: Math.max(...rpgEquipments.map(item => item.id), 0) + 1,
      name: newEquipment.name,
      type: newEquipment.type,
      price: newEquipment.price, // CORRIGIDO: estava 0
      weight: newEquipment.weight, // CORRIGIDO: estava 0
      description: newEquipment.description,
      requirement: newEquipment.requirement,
      damage: newEquipment.damage,
      critical: newEquipment.critical,
    };

    setRpgEquipments(prev => [...prev, newItem]);
    setNewEquipment({
      name: '',
      type: 'item',
      description: '',
      requirement: '',
      damage: '',
      critical: '',
      price: 0, // Mantém os valores padrão
     weight: 0  // Mantém os valores padrão
    });
    setCreateModalVisible(false);
  };

  // Função para abrir o modal de edição
  const openEditModal = (field, value) => {
    setEditingField(field);
    setCurrentValue(value);
    setTempValue(value);
    setEditModalVisible(true);
  };

  // Função para salvar a edição de habilidades
  const saveHabilidadeEdit = () => {
    setHabilidades(prev => ({
      ...prev,
      [editingField]: tempValue
    }));
    setEditModalVisible(false);
  };

  // Função para salvar a edição
  const saveEdit = () => {
    if (editingField in habilidades) {
      saveHabilidadeEdit();
    } else {
      switch (editingField) {
        case 'vida': setVida(tempValue); break;
        case 'mental': setMental(tempValue); break;
        case 'energia': setEnergia(tempValue); break;
        case 'ca': setCa(tempValue); break;
        case 'carga': setCarga(tempValue); break;
        case 'movimento': setMovimento(tempValue); break;
        case 'creditos': setCreditos(tempValue); break;
        case 'forca': setForca(tempValue); break;
        case 'agilidade': setAgilidade(tempValue); break;
        case 'constituicao': setConstituicao(tempValue); break;
        case 'vontade': setVontade(tempValue); break;
        case 'inteligencia': setInteligencia(tempValue); break;
        case 'percepcao': setPercepcao(tempValue); break;
        case 'sorte': setSorte(tempValue); break;
        default: break;
      }
      setEditModalVisible(false);
    }
  };

  // Função para cancelar a edição
  const cancelEdit = () => {
    setTempValue(currentValue);
    setEditModalVisible(false);
  };
  const handleEditEquipment = (item) => {
  setEditingEquipment(item);
  setEditEquipmentModalVisible(true);
};

const handleDeleteEquipment = (itemId) => {
  setRpgEquipments(prev => prev.filter(item => item.id !== itemId));
};

const handleUpdateEquipment = () => {
  if (!editingEquipment.name.trim()) {
    alert('Por favor, digite um nome para o equipamento');
    return;
  }

  setRpgEquipments(prev => prev.map(item => 
    item.id === editingEquipment.id ? editingEquipment : item
  ));
  
  setEditEquipmentModalVisible(false);
  setEditingEquipment(null);
};
// Função para abrir o modal de edição do nome
const openNameEditModal = () => {
  setTempCharacterName(characterName);
  setEditNameModalVisible(true);
};

// Função para salvar o nome do personagem
const saveCharacterName = () => {
  if (tempCharacterName.trim()) {
    setCharacterName(tempCharacterName);
  }
  setEditNameModalVisible(false);
};

// Função para cancelar a edição do nome
const cancelNameEdit = () => {
  setEditNameModalVisible(false);
};
const [aparencia, setAparencia] = useState({
    corOlhos: '',
    estiloCabelo: '',
    caracteristicas: '',
    altura: '',
    idade: '',
    tomPele: '',
    vestimentas: '',
    personalidade: '',
    biografia: ''
  });

  // Estado para o modal de edição de aparência
  const [editAppearanceModalVisible, setEditAppearanceModalVisible] = useState(false);
  const [editingAppearanceField, setEditingAppearanceField] = useState('');
  const [tempAppearanceValue, setTempAppearanceValue] = useState('');

  // Função para abrir o modal de edição de aparência
  const openEditAppearanceModal = (field, value) => {
    setEditingAppearanceField(field);
    setTempAppearanceValue(value);
    setEditAppearanceModalVisible(true);
  };

  // Função para salvar a edição de aparência
  const saveAppearanceEdit = () => {
    setAparencia(prev => ({
      ...prev,
      [editingAppearanceField]: tempAppearanceValue
    }));
    setEditAppearanceModalVisible(false);
  };

  // Função para cancelar a edição de aparência
  const cancelAppearanceEdit = () => {
    setEditAppearanceModalVisible(false);
  };

  // Função para salvar todas as alterações de aparência
  const saveAllAppearanceChanges = () => {
    // Aqui você pode adicionar lógica para salvar no banco de dados ou API
    alert('Alterações de aparência salvas com sucesso!');
  };

  return (
    <View style={styles.container}>
      <StatusBar backgroundColor="#124A69" barStyle="light-content" />      

   <View style={styles.header}>
  <TouchableOpacity 
    style={styles.backButton}
    onPress={() => navigation.navigate("TelaCampanha")}
  >
    <Ionicons name="arrow-back" size={20} color="#fff" />
  </TouchableOpacity>
  
  <TouchableOpacity onPress={openNameEditModal}>
    <Text style={styles.headerTitle}>{characterName}</Text>
  </TouchableOpacity>
</View>
{/*  */}
      <Modal
        visible={editModalVisible}
        transparent={true}
        animationType="slide"
        onRequestClose={cancelEdit}
      >

       

        <View style={styles.modalOverlay}>
          <View style={styles.editModalContainer}>
            <Text style={styles.editModalTitle}>Editar {editingField}</Text>
            
            <TextInput
              style={styles.editModalInput}
              value={tempValue}
              onChangeText={setTempValue}
              placeholder="Digite aqui..."
              placeholderTextColor="#CCC"
            />
            
            <View style={styles.modalButtons}>
              <TouchableOpacity 
                style={[styles.modalButton, styles.cancelButton]}
                onPress={cancelEdit}
              >
                <Text style={styles.cancelButtonText}>Cancelar</Text>
              </TouchableOpacity>
              
              <TouchableOpacity 
                style={[styles.modalButton, styles.createButton]}
                onPress={saveEdit}
              >
                <Text style={styles.createButtonText}>Salvar</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
      <Modal
        visible={editAppearanceModalVisible}
        transparent={true}
        animationType="slide"
        onRequestClose={cancelAppearanceEdit}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.editModalContainer}>
            <Text style={styles.editModalTitle}>
              Editar {editingAppearanceField === 'corOlhos' ? 'Cor dos Olhos' :
                     editingAppearanceField === 'estiloCabelo' ? 'Estilo e Cor do Cabelo' :
                     editingAppearanceField === 'caracteristicas' ? 'Características Físicas' :
                     editingAppearanceField === 'altura' ? 'Altura' :
                     editingAppearanceField === 'idade' ? 'Idade' :
                     editingAppearanceField === 'tomPele' ? 'Tom de Pele' :
                     editingAppearanceField === 'vestimentas' ? 'Vestimentas e Acessórios' :
                     editingAppearanceField === 'personalidade' ? 'Personalidade' :
                     'Biografia e História'}
            </Text>
            
            <TextInput
        style={[
          styles.editModalInput,
          (editingAppearanceField === 'personalidade' || 
          editingAppearanceField === 'vestimentas' || 
          editingAppearanceField === 'caracteristicas' || 
          editingAppearanceField === 'biografia') && 
          styles.bioModalInput
        ]}
        value={tempAppearanceValue}
        onChangeText={setTempAppearanceValue}
        placeholder="Digite aqui..."
        placeholderTextColor="#CCC"
        multiline={editingAppearanceField === 'personalidade' || 
                  editingAppearanceField === 'vestimentas' || 
                  editingAppearanceField === 'caracteristicas' || 
                  editingAppearanceField === 'biografia'}
        numberOfLines={
          editingAppearanceField === 'personalidade' ? 6 : 
          editingAppearanceField === 'vestimentas' ? 5 : 
          editingAppearanceField === 'caracteristicas' ? 5 : 
          editingAppearanceField === 'biografia' ? 8 : 1
        }
        textAlignVertical="top"
      />
            
            <View style={styles.modalButtons}>
              <TouchableOpacity 
                style={[styles.modalButton, styles.cancelButton]}
                onPress={cancelAppearanceEdit}
              >
                <Text style={styles.cancelButtonText}>Cancelar</Text>
              </TouchableOpacity>
              
              <TouchableOpacity 
                style={[styles.modalButton, styles.createButton]}
                onPress={saveAppearanceEdit}
              >
                <Text style={styles.createButtonText}>Salvar</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
{/* Modal para editar nome do personagem */}
      <Modal
        visible={editNameModalVisible}
        transparent={true}
        animationType="slide"
        onRequestClose={cancelNameEdit}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.editNameModalContainer}>
            <Text style={styles.editModalTitle}>Editar Nome do Personagem</Text>
            
            <TextInput
              style={styles.editNameInput}
              value={tempCharacterName}
              onChangeText={setTempCharacterName}
              placeholder="Digite aqui..."
              placeholderTextColor="#CCC"
              maxLength={25}
            />
            
            <Text style={styles.charCounter}>
              {tempCharacterName.length}/25 caracteres
            </Text>
            
            <View style={styles.modalButtons}>
              <TouchableOpacity 
                style={[styles.modalButton, styles.cancelButton]}
                onPress={cancelNameEdit}
              >
                <Text style={styles.cancelButtonText}>Cancelar</Text>
              </TouchableOpacity>
              
              <TouchableOpacity 
                style={[styles.modalButton, styles.createButton]}
                onPress={saveCharacterName}
              >
                <Text style={styles.createButtonText}>Salvar</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal> 

      <View style={styles.characterBase}>
        <View style={styles.nameCharacter}>
          <TextInput 
            style={styles.name}
            placeholder="Nome do player"
            placeholderTextColor="#000"
          />
        </View>

        <View style={styles.ocupationCharacter}>
          <View style={styles.occupationItem}>
            <Text style={styles.occupationLabel}>Classe:</Text>
            <TextInput 
              style={styles.occupationInput}
              placeholder="Ex: Médico"
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
        source={require('../../../../assets/img/pessoa.png')}
        style={styles.imageStyle}
      />

      <View style={styles.buttonsContainer}>
        <TouchableOpacity 
          style={[styles.buttons, {backgroundColor: '#2188C0'}]} 
          onPress={() => handleButtonPress('red')}
        ><Ionicons name="cube" size={60} color="#e8ffff"/></TouchableOpacity>
        <TouchableOpacity 
          style={[styles.buttons, {backgroundColor: '#1E7CAE'}]} 
          onPress={() => handleButtonPress('green')}
        ><Ionicons name="construct" size={60} color='#e8ffff'/></TouchableOpacity>
        <TouchableOpacity 
          style={[styles.buttons, {backgroundColor: '#18638C'}]} 
          onPress={() => handleButtonPress('blue')}
        ><Ionicons name="bag" size={60} color="#e8ffff"/></TouchableOpacity>
        <TouchableOpacity 
          style={[styles.buttons, {backgroundColor: '#124A69'}]} 
          onPress={() => handleButtonPress('pink')}
        ><Ionicons name="accessibility" size={60} color='#e8ffff'/></TouchableOpacity>
      </View>

      <View style={styles.mainContent}>

        {activeView === 'red' && 
          <View style={styles.redView}>
            <Text style={styles.viewTitle}>ATRIBUTOS DO PERSONAGEM</Text>  
            <ScrollView contentContainerStyle={styles.redScrollContent}>
              <View style={styles.resourcesContainer}>
                <View style={styles.resourceRow}>
                  <Text style={styles.resourceLabel}>Vida:</Text>

                    <TouchableOpacity 
                      style={styles.resourceInputTouchable}
                      onPress={() => openEditModal('vida', vida)}
                    >
                      <Text style={styles.resourceInputText}>{vida}</Text>
                    </TouchableOpacity>
 
                </View>

                <View style={styles.resourceRow}>
                  <Text style={styles.resourceLabel}>Mental:</Text>
                    <TouchableOpacity 
                      style={styles.resourceInputTouchable}
                      onPress={() => openEditModal('mental', mental)}
                    >
                      <Text style={styles.resourceInputText}>{mental}</Text>
                    </TouchableOpacity>

                
                </View>

                <View style={styles.resourceRow}>
                  <Text style={styles.resourceLabel}>Energia:</Text>
                  <TouchableOpacity 
                      style={styles.resourceInputTouchable}
                      onPress={() => openEditModal('energia', energia)}
                    >
                      <Text style={styles.resourceInputText}>{energia}</Text>
                    </TouchableOpacity>
                 
                </View>
              </View>

              <View style={styles.statsRow}>
                <View style={styles.statContainer}>
                  <TouchableOpacity 
                    style={styles.statInputTouchable}
                    onPress={() => openEditModal('ca', ca)}
                  >
                    <Text style={styles.statInputText}>{ca}</Text>
                  </TouchableOpacity>
                  <Text style={styles.statLabel}>CA</Text>
                </View>

                <View style={styles.statContainer}>
                  <TouchableOpacity 
                    style={styles.statInputTouchable}
                    onPress={() => openEditModal('carga', carga)}
                  >
                    <Text style={styles.statInputText}>{carga}</Text>
                  </TouchableOpacity>
                  <Text style={styles.statLabel}>Carga</Text>
                </View>

                <View style={styles.statContainer}>
                  <TouchableOpacity 
                    style={styles.statInputTouchable}
                    onPress={() => openEditModal('movimento', movimento)}
                  >
                    <Text style={styles.statInputText}>{movimento}</Text>
                  </TouchableOpacity>
                  <Text style={styles.statLabel}>Movimento</Text>
                </View>
              </View>

              <View style={styles.creditContainer}>
                <Text style={styles.creditLabel}>Créditos:</Text>
                <TouchableOpacity 
                  style={styles.creditInputTouchable}
                  onPress={() => openEditModal('creditos', creditos)}
                >
                  <Text style={styles.creditInputText}>{creditos}</Text>
                </TouchableOpacity>
              </View>

              <View style={styles.attributesGrid}>
                <View style={styles.attributeRow}>
                  <View style={styles.attributeItem}>
                    <TouchableOpacity 
                      style={styles.attributeInputTouchable}
                      onPress={() => openEditModal('forca', forca)}
                    >
                      <Text style={styles.attributeInputText}>{forca}</Text>
                    </TouchableOpacity>
                    <Text style={styles.attributeLabel}>Força</Text>
                  </View>

                  <View style={styles.attributeItem}>
                    <TouchableOpacity 
                      style={styles.attributeInputTouchable}
                      onPress={() => openEditModal('agilidade', agilidade)}
                    >
                      <Text style={styles.attributeInputText}>{agilidade}</Text>
                    </TouchableOpacity>
                    <Text style={styles.attributeLabel}>Agilidade</Text>
                  </View>

                  <View style={styles.attributeItem}>
                    <TouchableOpacity 
                      style={styles.attributeInputTouchable}
                      onPress={() => openEditModal('constituicao', constituicao)}
                    >
                      <Text style={styles.attributeInputText}>{constituicao}</Text>
                    </TouchableOpacity>
                    <Text style={styles.attributeLabel}>Constituição</Text>
                  </View>
                </View>

                <View style={styles.attributeRow}>
                  <View style={styles.attributeItem}>
                    <TouchableOpacity 
                      style={styles.attributeInputTouchable}
                      onPress={() => openEditModal('vontade', vontade)}
                    >
                      <Text style={styles.attributeInputText}>{vontade}</Text>
                    </TouchableOpacity>
                    <Text style={styles.attributeLabel}>Vontade</Text>
                  </View>

                  <View style={styles.attributeItem}>
                    <TouchableOpacity 
                      style={styles.attributeInputTouchable}
                      onPress={() => openEditModal('inteligencia', inteligencia)}
                    >
                      <Text style={styles.attributeInputText}>{inteligencia}</Text>
                    </TouchableOpacity>
                    <Text style={styles.attributeLabel}>Inteligência</Text>
                  </View>

                  <View style={styles.attributeItem}>
                    <TouchableOpacity 
                      style={styles.attributeInputTouchable}
                      onPress={() => openEditModal('percepcao', percepcao)}
                    >
                      <Text style={styles.attributeInputText}>{percepcao}</Text>
                    </TouchableOpacity>
                    <Text style={styles.attributeLabel}>Percepção</Text>
                  </View>
                </View>

                <View style={styles.luckRow}>
                  <View style={styles.luckContainer}>
                    <TouchableOpacity 
                      style={styles.luckInputTouchable}
                      onPress={() => openEditModal('sorte', sorte)}
                    >
                      <Text style={styles.luckInputText}>{sorte}</Text>
                    </TouchableOpacity>
                    <Text style={styles.luckLabel}>Sorte</Text>
                  </View>
                </View>
              </View>
            </ScrollView>
          </View>
        }
        {activeView === 'green' && (
          <View style={styles.greenView}>
            <Text style={styles.viewTitle}>HABILIDADES</Text>
            <ScrollView contentContainerStyle={styles.scrollContent}>
              <View style={styles.skillContainer}>
                <View style={styles.skillBackground}>
                  <Text style={styles.skillText}>Acalmar</Text>
                  <TouchableOpacity 
                    style={styles.skillInputTouchable}
                    onPress={() => openEditModal('acalmar', habilidades.acalmar)}
                  >
                    <Text style={styles.skillInputText}>{habilidades.acalmar || '0'}</Text>
                  </TouchableOpacity>
                </View>
              </View>

              <View style={styles.skillContainer}>
                <View style={styles.skillBackground}>
                  <Text style={styles.skillText}>Acrobacia</Text>
                  <TouchableOpacity 
                    style={styles.skillInputTouchable}
                    onPress={() => openEditModal('acrobacia', habilidades.acrobacia)}
                  >
                    <Text style={styles.skillInputText}>{habilidades.acrobacia || '0'}</Text>
                  </TouchableOpacity>
                </View>
              </View>

              <View style={styles.skillContainer}>
                <View style={styles.skillBackground}>
                  <Text style={styles.skillText}>Atletismo</Text>
                  <TouchableOpacity 
                    style={styles.skillInputTouchable}
                    onPress={() => openEditModal('atletismo', habilidades.atletismo)}
                  >
                    <Text style={styles.skillInputText}>{habilidades.atletismo || '0'}</Text>
                  </TouchableOpacity>
                </View>
              </View>

              <View style={styles.skillContainer}>
                <View style={styles.skillBackground}>
                  <Text style={styles.skillText}>Atualidades</Text>
                  <TouchableOpacity 
                    style={styles.skillInputTouchable}
                    onPress={() => openEditModal('atualidades', habilidades.atualidades)}
                  >
                    <Text style={styles.skillInputText}>{habilidades.atualidades || '0'}</Text>
                  </TouchableOpacity>
                </View>
              </View>

              <View style={styles.skillContainer}>
                <View style={styles.skillBackground}>
                  <Text style={styles.skillText}>Análise</Text>
                  <TouchableOpacity 
                    style={styles.skillInputTouchable}
                    onPress={() => openEditModal('analise', habilidades.analise)}
                  >
                    <Text style={styles.skillInputText}>{habilidades.analise || '0'}</Text>
                  </TouchableOpacity>
                </View>
              </View>

              <View style={styles.skillContainer}>
                <View style={styles.skillBackground}>
                  <Text style={styles.skillText}>Charme</Text>
                  <TouchableOpacity 
                    style={styles.skillInputTouchable}
                    onPress={() => openEditModal('charme', habilidades.charme)}
                  >
                    <Text style={styles.skillInputText}>{habilidades.charme || '0'}</Text>
                  </TouchableOpacity>
                </View>
              </View>

              <View style={styles.skillContainer}>
                <View style={styles.skillBackground}>
                  <Text style={styles.skillText}>Eletronicos</Text>
                  <TouchableOpacity 
                    style={styles.skillInputTouchable}
                    onPress={() => openEditModal('eletronicos', habilidades.eletronicos)}
                  >
                    <Text style={styles.skillInputText}>{habilidades.eletronicos || '0'}</Text>
                  </TouchableOpacity>
                </View>
              </View>

              <View style={styles.skillContainer}>
                <View style={styles.skillBackground}>
                  <Text style={styles.skillText}>Enganar</Text>
                  <TouchableOpacity 
                    style={styles.skillInputTouchable}
                    onPress={() => openEditModal('enganar', habilidades.enganar)}
                  >
                    <Text style={styles.skillInputText}>{habilidades.enganar || '0'}</Text>
                  </TouchableOpacity>
                </View>
              </View>

              <View style={styles.skillContainer}>
                <View style={styles.skillBackground}>
                  <Text style={styles.skillText}>Furtividade</Text>
                  <TouchableOpacity 
                    style={styles.skillInputTouchable}
                    onPress={() => openEditModal('furtividade', habilidades.furtividade)}
                  >
                    <Text style={styles.skillInputText}>{habilidades.furtividade || '0'}</Text>
                  </TouchableOpacity>
                </View>
              </View>

              <View style={styles.skillContainer}>
                <View style={styles.skillBackground}>
                  <Text style={styles.skillText}>Informática</Text>
                  <TouchableOpacity 
                    style={styles.skillInputTouchable}
                    onPress={() => openEditModal('informatica', habilidades.informatica)}
                  >
                    <Text style={styles.skillInputText}>{habilidades.informatica || '0'}</Text>
                  </TouchableOpacity>
                </View>
              </View>

              <View style={styles.skillContainer}>
                <View style={styles.skillBackground}>
                  <Text style={styles.skillText}>Iniciativa</Text>
                  <TouchableOpacity 
                    style={styles.skillInputTouchable}
                    onPress={() => openEditModal('iniciativa', habilidades.iniciativa)}
                  >
                    <Text style={styles.skillInputText}>{habilidades.iniciativa || '0'}</Text>
                  </TouchableOpacity>
                </View>
              </View>

              <View style={styles.skillContainer}>
                <View style={styles.skillBackground}>
                  <Text style={styles.skillText}>Intimidação</Text>
                  <TouchableOpacity 
                    style={styles.skillInputTouchable}
                    onPress={() => openEditModal('intimidacao', habilidades.intimidacao)}
                  >
                    <Text style={styles.skillInputText}>{habilidades.intimidacao || '0'}</Text>
                  </TouchableOpacity>
                </View>
              </View>

              <View style={styles.skillContainer}>
                <View style={styles.skillBackground}>
                  <Text style={styles.skillText}>Intuição</Text>
                  <TouchableOpacity 
                    style={styles.skillInputTouchable}
                    onPress={() => openEditModal('intuicao', habilidades.intuicao)}
                  >
                    <Text style={styles.skillInputText}>{habilidades.intuicao || '0'}</Text>
                  </TouchableOpacity>
                </View>
              </View>

              <View style={styles.skillContainer}>
                <View style={styles.skillBackground}>
                  <Text style={styles.skillText}>Medicina</Text>
                  <TouchableOpacity 
                    style={styles.skillInputTouchable}
                    onPress={() => openEditModal('medicina', habilidades.medicina)}
                  >
                    <Text style={styles.skillInputText}>{habilidades.medicina || '0'}</Text>
                  </TouchableOpacity>
                </View>
              </View>

              <View style={styles.skillContainer}>
                <View style={styles.skillBackground}>
                  <Text style={styles.skillText}>Mecânica</Text>
                  <TouchableOpacity 
                    style={styles.skillInputTouchable}
                    onPress={() => openEditModal('mecanica', habilidades.mecanica)}
                  >
                    <Text style={styles.skillInputText}>{habilidades.mecanica || '0'}</Text>
                  </TouchableOpacity>
                </View>
              </View>

              <View style={styles.skillContainer}>
                <View style={styles.skillBackground}>
                  <Text style={styles.skillText}>Persuasão</Text>
                  <TouchableOpacity 
                    style={styles.skillInputTouchable}
                    onPress={() => openEditModal('persuasao', habilidades.persuasao)}
                  >
                    <Text style={styles.skillInputText}>{habilidades.persuasao || '0'}</Text>
                  </TouchableOpacity>
                </View>
              </View>

              <View style={styles.skillContainer}>
                <View style={styles.skillBackground}>
                  <Text style={styles.skillText}>Primeiros-Socorros</Text>
                  <TouchableOpacity 
                    style={styles.skillInputTouchable}
                    onPress={() => openEditModal('primeirosSocorros', habilidades.primeirosSocorros)}
                  >
                    <Text style={styles.skillInputText}>{habilidades.primeirosSocorros || '0'}</Text>
                  </TouchableOpacity>
                </View>
              </View>

              <View style={styles.skillContainer}>
                <View style={styles.skillBackground}>
                  <Text style={styles.skillText}>Procurar</Text>
                  <TouchableOpacity 
                    style={styles.skillInputTouchable}
                    onPress={() => openEditModal('procurar', habilidades.procurar)}
                  >
                    <Text style={styles.skillInputText}>{habilidades.procurar || '0'}</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </ScrollView>
          </View>
        )}
           
      {activeView === 'blue' && 
        <View style={styles.blueView}>
          <Text style={styles.viewTitle}>INVENTÁRIO</Text>    

          <TouchableOpacity 
            style={styles.createItemButton}
            onPress={() => setCreateModalVisible(true)}
          >
            <Ionicons name="add-outline" size={20} color="#4cf3ffff" style={styles.createItemIcon} />
            <Text style={styles.createItemText}>Criar Item</Text>
          </TouchableOpacity>          
          
          <View style={styles.tableContainer}>
            <View style={styles.tableHeader}>
              <Text style={[styles.headerText, styles.headerName]}>Nome do Item</Text>
              <Text style={[styles.headerText, styles.headerPrice]}>Crédito</Text>
              <Text style={[styles.headerText, styles.headerWeight]}>Volume</Text>
              <Text style={[styles.headerText, styles.headerActions]}>Ações</Text>
            </View>

            <ScrollView style={styles.tableBody}>
              {rpgEquipments.map((item) => (
                <View key={item.id} style={styles.tableRow}>
                  <TouchableOpacity 
                    style={styles.cellTouchable}
                    onPress={() => setSelectedItem(item)}
                  >
                    <Text style={[styles.cellText, styles.cellName]}>{item.name}</Text>
                  </TouchableOpacity>
                  
                  <Text style={[styles.cellText, styles.cellPrice]}>
                    {item.price}
                  </Text>
                  
                  <Text style={[styles.cellText, styles.cellWeight]}>
                    {item.weight || 0}
                  </Text>
                  
                  <View style={styles.cellActions}>
                    <TouchableOpacity 
                      style={styles.actionButton}
                      onPress={() => handleEditEquipment(item)}
                    >
                      <Ionicons name="pencil-outline" size={20} color="#4cf3ffff" />
                    </TouchableOpacity>
                    
                    <TouchableOpacity 
                      style={styles.actionButton}
                      onPress={() => handleDeleteEquipment(item.id)}
                    >
                      <Ionicons name="trash-outline" size={20} color="#ff6b6b" />
                    </TouchableOpacity>
                  </View>
                </View>
              ))}
            </ScrollView>
          </View>

          <Modal
            visible={createModalVisible}
            animationType="slide"
            transparent={true}
            onRequestClose={() => setCreateModalVisible(false)}
          >
            <View style={styles.modalOverlay}>
              <View style={styles.createModalContainer}>
                <Text style={styles.createModalTitle}>Criar Novo Equipamento</Text>

                <ScrollView 
                  style={styles.createModalScroll}
                  contentContainerStyle={styles.createModalScrollContent}
                >
                  <View style={styles.inputGroup}>
                    <Text style={styles.inputLabel}>Nome do Equipamento</Text>
                    <TextInput
                      style={styles.textInput}
                      value={newEquipment.name}
                      onChangeText={(text) => setNewEquipment({...newEquipment, name: text})}
                      placeholder="Digite o nome do equipamento"
                      placeholderTextColor="#888"
                    />
                  </View>

                  {/* Campos de preço e volume - PRIMEIRO, ANTES DOS CAMPOS ESPECÍFICOS */}
                  <View style={styles.inputGroup}>
                    <Text style={styles.inputLabel}>Preço (Créditos)</Text>
                    <TextInput
                      style={styles.textInput}
                      value={newEquipment.price.toString()}
                      onChangeText={(text) => setNewEquipment({...newEquipment, price: parseInt(text) || 0})}
                      placeholder="Digite o preço em créditos"
                      placeholderTextColor="#888"
                      keyboardType="numeric"
                    />
                  </View>

                  <View style={styles.inputGroup}>
                    <Text style={styles.inputLabel}>Volume</Text>
                    <TextInput
                      style={styles.textInput}
                      value={newEquipment.weight.toString()}
                      onChangeText={(text) => setNewEquipment({...newEquipment, weight: parseFloat(text) || 0})}
                      placeholder="Digite o volume/peso"
                      placeholderTextColor="#888"
                      keyboardType="numeric"
                    />
                  </View>

                  {/* Campos específicos para armas - DEPOIS DOS CAMPOS GERAIS */}
                  {(newEquipment.type === 'arma_curta' || newEquipment.type === 'arma_longa') && (
                    <>
                      <View style={styles.inputGroup}>
                        <Text style={styles.inputLabel}>Requisição para uso</Text>
                        <TextInput
                          style={styles.textInput}
                          value={newEquipment.requirement}
                          onChangeText={(text) => setNewEquipment({ ...newEquipment, requirement: text })}
                          placeholder="Ex: Força 12+"
                          placeholderTextColor="#888"
                        />
                      </View>

                      <View style={styles.inputGroup}>
                        <Text style={styles.inputLabel}>Dano da Arma</Text>
                        <TextInput
                          style={styles.textInput}
                          value={newEquipment.damage}
                          onChangeText={(text) => setNewEquipment({ ...newEquipment, damage: text })}
                          placeholder="Ex: 1d8"
                          placeholderTextColor="#888"
                        />
                      </View>

                      <View style={styles.inputGroup}>
                        <Text style={styles.inputLabel}>Bônus de Crítico</Text>
                        <TextInput
                          style={styles.textInput}
                          value={newEquipment.critical}
                          onChangeText={(text) => setNewEquipment({ ...newEquipment, critical: text })}
                          placeholder="Ex: +2"
                          placeholderTextColor="#888"
                        />
                      </View>
                    </>
                  )}

                  <View style={styles.inputGroup}>
                    <Text style={styles.inputLabel}>Tipo do Equipamento</Text>
                    <View style={styles.pickerContainer}>
                      <Picker
                        selectedValue={newEquipment.type}
                        style={styles.picker}
                        onValueChange={(itemValue) => setNewEquipment({...newEquipment, type: itemValue})}
                      >
                        <Picker.Item label="Item" value="item" />
                        <Picker.Item label="Arma de Curta Distância" value="arma_curta" />
                        <Picker.Item label="Arma de Longa Distância" value="arma_longa" />
                      </Picker>
                    </View>
                  </View>

                  <View style={styles.inputGroup}>
                    <Text style={styles.inputLabel}>Descrição</Text>
                    <TextInput
                      style={[styles.textInput, styles.descriptionInput]}
                      value={newEquipment.description}
                      onChangeText={(text) => setNewEquipment({...newEquipment, description: text})}
                      placeholder="Digite a descrição do equipamento"
                      placeholderTextColor="#888"
                      multiline
                      numberOfLines={4}
                    />
                  </View>
                </ScrollView>

                <View style={styles.modalButtons}>
                  <TouchableOpacity 
                    style={[styles.modalButton, styles.cancelButton]}
                    onPress={() => setCreateModalVisible(false)}
                  >
                    <Text style={styles.cancelButtonText}>Cancelar</Text>
                  </TouchableOpacity>
                  
                  <TouchableOpacity 
                    style={[styles.modalButton, styles.createButton]}
                    onPress={handleCreateEquipment}
                  >
                    <Text style={styles.createButtonText}>Criar</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </Modal>
                      {/* Modal de Edição de Equipamento */}
            <Modal
              visible={editEquipmentModalVisible}
              animationType="slide"
              transparent={true}
              onRequestClose={() => setEditEquipmentModalVisible(false)}
            >
              <View style={styles.modalOverlay}>
                <View style={styles.createModalContainer}>
                  <Text style={styles.createModalTitle}>Editar Equipamento</Text>

                  <ScrollView style={styles.createModalScroll}>
                    <View style={styles.inputGroup}>
                      <Text style={styles.inputLabel}>Nome do Equipamento</Text>
                      <TextInput
                        style={styles.textInput}
                        value={editingEquipment?.name || ''}
                        onChangeText={(text) => setEditingEquipment({...editingEquipment, name: text})}
                        placeholder="Digite o nome do equipamento"
                        placeholderTextColor="#888"
                      />
                    </View>

                    {(editingEquipment?.type === 'arma_curta' || editingEquipment?.type === 'arma_longa') && (
                      <>
                        <View style={styles.inputGroup}>
                          <Text style={styles.inputLabel}>Requisição para uso</Text>
                          <TextInput
                            style={styles.textInput}
                            value={editingEquipment?.requirement || ''}
                            onChangeText={(text) => setEditingEquipment({ ...editingEquipment, requirement: text })}
                            placeholder="Ex: Força 12+"
                            placeholderTextColor="#888"
                          />
                        </View>

                        <View style={styles.inputGroup}>
                          <Text style={styles.inputLabel}>Dano da Arma</Text>
                          <TextInput
                            style={styles.textInput}
                            value={editingEquipment?.damage || ''}
                            onChangeText={(text) => setEditingEquipment({ ...editingEquipment, damage: text })}
                            placeholder="Ex: 1d8"
                            placeholderTextColor="#888"
                          />
                        </View>

                        <View style={styles.inputGroup}>
                          <Text style={styles.inputLabel}>Bônus de Crítico</Text>
                          <TextInput
                            style={styles.textInput}
                            value={editingEquipment?.critical || ''}
                            onChangeText={(text) => setEditingEquipment({ ...editingEquipment, critical: text })}
                            placeholder="Ex: +2"
                            placeholderTextColor="#888"
                          />
                        </View>
                      </>
                    )}

                    <View style={styles.inputGroup}>
                      <Text style={styles.inputLabel}>Tipo do Equipamento</Text>
                      <View style={styles.pickerContainer}>
                        <Picker
                          selectedValue={editingEquipment?.type || 'item'}
                          style={styles.picker}
                          onValueChange={(itemValue) => setEditingEquipment({...editingEquipment, type: itemValue})}
                        >
                          <Picker.Item label="Item" value="item"/>
                          <Picker.Item label="Arma de Curta Distância" value="arma_curta"/>
                          <Picker.Item label="Arma de Longa Distância" value="arma_longa"/>
                        </Picker>
                      </View>
                    </View>

                    <View style={styles.inputGroup}>
                      <Text style={styles.inputLabel}>Preço (Créditos)</Text>
                      <TextInput
                        style={styles.textInput}
                        value={editingEquipment?.price?.toString() || ''}
                        onChangeText={(text) => setEditingEquipment({...editingEquipment, price: parseInt(text) || 0})}
                        placeholder="Digite o preço"
                        placeholderTextColor="#888"
                        keyboardType="numeric"
                      />
                    </View>

                    <View style={styles.inputGroup}>
                      <Text style={styles.inputLabel}>Peso (Volume)</Text>
                      <TextInput
                        style={styles.textInput}
                        value={editingEquipment?.weight?.toString() || ''}
                        onChangeText={(text) => setEditingEquipment({...editingEquipment, weight: parseFloat(text) || 0})}
                        placeholder="Digite o peso"
                        placeholderTextColor="#888"
                        keyboardType="numeric"
                      />
                    </View>

                    <View style={styles.inputGroup}>
                      <Text style={styles.inputLabel}>Descrição</Text>
                      <TextInput
                        style={[styles.textInput, styles.descriptionInput]}
                        value={editingEquipment?.description || ''}
                        onChangeText={(text) => setEditingEquipment({...editingEquipment, description: text})}
                        placeholder="Digite a descrição do equipamento"
                        placeholderTextColor="#888"
                        multiline
                        numberOfLines={4}
                      />
                    </View>
                  </ScrollView>

                  <View style={styles.modalButtons}>
                    <TouchableOpacity 
                      style={[styles.modalButton, styles.cancelButton]}
                      onPress={() => setEditEquipmentModalVisible(false)}
                    >
                      <Text style={styles.cancelButtonText}>Cancelar</Text>
                    </TouchableOpacity>
                    
                    <TouchableOpacity 
                      style={[styles.modalButton, styles.createButton]}
                      onPress={handleUpdateEquipment}
                    >
                      <Text style={styles.createButtonText}>Salvar</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
            </Modal>

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

                    
                    {(selectedItem.type === 'arma_curta' || selectedItem.type === 'arma_longa') && (
                      <>
                        <View style={styles.modalInfoRow}>
                          <Text style={styles.modalLabel}>Requisição:</Text>
                          <Text style={styles.modalValue}>{selectedItem.requirement || '-'}</Text>
                        </View>

                        <View style={styles.modalInfoRow}>
                          <Text style={styles.modalLabel}>Dano:</Text>
                          <Text style={styles.modalValue}>{selectedItem.damage || '-'}</Text>
                        </View>

                        <View style={styles.modalInfoRow}>
                          <Text style={styles.modalLabel}>Crítico:</Text>
                          <Text style={styles.modalValue}>{selectedItem.critical || '-'}</Text>
                        </View>
                      </>
                    )}


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
        </View>
      }


      {activeView === 'pink' && 
          <View style={styles.pinkView}>
            <Text style={styles.viewTitle}>APARÊNCIA DO PERSONAGEM</Text>            
            <ScrollView contentContainerStyle={styles.appearanceContainer}>
             
              <View style={styles.appearanceItem}>
                <Text style={styles.appearanceLabel}>Cor dos Olhos:</Text>
                <TouchableOpacity 
                  style={styles.appearanceInputTouchable}
                  onPress={() => openEditAppearanceModal('corOlhos', aparencia.corOlhos)}
                >
                  <Text style={styles.appearanceInputText}>
                    {aparencia.corOlhos || 'Ex: Azuis, Verdes, Castanhos...'}
                  </Text>
                </TouchableOpacity>
              </View>

              <View style={styles.appearanceItem}>
                <Text style={styles.appearanceLabel}>Estilo e Cor do Cabelo:</Text>
                <TouchableOpacity 
                  style={styles.appearanceInputTouchable}
                  onPress={() => openEditAppearanceModal('estiloCabelo', aparencia.estiloCabelo)}
                >
                  <Text style={styles.appearanceInputText}>
                    {aparencia.estiloCabelo || 'Ex: Loiro longo, Negro curto...'}
                  </Text>
                </TouchableOpacity>
              </View>

              <View style={styles.appearanceItem}>
                <Text style={styles.appearanceLabel}>Características Físicas:</Text>
                <TouchableOpacity 
                  style={styles.appearanceInputTouchable}
                  onPress={() => openEditAppearanceModal('caracteristicas', aparencia.caracteristicas)}
                >
                  <Text style={styles.appearanceInputText}>
                    {aparencia.caracteristicas || 'Ex: Cicatriz no rosto, Tatuagens...'}
                  </Text>
                </TouchableOpacity>
              </View>

              <View style={styles.appearanceItem}>
                <Text style={styles.appearanceLabel}>Altura:</Text>
                <TouchableOpacity 
                  style={styles.appearanceInputTouchable}
                  onPress={() => openEditAppearanceModal('altura', aparencia.altura)}
                >
                  <Text style={styles.appearanceInputText}>
                    {aparencia.altura || 'Ex: 1,80m'}
                  </Text>
                </TouchableOpacity>
              </View>

              <View style={styles.appearanceItem}>
                <Text style={styles.appearanceLabel}>Idade:</Text>
                <TouchableOpacity 
                  style={styles.appearanceInputTouchable}
                  onPress={() => openEditAppearanceModal('idade', aparencia.idade)}
                >
                  <Text style={styles.appearanceInputText}>
                    {aparencia.idade || 'Ex: 25 anos'}
                  </Text>
                </TouchableOpacity>
              </View>

              <View style={styles.appearanceItem}>
                <Text style={styles.appearanceLabel}>Tom de Pele:</Text>
                <TouchableOpacity 
                  style={styles.appearanceInputTouchable}
                  onPress={() => openEditAppearanceModal('tomPele', aparencia.tomPele)}
                >
                  <Text style={styles.appearanceInputText}>
                    {aparencia.tomPele || 'Ex: Bronzeada, Pálida, Morena...'}
                  </Text>
                </TouchableOpacity>
              </View>

              <View style={styles.appearanceItem}>
                <Text style={styles.appearanceLabel}>Vestimentas e Acessórios:</Text>
                <TouchableOpacity 
                  style={styles.appearanceInputTouchable}
                  onPress={() => openEditAppearanceModal('vestimentas', aparencia.vestimentas)}
                >
                  <Text style={styles.appearanceInputText}>
                    {aparencia.vestimentas || 'Ex: Armadura de couro, Capa vermelha...'}
                  </Text>
                </TouchableOpacity>
              </View>

              <View style={styles.appearanceItem}>
                <Text style={styles.appearanceLabel}>Personalidade:</Text>
                <TouchableOpacity 
                  style={[styles.appearanceInputTouchable, styles.bioInputTouchable]}
                  onPress={() => openEditAppearanceModal('personalidade', aparencia.personalidade)}
                >
                  <Text style={styles.appearanceInputText}>
                    {aparencia.personalidade || 'Descreva a personalidade, maneirismos e traços característicos...'}
                  </Text>
                </TouchableOpacity>
              </View>

              <View style={styles.appearanceItem}>
                <Text style={styles.appearanceLabel}>Biografia e História:</Text>
                <TouchableOpacity 
                  style={[styles.appearanceInputTouchable, styles.bioInputTouchable]}
                  onPress={() => openEditAppearanceModal('biografia', aparencia.biografia)}
                >
                  <Text style={styles.appearanceInputText}>
                    {aparencia.biografia || 'Conte a história do seu personagem, sua origem, motivações e objetivos...'}
                  </Text>
                </TouchableOpacity>
              </View>

            </ScrollView>
          </View>
        }
  

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
    gold: '#4cf3ffff',
    white: '#FFFFFF',
    lightGray: '#CCCCCC',
    darkGray: '#333333'
  },

  container: {
    flex: 1,
    backgroundColor: '#f8fafc',
  },


  //Header quase completa
header: {
  backgroundColor: '#124A69',
  flexDirection: 'row',
  alignItems: 'center',
  justifyContent: 'center',
  paddingHorizontal: 10,
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
  textAlign: 'center',
  flex: 1, 
  marginHorizontal: 10,
  top: 5
},
backButton: {
  width: 36,
  height: 36,
  zIndex: 1,
  position: 'absolute',
  left: 10,
  justifyContent: 'center',
  alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    borderRadius: 100,
},

//é da modal
  createButton: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    justifyContent: 'center',
    alignItems: 'center',
  },

  mainContent: {
    flex: 1,
    marginTop: 205,
  },
  viewTitle: {
    fontSize: 25,
    fontWeight: 'bold',
    color: '#ffffffff',
    textAlign: 'center',
    marginVertical: 10,
    marginTop: 5,
    textShadowColor: '#000000ff',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 10,

  },
  scrollContent: {
    paddingBottom: 30,
    paddingHorizontal: 10,
  },
  columnStyle: {
    position: 'absolute',
    top: 0,
    width: 5,
    height: '10%',
    backgroundColor: '#124A69',
  },
  namePlayer: {
    position: 'absolute',
    top: 0,
    width: '100%',
    height: 50,
    backgroundColor: '#124A69',
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
    color: '#dfdfdfff',
    fontSize: 16,
  },

  characterBase: {
    position: 'absolute',
    top: 75,
    width: '100%',
    height: 50,
    //backgroundColor: '#cde1ffff'
  },
  nameCharacter: {
    top: 0,
    marginLeft: 110, 
  },
  name:{
    fontSize: 20,
    fontWeight: 'bold'
  },
  ocupationCharacter: {
    marginLeft: 120,
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: '-10',
  },
  occupationItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: '10',
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
    top: 70,
    left: 5,
    width: 100,
    height: 100,
    //borderBottomRightRadius: 100,
    zIndex: 1,
    //borderBottomColor: '#124A69',
    borderRadius: 100,
    borderWidth: 5,
    borderColor: '#124A69',
  },

  buttonsContainer: {
    position: 'absolute',
    top: 185, 
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
    backgroundColor: '#2188C0',
    padding: 10,
  },
  greenView: {
    flex: 1,
    backgroundColor: '#1E7CAE',
    padding: 10,
  },
  blueView: {
    flex: 1,
    backgroundColor: '#18638C',
    padding: 10,
  },
  pinkView: {
    flex: 1,
    backgroundColor: '#124A69',
    padding: 10,
  },
  containerWithBorder: {
    backgroundColor: '#0A2D42',
    padding: 15,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: '#4cf3ffff',
    marginBottom: 15,
  },
  label: {
    color: '#4cf3ffff',
    fontWeight: 'bold',
    fontSize: 16,
    marginBottom: 8,
  },
  input: {
    backgroundColor: '#0A2D42',
    color: '#4cf3ffff',
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
  borderColor: '#0A2D42',
  marginHorizontal: 2, // Adicione margens laterais menores
},
  tableHeader: {
    flexDirection: 'row',
    backgroundColor: '#0A2D42',
    padding: 15,
    borderBottomWidth: 2,
    borderBottomColor: '#4cf3ffff',
  },
  headerText: {
    color: '#4cf3ffff',
    fontWeight: 'bold',
    fontSize: 14,
    textAlign: 'center',
  },
headerName: { flex: 2, textAlign: 'center' }, // Adicionei textAlign: 'left'
headerPrice: { flex: 1, textAlign: 'center' },
headerWeight: { flex: 1, textAlign: 'center' },
headerActions: { flex: 0.8, textAlign: 'center' },
      
 tableRow: {
  flexDirection: 'row',
  padding: 8,
  borderBottomWidth: 1,
  borderBottomColor: '#444',
  alignItems: 'center', // Centraliza verticalmente
  backgroundColor: '#333',
  minHeight: 50, // Altura mínima para melhor visualização
},
cellText: {
  fontSize: 14,
  color: '#FFF',
  textAlign: 'center', // Centraliza horizontalmente
  textAlignVertical: 'center', // Centraliza verticalmente (funciona melhor em alguns casos)
},
cellName: { 
  flex: 2,
  fontWeight: 'bold',
  color: '#4cf3ffff',
  textAlign: 'center', // Centralizado
  paddingHorizontal: 5, // Pequeno padding lateral
},
cellPrice: { 
  flex: 1,
  fontWeight: 'bold',
  color: '#4cf3ffff',
  textAlign: 'center', // Centralizado
  paddingHorizontal: 5,
},
cellWeight: { 
  flex: 1,
  fontWeight: 'bold',
  color: '#4cf3ffff',
  textAlign: 'center', // Centralizado
  paddingHorizontal: 5,
},
cellActions: {
  flex: 0.8,
  flexDirection: 'row',
  justifyContent: 'center', // Centraliza os ícones
  alignItems: 'center',
  paddingHorizontal: 5,
},


credit: {
  color: '#4cf3ffff',
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
// comum: { color: '#FFFFFF' },
// raro: { color: '#0070DD' },
// epico: { color: '#A335EE' },
// lendario: { color: '#FF8000' },
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

  
 skillTitle: {
  fontSize: 27,
  fontWeight: 'bold',
  color: '#4cf3ffff',
  textAlign: 'center',
  marginTop: 10,
  marginBottom: 15,
  textShadowColor: '#251083ff',
  textShadowOffset: { width: 1, height: 1 },
  textShadowRadius: 2,
},

skillContainer: {
  marginBottom: 12,
  width: '100%',
  alignSelf: 'center'
},

skillBackground: {
  flexDirection: 'row',
  alignItems: 'center',
  justifyContent: 'space-between',
  backgroundColor: '#0A2D42',
  paddingVertical: 10,
  paddingHorizontal: 10,
  borderRadius: 8,
  borderWidth: 2,
  borderColor: '#4cf3ffff',
},
skillText: {
  flex: 1,
  fontSize: 16,
    textTransform: 'uppercase',
  fontWeight: 'bold',
  color: '#4cf3ffff',
  
},
  skillInputTouchable: {
    width: 100,
    height: 35,
    backgroundColor: '#1E3A53',
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#5683B9',
  },
  skillInputText: {
    color: '#4cf3ffff',
    fontWeight: 'bold',
    fontSize: 16,
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
    backgroundColor: '#0A2D42',
    marginInline: 5,
    borderTopEndRadius: 10,
    borderTopStartRadius: 10,

  },
 attributesBackgroundBottom:{
    width: '30%',
    height: 110,
    backgroundColor: '#0A2D42',
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
    backgroundColor: '#0A2D42',
    borderRadius: 10
  },
  appearanceTitle: {
    fontSize: 27,
    fontWeight: 'bold',
    color: '#4cf3ffff',
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
    borderColor: '#4cf3ffff',
  },
  appearanceLabel: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#4cf3ffff',
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
   appearanceInputTouchable: {
    backgroundColor: '#1E3A53',
    color: '#FFF',
    padding: 12,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#5683B9',
    fontSize: 14,
    minHeight: 44,
    justifyContent: 'center',
  },
  bioInputTouchable: {
    minHeight: 100,
  },
  appearanceInputText: {
    color: '#FFF',
    fontSize: 14,
  },

  // Estilo para o input modal de biografia
  bioModalInput: {
    minHeight: 180,
    height: 180,
    textAlignVertical: 'top',
    padding: 12,
    fontSize: 16,
  },

  bioInput: {
    minHeight: 100,
    textAlignVertical: 'top',
  },

  redScrollContent: {
    paddingBottom: 30, 
  },
  resourcesContainer: {
    justifyContent: 'center', 
    backgroundColor: '#0A2D42',
    padding: 15,
    borderRadius: 10,
    marginBottom: 20,
    borderWidth: 2,
    borderColor: '#4cf3ffff',
    width: '95%',
    alignSelf: 'center',
  },
  resourceRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  resourceLabel: {
    color: '#4cf3ffff',
    fontWeight: 'bold',
    width: 80,
    fontSize: 16,
    left: 5
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
    color: '#4cf3ffff',
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
    backgroundColor: '#0A2D42',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    flex: 1,
    marginHorizontal: 5,
    borderWidth: 2,
    borderColor: '#4cf3ffff',
  },
  statInput: {
    color: '#4cf3ffff',
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    backgroundColor: '#1E3A53',
    borderRadius: 8,
    padding: 5,
    minWidth: 60,
    borderWidth: 1,
    borderColor: '#5683B9',
  },
  statLabel: {
    color: '#4cf3ffff',
    fontWeight: 'bold',
    marginTop: 5,
    fontSize: 14,
  },
  creditContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#0A2D42',
    padding: 15,
    borderRadius: 10,
    marginBottom: 20,
    borderWidth: 2,
    borderColor: '#4cf3ffff',
  },
  creditLabel: {
    color: '#4cf3ffff',
    fontWeight: 'bold',
    fontSize: 16,
    marginRight: 10,
  },
  creditInput: {
    flex: 1,
    color: '#4cf3ffff',
    fontSize: 18,
    fontWeight: 'bold',
    backgroundColor: '#1E3A53',
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
    backgroundColor: '#0A2D42',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    flex: 1,
    marginHorizontal: 5,
    borderWidth: 2,
    borderColor: '#4cf3ffff',
  },
  attributeInput: {
    color: '#4cf3ffff',
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
    color: '#4cf3ffff',
    fontWeight: 'bold',
    marginTop: 8,
    fontSize: 13.3,
    textAlign: 'center',
  },
 luckRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 20,
  },
  luckContainer: {
    backgroundColor: '#0A2D42',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    width: '32%', 
    borderWidth: 2,
    borderColor: '#4cf3ffff',
  },
  luckInput: {
    color: '#4cf3ffff',
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
    color: '#4cf3ffff',
    fontWeight: 'bold',
    marginTop: 8,
    fontSize: 14,
    textAlign: 'center',
  },
    createItemButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#0A2D42',
    padding: 12,
    borderRadius: 8,
    marginBottom: 15,
    borderWidth: 2,
    borderColor: '#4cf3ffff',
    alignSelf: 'center',
    alignItems: 'center'

  },
  createItemIcon: {
    marginRight: 8,
  },
  createItemText: {
    color: '#4cf3ffff',
    fontWeight: 'bold',
    fontSize: 16,
    width: '90%',
    textAlign: 'center',
  },
  createModalContainer: {
    backgroundColor: '#2D3748',
    padding: 25,
    borderRadius: 15,
    width: '90%',
    maxHeight: '80%',
    borderWidth: 3,
    borderColor: '#4cf3ffff',
  },
  createModalTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#4cf3ffff',
    textAlign: 'center',
    marginBottom: 20,
    textShadowColor: '#000',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 2,
  },
  createModalScroll: {
    maxHeight: 400,
  },
  createModalScrollContent: {
  paddingBottom: 20,
},
  inputGroup: {
    marginBottom: 20,
  },
  inputLabel: {
    color: '#4cf3ffff',
    fontWeight: 'bold',
    fontSize: 16,
    marginBottom: 8,
  },
  textInput: {
    backgroundColor: '#1E3A53',
    color: '#FFF',
    padding: 12,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#5683B9',
    fontSize: 14,
  },
  descriptionInput: {
    minHeight: 100,
    textAlignVertical: 'top',
  },
  pickerContainer: {
    backgroundColor: '#1E3A53',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#5683B9',
    overflow: 'hidden',
  },
  picker: {
    color: '#FFF',
    height: 50,
  },
  modalButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
  },
  modalButton: {
    flex: 1,
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
    marginHorizontal: 5,
  },
  cancelButton: {
    backgroundColor: '#718096',
    borderWidth: 1,
    borderColor: '#4A5568',
  },
  createButton: {
    backgroundColor: '#4cf3ffff',
    borderWidth: 1,
    borderColor: '#2C7A7B',
  },
  cancelButtonText: {
    color: '#FFF',
    fontWeight: 'bold',
  },
  createButtonText: {
    color: '#092534',
    fontWeight: 'bold',
  },
    editModalContainer: {
    backgroundColor: '#2D3748',
    padding: 25,
    borderRadius: 15,
    width: '80%',
    borderWidth: 3,
    borderColor: '#4cf3ffff',
  },
  editModalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#4cf3ffff',
    textAlign: 'center',
    marginBottom: 20,
  },
  editModalInput: {
    backgroundColor: '#1E3A53',
    color: '#FFF',
    padding: 12,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#5683B9',
    fontSize: 16,
    marginBottom: 20,
    textAlign: 'center'
  },
  
  // Estilos para os elementos touchable que substituem os TextInput
  resourceInputTouchable: {
    flex: 1,
    backgroundColor: '#1E3A53',
    borderRadius: 8,
    padding: 10,
    marginHorizontal: 10,
    borderWidth: 1,
    borderColor: '#5683B9',
    minWidth: 100,
    justifyContent: 'center',
    alignItems: 'center',
  },
  resourceInputText: {
    color: '#4cf3ffff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  statInputTouchable: {
    backgroundColor: '#1E3A53',
    borderRadius: 8,
    padding: 5,
    minWidth: 60,
    borderWidth: 1,
    borderColor: '#5683B9',
    justifyContent: 'center',
    alignItems: 'center',
  },
  statInputText: {
    color: '#4cf3ffff',
    fontSize: 20,
    fontWeight: 'bold',
  },
  creditInputTouchable: {
    flex: 1,
    backgroundColor: '#1E3A53',
    borderRadius: 8,
    padding: 10,
    borderWidth: 1,
    borderColor: '#5683B9',
    justifyContent: 'center',
    alignItems: 'center',
  },
  creditInputText: {
    color: '#4cf3ffff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  attributeInputTouchable: {
    backgroundColor: '#1E3A53',
    borderRadius: 8,
    padding: 10,
    minWidth: 70,
    borderWidth: 1,
    borderColor: '#5683B9',
    justifyContent: 'center',
    alignItems: 'center',
  },
  attributeInputText: {
    color: '#4cf3ffff',
    fontSize: 24,
    fontWeight: 'bold',
  },
  luckInputTouchable: {
    backgroundColor: '#1E3A53',
    borderRadius: 8,
    padding: 10,
    minWidth: 70,
    borderWidth: 1,
    borderColor: '#5683B9',
    justifyContent: 'center',
    alignItems: 'center',
  },
  luckInputText: {
    color: '#4cf3ffff',
    fontSize: 24,
    fontWeight: 'bold',
  },
  cellTouchable: {
    flex: 2,
    justifyContent: 'center', // Centraliza verticalmente
    alignItems: 'center', // Centraliza horizontalmente
    paddingHorizontal: 5,
  },
actionButton: {
  padding: 5,
  marginHorizontal: 2,
},
headerActions: { 
  flex: 1,
  textAlign: 'center'
},
cellActions: {
  flex: 1,
  flexDirection: 'row',
  justifyContent: 'space-around',
  alignItems: 'center',
},
editNameModalContainer: {
  backgroundColor: '#2D3748',
  padding: 25,
  borderRadius: 15,
  width: '90%',
  borderWidth: 3,
  borderColor: '#4cf3ffff',
},
editNameInput: {
  backgroundColor: '#1E3A53',
  color: '#FFF',
  padding: 12,
  borderRadius: 8,
  borderWidth: 1,
  borderColor: '#5683B9',
  fontSize: 16,
  marginBottom: 10,
  textAlign: 'center'
},
charCounter: {
  color: '#4cf3ffff',
  textAlign: 'center',
  marginBottom: 20,
  fontSize: 12,
},

});