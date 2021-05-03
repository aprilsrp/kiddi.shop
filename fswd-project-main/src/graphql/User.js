import { gql } from '@apollo/client'

export const USER_QUERY = gql`
query ($userId: MongoID!) {
    userById (_id: $userId) {
    username
    firstname
    lastname
    _id
  }
}
`