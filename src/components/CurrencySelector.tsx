import React, { ChangeEvent } from 'react'
import { Form } from 'react-bootstrap'
import { Currency } from '../services'

export interface ICurrencySelector {
  onSelect: (currency: string) => void
  currency: Currency
}

export function CurrencySelector({ onSelect, currency }: ICurrencySelector) {
  const handleCurrencyChange = (e: ChangeEvent<HTMLSelectElement>): void => {
    e.preventDefault()
    onSelect(e.target.value)
  }

  return (
    <div>
      <Form.Label htmlFor="currencySelectInput">Currency</Form.Label>
      <Form.Select
        id="currencySelectInput"
        aria-label="Select Currency"
        value={currency}
        onChange={handleCurrencyChange}>
        <option value={Currency.NZD}>{ Currency.NZD }</option>
        <option value={Currency.USD}>{ Currency.USD }</option>
        <option value={Currency.EURO}>{ Currency.EURO }</option>
      </Form.Select>
    </div>
  )
}
