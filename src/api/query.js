import { gql } from 'apollo-boost'

export const GET_NOTIFICATIONS = gql`
  {
    notifications(limit: 1000, sort: _ID_DESC) {
      _id
      type
      timestamps
      user {
        firstName
        lastName
        profilePicture
      }
      updatedAt
      createdAt
    }
  }
`

export const GET_USER_PROFILE = gql`
  query profile {
    profile {
      _id
      facebookId
      email
      status
      hasAcceptedTerm
      profilePicture
      firstName
      lastName
      updatedAt
      createdAt
    }
  }
`

export const GET_CONTACT_BY_ID = gql`
  query getContactByID($id: MongoID!) {
    user(_id: $id) {
      firstName
      lastName
      profilePicture
    }
  }
`
