import React from 'react';
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
import CadastrarPersonagem from './src/telas/CadastrarPersonagem';
import Personagem from './src/telas/Personagem';
import ListaPersonagens from './src/telas/ListaPersonagens';
import TelaCampanha from './src/telas/TelaCampanha';

import { Ionicons } from '@expo/vector-icons';
const Tab = createBottomTabNavigator();

function Tabs(){
  return(
    <Tab.Navigator
    screenOptions={({ route }) => ({
      tabBarIcon: ({ focused, color, size }) => {
        let iconName;
        color= '#3B004F'
        size = 30
        if (route.name === 'TelaCampanha') {
          iconName = focused
            ? 'home-outline'
            : 'home-outline';

        }else if (route.name === 'ListaPersonagens') {
          iconName = focused ? 'person-outline' : 'person-outline';
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
       <Tab.Screen name= "TelaCampanha" component={TelaCampanha} options={{headerShown: false, tabBarShowLabel: false}}></Tab.Screen>
      <Tab.Screen name= "ListaPersonagens" component={ListaPersonagens} options={{headerShown: false, tabBarShowLabel: false}}></Tab.Screen>

    </Tab.Navigator>
  )
}

export default function App() {
  const Stack = createStackNavigator();

  return (
    
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
   <Stack.Screen name="Tutorial" component={Tutorial}  options={{headerShown: false}}></Stack.Screen>
   <Stack.Screen name="CadastrarPersonagem" component={CadastrarPersonagem}  options={{headerShown: false}}></Stack.Screen>
   <Stack.Screen name="ListaPersonagens" component={ListaPersonagens} options={{headerShown: false}} ></Stack.Screen>
   <Stack.Screen name="Personagem" component={Personagem} options={{headerShown: false}} ></Stack.Screen>
   <Stack.Screen name="TelaCampanha" component={Tabs} options={{headerShown: false}}></Stack.Screen>
   


 </Stack.Navigator>
</NavigationContainer>
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