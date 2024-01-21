import React, { useEffect, useMemo, useState } from 'react'
import { Col, Container, Form, Row } from 'react-bootstrap'
import { IProductModel, Product, ProductType } from '../models'
import { Currency, NzdConverterService } from '../services'
import { useProducts } from '../contexts/ProductsContext'
import { ProductDetailsModal, ProductTable } from '../components'
import { CurrencySelector } from '../components/CurrencySelector'
import { ProductTypeSelector } from '../components/ProductTypeSelector'

export function Home() {
  const [currency, setCurrency] = useState<Currency>(Currency.NZD)
  const [searchKey, setSearchKey] = useState('')
  const [productType, setProductType] = useState<ProductType>()
  const [filteredProducts, setFilteredProducts] = useState([] as IProductModel[])
  const [productDetails, setProductDetails] = useState<Product>()
  const [showProductDetails, setShowProductDetails] = useState(false)

  const { products, getProductDetails } = useProducts()

  useEffect(() => {
    setFilteredProducts(products.filter(product => {
      return product.name.toLowerCase().includes(searchKey.toLowerCase())
        && (!productType || product.type === productType)
    }))
  }, [searchKey, products, productType])

  const nzdConverter = new NzdConverterService()
  const convertPrice = (price: number): number => {
    return nzdConverter.convert(price, currency)
  }
  const convertedProducts = useMemo(() => {
    return filteredProducts.map(o => {
      return {
        ...o,
        price: convertPrice(o.price)
      }
    })
  }, [filteredProducts, currency]);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    e.preventDefault()
    setSearchKey(e.target.value)
  }

  const handleOpenProductDetails = (productId: number, type: ProductType) => {
    setShowProductDetails(true)
    setProductDetails(getProductDetails(productId, type))
  }

  const handleCloseProductDetails = (): void => {
    setShowProductDetails(false)
    setProductDetails(undefined)
  }

  const handleSelectCurrency = (currency: string): void => {
    setCurrency(currency as Currency)
  }

  const handleSelectProductType = (productType: string): void => {
    setProductType(productType as ProductType)
  }

  return (
    <Container>
      <h1 className="py-3 text-lg-center">Products</h1>
      <Row className="mb-2 justify-content-start">
        <Col lg={3}>
          <Form.Label htmlFor="searchInput">Search</Form.Label>
          <Form.Control
            id="searchInput"
            type="text"
            placeholder="Enter Name"
            value={searchKey}
            onChange={handleSearchChange}
          />
        </Col>
        <Col lg={2}>
          <ProductTypeSelector
            onSelect={handleSelectProductType}
            productType={productType}
          />
        </Col>
        <Col lg={2}>
          <CurrencySelector
            onSelect={handleSelectCurrency}
            currency={currency}
          />
        </Col>
      </Row>

      <ProductTable
        currency={currency}
        products={convertedProducts}
        onSelectProduct={handleOpenProductDetails}
      />
      { !convertedProducts.length &&
        <div className="text-center">No Products Found!</div>
      }

      { productDetails &&
        <ProductDetailsModal
          price={convertPrice(productDetails.price).toFixed(2)}
          currency={currency}
          show={showProductDetails}
          product={productDetails}
          onClose={handleCloseProductDetails}
        />
      }
    </Container>
  )
}
