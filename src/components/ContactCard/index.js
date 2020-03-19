import React from 'react'
import { View, StyleSheet, Text, Image } from 'react-native'
import { Button } from 'react-native-elements'
import { COLOR } from '../../constants/theme'

const styles = StyleSheet.create({
  cardWrapper: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderRadius: 16,
    backgroundColor: 'white',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.29,
    shadowRadius: 4.65,
    elevation: 7,
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
    fontSize: 20,
    fontWeight: '300',
    fontFamily: 'Kanit-Regular',
    color: COLOR.NORMAL,
  },
  subtitle: {
    fontSize: 16,
    fontWeight: '100',
    fontFamily: 'Kanit-Light',
  },
  textStyle: {
    color: COLOR.DARK_GRAY,
    fontFamily: 'Kanit-Regular',
    fontSize: 14,
    paddingHorizontal: 8,
  },
  button: {
    backgroundColor: '#00000000',
    borderWidth: 2,
    borderRadius: 10,
  },
})

export default ({ name, dateTime, location, imgURL, status }) => (
  <View style={styles.cardWrapper}>
    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
      <Image style={styles.avatar} source={{ uri: imgURL }} />
      <View style={{ marginLeft: 10, justifyContent: 'space-around' }}>
        <Text style={styles.title}>{name}</Text>
        <View style={{ flexDirection: 'row' }}>
          <Text style={{ ...styles.subtitle, marginRight: 8, fontWeight: '400' }}>{dateTime}</Text>
          <Text style={styles.subtitle}>{location}</Text>
        </View>
      </View>
    </View>
    <Button title='เจออีกครั้ง' titleStyle={styles.textStyle} buttonStyle={{ ...styles.button, borderColor: COLOR.NORMAL }} />
  </View>
)