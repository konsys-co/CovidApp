import React from 'react'
import { ActivityIndicator } from 'react-native'

import { LOADING_COLOR } from '../../constants/userStatus'
import { COLOR } from '../../constants/theme'

const RNLoading = ({ colorStatus }) => {
  const colorSet = colorStatus ? LOADING_COLOR[colorStatus] : COLOR.BLACK
  return <ActivityIndicator size="large" color={colorSet} />
}

export default RNLoading
