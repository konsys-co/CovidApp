import React from 'react'
import { View, StyleSheet, Text, Image, TouchableOpacity } from 'react-native'
import { Button } from 'react-native-elements'
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
})

export default ({ name, dateTime, location, imgURL, status }) => (
  <View style={styles.cardWrapper}>
    <View style={{ flexDirection: 'row', alignItems: 'center', width: '100%' }}>
      <View style={{ width: '15%' }}>
        <Image style={styles.avatar} source={{ uri: imgURL }} />
      </View>
      <View style={{ paddingHorizontal: 10, width: '55%' }}>
        <View>
          <Text
            style={{ ...styles.name, color: NORMAL[status] }}
            numberOfLines={1}
            ellipsizeMode="tail">
            {name}
          </Text>
        </View>
        <View style={{ flexWrap: 'wrap', flexDirection: 'row' }}>
          <Text style={{ ...styles.status, marginRight: 8, fontWeight: '400' }}>
            {dateTime}
          </Text>
          <Text style={styles.status}>{location}</Text>
        </View>
      </View>
      <View style={{ width: '30%' }}>
        <TouchableOpacity
          activeOpacity={0.7}
          style={{ ...styles.button, borderColor: NORMAL[status] }}>
          <Text style={styles.buttonTitle}>เจออีกครั้ง</Text>
        </TouchableOpacity>
      </View>
    </View>
  </View>
)
