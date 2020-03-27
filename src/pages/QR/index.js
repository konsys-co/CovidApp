import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'

import Profile from './Profile'
import QRDetail from './QRDetail'

const Stack = createStackNavigator()

const QRStack = ({ navigation, userData, setLoggedinStatus, setUserData }) => (
  <Stack.Navigator>
    <Stack.Screen name="QRDetail" options={{ headerShown: false }}>
      {() => <QRDetail navigation={navigation} />}
    </Stack.Screen>
    <Stack.Screen name="Profile" options={{ headerShown: false }}>
      {() => (
        <Profile
          navigation={navigation}
          userData={userData}
          setLoggedinStatus={setLoggedinStatus}
          setUserData={setUserData}
        />
      )}
    </Stack.Screen>
  </Stack.Navigator>
)

export default QRStack
