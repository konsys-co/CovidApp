import React from 'react'
import { View, StyleSheet, Text, Image } from 'react-native'
import { COLOR } from '../../constants/theme'
import { STATUS } from '../../constants/status'

const styles = StyleSheet.create({
  cardWrapper: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: 'white',
    width: '100%',
    paddingVertical: 12,
    paddingHorizontal: 20,
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
  statusNormal: {
    color: COLOR.NORMAL,
  },
  statusRisk: {
    color: COLOR.BUTTER,
  },
  statusInfected: {
    color: COLOR.INFECTED,
  },
  statusHealth: {
    color: COLOR.HEALTH,
  },
  statusDarkGray: {
    color: COLOR.DARK_GRAY
  },
  subtitle: {
    fontSize: 15,
    // fontWeight: '100',
    fontFamily: 'Kanit-Regular',
  },
})

const mapStatusToColor = (status) => {
  if (status === STATUS.NORMAL) return styles.statusNormal
  if (status === STATUS.RISK) return styles.statusRisk
  if (status === STATUS.INFECTED) return styles.statusInfected
  if (status === STATUS.RECOVERED) return styles.statusHealth
  return styles.statusDarkGray
}

export default ({ name, dateTime, location, imgURL, status }) => (
  <View style={styles.cardWrapper}>
    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
      <Image style={styles.avatar} source={{ uri: imgURL }} />
      <View style={{ marginLeft: 10, justifyContent: 'space-around' }}>
        <View style={{ flexDirection: 'row' }}>
          <Text style={styles.title}>{name} อัพเดทสถานะเป็น </Text>
          <Text style={[styles.statusText, mapStatusToColor(status)]}>{status}</Text>
        </View>
        <Text style={{ ...styles.subtitle, marginRight: 8 }}>{dateTime}</Text>
      </View>
    </View>
  </View>
)