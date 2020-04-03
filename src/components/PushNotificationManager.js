import React from 'react'
import { Platform, View } from 'react-native'
import AsyncStorage from '@react-native-community/async-storage'
import messaging from '@react-native-firebase/messaging'

const DEVICE_TOKEN_TYPE = {
  ios: 'APNS',
  android: 'FCM',
}

export default class PushNotificationManager extends React.Component {
  componentDidMount() {
    console.log('PushNotificationManager')
    this.registerAppWithFCM()
    this.requestPermission()
  }

  registerAppWithFCM = async () => {
    await messaging().registerForRemoteNotifications()
  }

  requestPermission = async () => {
    const granted = messaging().requestPermission()

    if (granted) {
      console.log('User granted messaging permissions!')
    } else {
      console.log('User declined messaging permissions :(')
    }
  }

  render() {
    const { children } = this.props
    return <View style={{ flex: 1 }}>{children}</View>
  }
}
