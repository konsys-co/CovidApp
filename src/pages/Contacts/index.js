import React from 'react'
import moment from 'moment'
import { StyleSheet, View, ScrollView, Text } from 'react-native'
import { createStackNavigator } from '@react-navigation/stack'
import { NavigationContainer } from '@react-navigation/native'
import ContactCard from '../../components/ContactCard'
import NotificationCard from '../../components/NofiticationCard'

const Stack = createStackNavigator()

/**
 * Use any valid `name` property from eva icons (e.g `github`, or `heart-outline`)
 * https://akveo.github.io/eva-icons
 */
// const HeartIcon = style => <Icon {...style} name="heart" />

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    marginHorizontal: 24,
    paddingTop: 56,
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
    fontWeight: 'bold',
    marginTop: 16,
  }
})

const Contacts = ({ navigation }) => (
  <ScrollView>
    <View style={{ backgroundColor: '#fff' }}>
      <View style={styles.container}>
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
        />
        <Text style={styles.dateText}>{moment('2020/03/17').fromNow()}</Text>
        <ContactCard
          name='Supasit'
          dateTime={moment().format('HH:mm')}
          imgURL='https://demo.nparoco.com/Vuexy/app-assets/images/profile/user-uploads/user-13.jpg'
          location='Ari'
        />
        <ContactCard
          name='Supasit'
          dateTime={moment().format('HH:mm')}
          imgURL='https://demo.nparoco.com/Vuexy/app-assets/images/profile/user-uploads/user-13.jpg'
          location='Ari'
        />
        <Text style={styles.dateText}>{moment('2020/03/16').fromNow()}</Text>
        <ContactCard
          name='Supasit'
          dateTime={moment().format('HH:mm')}
          imgURL='https://demo.nparoco.com/Vuexy/app-assets/images/profile/user-uploads/user-13.jpg'
          location='Ari'
        />
        <ContactCard
          name='Supasit'
          dateTime={moment().format('HH:mm')}
          imgURL='https://demo.nparoco.com/Vuexy/app-assets/images/profile/user-uploads/user-13.jpg'
          location='Ari'
        />
        <Text style={styles.dateText}>{moment('2020/03/15').fromNow()}</Text>
        <ContactCard
          name='Supasit'
          dateTime={moment().format('HH:mm')}
          imgURL='https://demo.nparoco.com/Vuexy/app-assets/images/profile/user-uploads/user-13.jpg'
          location='Ari'
        />
        <Text style={styles.dateText}>{moment('2020/03/10').fromNow()}</Text>
        <ContactCard
          name='Supasit'
          dateTime={moment().format('HH:mm')}
          imgURL='https://demo.nparoco.com/Vuexy/app-assets/images/profile/user-uploads/user-13.jpg'
          location='Ari'
        />
        <ContactCard
          name='Supasit'
          dateTime={moment().format('HH:mm')}
          imgURL='https://demo.nparoco.com/Vuexy/app-assets/images/profile/user-uploads/user-13.jpg'
          location='Ari'
        />
      </View>
    </View>
  </ScrollView>
)

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