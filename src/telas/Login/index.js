import React,{useState,useEffect} from 'react';
import {StyleSheet,Text,View,KeyboardAvoidingView,Image,Animated,TouchableOpacity, TextInput} from 'react-native';

export default function Login({navigation}){
    const[offset] = useState(new Animated.ValueXY({x:0, y:90}));
    const[opac] = useState(new Animated.Value(0));
    const[senha,setSenha] = useState(''); 
    const[email,setEmail] = useState(''); 
  
    useEffect(()=> {
      Animated.parallel([
        Animated.spring(offset.y, {
          toValue:0, 
          speed:4,
          bounciness:20
        }),
        Animated.timing(opac, {
          toValue:1,
          duration:2000,
        })
      ]).start();
     
    }, []);
    
    return (        
      <KeyboardAvoidingView 
        style={styles.background}>
        <View style={styles.logo}>
          <Image style={{width:320}} resizeMode = "contain" source={require('../../../assets/img/logo.png')}></Image>
          <Text style={styles.titulo}>Login</Text>
        </View>
    
      <Animated.View 
          style={[styles.formulario,
            {
              opacity: opac,
              transform: [{translateY: offset.y}]
            }
      ]}>

        <TextInput
          style={styles.input}
          placeholder='Digite o seu email aqui'
          onChangeText={setEmail}
        ></TextInput>

        <TextInput
          style={styles.input}
          placeholder='Digite a sua senha aqui'
          onChangeText={setSenha}
        ></TextInput>

        <View style={styles.viewBotao}>
            <TouchableOpacity
              style={styles.botao}
              onPress={() => navigation.navigate("Home" , {email}, {senha})}
            >
              <Text style={styles.textoBotao}>Entrar</Text>
            </TouchableOpacity>
        </View>

        <Text style={styles.texto}>Não possui uma conta?</Text>

        <View style={styles.viewBotao}>
            <TouchableOpacity
              style={styles.botao}
              onPress={() => navigation.navigate("Cadastro")}
            >
              <Text style={styles.textoBotao}>Criar Conta</Text>
            </TouchableOpacity>
        </View>

      </Animated.View>
    </KeyboardAvoidingView>
    );
}
const styles= StyleSheet.create({
    background: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',

        backgroundColor: '#fff'
      },
    
      logo: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
      },
    
      formulario: {
        flex: 1,
        paddingBottom:40,
        justifyContent: 'center',
        alignItems: 'center',
        width: '90%',
        marginTop:-120
      },
    
      input: {
        backgroundColor: '#f5edff',
        marginBottom: 15,
        color: '#222',
        fontSize: 17,
        borderRadius: 7,
        padding:10,
        width: '90%'
      },
    
      viewBotao:{
        width: '90%',
        borderRadius: 7,
      },
    
      botao: {
        backgroundColor: '#3B004F',
        height:45,
        alignItems:'center',
        justifyContent:'center',
        borderRadius: 7,
        padding:10,
        marginTop: 10
        
      },
      textoBotao:{
        color:'#FFF',
        fontSize:18,
        fontWeight:'semibold'
      },

      titulo: {
        fontSize: 50,
        color: '#3B004F',
        fontWeight: 'bold',
        fontFamily: 'Comic-Sans',
        marginTop:-30
      },
      texto: {
        fontSize: 18,
        alignItems: 'center',
        fontWeight: 'medium',
        textDecorationLine: 'underline',
        marginTop: 5
      }      
    });
    