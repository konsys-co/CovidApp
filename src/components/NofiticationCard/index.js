import React from 'react'
import { View, StyleSheet, Text, Image } from 'react-native'
import { COLOR, FONT_FAMILY, FONT_SIZE } from '../../constants/theme'
import { DARK, SHORT_TEXT } from '../../constants/userStatus'

const styles = StyleSheet.create({
  cardWrapper: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: 'transparent',
    width: '100%',
    paddingVertical: 12,
    paddingHorizontal: 22,
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 50 / 2,
  },
  title: {
    fontSize: FONT_SIZE.BODY1,
    fontFamily: FONT_FAMILY,
    color: COLOR.TEXT_GRAY,
  },
  statusText: {
    fontSize: FONT_SIZE.BODY1,
    fontFamily: FONT_FAMILY,
  },
  dateText: {
    fontSize: FONT_SIZE.BODY1,
    fontFamily: FONT_FAMILY,
  },
})

export default ({ name, dateTime, location, imgURL, status }) => (
  <View style={styles.cardWrapper}>
    <View style={{ flexDirection: 'row', alignItems: 'center', width: '100%' }}>
      <View style={{ width: '15%' }}>
        <Image style={styles.avatar} source={{ uri: imgURL }} />
      </View>
      <View
        style={{
          marginLeft: 10,
          width: '85%',
        }}>
        <View style={{ flexWrap: 'wrap', flexDirection: 'row' }}>
          <Text>
            <Text style={styles.title}>{name} อัปเดตสถานะเป็น </Text>
            <Text style={[styles.statusText, { color: DARK[status] }]}>
              {SHORT_TEXT[status]}
            </Text>
          </Text>
        </View>
        <Text style={{ ...styles.dateText, marginRight: 8 }}>{dateTime}</Text>
      </View>
    </View>
  </View>
)
