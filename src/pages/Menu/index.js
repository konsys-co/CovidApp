import React from 'react'
import { StyleSheet, View, Text } from 'react-native'

/**
 * Use any valid `name` property from eva icons (e.g `github`, or `heart-outline`)
 * https://akveo.github.io/eva-icons
 */
// const HeartIcon = style => <Icon {...style} name="heart" />

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  text: {
    textAlign: 'center'
  },
  likeButton: {
    marginVertical: 16
  }
})

export default ({ navigation }) => (
  <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
    <Text>This is Menu.</Text>
  </View>
)
