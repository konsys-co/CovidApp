import { gql } from 'apollo-boost'

export const UPDATE_STATUS = gql`
  mutation setInfectionStatus(
    $status: EnumUserStatus!
  ) {
    setInfectionStatus (
      status: $status
    ) {
      _id
      status
    }
  }
`

export default UPDATE_STATUS
