import React, { Component } from 'react'
import { Platform, StyleSheet, Text, View } from 'react-native'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { NavigationContainer } from '@react-navigation/native'
import { FontAwesome5, Ionicons, AntDesign } from '@expo/vector-icons'
import { COLOR } from './constants/theme'

import QR from './pages/QR'
import Scanner from './pages/Scanner'
import Contacts from './pages/Contacts'
import Menu from './pages/Menu'

const BottomTab = createBottomTabNavigator()

export default () => {
  return (
    <NavigationContainer>
      <BottomTab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            if (route.name === 'QR') {
              return <FontAwesome5 name='qrcode' size={size} color={color} />
            } if (route.name === 'Scanner') {
              return <Ionicons name='md-qr-scanner' size={size} color={color} />
            } if (route.name === 'Contacts') {
              return <AntDesign name='contacts' size={size} color={color} />
            } if (route.name === 'Menu') {
              return <Ionicons name='md-menu' size={size} color={color} />
            }
            return null
          },
        })}
        tabBarOptions={{
          activeTintColor: COLOR.NORMAL,
          inactiveTintColor: 'gray',
        }}
      >
        <BottomTab.Screen name='QR' component={QR} />
        <BottomTab.Screen name='Scanner' component={Scanner} />
        <BottomTab.Screen name='Contacts' component={Contacts} />
        <BottomTab.Screen name='Menu' component={Menu} />
      </BottomTab.Navigator>
    </NavigationContainer>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
})
