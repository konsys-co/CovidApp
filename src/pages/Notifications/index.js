import React from 'react'
import { StyleSheet, View, ScrollView, TouchableHighlight } from 'react-native'
import moment from 'moment'
import NotificationCard from '../../components/NofiticationCard'
import { STATUS } from '../../constants/userStatus'

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    // marginHorizontal: 14,
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

const MOCK_DATA = [
  {
    id: '0',
    timestamp: moment().fromNow(),
    name: 'John Doe',
    status: STATUS.NORMAL,
    imgURL: 'https://demo.nparoco.com/Vuexy/app-assets/images/profile/user-uploads/user-13.jpg'
  },
  {
    id: '1',
    timestamp: moment().fromNow(),
    name: 'John Doe',
    status: STATUS.NORMAL,
    imgURL: 'https://demo.nparoco.com/Vuexy/app-assets/images/profile/user-uploads/user-13.jpg'
  },
  {
    id: '2',
    timestamp: moment().fromNow(),
    name: 'John Doe',
    status: STATUS.RISK,
    imgURL: 'https://demo.nparoco.com/Vuexy/app-assets/images/profile/user-uploads/user-13.jpg'
  },
  {
    id: '3',
    timestamp: moment().fromNow(),
    name: 'John Doe',
    status: STATUS.INFECTED,
    imgURL: 'https://demo.nparoco.com/Vuexy/app-assets/images/profile/user-uploads/user-13.jpg'
  },
  {
    id: '4',
    timestamp: moment().fromNow(),
    name: 'John Doe',
    status: STATUS.HEALED,
    imgURL: 'https://demo.nparoco.com/Vuexy/app-assets/images/profile/user-uploads/user-13.jpg'
  },
  {
    id: '5',
    timestamp: moment().fromNow(),
    name: 'John Doe',
    status: STATUS.NORMAL,
    imgURL: 'https://demo.nparoco.com/Vuexy/app-assets/images/profile/user-uploads/user-13.jpg'
  },
  {
    id: '6',
    timestamp: moment().fromNow(),
    name: 'John Doe',
    status: STATUS.NORMAL,
    imgURL: 'https://demo.nparoco.com/Vuexy/app-assets/images/profile/user-uploads/user-13.jpg'
  },
  {
    id: '7',
    timestamp: moment().fromNow(),
    name: 'John Doe',
    status: STATUS.RISK,
    imgURL: 'https://demo.nparoco.com/Vuexy/app-assets/images/profile/user-uploads/user-13.jpg'
  },
  {
    id: '8',
    timestamp: moment().fromNow(),
    name: 'John Doe',
    status: STATUS.INFECTED,
    imgURL: 'https://demo.nparoco.com/Vuexy/app-assets/images/profile/user-uploads/user-13.jpg'
  },
  {
    id: '9',
    timestamp: moment().fromNow(),
    name: 'John Doe',
    status: STATUS.HEALED,
    imgURL: 'https://demo.nparoco.com/Vuexy/app-assets/images/profile/user-uploads/user-13.jpg'
  },
  {
    id: '10',
    timestamp: moment().fromNow(),
    name: 'John Doe',
    status: STATUS.NORMAL,
    imgURL: 'https://demo.nparoco.com/Vuexy/app-assets/images/profile/user-uploads/user-13.jpg'
  },
  {
    id: '11',
    timestamp: moment().fromNow(),
    name: 'John Doe',
    status: STATUS.NORMAL,
    imgURL: 'https://demo.nparoco.com/Vuexy/app-assets/images/profile/user-uploads/user-13.jpg'
  },
  {
    id: '12',
    timestamp: moment().fromNow(),
    name: 'John Doe',
    status: STATUS.RISK,
    imgURL: 'https://demo.nparoco.com/Vuexy/app-assets/images/profile/user-uploads/user-13.jpg'
  },
  {
    id: '13',
    timestamp: moment().fromNow(),
    name: 'John Doe',
    status: STATUS.INFECTED,
    imgURL: 'https://demo.nparoco.com/Vuexy/app-assets/images/profile/user-uploads/user-13.jpg'
  },
  {
    id: '14',
    timestamp: moment().fromNow(),
    name: 'John Doe',
    status: STATUS.HEALED,
    imgURL: 'https://demo.nparoco.com/Vuexy/app-assets/images/profile/user-uploads/user-13.jpg'
    
  },
]

const Notifications = () => (
  <ScrollView style={{ backgroundColor: '#fff' }} >
    <View style={styles.container}>
      {MOCK_DATA.map(({ id, name, imgURL, status, timestamp }) => (
        <TouchableHighlight index={id} underlayColor="#F1F1F1" onPress={() => {}} style={{ width: '100%' }}>
          <NotificationCard
            name={name}
            imgURL={imgURL}
            dateTime={timestamp}
            status={status}
          />
        </TouchableHighlight>
      ))}
    </View>
  </ScrollView>
)

export default Notifications