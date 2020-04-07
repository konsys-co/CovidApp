/* eslint-disable no-nested-ternary */
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
import RNLoading from '../../components/Loading'
import { COLOR, FONT_FAMILY, FONT_SIZE } from '../../constants/theme'
import { GET_NOTIFICATIONS, GET_USER_PROFILE } from '../../api/query'

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    width: '100%',
  },
  background: {
    paddingTop: 50,
  },
  text: {
    fontSize: FONT_SIZE.BODY1,
    fontFamily: FONT_FAMILY,
    color: COLOR.TEXT_GRAY,
  },
  titleText: {
    fontFamily: FONT_FAMILY,
    alignSelf: 'flex-start',
    fontSize: FONT_SIZE.HEADER2,
    paddingLeft: 20,
    marginBottom: 18,
  },
})

const Notifications = () => {
  const { loading, error, data } = useQuery(GET_NOTIFICATIONS)
  const { data: userProfileData } = useQuery(GET_USER_PROFILE)

  const { profile } = userProfileData || {}
  const { status } = profile || {}

  if (error) return <Text>Error!!! {JSON.stringify(error)}</Text>

  return (
    <View style={styles.container}>
      <GradientBackground status={status} style={styles.background}>
        <Text style={styles.titleText}>แจ้งเตือน</Text>
        <ScrollView
          style={{ width: '100%' }}
          contentContainerStyle={{ alignItems: 'center' }}>
          {loading ? (
            <RNLoading colorStatus="normal" />
          ) : data.notifications.length > 0 ? (
            data.notifications.map(({ _id, user, type, timestamps }) => (
              <TouchableHighlight
                key={_id}
                underlayColor="#F1F1F1"
                onPress={() => {}}
                style={{ width: '100%' }}>
                <NotificationCard
                  name={[user?.firstName, user?.lastName].join(' ')}
                  imgURL={user?.profilePicture}
                  dateTime={moment().from(timestamps)}
                  status={type.toUpperCase()}
                />
              </TouchableHighlight>
            ))
          ) : (
            <Text style={styles.text}>ไม่พบการแจ้งเตือน</Text>
          )}
        </ScrollView>
      </GradientBackground>
    </View>
  )
}

export default Notifications
