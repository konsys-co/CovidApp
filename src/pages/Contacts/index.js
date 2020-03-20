import React from 'react'
import moment from 'moment'
import { StyleSheet, View, ScrollView, Text } from 'react-native'
import { createStackNavigator } from '@react-navigation/stack'
import { NavigationContainer } from '@react-navigation/native'
import ContactCard from '../../components/ContactCard'
import NotificationCard from '../../components/NofiticationCard'
import GradientBackground from '../../components/background'

const Stack = createStackNavigator()

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  text: {
    textAlign: 'center'
  },
  likeButton: {
    marginVertical: 16
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
  }
})

const Contacts = ({ navigation }) => {
  const status = 'RISK' // TODO: Fetch from server later.
  return (
    <ScrollView>
      <View style={styles.container}>
        <GradientBackground status={status} style={{ paddingTop: 72, paddingHorizontal: 20 }}>
          <Text style={styles.dateText}>{moment().fromNow()}</Text>
          <NotificationCard
            name='Supasit'
            dateTime={moment().fromNow()}
            imgURL='https://demo.nparoco.com/Vuexy/app-assets/images/profile/user-uploads/user-13.jpg'
            location='Ari'
            status='เฝ้าระวัง'
          />
          <ContactCard
            name='Supasit'
            dateTime={moment().format('HH:mm')}
            imgURL='https://demo.nparoco.com/Vuexy/app-assets/images/profile/user-uploads/user-13.jpg'
            location='Ari'
            status={status}
          />
          <Text style={styles.dateText}>{moment('2020/03/17').fromNow()}</Text>
          <ContactCard
            name='Supasit'
            dateTime={moment().format('HH:mm')}
            imgURL='https://demo.nparoco.com/Vuexy/app-assets/images/profile/user-uploads/user-13.jpg'
            location='Ari'
            status={status}
          />
          <ContactCard
            name='Supasit'
            dateTime={moment().format('HH:mm')}
            imgURL='https://demo.nparoco.com/Vuexy/app-assets/images/profile/user-uploads/user-13.jpg'
            location='Ari'
            status={status}
          />
          <Text style={styles.dateText}>{moment('2020/03/16').fromNow()}</Text>
          <ContactCard
            name='Supasit'
            dateTime={moment().format('HH:mm')}
            imgURL='https://demo.nparoco.com/Vuexy/app-assets/images/profile/user-uploads/user-13.jpg'
            location='Ari'
            status={status}
          />
          <ContactCard
            name='Supasit'
            dateTime={moment().format('HH:mm')}
            imgURL='https://demo.nparoco.com/Vuexy/app-assets/images/profile/user-uploads/user-13.jpg'
            location='Ari'
            status={status}
          />
          <Text style={styles.dateText}>{moment('2020/03/15').fromNow()}</Text>
          <ContactCard
            name='Supasit'
            dateTime={moment().format('HH:mm')}
            imgURL='https://demo.nparoco.com/Vuexy/app-assets/images/profile/user-uploads/user-13.jpg'
            location='Ari'
            status={status}
          />
          <Text style={styles.dateText}>{moment('2020/03/10').fromNow()}</Text>
          <ContactCard
            name='Supasit'
            dateTime={moment().format('HH:mm')}
            imgURL='https://demo.nparoco.com/Vuexy/app-assets/images/profile/user-uploads/user-13.jpg'
            location='Ari'
            status={status}
          />
          <ContactCard
            name='Supasit'
            dateTime={moment().format('HH:mm')}
            imgURL='https://demo.nparoco.com/Vuexy/app-assets/images/profile/user-uploads/user-13.jpg'
            location='Ari'
            status={status}
          />
        </GradientBackground>
      </View>
    </ScrollView>
  )
}

export default () => (
  // <NavigationContainer independent>
  <Stack.Navigator>
    <Stack.Screen
      name="Home"
      component={Contacts}
      options={{ title: 'รายชื่อคนที่พบ', headerShown: false }}
    />
  </Stack.Navigator>
  // </NavigationContainer>
)