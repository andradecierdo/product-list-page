import React, { createContext, ReactNode, useContext, useEffect, useState } from 'react'
import { ILawnMower, IPhoneCase, IProductModel, IShirt, Product, ProductModel, ProductType } from '../models'
import LawnmowerRepository from '../do-not-refactor/LawnmowerRepository'
import PhoneCaseRepository from '../do-not-refactor/PhoneCaseRepository'
import TShirtRepository from '../do-not-refactor/TShirtRepository'

type ProductsProviderProps = {
  children: ReactNode
}

type ProductsContext = {
  products: IProductModel[]
  getProductDetails: (id: number, type: ProductType) => Product
}

const ProductsContext = createContext({} as ProductsContext)

export function useProducts() {
  return useContext(ProductsContext)
}

export function ProductProvider({ children }: ProductsProviderProps) {
  const [products, setProducts] = useState<IProductModel[]>([])
  const [lawnMowers, setLawnMowers] = useState<ILawnMower[]>([])
  const [phoneCases, setPhoneCases] = useState<IPhoneCase[]>([])
  const [tShirts, setTShirts] = useState<IShirt[]>([])

  useEffect(() => {
    setLawnMowers(new LawnmowerRepository().getAll())
    setPhoneCases(new PhoneCaseRepository().getAll())
    setTShirts(new TShirtRepository().getAll())
  }, [])

  useEffect(() => {
    const allProducts = [
      ...lawnMowers,
      ...phoneCases,
      ...tShirts,
    ].map(o => new ProductModel(o))

    setProducts(allProducts)
  }, [lawnMowers, phoneCases, tShirts])

  const getProductDetails = (id: number, type: ProductType): Product => {
    switch (type) {
      case ProductType.LawnMower:
        return lawnMowers.find(o => o.id === id) as ILawnMower
      case ProductType.PhoneCase:
        return phoneCases.find(o => o.id === id) as IPhoneCase
      case ProductType.Shirt:
        return tShirts.find(o => o.id === id) as IShirt
      default:
        throw new Error('Invalid Product Type!')
    }
  }

  const value: ProductsContext = {
    products,
    getProductDetails,
  }

  return (
    <ProductsContext.Provider value={value}>
      { children }
    </ProductsContext.Provider>
  )
}
