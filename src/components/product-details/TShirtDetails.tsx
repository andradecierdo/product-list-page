import React from 'react'
import { Table } from 'react-bootstrap'
import { IShirt } from '../../models'
import { Currency } from '../../services'

export type ITShirtDetails = {
  tShirt: IShirt
  price: string
  currency: Currency
}

export function TShirtDetails({ tShirt, price, currency }: ITShirtDetails) {
  return (
    <Table responsive={true} borderless>
      <tbody>
        <tr>
          <td className="bg-body-secondary">Name</td>
          <td>{ tShirt.name }</td>
        </tr>
        <tr>
          <td className="bg-body-secondary">Price</td>
          <td>
            { price }
            <span className="mx-1 fst-italic fw-light">({ currency })</span>
          </td>
        </tr>
        <tr>
          <td className="bg-body-secondary">Colour</td>
          <td>{ tShirt.colour }</td>
        </tr>
        <tr>
          <td className="bg-body-secondary">Shirt Text</td>
          <td>{ tShirt.shirtText }</td>
        </tr>
      </tbody>
    </Table>
  )
}
