import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Image, Platform, Text, TextInput, StatusBar, TouchableOpacity, ScrollView, Modal, Alert} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Picker } from "@react-native-picker/picker";
import { styles} from './styles';
import { useUser } from "../../../context/UserContext.js";

import * as ImagePicker from "expo-image-picker";
import api from "../../../../services/api.js";
import url from "../../../../services/url.js";

export default function Personagem({ route, navigation }) {
  const [activeView, setActiveView] = useState('red'); 
  const { user } = useUser();
  const [rpgEquipments, setRpgEquipments] = useState([
    // {
    //   id: 1,
    //   name: "Espada Longa",
    //   type: "arma",
    //   price: 150,
    //   weight: 2.5,
    //   description: "Uma espada longa forjada em aço de alta qualidade. Ideal para combate corpo a corpo.",
    // },
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
  const { idPersonagem } = route.params;
    console.log("====PERSONAGEM====, id: " + idPersonagem);
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
  const [carga, setCarga] = useState(0);
  const [cargaAtual, setCargaAtual] = useState(50);
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

  const [backgroundModalVisible, setBackgroundModalVisible] = useState(false);
  const [selectedbackground, setSelectedBackground] = useState('');
  // Estados para as pericias
  const [pericias, setPericias] = useState({});

  // Estados para o nome do personagem e modal
  const [characterName, setCharacterName] = useState('Nome do Personagem');
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
    
    const res = await api.get("rpgetec/checarPersonagem.php", {
      params: { id_personagem: idPersonagem }
    });

    if (res.data.success) {
      const personagem = res.data.personagem;
      
      if (personagem.profileImage) {
        // Construir a URL completa da imagem
        const imageUrl = `${url}rpgetec/perfil/${personagem.profileImage}`;
        console.log("URL da imagem:", imageUrl);
        setSelectedImage(imageUrl);
      } else {
        console.log("Personagem não tem imagem de perfil");
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
      name: `personagem_${idPersonagem}_${Date.now()}.jpg`,
    });
    
    formData.append('id_personagem', idPersonagem.toString());

<<<<<<< HEAD
    // Use fetch (works reliably in Expo)
    const response = await fetch(`${url}rpgetec/upload.php`, {
      method: "POST",
      body: formData,
=======
    console.log("FormData criado, enviando para API...");

    // 🔥 USAR api (axios) que já funciona para os outros endpoints
    const response = await api.post("rpgetec/upload.php", formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
      timeout: 30000,
      // ⚠️ IMPORTANTE: TransformRequest para axios com FormData
      transformRequest: (data) => data,
>>>>>>> e605451d8deb10ecb7337b2dc6006819df02b2f1
    });

    console.log("✅ Resposta do servidor:", response.data);

    if (response.data.success) {
      Alert.alert("Sucesso", "Imagem do personagem atualizada!");
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
  const checarPersonagem = async () => {
    try {
      const res = await api.get("rpgetec/checarPersonagem.php", {
        params: { id_personagem: idPersonagem }
      });

      if (res.data.success) {
        const p = res.data.personagem;
        
        // Seus estados existentes...
        setVida(p.vida);
        setVidaAtual(p.vidaAtual || p.vida);
        setMental(p.mental);
        setMentalAtual(p.mentalAtual || p.mental);
        setEnergia(p.energia);
        setEnergiaAtual(p.energiaAtual || p.energia);
        setCa(p.ca);
        setCarga(p.carga);
        setCargaAtual(p.cargaAtual);
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
      console.error("Erro ao buscar personagem:", error);
    }
  };

  checarPersonagem();
}, [idPersonagem]); // Remova 'vida' e 'background' se não forem necessários
        
  

  const handleButtonPress = (color) => {
    setActiveView(color);
  };

const carregarEquipamentos = async () => {
    try {
      const res = await api.get("rpgetec/listarEquipamentos.php", {
        params: { id_personagem: idPersonagem }
      });
      
      if (res.data.success) {
        setRpgEquipments(res.data.equipamentos);
      }
    } catch (error) {
      console.error("Erro ao carregar equipamentos:", error);
    }
  };

  useEffect(() => {
    carregarEquipamentos();
  }, [idPersonagem]);

  const handleTypeChange = (itemId, newType) => {
    setRpgEquipments(prev => prev.map(item => 
      item.id === itemId ? { ...item, type: newType } : item
    ));
  };

  const openbackgroundModal = () => {
    setSelectedBackground(background);
    setBackgroundModalVisible(true);
  };
  // Função para salvar o antepassado selecionada
  const savebackgroundSelection = () => {
    setBackground(selectedbackground);
    setBackgroundModalVisible(false);
  };

  const handleCreateEquipment = async () => {
    if (!newEquipment.name.trim()) {
      alert('Por favor, digite um nome para o equipamento');
      return;
    }

    try {
      const res = await api.post("rpgetec/criarEquipamento.php", {
        id_personagem: idPersonagem,
        nome: newEquipment.name,
        tipo: newEquipment.type,
        preco: parseInt(newEquipment.price) || 0,
        volume: parseFloat(newEquipment.weight) || 0,
        descricao: newEquipment.description,
        requisito: newEquipment.requirement,
        dano: newEquipment.damage,
        critico: newEquipment.critical,
      });

      if (res.data.success) {
        // Recarregar a lista de equipamentos
        await carregarEquipamentos();
        
        // Resetar formulário
        setNewEquipment({
          name: '',
          type: 'item',
          description: '',
          requirement: '',
          damage: '',
          critical: '',
          price: 0,
          weight: 0
        });
        setCreateModalVisible(false);
        alert('Equipamento criado com sucesso!');
      } else {
        alert('Erro ao criar equipamento: ' + res.data.error);
      }
    } catch (error) {
      console.error("Erro ao criar equipamento:", error);
      alert('Erro ao criar equipamento');
    }
  };

  
  
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
    const res = await api.get("rpgetec/alterarPersonagem.php", {
      params: {
        id_personagem: idPersonagem,
        valor: newCurrent,
        atributo: `${editingResource}Atual`,
      },
    });

    const resMax = await api.get("rpgetec/alterarPersonagem.php", {
      params: {
        id_personagem: idPersonagem,
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
      const res = await api.get("rpgetec/alterarPersonagem.php", {
        params: {
          id_personagem: idPersonagem,
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
      const res = await api.get("rpgetec/alterarPersonagem.php", {
        params: {
          id_personagem: idPersonagem,
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
          case 'carga': setCarga(tempValue); break;
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
      console.error("Erro ao alterar personagem:", error);
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

const handleDeleteEquipment = async (itemId) => {
    try {
      Alert.alert(
        "Confirmar Exclusão",
        "Tem certeza que deseja excluir este equipamento?",
        [
          {
            text: "Cancelar",
            style: "cancel"
          },
          {
            text: "Excluir",
            onPress: async () => {
              const res = await api.post("rpgetec/deletarEquipamento.php", {
                id_equipamento: itemId
              });

              if (res.data.success) {
                // Recarregar a lista de equipamentos
                await carregarEquipamentos();
                alert('Equipamento excluído com sucesso!');
              } else {
                alert('Erro ao excluir equipamento: ' + res.data.error);
              }
            }
          }
        ]
      );
    } catch (error) {
      console.error("Erro ao deletar equipamento:", error);
      alert('Erro ao deletar equipamento');
    }
  };

const handleUpdateEquipment = async () => {
    if (!editingEquipment?.name?.trim()) {
      alert('Por favor, digite um nome para o equipamento');
      return;
    }

    try {
      const res = await api.post("rpgetec/atualizarEquipamento.php", {
        id_equipamento: editingEquipment.id,
        nome: editingEquipment.name,
        tipo: editingEquipment.type,
        preco: parseInt(editingEquipment.price) || 0,
        volume: parseFloat(editingEquipment.weight) || 0,
        descricao: editingEquipment.description,
        requisito: editingEquipment.requirement,
        dano: editingEquipment.damage,
        critico: editingEquipment.critical,
      });

      if (res.data.success) {
        // Recarregar a lista de equipamentos
        await carregarEquipamentos();
        
        setEditEquipmentModalVisible(false);
        setEditingEquipment(null);
        alert('Equipamento atualizado com sucesso!');
      } else {
        alert('Erro ao atualizar equipamento: ' + res.data.error);
      }
    } catch (error) {
      console.error("Erro ao atualizar equipamento:", error);
      alert('Erro ao atualizar equipamento');
    }
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
      {/* Modal para seleção de antepassado */}
      <Modal
        visible={backgroundModalVisible}
        transparent={true}
        animationType="slide"
        onRequestClose={() => setBackgroundModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.editModalContainer}>
            <Text style={styles.editModalTitle}>Selecionar Antepassado</Text>
            
            <View style={styles.pickerContainer}>
              <Picker
                selectedValue={selectedbackground}
                style={styles.picker}
                onValueChange={(itemValue) => setSelectedBackground(itemValue)}
              >
                <Picker.Item label="Selecione um Antepassado" value="" />
                <Picker.Item label="Médico" value="Médico" />
                <Picker.Item label="Professor" value="Professor" />
                <Picker.Item label="Engenheiro" value="Engenheiro" />
                <Picker.Item label="Soldado" value="Soldado" />
                <Picker.Item label="Cientista" value="Cientista" />
                <Picker.Item label="Técnico" value="Técnico" />
                <Picker.Item label="Piloto" value="Piloto" />
                <Picker.Item label="Investigador" value="Investigador" />
              </Picker>
            </View>
            
            <View style={styles.modalButtons}>
              <TouchableOpacity 
                style={[styles.modalButton, styles.cancelButton]}
                onPress={() => setBackgroundModalVisible(false)}
              >
                <Text style={styles.cancelButtonText}>Cancelar</Text>
              </TouchableOpacity>
              
              <TouchableOpacity 
                style={[styles.modalButton, styles.createButton]}
                onPress={savebackgroundSelection}
              >
                <Text style={styles.createButtonText}>Salvar</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>

      <View style={styles.characterBase}>

        <View style={styles.backgroundCharacter}>
          <View style={styles.backgroundContainer}>
            <View style={styles.occupationItem}>
              {/* <Text style={styles.occupationLabel}>Antepassado:</Text>
              <TouchableOpacity 
                style={styles.occupationInputTouchable}
                onPress={openbackgroundModal}
              >
                <Text style={styles.occupationText}>{background || 'Selecione aqui'}</Text>
              </TouchableOpacity>
            </View> */}

            <View style={styles.occupationItem}>
              <Text style={styles.occupationLabel}>Antepassado:</Text>
              {/* <TextInput 
                style={styles.occupationInput}
                placeholder="Ex: 1"
                placeholderTextColor="#666"
                keyboardType="numeric"
              /> */}
              <Text
              style={styles.occupationInput}
              >{background}</Text>
            </View>
          </View>
            
            <View style={styles.occupationItem}>
              <Text style={styles.occupationLabel}>Nível:</Text>
              {/* <TextInput 
                style={styles.occupationInput}
                placeholder="Ex: 1"
                placeholderTextColor="#666"
                keyboardType="numeric"
              /> */}
              <Text
              style={styles.occupationInput}
              >{level}</Text>
            </View>
          </View>
</View>
      </View>
      
      <TouchableOpacity onPress={pickImage}>
        <Image
          source={
            selectedImage
              ? { uri: selectedImage }
              : require("../../../../assets/img/pessoa.png")
          }
          style={styles.imageStyle}
        />
      </TouchableOpacity>

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

<<<<<<< HEAD
                    <TouchableOpacity 
                      style={styles.resourceInputTouchable}
                      onPress={() => openEditModal('vida', vida)}
                    >
                      <Text style={styles.resourceInputText}>{vidaAtual}/{vida}</Text>
                    </TouchableOpacity>
 
                </View>

                <View style={styles.resourceRow}>
                  <Text style={styles.resourceLabel}>Mental:</Text>
                    <TouchableOpacity 
                      style={styles.resourceInputTouchable}
                      onPress={() => openEditModal('mental', mental)}
                    >
                      <Text style={styles.resourceInputText}>{mentalAtual}/{mental}</Text>
                    </TouchableOpacity>

                
                </View>

                <View style={styles.resourceRow}>
                  <Text style={styles.resourceLabel}>Energia:</Text>
                  <TouchableOpacity 
                      style={styles.resourceInputTouchable}
                      onPress={() => openEditModal('energia', energia)}
                    >
                      <Text style={styles.resourceInputText}>{energiaAtual}/{energia}</Text>
                    </TouchableOpacity>
                 
                </View>
              </View>
=======
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

>>>>>>> e605451d8deb10ecb7337b2dc6006819df02b2f1

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
        }
        {activeView === 'green' && (
          <View style={styles.greenView}>
            <Text style={styles.viewTitle}>PERÍCIA</Text>
            <ScrollView contentContainerStyle={styles.scrollContent}>
{/* Loop em ordem alfabética */}
              {Object.entries(pericias)
                .sort(([a], [b]) => a.localeCompare(b))
                .map(([nome, valor]) => (
                  <View key={nome} style={styles.skillContainer}>
                    <View style={styles.skillBackground}>
                      <Text style={styles.skillText}>{nome}</Text>
                      <TouchableOpacity
                        style={styles.skillInputTouchable}
                        onPress={() => openEditModal(nome, valor)}
                      >
                        <Text style={styles.skillInputText}>{valor}</Text>
                      </TouchableOpacity>
                    </View>
                  </View>
              ))}

            </ScrollView>
          </View>
        )}
           
      {activeView === 'blue' && 
        <View style={styles.blueView}>
          <Text style={styles.viewTitle}>INVENTÁRIO</Text>    

            <View style={styles.resourcesContainer}>
              <View style={styles.resourceRow}>
                <Text style={styles.resourceLabel}>Crédito:</Text>
                <TouchableOpacity 
                  style={styles.progressBarContainer}
                  onPress={() => openResourceEditModal('credito', credito, creditoMax)}
                >
                  <View style={[styles.progressBarBackground, styles.creditBarBackground]}>
                    <View style={[styles.progressBarFill, styles.creditBarFill, { width: `${(credito / creditoMax) * 100}%` }]} />
                    <Text style={styles.progressBarText}>{credito}/{creditoMax}</Text>
                  </View>
                </TouchableOpacity>
              </View>
            </View>

          <TouchableOpacity 
            style={styles.createItemButton}
            onPress={() => setCreateModalVisible(true)}
          >
            <Ionicons name="add-outline" size={20} color="#e8ffff" style={styles.createItemIcon} />
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
                      <Ionicons name="pencil-outline" size={20} color="#e8ffff" />
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

              <View style={styles.inputGroup}>
                <Text style={styles.inputLabel}>Preço (Créditos)</Text>
                <TextInput
                  style={styles.textInput}
                  value={newEquipment.price.toString()}
                  onChangeText={(text) => setNewEquipment({...newEquipment, price: text})}
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
                  onChangeText={(text) => setNewEquipment({...newEquipment, weight: text})}
                  placeholder="Digite o volume/peso"
                  placeholderTextColor="#888"
                  keyboardType="numeric"
                />
              </View>

              {(newEquipment.type === 'arma_curta' || newEquipment.type === 'arma_longa') && (
                <>
                  <View style={styles.inputGroup}>
                    <Text style={styles.inputLabel}>Requisição para uso</Text>
                    <TextInput
                      style={styles.textInput}
                      value={newEquipment.requirement}
                      onChangeText={(text) => setNewEquipment({ ...newEquipment, requirement: text })}
                      placeholder="Ex: Força 2+"
                      placeholderTextColor="#888"
                    />
                  </View>

                  <View style={styles.inputGroup}>
                    <Text style={styles.inputLabel}>Dano da Arma</Text>
                    <TextInput
                      style={styles.textInput}
                      value={newEquipment.damage}
                      onChangeText={(text) => setNewEquipment({...newEquipment, damage: text})}
                      placeholder="Ex: 1d6"
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

                  <ScrollView 
                    style={styles.createModalScroll}
                    contentContainerStyle={styles.createModalScrollContent}
                  >
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
                            placeholder="Ex: Força 2+"
                            placeholderTextColor="#888"
                          />
                        </View>

                        <View style={styles.inputGroup}>
                          <Text style={styles.inputLabel}>Dano da Arma</Text>
                          <TextInput
                            style={styles.textInput}
                            value={editingEquipment?.damage || ''}
                            onChangeText={(text) => setEditingEquipment({ ...editingEquipment, damage: text })}
                            placeholder="Ex: 1d6"
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
                    <ScrollView 
                      style={styles.modalContentScroll}
                      contentContainerStyle={styles.modalContentContainer}
                    >
                      
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

                      <View style={styles.modalInfoRow}>
                        <Text style={styles.modalLabel}>Valor:</Text>
                        <Text style={styles.modalValue}>
                          {selectedItem.price} <Text style={styles.credit}>créditos</Text>
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
                    {aparencia.personalidade || 'Descreva a personalidade e traços característicos...'}
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