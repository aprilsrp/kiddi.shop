import { OrderTC, UserModel, ProductModel, OrderModel } from '../../models'
import { UserInputError } from 'apollo-server-express'
import { generateRandomString, generateRandomNumber } from '../../utils/generateRandomString'

export const createOrder = OrderTC.getResolver('createOne').wrapResolve(next => async req => {
  const { args } = req
  req.args.record.order_id = "TH-" + generateRandomString(10) + generateRandomNumber(4)
  return next(req)
})
export const updateOrderById = OrderTC.getResolver('updateById').wrapResolve(next => async req => {
  const { args } = req
  const { _id } = req.context.user
  const status = args.record.status
  let product_data
  console.log(status);

  if (status === 'Shipping') {

    const order = await OrderModel.findById(args._id).exec()
    const products = order.products
    if (order.status === 'Order') {
      // Set status to "Order"
      await products.forEach(async product => {
        product_data = await ProductModel.findById(product.product_id).exec()
        product_data.count -= product.count;
        product_data.save()
      });
    }
  } else if (status === 'Delivered' && status === 'Refunded' && status === 'Canceled') {
    // Permission require
    const user = await UserModel.findById(_id).exec()

    if (user.role != "ADMIN") throw new UserInputError(`User '${user.username}' Permission denied`);

  } else {

    // Update order 
    const order = await OrderModel.findById(args._id).exec()
    const products = order.products
    await Promise.all(products.map(async (product)=>{
      product_data = await ProductModel.findById(product.product_id).exec()
      if (product_data.count <= product.count){
        throw new UserInputError(`สินค้า ${product_data.name} ในระบบมีไม่พอ`);
      }
    }))
  }

  return next(req)
})

export const updateOrderMany = OrderTC.getResolver('updateMany')
