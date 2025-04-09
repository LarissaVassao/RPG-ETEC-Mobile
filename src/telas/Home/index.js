import React, {useState} from "react";
import { StyleSheet, Text, View, Image, ImageBackground, TouchableOpacity } from "react-native";
import { LinearGradient } from 'expo-linear-gradient';

export default function Home({route, navigation}){
    return(
        <View style={styles.container}>
            <View style={styles.teste}> <LinearGradient
          colors={['#623372', '#b673ff']}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
          style={StyleSheet.absoluteFillObject}
        />  
        <Text style={styles.texto}>Criar uma Campanha de RPG</Text>
             <TouchableOpacity
                      style={styles.botaoA}
                      onPress={() => navigation.navigate("Login")}
                    >
                      <Text style={styles.textoBotaoA}>Criar</Text>
            </TouchableOpacity>

        </View>
            {/* <ImageBackground
                source={require('../../../assets/img/fundo.jpg')}
                style={styles.imgBg}
            >
                <View style={styles.logo}>
                    <Image
                        style={{
                            width: 320
                        }}
                        source={require('../../../assets/img/react.png')}
                    ></Image>
                </View>
                <Text style={styles.texto}>Bem-Vindo {route.params?.nome}</Text>
                <View style={styles.viewBotao}>
                    <TouchableOpacity
                        style={styles.botao}
                        onPress={() => navigation.navigate("Usuario")}
                    >
                        <Text style={styles.textoBotao}>Entrar no App</Text>
                    </TouchableOpacity>
                </View>
            </ImageBackground> */}
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
    teste: {
        paddingBottom: 10,
        paddingLeft: 100,
        marginLeft: - 60,
        borderBottomRightRadius: 100,
        borderTopRightRadius: 100,
        marginTop: -200,
        overflow: 'hidden',
    },
    texto: {
      fontFamily: 'Comic-Sans',
      fontSize: 20,
      marginTop: 20,
      left: -7,
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
    botaoA:{
        backgroundColor: "#fff",
        height: 30,
        alignItems: 'center',
        justifyContent: 'center',
        left: - 70,
        borderRadius: 7,
        padding: 10
    },
    textoBotaoA: {
        color: '#fff',
        fontSize: 18
    }
  });
  