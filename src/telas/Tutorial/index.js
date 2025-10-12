import React, { useState, useRef } from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import PagerView from 'react-native-pager-view';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { styles } from './styles';

export default function MyPager() {
  const pagerRef = useRef(null);
  const navigation = useNavigation();
  const [page, setPage] = useState(0);

  const totalPages = 3;

  const goToPage = (index) => {
    pagerRef.current?.setPage(index);
    setPage(index);
  };

  const nextPage = () => {
    if (page < totalPages - 1) goToPage(page + 1);
  };

  const prevPage = () => {
    if (page > 0) goToPage(page - 1);
  };

  return (
    <View style={styles.container}>
      <PagerView
        ref={pagerRef}
        style={styles.pager}
        initialPage={0}
        onPageSelected={(e) => setPage(e.nativeEvent.position)}
      >
        <View style={styles.page} key="1">
          <Image
            style={styles.image}
            resizeMode="cover"
            source={require('../../../assets/tutorial/teste.jpg')}
          />
          <Text style={styles.title}>O que é RPG?</Text>
          <Text style={styles.text}>RPG é um jogo de interpretação de papéis onde os jogadores interpretam um personagem enquanto um deles é escolhido para controlar a narrativa.</Text>
          <Text style={styles.text}>Acesse o nosso site para saber mais sobre.</Text>
        </View>

        <View style={styles.page} key="2">
          <Image
            style={styles.image}
            resizeMode="cover"
            source={require('../../../assets/tutorial/teste.jpg')}
          />
          <Text style={styles.title}></Text>
          <Text style={styles.text}>Conteúdo explicativo aqui</Text>
        </View>

        <View style={styles.page} key="3">
          <Image
            style={styles.image}
            resizeMode="cover"
            source={require('../../../assets/tutorial/teste.jpg')}
          />
          <Text style={styles.title}>Terceira página</Text>
          <Text style={styles.text}>Fim do tutorial 🎉</Text>
        </View>
      </PagerView>

      {/* Setas ou botão "Home" */}
      {page < totalPages - 1 ? (
        <View style={styles.arrowContainer}>
          <TouchableOpacity onPress={prevPage} disabled={page === 0}>
            <Ionicons
              name="chevron-back-circle"
              size={50}
              color={page === 0 ? '#cce0ff' : '#2295D1'}
            />
          </TouchableOpacity>

          <TouchableOpacity onPress={nextPage}>
            <Ionicons
              name="chevron-forward-circle"
              size={50}
              color="#2295D1"
            />
          </TouchableOpacity>
        </View>
      ) : (
        <View style={styles.homeButtonContainer}>
          <TouchableOpacity
            style={styles.homeButton}
            onPress={() => navigation.navigate('Home')}
          >
            <Text style={styles.homeButtonText}>Ir para Home</Text>
          </TouchableOpacity>
        </View>
      )}

      {/* Indicadores */}
      <View style={styles.indicatorContainer}>
        {[...Array(totalPages)].map((_, i) => (
          <View
            key={i}
            style={[
              styles.indicator,
              { opacity: i === page ? 1 : 0.4 },
              i === page && styles.activeIndicator,
            ]}
          />
        ))}
      </View>
    </View>
  );
}
