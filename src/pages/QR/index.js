import React from 'react'
import { StyleSheet, View, Text } from 'react-native'
import { createStackNavigator } from '@react-navigation/stack'
import { NavigationContainer } from '@react-navigation/native'
import QRCode from 'react-native-qrcode-svg'
import { Button } from 'react-native-elements'
import GradientBackground from '../../components/background'

import Profile from './profile'
import UpdateStatus from './updateStatus'
import { COLOR } from '../../constants/theme'
import * as STATUS from '../../constants/userStatus'

const Stack = createStackNavigator()
const ModalStack = createStackNavigator()

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  title: {
    fontFamily: 'Kanit-Regular',
    fontSize: 40,
    marginTop: 20,
  },
  subtitle: {
    fontFamily: 'Kanit-Regular',
    fontSize: 25,
    marginBottom: 20,
  },
  button: {
    marginVertical: 16,
    backgroundColor: 'transparent',
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
  },
})

const QR = ({ navigation }) => {
  const status = 'NORMAL' // TODO: Fetch from server later.
  const isInfected = status === STATUS.STATUS.INFECTED
  return (
    <View style={styles.container}>
      <GradientBackground status={status}>
        <Text style={{ ...styles.title, color: STATUS.NORMAL[status] }}>
          {STATUS.TEXT[status]}
        </Text>
        <Text style={styles.subtitle}>แสกนเพื่อบันทึกว่าเราเจอกัน</Text>
        <View
          style={{
            shadowColor: STATUS.DARK[status],
            shadowOffset: {
              width: 0,
              height: 12,
            },
            shadowOpacity: 0.58,
            shadowRadius: 16.0,
            elevation: 24,
            width: 300,
            height: 300,
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: '#fff',
            borderRadius: 12,
          }}>
          <QRCode
            value="some string value"
            color="#222"
            backgroundColor="white"
            // style={{ flex: 0.8 }}
            size={250}
            // logo={{ uri: 'https://cdn4.iconfinder.com/data/icons/social-icon-4/842/facebook-512.png' }} // or logo={{uri: base64logo}}
            logoMargin={2}
            logoSize={20}
            logoBorderRadius={10}
            logoBackgroundColor="transparent"
          />
        </View>
        <Button
          title="ดูข้อมูลส่วนตัว"
          titleStyle={styles.textStyle}
          buttonStyle={{
            ...styles.button,
            borderColor: STATUS.NORMAL[status],
            marginTop: 40,
          }}
          onPress={() => navigation.navigate('Profile', { name: 'Jane' })}
        />
        <Button
          title={isInfected ? 'ฉันรักษาหายแล้ว' : 'ฉันตรวจพบ COVID-19'}
          titleStyle={styles.textStyle}
          buttonStyle={{
            ...styles.button,
            borderColor: isInfected ? COLOR.MINT : COLOR.COPPER,
          }}
          onPress={() => navigation.navigate('Update', { name: 'Jane' })}
        />
      </GradientBackground>
    </View>
  )
}

const ModalStackScreen = () => (
  <ModalStack.Navigator mode="modal">
    <ModalStack.Screen
      name="QR"
      component={QR}
      options={{ headerShown: false }}
    />
    <ModalStack.Screen
      name="Update"
      component={UpdateStatus}
      options={{
        cardStyle: { backgroundColor: 'transparent' },
        title: 'อัพเดท',
        headerShown: false,
      }}
    />
  </ModalStack.Navigator>
)

export default ({ userData }) => (
  <NavigationContainer independent>
    <Stack.Navigator>
      <Stack.Screen
        name="ModalStack"
        component={ModalStackScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Profile"
        options={{ title: 'ข้อมูลส่วนตัว', headerShown: false }}>
        {({ navigation }) => (
          <Profile userData={userData} navigation={navigation} />
        )}
      </Stack.Screen>
      {/* <Stack.Screen name="Update" component={UpdateStatus} options={{ title: 'อัพเดท', headerShown: false }} /> */}
    </Stack.Navigator>
  </NavigationContainer>
)
