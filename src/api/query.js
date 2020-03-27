import { gql } from 'apollo-boost'

export const GET_NOTIFICATIONS = gql`
  {
    notifications(limit: 30) {
      notifier
      actor
      timestamps
      title
      description
      type
      read
      _id
      updatedAt
      createdAt
    }
  }
`

export const GET_USER_PROFILE = gql`
  {
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
