import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Image, Platform, Text, TextInput, StatusBar, TouchableOpacity, ScrollView, Modal, Alert} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Picker } from "@react-native-picker/picker";
import { styles} from './styles';
import { useUser } from "../../../context/UserContext.js";

import * as ImagePicker from "expo-image-picker";
import api from "../../../../services/api.js";
import url from "../../../../services/url.js";

export default function Npc({ route, navigation }) {

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
  const { idNpc } = route.params;
    console.log("====NPC====, id: " + idNpc);
  // Estados para os modais de edição
  const [editModalVisible, setEditModalVisible] = useState(false);
  const [editingField, setEditingField] = useState('');
  const [currentValue, setCurrentValue] = useState('');
  const [tempValue, setTempValue] = useState('');
  
  
  // Estados para os valores dos atributos
  const [vida, setVida] = useState();
  const [vidaAtual, setVidaAtual] = useState(10);
  const [mental, setMental] = useState(10);
  const [mentalAtual, setMentalAtual] = useState(10);
  const [energia, setEnergia] = useState(10);
  const [energiaAtual, setEnergiaAtual] = useState(10);
  const [editingResource, setEditingResource] = useState(null);
  const [resourceModalVisible, setResourceModalVisible] = useState(false);
  const [tempCurrentValue, setTempCurrentValue] = useState(0);
  const [tempMaxValue, setTempMaxValue] = useState(0);
  
  const [ca, setCa] = useState(3);
  const [movimento, setMovimento] = useState(6);
  const [credito, setCredito] = useState(0);
  const [creditoMax, setCreditoMax] = useState(0);
  const [forca, setForca] = useState(1);
  const [agilidade, setAgilidade] = useState(1);
  const [constituicao, setConstituicao] = useState(1);
  const [vontade, setVontade] = useState(1);
  const [inteligencia, setInteligencia] = useState(1);
  const [percepcao, setPercepcao] = useState(1);
  const [sorte, setSorte] = useState(1);

  // Estados para as pericias
  const [pericias, setPericias] = useState({});

  // Estados para o nome do npc e modal
  const [characterName, setCharacterName] = useState('Nome do Npc');
  const [tempCharacterName, setTempCharacterName] = useState('');
  const [editNameModalVisible, setEditNameModalVisible] = useState(false);

  const [background, setBackground] = useState('');
  const [level, setLevel] = useState('');
  const [editingEquipment, setEditingEquipment] = useState(null);
  const [editEquipmentModalVisible, setEditEquipmentModalVisible] = useState(false);

  // Para imagem
  const [selectedImage, setSelectedImage] = useState(null);

const carregarImagemPerfil = async () => {
  try {
    console.log("Carregando imagem do perfil...");
    
    const res = await api.get("rpgetec/checarNpc.php", {
      params: { id_npc: idNpc }
    });

    if (res.data.success) {
      const npc = res.data.npc;
      console.log()
      if (npc.profileImage) {
        // Construir a URL completa da imagem
        const imageUrl = `${url}rpgetec/perfil/${npc.profileImage}`;
        console.log("URL da imagem:", imageUrl);
        setSelectedImage(imageUrl);
      } else {
        console.log("Npc não tem imagem de perfil");
        setSelectedImage(null); // Usar imagem padrão
      }
    }
  } catch (error) {
    console.error("Erro ao carregar imagem:", error);
  }
};

const pickImage = async () => {
  try {
    console.log("=== INICIANDO UPLOAD ===");

    // Request permissions
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== 'granted') {
      Alert.alert("Permissão negada", "Precisa permitir acesso à galeria.");
      return;
    }

    // Pick image
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: false,
      quality: 0.8,
      base64: false,
    });

    console.log("Resultado do ImagePicker:", result);

    if (result.canceled || !result.assets || result.assets.length === 0) {
      console.log("Seleção cancelada pelo usuário");
      return;
    }

    const asset = result.assets[0];
    const uri = asset.uri;

    console.log("Asset selecionado:", {
      uri: uri,
      fileName: asset.fileName,
      fileSize: asset.fileSize,
      type: asset.type
    });

    // 🔥 CORREÇÃO PRINCIPAL: FormData para React Native
    const formData = new FormData();
    
    // Formato CORRETO para React Native
    formData.append('file', {
      uri: Platform.OS === 'ios' ? uri.replace('file://', '') : uri,
      type: 'image/jpeg', // Forçar tipo JPEG
      name: `npc_${idNpc}_${Date.now()}.jpg`,
    });
    
    formData.append('id_npc', idNpc.toString());

    console.log("FormData criado, enviando para API...");

    // 🔥 USAR api (axios) que já funciona para os outros endpoints
    const response = await api.post("rpgetec/upload.php", formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
      timeout: 30000,
      // ⚠️ IMPORTANTE: TransformRequest para axios com FormData
      transformRequest: (data) => data,
    });

    console.log("✅ Resposta do servidor:", response.data);

    if (response.data.success) {
      Alert.alert("Sucesso", "Imagem do npc atualizada!");
      setSelectedImage(uri);
      
      // Atualizar a imagem imediatamente
      if (response.data.file) {
        const imageUrl = `${url}rpgetec/perfil/${response.data.file}`;
        setSelectedImage(imageUrl);
      }
    } else {
      Alert.alert("Erro no upload", response.data.message || "Erro desconhecido");
    }

  } catch (err) {
    console.log("❌ ERRO NO UPLOAD:", {
      message: err.message,
      code: err.code,
      response: err.response?.data,
      status: err.response?.status
    });
    
    // Erros específicos
    if (err.message === 'Network Error') {
      Alert.alert(
        "Erro de Rede", 
        "Não foi possível conectar ao servidor. Verifique:\n\n• Sua conexão com internet\n• Se o servidor está online\n• URL do servidor está correta"
      );
    } else if (err.code === 'ECONNABORTED') {
      Alert.alert("Timeout", "O upload demorou muito. Tente uma imagem menor.");
    } else if (err.response?.status === 413) {
      Alert.alert("Arquivo muito grande", "A imagem é muito grande. Tente uma com menor resolução.");
    } else {
      Alert.alert("Erro", err.response?.data?.message || err.message || "Erro desconhecido");
    }
  }
};


  //   const data = await response.json();
  //   console.log("Upload response:", data);

  //   if (data.success) {
  //     Alert.alert("Upload", data.message);
  //   } else {
  //     Alert.alert("Upload failed", data.message || "Erro desconhecido");
  //   }

  //Puxar do banco de dados
    useEffect(() => {
  const checarNpc = async () => {
    try {
      const res = await api.get("rpgetec/checarNpc.php", {
        params: { id_npc: idNpc }
      });

      if (res.data.success) {
        const p = res.data.npc;
        
        // Seus estados existentes...
        setVida(p.vida);
        setVidaAtual(p.vidaAtual || p.vida);
        setMental(p.mental);
        setMentalAtual(p.mentalAtual || p.mental);
        setEnergia(p.energia);
        setEnergiaAtual(p.energiaAtual || p.energia);
        setCa(p.ca);
        setMovimento(p.movimento);
        setCredito(p.credito);
        setCreditoMax(p.creditoMax || p.credito); 
        setForca(p.forca);
        setAgilidade(p.agilidade);
        setConstituicao(p.constituicao);
        setVontade(p.vontade);
        setInteligencia(p.inteligencia);
        setPercepcao(p.percepcao);
        setSorte(p.sorte);
        setCharacterName(p.nome);
        setBackground(p.antepassado);
        setLevel(p.nivel);
        setPericias(res.data.pericias);

        // 🔥 CARREGAR IMAGEM DO PERFIL
        if (p.profileImage) {
          const imageUrl = `${url}rpgetec/perfil/${p.profileImage}`;
          console.log("Carregando imagem:", imageUrl);
          setSelectedImage(imageUrl);
        }
      }
    } catch (error) {
      console.error("Erro ao buscar npc:", error);
    }
  };

  checarNpc();
}, [idNpc]); // Remova 'vida' e 'background' se não forem necessários

  
  
  // Função para abrir o modal de edição
  const openEditModal = (field, value) => {
    setEditingField(field);
    setCurrentValue(value);
    setTempValue(value);
    setEditModalVisible(true);
  };
    const openResourceEditModal = (resourceType, currentValue, maxValue) => {
    setEditingResource(resourceType);
    setTempCurrentValue(currentValue.toString());
    setTempMaxValue(maxValue.toString());
    setResourceModalVisible(true);
  };
const saveResourceEdit = async () => {
  if (!editingResource) return;

  const newCurrent = parseInt(tempCurrentValue) || 0;
  const newMax = parseInt(tempMaxValue) || 0;

  try {
    const res = await api.get("rpgetec/alterarNpc.php", {
      params: {
        id_npc: idNpc,
        valor: newCurrent,
        atributo: `${editingResource}Atual`,
      },
    });

    const resMax = await api.get("rpgetec/alterarNpc.php", {
      params: {
        id_npc: idNpc,
        valor: newMax,
        atributo: editingResource,
      },
    });

    console.log("Alterar recursos:", res.data, resMax.data);

    if (res.data.success && resMax.data.success) {
      switch (editingResource) {
        case 'vida':
          setVida(newMax);
          setVidaAtual(newCurrent);
          break;
        case 'mental':
          setMental(newMax);
          setMentalAtual(newCurrent);
          break;
        case 'energia':
          setEnergia(newMax);
          setEnergiaAtual(newCurrent);
          break;
        case 'credito':
          setCredito(newCurrent);
          setCreditoMax(newMax);
          break;
        default: break;
      }
    } else {
      Alert.alert("Erro", "Falha ao atualizar recursos");
    }
  } catch (error) {
    console.error("Erro ao alterar recursos:", error);
  }

  setResourceModalVisible(false);
  setEditingResource(null);
};
  // Função para salvar a edição de pericias
  const savePericiaEdit = () => {
    setPericias(prev => ({
      ...prev,
      [editingField]: tempValue
    }));
    setEditModalVisible(false);
  };

  // Função para salvar a edição
  const saveEdit = async () => {
  // Se for uma perícia
  if (editingField in pericias) {
    try {
      const res = await api.get("rpgetec/alterarNpc.php", {
        params: {
          id_npc: idNpc,
          valor: tempValue,
          pericia: editingField, // <- envia como perícia
        },
      });
      console.log("Alterar perícia:", res.data);

      if (res.data.success) {
        // Atualiza localmente
        setPericias(prev => ({
          ...prev,
          [editingField]: tempValue,
        }));
      } else {
        Alert.alert("Erro", res.data.error || "Falha ao atualizar perícia");
      }
    } catch (error) {
      console.error("Erro ao alterar perícia:", error);
    }

    setEditModalVisible(false);
  } 
  // Se for atributo normal
  else {
    try {
      const res = await api.get("rpgetec/alterarNpc.php", {
        params: {
          id_npc: idNpc,
          valor: tempValue,
          atributo: editingField,
        },
      });
      console.log("Alterar atributo:", res.data);

      if (res.data.success) {
        switch (editingField) {
          case 'vida': setVida(tempValue); break;
          case 'mental': setMental(tempValue); break;
          case 'energia': setEnergia(tempValue); break;
          case 'ca': setCa(tempValue); break;
          case 'movimento': setMovimento(tempValue); break;
          case 'credito': setCredito(tempValue); break;
          case 'forca': setForca(tempValue); break;
          case 'agilidade': setAgilidade(tempValue); break;
          case 'constituicao': setConstituicao(tempValue); break;
          case 'vontade': setVontade(tempValue); break;
          case 'inteligencia': setInteligencia(tempValue); break;
          case 'percepcao': setPercepcao(tempValue); break;
          case 'sorte': setSorte(tempValue); break;
          default: break;
        }
      } else {
        Alert.alert("Erro", res.data.error || "Falha ao atualizar atributo");
      }
    } catch (error) {
      console.error("Erro ao alterar npc:", error);
    }

    setEditModalVisible(false);
  }
};


  // Função para cancelar a edição
  const cancelEdit = () => {
    setTempValue(currentValue);
    setEditModalVisible(false);
  };


// EQUIPAMENTO


  const handleEditEquipment = (item) => {
  setEditingEquipment(item);
  setEditEquipmentModalVisible(true);
};


// Função para abrir o modal de edição do nome
const openNameEditModal = () => {
  setTempCharacterName(characterName);
  setEditNameModalVisible(true);
};

// Função para salvar o nome do npc
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
  visible={resourceModalVisible}
  transparent={true}
  animationType="slide"
  onRequestClose={() => setResourceModalVisible(false)}
>
  <View style={styles.modalOverlay}>
    <View style={styles.editModalContainer}>
      <Text style={styles.editModalTitle}>
        Editar {editingResource === 'vida' ? 'Vida' : 
                editingResource === 'mental' ? 'Mental' : 'Energia'}
      </Text>
      
      <View style={styles.resourceInputGroup}>
        <Text style={styles.inputLabel}>Valor Atual:</Text>
        <TextInput
          style={styles.editModalInput}
          value={tempCurrentValue}
          onChangeText={setTempCurrentValue}
          placeholder="Valor atual..."
          placeholderTextColor="#CCC"
          keyboardType="numeric"
        />
      </View>

      <View style={styles.resourceInputGroup}>
        <Text style={styles.inputLabel}>Valor Máximo:</Text>
        <TextInput
          style={styles.editModalInput}
          value={tempMaxValue}
          onChangeText={setTempMaxValue}
          placeholder="Valor máximo..."
          placeholderTextColor="#CCC"
          keyboardType="numeric"
        />
      </View>
      
      <View style={styles.modalButtons}>
        <TouchableOpacity 
          style={[styles.modalButton, styles.cancelButton]}
          onPress={() => setResourceModalVisible(false)}
        >
          <Text style={styles.cancelButtonText}>Cancelar</Text>
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={[styles.modalButton, styles.createButton]}
          onPress={saveResourceEdit}
        >
          <Text style={styles.createButtonText}>Salvar</Text>
        </TouchableOpacity>
      </View>
    </View>
  </View>
</Modal>
{/* Modal para editar nome do npc */}
      <Modal
        visible={editNameModalVisible}
        transparent={true}
        animationType="slide"
        onRequestClose={cancelNameEdit}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.editNameModalContainer}>
            <Text style={styles.editModalTitle}>Editar Nome do Npc</Text>
            
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

      {/* <TouchableOpacity onPress={pickImage}>
        <Image
          source={
            selectedImage
              ? { uri: selectedImage }
              : require("../../../../assets/img/pessoa.png")
          }
          style={styles.imageStyle}
        />
      </TouchableOpacity> */}
      <View style={styles.mainContent}>
          <View style={styles.redView}>
            <Text style={styles.viewTitle}>ATRIBUTOS</Text>  
            <ScrollView contentContainerStyle={styles.redScrollContent}>
<View style={styles.resourcesContainer}>
  {/* Vida */}
  <View style={styles.resourceRow}>
    <Text style={styles.resourceLabel}>Vida:</Text>
    <TouchableOpacity 
      style={styles.progressBarContainer}
      onPress={() => openResourceEditModal('vida', vidaAtual, vida)}
    >
      <View style={[styles.progressBarBackground, styles.lifeBarBackground]}>
        <View style={[styles.progressBarFill, styles.lifeBarFill, { width: `${(vidaAtual / vida) * 100}%` }]} />
        <Text style={styles.progressBarText}>{vidaAtual}/{vida}</Text>
      </View>
    </TouchableOpacity>
  </View>

  {/* Mental */}
  <View style={styles.resourceRow}>
    <Text style={styles.resourceLabel}>Mental:</Text>
    <TouchableOpacity 
      style={styles.progressBarContainer}
      onPress={() => openResourceEditModal('mental', mentalAtual, mental)}
    >
      <View style={[styles.progressBarBackground, styles.mentalBarBackground]}>
        <View style={[styles.progressBarFill, styles.mentalBarFill, { width: `${(mentalAtual / mental) * 100}%` }]} />
        <Text style={styles.progressBarText}>{mentalAtual}/{mental}</Text>
      </View>
    </TouchableOpacity>
  </View>

  {/* Energia */}
  <View style={styles.resourceRow}>
    <Text style={styles.resourceLabel}>Energia:</Text>
    <TouchableOpacity 
      style={styles.progressBarContainer}
      onPress={() => openResourceEditModal('energia', energiaAtual, energia)}
    >
      <View style={[styles.progressBarBackground, styles.energyBarBackground]}>
        <View style={[styles.progressBarFill, styles.energyBarFill, { width: `${(energiaAtual / energia) * 100}%` }]} />
        <Text style={styles.progressBarText}>{energiaAtual}/{energia}</Text>
      </View>
    </TouchableOpacity>
  </View>
</View>


              <View style={styles.verticalLine}/>

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
                    onPress={() => openEditModal('movimento', movimento)}
                  >
                    <Text style={styles.statInputText}>{movimento}</Text>
                  </TouchableOpacity>
                  <Text style={styles.statLabel}>Movimento</Text>
                </View>
              </View>

              <View style={styles.verticalLine}/>

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
        
        
    </View>
    
    </View>
  );
}