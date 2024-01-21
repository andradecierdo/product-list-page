import React, { useEffect, useState } from 'react'
import { Table, Button } from 'react-bootstrap'
import { Eye, SortDown, SortUp } from 'react-bootstrap-icons'
import { IProductModel, ProductModel, ProductType } from '../models'
import { Currency } from '../services'
import { sortByProperty } from '../utilities/sort'

interface ISortableTableColumn {
  label: string
  property: string
  sortable: boolean
}

const tableColumns: ISortableTableColumn[] = [
  {
    label: 'Name',
    property: 'name',
    sortable: true,
  },
  {
    label: 'Price',
    property: 'price',
    sortable: true,
  },
  {
    label: 'Type',
    property: 'type',
    sortable: true,
  },
  {
    label: '',
    property: '',
    sortable: false,
  }
]

export interface IProductTable {
  currency: Currency
  products: IProductModel[]
  onSelectProduct: (productId: number, type: ProductType) => void
}

export function ProductTable({ products, onSelectProduct, currency }: IProductTable) {
  const [sortedProducts, setSortedProducts] = useState<IProductModel[]>([])
  const [sortProperty, setSortProperty] = useState('name')
  const [sortOrder, setSortOrder] = useState(0) // Desc = 0, Asc = 1

  useEffect(() => {
    setSortedProducts(sortByProperty(
      [...products],
      sortProperty,
      sortOrder === 0
    ))
  }, [sortProperty, products, sortOrder])

  const handleTableSort = (column: ISortableTableColumn): void => {
    if (column.sortable) {
      setSortOrder((prevSortOrder: number) => {
        if (sortProperty === column.property) {
          return prevSortOrder === 1 ? 0 : 1
        }
        return 0
      })
      setSortProperty(column.property)
    }
  }

  const sortIcon = (property: string) => {
    return property === sortProperty ? sortOrder === 0 ? <SortDown /> : <SortUp /> : ''
  }

  return (
    <Table bordered hover striped responsive={true}>
      <thead>
      <tr>
        { tableColumns.map((column, index) => {
          return (
            <th key={index} onClick={() => handleTableSort(column)}>
              { column.label }
              { column.property === 'price' && <span className="mx-1 fst-italic fw-light">({ currency })</span> }
              <span className="float-end">
                { sortIcon(column.property) }
              </span>
            </th>
          )
        })}
      </tr>
      </thead>
      <tbody>
        { sortedProducts.map((product, index) => {
          return (
            <tr key={index}>
              <td>{ product.name }</td>
              <td className="text-end">{ product.price.toFixed(2) }</td>
              <td>{ ProductModel.getTypeLabel(product.type) }</td>
              <td className="text-center">
                <Button
                  title="View Details"
                  size="sm"
                  variant="secondary"
                  onClick={() => onSelectProduct(product.id, product.type)}>
                  <Eye />
                </Button>
              </td>
            </tr>
          )
        })}
      </tbody>
    </Table>
  )
}
