import React, { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';

import {NavigationContainer} from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import Home from './src/telas/Home';
import EntrarCampanha from './src/telas/EntrarCampanha';
import CriarCampanha from './src/telas/CriarCampanha';
import Login from './src/telas/Login';
import Cadastro from './src/telas/Cadastro';
import Tutorial from './src/telas/Tutorial';

import CadastrarPersonagem from './src/telas/Jogador/CadastrarPersonagem';
import CadastrarNpc from './src/telas/Jogador/CadastrarNpc';
import CadastrarMapa from './src/telas/Jogador/CadastrarMapa';
import ListaPersonagens from './src/telas/Jogador/ListaPersonagens';
import ListaNpcs from './src/telas/Jogador/ListaNpcs';
import ListaMapas from './src/telas/Jogador/ListaMapas';

import Personagem from './src/telas/Jogador/Personagem';
import Npc from './src/telas/Jogador/Npc';
import TelaCampanha from './src/telas/TelaCampanha';
import Mapa from './src/telas/Jogador/Mapa';
import TelaChat from './src/telas/Jogador/TelaChat';

import { UserProvider } from './src/context/UserContext';

import { Ionicons } from '@expo/vector-icons';
  // const [mestre, setMestre] = useState(false);
  //   useEffect(() => {
  //       const listarNpcs = async () => {
  //           try{
            
  //           console.log("Id da Campanha: "+campanha);
  //           console.log("Id da Usuario: "+user.id);
  //           const res = await api.get("rpgetec/verificarMestre.php", {params: {id_campanha: campanha, id_usuario: user.id}});
  //           console.log("Resultado de verificar mestre: "+res.data.mestre);
  //           setMestre(res.data.mestre);
              
  //           try {
                
  //               const res = await api.get("rpgetec/listarNpcs.php", {params: {id_campanha: campanha, mestre: mestre, id_usuario: user.id}});
  //               console.log('CAMPANHA:' + campanha)
  //               console.log(res.data);
  //               if(res.data.success){
  //               const personagensMapeados = res.data.personagens.map(p => ({
  //                   id: p.id,
  //                   nome: p.nome,
  //                   imagem: require('../../../../assets/img/logo.png') 
  //               })); 
  //               setPersonagens(personagensMapeados);
  //             }
  //           } catch (error) {
  //               console.error("Erro ao buscar personagens:", error);
  //           }  }catch (error) {
  //               console.error("Erro ao verificar se mestre:", error);
  //           }
  //       };

  //       listarNpcs();
  //   }, []);

const Tab = createBottomTabNavigator();

function Tabs(){
  return(
    <Tab.Navigator
    screenOptions={({ route }) => ({
      keyboardHidesTabBar: true,
      tabBarIcon: ({ focused, color, size }) => {
        let iconName;
        color= '#124A69'
        size = 30
        if (route.name === 'TelaCampanha') {
          iconName = focused
            ? 'home'
            : 'home-outline';

        }else if (route.name === 'ListaPersonagens') {
          iconName = focused ? 'person' : 'person-outline';
        }
         else if (route.name === 'ListaNpcs'){
          iconName = focused ? 'walk' : 'walk-outline'
        }
        else if (route.name === 'ListaMapas'){
          iconName = focused ? 'map' : 'map-outline'
        }
        else if (route.name === 'TelaChat'){
          iconName = focused ? 'chatbubble-ellipses' : 'chatbubble-ellipses-outline'
        }
        
        return <Ionicons name={iconName} size={size} color={color} />;
      },
    })}
    tabBarOptions={{
      labelStyle: {
        fontSize: 12},
      activeTintColor: '#3f64c7',
      inactiveTintColor: 'gray', 
      display: 'none',   
      tabBarStyle:{
        height: 1000
      }  
    }}    
    >
      {/* <Tab.Screen name= "TelaCampanha" component={TelaCampanha} options={{headerShown: false, tabBarShowLabel: false}}></Tab.Screen> */}
      <Tab.Screen name= "ListaPersonagens" component={ListaPersonagens} options={{headerShown: false, tabBarShowLabel: false}}></Tab.Screen>
      <Tab.Screen name= "ListaNpcs" component={ListaNpcs} options={{headerShown: false, tabBarShowLabel: false}}></Tab.Screen>

      <Tab.Screen name= "ListaMapas" component={ListaMapas} options={{headerShown: false, tabBarShowLabel: false}}></Tab.Screen>
      <Tab.Screen name= "TelaChat" component={TelaChat} options={{headerShown: false, tabBarShowLabel: false}}></Tab.Screen>
     


    </Tab.Navigator>
  )
}

export default function App() {
  const Stack = createStackNavigator();

  return (
  <UserProvider>
 <NavigationContainer>
 <Stack.Navigator initialRouteName='Login'>

   {/* <Stack.Screen 
       name="Usuario" 
       component={Tabs}
       options={{
         title:'Meu Aplicativo',
         headerStyle:{
         backgroundColor: '#D80303',
         },
         headerTintColor: '#FFF' , 
         headerShown: true         
       }}
       >

   </Stack.Screen> */}

   <Stack.Screen name="Login" component={Login} options={{headerShown: false}}></Stack.Screen>
   <Stack.Screen name="Cadastro" component={Cadastro} options={{headerShown: false}}></Stack.Screen>
   <Stack.Screen name="Home" component={Home} options={{headerShown: false}}></Stack.Screen>      
   <Stack.Screen name="CriarCampanha" component={CriarCampanha} options={{headerShown: false}}></Stack.Screen>
   <Stack.Screen name="EntrarCampanha" component={EntrarCampanha}  options={{headerShown: false}}></Stack.Screen>
   <Stack.Screen name="CadastrarPersonagem" component={CadastrarPersonagem}  options={{headerShown: false}}></Stack.Screen>
   <Stack.Screen name="CadastrarNpc" component={CadastrarNpc}  options={{headerShown: false}}></Stack.Screen>
   <Stack.Screen name="CadastrarMapa" component={CadastrarMapa}  options={{headerShown: false}}></Stack.Screen>
   <Stack.Screen name="ListaNpcs" component={ListaNpcs} options={{headerShown: false}} ></Stack.Screen>
   <Stack.Screen name="ListaPersonagens" component={ListaPersonagens} options={{headerShown: false}} ></Stack.Screen>
   <Stack.Screen name="Personagem" component={Personagem} options={{headerShown: false}} ></Stack.Screen>
   <Stack.Screen name="Npc" component={Npc} options={{headerShown: false}} ></Stack.Screen>
   <Stack.Screen name="TelaCampanha" component={Tabs} options={{headerShown: false}}></Stack.Screen>
   <Stack.Screen name="Mapa" component={Mapa} options={{headerShown: false}}></Stack.Screen>
   <Stack.Screen name="ListaMapas" component={ListaMapas} options={{headerShown: false}}></Stack.Screen>
   <Stack.Screen name="Tutorial" component={Tutorial} options={{headerShown: false}}></Stack.Screen>
   <Stack.Screen name="TelaChat" component={TelaChat} options={{headerShown: false}}></Stack.Screen>



 </Stack.Navigator>
</NavigationContainer>
</UserProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});