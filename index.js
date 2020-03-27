import React from 'react'
import { AppRegistry } from 'react-native'
import AsyncStorage from '@react-native-community/async-storage'
import { HttpLink } from 'apollo-link-http'
import { setContext } from 'apollo-link-context'
import { InMemoryCache } from 'apollo-cache-inmemory'
import { ApolloClient } from 'apollo-client'
import { ApolloProvider } from '@apollo/react-hooks'
import App from './src/App'
import { name as appName } from './app.json'

const link = new HttpLink({ uri: 'https://tidyoung.devspree.xyz/graphql' })
const cache = new InMemoryCache()

const linkContext = setContext(async (_, { headers }) => {
  // get the authentication token from AsyncStorage if it exists
  const token = await AsyncStorage.getItem('@TidyoungUserToken:accessToken')
  // return the headers to the context so httpLink can read them
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : '',
    },
  }
})

const client = new ApolloClient({ link: linkContext.concat(link), cache })

const Root = () => (
  <ApolloProvider client={client}>
    <App />
  </ApolloProvider>
)

AppRegistry.registerComponent(appName, () => Root)
