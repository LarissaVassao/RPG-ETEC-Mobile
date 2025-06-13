import React, { useState, useRef } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  PanResponder,
  Animated,
  TouchableOpacity,
} from 'react-native';

const GRID_SIZE = 8;
const CELL_SIZE = 40;
const TOKEN_IMAGE = require('../../../assets/img/logo.png');

export default function Mapa({ navigation }) {
  const [tokens, setTokens] = useState([]);

  const addToken = () => {
    const id = Date.now().toString();
    setTokens([...tokens, { id, x: 1, y: 1 }]);
  };

  return (
    <View style={styles.container}>
      <Grid />

      {tokens.map((token) => (
        <DraggableToken key={token.id} initialX={token.x} initialY={token.y} />
      ))}

      <TouchableOpacity style={styles.button} onPress={addToken}>
        <Text style={styles.buttonText}>Add</Text>
      </TouchableOpacity>
    </View>
  );
}

// Grid component
const Grid = () => {
  return (
    <View style={{ flexDirection: 'column' }}>
      {Array.from({ length: GRID_SIZE }).map((_, row) => (
        <View style={{ flexDirection: 'row' }} key={`row-${row}`}>
          {Array.from({ length: GRID_SIZE }).map((_, col) => (
            <View
              key={`cell-${row}-${col}`}
              style={{
                width: CELL_SIZE,
                height: CELL_SIZE,
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

// Draggable token component
const DraggableToken = ({ initialX, initialY }) => {
  const pan = useRef(
    new Animated.ValueXY({
      x: initialX * CELL_SIZE,
      y: initialY * CELL_SIZE,
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
          GRID_SIZE - 1,
          Math.max(0, Math.round(pan.x._value / CELL_SIZE))
        );
        const newY = Math.min(
          GRID_SIZE - 1,
          Math.max(0, Math.round(pan.y._value / CELL_SIZE))
        );

        Animated.spring(pan, {
          toValue: { x: newX * CELL_SIZE, y: newY * CELL_SIZE },
          useNativeDriver: false,
        }).start();
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
          width: CELL_SIZE,
          height: CELL_SIZE,
        },
      ]}
    >
      <Image source={TOKEN_IMAGE} style={{ width: CELL_SIZE, height: CELL_SIZE }} />
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    flex: 1,
  },
  button: {
    backgroundColor: '#f00',
    width: 80,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
    borderRadius: 5,
    alignSelf: 'center',
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});
