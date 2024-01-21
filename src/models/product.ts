import { ILawnMower, IPhoneCase, IShirt } from './'

export enum ProductType {
  LawnMower = 'landmower',
  PhoneCase = 'phonecase',
  Shirt = 'shirt',
}

export type IProduct = {
  id: number
  name: string
  price: number
}

export type IProductModel = IProduct & {
  type: ProductType
}

export type Product = ILawnMower | IPhoneCase | IShirt

export class ProductModel implements IProductModel {
  id: number
  name: string
  price: number
  type: ProductType

  constructor(product: Product) {
    this.id = product.id
    this.name = product.name
    this.price = product.price
    this.type = ProductModel.getProductType(product)
  }

  static isLawnMower(product: Product): product is ILawnMower {
    return (product as ILawnMower).fuelEfficiency !== undefined
  }

  static isPhoneCase(product: Product): product is IPhoneCase {
    return (product as IPhoneCase).targetPhone !== undefined
  }

  static isTShirt(product: Product): product is IShirt {
    return (product as IShirt).shirtText !== undefined
  }

  static getProductType(product: Product): ProductType {
    if (ProductModel.isLawnMower(product)) {
      return ProductType.LawnMower
    }
    if (ProductModel.isPhoneCase(product)) {
      return ProductType.PhoneCase
    }
    if (ProductModel.isTShirt(product)) {
      return ProductType.Shirt
    }

    throw new Error('Invalid Product Type!')
  }

  static getTypeLabel(type: ProductType): string {
    switch (type) {
      case ProductType.LawnMower:
        return 'Lawn Mower'
      case ProductType.PhoneCase:
        return 'Phone Case'
      case ProductType.Shirt:
        return 'T-Shirt'
      default:
        return ''
    }
  }
}
