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
import { useRoute } from "@react-navigation/native";
import { styles } from "./styles";

export default function Chat() {
  const route = useRoute(); // permite receber nome vindo de outra tela
  const flatListRef = useRef();

  // Nome do usuario vindo de outra tela, ou padrão
  const nomeDoUsuario = route.params?.usuario || "Usuário";
  
  const { user, campanha } = useUser();

  const [usuario, setUsuario] = useState(nomeDoUsuario);
  const [mensagem, setMensagem] = useState("");
  const [mensagens, setMensagens] = useState([]);

  useEffect(() => {
    carregarMensagens();
    const interval = setInterval(() => {
      carregarMensagens();
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  // ---- Funções principais ----

  const carregarMensagens = async () => {
    try {
      const res = await api.get('rpgetec/listar.php');
      const msgs = res.data.reverse();
      setMensagens(msgs);
    } catch (err) {
      console.log("Erro ao buscar mensagens", err);
    }
  };

  const enviarMensagem = async () => {
    if (mensagem.trim() === "") return;
    try {
      await api.post(`rpgetec/enviar.php`, { user: user.id, mensagem, campanha: campanha });
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
          const isMe = item.usuario === user.id;
          return (
            <View style={[styles.msg, isMe ? styles.msgMinha : styles.msgOutro]}>
              {!isMe && (
                <Text style={styles.usuario}>
                  {item.usuario}
                </Text>
              )}
              <Text style={styles.texto}>{item.mensagem}</Text>
              <View style={styles.linhaHora}>
                <Text style={styles.hora}>{formatarHora(item.data_hora)}</Text>
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
