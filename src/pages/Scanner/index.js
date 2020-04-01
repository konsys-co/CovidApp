import React, { useState } from 'react'
import { StyleSheet, View, Text, Dimensions, Platform } from 'react-native'
import QRCodeScanner from 'react-native-qrcode-scanner'
import { RNCamera as Camera } from 'react-native-camera'
import { useMutation, useQuery } from '@apollo/react-hooks'

import * as STATUS from '../../constants/userStatus'
import GradientBackground from '../../components/background'
import CloseContactModal from './CloseContactModal'
import RNLoading from '../../components/Loading'
import { GET_USER_PROFILE, GET_CLOSE_CONTACTS } from '../../api/query'
import { ADD_CLOSE_CONTACT } from '../../api/mutation'

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
    color: STATUS.NORMAL.normal,
  },
  subtitle: {
    fontFamily: 'Kanit-Regular',
    fontSize: 20,
    marginBottom: 20,
  },
  errorContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
})

const QRScanner = () => {
  const [showCloseContactModal, setShowCloseContactModal] = useState(false)
  const [closeContactID, setCloseContactID] = useState(null)

  const { loading, error, data } = useQuery(GET_USER_PROFILE)

  const [toggleAddCloseContact] = useMutation(ADD_CLOSE_CONTACT, {
    refetchQueries: [{ query: GET_CLOSE_CONTACTS }],
  })

  const { profile } = data || {}
  const { status } = profile || {}

  if (error)
    return (
      <View style={styles.errorContainer}>
        <Text>Error occur: {JSON.stringify(error)}</Text>
      </View>
    )

  if (loading) return <RNLoading colorStatus="normal" />

  const onSuccess = async QRCode => {
    const { data: id } = QRCode
    setCloseContactID(id)
    setShowCloseContactModal(true)
    await toggleAddCloseContact({ variables: { id, type: 'CONTACT' } })
  }

  // For mocking QR Scan in simulator
  const toggleShowCloseContactModal = () => {
    const bankFBID = '5e7c4dae8674f9001835c6f8'
    setCloseContactID(bankFBID)
    setShowCloseContactModal(true)
    toggleAddCloseContact({ variables: { id: bankFBID, type: 'CONTACT' } })
  }

  const toggleShowScanner = () => setShowCloseContactModal(false)

  return (
    <View style={styles.container}>
      <GradientBackground status={status}>
        <Text style={{ ...styles.title, color: STATUS.NORMAL[status] }}>
          {STATUS.TEXT[status] || STATUS.TEXT.fetching}
        </Text>
        <Text
          style={styles.subtitle}
          onPress={() => toggleShowCloseContactModal()}>
          แสกน QR ของเพื่อนที่คุณเจอ
        </Text>
        <View
          style={{
            shadowColor: STATUS.DARK.normal,
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
            // eslint-disable-next-line no-nested-ternary
            backgroundColor: showCloseContactModal
              ? isAndroid
                ? '#fff !important'
                : '#fff'
              : isAndroid
              ? 'transparent !important'
              : 'transparent',
          }}>
          {showCloseContactModal ? (
            <CloseContactModal
              closeContactID={closeContactID}
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

export default QRScanner
