/* eslint-disable no-undef */
import React, { useState } from 'react'
import { Text, View, TouchableOpacity, StyleSheet } from 'react-native'
import * as Facebook from 'expo-facebook'

const LoginPage = ({ setLoggedinStatus, setUserData }) => {
  // const [isLoggedin, setLoggedinStatus] = useState(false)
  // const [userData, setUserData] = useState(null)
  const [isImageLoading, setImageLoadStatus] = useState(false)

  facebookLogIn = async () => {
    try {
      await Facebook.initializeAsync('426673067758214')
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
        // Get the user's name using Facebook's Graph API
        fetch(`https://graph.facebook.com/me?access_token=${token}&fields=id,name,email,picture.height(500)`)
          .then(response => response.json())
          .then(data => {
            setLoggedinStatus(true)
            setUserData(data)
          })
          .catch(e => console.log(e))
      } else {
        // type === 'cancel'
      }
    } catch ({ message }) {
      alert(`Facebook Login Error: ${message}`)
    }
  }

  logout = () => {
    setLoggedinStatus(false)
    setUserData(null)
    setImageLoadStatus(false)
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