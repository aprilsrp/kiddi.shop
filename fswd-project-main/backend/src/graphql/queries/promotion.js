import { PromotionTC } from '../../models'

export const promotions = PromotionTC.getResolver('findMany')
export const promotionById = PromotionTC.getResolver('findById')
export const promotionByIds = PromotionTC.getResolver('findByIds')
