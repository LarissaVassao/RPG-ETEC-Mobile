import React, { useState, useRef, useCallback } from "react";
import {
  StatusBar,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  FlatList,
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
} from "react-native";
import { useRoute, useFocusEffect } from "@react-navigation/native";
import { styles } from "./styles";
import { useUser } from "../../../context/UserContext.js";
import api from "../../../../services/api.js";

export default function Chat() {
  const route = useRoute();
  const flatListRef = useRef();
  const { user, campanha } = useUser();
  const [mensagens, setMensagens] = useState([]);
  const [mensagem, setMensagem] = useState("");

  const carregarMensagens = async () => {
    try {
      const res = await api.get('rpgetec/listar.php', { params: { id_campanha: campanha }});
      setMensagens(res.data.mensagens || []);
    } catch (err) {
      console.error('Erro ao buscar mensagens:', err);
    }
  };

  useFocusEffect(
    useCallback(() => {
      carregarMensagens();
      const interval = setInterval(carregarMensagens, 3000);
      return () => clearInterval(interval);
    }, [campanha])
  );

const enviarMensagem = async () => {
  if (!mensagem.trim()) return;

  try {
    const mensagemParaEnviar = mensagem.trim();
    setMensagem("");
    const response = await api.post('rpgetec/enviar.php', {
      user: user.id,
      mensagem: mensagemParaEnviar,
      campanha: campanha
    });

    if (response.data.sucesso) {
      // Recarrega as mensagens para mostrar a nova mensagem
      await carregarMensagens();
    } else {
      console.error('Erro ao enviar mensagem:', response.data.mensagem);
      // Opcional: mostrar alerta para o usuário
      alert('Erro ao enviar mensagem: ' + response.data.mensagem);
      // Devolve a mensagem para o input se falhou
      setMensagem(mensagemParaEnviar);
    }
  } catch (err) {
    console.error('Erro ao enviar mensagem:', err);
    // Opcional: mostrar alerta para o usuário
    alert('Erro de conexão ao enviar mensagem');
    // Devolve a mensagem para o input se falhou
    setMensagem(mensagem);
  }
};

  const statusBarHeight = Platform.OS === 'android' ? StatusBar.currentHeight || 0 : 0;
  // ajuste esse valor conforme seu header (iOS costuma precisar mais offset)

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
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
            const isMe = item.id_usuario === user.id;
            return (
              <View style={[styles.msg, isMe ? styles.msgMinha : styles.msgOutro]}>
                {!isMe && <Text style={styles.usuario}>{item.usuario}</Text>}
                <Text style={styles.texto}>{item.mensagem}</Text>
              </View>
            );
          }}
          keyboardShouldPersistTaps="handled"
          contentContainerStyle={{ paddingBottom: 16 }}
          onContentSizeChange={() => flatListRef.current?.scrollToEnd({ animated: true })}
          onLayout={() => flatListRef.current?.scrollToEnd({ animated: true })}
        />

        <View style={styles.inputArea}>
          <TextInput
            style={styles.inputMensagem}
            placeholder="Digite sua mensagem..."
            value={mensagem}
            onChangeText={setMensagem}
            returnKeyType="send"
            onSubmitEditing={enviarMensagem}
            blurOnSubmit={false}
          />
          <TouchableOpacity style={styles.botaoEnviar} onPress={enviarMensagem}>
            <Text style={styles.botaoTexto}>➤</Text>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
