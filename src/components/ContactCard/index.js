import React from 'react'
import moment from 'moment'
import { View, StyleSheet, Text, Image, TouchableOpacity } from 'react-native'

import { COLOR, FONT_FAMILY, FONT_SIZE } from '../../constants/theme'
import { NORMAL } from '../../constants/userStatus'

const styles = StyleSheet.create({
  cardWrapper: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderRadius: 16,
    backgroundColor: 'white',
    shadowColor: 'rgba(0, 0, 0, 0.15)',
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 1,
    shadowRadius: 10,
    elevation: 7,
    width: '100%',
    paddingVertical: 12,
    paddingHorizontal: 10,
    marginVertical: 7,
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 50 / 2,
  },
  name: {
    fontSize: FONT_SIZE.BODY1,
    fontFamily: FONT_FAMILY,
    color: COLOR.TEXT_GRAY,
  },
  status: {
    color: COLOR.TEXT_GRAY,
    fontSize: FONT_SIZE.BODY2,
    fontFamily: FONT_FAMILY,
  },
  buttonTitle: {
    color: COLOR.TEXT_GRAY,
    fontFamily: FONT_FAMILY,
    paddingHorizontal: 4,
    fontSize: FONT_SIZE.BODY1,
    lineHeight: 33,
  },
  button: {
    backgroundColor: 'transparent',
    height: 35,
    alignItems: 'center',
    borderWidth: 1,
    borderRadius: 4,
  },
  dateText: {
    alignSelf: 'flex-start',
    fontSize: FONT_SIZE.BODY1,
    fontFamily: FONT_FAMILY,
    marginVertical: 8,
  },
})

export default ({ contactGroupData, addCloseContactAgain }) =>
  contactGroupData.map(c => {
    const {
      _id: userID,
      firstName,
      lastName,
      status,
      profilePicture,
      location,
    } = c.user || {}
    const userName = `${firstName} ${lastName}`

    // console.info(closeContacts)
    // if (!(loading || getCloseContactLoading || addCloseContactLoading)) {
    //   // eslint-disable-next-line no-undef
    //   fetch('https://maps.googleapis.com/maps/api/geocode/json?address=37.785834,-122.406417&key=AIzaSyCIDqNV99P21nHXemvTP732PpoQxp7oILY')
    //     .then((response) => response.json())
    //     .then((responseJson) => {
    //       console.log(`ADDRESS GEOCODE is BACK!! => ${JSON.stringify(responseJson)}`)
    //     })
    // }
    return (
      <View key={userID.toString() + c.createdAt} style={styles.cardWrapper}>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            width: '100%',
          }}>
          <View style={{ width: '15%' }}>
            <Image style={styles.avatar} source={{ uri: profilePicture }} />
          </View>
          <View style={{ paddingHorizontal: 10, width: '55%' }}>
            <View>
              <Text
                style={{ ...styles.name, color: NORMAL[status] }}
                numberOfLines={1}
                ellipsizeMode="tail">
                {userName}
              </Text>
            </View>
            <View style={{ flexWrap: 'wrap', flexDirection: 'row' }}>
              <Text
                style={{
                  ...styles.status,
                  marginRight: 8,
                  fontWeight: '400',
                }}>
                {moment(c.createdAt).format('HH:mm')}
              </Text>
              <Text style={styles.status}>{location}</Text>
            </View>
          </View>
          <View style={{ width: '30%' }}>
            <TouchableOpacity
              activeOpacity={0.7}
              style={{ ...styles.button, borderColor: NORMAL[status] }}
              onPress={() => addCloseContactAgain(userID)}>
              <Text style={styles.buttonTitle}>เจออีกครั้ง</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    )
  })
