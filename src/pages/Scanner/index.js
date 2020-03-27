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
import markCCExistingIcon from '../../../assets/images/mark-friend-exist.png'
import markCCNotExistingIcon from '../../../assets/images/mark-friend-not-exist.png'
import friendNotExistingImg from '../../../assets/images/friend-not-existing-img.png'
import COLOR from '../../constants/theme'

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
    fontSize: 36,
    marginTop: 20,
    color: STATUS.NORMAL.NORMAL,
  },
  subtitle: {
    fontFamily: 'Kanit-Regular',
    fontSize: 20,
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
  friendImgContainer: {
    flexDirection: 'row',
  },
  friendExistingIcon: {
    width: 35,
    height: 35,
    borderRadius: 35 / 2,
    marginLeft: -35,
    marginBottom: 20,
    alignSelf: 'flex-end',
  },
  friendImg: {
    width: 133,
    height: 133,
    borderRadius: 133 / 2,
    marginBottom: 15,
  },
  friendName: {
    fontFamily: 'Kanit-Regular',
    fontSize: 20,
    color: STATUS.NORMAL.NORMAL,
  },
  modalText: {
    fontFamily: 'Kanit-Regular',
    fontSize: 14,
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
  const [showCloseContactModal, setShowCloseContactModal] = useState(false)

  // useEffect(() => {
  // return () => {
  //   setshowCloseContactModal(false)
  // }
  // }, [])

  const onSuccess = e => {
    Linking.openURL(e.data).catch(err => console.error('An error occured', err))
  }

  const toggleShowCloseContactModal = () => setShowCloseContactModal(true)

  const toggleShowScanner = () => setShowCloseContactModal(false)

  return (
    <View style={styles.container}>
      <GradientBackground status="NORMAL">
        <Text style={styles.title}>{STATUS.TEXT.NORMAL}</Text>
        <Text
          style={styles.subtitle}
          onPress={() => toggleShowCloseContactModal()}>
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
            backgroundColor: showCloseContactModal ? '#fff' : 'transparent',
          }}>
          {showCloseContactModal ? (
            <AddCloseContactSuccessModal
              userData={userData}
              toggleShowScanner={toggleShowScanner}
            />
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

const AddCloseContactSuccessModal = ({ userData, toggleShowScanner }) => {
  return (
    <View style={styles.modalContainer}>
      {userData ? (
        <>
          <View style={styles.modalDetailContainer}>
            <Text style={styles.subtitle}>สแกนสำเร็จ</Text>
            <View style={styles.friendImgContainer}>
              <Image
                style={styles.friendImg}
                source={{ uri: userData.picture.data.url }}
              />
              <Image
                style={styles.friendExistingIcon}
                source={markCCExistingIcon}
              />
            </View>
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
              onPress={() => toggleShowScanner()}
            />
          </View>
        </>
      ) : (
        <>
          <View style={styles.modalDetailContainer}>
            <Text style={styles.subtitle}>สแกนไม่สำเร็จ</Text>
            <View style={styles.friendImgContainer}>
              <Image style={styles.friendImg} source={friendNotExistingImg} />
              <Image
                style={styles.friendExistingIcon}
                source={markCCNotExistingIcon}
              />
            </View>
            <Text style={{ ...styles.friendName, color: COLOR.TEXT_GRAY }}>
              ไม่พบผู้ใช้
            </Text>
            <Text style={styles.modalText}>
              QR ไม่ถูกต้อง ลองสแกนใหม่อีกครั้ง
            </Text>
          </View>
          <View style={styles.btnContainer}>
            <Button
              title="สแกนใหม่"
              titleStyle={styles.btnText}
              buttonStyle={{
                ...styles.button,
                borderColor: STATUS.NORMAL.NORMAL,
                // marginTop: 40,
              }}
              onPress={() => toggleShowScanner()}
            />
          </View>
        </>
      )}
    </View>
  )
}

export default QRScanner
