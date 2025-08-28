import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, KeyboardAvoidingView, Image, Animated, TouchableOpacity, TextInput, Alert } from 'react-native';
import { showMessage } from "react-native-flash-message";

import api from "../../../services/api.js";

export default function Cadastro({ navigation }) {
    const [offset] = useState(new Animated.ValueXY({ x: 0, y: 90 }));
    const [opac] = useState(new Animated.Value(0));
    const [senha, setSenha] = useState('');
    const [email, setEmail] = useState('');
    const [usuario, setUsuario] = useState('');

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

    async function saveData() {     
            console.log("saveData start");       ;
           if (usuario == "" || email == "" || senha == "") {
            console.log("saveData error empty");  
            Alert.alert("Erro!", "Preencha todos os campos!");
            return;
        }
        else{
            console.log("saveData non-empty, proceding");  
            try{
                const res = await  api.get('rpgetec/checarUsuarios.php', {params: { user: usuario, email: email}});
            if (res.data.unique){
            console.log("saveData unique confirmed, proceding");  
                try {
            const obj = {
                nome: usuario, 
                email: email,               
                senha: senha,       
            }
            try{const res = await api.post('rpgetec/salvar.php',{ user: usuario, email: email, senha: senha});}
            catch(error){console.log(error)}
            if (res.data.sucesso === false) {
                Alert.alert("Erro ao salvar", res.data.mensagem);              
                return;
            }
            showMessage({
                message: "Salvo com Sucesso",
                description: "Registro Salvo",
                type: "success",
                duration: 800,             
            });     
            navigation.navigate("Login");     
        } catch (error) {
            Alert.alert("Ops", "Alguma coisa deu errado, tente novamente.");
        }
            
        }
        else{
            console.log("saveData non-unique, showing alert"); 
            Alert.alert("Email ou Usuario ja cadastrado!");
        }
        } catch (error){console.log("error on api.get"); console.log(error);}
    }     
}     
    return (
        <KeyboardAvoidingView style={styles.background}>
            <Animated.View
                style={[
                    styles.container,
                    {
                        opacity: opac,
                        transform: [{ translateY: offset.y }]
                    }
                ]}
            >
                <View style={styles.logoContainer}>
                    <Image
                        style={styles.logo}
                        resizeMode="contain"
                        source={require('../../../assets/img/logo.png')}
                    />
                </View>

                <View style={styles.formulario}>
                    <TextInput
                        style={styles.input}
                        placeholder='Digite o seu usuário aqui'
                        onChangeText={setUsuario}
                    />

                    <TextInput
                        style={styles.input}
                        placeholder='Digite o seu email aqui'
                        onChangeText={setEmail}
                    />

                    <TextInput
                        style={styles.input}
                        placeholder='Digite a sua senha aqui'
                        onChangeText={setSenha}
                    />

                    <View style={styles.viewBotao}>
                        <TouchableOpacity
                            style={styles.botao}
                            onPress={() => saveData()}
                        >
                            <Text style={styles.textoBotao}>Criar conta</Text>
                        </TouchableOpacity>
                    </View>

                    <TouchableOpacity onPress={() => navigation.navigate("Login")}>
                        <Text style={styles.texto}>Já possui uma conta?</Text>
                    </TouchableOpacity>
                </View>
            </Animated.View>
        </KeyboardAvoidingView>
    );
}

const styles = StyleSheet.create({
    background: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#fff'
    },
    container: {
        width: '100%',
        alignItems: 'center',
    },
    logoContainer: {
        marginBottom: 20, 
        width: '100%',
        alignItems: 'center',
    },
    logo: {
        width: 600,
        height: 150, 
    },
    formulario: {
        width: '90%',
        alignItems: 'center',
        paddingBottom: 40,
    },
    input: {
        backgroundColor: '#f5edff',
        marginBottom: 15,
        color: '#222',
        fontSize: 17,
        borderRadius: 7,
        padding: 10,
        width: '100%'
    },
    viewBotao: {
        width: '100%',
        borderRadius: 7,
    },
    botao: {
        backgroundColor: '#623372',
        height: 45,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 7,
        padding: 10,
        marginTop: 10
    },
    textoBotao: {
        color: '#FFF',
        fontSize: 18,
        fontWeight: '600'
    },
    texto: {
        fontSize: 18,
        alignItems: 'center',
        fontWeight: '500',
        textDecorationLine: 'underline',
        marginTop: 15,
        color: '#623372'
    }
});