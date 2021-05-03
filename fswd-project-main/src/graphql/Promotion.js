import { gql } from '@apollo/client'

export const CREATE_PROMOTION_MUTATION = gql`
mutation ($record: CreateOnePromotionFreeInput!) {
  createPromotionFree (record: $record) {
    recordId
  }
}
`

export const PROMOTION_QUERY = gql`
query ($promotionId: MongoID!) {
  promotionById (_id: $promotionId) {
    name
    description
    type
    start_date
    start_time
    end_date
    end_time
    banner
    buy_get
    get_buy
    persent
    active
  }
}
`

export const UPDATE_PROMOTION = gql`
mutation ($promotionId: MongoID!, $record: UpdateByIdPromotionInput!) {
  updatePromotionById (_id: $promotionId, record: $record) {
    recordId
  }
}
`

export const PROMOTION_QUERY_ALL = gql`
query {
  promotions {
    _id
    name
    description
    type
    banner
    start_date
    start_time
    end_date
    end_time
    buy_get
    get_buy
    persent
    active
  }
}
`
