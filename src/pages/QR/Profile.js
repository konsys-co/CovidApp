import React from 'react'
import moment from 'moment'
import { Text, View, StyleSheet, Image } from 'react-native'
import AsyncStorage from '@react-native-community/async-storage'
import { AntDesign } from '@expo/vector-icons'
import { useQuery } from '@apollo/react-hooks'
import { Button } from 'react-native-elements'

import RNLoading from '../../components/Loading'
import { COLOR } from '../../constants/theme'
import GradientBackground from '../../components/background'
import * as STATUS_COLOR from '../../constants/userStatus'
import { GET_USER_PROFILE } from '../../api/query'

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
  centerContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  btnContainer: {
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  button: {
    marginVertical: 16,
    backgroundColor: 'transparent',
    borderWidth: 3,
    width: 300,
    borderRadius: 10,
  },
  textStyle: {
    color: '#000',
    fontFamily: 'Kanit-Regular',
    fontSize: 20,
  },
})

const Profile = ({ navigation, userData, setLoggedinStatus, setUserData }) => {
  const { loading: isFetchUserProfile, error, data } = useQuery(
    GET_USER_PROFILE,
  )

  if (error)
    return (
      <View style={styles.centerContainer}>
        <Text>Error occur: {JSON.stringify(error)}</Text>
      </View>
    )

  if (isFetchUserProfile)
    return (
      <View style={styles.centerContainer}>
        <RNLoading colorStatus="normal" />
      </View>
    )

  const { profile } = data || {}
  const { status, createdAt } = profile || {}

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
                  เริ่มใช้งานเมื่อ {moment(createdAt).fromNow()}
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
          {/* <View style={{ flexDirection: 'column', width: '100%' }}>
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
          </View> */}
          <View style={styles.btnContainer}>
            <Button
              title="ออกจากระบบ"
              titleStyle={styles.textStyle}
              buttonStyle={{
                ...styles.button,
                borderColor: STATUS_COLOR.NORMAL[status],
              }}
              onPress={() => logout()}
            />
          </View>
        </View>
      </GradientBackground>
    </View>
  )
}

export default Profile
