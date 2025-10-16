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
  const { height } = useWindowDimensions();
  const [showExtraPages, setShowExtraPages] = useState(false);
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

  // Calcula o total de páginas baseado no estado
  const totalPages = showExtraPages ? 14 : 7;

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

  // Função para mostrar páginas extras e navegar
  const showCampaignPages = () => {
    setShowExtraPages(true);
    setTimeout(() => {
      goToPage(7); // vai para a primeira página de campanha
    }, 100);
  };

  // Função para voltar às campanhas
  const backToCampaigns = () => {
    setShowExtraPages(false);
    setTimeout(() => {
      goToPage(4); // volta para a página de campanhas
    }, 100);
  };

  // Verifica se está nas páginas de campanha (8-14)
  const isCampaignPage = page >= 7 && page <= 13;

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

  // Renderiza todas as páginas de uma vez, controlando a visibilidade via estado
  const renderPages = () => {
    const pages = [
      // PÁGINA 1
      <View style={styles.page} key="1">
        <Text style={styles.title}>Bem-vindo(a) ao Tutorial do Vale Místico</Text>
        <Text style={styles.subtitle}>Tópicos a se explorar:</Text>
        <View style={styles.topicsContainer}>
          {[
            'O que é RPG?',
            'O que é uma campanha de RPG?',
            'Saiba mais sobre o sistema Vale Místico',
            'Você pode mestrar uma campanha pronta',
          ].map((topic, i) => (
            <TouchableOpacity
              key={i}
              style={styles.topicItem}
              onPress={() => navigateToTopic(i + 1)}
            >
              <Ionicons name="sparkles" size={18} color="#2295D1" />
              <Text style={styles.topicText}>{topic}</Text>
              <Ionicons name="chevron-forward" size={20} color="#2295D1" />
            </TouchableOpacity>
          ))}
        </View>
      </View>,

      // PÁGINA 2
      <View style={styles.page} key="2">
        <Text style={styles.title}>O que é RPG?</Text>
        <Text style={styles.text}>
          RPG (Role-Playing Game) é um jogo de interpretação de papéis onde os jogadores criam personagens e interpretam ele em um mundo desenvolvido e narrado colaborativamente.
        </Text>
        <Text style={styles.text}>
          As decisões dos jogadores moldam o destino da aventura. Um destes jogadores é chamado de mestre do jogo, ele que cria os desafios enfrentados pelos personagens, podendo ser desde resgatar um gato a lutar contra um monstro devorador de cérebros.
        </Text>
      </View>,

      // PÁGINA 3
      <View style={styles.page} key="3">
        <Text style={styles.title}>O que é uma Campanha?</Text>
        <Text style={styles.text}>
          Uma campanha é uma grande jornada contada que é moldada em torno das ações dos personagens. 
        </Text>
        <Text style={styles.text}>
          O mestre do jogo é aquele quem narra cenários, prepara desafios e missões.
        </Text>
      </View>,

// PÁGINA 4 - Sistema Vale Místico (ATUALIZADA)
<View style={styles.page} key="4">
  <Text style={styles.title}>Sistema Vale Místico</Text>
  <Text style={styles.text}>
    É um sistema de RPG que é utilizado neste aplicativo. Funciona como um meio de introduzir iniciantes ao RPG de mesa.
  </Text>
  <TouchableOpacity 
    style={styles.linkButton}
    onPress={() => {
      // Aqui você pode adicionar a navegação para onde quiser
      // Por exemplo: navigation.navigate('SistemaDetails')
      // Ou abrir um link externo: Linking.openURL('https://seusite.com/sistema')
      console.log('Link para saber mais sobre o sistema foi clicado');
      // Adicione aqui a ação desejada
    }}
  >
    <Text style={styles.linkText}>Clique aqui para saber mais.</Text>
    <Ionicons name="open-outline" size={16} color="#2295D1" style={styles.linkIcon} />
  </TouchableOpacity>
</View>,

      // PÁGINA 5 - Campanhas Prontas
      <View style={styles.page} key="5">
        <Text style={styles.title}>Campanhas Prontas</Text>
        <Text style={styles.text}>
          Não sabe por onde começar? O Vale Místico oferece uma aventura pronta para jogar.
        </Text>
        <Text style={styles.text}>
          Elas incluem tudo: personagens, inimigos, mapas e histórias prontas para você mestrar!
        </Text>
        <TouchableOpacity
          style={styles.campainButton}
          onPress={showCampaignPages}
        >
          <Text style={styles.homeButtonText}>Saber mais sobre</Text>
        </TouchableOpacity>
      </View>,

      // PÁGINA 6
      <View style={styles.page} key="6">
        <Text style={styles.title}>Dicas para Começar</Text>
        <Text style={styles.text}>
          ✧ Comece com algo simples{"\n"}
          ✧ Dê espaço à imaginação{"\n"}
          ✧ Use personagens prontos na primeira vez{"\n"}
          ✧ O mais importante: divirta-se!
        </Text>
      </View>,

      // PÁGINA 7
      <View style={styles.page} key="7">
        <Text style={styles.title}>Fim do Tutorial</Text>
        <Text style={styles.text}>
          Agora você conhece os fundamentos do RPG e do sistema Vale Místico. 
          Que suas aventuras sejam épicas e cheias de momentos inesquecíveis!
        </Text>
      </View>,
    ];

    // Adiciona páginas extras se showExtraPages for true
    if (showExtraPages) {
      pages.push(
        // PÁGINA 8 – Premissa
        <View style={styles.campaignPage} key="8">
          <View style={styles.campaignContent}>
            <Text style={styles.campaignTitle}>Campanha: Todos Juntos</Text>
            <Text style={styles.campaignSection}>Premissa</Text>
            <Text style={styles.campaignText}>
              Vocês são adolescentes estudantes de um internato no interior de São Paulo chamado Colégio Esperança.
              João Dias, um amigo em comum, desapareceu misteriosamente. Pior: ninguém parece se lembrar dele — exceto vocês.
              Há algo estranho acontecendo nos corredores do colégio, e só o trabalho em grupo poderá revelar a verdade.
            </Text>
            <TouchableOpacity style={styles.backButton} onPress={backToCampaigns}>
              <Text style={styles.backButtonText}>Voltar para Campanhas</Text>
            </TouchableOpacity>
          </View>
        </View>,

        // PÁGINA 9 – Regras
        <View style={styles.campaignPage} key="9">
          <View style={styles.campaignContent}>
            <Text style={styles.campaignTitle}>Regras do Jogo</Text>
            <Text style={styles.campaignSection}>Informações Básicas</Text>
            <Text style={styles.campaignText}>
              • Jogadores: 3{"\n"}
              • Os personagens nunca podem se separar — quando o fazem, esquecem o motivo da missão.{"\n"}
              • Antepassado obrigatório: Estudante.{"\n"}
              {"\n"}
              Local inicial: Sala de aula, onde a mesa de João está vazia. 
            </Text>
            <TouchableOpacity style={styles.backButton} onPress={backToCampaigns}>
              <Text style={styles.backButtonText}>Voltar</Text>
            </TouchableOpacity>
          </View>
        </View>,

        // PÁGINA 10 – Locais de foco
        <View style={styles.campaignPage} key="10">
          <View style={styles.campaignContent}>
            <Text style={styles.campaignTitle}>Locais de Foco</Text>
            <Text style={styles.campaignText}>
              ① <Text style={styles.campaignHighlight}>Sala de aula:</Text> o armário de João está trancado com um cadeado de senha.{"\n\n"}
              ② <Text style={styles.campaignHighlight}>Dormitório:</Text> João dorme sozinho desde que seu colega se mudou.{"\n\n"}
              ③ <Text style={styles.campaignHighlight}>Biblioteca:</Text> seu canto favorito — o pôr do sol refletia sobre os livros.{"\n\n"}
              ④ <Text style={styles.campaignHighlight}>Quadra de esportes:</Text> acessível apenas após resolver as outras áreas.
            </Text>
            <TouchableOpacity style={styles.backButton} onPress={backToCampaigns}>
              <Text style={styles.backButtonText}>Voltar</Text>
            </TouchableOpacity>
          </View>
        </View>,

        // PÁGINA 11 – Personagens principais
        <View style={styles.campaignPage} key="11">
          <View style={styles.campaignContent}>
            <Text style={styles.campaignTitle}>Missões</Text>
            <Text style={styles.campaignText}>
              ✦  Investigar o desaparecimento de João.{"\n\n"}
              ✦ Achar todos os fragmentos perdidos (4 pulseiras em formato de coração que juntos, formam um trevo de 4 folhas).{"\n\n"}
              ✦ Libertar o amigo do Pesadelo.
            </Text>
            <TouchableOpacity style={styles.backButton} onPress={backToCampaigns}>
              <Text style={styles.backButtonText}>Voltar</Text>
            </TouchableOpacity>
          </View>
        </View>,

        // PÁGINA 12 – Descrição das Salas (ATUALIZADA)
        <View style={styles.campaignPage} key="12">
          <View style={styles.campaignContent}>
            <Text style={styles.campaignTitle}>Descrição das Salas</Text>
            <Text style={styles.campaignSection}>Clique em uma sala para ver os detalhes</Text>
            
            <View style={styles.roomsContainer}>
              <TouchableOpacity 
                style={styles.roomButton}
                onPress={() => openRoomModal('Sala de Aula')}
              >
                <Ionicons name="school" size={24} color="#1B4F72" />
                <Text style={styles.roomButtonText}>Sala de Aula</Text>
              </TouchableOpacity>

              <TouchableOpacity 
                style={styles.roomButton}
                onPress={() => openRoomModal('Biblioteca')}
              >
                <Ionicons name="library" size={24} color="#1B4F72" />
                <Text style={styles.roomButtonText}>Biblioteca</Text>
              </TouchableOpacity>

              <TouchableOpacity 
                style={styles.roomButton}
                onPress={() => openRoomModal('Dormitório')}
              >
                <Ionicons name="bed" size={24} color="#1B4F72" />
                <Text style={styles.roomButtonText}>Dormitório</Text>
              </TouchableOpacity>

              <TouchableOpacity 
                style={styles.roomButton}
                onPress={() => openRoomModal('Quadra de Esportes')}
              >
                <Ionicons name="basketball" size={24} color="#1B4F72" />
                <Text style={styles.roomButtonText}>Quadra de Esportes</Text>
              </TouchableOpacity>
            </View>

            <TouchableOpacity style={styles.backButton} onPress={backToCampaigns}>
              <Text style={styles.backButtonText}>Voltar</Text>
            </TouchableOpacity>
          </View>
        </View>,

        // PÁGINA 13 – Objetivos
        <View style={styles.campaignPage} key="13">
          <View style={styles.campaignContent}>
            <Text style={styles.campaignTitle}>Batalha</Text>
            <Text style={styles.campaignText}>
              Ao tentar despertar o amigo, o indivíduo verá uma monstruosidade que se assemelha a um polvo, porém sua pele é como espelhos fragmentados.
              ✧ Cada jogador vê uma versão distorcida de si mesmo nos espelhos.{"\n"}
              ✧ Para vencer, devem encontrar o espelho que reflete João e encaixar o trevo de 4 folhas (formado pelas pulseiras).{"\n"}
              Somente então podem libertá-lo.{"\n"}
              ✧ Se falharem: esquecem João para sempre — e a história reinicia no dia seguinte, como um loop.{"\n"}
            </Text>
            <TouchableOpacity style={styles.backButton} onPress={backToCampaigns}>
              <Text style={styles.backButtonText}>Voltar</Text>
            </TouchableOpacity>
          </View>
        </View>,

        // PÁGINA 14 – Epílogo
        <View style={styles.campaignPage} key="14">
          <View style={styles.campaignContent}>
            <Text style={styles.campaignTitle}>Epílogo</Text>
            <Text style={styles.campaignText}>
              A lembrança de João talvez nunca volte completamente — mas o laço entre vocês será eterno.
              O verdadeiro poder do RPG está em recordar as histórias que criamos juntos.
            </Text>
            <TouchableOpacity style={styles.backButton} onPress={backToCampaigns}>
              <Text style={styles.backButtonText}>Mestrar Campanha pronta</Text>
            </TouchableOpacity>
          </View>
        </View>
      );
    }

    return pages;
  };

  return (
    <View style={styles.container}>
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

      {/* NAVEGAÇÃO - OCULTA NAS PÁGINAS DE CAMPANHA (8-14) */}
      {!isCampaignPage && page < totalPages - 1 ? (
        <View style={styles.arrowContainer}>
          <TouchableOpacity onPress={prevPage} disabled={page === 0}>
            <Ionicons
              name="chevron-back-circle"
              size={50}
              color={page === 0 ? '#cce0ff' : '#2295D1'}
            />
          </TouchableOpacity>
          <TouchableOpacity onPress={nextPage}>
            <Ionicons name="chevron-forward-circle" size={50} color="#2295D1" />
          </TouchableOpacity>
        </View>
      ) : !isCampaignPage && (
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
      {!isCampaignPage && page < 7 && (
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

      {/* INDICADORES DAS CAMPANHAS (8–14) */}
      {isCampaignPage && (
        <View style={styles.campaignIndicatorContainer}>
          {[...Array(7)].map((_, i) => {
            const campaignPage = i + 7; // 7→13
            return (
              <View
                key={campaignPage}
                style={[
                  styles.campaignIndicator,
                  page === campaignPage
                    ? styles.activeCampaignIndicator
                    : styles.inactiveCampaignIndicator,
                ]}
              />
            );
          })}
        </View>
      )}

      {/* MODAL DAS SALAS */}
      <RoomModal />
    </View>
  );
}