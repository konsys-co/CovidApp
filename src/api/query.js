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

export default GET_NOTIFICATIONS
