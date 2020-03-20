import React from 'react'
import { View, StyleSheet, Text, Image } from 'react-native'
import { Button } from 'react-native-elements'
import { COLOR } from '../../constants/theme'

const styles = StyleSheet.create({
  cardWrapper: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: 'white',
    width: '100%',
    paddingVertical: 16,
    paddingHorizontal: 10,
    marginVertical: 8,
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 50 / 2,
  },
  title: {
    fontSize: 18,
    // fontWeight: '400',
    fontFamily: 'SukhumvitSet-SemiBold',
    color: COLOR.DARK_GRAY,
  },
  statusText: {
    fontSize: 18,
    // fontWeight: '400',
    fontFamily: 'SukhumvitSet-SemiBold',
    color: COLOR.RISK,
  },
  subtitle: {
    fontSize: 16,
    // fontWeight: '100',
    fontFamily: 'SukhumvitSet-SemiBold',
  },
})

export default ({ name, dateTime, location, imgURL, status }) => (
  <View style={styles.cardWrapper}>
    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
      <Image style={styles.avatar} source={{ uri: imgURL }} />
      <View style={{ marginLeft: 10, justifyContent: 'space-around' }}>
        <View style={{ flexDirection: 'row' }}>
          <Text style={styles.title}>{name} อัพเดทสถานะเป็น </Text>
          <Text style={styles.statusText}>{status}</Text>
        </View>
        <Text style={{ ...styles.subtitle, marginRight: 8 }}>{dateTime}</Text>
      </View>
    </View>
  </View>
)