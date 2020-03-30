import React, { useEffect, useState } from 'react'
import moment from 'moment'
import {
  StyleSheet,
  View,
  ScrollView,
  Text,
  RefreshControl,
} from 'react-native'
import { createStackNavigator } from '@react-navigation/stack'
import { useQuery, useMutation } from '@apollo/react-hooks'

import ContactCard from '../../components/ContactCard'
import RNLoading from '../../components/Loading'
import GradientBackground from '../../components/background'
import { FONT_FAMILY, FONT_SIZE, COLOR } from '../../constants/theme'
import { GET_USER_PROFILE, GET_CLOSE_CONTACTS } from '../../api/query'
import { ADD_CLOSE_CONTACT } from '../../api/mutation'

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
  centerContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  noContactText: {
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: FONT_SIZE.BODY1,
    fontFamily: FONT_FAMILY,
    color: COLOR.TEXT_GRAY,
  },
})

const CloseContactLists = () => {
  const [contactGroupData, setContactGroupData] = useState(null)
  const [refreshing, setRefreshing] = useState(false)

  const { loading, error, data } = useQuery(GET_USER_PROFILE)
  const {
    loading: getCloseContactLoading,
    error: getCloseContactError,
    data: closeContacts,
    refetch: refetchContactLists,
  } = useQuery(GET_CLOSE_CONTACTS)

  const [
    toggleAddCloseContact,
    { loading: addCloseContactLoading },
  ] = useMutation(ADD_CLOSE_CONTACT, {
    refetchQueries: [{ query: GET_CLOSE_CONTACTS }],
  })

  const { profile } = data || {}
  const { status } = profile || {}
  const { contacts } = closeContacts || {}

  useEffect(() => {
    if (contacts && contacts.length > 0) groupingContacts(contacts)
  }, [contacts])

  if (error || getCloseContactError)
    return (
      <View style={styles.centerContainer}>
        <Text>
          Error occur: {JSON.stringify(error || getCloseContactError)}
        </Text>
      </View>
    )

  if (loading || getCloseContactLoading || addCloseContactLoading)
    return (
      <View style={styles.centerContainer}>
        <RNLoading colorStatus="normal" />
      </View>
    )

  const onRefresh = () => {
    setRefreshing(true)
    refetchContactLists()
    setRefreshing(false)
  }

  const addCloseContactAgain = closeContactID =>
    toggleAddCloseContact({
      variables: { id: closeContactID, type: 'CONTACT' },
    })

  const groupingContacts = contactData => {
    const result = contactData
      .reduce((a, c) => {
        a.push({ ...c, createdAtOrder: c.createdAt.slice(0, 10) })
        return a
      }, [])
      .reduce((a, c) => {
        // eslint-disable-next-line no-param-reassign
        a[c.createdAtOrder] = [...(a[c.createdAtOrder] || []), c]
        return a
      }, {})
    setContactGroupData(result)
    return result
  }

  const renderContactLists = contactGroup => {
    if (!contactGroup)
      return (
        <View style={styles.centerContainer}>
          <RNLoading colorStatus="normal" />
        </View>
      )
    return (
      <ScrollView
        style={{ width: '100%' }}
        contentContainerStyle={{
          alignItems: 'center',
          paddingHorizontal: 20,
        }}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }>
        {Object.entries(contactGroupData).map(([key, value]) => {
          const isCurrentDay =
            moment(value[0].createdAt).diff(moment(), 'days') === 0
          const period = isCurrentDay
            ? 'วันนี้'
            : moment(value[0].createdAt).fromNow()
          return (
            <View key={key}>
              <Text style={styles.dateText}>{period}</Text>
              <ContactCard
                contactGroupData={value}
                addCloseContactAgain={addCloseContactAgain}
              />
            </View>
          )
        })}
      </ScrollView>
    )
  }

  return (
    <View style={styles.container}>
      <GradientBackground status={status} style={styles.background}>
        <Text style={styles.titleText}>รายชื่อคนที่พบ</Text>
        {contacts.length > 0 ? (
          renderContactLists(contactGroupData)
        ) : (
          <View style={styles.centerContainer}>
            <Text style={styles.noContactText}>คุณยังไม่มีการพบเจอผู้ใด</Text>
          </View>
        )}
      </GradientBackground>
    </View>
  )
}

export default () => (
  <Stack.Navigator>
    <Stack.Screen
      name="Home"
      component={CloseContactLists}
      options={{ headerShown: false }}
    />
  </Stack.Navigator>
)
