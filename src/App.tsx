import React from 'react'
import { Route, Routes } from 'react-router-dom'
import { ProductProvider } from './contexts/ProductsContext'
import { Home } from './pages/Home'

function App() {
  return (
    <ProductProvider>
      <Routes>
        <Route path='/' Component={Home} />
      </Routes>
    </ProductProvider>
  )
}

export default App
