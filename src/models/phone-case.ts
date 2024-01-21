import { IProduct } from './product'

export type IPhoneCase = IProduct & {
  colour: string
  material: string
  targetPhone: string
}
