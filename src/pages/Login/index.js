/* eslint-disable no-undef */
import React, { useState } from 'react'
import { Text, View, TouchableOpacity, StyleSheet, Alert, AsyncStorage } from 'react-native'
import * as Facebook from 'expo-facebook'

const LoginPage = ({ setLoggedinStatus, fetchUserData, setIsFetching }) => {
  facebookLogIn = async () => {
    try {
      await Facebook.initializeAsync('324984161652492')
      const {
        type,
        token,
        expires,
        permissions,
        declinedPermissions,
      } = await Facebook.logInWithReadPermissionsAsync({
        permissions: ['public_profile'],
      })
      if (type === 'success') {
        await AsyncStorage.setItem('@FacebookOAuthKey:accessToken', token)
        fetchUserData()
      } else {
        // type === 'cancel'
      }
    } catch ({ message }) {
      alert(`Facebook Login Error: ${message}`)
    }
  }

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.loginBtn} onPress={() => facebookLogIn()}>
        <Text style={{ color: '#fff' }}>Login with Facebook</Text>
      </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#e9ebee',
    alignItems: 'center',
    justifyContent: 'center',
  },
  loginBtn: {
    backgroundColor: '#4267b2',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 20
  },
})

export default LoginPage