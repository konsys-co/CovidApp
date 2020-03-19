import React from 'react'
import { StyleSheet, View, Text } from 'react-native'
import { createStackNavigator } from '@react-navigation/stack'
import { NavigationContainer } from '@react-navigation/native'
import QRCode from 'react-native-qrcode-svg'
import { Button } from 'react-native-elements'

import Profile from './profile'
import UpdateStatus from './update-status'
import { COLOR } from '../../constants/theme'

const Stack = createStackNavigator()
const ModalStack = createStackNavigator()

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // justifyContent: 'center',
    paddingTop: 64,
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  title: {
    fontFamily: 'Kanit-Medium',
    fontSize: 40,
    marginTop: 20,
  },
  subtitle: {
    fontFamily: 'Kanit-Regular',
    fontSize: 30,
    marginBottom: 20,
  },
  button: {
    marginVertical: 16,
    backgroundColor: '#00000000',
    borderWidth: 3,
    width: 300,
    borderRadius: 10,
  },
  textStyle: {
    color: '#000',
    fontFamily: 'Kanit-Regular',
    // fontWeight: '400',
    fontSize: 20,
    // height: 80,
  }
})

const QR = ({ navigation }) => (
  <View style={styles.container}>
    <Text style={{ ...styles.title, color: COLOR.NORMAL }}>สุขภาพปกติ</Text>
    <Text style={styles.subtitle}>แสกนเพื่อบันทึกว่าเราเจอกัน</Text>
    <View
      style={{
        shadowColor: COLOR.NORMAL,
        shadowOffset: {
          width: 0,
          height: 12,
        },
        shadowOpacity: 0.58,
        shadowRadius: 16.00,
        elevation: 24,
        width: 300,
        height: 300,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#fff',
        borderRadius: 12,
      }}
    >
      <QRCode
        value='some string value'
        color='#222'
        backgroundColor='white'
        // style={{ flex: 0.8 }}
        size={250}
        // logo={{ uri: 'https://cdn4.iconfinder.com/data/icons/social-icon-4/842/facebook-512.png' }} // or logo={{uri: base64logo}}
        logoMargin={2}
        logoSize={20}
        logoBorderRadius={10}
        logoBackgroundColor='transparent'
      />
    </View>
    <Button title='ดูข้อมูลส่วนตัว' titleStyle={styles.textStyle} buttonStyle={{ ...styles.button, borderColor: COLOR.NORMAL, marginTop: 40 }} onPress={() => navigation.navigate('Profile', { name: 'Jane' })} />
    <Button title='ฉันตรวจพบ COVID-19' titleStyle={styles.textStyle} buttonStyle={{ ...styles.button, borderColor: COLOR.INFECTED }} onPress={() => navigation.navigate('Update', { name: 'Jane' })} />
    {/* <Button title='ฉันรักษาหายแล้ว' titleStyle={styles.textStyle} buttonStyle={{ ...styles.button, borderColor: COLOR.HEALTH }} onPress={() => navigation.navigate('Profile', { name: 'Jane' })} /> */}
  </View>
)

const ModalStackScreen = () => (
  <ModalStack.Navigator mode='modal'>
    <ModalStack.Screen
      name="QR"
      component={QR}
      options={{ headerShown: false }}
    />
    <ModalStack.Screen name="Update" component={UpdateStatus} options={{ title: 'อัพเดท', headerShown: false }} />
  </ModalStack.Navigator>
)

export default () => (
  <NavigationContainer independent>
    <Stack.Navigator>
      <Stack.Screen
        name="ModalStack"
        component={ModalStackScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen name="Profile" component={Profile} options={{ title: 'ข้อมูลส่วนตัว' }} />
      {/* <Stack.Screen name="Update" component={UpdateStatus} options={{ title: 'อัพเดท', headerShown: false }} /> */}
    </Stack.Navigator>
  </NavigationContainer>
)
