import React, { useState } from "react";
import { View, Text, TouchableOpacity, ScrollView, Modal } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { styles } from "./styles";

export default function CampanhaPronta() {
  const navigation = useNavigation();
  const [selectedRoom, setSelectedRoom] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [showStory, setShowStory] = useState(true);

  // --- DADOS DA CAMPANHA ---
  const campaignInfo = {
    title: "Todos Juntos",
    story: {
      intro: "Vocês são adolescentes estudantes de um internato no interior do estado de São Paulo chamado Colégio Esperança e possuem um amigo em comum, João Dias.",
      details: [
        "João sempre foi um aluno dedicado e seguidor das regras da escola, mas também um bom amigo.",
        "Às vezes ele possuía alguns comportamentos estranhos, como se excluir em determinados momentos, ou apenas ficar quieto durante boa parte do dia, mas agia normalmente após, sendo sorridente, conversador, e por isso, vocês só achavam que ele precisava recarregar a sua 'bateria social'.",
        "Nesta segunda-feira, quando os seus responsáveis deixaram vocês no portão do internato, o grupo continuou a seguir a rotina padrão, organizaram suas malas no dormitório, tomaram café da manhã e foram para a primeira aula do dia. Porém, perceberam algo incomum e estranho, João não voltou.",
        "E não só isso, todos os que compartilhavam o mesmo ambiente que João, ou seja, que sabiam da existência dele, com exceção a vocês, não se lembraram dele.",
        "Vocês se lembram do João, mas porque ninguém se lembra dele? E por que quando o seu grupo de amigos estão separados, não se lembram de João? Por sorte, existem vestígios que João existia e que é um estudante do internato, por isso, vocês vão deixar o seu amigo desaparecer das suas mentes?"
      ]
    },
    rules: {
      players: "3 jogadores",
      restrictions: [
        "Os personagens não podem se separar: Sempre quando separados, vocês se esquecem completamente sobre o João, ou seja, esquecem o objetivo de vocês.",
        "O antepassado obrigatoriamente tem que ser estudante."
      ]
    },
    missions: [
      "Investigação do desaparecimento de João",
      "Perguntar aos alunos ou docentes",
      "Procurar vestígios dele", 
      "Achar todos os fragmentos perdidos (4 pulseiras em formato de coração que juntos, formam um trevo de 4 folhas)",
      "Libertar o amigo do Pesadelo"
    ],
    battle: {
      description: "Ao tentar despertar o amigo, o indivíduo verá uma monstruosidade que se assemelha a um polvo, porém sua pele é como espelhos fragmentados.",
      mechanics: [
        "Cada jogador vê uma versão distorcida de si mesmo nos espelhos.",
        "Para vencer, devem encontrar o espelho que reflete João e encaixar o trevo de 4 folhas (formado pelas pulseiras).",
        "Somente então podem libertá-lo.",
        "Se falharem: esquecem João para sempre — e a história reinicia no dia seguinte, como um loop."
      ]
    }
  };

  // --- DADOS DAS SALAS ---
  const roomData = {
    "Sala de Aula": {
      title: "Sala de Aula",
      description: "Uma sala comum que comporta 35 alunos. Possui 5 fileiras com 7 mesas cada, a mesa do professor, lousa, televisão, relógio de parede, ar-condicionado e armários individuais no fundo da sala.",
      importantInfo: [
        "Local inicial dos jogadores",
        "João se sentava na 4ª carteira da fileira próxima à janela.",
        "Os jogadores ocupam as carteiras ao redor dele.",
        "A mesa de João está vazia, mas há algo estranho nela.",
      ],
      clues: [
        "Na carteira de João, há um enigma (decifrável por inteligência ou percepção) que revela a senha do armário: 2345",
        "Armário de João:",
        "  • Cadernos e apostilas (sem relevância).",
        "  • Caderno de desenhos — rabiscos de rostos e formas circulares.",
        "  • Foto do grupo (prova de amizade).",
        "  • Pulseira em formato de coração (1ª peça do trevo).",
      ],
    },

    Biblioteca: {
      title: "Biblioteca",
      description: "Um ambiente silencioso, cheio de estantes longas e altas. Há mesas de estudo espalhadas e computadores antigos. O bibliotecário, um homem mais velho e cansado, pode ser encontrado dormindo em sua cadeira.",
      importantInfo: [
        "João costumava estudar sempre no canto direito da biblioteca, onde o pôr do Sol iluminava sua mesa favorita.",
      ],
      clues: [
        "Na mesa de João, há rabiscos estranhos — figuras em espiral, possivelmente ligadas a hipnose, confusão mental ou memória.",
        "Se os jogadores procurarem bem (Percepção/Investigação), encontram atrás de um vaso de plantas, uma segunda pulseira em formato de coração, que encaixa com a primeira.",
      ],
    },

    Dormitório: {
      title: "Dormitório",
      description: "Um quarto simples com duas camas, mas apenas uma está sendo usada. O ambiente é limpo e organizado, mas há uma sensação de solidão no ar.",
      importantInfo: [
        "João deveria dividir o quarto com outro aluno, mas o colega mudou-se há um semestre, deixando-o sozinho.",
        "A cama está perfeitamente arrumada, as roupas alinhadas e o armário impecável - Como se ninguém usasse o quarto.",
      ],
      clues: [
        "Após uma investigação detalhada, os jogadores podem encontrar:",
        "  • O diário de João, escondido sob o colchão.",
        "  • O diário contém anotações fragmentadas, palavras cortadas e um pequeno desenho de mapa, levando atrás da quadra de esportes.",
        "  • Terceira pulseira em formato de coração, guardada em uma gaveta.",
      ],
    },

    "Quadra de Esportes": {
      title: "Quadra de Esportes",
      description: "Um espaço amplo e silencioso, o vento sopra de forma estranha ao entardecer. As arquibancadas estão vazias, mas a atmosfera é pesada e há um leve eco metálico, como se algo se movesse por baixo das estruturas.",
      importantInfo: [
        "Condição: Os jogadores só podem ter de fato a batalha final quando acharem as três pulseiras.",
        "Cada jogador deve estar equipado com uma pulseira.",
        "Quando juntam as três peças, formam um trevo de três folhas.",
        "Uma energia misteriosa os guia até as arquibancadas.",
        "Lá, encontram a quarta parte do trevo — a última pulseira — e João adormecido entre os bancos.",
      ],
      clues: [
        "Local da batalha final contra a criatura de espelhos.",
        "Requer que todas as três pulseiras anteriores sejam coletadas.",
        "A quarta pulseira completa o trevo de quatro folhas.",
      ],
    },
  };

  // Abrir modal
  const openRoom = (roomKey) => {
    setSelectedRoom(roomData[roomKey]);
    setModalVisible(true);
  };

  // Fechar modal
  const closeRoom = () => {
    setSelectedRoom(null);
    setModalVisible(false);
  };

  // Função para criar campanha
  const criarCampanha = () => {
    alert("Campanha 'Todos Juntos' criada com sucesso!");
    // Aqui você pode adicionar a lógica para salvar a campanha
  };

  return (
    <View style={styles.container}>
      {/* --- BARRA DE NAVEGAÇÃO --- */}
      <View style={styles.navBar}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={28} color="#FFFFFF" />
        </TouchableOpacity>
        <Text style={styles.navTitle}>Campanha Pronta</Text>
        <View style={{ width: 28 }} />
      </View>

      {/* --- CONTEÚDO PRINCIPAL --- */}
      <ScrollView style={styles.scrollContent} showsVerticalScrollIndicator={false}>
        
        {/* --- CABEÇALHO DA CAMPANHA --- */}
        <View style={styles.campaignHeader}>
          <Text style={styles.campaignTitle}>{campaignInfo.title}</Text>
          <View style={styles.playerBadge}>
            <Ionicons name="people" size={16} color="#FFFFFF" />
            <Text style={styles.playerText}>{campaignInfo.rules.players}</Text>
          </View>
        </View>

        {/* --- BOTÃO TOGGLE HISTÓRIA --- */}
        <TouchableOpacity 
          style={styles.toggleButton} 
          onPress={() => setShowStory(!showStory)}
        >
          <Text style={styles.toggleButtonText}>
            {showStory ? "Ocultar História" : "Mostrar História"}
          </Text>
          <Ionicons 
            name={showStory ? "chevron-up" : "chevron-down"} 
            size={20} 
            color="#1B4F72" 
          />
        </TouchableOpacity>

        {/* --- SEÇÃO DA HISTÓRIA --- */}
        {showStory && (
          <View style={styles.storySection}>
            <Text style={styles.sectionTitle}>A História</Text>
            <Text style={styles.storyIntro}>{campaignInfo.story.intro}</Text>
            
            {campaignInfo.story.details.map((paragraph, index) => (
              <Text key={index} style={styles.storyParagraph}>
                {paragraph}
              </Text>
            ))}

            {/* --- REGRAS --- */}
            <View style={styles.rulesCard}>
              <Text style={styles.sectionTitle}>Regras da Campanha</Text>
              <View style={styles.ruleItem}>
                <Ionicons name="people-circle" size={20} color="#1B4F72" />
                <Text style={styles.ruleText}>{campaignInfo.rules.players}</Text>
              </View>
              {campaignInfo.rules.restrictions.map((rule, index) => (
                <View key={index} style={styles.ruleItem}>
                  <Ionicons name="warning" size={18} color="#E74C3C" />
                  <Text style={styles.ruleText}>{rule}</Text>
                </View>
              ))}
            </View>

            {/* --- MISSÕES --- */}
            <View style={styles.missionsCard}>
              <Text style={styles.sectionTitle}>Missões</Text>
              {campaignInfo.missions.map((mission, index) => (
                <View key={index} style={styles.missionItem}>
                  <View style={styles.missionIcon}>
                    <Text style={styles.missionNumber}>{index + 1}</Text>
                  </View>
                  <Text style={styles.missionText}>{mission}</Text>
                </View>
              ))}
            </View>

            {/* --- BATALHA FINAL --- */}
            <View style={styles.battleCard}>
              <Text style={styles.sectionTitle}>Batalha Final</Text>
              <Text style={styles.battleDescription}>
                {campaignInfo.battle.description}
              </Text>
              {campaignInfo.battle.mechanics.map((mechanic, index) => (
                <View key={index} style={styles.mechanicItem}>
                  <Ionicons name="shield" size={16} color="#3498DB" />
                  <Text style={styles.mechanicText}>{mechanic}</Text>
                </View>
              ))}
            </View>
          </View>
        )}

        {/* --- LOCAIS PARA EXPLORAR --- */}
        <View style={styles.locationsHeader}>
          <Text style={styles.sectionTitle}>Locais para Explorar</Text>
        </View>

        {/* --- LISTA DE SALAS --- */}
        <View style={styles.roomsContainer}>
          {Object.keys(roomData).map((roomName) => (
            <TouchableOpacity
              key={roomName}
              style={styles.roomButton}
              onPress={() => openRoom(roomName)}
            >
              <View style={styles.roomButtonIcon}>
                <Ionicons name="location-outline" size={22} color="#FFFFFF" />
              </View>
              <Text style={styles.roomButtonText}>{roomName}</Text>
              <Ionicons name="chevron-forward" size={20} color="#1B4F72" />
            </TouchableOpacity>
          ))}
        </View>

        {/* --- ESPAÇO PARA O BOTÃO --- */}
        <View style={styles.bottomSpacing} />
      </ScrollView>

      {/* --- BOTÃO CRIAR CAMPANHA --- */}
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.createButton} onPress={criarCampanha}>
          <Ionicons name="add-circle-outline" size={24} color="#FFFFFF" />
          <Text style={styles.createButtonText}>Criar campanha pronta</Text>
        </TouchableOpacity>
      </View>

      {/* --- MODAL DE DETALHES --- */}
      <Modal visible={modalVisible} animationType="slide" transparent={true}>
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <ScrollView style={styles.modalScroll} showsVerticalScrollIndicator={false}>
              {selectedRoom && (
                <>
                  <View style={styles.modalHeader}>
                    <Text style={styles.modalTitle}>{selectedRoom.title}</Text>
                  </View>

                  <View style={styles.section}>
                    <Text style={styles.modalSection}>Descrição</Text>
                    <Text style={styles.modalText}>
                      {selectedRoom.description}
                    </Text>
                  </View>

                  <View style={styles.section}>
                    <Text style={styles.modalSection}>
                      Informações Importantes
                    </Text>
                    {selectedRoom.importantInfo.map((item, i) => (
                      <Text key={i} style={styles.modalBullet}>• {item}</Text>
                    ))}
                  </View>

                  <View style={styles.section}>
                    <Text style={styles.modalSection}>Pistas</Text>
                    {selectedRoom.clues.map((item, i) => (
                      <Text key={i} style={styles.modalBullet}>{item}</Text>
                    ))}
                  </View>
                </>
              )}
            </ScrollView>

            <TouchableOpacity style={styles.modalClose} onPress={closeRoom}>
              <Text style={styles.modalCloseText}>Fechar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
}