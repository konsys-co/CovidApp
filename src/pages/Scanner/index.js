import React from 'react'
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  Linking
} from 'react-native'
import QRCodeScanner from 'react-native-qrcode-scanner'
import { RNCamera as Camera } from 'react-native-camera'
import * as STATUS from '../../constants/userStatus'


const styles = StyleSheet.create({
  centerText: {
    flex: 1,
    fontSize: 18,
    padding: 32,
    color: '#777'
  },
  textBold: {
    fontWeight: '500',
    color: '#000'
  },
  buttonText: {
    fontSize: 21,
    color: 'rgb(0,122,255)'
  },
  buttonTouchable: {
    padding: 16
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
    Linking.openURL(e.data).catch(err =>
      console.error('An error occured', err)
    )
  }

  return (
    <QRCodeScanner
      onRead={onSuccess}
      flashMode={Camera.Constants.FlashMode.auto}
      topContent={
        <View>
          <Text style={{ ...styles.title, color: STATUS.NORMAL.NORMAL }}>{STATUS.TEXT.NORMAL}</Text>
          <Text style={styles.subtitle}>แสกนเพื่อบันทึกว่าเราเจอกัน</Text>
        </View>
      }
      bottomContent={
        <TouchableOpacity style={styles.buttonTouchable}>
          <Text style={styles.buttonText}>OK. Got it!</Text>
        </TouchableOpacity>
      }
    />
  )
}

export default QRScanner
