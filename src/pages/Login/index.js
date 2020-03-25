/* eslint-disable camelcase */
/* eslint-disable no-undef */
import React, { useState } from 'react'
import { Text, View, TouchableOpacity, StyleSheet, Alert, AsyncStorage, Image } from 'react-native'
import * as Facebook from 'expo-facebook'
import { FontAwesome5 } from '@expo/vector-icons'
import { LinearGradient } from 'expo-linear-gradient'
import { COLOR } from '../../constants/theme'
import logo from '../../../assets/images/logo.png'

const LoginPage = ({ setLoggedinStatus, fetchUserData, setIsFetching }) => {
  facebookLogIn = async () => {
    try {
      await Facebook.initializeAsync('2557659367809347')
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
        const loginRes = await fetch('https://tidyoung.devspree.xyz/account/login', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            grant_type: 'facebook',
            token 
          })
        })
        const loginResJson = await loginRes.json()
        const { access_token, refresh_token, token_type  } = loginResJson
        await AsyncStorage.multiSet(
          ['@TidyoungUserToken:accessToken', access_token],
          ['@TidyoungUserToken:refreshToken', refresh_token],
          ['@TidyoungUserToken:tokenTypr', token_type]
        )
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
      <Image source={logo} style={{ width: 180, height: 180, marginBottom: 24 }} />
      <Text style={styles.title}>ติดยัง?</Text>
      <LinearGradient
        colors={[COLOR.BLUE, COLOR.MINT]}
        start={{ x: 1, y: 0 }}
        end={{ x: 0, y: 0 }}
        style={{ height: 1, width: '60%', marginTop: 40 }}
      />
      <Text style={{ ...styles.subTitle, marginTop: 16 }}>สแกนเมื่อเจอเพื่อน</Text>
      <Text style={{ ...styles.subTitle, marginBottom: 16 }}>แจ้งเตือนเมื่อเพื่อนเป็น</Text>
      <LinearGradient
        colors={[COLOR.BLUE, COLOR.MINT]}
        start={{ x: 1, y: 0 }}
        end={{ x: 0, y: 0 }}
        style={{ height: 1, width: '60%', marginBottom: 64 }}
      />
      <TouchableOpacity style={styles.loginBtn} onPress={() => facebookLogIn()}>
        <FontAwesome5 name='facebook' size={32} color={COLOR.WHITE} />
        <Text style={styles.textButton}>เริ่มใช้งาน</Text>
      </TouchableOpacity>
      <View style={{ flexDirection: 'row', marginTop: 12 }}>
        <Text style={{ ...styles.label }}>เมื่อเข้าสู่ระบบ ฉันยอมรับ</Text>
        <Text style={{
          ...styles.label,
          textDecorationLine: 'underline',
          textDecorationStyle: 'solid',
          textDecorationColor: '#000'
        }}
        >เงื่อนไขในการใช้งาน</Text>
      </View>
    </View >
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLOR.WHITE,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    color: COLOR.BLACK,
    fontFamily: 'Kanit-Medium',
    fontSize: 48,
  },
  label: {
    color: COLOR.BLACK,
    fontFamily: 'Kanit-Regular',
    fontSize: 16,
  },
  subTitle: {
    color: COLOR.BLACK,
    fontFamily: 'Kanit-Regular',
    fontSize: 24,
  },
  loginBtn: {
    backgroundColor: '#4267b2',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 10,
    alignItems: 'center',
    flexDirection: 'row',
    width: '70%',
    justifyContent: 'center',
    shadowColor: COLOR.BLACK,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.23,
    shadowRadius: 2.62,
    elevation: 4,
  },
  textButton: {
    color: COLOR.WHITE,
    fontFamily: 'Kanit-Regular',
    fontSize: 24,
    marginLeft: 16,
  }
})

export default LoginPage