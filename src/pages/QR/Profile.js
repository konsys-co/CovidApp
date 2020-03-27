import React from 'react'
import moment from 'moment'
import { Text, View, StyleSheet, Image, Button } from 'react-native'
import AsyncStorage from '@react-native-community/async-storage'
import { AntDesign } from '@expo/vector-icons'

import { COLOR } from '../../constants/theme'
import GradientBackground from '../../components/background'
import * as STATUS_COLOR from '../../constants/userStatus'

const status = 'NORMAL' // TODO: Fetch from server later.

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    width: '100%',
    backgroundColor: '#fff',
  },
  cardWrapper: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    paddingVertical: 16,
    paddingHorizontal: 10,
  },
  title: {
    fontFamily: 'Kanit-Regular',
    alignSelf: 'flex-start',
    fontSize: 24,
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 50 / 2,
  },
  profileName: {
    fontSize: 20,
    fontFamily: 'Kanit-Regular',
  },
  text: {
    fontSize: 16,
    fontFamily: 'Kanit-Regular',
    color: COLOR.TEXT_GRAY,
  },
  spaceBetweenRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    marginVertical: 8,
  },
})

const Profile = ({ navigation, userData, setLoggedinStatus, setUserData }) => {
  const logout = () => {
    AsyncStorage.removeItem('@FacebookOAuthKey:accessToken')
    setLoggedinStatus(false)
    setUserData(null)
  }

  return (
    <View style={styles.container}>
      <GradientBackground status={status} style={{ paddingHorizontal: 20 }}>
        <View style={styles.spaceBetweenRow}>
          <Text
            onPress={() => navigation.navigate('QRDetail')}
            style={styles.title}>
            <AntDesign name="left" size={24} /> ข้อมูลส่วนตัว
          </Text>
        </View>
        <View style={{ width: '100%' }}>
          <View style={styles.cardWrapper}>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <Image
                style={styles.avatar}
                source={{ uri: userData.picture.data.url }}
              />
              <View style={{ marginLeft: 20, justifyContent: 'space-around' }}>
                <Text
                  style={{
                    ...styles.profileName,
                    color: STATUS_COLOR.NORMAL[status],
                  }}>
                  {userData.name}
                </Text>
                <Text style={styles.text}>
                  เริ่มใช้งานเมื่อ {moment().fromNow()}
                </Text>
              </View>
            </View>
          </View>
          <View style={{ flexDirection: 'row' }}>
            <View
              style={{
                borderBottomColor: COLOR.LINE_GRAY,
                borderBottomWidth: 2,
                flex: 1,
                height: 15,
              }}
            />
            <Text style={{ ...styles.text, paddingHorizontal: 8 }}>
              ประวัติการแสกน
            </Text>
            <View
              style={{
                borderBottomColor: COLOR.LINE_GRAY,
                borderBottomWidth: 2,
                flex: 1,
                height: 15,
              }}
            />
          </View>
          <View style={{ flexDirection: 'column', width: '100%' }}>
            <View style={styles.spaceBetweenRow}>
              <Text style={styles.text}>คนที่พบทั้งหมด</Text>
              <Text style={styles.text}>75</Text>
            </View>
            <View style={styles.spaceBetweenRow}>
              <Text style={styles.text}>สุขภาพปกติ</Text>
              <Text style={{ ...styles.text }}>75</Text>
            </View>
            <View style={styles.spaceBetweenRow}>
              <Text style={styles.text}>เฝ้าระวัง</Text>
              <Text style={{ ...styles.text }}>10</Text>
            </View>
            <View style={styles.spaceBetweenRow}>
              <Text style={styles.text}>มีเชื้อ COVID-19</Text>
              <Text style={{ ...styles.text }}>5</Text>
            </View>
            <View style={styles.spaceBetweenRow}>
              <Text style={styles.text}>รักษาหายแล้ว</Text>
              <Text style={{ ...styles.text }}>19</Text>
            </View>
          </View>
          <Button onPress={() => logout()} title="ออกจากระบบ" />
        </View>
      </GradientBackground>
    </View>
  )
}

export default Profile
