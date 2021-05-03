import { OrderTC } from '../../models'

export const orders = OrderTC.getResolver('findMany')
export const orderById = OrderTC.getResolver('findById')
export const orderByIds = OrderTC.getResolver('findByIds')
