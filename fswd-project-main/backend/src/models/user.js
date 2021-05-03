import mongoose from 'mongoose'
import bcrypt from 'mongoose-bcrypt'
import { composeWithMongoose } from 'graphql-compose-mongoose'

const { Schema } = mongoose

const enumRole = ["ADMIN", "CUSTOMER"]

const UserSchema = new Schema({
  username: {
    type: String,
    required: true,
    index: true,
    unique: true,
  },
  firstname: {
    type: String,
    required: true
  },
  lastname: {
    type: String,
    required: true
  },
  password: {
    type: String,
    require: true,
    bcrypt: true
  },
  role: {
    type: String,
    require: true,
    enum: enumRole,
    default: "CUSTOMER"
  },
})
UserSchema.plugin(bcrypt)

export const UserModel = mongoose.model('User', UserSchema)

export const UserTC = composeWithMongoose(UserModel).removeField('password')

export default UserModel
