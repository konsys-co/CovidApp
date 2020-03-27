import React from 'react'
import {
  StyleSheet,
  ScrollView,
  View,
  Text,
  ActivityIndicator,
} from 'react-native'
import { Button } from 'react-native-elements'
import QRCode from 'react-native-qrcode-svg'
import { useQuery } from '@apollo/react-hooks'

import GradientBackground from '../../components/background'
import * as STATUS from '../../constants/userStatus'
import { COLOR } from '../../constants/theme'
import { GET_USER_PROFILE } from '../../api/query'

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
  errorContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
})

const QRDetail = ({ navigation }) => {
  const { loading: isFetchUserProfile, error, data } = useQuery(
    GET_USER_PROFILE,
  )

  if (error)
    return (
      <View style={styles.errorContainer}>
        <Text>Error occur: {JSON.stringify(error)}</Text>
      </View>
    )

  const { profile } = data || {}
  const { _id: userId } = profile || {}

  const status = 'NORMAL' // TODO: Fetch from server later.
  const isInfected = status === STATUS.STATUS.INFECTED

  return (
    <View style={styles.container}>
      <GradientBackground status={status}>
        <ScrollView
          style={{ width: '100%' }}
          contentContainerStyle={{ alignItems: 'center' }}>
          <Text style={{ ...styles.title, color: STATUS.NORMAL[status] }}>
            {STATUS.TEXT[status]}
          </Text>
          <Text style={styles.subtitle}>แสกนเพื่อบันทึกว่าเราเจอกัน</Text>
          <View
            style={{
              shadowColor: STATUS.DARK[status],
              shadowOffset: {
                width: 0,
                height: 12,
              },
              shadowOpacity: 0.58,
              shadowRadius: 16.0,
              elevation: 24,
              width: 300,
              height: 300,
              justifyContent: 'center',
              alignItems: 'center',
              backgroundColor: '#fff',
              borderRadius: 12,
            }}>
            {isFetchUserProfile ? (
              <ActivityIndicator size="large" color={COLOR.BLUE} />
            ) : (
              <QRCode
                value={userId || 'user id'}
                color="#222"
                backgroundColor="white"
                // style={{ flex: 0.8 }}
                size={250}
                // logo={{ uri: 'https://cdn4.iconfinder.com/data/icons/social-icon-4/842/facebook-512.png' }} // or logo={{uri: base64logo}}
                logoMargin={2}
                logoSize={20}
                logoBorderRadius={10}
                logoBackgroundColor="transparent"
              />
            )}
          </View>
          <Button
            title="ดูข้อมูลส่วนตัว"
            titleStyle={styles.textStyle}
            buttonStyle={{
              ...styles.button,
              borderColor: STATUS.NORMAL[status],
              marginTop: 40,
            }}
            onPress={() => navigation.navigate('Profile', { name: 'Jane' })}
          />
          <Button
            title={isInfected ? 'ฉันรักษาหายแล้ว' : 'ฉันตรวจพบ COVID-19'}
            titleStyle={styles.textStyle}
            buttonStyle={{
              ...styles.button,
              borderColor: isInfected ? COLOR.MINT : COLOR.COPPER,
            }}
            onPress={() =>
              navigation.navigate('UpdateStatus', { name: 'Jane' })
            }
          />
        </ScrollView>
      </GradientBackground>
    </View>
  )
}

export default QRDetail
