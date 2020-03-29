import React from 'react'
import { StyleSheet, View, Text, Image, ActivityIndicator } from 'react-native'
import { Button } from 'react-native-elements'
import { useQuery } from '@apollo/react-hooks'

import markCCExistingIcon from '../../../assets/images/mark-friend-exist.png'
import markCCNotExistingIcon from '../../../assets/images/mark-friend-not-exist.png'
import friendNotExistingImg from '../../../assets/images/friend-not-existing-img.png'
import * as STATUS from '../../constants/userStatus'
import { COLOR } from '../../constants/theme'
import { GET_CONTACT_BY_ID } from '../../api/query'

const styles = StyleSheet.create({
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
    color: STATUS.NORMAL.normal,
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
  errorContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
})

const CloseContactModal = ({ closeContactID, toggleShowScanner }) => {
  const { loading, error, data } = useQuery(GET_CONTACT_BY_ID, {
    variables: { id: closeContactID },
  })

  const { user } = data || {}

  if (error)
    return (
      <View style={styles.errorContainer}>
        <Text>Error occur: {JSON.stringify(error)}</Text>
      </View>
    )

  if (loading) return <ActivityIndicator size="large" color={COLOR.BLUE} />

  return (
    <View style={styles.modalContainer}>
      {user ? (
        <>
          <View style={styles.modalDetailContainer}>
            <Text style={styles.subtitle}>สแกนสำเร็จ</Text>
            <View style={styles.friendImgContainer}>
              <Image
                style={styles.friendImg}
                source={{ uri: user.profilePicture }}
              />
              <Image
                style={styles.friendExistingIcon}
                source={markCCExistingIcon}
              />
            </View>
            <Text style={styles.friendName}>
              {user.firstName} {user.lastName}
            </Text>
            <Text style={styles.modalText}>ถูกบันทึกลงในรายชื่อคนที่คุณพบ</Text>
          </View>
          <View style={styles.btnContainer}>
            <Button
              title="สแกนต่อ"
              titleStyle={styles.btnText}
              buttonStyle={{
                ...styles.button,
                borderColor: STATUS.NORMAL.normal,
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
                borderColor: STATUS.NORMAL.normal,
              }}
              onPress={() => toggleShowScanner()}
            />
          </View>
        </>
      )}
    </View>
  )
}

export default CloseContactModal
