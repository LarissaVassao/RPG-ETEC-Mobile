import React, {useState} from "react";
import { StyleSheet, Text, View, Image, TouchableOpacity } from "react-native";
import { LinearGradient } from 'expo-linear-gradient';

export default function Home({route, navigation}){
    return(
        
        <View style={styles.container}>
            <View style={styles.nav}> 
             
                <Image style={{width:60, height: 60}} resizeMode = "contain" source={require('../../../assets/img/logo.png')}></Image>
            </View>

            <Text style={styles.titulo}>Bem vindo, [Usuario]! </Text> {/*Futuramente linkar com usuário*/}
            <View style={styles.criarC}> 
                <LinearGradient
                colors={['#623372', '#b673ff']}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}
                style={StyleSheet.absoluteFillObject}
                />  
                <Text style={styles.texto}>Criar uma Campanha de RPG</Text>
                <TouchableOpacity
                    style={styles.botao}
                    onPress={() => navigation.navigate("CriarCampanha")}
                    >
                    <Text style={styles.textoBotao}>Criar</Text>
                </TouchableOpacity>

            </View>


            <View style={styles.entrarC}> 
                <LinearGradient
                colors={['#b673ff', '#623372']}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}
                style={StyleSheet.absoluteFillObject}
                />  
                <Text style={styles.texto}>Entrar em uma Campanha de RPG</Text>
                <TouchableOpacity
                    style={styles.botao}
                    onPress={() => navigation.navigate("EntrarCampanha")}
                    >
                    <Text style={styles.textoBotao}>Entrar</Text>
                </TouchableOpacity>
            </View>


            <View style={styles.tutorial}>
                <Text style={styles.titTutorial}>ACESSAR AS REGRAS DO RPG</Text>
                <Text style={styles.textTutorial}>Jogos de interpretação (RPG) combatem a depressão ao estimular conexões sociais, reduzindo o isolamento. E por isso temos um sistema que poderá ser visto ao clicar no botão abaixo: </Text>

                <TouchableOpacity
                    style={styles.botao2}
                    onPress={() => navigation.navigate("Login")}
                    >
                    <Text style={styles.textoBotao2}>Acessar</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
    },
    tutorial: {
        width: '85%',
        height: 220,
        overflow: 'hidden',
        borderRadius: 15,
        margin: 30,
        backgroundColor: '#fff',
        borderWidth: 2,         
        borderColor: '#3B004F', 
        justifyContent: 'center',
        alignItems: 'center', 
        padding: 20

    },
    titTutorial: {
       fontSize: 15,
       fontWeight: 'semibold'
    }, 
    textTutorial: {
        textAlign: 'justify',
        fontSize: 15
    },
    nav: {
        width: '100%',
        height: 50,
        backgroundColor: '#3B004F', 
        justifyContent: 'center', 
        alignItems: 'center', 
        position: 'absolute',
        top: 0,
        zIndex: 1,
    },
    titulo: {
        fontSize: 30,
        alignItems: 'center',
        color: '#3B004F',
        fontWeight: 'bold',
        marginTop: 60,
        zIndex:1,
        marginBottom: 20,
      },


    criarC: {
        width:'90%',
        height: 90,
        //marginLeft: - 60,
        borderBottomRightRadius: 50,
        borderTopRightRadius: 50,
        marginTop: 0,
        overflow: 'hidden',
        justifyContent: 'center',
        alignItems: 'center',
        alignItems: 'center',
        alignSelf: 'flex-start',
    },
    entrarC: {
        width: '90%',
        height: 90,
        //marginRight: -30,
        borderBottomLeftRadius: 50,
        borderTopLeftRadius: 50,
        marginTop: 30,
        overflow: 'hidden',
        justifyContent: 'center',
        alignItems: 'center',
        alignSelf: 'flex-end', 
       
    },
    texto: {
      fontFamily: 'Comic-Sans',
      fontSize: 20,
      color: '#fff',
    },
    input:{
        textAlign: 'center',
        width: 100,
        borderWidth: 5,
        borderColor: 'black'
    },
    logo:{
        flex: 1,
        alignSelf: 'center',
        justifyContent: 'center'
    },
    imgBg:{
        width: '100%',
        height: '100%',
        opacity: 1
    },
    botao:{
        backgroundColor: "#fff",
        width:200,
        height: 30,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 7,
        padding: 10,
        marginTop: 10,
        borderRadius: 50
    },
    textoBotao: {
        color: '#623372',
        fontSize: 18,
        fontWeight: 'semibold'
    },
    botao2:{
        backgroundColor: "#3B004F",
        width:200,
        height: 30,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 7,
        padding: 10,
        marginTop: 10,
        borderRadius: 50
    },
    textoBotao2: {
        color: '#fff',
        fontSize: 18,
        fontWeight: 'semibold'
    },
  });
  