import React from 'react'
import { Platform, View } from 'react-native'
import AsyncStorage from '@react-native-community/async-storage'
import { Notifications } from 'react-native-notifications'

const DEVICE_TOKEN_TYPE = {
  ios: 'APNS',
  android: 'FCM',
}

export default class PushNotificationManager extends React.Component {
  componentDidMount() {
    console.log('PushNotificationManager')
    this.registerDevice()
    this.registerNotificationEvents()
  }

  registerDevice = async () => {
    const userToken = await AsyncStorage.getItem(
      '@TidyoungUserToken:accessToken',
    )
    Notifications.events().registerRemoteNotificationsRegistered(
      ({ deviceToken }) => {
        // TODO: Send the token to my server so it could send back push notifications...
        console.log('Device Token Received ===>', deviceToken)
        console.log('Platform ===>', Platform.OS)
        console.log('Token Type ===>', DEVICE_TOKEN_TYPE[Platform.OS])
        // eslint-disable-next-line no-undef
        fetch('https://tidyoung.devspree.xyz/notifications/push-device', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: userToken ? `Bearer ${userToken}` : '',
          },
          body: JSON.stringify({
            deviceToken,
            type: DEVICE_TOKEN_TYPE[Platform.OS],
          }),
        })
      },
    )
    Notifications.events().registerRemoteNotificationsRegistrationFailed(
      event => {
        console.error(event)
      },
    )

    Notifications.registerRemoteNotifications()
  }

  registerNotificationEvents = async () => {
    Notifications.events().registerNotificationReceivedForeground(
      (notification, completion) => {
        console.log('Notification Received - Foreground', notification)
        // Calling completion on iOS with `alert: true` will present the native iOS inApp notification.
        completion({ alert: true, sound: true, badge: true })
      },
    )

    Notifications.events().registerNotificationOpened(
      (notification, completion) => {
        console.log('Notification opened by device user', notification)
        console.log(
          `Notification opened with an action identifier: ${notification.identifier}`,
        )
        completion()
      },
    )

    Notifications.events().registerNotificationReceivedBackground(
      (notification, completion) => {
        console.log('Notification Received - Background', notification)

        // Calling completion on iOS with `alert: true` will present the native iOS inApp notification.
        completion({ alert: true, sound: true, badge: true })
      },
    )

    try {
      const notification = await Notifications.getInitialNotification()
      console.log('Initial notification was:', notification || 'N/A')
    } catch (err) {
      console.error('getInitialNotifiation() failed', err)
    }
  }

  render() {
    const { children } = this.props
    return <View style={{ flex: 1 }}>{children}</View>
  }
}
