import { PromotionTC, UserModel, PromotionModel } from '../../models'
import { schemaComposer } from 'graphql-compose'
import { GraphQLUpload } from 'apollo-upload-server';
import { UserInputError } from 'apollo-server-express'
// import { generateRandomString } from '../../utils/generateRandomString'

// const path = require('path')
// const fs = require('fs')

schemaComposer.add(GraphQLUpload);
export const createPromotion = PromotionTC.getResolver('createOne').wrapResolve(next => async req => {
  const { _id } = req.context.user
  const user = await UserModel.findById(_id).exec()
  if (user.role != "ADMIN") throw new UserInputError(`User '${user.username}' Permission denied`);
  return next(req)
})
export const updatePromotionById = PromotionTC.getResolver('updateById').wrapResolve(next => async req => {
  const { _id } = req.context.user
  const user = await UserModel.findById(_id).exec()
  if (user.role != "ADMIN") throw new UserInputError(`User '${user.username}' Permission denied`);
  return next(req)
})

export const checkoutPromotionById = PromotionTC.getResolver('updateById').wrapResolve(next => async req => {
  const { args } = req
  const { _id } = req.context.user
  const user = await UserModel.findById(_id).exec()
  console.log(args);

  return next(req)
})
