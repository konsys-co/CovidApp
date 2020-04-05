import React, { useEffect } from 'react'
import { Platform, View, Alert } from 'react-native'
import fcm from '@react-native-firebase/messaging'
import AsyncStorage from '@react-native-community/async-storage'

const DEVICE_TOKEN_TYPE = {
  ios: 'APNS',
  android: 'FCM',
}

const messaging = fcm()

const PushNotificationManager = ({ children }) => {
  console.log('PushNotificationManager Running...')
  const registerAppWithFCM = async () => {
    await messaging.registerForRemoteNotifications()

    const deviceToken = await messaging.getToken()
    console.log('Received device token :', deviceToken)

    const userToken = await AsyncStorage.getItem(
      '@TidyoungUserToken:accessToken',
    )
    const body = JSON.stringify({
      deviceToken,
      type: DEVICE_TOKEN_TYPE[Platform.OS],
    })
    console.log('/push-device body :', body)

    // eslint-disable-next-line no-undef
    fetch('https://tidyoung.devspree.xyz/notifications/push-device', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: userToken ? `Bearer ${userToken}` : '',
      },
      body,
    })
  }

  const requestPermission = () => {
    const granted = messaging.requestPermission()
    if (granted) {
      console.log('User granted messaging permissions!')
    } else {
      console.log('User declined messaging permissions :(')
    }
  }

  useEffect(() => {
    const registerNotification = async () => {
      await registerAppWithFCM()
      requestPermission()
    }
    registerNotification()

    // Background messages
    messaging.setBackgroundMessageHandler(async remoteMessage => {
      console.log('Message handled in the background!', remoteMessage)
    })

    // Foreground messages
    const unregisterOnMessage = messaging.onMessage(async remoteMessage => {
      console.log('Message handled in the foreground!', remoteMessage)
      // Alert.alert('A new FCM message arrived!', JSON.stringify(remoteMessage))
    })

    return () => {
      unregisterOnMessage()
      messaging.unregisterForRemoteNotifications()
    }
  }, [])

  return <View style={{ flex: 1 }}>{children}</View>
}

export default PushNotificationManager
