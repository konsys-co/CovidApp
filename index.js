import React from 'react'
import { AppRegistry } from 'react-native'
import { HttpLink } from 'apollo-link-http'
import { InMemoryCache } from 'apollo-cache-inmemory'
import { ApolloClient } from 'apollo-client'
import { ApolloProvider } from '@apollo/react-hooks'
import App from './src/App'
import { name as appName } from './app.json'

// TODO: integrate with production uri
const link = new HttpLink({ uri: 'http://localhost:3000/graphql' })
const cache = new InMemoryCache()
const client = new ApolloClient({ link, cache  })

const Root = () => (
  <ApolloProvider client={client}>
    <App />
  </ApolloProvider>
)

AppRegistry.registerComponent(appName, () => Root)
