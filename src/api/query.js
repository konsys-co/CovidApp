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

export default GET_NOTIFICATIONS
