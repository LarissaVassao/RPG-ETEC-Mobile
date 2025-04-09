import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

import {NavigationContainer} from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import Home from './src/telas/Home';
import Usuario from './src/telas/Usuario';
import Clientes from './src/telas/Clientes';
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
        } else if (route.name === 'Usuario') {
          iconName = focused ? 'person-outline' : 'person-outline';
        }else if (route.name === 'Clientes') {
          iconName = focused ? 'people-outline' : 'people-outline';
        }
        
        //aqui define os ícones que irão aparecer nas Tabs
        return <Ionicons name={iconName} size={size} color={color} />;
      },
    })}
    tabBarOptions={{
      labelStyle: {
        fontSize: 12},
      activeTintColor: '#3f64c7',
      inactiveTintColor: 'gray',      
    }}    
    >
      <Tab.Screen name= "Usuario" component={Usuario}></Tab.Screen>
      <Tab.Screen name= "Clientes" component={Clientes}></Tab.Screen>
    </Tab.Navigator>
  )
}

export default function App() {
  const Stack = createStackNavigator();

  return (
    
 <NavigationContainer>
 <Stack.Navigator initialRouteName='Login'>

   <Stack.Screen 
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

   </Stack.Screen>
   <Stack.Screen name="Login" component={Login} options={{headerShown: false}}></Stack.Screen>
   <Stack.Screen name="Cadastro" component={Cadastro} options={{headerShown: false}}></Stack.Screen>
   <Stack.Screen name="Home" component={Home} options={{headerShown: false}}></Stack.Screen>      
   <Stack.Screen name="Clientes" component={Clientes} ></Stack.Screen>
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