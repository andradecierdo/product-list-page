import { IProduct } from './product'

export type ILawnMower = IProduct & {
  fuelEfficiency: string
  isVehicle: boolean
}
