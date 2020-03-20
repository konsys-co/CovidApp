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
import { NORMAL } from './constants/userStatus'

import QR from './pages/QR'
import Scanner from './pages/Scanner'
import Contacts from './pages/Contacts'
import Login from './pages/Login'
import Notifications from './pages/Notifications'

const BottomTab = createBottomTabNavigator()

const Main = ({ userData }) => {
  const status = 'NORMAL' // TODO: Fetch from server later.
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
            } if (route.name === 'Notifications') {
              return <AntDesign name="bells" size={size} color={color} />
            }
            return null
          },
        })}
        tabBarOptions={{
          activeTintColor: NORMAL[status],
          inactiveTintColor: 'gray',
        }}
      >
        <BottomTab.Screen name='QR'>
          {() => <QR userData={userData} />}
        </BottomTab.Screen>
        <BottomTab.Screen name='Scanner' component={Scanner} />
        <BottomTab.Screen name='Contacts' component={Contacts} />
        <BottomTab.Screen name='Notifications' component={Notifications} />
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
        .then(() => setIsFetching(false))
        .catch(e => console.log(e))
    }
  }, [isLoggedin])

  const fetchUserData = async () => {
    try {
      const token = await AsyncStorage.getItem('@FacebookOAuthKey:accessToken')
      if (token) {
        const response = await fetch(`https://graph.facebook.com/me?access_token=${token}&fields=id,name,email,picture.height(500)`)
        const data = await response.json()
        if (data.error) {
          setIsFetching(false)
          Alert.alert(data.error.message)
          return null
        }
        if (data) {
          setLoggedinStatus(true)
          setUserData(data)
          // setIsFetching(false)
        }
        // setIsFetching(false)
      }
    } catch (error) {
      Alert.alert(error.message)
    }
    return null
  }

  return (
    isFetching
      ? <View style={styles.container}><Text>Loading...</Text></View>
      : isLoggedin
        ? userData
          ? <Main userData={userData} />
          : <View style={styles.container}><Text>Error</Text></View>
        : <Login fetchUserData={fetchUserData} setLoggedinStatus={setLoggedinStatus} setIsFetching={setIsFetching} />
  )
}
