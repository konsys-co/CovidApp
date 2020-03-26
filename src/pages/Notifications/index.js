import React from 'react'
import {
  StyleSheet,
  View,
  ScrollView,
  TouchableHighlight,
  Text,
} from 'react-native'
import moment from 'moment'
import { useQuery } from '@apollo/react-hooks'
import GradientBackground from '../../components/background'
import NotificationCard from '../../components/NofiticationCard'
import { STATUS } from '../../constants/userStatus'
import { GET_NOTIFICATIONS } from '../../api/query'

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    width: '100%',
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
  titleText: {
    fontFamily: 'Kanit-Regular',
    alignSelf: 'flex-start',
    fontSize: 24,
    paddingLeft: 20,
    marginBottom: 22,
  },
})

// TODO: implement with real data (for now the type of all is "infectedAlert")
const mapTypeToStatus = type => STATUS.INFECTED

const Notifications = () => {
  const { loading, error, data } = useQuery(GET_NOTIFICATIONS)

  if (error) return <Text>Error!!! {JSON.stringify(error)}</Text>

  // TODO: delete this
  console.log('Notifications data', data)

  return (
    <View style={styles.container}>
      <GradientBackground status={STATUS.NORMAL} style={styles.background}>
        <Text style={styles.titleText}>แจ้งเตือน</Text>
        <ScrollView
          style={{ width: '100%' }}
          contentContainerStyle={{ alignItems: 'center' }}>
          {loading ? (
            <Text>Loading...</Text>
          ) : (
            data.notifications.map(({ _id, actor, type, timestamps }) => (
              <TouchableHighlight
                key={_id}
                underlayColor="#F1F1F1"
                onPress={() => {}}
                style={{ width: '100%' }}>
                <NotificationCard
                  name={actor.substring(15, actor.length - 1)}
                  imgURL="https://demo.nparoco.com/Vuexy/app-assets/images/profile/user-uploads/user-13.jpg"
                  dateTime={moment().from(timestamps)}
                  status={mapTypeToStatus(type)}
                />
              </TouchableHighlight>
            ))
          )}
        </ScrollView>
      </GradientBackground>
    </View>
  )
}

export default Notifications
