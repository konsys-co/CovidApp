/* eslint-disable no-undef */
import React, { useState } from 'react'
import { Text, View, Image, TouchableOpacity, ActivityIndicator, StyleSheet } from 'react-native'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { NavigationContainer } from '@react-navigation/native'
import { FontAwesome5, Ionicons, AntDesign } from '@expo/vector-icons'
// import * as Facebook from 'expo-facebook'
import { COLOR } from './constants/theme'

import QR from './pages/QR'
import Scanner from './pages/Scanner'
import Contacts from './pages/Contacts'
import Menu from './pages/Menu'
import Login from './pages/Login'

const BottomTab = createBottomTabNavigator()

const Main = () => {
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
    backgroundColor: '#e9ebee',
    alignItems: 'center',
    justifyContent: 'center',
  },
  logoutBtn: {
    backgroundColor: 'grey',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 20,
    position: 'absolute',
    bottom: 0
  },
})

export default () => {
  const [isLoggedin, setLoggedinStatus] = useState(false)
  const [userData, setUserData] = useState(null)
  const [isImageLoading, setImageLoadStatus] = useState(false)

  return (
    isLoggedin ?
      userData &&
      <View style={styles.container}>
        <Image
          style={{ width: 200, height: 200, borderRadius: 50 }}
          source={{ uri: userData.picture.data.url }}
          onLoadEnd={() => setImageLoadStatus(true)} />
        <ActivityIndicator size="large" color="#0000ff" animating={!isImageLoading} style={{ position: 'absolute' }} />
        <Text style={{ fontSize: 22, marginVertical: 10 }}>Hi {userData.name}!</Text>
        <TouchableOpacity style={styles.logoutBtn} onPress={() => logout()}><Text style={{ color: '#fff' }}>Logout</Text>
        </TouchableOpacity>
      </View>
      : <Login setUserData={setUserData} setLoggedinStatus={setLoggedinStatus} />
    // : <Main />
  )
}
