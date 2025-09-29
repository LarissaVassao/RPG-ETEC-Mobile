import React, { useState, useEffect, useRef } from "react";
import {StyleSheet, Text, View, TextInput, TouchableOpacity, FlatList, KeyboardAvoidingView, Platform, Image, ImageBackground, ScrollView} from "react-native";
import axios from "axios";
import { styles } from './styles';


const API_URL = "http://10.239.0.212/chatOdonto_Larissa";

const EMOJIS_POSSIVEIS = ["👄", "🪥", "🗣️", "👩‍⚕️", "🍽️"];
const EMOJI_PADRAO = "🦷";

export default function App() {
  const [paciente, setPaciente] = useState("");
  const [nomeConfirmado, setNomeConfirmado] = useState(false);
  const [mensagem, setMensagem] = useState("");
  const [mensagens, setMensagens] = useState([]);
  const [userEmojis, setUserEmojis] = useState({});
  const flatListRef = useRef();

  useEffect(() => {
    if (nomeConfirmado) {
      carregarMensagens();
      marcarComoLido();
      const interval = setInterval(carregarMensagens,marcarComoLido, 3000);
      return () => clearInterval(interval);
    }
  }, [nomeConfirmado]);

  const marcarComoLido = async () => {
  try {
    await axios.post(`${API_URL}/marcar_lido.php`, { paciente });
    carregarMensagens(); 
  } catch (err) {
    console.log("Erro ao marcar como lido", err);
  }
};

  const carregarMensagens = async () => {
    try {
      const res = await axios.get(`${API_URL}/listar.php`);
      const msgs = res.data.reverse();
      setMensagens(msgs);

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

  // para formatar a hora
  const formatarHora = (dataHora) => {
    if (!dataHora) return "";
    const date = new Date(dataHora);
    return date.toLocaleTimeString("pt-BR", {
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  // retornar o ícone de status 
  const renderStatus = (status) => {
    if (status === "entregue") return "✔️✔️"; 
    if (status === "lido") return "✅✅"; 
    return "";
  };

//Defina a Tela Inicial do Chat 
  if (!nomeConfirmado) {
    return (
      <View style={styles.loginContainer}>
        <ImageBackground
          source={require('./assets/imagem.jpg')}  resizeMode="cover" style={styles.image}
        >
          <View style={styles.branco}>
            <View style={styles.itensCOntainer}>
              <Text style={styles.titulo}> BEM-VINDO</Text>

              <View style={styles.digitarNome}>
                <Text style={styles.subtitulo}>Digite seu nome: </Text>
                <TextInput
                  style={styles.input}
                  placeholder="Seu nome"
                  value={paciente}
                  onChangeText={setPaciente}
                />
              </View>
              <TouchableOpacity
                style={styles.botaoEntrar}
                onPress={() => paciente.trim() !== "" && setNomeConfirmado(true)}
              >
                <Text style={styles.botaoTexto}>Entrar</Text>
              </TouchableOpacity>
            </View>
          </View>
          <Image source={require('./assets/icon.jpg')} style={styles.icon} resizeMode="contain"/>
          <Text style={styles.logotitulo}>ODONTOETEQUIAN</Text>


        </ImageBackground>
      </View>
    );
  }
    //defina a tela do Chat 
  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : undefined}
    >
      <Text style={styles.header}> Bem Vindo ao Chat, {paciente}</Text>
      
      <FlatList
        ref={flatListRef}
        data={mensagens}
        style={styles.flatlistContent}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => {
          const isMe = item.paciente === paciente;
          return (
            <View
              style={[
                styles.msg,
                isMe ? styles.msgMinha : styles.msgOutro,
              ]}
            >
              {!isMe && (
                <Text style={styles.paciente}>
                  {userEmojis[item.paciente] || EMOJI_PADRAO} {item.paciente}
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
        onLayout={() =>
          flatListRef.current.scrollToEnd({ animated: true })
        }
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

