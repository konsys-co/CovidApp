import React, { useState, useEffect } from 'react'
import {
  StyleSheet,
  View,
  Text,
  Linking,
  Dimensions,
  Platform,
  Image,
} from 'react-native'
import QRCodeScanner from 'react-native-qrcode-scanner'
import { RNCamera as Camera } from 'react-native-camera'
import { Button } from 'react-native-elements'
import * as STATUS from '../../constants/userStatus'
import GradientBackground from '../../components/background'

const deviceWidth = Dimensions.get('window').width
const deviceHeight = Dimensions.get('window').height

const isAndroid = !!(Platform.OS === 'android')

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  title: {
    display: isAndroid ? 'none' : 'flex',
    fontFamily: 'Kanit-Regular',
    fontSize: 40,
    marginTop: 20,
    color: STATUS.NORMAL.NORMAL,
  },
  subtitle: {
    fontFamily: 'Kanit-Regular',
    fontSize: 25,
    marginBottom: 20,
  },
  modalContainer: {
    flex: 1,
    width: '100%',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff',
    borderRadius: 12,
  },
  modalDetailContainer: {
    display: 'flex',
    flexGrow: 2,
    alignItems: 'center',
    justifyContent: 'flex-end',
    marginTop: -100,
  },
  friendImg: {
    width: 133,
    height: 133,
    borderRadius: 133 / 2,
    marginBottom: 15,
  },
  friendName: {
    fontFamily: 'Kanit-Regular',
    fontSize: 25,
    color: STATUS.NORMAL.NORMAL,
  },
  modalText: {
    fontFamily: 'Kanit-Regular',
    fontSize: 16,
  },
  btnContainer: {
    display: 'flex',
    width: '100%',
    flexGrow: 1,
    justifyContent: 'flex-end',
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

const QRScanner = ({ userData }) => {
  const [showSuccessModal, setShowSuccessModal] = useState(false)

  // useEffect(() => {
  // return () => {
  //   setShowSuccessModal(false)
  // }
  // }, [])

  const onSuccess = e => {
    Linking.openURL(e.data).catch(err => console.error('An error occured', err))
  }

  const toggleShowSuccessModal = () => setShowSuccessModal(true)

  return (
    <View style={styles.container}>
      <GradientBackground status="NORMAL">
        <Text style={styles.title}>{STATUS.TEXT.NORMAL}</Text>
        <Text style={styles.subtitle} onPress={() => toggleShowSuccessModal()}>
          แสกน QR ของเพื่อนที่คุณเจอ
        </Text>
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
            height: deviceHeight * 0.62,
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: showSuccessModal ? '#fff' : 'transparent',
          }}>
          {showSuccessModal ? (
            <AddCloseContactSuccessModal userData={userData} />
          ) : (
            <QRCodeScanner
              reactivate
              onRead={onSuccess}
              flashMode={Camera.Constants.FlashMode.auto}
              containerStyle={{
                width: '100%',
                height: '100%',
              }}
              cameraStyle={{
                width: '100%',
                height: deviceHeight * 0.62,
                alignSelf: 'center',
                justifyContent: 'center',
                marginTop: isAndroid ? 0 : '-20%',
              }}
              showMarker
              markerStyle={{
                borderColor: '#fff',
              }}
            />
          )}
        </View>
      </GradientBackground>
    </View>
  )
}

const AddCloseContactSuccessModal = ({ userData }) => {
  return (
    <View style={styles.modalContainer}>
      <View style={styles.modalDetailContainer}>
        <Text style={styles.subtitle}>สแกนสำเร็จ</Text>
        <Image
          style={styles.friendImg}
          source={{ uri: userData.picture.data.url }}
        />
        <Text style={styles.friendName}>{userData.name}</Text>
        <Text style={styles.modalText}>ถูกบันทึกลงในรายชื่อคนที่คุณพบ</Text>
      </View>
      <View style={styles.btnContainer}>
        <Button
          title="สแกนต่อ"
          titleStyle={styles.btnText}
          buttonStyle={{
            ...styles.button,
            borderColor: STATUS.NORMAL.NORMAL,
            // marginTop: 40,
          }}
          // onPress={() => navigation.navigate('Profile', { name: 'Jane' })}
        />
      </View>
    </View>
  )
}

export default QRScanner
