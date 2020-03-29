import React, { useState, useEffect } from 'react'
import Modal from 'react-native-modal'
import { Button } from 'react-native-elements'
import { useMutation } from '@apollo/react-hooks'
import {
  StyleSheet,
  Animated,
  View,
  Text,
  TouchableWithoutFeedback,
  Image,
} from 'react-native'
import { COLOR } from '../../constants/theme'
import GradientBackground from '../../components/background'
import * as STATUS from '../../constants/userStatus'
import cureImg from '../../../assets/images/cure.png'
import infectedImg from '../../../assets/images/infected.png'
import { UPDATE_STATUS } from '../../api/mutation'

let value = 0
const ACTION_TIMER = 5000

const STATUS_ENUM = {
  healed: 'healed',
  infected: 'infected',
}

const AnimatedButtonPress = ({ navigation, route }) => {
  const [doUpdate, { loading }] = useMutation(UPDATE_STATUS, { refetchQueries: 'profile' })
  const { status } = route.params
  const isInfected = status === STATUS.STATUS.infected

  const actionColor = isInfected ? STATUS.DARK.healed : STATUS.DARK.infected
  const COLORS = [isInfected ? STATUS.NORMAL.healed : STATUS.NORMAL.infected, isInfected ? STATUS.NORMAL.healed : STATUS.NORMAL.infected]

  const [pressAction, setPressAction] = useState(new Animated.Value(0))
  const [textComplete, setTextComplete] = useState('')
  const [buttonWidth, setButtonWidth] = useState(0)
  const [buttonHeight, setButtonHeight] = useState()
  const [isVisible, setIsVisible] = useState(false)

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
    doUpdate({
      variables: {
        status: isInfected ? STATUS_ENUM.healed : STATUS_ENUM.infected
      }
    }).then(resp => {
      console.info(resp.data)
    })
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
      <GradientBackground status={status} dark>
        <View style={styles.actionSection}>
          <Image source={isInfected ? cureImg : infectedImg} style={{ width: 150, height: 150, marginBottom: 40 }} />
          <Text style={{ ...styles.statusTitle, color: actionColor }}>{isInfected ? 'ยืนยันว่าคุณหายแล้ว' : 'ยืนยันว่าคุณเป็น COVID-19 '}</Text>
          <Text style={{ ...styles.statusSubTitle }}>ระบบจะทำการแจ้งเตือนไปยังทุกคนที่คุณเคย</Text>
          <Text style={{ ...styles.statusSubTitle }}>พบเจอในช่วงเวลา 14 วัน</Text>
          <TouchableWithoutFeedback
            onPressIn={() => handlePressIn()}
            onPressOut={() => handlePressOut()}
          >
            <View style={{ ...styles.button, ...styles.updateButton, borderColor: actionColor }} onLayout={(e) => getButtonWidthLayout(e)}>
              <Animated.View style={[styles.bgFill, getProgressStyles()]} />
              <Text style={{ ...styles.textStyle, color: actionColor, fontWeight: '500' }}>แตะปุ่มนี้ค้างไว้ 5 วินาที</Text>
            </View>
          </TouchableWithoutFeedback>
          <>
            <Text>{textComplete}</Text>
          </>
        </View>
        <Button
          onPress={() => navigation.navigate('QRDetail')}
          titleStyle={{ ...styles.textStyle, color: COLOR.WHITE }}
          buttonStyle={{ ...styles.button, borderColor: COLOR.TEXT_GRAY, marginBottom: 50 }}
          title='ปิดหน้านี้'
        />
        <Modal
          isVisible={isVisible}
          onBackdropPress={() => setIsVisible(false)}
          onBackButtonPress={() => setIsVisible(false)}
        >
          <View style={{ flex: 0.5, backgroundColor: 'white', borderRadius: 15 }}>
            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
              <Text style={{ ...styles.title, fontSize: 24 }}>อัพเดทสถานะ</Text>
              <View style={{
                marginTop: 20,
                shadowColor: COLOR.BLACK,
                shadowOffset: {
                  width: 0,
                  height: 2,
                },
                shadowOpacity: 0.23,
                shadowRadius: 2.62,
              }}>
                <Image source={isInfected ? cureImg : infectedImg} style={{ width: 100, height: 100 }} />
              </View>
              <Text style={{ ...styles.title, color: isInfected ? COLOR.MINT : COLOR.COPPER, fontSize: 30 }}>คุณ{isInfected ? STATUS.TEXT.healed : STATUS.TEXT.infected}</Text>
              <Button
                onPress={() => {
                  setIsVisible(false)
                  navigation.navigate('QRDetail')
                }}
                titleStyle={styles.textStyle}
                buttonStyle={{ ...styles.button, borderColor: isInfected ? COLOR.MINT : COLOR.COPPER }}
                title='กลับ'
              />
            </View>
          </View>
        </Modal>
      </GradientBackground>
    </View >
  )
}

const styles = StyleSheet.create({
  actionSection: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
    // paddingTop: 56,
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: COLOR.TEXT_GRAY,
  },
  updateButton: {
    padding: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  button: {
    marginVertical: 16,
    backgroundColor: 'transparent',
    borderWidth: 3,
    width: 300,
    borderRadius: 10,
  },
  title: {
    fontFamily: 'Kanit-Regular',
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
    fontSize: 20,
  },
  bgFill: {
    position: 'absolute',
    top: 0,
    left: 0
  }
})

export default AnimatedButtonPress