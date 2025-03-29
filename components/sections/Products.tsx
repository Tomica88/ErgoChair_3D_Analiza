'use client'

import {useState} from 'react'
import Catalog, { ProductType } from './Catalog'
import Preview from './Preview'

const Products = () => {
  const [selectedProduct, setSelectedProduct] = useState({
    id: "1",
    imgSrc: "/assets/keyboard1.png",
    title: "Standard Chair",
    price: 79.99,
    modelSrc: "/assets/chair1.gltf", 
  })

  const handleProductClick = (product: ProductType) => {
    setSelectedProduct(product)
  }
  return (
    <div className='flex flex-col mx-auto pt-8'>
        <Catalog selectedProduct={selectedProduct} onproductClick={handleProductClick}/>
        <Preview selectedProduct={selectedProduct} />
    </div>
  )
}

export default Products