import { ProductTC, UserModel} from '../../models'
import { schemaComposer } from 'graphql-compose'
import { GraphQLUpload } from 'apollo-upload-server';
import { UserInputError } from 'apollo-server-express'

import { generateRandomString } from '../../utils/generateRandomString'

const path = require('path')
const fs = require('fs')

schemaComposer.add(GraphQLUpload);

const UploadPayload = schemaComposer.createObjectTC({
  name: 'UploadPayload',
  fields: {
    url: 'String!',
  },
})

export const uploadFile = schemaComposer.createResolver({
  name: "uploadFile",
  args: {
    file: 'Upload!'
  },
  type: UploadPayload,
  resolve: async ({ args }) => {
    const file = args.file.file
    const { createReadStream, filename } = await file

    const { ext } = path.parse(filename)
    const randomName = generateRandomString(12) + ext

    const pathName = path.join(__dirname, `../../../public/images/${randomName}`)
    await new Promise((res) =>
      createReadStream().pipe(fs.createWriteStream(pathName)).on("close", res)
    );

    return {
      url: `${process.env.SERVER}/images/${randomName}`,
    };
  },
})

async function check_permission({ next, req }) {
  const { _id } = req.context.user
  const user = await UserModel.findById(_id).exec()
  if (user.role != "ADMIN") throw new UserInputError(`User '${user.username}' Permission denied`);
  return true
}

export const createProduct = ProductTC.getResolver('createOne').wrapResolve(next => async req => {
  await check_permission({ next, req })
  return next(req)
})


export const updateProductById = ProductTC.getResolver('updateById').wrapResolve(next => async req => {
  const { _id } = req.context.user
  const user = await UserModel.findById(_id).exec()
  if (user.role != "ADMIN") throw new UserInputError(`User '${user.username}' Permission denied`);
  return next(req)
})

export const updateProductMany = ProductTC.getResolver('updateMany')