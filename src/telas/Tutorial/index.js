// apenas copiei o appMostraImagem

import 'react-native-reanimated';
import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  ActivityIndicator,
  StyleSheet,
  Image,
  Dimensions,
  SafeAreaView,
} from 'react-native';

//instalar a biblioteca expo install react-native-reanimated
import Carousel from 'react-native-reanimated-carousel';

const { width } = Dimensions.get('window');

export default function App() {
  const [imagens, setImagens] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function carregarImagens() {
      try {
        const response = await fetch('http://10.239.0.139/imagem/listar_imagens.php');
        const data = await response.json();
        setImagens(data);
      } catch (error) {
        console.error('Erro ao buscar imagens:', error);
      } finally {
        setLoading(false);
      }
    }
    carregarImagens();
  }, []);

  if (loading) {
    return (
      <View style={styles.loading}>
        <ActivityIndicator size="large" color="#4a90e2" />
        <Text style={styles.loadingText}>Carregando imagens...</Text>
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      <Text style={styles.header}>📷 Galeria de Imagens BD</Text>
      {imagens.length === 0 ? (
        <Text style={styles.emptyText}>Nenhuma imagem encontrada.</Text>
      ) : (
        <Carousel
          loop
          width={width}
          height={250}
          autoPlay
          data={imagens}
          scrollAnimationDuration={1000}
          renderItem={({ item }) => (
            <Image source={{ uri: item }} style={styles.imagem} />
          )}
        />
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#000',
  },
  header: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fff',
    textAlign: 'center',
    marginVertical: 15,
  },
  imagem: {
    width: '100%',
    height: 250,
    borderRadius: 8,
    resizeMode: 'cover',
  },
  loading: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#000',
  },
  loadingText: {
    marginTop: 10,
    fontSize: 16,
    color: '#fff',
  },
  emptyText: {
    textAlign: 'center',
    marginTop: 20,
    fontSize: 16,
    color: '#fff',
  },
});