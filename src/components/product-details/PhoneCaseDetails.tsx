import React from 'react'
import { Table } from 'react-bootstrap'
import { IPhoneCase } from '../../models'
import { Currency } from '../../services'

export type IPhoneCaseDetails = {
  phoneCase: IPhoneCase,
  price: string
  currency: Currency
}

export function PhoneCaseDetails({ phoneCase, price, currency }: IPhoneCaseDetails) {
  return (
    <Table responsive={true} borderless>
      <tbody>
        <tr>
          <td className="bg-body-secondary">Name</td>
          <td>{ phoneCase.name }</td>
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
          <td>{ phoneCase.colour }</td>
        </tr>
        <tr>
          <td className="bg-body-secondary">Material</td>
          <td>{ phoneCase.material }</td>
        </tr>
        <tr>
          <td className="bg-body-secondary">Target Phone</td>
          <td>{ phoneCase.targetPhone }</td>
        </tr>
      </tbody>
    </Table>
  )
}
