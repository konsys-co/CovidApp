import React from 'react'
import moment from 'moment'
import { StyleSheet, View, ScrollView, Text } from 'react-native'
import { createStackNavigator } from '@react-navigation/stack'
import ContactCard from '../../components/ContactCard'
import GradientBackground from '../../components/background'

const Stack = createStackNavigator()

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    alignItems: 'center',
  },
  background: {
    paddingTop: 72,
  },
  text: {
    textAlign: 'center',
  },
  likeButton: {
    marginVertical: 16,
  },
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    width: '100%',
    alignItems: 'center',
  },
  dateText: {
    alignSelf: 'flex-start',
    fontSize: 18,
    fontFamily: 'Kanit-Regular',
    marginTop: 16,
  },
  titleText: {
    fontFamily: 'Kanit-Regular',
    alignSelf: 'flex-start',
    fontSize: 24,
    paddingLeft: 20,
    marginBottom: 22,
  },
})

const Contacts = () => {
  const status = 'RISK' // TODO: Fetch from server later.
  return (
    <View style={styles.container}>
      <GradientBackground status={status} style={styles.background}>
        <Text style={styles.titleText}>รายชื่อคนที่พบ</Text>
        <ScrollView
          style={{ width: '100%', paddingHorizontal: 20 }}
          contentContainerStyle={{ alignItems: 'center' }}>
          <Text style={styles.dateText}>{moment().fromNow()}</Text>
          <ContactCard
            name="Supasit"
            dateTime={moment().format('HH:mm')}
            imgURL="https://demo.nparoco.com/Vuexy/app-assets/images/profile/user-uploads/user-13.jpg"
            location="Ari"
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
