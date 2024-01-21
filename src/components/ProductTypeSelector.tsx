import React, { ChangeEvent } from 'react'
import { Form } from 'react-bootstrap'
import { ProductModel, ProductType } from '../models'

export interface IProductTypeSelector {
  onSelect: (currency: string) => void
  productType: ProductType | undefined
}

export function ProductTypeSelector({ onSelect, productType }: IProductTypeSelector) {
  const handleProductTypeChange = (e: ChangeEvent<HTMLSelectElement>): void => {
    e.preventDefault()
    onSelect(e.target.value)
  }

  return (
    <div>
      <Form.Label htmlFor="productTypeSelectInput">Product Type</Form.Label>
      <Form.Select
        id="productTypeSelectInput"
        aria-label="Select Product Type"
        value={productType}
        onChange={handleProductTypeChange}>
        <option value="">None Selected</option>
        <option value={ProductType.LawnMower}>{ ProductModel.getTypeLabel(ProductType.LawnMower) }</option>
        <option value={ProductType.PhoneCase}>{ ProductModel.getTypeLabel(ProductType.PhoneCase) }</option>
        <option value={ProductType.Shirt}>{ ProductModel.getTypeLabel(ProductType.Shirt) }</option>
      </Form.Select>
    </div>
  )
}
