import React, { useState } from "react";
import { View, Text, TouchableOpacity, ScrollView, Modal } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { styles } from "./styles";

export default function CampanhaPronta() {
  const navigation = useNavigation();
  const [selectedRoom, setSelectedRoom] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);

  // --- DADOS DAS SALAS ---
  const roomData = {
    "Sala de Aula": {
      title: "Sala de Aula",
      description:
        "Uma sala comum que comporta 35 alunos. Possui 5 fileiras com 7 mesas cada, a mesa do professor, lousa, televisão, relógio de parede, ar-condicionado e armários individuais no fundo da sala.",
      importantInfo: [
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
      description:
        "Um ambiente silencioso, cheio de estantes longas e altas. Há mesas de estudo espalhadas e computadores antigos. O bibliotecário, um homem mais velho e cansado, pode ser encontrado dormindo em sua cadeira.",
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
      description:
        "Um quarto simples com duas camas, mas apenas uma está sendo usada. O ambiente é limpo e organizado, mas há uma sensação de solidão no ar.",
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
      description:
        "Um espaço amplo e silencioso, o vento sopra de forma estranha ao entardecer. As arquibancadas estão vazias, mas a atmosfera é pesada e há um leve eco metálico, como se algo se movesse por baixo das estruturas.",
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

  return (
    <View style={styles.container}>
      {/* --- BARRA DE NAVEGAÇÃO --- */}
      <View style={styles.navBar}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={28} color="#2295D1" />
        </TouchableOpacity>
        <Text style={styles.navTitle}>Campanha Pronta</Text>
        <View style={{ width: 28 }} />
      </View>

      {/* --- TÍTULO --- */}
      <ScrollView style={styles.content}>
        <Text style={styles.title}>Aventura: O Mistério das Pulseiras</Text>
        <Text style={styles.subtitle}>Selecione um local para explorar:</Text>

        {/* --- LISTA DE SALAS --- */}
        {Object.keys(roomData).map((roomName) => (
          <TouchableOpacity
            key={roomName}
            style={styles.roomButton}
            onPress={() => openRoom(roomName)}
          >
            <Ionicons name="location-outline" size={22} color="#2295D1" />
            <Text style={styles.roomButtonText}>{roomName}</Text>
            <Ionicons name="chevron-forward" size={20} color="#2295D1" />
          </TouchableOpacity>
        ))}
      </ScrollView>

      {/* --- MODAL DE DETALHES --- */}
      <Modal visible={modalVisible} animationType="slide" transparent={true}>
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <ScrollView>
              {selectedRoom && (
                <>
                  <Text style={styles.modalTitle}>{selectedRoom.title}</Text>

                  <Text style={styles.modalSection}>Descrição</Text>
                  <Text style={styles.modalText}>
                    {selectedRoom.description}
                  </Text>

                  <Text style={styles.modalSection}>
                    Informações Importantes
                  </Text>
                  {selectedRoom.importantInfo.map((item, i) => (
                    <Text key={i} style={styles.modalBullet}>• {item}</Text>
                  ))}

                  <Text style={styles.modalSection}>Pistas</Text>
                  {selectedRoom.clues.map((item, i) => (
                    <Text key={i} style={styles.modalBullet}>{item}</Text>
                  ))}
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
