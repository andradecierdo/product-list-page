import React from 'react'
import { Table } from 'react-bootstrap'
import { ILawnMower } from '../../models'
import { Currency } from '../../services'

export type ILawnMowerDetails = {
  lawnMower: ILawnMower,
  price: string
  currency: Currency
}

export function LawnMowerDetails({ lawnMower, price, currency }: ILawnMowerDetails) {
  return (
    <Table responsive={true} borderless>
      <tbody>
        <tr>
          <td className="bg-body-secondary">Name</td>
          <td>{ lawnMower.name }</td>
        </tr>
        <tr>
          <td className="bg-body-secondary">Price</td>
          <td>
            { price }
            <span className="mx-1 fst-italic fw-light">({ currency })</span>
          </td>
        </tr>
        <tr>
          <td className="bg-body-secondary">Fuel Efficiency</td>
          <td>{ lawnMower.fuelEfficiency }</td>
        </tr>
        <tr>
          <td className="bg-body-secondary">Vehicle</td>
          <td>{ lawnMower.isVehicle ? 'True' : 'False' }</td>
        </tr>
      </tbody>
    </Table>
  )
}
