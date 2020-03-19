import React, { useState, useEffect } from 'react'
import Modal from 'react-native-modal'
import { Button } from 'react-native-elements'
import {
  StyleSheet,
  Animated,
  View,
  Text,
  TouchableWithoutFeedback
} from 'react-native'
import { COLOR } from '../../constants/theme'

let value = 0
const ACTION_TIMER = 5000
const COLORS = [COLOR.UPDATING_HEALTH, COLOR.UPDATING_HEALTH]

const AnimatedButtonPress = ({ navigation }) => {
  const [pressAction, setPressAction] = useState(new Animated.Value(0))
  const [textComplete, setTextComplete] = useState('')
  const [buttonWidth, setButtonWidth] = useState(0)
  const [buttonHeight, setButtonHeight] = useState()
  const [isVisible, setIsVisible] = useState(false)

  // const deviceWidth = Dimensions.get('window').width
  // const deviceHeight = Platform.OS === 'ios'
  //   ? Dimensions.get('window').height
  //   : require('react-native-extra-dimensions-android').get('REAL_WINDOW_HEIGHT')

  useEffect(() => {
    // eslint-disable-next-line no-return-assign
    pressAction.addListener((v) => value = v.value)
  })

  const handlePressIn = () => {
    Animated.timing(pressAction, {
      duration: ACTION_TIMER,
      toValue: 1
    }).start(() => animationActionComplete())
  }

  const handlePressOut = () => {
    Animated.timing(pressAction, {
      duration: value * ACTION_TIMER,
      toValue: 0
    }).start()
  }

  const animationActionComplete = () => {
    let message = ''
    if (value === 1) {
      message = 'You held it long enough to fire the action!'
      setIsVisible(true)
      value = 0
    }
    setTextComplete(message)
  }

  const getButtonWidthLayout = (e) => {
    setButtonWidth(e.nativeEvent.layout.width - 6)
    setButtonHeight(e.nativeEvent.layout.height - 6)
  }

  const getProgressStyles = () => {
    const width = pressAction.interpolate({
      inputRange: [0, 1],
      outputRange: [0, buttonWidth]
    })
    const bgColor = pressAction.interpolate({
      inputRange: [0, 1],
      outputRange: COLORS
    })
    return {
      width,
      height: buttonHeight,
      backgroundColor: bgColor
    }
  }

  return (
    <View style={styles.container}>
      <View style={styles.actionSection}>
        <Text style={{ ...styles.statusTitle, color: COLOR.HEALTH }}>ยืนยันว่าคุณหายแล้ว</Text>
        <Text style={{ ...styles.statusSubTitle }}>ระบบจะทำการแจ้งเตือนไปยังทุกคนที่คุณเคย</Text>
        <Text style={{ ...styles.statusSubTitle }}>พบเจอในช่วงเวลา 14 วัน</Text>
        <TouchableWithoutFeedback
          onPressIn={() => handlePressIn()}
          onPressOut={() => handlePressOut()}
        >
          <View style={{ ...styles.button, ...styles.updateButton, borderColor: COLOR.HEALTH }} onLayout={(e) => getButtonWidthLayout(e)}>
            <Animated.View style={[styles.bgFill, getProgressStyles()]} />
            <Text style={{ ...styles.textStyle, color: COLOR.HEALTH, fontWeight: '500' }}>แตะปุ่มนี้ค้างไว้ 5 วินาที</Text>
          </View>
        </TouchableWithoutFeedback>
        <>
          <Text>{textComplete}</Text>
        </>
      </View>
      <Button onPress={() => navigation.navigate('QR')} titleStyle={{ ...styles.textStyle, color: COLOR.WHITE }} buttonStyle={{ ...styles.button, borderColor: COLOR.GRAY }} title='ปิดหน้านี้' />
      <Modal
        isVisible={isVisible}
        onBackdropPress={() => setIsVisible(false)}
        onBackButtonPress={() => setIsVisible(false)}
      >
        <View style={{ flex: 0.5, backgroundColor: 'white', borderRadius: 15 }}>
          <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <Text style={styles.title}>อัพเดทสถานะ</Text>
            <Text style={{ ...styles.title, color: COLOR.HEALTH, fontSize: 30 }}>รักษาหายแล้ว</Text>
            <Button onPress={() => setIsVisible(false)} titleStyle={styles.textStyle} buttonStyle={{ ...styles.button, borderColor: COLOR.HEALTH }} title='กลับ' />
          </View>
        </View>
      </Modal>
    </View >
  )
}

const styles = StyleSheet.create({
  actionSection: {
    flex: 1,
    // borderColor: 'red',
    // backgroundColor: 'red',
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
    paddingTop: 50,
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: COLOR.BLACK,
    // zIndex: 10000,
  },
  updateButton: {
    padding: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  button: {
    marginVertical: 16,
    backgroundColor: '#00000000',
    borderWidth: 3,
    width: 300,
    borderRadius: 10,
  },
  title: {
    fontFamily: 'Kanit-Medium',
    fontSize: 16,
    marginTop: 20,
  },
  statusTitle: {
    fontFamily: 'Kanit-Regular',
    fontSize: 30,
  },
  statusSubTitle: {
    fontFamily: 'Kanit-Regular',
    fontSize: 18,
    color: COLOR.WHITE,
  },
  text: {
    backgroundColor: 'transparent',
    color: '#111'
  },
  textStyle: {
    color: '#000',
    fontFamily: 'Kanit-Regular',
    // fontWeight: '400',
    fontSize: 20,
    // height: 80,
  },
  bgFill: {
    position: 'absolute',
    top: 0,
    left: 0
  }
})

export default AnimatedButtonPress