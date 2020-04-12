import React, { useState, useEffect } from 'react'
import { StyleSheet, View, Text, Dimensions, Platform } from 'react-native'
import QRCodeScanner from 'react-native-qrcode-scanner'
import { RNCamera as Camera } from 'react-native-camera'
import { useMutation, useQuery } from '@apollo/react-hooks'
import Geolocation from '@react-native-community/geolocation'
import { GOOGLE_KEY } from 'react-native-dotenv'

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
  const [locationError, setLocationError] = useState(false)
  const [location, setLocation] = useState({})

  const { loading, error, data } = useQuery(GET_USER_PROFILE)
  const [toggleAddCloseContact] = useMutation(ADD_CLOSE_CONTACT, {
    refetchQueries: [{ query: GET_CLOSE_CONTACTS }],
  })

  useEffect(() => {
    Geolocation.getCurrentPosition(
      info => {
        // eslint-disable-next-line no-undef
        fetch(`https://maps.googleapis.com/maps/api/geocode/json?address=${info.coords.latitude},${info.coords.longitude}&key=${GOOGLE_KEY}`)
          .then((response) => response.json())
          .then((responseJson) => {
            setLocation({
              position: { coordinates: [info.coords.latitude, info.coords.longitude] },
              name: `${responseJson.results[0].address_components[2].short_name} ${responseJson.results[0].address_components[3].short_name} ${responseJson.results[0].address_components[4].short_name}`
            })
          })
      },
      err => console.info('Error', err),
      { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 },
    )
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
    toggleAddCloseContact({
      variables: {
        id, type: 'CONTACT', location: location.position,
        locationName: location.name,
      }
    })
  }

  // For mocking QR Scan in simulator
  const toggleShowCloseContactModal = async () => {
    const bankFBID = '5e7c4dae8674f9001835c6f8'
    setCloseContactID(bankFBID)
    setShowCloseContactModal(true)
    // checkMultiple(
    //   [PERMISSIONS.IOS.LOCATION_WHEN_IN_USE, PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION]
    // ).then(async (statuses) => {
    //   console.info(isAndroid, statuses)
    //   if (
    //     (isAndroid && isPermissionGranted(statuses[PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION])) || (!isAndroid && isPermissionGranted(statuses[PERMISSIONS.IOS.LOCATION_WHEN_IN_USE]))
    //   ) {
    //     await Geolocation.getCurrentPosition((info, geoError) => {
    //       if (geoError === undefined) {
    //         // eslint-disable-next-line no-undef
    //         fetch(`https://maps.googleapis.com/maps/api/geocode/json?address=${info.coords.latitude},${info.coords.longitude}&key=${GOOGLE_KEY}`)
    //           .then((response) => response.json())
    //           .then((responseJson) => {
    //             toggleAddCloseContact({
    //               variables: {
    //                 id: bankFBID, type: 'CONTACT', location: { coordinates: [info.coords.latitude, info.coords.longitude] },
    //                 locationName: `${responseJson.results[0].address_components[2].short_name} ${responseJson.results[0].address_components[3].short_name} ${responseJson.results[0].address_components[4].short_name}`,
    //               }
    //             })
    //           })
    //       } else {
    //         setLocationError(true)
    //       }
    //     })
    //   } else {
    //     toggleAddCloseContact({
    //       variables: {
    //         id: bankFBID, type: 'CONTACT',
    //       }
    //     })
    //   }
    // })
    toggleAddCloseContact({
      variables: {
        id: bankFBID, type: 'CONTACT', location: location.position,
        locationName: location.name,
      }
    })
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
              locationError={locationError}
              setLocationError={setLocationError}
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
