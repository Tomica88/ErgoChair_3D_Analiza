'use client'

import { useState } from 'react'
import Catalog, { ProductType } from './Catalog'
import Preview from './Preview'
import * as THREE from 'three'

const Products = () => {
  const [selectedProduct, setSelectedProduct] = useState({
    id: "1",
    imgSrc: "/assets/chair1.png",
    title: "Standardna izdaja",
    price: 179.99,
    modelSrc: "/assets/chair1.gltf", 
  })

  const [wheelColor, setWheelColor] = useState(new THREE.Color(0x212121));
  const [seatColor, setSeatColor] = useState(new THREE.Color(0x212121));
  const [frameColor, setFrameColor] = useState(new THREE.Color(0x212121));

  const changeWheelColor = (color: string) => {
    setWheelColor(new THREE.Color(color));
  };

  const changeSeatColor = (color: string) => {
    setSeatColor(new THREE.Color(color));
  };

  const changeFrameColor = (color: string) => {
    setFrameColor(new THREE.Color(color));
  };

  const handleProductClick = (product: ProductType) => {
    setSelectedProduct(product)
  }
  
  return (
    <div className='flex flex-col mx-auto pt-8'>
        <Catalog 
        selectedProduct={selectedProduct} 
        onProductClick={handleProductClick}
        changeWheelColor={changeWheelColor}
        changeSeatColor={changeSeatColor} 
        changeFrameColor={changeFrameColor}
      />
      <Preview 
        selectedProduct={selectedProduct}
        wheelColor={wheelColor}
        seatColor={seatColor}
        frameColor={frameColor} 
      />
    </div>
  )
}

export default Products