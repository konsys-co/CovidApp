import React, { useEffect, useState } from 'react'
import { Platform, View, Text, StyleSheet } from 'react-native'
import { Button } from 'react-native-elements'
import Modal from 'react-native-modal'
import fcm from '@react-native-firebase/messaging'
import AsyncStorage from '@react-native-community/async-storage'

import * as STATUS from '../constants/userStatus'
import { COLOR } from '../constants/theme'

const DEVICE_TOKEN_TYPE = {
  ios: 'APNS',
  android: 'FCM',
}

const messaging = fcm()

const styles = StyleSheet.create({
  notiWrapper: {
    flex: 0.4,
    borderRadius: 15,
    backgroundColor: 'white',
  },
  notiContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  notiTitle: {
    fontFamily: 'Kanit-Regular',
    fontSize: 26,
    marginBottom: 20,
    color: COLOR.BLUE,
  },
  notiMsg: {
    fontFamily: 'Kanit-Regular',
    fontSize: 16,
    marginBottom: 20,
    color: COLOR.BLACK,
  },
  btnContainer: {
    display: 'flex',
    width: '100%',
  },
  button: {
    width: '85%',
    alignSelf: 'center',
    backgroundColor: 'transparent',
    borderWidth: 3,
    borderRadius: 10,
    marginBottom: 15,
  },
  btnText: {
    color: '#000',
    fontFamily: 'Kanit-Regular',
    fontSize: 20,
  },
})

const PushNotificationManager = ({ children }) => {
  const [isVisible, setIsVisible] = useState(false)
  const [notiTitle, setNotitle] = useState(null)
  const [notiMsg, setNotiMsg] = useState(null)

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
      const notiPayload = remoteMessage.data
      const { notification } = notiPayload
      const { title } = notification
      const { body } = notification
      setNotitle(title)
      setNotiMsg(body)
      setIsVisible(true)
    })

    return () => {
      unregisterOnMessage()
      messaging.unregisterForRemoteNotifications()
    }
  }, [])

  return (
    <View style={{ flex: 1 }}>
      {children}
      <View>
        <Modal
          isVisible={isVisible}
          onBackdropPress={() => setIsVisible(false)}
          onBackButtonPress={() => setIsVisible(false)}>
          <View style={styles.notiWrapper}>
            <View style={styles.notiContainer}>
              <Text style={styles.notiTitle}>TidYoung Notification</Text>
              <Text style={styles.notiMsg}>เพื่อนของคุณ</Text>
              <Text style={styles.notiMsg}>{notiTitle}</Text>
              <Text style={styles.notiMsg}>{notiMsg}</Text>
              <View style={styles.btnContainer}>
                <Button
                  title="รับรู้และเช็คอาการตัวเอง"
                  titleStyle={styles.btnText}
                  buttonStyle={{
                    ...styles.button,
                    borderColor: STATUS.NORMAL.normal,
                  }}
                  onPress={() => setIsVisible(false)}
                />
              </View>
            </View>
          </View>
        </Modal>
      </View>
    </View>
  )
}

export default PushNotificationManager
