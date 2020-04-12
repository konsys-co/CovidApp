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
  mutation makeContact($id: MongoID!, $type: ContactType!, $location: CloseContactLocationInput, $locationName: String) {
    makeContact(contact: $id, type: $type, location: $location, locationName: $locationName) {
      recordId
      record {
        contact
        contactee
      }
    }
  }
`
