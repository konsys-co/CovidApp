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
import Geolocation from '@react-native-community/geolocation'

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

  const addCloseContactAgain = async closeContactID => {
    await Geolocation.getCurrentPosition((info, geoError) => {
      if (geoError === undefined) {
        toggleAddCloseContact({ variables: { id: closeContactID, type: 'CONTACT', location: { coordinates: [info.coords.latitude, info.coords.longitude] } } })
      }
    }
    )
  }

  // eslint-disable-next-line no-undef
  const getLocationName = ({ lat, long }) => new Promise(() => fetch(`https://maps.googleapis.com/maps/api/geocode/json?address=${lat},${long}&key=YOUR_KEY`)
    .then((response) => response.json())
    .then((responseJson) => {
      // console.info(JSON.stringify(responseJson))
      console.info(responseJson.results[0].address_components[2].short_name)
      return responseJson.results[0].address_components[2].short_name
      // console.log(JSON.stringify(responseJson).results[0].address_components[2].short_name)
      // return JSON.stringify(responseJson).results[0].address_components[2].short_name
    }))

  const groupingContacts = async contactData => {
    const result = await contactData.reduce(async (a, c) => {
      const accumulator = await a
      accumulator.push({
        ...c,
        // eslint-disable-next-line no-undef
        // TODO fetch location name from google service
        // location: await getLocationName({ lat: 37.785834, long: -122.406417 }),
        createdAtOrder: c.createdAt.slice(0, 10)
      })
      return accumulator
    }, [])
      .reduce((a, c) => {
        // eslint-disable-next-line no-param-reassign
        a[c.createdAtOrder] = [...(a[c.createdAtOrder] || []), c]
        return a
      }, {})
    setContactGroupData(result)
    // console.info(result)
    return result
  }

  const formatDate = (onlyDate, dateTime) => {
    const isToday = moment(onlyDate).diff(moment(), 'days') === 0
    if (isToday) return 'วันนี้'
    const isYesterday = moment(onlyDate).isSame(
      moment()
        .subtract(1, 'day')
        .format('YYYY-MM-DD'),
    )
    if (isYesterday) return 'เมื่อวาน'
    return moment(dateTime).fromNow()
  }

  const renderContactLists = contactGroup => {
    if (!contactGroup)
      return (
        <View style={styles.centerContainer}>
          <RNLoading colorStatus="normal" />
        </View>
      )
    return Object.entries(contactGroupData).map(([key, value]) => {
      const { createdAtOrder: onlyDate, createdAt: dateTime } = value[0]
      return (
        <View key={key}>
          <Text style={styles.dateText}>{formatDate(onlyDate, dateTime)}</Text>
          <ContactCard
            contactGroupData={value}
            addCloseContactAgain={addCloseContactAgain}
          />
        </View>
      )
    })
  }

  const renderContactWithScroll = () => {
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
        {contacts.length > 0 ? (
          renderContactLists(contactGroupData)
        ) : (
            <View style={styles.centerContainer}>
              <Text style={styles.noContactText}>คุณยังไม่มีการพบเจอผู้ใด</Text>
            </View>
          )}
      </ScrollView>
    )
  }

  return (
    <View style={styles.container}>
      <GradientBackground status={status} style={styles.background}>
        <Text style={styles.titleText}>รายชื่อคนที่พบ</Text>
        {renderContactWithScroll()}
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
