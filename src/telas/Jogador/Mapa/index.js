import React, { useState, useRef, useEffect } from 'react';
import {
  Text,
  View,
  Image,
  PanResponder,
  ScrollView,
  Animated,
  TouchableOpacity, 
  StatusBar,
  ImageBackground,
  ActivityIndicator,
  Alert,
  Modal,
  FlatList
} from 'react-native';
import { Ionicons } from '@expo/vector-icons'; 
import { styles, modalStyles } from './styles'; // Importação dos estilos externos
import { useUser } from "../../../context/UserContext.js";

import url from '../../../../services/url.js';
import api from "../../../../services/api.js";

const TOKEN_IMAGE = require('../../../../assets/img/logo.png');

export default function Mapa({ route, navigation }) {
  const mapaId = route.params?.id || (route.params && route.params.id);
  const { user, campanha } = useUser();
  const [personagens, setPersonagens] = useState([]);
  const [bg, setBg] = useState('');
  const [tokens, setTokens] = useState([]);
  const [showGrid, setShowGrid] = useState(false);
  const [gridWidth, setGridWidth] = useState(20);
  const [gridHeight, setGridHeight] = useState(20);
  const [cellSize, setCellSize] = useState(50);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  
  // Estados para o modal
  const [modalVisible, setModalVisible] = useState(false);
  const [tokenOptions, setTokenOptions] = useState([]);
// Estados para o modal de contexto
  const [contextModalVisible, setContextModalVisible] = useState(false);
  const [selectedToken, setSelectedToken] = useState(null);
  // Carregar tokens do banco de dados
  const carregarTokens = async (idMapa) => {
    try {
      const res = await api.get("rpgetec/listarTokens.php", {
        params: { id_mapa: idMapa }
      });
      
      if (res.data.success) {
        const tokensFormatados = res.data.tokens.map(token => ({
          id: token.id.toString(),
          id_personagem: token.id_personagem,
          id_npc: token.id_npc,
          x: token.positionX || 0,
          y: token.positionY || 0,
          tokenImage: token.tokenImage,
          nome: token.nome || 'Token'
        }));
        setTokens(tokensFormatados);
      }
    } catch (error) {
      console.error("Erro ao carregar tokens:", error);
    }
  };

  // Preparar opções de tokens (personagens + token default)
  const prepararOpcoesTokens = () => {
    const opcoes = [
      {
        id: 'default',
        nome: 'Token Padrão',
        tipo: 'default',
        tokenImage: 'default.png'
      },
      ...personagens.map(p => ({
        id: p.id.toString(),
        nome: p.nome,
        tipo: 'personagem',
        tokenImage: p.profileImage || 'default.png'
      }))
    ];
        console.log(personagens);
    setTokenOptions(opcoes);
  };

    // Deletar token
const deletarToken = async () => {
  if (!selectedToken) return;
  
  try {
    const res = await api.post("rpgetec/deletarToken.php", {
      id: selectedToken.id
    });

    if (res.data.success) {
      setTokens(tokens.filter(token => token.id !== selectedToken.id));
      setContextModalVisible(false);

    }
  } catch (error) {
    console.error("Erro ao deletar token:", error);
    Alert.alert('Erro', 'Não foi possível remover o token');
  }
};

  // Ir para ficha do personagem
const irParaFicha = () => {
  if (!selectedToken) return;
  
  // TODO: Implementar navegação para ficha do personagem
  // navigation.navigate('FichaPersonagem', { id: selectedToken.id });
  
  Alert.alert('Aviso', 'Navegação para ficha do personagem será implementada aqui');
  setContextModalVisible(false);
};

  // Abrir modal para seleção de token
  const abrirModalToken = () => {
    if (personagens.length === 0) {
      Alert.alert('Atenção', 'Não há personagens disponíveis para adicionar como token.');
      return;
    }
    prepararOpcoesTokens();
    setModalVisible(true);
  };

  // Adicionar novo token
// Adicionar novo token - FUNÇÃO CORRIGIDA
const adicionarToken = async (tokenSelecionado) => {
  try {
    let tokenData = {
      id_mapa: mapaId,
      positionX: 0,
      positionY: 0,
      tokenImage: tokenSelecionado.tokenImage // Apenas fallback
    };

    // Se for um personagem, adiciona id_personagem (o PHP vai buscar a imagem)
    if (tokenSelecionado.tipo === 'personagem') {
      tokenData.id_personagem = tokenSelecionado.id;
      tokenData.id_npc = null;
    } else {
      // Token padrão - usa a imagem default
      tokenData.id_personagem = null;
      tokenData.id_npc = null;
      tokenData.tokenImage = 'default.png';
    }

    const res = await api.post("rpgetec/adicionarToken.php", tokenData);

    if (res.data.success) {
      const novoToken = {
        id: res.data.id.toString(),
        id_personagem: tokenData.id_personagem,
        id_npc: tokenData.id_npc,
        x: 0,
        y: 0,
        tokenImage: res.data.tokenImage || tokenSelecionado.tokenImage, // Usa a imagem do response
        nome: tokenSelecionado.nome
      };
      
      setTokens([...tokens, novoToken]);
      setModalVisible(false);
      Alert.alert('Sucesso', `Token "${tokenSelecionado.nome}" adicionado com sucesso!`);
    }
  } catch (error) {
    console.error("Erro ao adicionar token:", error);
    Alert.alert('Erro', 'Não foi possível adicionar o token');
  }
};

  // Atualizar posição do token no banco
  const updateTokenPosition = async (tokenId, newX, newY) => {
    try {
      setTokens(prev =>
        prev.map(token => token.id === tokenId ? { ...token, x: newX, y: newY } : token)
      );

      await api.post("rpgetec/atualizarToken.php", {
        id: tokenId,
        positionX: newX,
        positionY: newY
      });
    } catch (error) {
      console.error("Erro ao atualizar token:", error);
    }
  };

  useEffect(() => {
    const carregarDados = async () => {
      try {
        setLoading(true);
        setError('');

        console.log("🔄 Iniciando carregamento do mapa ID:", mapaId);

        // 1. Carregar dados do mapa
        const resMapa = await api.get("rpgetec/checarMapa.php", {
          params: { id_mapa: mapaId }
        });
        
        console.log("📦 Resposta da API:", resMapa.data);

        if (!resMapa.data || !resMapa.data.success) {
          throw new Error(resMapa.data?.error || 'Erro ao carregar mapa');
        }

        const mapaData = resMapa.data.mapa;
        
        if (!mapaData) {
          throw new Error('Dados do mapa não encontrados na resposta');
        }

        const altura = parseInt(mapaData.altura) || 20;
        const largura = parseInt(mapaData.largura) || 20;
        const cellSizeVal = parseInt(mapaData.cellSize) || 50;
        const mapImage = mapaData.mapImage || '';

        console.log(`✅ Dados recebidos - Largura: ${largura}, Altura: ${altura}, CellSize: ${cellSizeVal}`);

        setGridHeight(altura);
        setGridWidth(largura);
        setCellSize(cellSizeVal);
        setBg(mapImage);
        
        // 2. Carregar tokens
        await carregarTokens(mapaId);

        // 3. Carregar personagens
        const resPersonagens = await api.get("rpgetec/listarPersonagens.php", {
          params: {
            id_campanha: campanha, 
            mestre: route.params?.mestre || false,
            id_usuario: user.id
          }
        });
        
        if (resPersonagens.data.success) {
          setPersonagens(resPersonagens.data.personagens || []);
        }

        setShowGrid(true);
        
      } catch (error) {
        console.error("Erro ao carregar dados:", error);
        setError('Erro: ' + error.message);
      } finally {
        setLoading(false);
      }
    };

    if (mapaId && campanha && user?.id) {
      carregarDados();
    } else {
      setError('Dados insuficientes para carregar o mapa');
      setLoading(false);
    }
  }, [mapaId, campanha, user?.id]);

  // Item do modal
 // Item do modal - CORRIGIDO
const renderTokenItem = ({ item }) => (
  <TouchableOpacity
    style={modalStyles.tokenItem}
    onPress={() => adicionarToken(item)}
  >
    <Image 
      source={item.tokenImage && item.tokenImage !== 'default.png' 
        ? { uri: `${url}rpgetec/perfil/${item.tokenImage}` } // ← MUDOU AQUI
        : TOKEN_IMAGE
      }
      style={modalStyles.tokenImage}
    />
    <View style={modalStyles.tokenInfo}>
      <Text style={modalStyles.tokenName}>{item.nome}</Text>
      <Text style={modalStyles.tokenType}>
        {item.tipo === 'default' ? 'Token Padrão' : 'Personagem'}
      </Text>
    </View>
    <Ionicons name="chevron-forward" size={20} color="#666" />
  </TouchableOpacity>
);

  if (loading) {
    return (
      <View style={styles.container}>
        <StatusBar backgroundColor="#124A69" barStyle="light-content" />
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#124A69" />
          <Text style={styles.loadingText}>Carregando mapa...</Text>
        </View>
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.container}>
        <StatusBar backgroundColor="#124A69" barStyle="light-content" />
        <View style={styles.errorContainer}>
          <Ionicons name="alert-circle-outline" size={50} color="#ff6b6b" />
          <Text style={styles.errorText}>{error}</Text>
          <TouchableOpacity 
            style={styles.retryButton}
            onPress={() => navigation.goBack()}
          >
            <Text style={styles.retryButtonText}>Voltar</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <StatusBar backgroundColor="#124A69" barStyle="light-content" />       
      <View style={styles.header}>
        <TouchableOpacity 
          style={styles.backButton}
          onPress={() => navigation.navigate("TelaCampanha")}
        >
          <Ionicons name="arrow-back-outline" size={20} color="#fff" />
        </TouchableOpacity>
        
        <Text style={styles.headerTitle}>MAPA</Text>
        
        <TouchableOpacity 
          style={styles.createButton}
          onPress={abrirModalToken}
        >
          <Ionicons name="add-outline" size={22} color="#fff" />
        </TouchableOpacity>            
      </View>
      
      <View style={styles.he}>
        {showGrid && (
          <ScrollView 
            horizontal
            style={styles.mapScrollView}
            contentContainerStyle={{ flexGrow: 1 }}
          >
            <ScrollView
              style={styles.mapScrollView}
              contentContainerStyle={{ flexGrow: 1 }}
            >
              <ImageBackground 
                source={bg ? { uri: `${url}rpgetec/mapas/${bg}` } : null}
                style={{ 
                  width: gridWidth * cellSize, 
                  height: gridHeight * cellSize,
                  backgroundColor: bg ? 'transparent' : '#f0f0f0',
                  minWidth: '100%',
                  minHeight: '100%',
                }}
              >
                <Grid
                  gridWidth={gridWidth}
                  gridHeight={gridHeight}
                  cellSize={cellSize}
                />
                
                {tokens.map((token) => (
                <DraggableToken
                  key={token.id}
                  id={token.id}
                  initialX={token.x}
                  initialY={token.y}
                  cellSize={cellSize}
                  gridWidth={gridWidth}
                  gridHeight={gridHeight}
                  tokenImage={token.tokenImage}
                  nome={token.nome}
                  onDrop={updateTokenPosition}
                  onDoubleTap={setSelectedToken} // ← ADICIONAR ESTA PROP
                  onOpenContextMenu={setContextModalVisible} // ← ADICIONAR ESTA PROP
                />
              ))}
              </ImageBackground>
            </ScrollView>
          </ScrollView>
        )}
      </View>

      {/* Modal de seleção de token */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={modalStyles.modalContainer}>
          <View style={modalStyles.modalContent}>
            <View style={modalStyles.modalHeader}>
              <Text style={modalStyles.modalTitle}>Adicionar Token</Text>
              <TouchableOpacity 
                onPress={() => setModalVisible(false)}
                style={modalStyles.closeButton}
              >
                <Ionicons name="close" size={24} color="#666" />
              </TouchableOpacity>
            </View>
            
            <FlatList
              data={tokenOptions}
              renderItem={renderTokenItem}
              keyExtractor={(item) => item.id}
              style={modalStyles.tokenList}
              ListEmptyComponent={
                <Text style={modalStyles.emptyText}>
                  Nenhum personagem disponível
                </Text>
              }
            />
          </View>
        </View>
      </Modal>
      
    <Modal
      animationType="fade"
      transparent={true}
      visible={contextModalVisible}
      onRequestClose={() => setContextModalVisible(false)}
    >
      <View style={modalStyles.contextModalContainer}>
        <View style={modalStyles.contextModalContent}>
          <Text style={modalStyles.contextModalTitle}>
            {selectedToken?.nome || 'Token'}
          </Text>
          
          {/* <TouchableOpacity 
            style={modalStyles.contextMenuItem}
            onPress={irParaFicha}
          >
            <Ionicons name="person-outline" size={20} color="#124A69" />
            <Text style={modalStyles.contextMenuText}>Ver Ficha</Text>
          </TouchableOpacity> */}
          
          <TouchableOpacity 
            style={[modalStyles.contextMenuItem, modalStyles.contextMenuDelete]}
            onPress={deletarToken}
          >
            <Ionicons name="trash-outline" size={20} color="#ff6b6b" />
            <Text style={[modalStyles.contextMenuText, modalStyles.contextMenuDeleteText]}>
              Deletar Token
            </Text>
          </TouchableOpacity>
          
          <TouchableOpacity 
            style={modalStyles.contextMenuCancel}
            onPress={() => setContextModalVisible(false)}
          >
            <Text style={modalStyles.contextMenuCancelText}>Cancelar</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  </View>
);
}

const Grid = ({ gridWidth, gridHeight, cellSize }) => {
  return (
    <View style={{ flexDirection: 'column' }}>
      {Array.from({ length: gridHeight }).map((_, row) => (
        <View style={{ flexDirection: 'row' }} key={`row-${row}`}>
          {Array.from({ length: gridWidth }).map((_, col) => (
            <View
              key={`cell-${row}-${col}`}
              style={{
                width: cellSize,
                height: cellSize,
                borderWidth: 0.2,
                borderColor: '#cccccc50',
              }}
            />
          ))}
        </View>
      ))}
    </View>
  );
};

const DraggableToken = ({ 
  id, 
  initialX, 
  initialY, 
  cellSize, 
  gridWidth, 
  gridHeight, 
  tokenImage, 
  nome, 
  onDrop,
  onDoubleTap, // ← ADICIONAR ESTA PROP
  onOpenContextMenu // ← ADICIONAR ESTA PROP
}) => {
  const pan = useRef(
    new Animated.ValueXY({
      x: initialX * cellSize,
      y: initialY * cellSize,
    })
  ).current;

  const lastTap = useRef(0);
  const tapTimeout = useRef(null);

  const handleTap = () => {
    const now = Date.now();
    if (lastTap.current && (now - lastTap.current) < 300) {
      // Duplo clique detectado
      clearTimeout(tapTimeout.current);
      onDoubleTap?.({ id, nome, tokenImage }); // ← USAR A PROP
      onOpenContextMenu?.(true); // ← USAR A PROP
    } else {
      lastTap.current = now;
      tapTimeout.current = setTimeout(() => {
        lastTap.current = 0;
      }, 300);
    }
  };

  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onPanResponderGrant: () => {
        pan.setOffset({ x: pan.x._value, y: pan.y._value });
        pan.setValue({ x: 0, y: 0 });
      },
      onPanResponderMove: Animated.event([null, { dx: pan.x, dy: pan.y }], {
        useNativeDriver: false,
      }),
      onPanResponderRelease: (evt, gestureState) => {
        pan.flattenOffset();

        // Verificar se foi um toque simples (não arraste)
        if (Math.abs(gestureState.dx) < 5 && Math.abs(gestureState.dy) < 5) {
          handleTap();
        } else {
          // Foi um arraste - atualizar posição
          const newX = Math.min(
            gridWidth - 1,
            Math.max(0, Math.round(pan.x._value / cellSize))
          );
          const newY = Math.min(
            gridHeight - 1,
            Math.max(0, Math.round(pan.y._value / cellSize))
          );

          Animated.spring(pan, {
            toValue: { x: newX * cellSize, y: newY * cellSize },
            useNativeDriver: false,
          }).start();

          onDrop?.(id, newX, newY);
        }
      },
    })
  ).current;

  const imageSource = tokenImage && tokenImage !== 'default.png'
    ? { uri: `${url}rpgetec/perfil/${tokenImage}` }
    : TOKEN_IMAGE;

  return (
    <Animated.View
      {...panResponder.panHandlers}
      style={[
        pan.getLayout(),
        {
          position: 'absolute',
          width: cellSize,
          height: cellSize,
          justifyContent: 'center',
          alignItems: 'center',
        },
      ]}
    >
      <Image 
        source={imageSource} 
        style={{ 
          width: cellSize - 4, 
          height: cellSize - 4,
          borderRadius: cellSize / 2,
          borderWidth: 2,
          borderColor: '#fff'
        }} 
      />
    </Animated.View>
  );
};