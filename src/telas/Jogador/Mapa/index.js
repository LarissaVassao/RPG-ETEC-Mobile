import React, { useState, useRef, useEffect } from 'react';
import {
  StyleSheet,
  TextInput,
  Text,
  View,
  Image,
  PanResponder,
  ScrollView,
  Animated,
  TouchableOpacity, 
  StatusBar,
  ImageBackground,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons'; 
import { styles } from './styles';
import { useUser } from "../../../context/UserContext.js";
import {Picker} from '@react-native-picker/picker';

import url from '../../../../services/url.js';
import api from "../../../../services/api.js";

const TOKEN_IMAGE = require('../../../../assets/img/logo.png');

export default function Mapa({ route, navigation }) {
  const { id } = route.params.id;
  const { user, campanha } = useUser();
  const [personagens, setPersonagens] = useState([]);
  const [bg, setBg] = useState('');
  const [tokens, setTokens] = useState([]);
  const [showGrid, setShowGrid] = useState(false);
  const [gridWidth, setGridWidth] = useState('10');
  const [gridHeight, setGridHeight] = useState('10');
  const [cellSize, setCellSize] = useState('50');
  const [personagemSelecionado, setPersonagemSelecionado] = useState('');
  const [mapaId, setMapaId] = useState(null);

  // Carregar tokens do banco de dados
  const carregarTokens = async (mapaId) => {
    try {
      const res = await api.get("rpgetec/listarTokens.php", {
        params: { id_mapa: mapaId }
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

  // Atualizar posição do token no banco
  const updateTokenPosition = async (tokenId, newX, newY) => {
    try {
      // Atualizar localmente
      setTokens(prev =>
        prev.map(token => token.id === tokenId ? { ...token, x: newX, y: newY } : token)
      );

      // Atualizar no banco
      await api.post("rpgetec/atualizarToken.php", {
        id: tokenId,
        positionX: newX,
        positionY: newY
      });
    } catch (error) {
      console.error("Erro ao atualizar token:", error);
    }
  };

  // Adicionar novo token
  const addToken = async () => {
    if (!personagemSelecionado) {
      alert('Selecione um personagem primeiro!');
      return;
    }

    try {
      const personagem = personagens.find(p => p.id == personagemSelecionado);
      
      const res = await api.post("rpgetec/adicionarToken.php", {
        id_mapa: mapaId,
        id_personagem: personagemSelecionado,
        positionX: 0,
        positionY: 0,
        tokenImage: personagem.tokenImage || 'default.png'
      });

      if (res.data.success) {
        const novoToken = {
          id: res.data.id.toString(),
          id_personagem: parseInt(personagemSelecionado),
          id_npc: null,
          x: 0,
          y: 0,
          tokenImage: personagem.tokenImage,
          nome: personagem.nome
        };
        
        setTokens([...tokens, novoToken]);
        alert('Token adicionado com sucesso!');
      }
    } catch (error) {
      console.error("Erro ao adicionar token:", error);
      alert('Erro ao adicionar token');
    }
  };

  const parsedWidth = parseInt(gridWidth, 10);
  const parsedHeight = parseInt(gridHeight, 10);
  const parsedCellSize = parseInt(cellSize, 10);

  function validate() {
    if (!isNaN(parsedWidth) && !isNaN(parsedHeight) && !isNaN(parsedCellSize)) {
      if (parsedWidth > 0 && parsedHeight > 0 && parsedCellSize > 0) {
        setShowGrid(true);
      } else {
        alert('Todos os valores devem ser positivos!');
      }
    } else {
      alert('Todos os valores devem ser números!');
    }
  }

  useEffect(() => {
    const checarMapa = async () => {
      try {
        console.log("ID:" + id);
        const res = await api.get("rpgetec/checarMapa.php", {
          params: { id_mapa: id }
        });
        
        console.log("RES DATA mapa:" + res.data.mapa);
        const p = res.data.mapa;
        setGridHeight(p['altura']);
        setGridWidth(p['largura']);
        setCellSize(p['cellSize']);
        setBg(p['mapImage']);
        setMapaId(p['id']); // Salvar o ID do mapa
        setShowGrid(true);
        
        // Carregar tokens após carregar o mapa
        carregarTokens(p['id']);
        
        console.log(bg);
      } catch (error) {
        console.error("Erro ao buscar mapa:", error);
      }
    };

    const listarPersonagens = async () => {
      try {
        const res = await api.get("rpgetec/listarPersonagens.php", {
          params: {
            id_campanha: campanha, 
            mestre: route.params.mestre,
            id_usuario: user.id // Adicionar ID do usuário para filtro
          }
        });
        
        if (res.data.success) {
          setPersonagens(res.data.personagens || []);
        } else {
          console.error("Erro ao listar personagens:", res.data.error);
        }
      } catch (error) {
        console.error("Erro ao buscar personagens:", error);
      }
    };

    listarPersonagens();
    checarMapa();
  }, [id, campanha, route.params.mestre, user.id]);

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
        
        <Picker
          selectedValue={personagemSelecionado}
          onValueChange={(itemValue) => setPersonagemSelecionado(itemValue)}
          style={{ flex: 1, backgroundColor: '#fff', marginHorizontal: 10 }}
        >
          <Picker.Item label="Selecione um personagem" value="" />
          {personagens.map((personagem) => (
            <Picker.Item 
              key={personagem.id} 
              label={personagem.nome} 
              value={personagem.id} 
            />
          ))}
        </Picker>
        
        <TouchableOpacity 
          style={styles.createButton}
          onPress={addToken}
        >
          <Ionicons name="add-outline" size={22} color="#fff" />
        </TouchableOpacity>            
      </View>
      
      <View style={styles.he}>
        {!showGrid && (
          <Form
            gridWidth={gridWidth}
            setGridWidth={setGridWidth}
            gridHeight={gridHeight}
            setGridHeight={setGridHeight}
            cellSize={cellSize}
            setCellSize={setCellSize}
            onStart={() => validate()}
          />
        )}

        {showGrid && (
          <ScrollView horizontal>
            <ScrollView>
              <ImageBackground 
                source={{ uri: `${url}rpgetec/mapas/${bg}` }}
                style={{ width: parsedWidth * parsedCellSize, height: parsedHeight * parsedCellSize }}
              >
                <Grid
                  gridWidth={parsedWidth}
                  gridHeight={parsedHeight}
                  cellSize={parsedCellSize}
                />
                
                {tokens.map((token) => (
                  <DraggableToken
                    key={token.id}
                    id={token.id}
                    initialX={token.x}
                    initialY={token.y}
                    cellSize={parsedCellSize}
                    gridWidth={parsedWidth}
                    gridHeight={parsedHeight}
                    tokenImage={token.tokenImage}
                    nome={token.nome}
                    onDrop={updateTokenPosition}
                  />
                ))}
              </ImageBackground>
            </ScrollView>
          </ScrollView>
        )}
      </View>
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

const Form = ({
  gridWidth,
  setGridWidth,
  gridHeight,
  setGridHeight,
  cellSize,
  setCellSize,
  onStart,
}) => {
  return (
    <View style={styles.formContainer}>
      <Text style={styles.label}>Largura</Text>
      <TextInput
        style={styles.input}
        value={gridWidth}
        onChangeText={setGridWidth}
        keyboardType="numeric"
        placeholder="e.g. 8"
      />

      <Text style={styles.label}>Altura</Text>
      <TextInput
        style={styles.input}
        value={gridHeight}
        onChangeText={setGridHeight}
        keyboardType="numeric"
        placeholder="e.g. 8"
      />

      <Text style={styles.label}>Tamanho do Quadrado</Text>
      <TextInput
        style={styles.input}
        value={cellSize}
        onChangeText={setCellSize}
        keyboardType="numeric"
        placeholder="e.g. 40"
      />

      <TouchableOpacity style={styles.button} onPress={onStart}>
        <Text style={styles.buttonText}>Mostrar Mapa</Text>
      </TouchableOpacity>
    </View>
  );
};

const DraggableToken = ({ id, initialX, initialY, cellSize, gridWidth, gridHeight, tokenImage, nome, onDrop }) => {
  const pan = useRef(
    new Animated.ValueXY({
      x: initialX * cellSize,
      y: initialY * cellSize,
    })
  ).current;

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
      onPanResponderRelease: () => {
        pan.flattenOffset();

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
      },
    })
  ).current;

  // Usar imagem do token se disponível, senão usar a padrão
  const imageSource = tokenImage 
    ? { uri: `${url}rpgetec/tokens/${tokenImage}` }
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