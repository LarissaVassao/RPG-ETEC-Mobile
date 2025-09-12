import React, { useState, useRef } from 'react';
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
} from 'react-native';
import { Ionicons } from '@expo/vector-icons'; 
import { styles } from './styles';


const TOKEN_IMAGE = require('../../../../assets/img/logo.png');

export default function Mapa({ navigation }) {
  const [tokens, setTokens] = useState([]);
  const [showGrid, setShowGrid] = useState(false);
  const [gridWidth, setGridWidth] = useState('10');
  const [gridHeight, setGridHeight] = useState('10');
  const [cellSize, setCellSize] = useState('50');

const updateTokenPosition = (id, newX, newY) => {
  setTokens(prev =>
    prev.map(token => token.id === id ? { ...token, x: newX, y: newY } : token)
  );
};

  const addToken = () => {
    const id = Date.now().toString();
    setTokens([...tokens, { id, x: 1, y: 1 }]);
  };

  const parsedWidth = parseInt(gridWidth, 10);
  const parsedHeight = parseInt(gridHeight, 10);
  const parsedCellSize = parseInt(cellSize, 10);

  function validate() {
    if (
      !isNaN(parsedWidth) &&
      !isNaN(parsedHeight) &&
      !isNaN(parsedCellSize)
    ) {
      if (parsedWidth > 0 && parsedHeight > 0 && parsedCellSize > 0) {
        setShowGrid(true);
      } else {
        alert('Todos os valores devem ser positivos!');
      }
    } else {
      alert('Todos os valores devem ser números!');
    }
  }

  return (
    <View style={styles.container}>
      <StatusBar backgroundColor="#124A69" barStyle="light-content" />
                  
                  <View style={styles.header}>
                      <TouchableOpacity 
                          style={styles.backButton}
                          onPress={() => navigation.navigate("Home")}
                      >
                          <Ionicons name="arrow-back-outline" size={20} color="#fff" />
                      </TouchableOpacity>
                      
                      <Text style={styles.headerTitle}>MAPA</Text>
                      
                      
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
        <>
        <ScrollView horizontal>
        <ScrollView>
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
              onDrop={updateTokenPosition}
            />
          ))}
          <View style={styles.buttonsContainer}>
            <TouchableOpacity style={styles.button} onPress={addToken}>
              <Text style={styles.buttonText}>Criar Token</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.button} onPress={() => setShowGrid(false)}>
              <Text style={styles.buttonText}>Alterar Mapa</Text>
            </TouchableOpacity>
          </View>
          </ScrollView>
          </ScrollView>
        </>
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
                borderWidth: 1,
                borderColor: '#ccc',
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

const DraggableToken = ({id, initialX, initialY, cellSize, gridWidth, gridHeight, onDrop }) => {
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

  return (
    <Animated.View
      {...panResponder.panHandlers}
      style={[
        pan.getLayout(),
        {
          position: 'absolute',
          width: cellSize,
          height: cellSize,
        },
      ]}
    >
      <Image source={TOKEN_IMAGE} style={{ width: cellSize, height: cellSize }} />
    </Animated.View>
  );
};

