import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, KeyboardAvoidingView, Image, Animated,StatusBar, TouchableOpacity, TextInput, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { styles } from './styles';
import { useUser } from "../../context/UserContext.js";
import api from "../../../services/api.js";

export default function Login({ navigation }) {
    const { setUser } = useUser();
    const { user } = useUser();
    const [offset] = useState(new Animated.ValueXY({ x: 0, y: 90 }));
    const [opac] = useState(new Animated.Value(0));
    const [senha, setSenha] = useState('');
    const [email, setEmail] = useState('');

    useEffect(() => {
        Animated.parallel([
            Animated.spring(offset.y, {
                toValue: 0,
                speed: 4,
                bounciness: 20,
                useNativeDriver: true
            }),
            Animated.timing(opac, {
                toValue: 1,
                duration: 2000,
                useNativeDriver: true
            })
        ]).start();
    }, []);

async function login(){
    try{const res = await api.get('rpgetec/checarUsuarios.php', {params: {email: email, senha: senha}});
    if (res.data.success)
    {
    setUser({ id: res.data.id, email, nome: res.data.nome });
    console.log(user)
    navigation.navigate("Home");
    }
    else{
      Alert.alert("Senha ou Email incorreto(s)!");
    }

  }
  catch(error){console.error(error)}
  }

    return (
        <KeyboardAvoidingView style={styles.background} behavior="padding">
            <Animated.View
                style={[
                    styles.container,
                    {
                        opacity: opac,
                        transform: [{ translateY: offset.y }]
                    }
                ]}
            >
                    <StatusBar backgroundColor="#F5F7FA" barStyle="dark-content" />
                

                <View style={styles.logoContainer}>
                    <Image
                        style={styles.logo}
                        resizeMode="contain"
                        source={require('../../../assets/img/logo.png')}
                    />
                </View>

                <View style={styles.form}>
                    <View style={styles.inputContainer}>
                        <Ionicons name="mail-outline" size={20} color="#124A69" style={styles.icon} />
                        <TextInput
                            style={styles.input}
                            placeholder='Digite o seu email'
                            placeholderTextColor="#666"
                            keyboardType="email-address"
                            onChangeText={setEmail}
                        />
                    </View>

                    <View style={styles.inputContainer}>
                        <Ionicons name="lock-closed-outline" size={20} color="#124A69" style={styles.icon} />
                        <TextInput
                            style={styles.input}
                            placeholder='Digite a sua senha'
                            placeholderTextColor="#666"
                            secureTextEntry
                            onChangeText={setSenha}
                        />
                    </View>

                    <TouchableOpacity
                        style={styles.button}
                        onPress={() => login()}
                    >
                        <Text style={styles.textButton}>ENTRAR</Text>
                    </TouchableOpacity>

                    <View style={styles.cadastroContainer}>
                        <Text style={styles.cadastroText}>Não possui uma conta? </Text>
                        <TouchableOpacity onPress={() => navigation.navigate("Cadastro")}>
                            <Text style={styles.cadastroLink}>Criar conta</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Animated.View>
        </KeyboardAvoidingView>
    );
}
