import React, { useState, useEffect } from 'react'
import {
  StyleSheet,
  View,
  Text,
  Linking,
  Dimensions,
  Platform,
} from 'react-native'
import QRCodeScanner from 'react-native-qrcode-scanner'
import { RNCamera as Camera } from 'react-native-camera'
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import * as STATUS from '../../constants/userStatus'
import GradientBackground from '../../components/background'

const Stack = createStackNavigator()
const ModalStack = createStackNavigator()

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
  successModalContainer: {
    flex: 1,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff',
    borderRadius: 12,
  },
  title: {
    display: isAndroid ? 'none' : 'flex',
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

const QRScanner = ({ navigation }) => {
  const [showSuccessModal, setShowSuccessModal] = useState(false)

  // useEffect(() => {
  //   return () => {
  //     setShowSuccessModal(false)
  //   }
  // }, [])

  const onSuccess = e => {
    Linking.openURL(e.data).catch(err => console.error('An error occured', err))
  }

  const toggleShowSuccessModal = () => setShowSuccessModal(true)

  return (
    <View style={styles.container}>
      <GradientBackground status="NORMAL">
        <Text style={{ ...styles.title, color: STATUS.NORMAL.NORMAL }}>
          {STATUS.TEXT.NORMAL}
        </Text>
        <Text
          style={styles.subtitle}
          onPress={
            () => toggleShowSuccessModal()
            // navigation.navigate('AddCloseContactModal', { closeID: 'cid-123' })
          }>
          แสกนเพื่อบันทึกว่าเราเจอกัน
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
            width: deviceWidth - 70,
            height: deviceHeight - 320,
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: showSuccessModal ? '#fff' : 'transparent',
          }}>
          {showSuccessModal ? (
            <AddCloseContactSuccessModal />
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
                height: deviceHeight - 320,
                alignSelf: 'center',
                justifyContent: 'center',
                marginTop: isAndroid ? 50 : '-20%',
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

const AddCloseContactSuccessModal = () => {
  return (
    <View style={styles.successModalContainer}>
      <Text style={styles.subtitle}>สแกนสำเร็จ</Text>
    </View>
  )
}

const QRScannerScreen = () => (
  <ModalStack.Navigator mode="modal">
    <ModalStack.Screen
      name="QRScanner"
      component={QRScanner}
      options={{ headerShown: false }}
    />
    <ModalStack.Screen
      name="AddCloseContactModal"
      component={AddCloseContactSuccessModal}
      options={{
        cardStyle: { backgroundColor: 'transparent' },
        title: 'อัพเดท',
        headerShown: false,
      }}
    />
  </ModalStack.Navigator>
)

export default () => (
  <NavigationContainer independent>
    <Stack.Navigator>
      <Stack.Screen
        name="ModalStack"
        component={QRScannerScreen}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  </NavigationContainer>
)
