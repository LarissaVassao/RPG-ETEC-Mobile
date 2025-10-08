import React, { useState, useEffect, useRef } from "react";
import {
  StatusBar,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  FlatList,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import axios from "axios";
import { useRoute } from "@react-navigation/native";
import { styles } from "./styles";

const API_URL = "http://10.239.0.214/chatOdonto_Larissa";
const EMOJIS_POSSIVEIS = ["🤖", "🧝", "🕵️‍♂️", "👾", "🥷"];
const EMOJI_PADRAO = "🎲";

export default function Chat() {
  const route = useRoute(); // permite receber nome vindo de outra tela
  const flatListRef = useRef();

  // Nome do paciente vindo de outra tela, ou padrão
  const nomeDoPaciente = route.params?.paciente || "Usuário";

  const [paciente, setPaciente] = useState(nomeDoPaciente);
  const [mensagem, setMensagem] = useState("");
  const [mensagens, setMensagens] = useState([]);
  const [userEmojis, setUserEmojis] = useState({});

  useEffect(() => {
    carregarMensagens();
    marcarComoLido();
    const interval = setInterval(() => {
      carregarMensagens();
      marcarComoLido();
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  // ---- Funções principais ----
  const marcarComoLido = async () => {
    try {
      await axios.post(`${API_URL}/marcar_lido.php`, { paciente });
    } catch (err) {
      console.log("Erro ao marcar como lido", err);
    }
  };

  const carregarMensagens = async () => {
    try {
      const res = await axios.get(`${API_URL}/listar.php`);
      const msgs = res.data.reverse();
      setMensagens(msgs);

      // Mapeia emojis
      setUserEmojis((prev) => {
        const novoMapa = { ...prev };
        msgs.forEach((msg) => {
          if (!novoMapa[msg.paciente]) {
            const emoji =
              EMOJIS_POSSIVEIS[
                Math.floor(Math.random() * EMOJIS_POSSIVEIS.length)
              ];
            novoMapa[msg.paciente] = emoji;
          }
        });
        return novoMapa;
      });
    } catch (err) {
      console.log("Erro ao buscar mensagens", err);
    }
  };

  const enviarMensagem = async () => {
    if (mensagem.trim() === "") return;
    try {
      await axios.post(`${API_URL}/enviar.php`, { paciente, mensagem });
      setMensagem("");
      carregarMensagens();
    } catch (err) {
      console.log("Erro ao enviar mensagem", err);
    }
  };

  // ---- Utilitários ----
  const formatarHora = (dataHora) => {
    if (!dataHora) return "";
    const date = new Date(dataHora);
    return date.toLocaleTimeString("pt-BR", {
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const renderStatus = (status) => {
    if (status === "entregue") return "✔️✔️";
    if (status === "lido") return "✅✅";
    return "";
  };

  // ---- Interface do Chat ----
  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : undefined}
    >
      <StatusBar backgroundColor="#124A69" barStyle="light-content" />
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Chat</Text>
      </View>

      <FlatList
        ref={flatListRef}
        data={mensagens}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => {
          const isMe = item.paciente === paciente;
          return (
            <View style={[styles.msg, isMe ? styles.msgMinha : styles.msgOutro]}>
              {!isMe && (
                <Text style={styles.paciente}>
                  {item.paciente}
                </Text>
              )}
              <Text style={styles.texto}>{item.mensagem}</Text>
              <View style={styles.linhaHora}>
                <Text style={styles.hora}>{formatarHora(item.data_hora)}</Text>
                {isMe && (
                  <Text
                    style={[
                      styles.status,
                      item.status === "lido" && styles.statusLido,
                    ]}
                  >
                    {renderStatus(item.status)}
                  </Text>
                )}
              </View>
            </View>
          );
        }}
        onContentSizeChange={() =>
          flatListRef.current.scrollToEnd({ animated: true })
        }
        onLayout={() => flatListRef.current.scrollToEnd({ animated: true })}
        style={styles.flatlistContent}
      />

      <View style={styles.inputArea}>
        <TextInput
          style={styles.inputMensagem}
          placeholder="Digite sua mensagem..."
          value={mensagem}
          onChangeText={setMensagem}
        />
        <TouchableOpacity style={styles.botaoEnviar} onPress={enviarMensagem}>
          <Text style={styles.botaoTexto}>➤</Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
}
