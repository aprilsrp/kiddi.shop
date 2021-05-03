import { gql } from '@apollo/client'

export const CREATE_PRODUCT_MUTATION = gql`
mutation ($record: CreateOneProductInput!) {
  createProduct (record: $record) {
    recordId
  }
}
`

export const PRODUCT_QUERY = gql`
query ($productId: MongoID!) {
  productById (_id: $productId) {
    name
    description
    color
    size
    tag
    image
    price
    count
    active
  }
}
`

export const UPDATE_PRODUCT = gql`
mutation ($productId: MongoID!, $record: UpdateByIdProductInput!) {
  updateProductById (_id: $productId, record: $record) {
    recordId
  }
}
`

export const PRODUCT_QUERY_ALL = gql`
query {
  products {
    _id
    name
    description
    color
    size
    tag
    image
    price
    count
    active
  }
}
`

export const PRODUCT_QUERYS = gql`
query ($productIds: [MongoID!]!) {
  productByIds (_ids: $productIds) {
    _id
    name
    description
    color
    size
    tag
    image
    price
    count
    active
  }
}
`
