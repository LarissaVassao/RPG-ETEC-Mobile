import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, KeyboardAvoidingView, Image, Animated,StatusBar, TouchableOpacity, TextInput } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function Login({ navigation }) {
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
                        onPress={() => navigation.navigate("Home", { email }, { senha })}
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

const styles = StyleSheet.create({
    background: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#F5F7FA',
        paddingHorizontal: 20,
    },
    container: {
        width: '100%',
        alignItems: 'center',
    },
   
    logoContainer: {
        marginBottom: 30,
        width: '100%',
        alignItems: 'center',
    },
    logo: {
        width: 200,
        height: 120,
    },
    form: {
        width: '100%',
        alignItems: 'center',
    },
    inputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#eaf6fb',
        borderWidth: 1,
        borderColor: '#9ebccc',
        borderRadius: 10,
        marginBottom: 15,
        paddingHorizontal: 10,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.08,
        shadowRadius: 4,
    },
    icon: {
        marginRight: 8,
    },
    input: {
        flex: 1,
        fontSize: 16,
        paddingVertical: 12,
        color: '#161616',
    },
    button: {
        backgroundColor: '#2295D1',
        width: '100%',
        borderRadius: 10,
        paddingVertical: 15,
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 10,
        shadowColor: '#2295D1',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.2,
        shadowRadius: 6,
        elevation: 5,
    },
    textButton: {
        color: '#fff',
        fontSize: 18,
        fontWeight: '700',
        letterSpacing: 1,
    },
    cadastroContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 20,
        marginBottom: 20,
    },
    cadastroText: {
        fontSize: 16,
        color: '#666',
    },
    cadastroLink: {
        fontSize: 16,
        color: '#2295D1',
        fontWeight: '600',
        textDecorationLine: 'underline',
    },
});