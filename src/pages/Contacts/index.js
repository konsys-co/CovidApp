import React from 'react'
import moment from 'moment'
import { StyleSheet, View, ScrollView, Text } from 'react-native'
import { createStackNavigator } from '@react-navigation/stack'
import { useQuery } from '@apollo/react-hooks'

import ContactCard from '../../components/ContactCard'
import RNLoading from '../../components/Loading'
import GradientBackground from '../../components/background'
import { FONT_FAMILY, FONT_SIZE } from '../../constants/theme'
import { GET_USER_PROFILE } from '../../api/query'

const Stack = createStackNavigator()

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    alignItems: 'center',
  },
  background: {
    paddingTop: 50,
  },
  likeButton: {
    marginVertical: 16,
  },
  dateText: {
    alignSelf: 'flex-start',
    fontSize: FONT_SIZE.BODY1,
    fontFamily: FONT_FAMILY,
    marginVertical: 8,
  },
  titleText: {
    fontFamily: FONT_FAMILY,
    alignSelf: 'flex-start',
    fontSize: FONT_SIZE.HEADER2,
    paddingLeft: 20,
    marginBottom: 18,
  },
  errorContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
})

const Contacts = () => {
  const { loading, error, data } = useQuery(GET_USER_PROFILE)

  const { profile } = data || {}
  const { status } = profile || {}

  if (error)
    return (
      <View style={styles.errorContainer}>
        <Text>Error occur: {JSON.stringify(error)}</Text>
      </View>
    )

  if (loading) return <RNLoading colorStatus="normal" />

  return (
    <View style={styles.container}>
      <GradientBackground status={status} style={styles.background}>
        <Text style={styles.titleText}>รายชื่อคนที่พบ</Text>
        <ScrollView
          style={{ width: '100%' }}
          contentContainerStyle={{
            alignItems: 'center',
            paddingHorizontal: 20,
          }}>
          <Text style={styles.dateText}>{moment().fromNow()}</Text>
          <ContactCard
            name="John Doe"
            dateTime={moment().format('HH:mm')}
            imgURL="https://demo.nparoco.com/Vuexy/app-assets/images/profile/user-uploads/user-13.jpg"
            // location="Ari"
            status={status}
          />
          <Text style={styles.dateText}>{moment('2020/03/17').fromNow()}</Text>
          <ContactCard
            name="Supasit"
            dateTime={moment().format('HH:mm')}
            imgURL="https://demo.nparoco.com/Vuexy/app-assets/images/profile/user-uploads/user-13.jpg"
            location="Ari"
            status={status}
          />
          <ContactCard
            name="Supasit"
            dateTime={moment().format('HH:mm')}
            imgURL="https://demo.nparoco.com/Vuexy/app-assets/images/profile/user-uploads/user-13.jpg"
            location="Ari"
            status={status}
          />
          <Text style={styles.dateText}>{moment('2020/03/16').fromNow()}</Text>
          <ContactCard
            name="Supasit"
            dateTime={moment().format('HH:mm')}
            imgURL="https://demo.nparoco.com/Vuexy/app-assets/images/profile/user-uploads/user-13.jpg"
            location="Ari"
            status={status}
          />
          <ContactCard
            name="Supasit"
            dateTime={moment().format('HH:mm')}
            imgURL="https://demo.nparoco.com/Vuexy/app-assets/images/profile/user-uploads/user-13.jpg"
            location="Ari"
            status={status}
          />
          <Text style={styles.dateText}>{moment('2020/03/15').fromNow()}</Text>
          <ContactCard
            name="Supasit"
            dateTime={moment().format('HH:mm')}
            imgURL="https://demo.nparoco.com/Vuexy/app-assets/images/profile/user-uploads/user-13.jpg"
            location="Ari"
            status={status}
          />
          <Text style={styles.dateText}>{moment('2020/03/10').fromNow()}</Text>
          <ContactCard
            name="Supasit"
            dateTime={moment().format('HH:mm')}
            imgURL="https://demo.nparoco.com/Vuexy/app-assets/images/profile/user-uploads/user-13.jpg"
            location="Ari"
            status={status}
          />
          <ContactCard
            name="Supasit"
            dateTime={moment().format('HH:mm')}
            imgURL="https://demo.nparoco.com/Vuexy/app-assets/images/profile/user-uploads/user-13.jpg"
            location="Ari"
            status={status}
          />
        </ScrollView>
      </GradientBackground>
    </View>
  )
}

export default () => (
  // <NavigationContainer independent>
  <Stack.Navigator>
    <Stack.Screen
      name="Home"
      component={Contacts}
      options={{ headerShown: false }}
    />
  </Stack.Navigator>
  // </NavigationContainer>
)
