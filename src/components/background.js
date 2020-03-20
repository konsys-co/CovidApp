import React from 'react'
import { StyleSheet } from 'react-native'
import { LinearGradient } from 'expo-linear-gradient'
import { LIGHT, VERY_DARK } from '../constants/userStatus'
import { COLOR } from '../constants/theme'

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // justifyContent: 'center',
    // paddingTop: 56,
    width: '100%',
    alignItems: 'center',
    backgroundColor: '#fff',
    paddingTop: 56,
  },
})

export default ({ children, status, style, dark }) => {
  const colorSet = dark ? [VERY_DARK[status], COLOR.BLACK, COLOR.BLACK] : [LIGHT[status], COLOR.WHITE, COLOR.WHITE]
  return (
    <LinearGradient
      colors={colorSet}
      start={{ x: 0, y: 0 }}
      end={{ x: 0, y: dark ? 0.6 : 0.4 }}
      style={{ ...styles.container, ...style }}
    >
      {children}
    </LinearGradient>
  )
}