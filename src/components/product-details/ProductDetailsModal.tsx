import React from 'react'
import { Container, Modal } from 'react-bootstrap'
import { Product, ProductModel } from '../../models'
import { TShirtDetails, LawnMowerDetails, PhoneCaseDetails } from './index'
import { Currency } from '../../services'

interface IProductDetailsModal {
  show: boolean
  product: Product
  price: string
  currency: Currency
  onClose: () => void
}

export function ProductDetailsModal({ show, onClose, product, price, currency }: IProductDetailsModal) {
  const getProductDetailTableComponent = (product: Product): React.ReactNode => {
    if (ProductModel.isLawnMower(product)) {
      return (
        <LawnMowerDetails
          lawnMower={product}
          price={price}
          currency={currency}
        />
      )
    }
    if (ProductModel.isPhoneCase(product)) {
      return (
        <PhoneCaseDetails
          phoneCase={product}
          price={price}
          currency={currency}
        />
      )
    }
    if (ProductModel.isTShirt(product)) {
      return (
        <TShirtDetails
          tShirt={product}
          price={price}
          currency={currency}
        />
      )
    }
    return null
  }

  const productType = ProductModel.getTypeLabel(ProductModel.getProductType(product))

  return (
    <Container>
      <Modal show={show} animation={false} onHide={onClose}>
        <Modal.Header closeButton>
          <Modal.Title>{ productType }</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          { getProductDetailTableComponent(product) }
        </Modal.Body>
      </Modal>
    </Container>
  )
}
