import mongoose from 'mongoose'
import { composeWithMongoose } from 'graphql-compose-mongoose'

const { Schema } = mongoose

const enumProductType = ["shirt", "pants", "skirt", "accessories"]
const enumProductColor = ["Blue", "Green", "Red", "Orange", "Violet", "Indigo", "Yellow"]

const ProductSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true
  },
  type: {
    type: String,
    required: true,
    enum: enumProductType,
  },
  color: {
    type: String,
    required: true,
    enum: enumProductColor,
  },
  size: {
    type: String,
  },
  tag: [
    { type: String }
  ],
  image: [
    { type: String }
  ],
  price: {
    type: Number
  },
  count: {
    type: Number
  },
  detail: {
    type: String
  },
  active: {
    type: Boolean
  }
})

const baseOptions = {
  inputType: {
    removeFields: ['timestamp'],
  },
}

export const ProductModel = mongoose.model('Product', ProductSchema)

export const ProductTC = composeWithMongoose(ProductModel, baseOptions)

export default ProductModel