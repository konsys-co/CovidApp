import { gql } from 'apollo-boost'

export const UPDATE_STATUS = gql`
  mutation setInfectionStatus($status: EnumUserStatus!) {
    setInfectionStatus(status: $status) {
      _id
      status
    }
  }
`

export const ADD_CLOSE_CONTACT = gql`
  mutation makeContact($id: MongoID!, $type: ContactType!) {
    makeContact(contact: $id, type: $type) {
      recordId
      record {
        contact
        contactee
      }
    }
  }
`
