import React from 'react'
import moment from 'moment'
import { Text, View, StyleSheet, Image, Button } from 'react-native'
import AsyncStorage from '@react-native-community/async-storage'
import { Icon } from 'react-native-elements'
import { COLOR } from '../../constants/theme'
import GradientBackground from '../../components/background'
import * as STATUS_COLOR from '../../constants/userStatus'

const logout = () => {
  AsyncStorage.removeItem('@FacebookOAuthKey:accessToken')
  // setLoggedinStatus(false)
  // setUserData(null)
  // setImageLoadStatus(false)
}

const status = 'NORMAL' // TODO: Fetch from server later.

export default ({ userData, navigation }) => (
  <View style={styles.container}>
    <GradientBackground status={status} style={{ paddingHorizontal: 20 }}>
      <View style={styles.spaceBetweenRow}>
        <>
          {/* <Icon name='fa-times' type='font-awesome' /> */}
          <Text onPress={() => navigation.navigate('QR')}>Back</Text>
        </>
      </View>
      <View style={{ width: '100%' }}>
        <View style={styles.cardWrapper}>
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <Image style={styles.avatar} source={{ uri: userData.picture.data.url }} />
            <View style={{ marginLeft: 20, justifyContent: 'space-around' }}>
              <Text style={{ ...styles.title, color: STATUS_COLOR.NORMAL[status] }}>{userData.name}</Text>
              <Text style={styles.subtitle}>เริ่มใช้งานเมื่อ {moment().fromNow()}</Text>
            </View>
          </View>
        </View>
        <View style={{ flexDirection: 'row' }}>
          <View style={{ borderBottomColor: COLOR.LINE_GRAY, borderBottomWidth: 2, flex: 1, height: 15 }} />
          <Text style={{ ...styles.subtitle, paddingHorizontal: 8 }}>ประวัติการแสกน</Text>
          <View style={{ borderBottomColor: COLOR.LINE_GRAY, borderBottomWidth: 2, flex: 1, height: 15 }} />
        </View>
        <View style={{ flexDirection: 'column', width: '100%', }}>
          <View style={styles.spaceBetweenRow}>
            <Text style={styles.subtitle}>คนที่พบทั้งหมด</Text>
            <Text style={styles.subtitle}>75</Text>
          </View>
          <View style={styles.spaceBetweenRow}>
            <Text style={styles.subtitle}>สุขภาพปกติ</Text>
            <Text style={{ ...styles.subtitle }}>75</Text>
          </View>
          <View style={styles.spaceBetweenRow}>
            <Text style={styles.subtitle}>เฝ้าระวัง</Text>
            <Text style={{ ...styles.subtitle }}>10</Text>
          </View>
          <View style={styles.spaceBetweenRow}>
            <Text style={styles.subtitle}>มีเชื้อ COVID-19</Text>
            <Text style={{ ...styles.subtitle }}>5</Text>
          </View>
          <View style={styles.spaceBetweenRow}>
            <Text style={styles.subtitle}>รักษาหายแล้ว</Text>
            <Text style={{ ...styles.subtitle }}>19</Text>
          </View>
        </View>
        <Button onPress={() => logout()} title='ออกจากระบบ' />
      </View>
    </GradientBackground>
  </View>
)

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
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 50 / 2,
  },
  title: {
    fontSize: 20,
    // fontWeight: '300',
    fontFamily: 'Kanit-Regular',
  },
  subtitle: {
    fontSize: 16,
    // fontWeight: '100',
    fontFamily: 'Kanit-Regular',
    color: COLOR.TEXT_GRAY
  },
  spaceBetweenRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    marginVertical: 8
  }
})
