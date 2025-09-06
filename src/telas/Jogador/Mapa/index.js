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

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    flex: 1,
    paddingHorizontal: 0,
    paddingTop: 0,
  },
  he: {
     paddingHorizontal: 25,
    paddingTop: 20,
    },
buttonsContainer: {
  flexDirection: 'row',
  justifyContent: 'center', // Centraliza os botões
  alignItems: 'center',
  marginVertical: 10,
  gap: 20, // 20px de distância entre os botões
},
button: {
  backgroundColor: '#124A69',
  width: 120,
  height: 40,
  justifyContent: 'center',
  alignItems: 'center',
  borderRadius: 5,
},
buttonText: {
  color: '#fff',
  fontWeight: 'bold',
},
  buttonPermanent:{
    backgroundColor: '#124A69',
    width: 120,
    height: 40,
    marginLeft: 20,
    marginTop: 20,
    borderRadius: 50,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute'
  },

  formContainer: {
    padding: 20,
    alignItems: 'center',
  },
  label: {
    alignSelf: 'center',
    marginBottom: 4,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  input: {
    width: 100,
    height: 40,
    borderWidth: 1,
    borderColor: '#aaa',
    marginBottom: 12,
    paddingHorizontal: 8,
    borderRadius: 4,
    textAlign: 'center',
  },
    header: {
    backgroundColor: '#124A69',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
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
    borderRadius: 18,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
