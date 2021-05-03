import mongoose from 'mongoose'
import { composeWithMongoose } from 'graphql-compose-mongoose'

const { Schema } = mongoose
const enumOrderStatus = ["Order", "Shipped", "Delivered", "Refunded", "Canceled"]
const OrderSchema = new Schema({
  order_id: {
    type: String,
  },
  customer_id: {
    type: String,
  },
  customer_name: {
    type: String,
  },
  status: {
    type: String,
    enum: enumOrderStatus,
    default: "Order"
  },
  products: [
    {
      product_id: { type: String, },
      count: {
        type: Number,
        default: 1
      },
    }
  ],
  address: {
    name: { type: String },
    address: { type: String },
    province: { type: String },
    district: { type: String },
    sub_district: { type: String },
    postal_code: { type: String },
    phone: { type: String },
  },
  date: {
    type: Date,
    default: Date.now
  },
  payment_method: {
    type: String,
    default: "Pay On Delivery"
  },
})

export const OrderModel = mongoose.model('Order', OrderSchema)

export const OrderTC = composeWithMongoose(OrderModel)

export default OrderModel
