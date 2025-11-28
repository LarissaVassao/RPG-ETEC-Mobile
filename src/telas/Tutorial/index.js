import React, { useState, useRef } from 'react';
import { View, Text, Image, TouchableOpacity, useWindowDimensions, Modal, ScrollView } from 'react-native';
import PagerView from 'react-native-pager-view';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { styles } from './styles';

export default function MyPager() {
  const pagerRef = useRef(null);
  const navigation = useNavigation();
  const [page, setPage] = useState(0);
  const { width, height } = useWindowDimensions();

  // --- Modal / Sala states (necessários) ---
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedRoom, setSelectedRoom] = useState(null);

  // Dados das salas
  const roomData = {
    'Sala de Aula': {
      title: 'Sala de Aula',
      description: 'Uma sala comum que comporta 35 alunos. Possui 5 fileiras com 7 mesas cada, a mesa do professor, lousa, televisão, relógio de parede, ar-condicionado e armários individuais no fundo da sala.',
      importantInfo: [
        'João se sentava na 4ª carteira da fileira próxima à janela.',
        'Os jogadores ocupam as carteiras ao redor dele.',
        'A mesa de João está vazia, mas há algo estranho nela.'
      ],
      clues: [
        'Na carteira de João, há um enigma (decifrável por inteligência ou percepção) que revela a senha do armário: 2345',
        'Armário de João:',
        '  • Cadernos e apostilas (sem relevância).',
        '  • Caderno de desenhos — rabiscos de rostos e formas circulares.',
        '  • Foto do grupo (prova de amizade).',
        '  • Pulseira em formato de coração (1ª peça do trevo).'
      ]
    },
    'Biblioteca': {
      title: 'Biblioteca',
      description: 'Um ambiente silencioso, cheio de estantes longas e altas. Há mesas de estudo espalhadas e computadores antigos. O bibliotecário, um homem mais velho e cansado, pode ser encontrado dormindo em sua cadeira.',
      importantInfo: [
        'João costumava estudar sempre no canto direito da biblioteca, onde o pôr do Sol iluminava sua mesa favorita.'
      ],
      clues: [
        'Na mesa de João, há rabiscos estranhos — figuras em espiral, possivelmente ligadas a hipnose, confusão mental ou memória.',
        'Se os jogadores procurarem bem (Percepção/Investigação), encontram atrás de um vaso de plantas, uma segunda pulseira em formato de coração, que encaixa com a primeira.'
      ]
    },
    'Dormitório': {
      title: 'Dormitório',
      description: 'Um quarto simples com duas camas, mas apenas uma está sendo usada. O ambiente é limpo e organizado, mas há uma sensação de solidão no ar.',
      importantInfo: [
        'João deveria dividir o quarto com outro aluno, mas o colega mudou-se há um semestre, deixando-o sozinho.',
        'A cama está perfeitamente arrumada, as roupas alinhadas e o armário impecável - Como se ninguém usasse o quarto.'
      ],
      clues: [
        'Após uma investigação detalhada, os jogadores podem encontrar:',
        '  • O diário de João, escondido sob o colchão.',
        '  • O diário contém anotações fragmentadas, palavras cortadas e um pequeno desenho de mapa, levando atrás da quadra de esportes.',
        '  • Terceira pulseira em formato de coração, guardada em uma gaveta.'
      ]
    },
    'Quadra de Esportes': {
      title: 'Quadra de Esportes',
      description: 'Um espaço amplo e silencioso, o vento sopra de forma estranha ao entardecer. As arquibancadas estão vazias, mas a atmosfera é pesada e há um leve eco metálico, como se algo se movesse por baixo das estruturas.',
      importantInfo: [
        'Condição: Os jogadores só podem ter de fato a batalha final quando acharem as três pulseiras.',
        'Cada jogador deve estar equipado com uma pulseira.',
        'Quando juntam as três peças, formam um trevo de três folhas.',
        'Uma energia misteriosa os guia até as arquibancadas.',
        'Lá, encontram a quarta parte do trevo — a última pulseira — e João adormecido entre os bancos.'
      ],
      clues: [
        'Local da batalha final contra a criatura de espelhos.',
        'Requer que todas as três pulseiras anteriores sejam coletadas.',
        'A quarta pulseira completa o trevo de quatro folhas.'
      ]
    }
  };

  // Função para abrir o modal
  const openRoomModal = (roomName) => {
    setSelectedRoom(roomData[roomName]);
    setModalVisible(true);
  };

  // Função para fechar o modal
  const closeRoomModal = () => {
    setModalVisible(false);
    setSelectedRoom(null);
  };

  // Retorna a imagem de fundo de acordo com a página
  const getBackgroundImage = (page) => {
    if (page < 7) {
      switch(page) {
        case 0: return require('../../../assets/tutorial/teste.jpg');
        case 1: return require('../../../assets/tutorial/rpg.jpg');
        case 2: return require('../../../assets/tutorial/campanha.jpg');
        case 3: return require('../../../assets/tutorial/teste.jpg');
        case 4: return require('../../../assets/tutorial/campanha.jpg');
        case 5: return require('../../../assets/tutorial/diga.jpg');
        case 6: return require('../../../assets/tutorial/dado.jpg');
        default: return require('../../../assets/tutorial/teste.jpg');
      }
    } else {
      return require('../../../assets/tutorial/teste.jpg');
    }
  };

  // totalPages fixo (apenas tutorial: 7 páginas)
  const totalPages = 7;

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

  const navigateToTopic = (topicIndex) => goToPage(topicIndex);

  // Modal para exibir informações da sala
  const RoomModal = () => (
    <Modal
      animationType="slide"
      transparent={true}
      visible={modalVisible}
      onRequestClose={closeRoomModal}
    >
      <View style={styles.modalOverlay}>
        <View style={styles.modalContent}>
          <ScrollView style={styles.modalScrollView}>
            {selectedRoom && (
              <>
                <Text style={styles.modalTitle}>{selectedRoom.title}</Text>
                
                <Text style={styles.modalSection}>Descrição</Text>
                <Text style={styles.modalText}>{selectedRoom.description}</Text>
                
                <Text style={styles.modalSection}>Informações Importantes</Text>
                {selectedRoom.importantInfo.map((info, index) => (
                  <Text key={index} style={styles.modalBulletText}>• {info}</Text>
                ))}
                
                <Text style={styles.modalSection}>Pistas</Text>
                {selectedRoom.clues.map((clue, index) => (
                  <Text key={index} style={styles.modalBulletText}>{clue}</Text>
                ))}
              </>
            )}
          </ScrollView>
          
          <TouchableOpacity style={styles.modalCloseButton} onPress={closeRoomModal}>
            <Text style={styles.modalCloseButtonText}>Fechar</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );

  // Renderiza todas as páginas (apenas 7 páginas)
  const renderPages = () => {
    const isSmallScreen = width < 375;
    const isLargeScreen = width > 414;

    const pages = [
      // PÁGINA 1
      <View style={styles.page} key="1">
        <View style={[
          styles.contentCard,
          isSmallScreen && styles.smallContentCard,
          isLargeScreen && styles.largeContentCard
        ]}>
          <Text style={[
            styles.title,
            isSmallScreen && styles.smallTitle,
            isLargeScreen && styles.largeTitle
          ]}>Bem-vindo(a) ao Tutorial do Vale Místico</Text>
          <Text style={[
            styles.subtitle,
            isSmallScreen && styles.smallSubtitle,
            isLargeScreen && styles.largeSubtitle
          ]}>Tópicos a se explorar:</Text>
          <View style={styles.topicsContainer}>
            {[
              'O que é RPG?',
              'O que é uma campanha de RPG?',
              'Saiba mais sobre o sistema Vale Místico',
              'Você pode mestrar uma campanha pronta',
            ].map((topic, i) => (
              <TouchableOpacity
                key={i}
                style={[
                  styles.topicItem,
                  isSmallScreen && styles.smallTopicItem
                ]}
                onPress={() => navigateToTopic(i + 1)}
              >
                <Ionicons name="sparkles" size={isSmallScreen ? 16 : 18} color="#2295D1" />
                <Text style={[
                  styles.topicText,
                  isSmallScreen && styles.smallTopicText
                ]}>{topic}</Text>
                <Ionicons name="chevron-forward" size={isSmallScreen ? 18 : 20} color="#2295D1" />
              </TouchableOpacity>
            ))}
          </View>
        </View>
      </View>,

      // PÁGINA 2
      <View style={styles.page} key="2">
        <View style={[
          styles.contentCard,
          isSmallScreen && styles.smallContentCard,
          isLargeScreen && styles.largeContentCard
        ]}>
          <Text style={[
            styles.title,
            isSmallScreen && styles.smallTitle,
            isLargeScreen && styles.largeTitle
          ]}>O que é RPG?</Text>
          <Text style={[
            styles.text,
            isSmallScreen && styles.smallText
          ]}>
            RPG (Role-Playing Game) é um jogo de interpretação de papéis onde os jogadores criam personagens e interpretam ele em um mundo desenvolvido e narrado colaborativamente.
          </Text>
          <Text style={[
            styles.text,
            isSmallScreen && styles.smallText
          ]}>
            As decisões dos jogadores moldam o destino da aventura. Um destes jogadores é chamado de mestre do jogo, ele que cria os desafios enfrentados pelos personagens, podendo ser desde resgatar um gato a lutar contra um monstro devorador de cérebros.
          </Text>
        </View>
      </View>,

      // PÁGINA 3
      <View style={styles.page} key="3">
        <View style={[
          styles.contentCard,
          isSmallScreen && styles.smallContentCard,
          isLargeScreen && styles.largeContentCard
        ]}>
          <Text style={[
            styles.title,
            isSmallScreen && styles.smallTitle,
            isLargeScreen && styles.largeTitle
          ]}>O que é uma Campanha?</Text>
          <Text style={[
            styles.text,
            isSmallScreen && styles.smallText
          ]}>
            Uma campanha é uma grande jornada contada que é moldada em torno das ações dos personagens. 
          </Text>
          <Text style={[
            styles.text,
            isSmallScreen && styles.smallText
          ]}>
            O mestre do jogo é aquele quem narra cenários, prepara desafios e missões.
          </Text>
        </View>
      </View>,

      // PÁGINA 4
      <View style={styles.page} key="4">
        <View style={[
          styles.contentCard,
          isSmallScreen && styles.smallContentCard,
          isLargeScreen && styles.largeContentCard
        ]}>
          <Text style={[
            styles.title,
            isSmallScreen && styles.smallTitle,
            isLargeScreen && styles.largeTitle
          ]}>Sistema Vale Místico</Text>
          <Text style={[
            styles.text,
            isSmallScreen && styles.smallText
          ]}>
            É um sistema de RPG que é utilizado neste aplicativo. Funciona como um meio de introduzir iniciantes ao RPG de mesa.
          </Text>
          <TouchableOpacity 
            style={[
              styles.linkButton,
              isSmallScreen && styles.smallLinkButton
            ]}
            onPress={() => {
              console.log('Link para saber mais sobre o sistema foi clicado');
            }}
          >
            <Text style={[
              styles.linkText,
              isSmallScreen && styles.smallLinkText
            ]}>Clique aqui para saber mais.</Text>
            <Ionicons name="open-outline" size={isSmallScreen ? 14 : 16} color="#2295D1" style={styles.linkIcon} />
          </TouchableOpacity>
        </View>
      </View>,

      // PÁGINA 5 - Campanhas Prontas (navega para a tela CampanhaPronta)
      <View style={styles.page} key="5">
        <View style={[
          styles.contentCard,
          isSmallScreen && styles.smallContentCard,
          isLargeScreen && styles.largeContentCard
        ]}>
          <Text style={[
            styles.title,
            isSmallScreen && styles.smallTitle,
            isLargeScreen && styles.largeTitle
          ]}>Campanhas Prontas</Text>
          <Text style={[
            styles.text,
            isSmallScreen && styles.smallText
          ]}>
            Não sabe por onde começar? O Vale Místico oferece uma aventura pronta para jogar.
          </Text>
          <Text style={[
            styles.text,
            isSmallScreen && styles.smallText
          ]}>
            Elas incluem tudo: personagens, inimigos, mapas e histórias prontas para você mestrar!
          </Text>
          <Text style={[
            styles.textObs,
            isSmallScreen && styles.smallTextObs
          ]}>
            Observação: Apenas os mestres do jogo devem clicar no botão abaixo.
          </Text>
          <TouchableOpacity
            style={[
              styles.campainButton,
              isSmallScreen && styles.smallCampainButton
            ]}
            onPress={() => navigation.navigate('CampanhaPronta')}
          >
            <Text style={[
              styles.homeButtonText,
              isSmallScreen && styles.smallHomeButtonText
            ]}>Saber mais sobre</Text>
          </TouchableOpacity>
        </View>
      </View>,

      // PÁGINA 6
      <View style={styles.page} key="6">
        <View style={[
          styles.contentCard,
          isSmallScreen && styles.smallContentCard,
          isLargeScreen && styles.largeContentCard
        ]}>
          <Text style={[
            styles.title,
            isSmallScreen && styles.smallTitle,
            isLargeScreen && styles.largeTitle
          ]}>Dicas para Começar</Text>
          <Text style={[
            styles.text,
            isSmallScreen && styles.smallText
          ]}>
            ✧ Comece com algo simples{"\n"}
            ✧ Dê espaço à imaginação{"\n"}
            ✧ Use personagens prontos na primeira vez{"\n"}
            ✧ O mais importante: divirta-se!
          </Text>
        </View>
      </View>,

      // PÁGINA 7
      <View style={styles.page} key="7">
        <View style={[
          styles.contentCard,
          isSmallScreen && styles.smallContentCard,
          isLargeScreen && styles.largeContentCard
        ]}>
          <Text style={[
            styles.title,
            isSmallScreen && styles.smallTitle,
            isLargeScreen && styles.largeTitle
          ]}>Fim do Tutorial</Text>
          <Text style={[
            styles.text,
            isSmallScreen && styles.smallText
          ]}>
            Agora você conhece os fundamentos do RPG e do sistema Vale Místico. 
            Que suas aventuras sejam épicas e cheias de momentos inesquecíveis!
          </Text>
        </View>
      </View>,
    ];

    return pages;
  };

  return (
    <View style={styles.container}>
      {/* BOTÃO VOLTAR PARA HOME */}
      <TouchableOpacity 
        style={styles.homeBackButton}
        onPress={() => navigation.navigate('Home')}
      >
        <Ionicons name="arrow-back" size={24} color="#2295D1" />
      </TouchableOpacity>

      {/* IMAGEM FIXA + DEGRADÊ */}
      <Image
        style={styles.fixedImage}
        resizeMode="cover"
        source={getBackgroundImage(page)}
      />
      <View style={styles.overlay} />

      {/* PÁGINAS */}
      <PagerView
        ref={pagerRef}
        style={styles.pager}
        initialPage={0}
        onPageSelected={(e) => setPage(e.nativeEvent.position)}
      >
        {renderPages()}
      </PagerView>

      {/* NAVEGAÇÃO */}
      {page < totalPages - 1 ? (
        <View style={styles.arrowContainer}>
          <TouchableOpacity onPress={prevPage} disabled={page === 0}>
            <Ionicons
              name="chevron-back-circle"
              size={44}
              color={page === 0 ? '#cce0ff' : '#2295D1'}
            />
          </TouchableOpacity>
          <TouchableOpacity onPress={nextPage}>
            <Ionicons name="chevron-forward-circle" size={44} color="#2295D1" />
          </TouchableOpacity>
        </View>
      ) : (
        <View style={styles.homeButtonContainer}>
          <TouchableOpacity
            style={styles.homeButton}
            onPress={() => navigation.navigate('Home')}
          >
            <Text style={styles.homeButtonText}>Retornar ao Início</Text>
          </TouchableOpacity>
        </View>
      )}

      {/* INDICADORES DO TUTORIAL (1–7) */}
      {page < 7 && (
        <View style={styles.indicatorContainer}>
          {[...Array(7)].map((_, i) => (
            <View
              key={i}
              style={[
                styles.indicator,
                i === page ? styles.activeIndicator : styles.inactiveIndicator,
              ]}
            />
          ))}
        </View>
      )}

      {/* MODAL DAS SALAS */}
      <RoomModal />
    </View>
  );
}