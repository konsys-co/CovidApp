import React from 'react'
import { View, StyleSheet, Text, Image } from 'react-native'
import { COLOR } from '../../constants/theme'
import { DARK, TEXT } from '../../constants/userStatus'

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
    fontSize: 16,
    // fontWeight: '400',
    fontFamily: 'Kanit-Regular',
    color: COLOR.TEXT_GRAY,
  },
  statusText: {
    fontSize: 16,
    // fontWeight: '400',
    fontFamily: 'Kanit-Regular',
  },
  subtitle: {
    fontSize: 15,
    // fontWeight: '100',
    fontFamily: 'Kanit-Regular',
  },
})

export default ({ name, dateTime, location, imgURL, status }) => (
  <View style={styles.cardWrapper}>
    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
      <Image style={styles.avatar} source={{ uri: imgURL }} />
      <View style={{ marginLeft: 10, justifyContent: 'space-around' }}>
        <View style={{ flexDirection: 'row' }}>
          <Text style={styles.title}>{name} อัพเดทสถานะเป็น </Text>
          <Text style={[styles.statusText, { color: DARK[status] }]}>{TEXT[status]}</Text>
        </View>
        <Text style={{ ...styles.subtitle, marginRight: 8 }}>{dateTime}</Text>
      </View>
    </View>
  </View>
)