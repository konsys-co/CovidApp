/* eslint-disable no-unused-expressions */
/* eslint-disable no-nested-ternary */
/* eslint-disable no-undef */
import React, { useState, useEffect } from 'react'
import { Text, View, Image, TouchableOpacity, ActivityIndicator, StyleSheet, AsyncStorage, Alert } from 'react-native'
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
  const [isFetching, setIsFetching] = useState(true)
  const [userData, setUserData] = useState(null)
  const [isImageLoading, setImageLoadStatus] = useState(false)

  useEffect(() => {
    if (!isLoggedin) {
      fetchUserData()
        .catch(e => console.log(e))
    }
  }, [isLoggedin])

  const fetchUserData = async () => {
    try {
      const token = await AsyncStorage.getItem('@FacebookOAuthKey:accessToken')
      console.log('token', token)
      if (token) {
        const response = await fetch(`https://graph.facebook.com/me?access_token=${token}&fields=id,name,email,picture.height(500)`)
        const data = await response.json()
        if (data.error) {
          setIsFetching(false)
          Alert.alert(data.error.message)
          return null
        }
        console.log('data ===>', data)
        if (data) {
          setLoggedinStatus(true)
          setUserData(data)
        }
        setIsFetching(false)
      }
    } catch (error) {
      Alert.alert(error.message)
    }
    return null
  }

  const logout = () => {
    AsyncStorage.removeItem('@FacebookOAuthKey:accessToken')
    setLoggedinStatus(false)
    setUserData(null)
    setImageLoadStatus(false)
  }

  return (
    isFetching
      ? <View style={styles.container}><Text>Loading...</Text></View>
      : isLoggedin
        ? userData
          ? <View style={styles.container}>
            <Image
              style={{ width: 200, height: 200, borderRadius: 50 }}
              source={{ uri: userData.picture.data.url }}
              onLoadEnd={() => setImageLoadStatus(true)} />
            <ActivityIndicator size="large" color="#0000ff" animating={!isImageLoading} style={{ position: 'absolute' }} />
            <Text style={{ fontSize: 22, marginVertical: 10 }}>Hi {userData.name}!</Text>
            <TouchableOpacity style={styles.logoutBtn} onPress={() => logout()}><Text style={{ color: '#fff' }}>Logout</Text>
            </TouchableOpacity>
          </View>
          : <View style={styles.container}><Text>Error</Text></View>
        : <Login fetchUserData={fetchUserData} setLoggedinStatus={setLoggedinStatus} setIsFetching={setIsFetching} />
  )
  // : <Main />
}
