import React from 'react'
import { StyleSheet, View, Text, Linking } from 'react-native'
import QRCodeScanner from 'react-native-qrcode-scanner'
import { RNCamera as Camera } from 'react-native-camera'
import * as STATUS from '../../constants/userStatus'
import GradientBackground from '../../components/background'

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  title: {
    fontFamily: 'Kanit-Regular',
    fontSize: 40,
    marginTop: 20,
  },
  subtitle: {
    fontFamily: 'Kanit-Regular',
    fontSize: 25,
    marginBottom: 20,
  },
})

const QRScanner = () => {
  const onSuccess = e => {
    Linking.openURL(e.data).catch(err => console.error('An error occured', err))
  }

  return (
    <View style={styles.container}>
      <GradientBackground status="NORMAL">
        <Text style={{ ...styles.title, color: STATUS.NORMAL.NORMAL }}>
          {STATUS.TEXT.NORMAL}
        </Text>
        <Text style={styles.subtitle}>แสกนเพื่อบันทึกว่าเราเจอกัน</Text>
        <View
          style={{
            shadowColor: STATUS.DARK.NORMAL,
            shadowOffset: {
              width: 0,
              height: 12,
            },
            shadowOpacity: 0.58,
            shadowRadius: 16.0,
            elevation: 24,
            width: '80%',
            height: '70%',
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: '#fff',
            // borderRadius: 12,
          }}>
          <QRCodeScanner
            reactivate
            onRead={onSuccess}
            flashMode={Camera.Constants.FlashMode.auto}
            containerStyle={{
              width: '100%',
            }}
            cameraStyle={{
              width: '100%',
              height: '126%',
              alignSelf: 'center',
              justifyContent: 'center',
              marginTop: '-16%',
              // borderRadius: 12,
            }}
            showMarker
            markerStyle={{
              borderColor: '#fff',
            }}
          />
        </View>
      </GradientBackground>
    </View>
  )
}

export default QRScanner
