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

import { Ionicons } from '@expo/vector-icons';
const Tab = createBottomTabNavigator();

function Tabs(){
  return(
    <Tab.Navigator
    screenOptions={({ route }) => ({
      tabBarIcon: ({ focused, color, size }) => {
        let iconName;
        color= '#d0d'
        size = 30
        if (route.name === 'Home') {
          iconName = focused
            ? 'home-outline'
            : 'home-outline';
        } else if (route.name === 'Entrar em uma campanha') {
          iconName = focused ? 'log-in-outline' : 'log-in-outline';
        }else if (route.name === 'Criar uma campanha') {
          iconName = focused ? 'create-outline' : 'create-outline';
        }
        return <Ionicons name={iconName} size={size} color={color} />;
      },
    })}
    tabBarOptions={{
      labelStyle: {
        fontSize: 12},
      activeTintColor: '#3f64c7',
      inactiveTintColor: 'gray',    
      tabBarStyle:{
        height: 1000
      }  
    }}    
    >
      <Tab.Screen name= "Entrar em uma campanha" component={EntrarCampanha}></Tab.Screen>
      <Tab.Screen name= "Criar uma campanha" component={CriarCampanha}></Tab.Screen>
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