import { IProduct } from './product'

export type IShirt = IProduct & {
  colour: string
  shirtText: string
}
