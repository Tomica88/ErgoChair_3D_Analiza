import React from 'react'
import ProductCard from '../ProductCard';

const products = [
  {
    id: "1",
    imgSrc: "/assets/chair1.png",
    title: "Standard Edition",
    price: 79.99,
    modelSrc: "/assets/chair1.gltf", 
  },
  {
    id: "2",
    imgSrc: "/assets/chair2.png",
    title: "Red Edition",
    price: 89.99,
    modelSrc: "/assets/chair2.gltf",
  },
  {
    id: "3",
    imgSrc: "/assets/chair3.png",
    title: "Blue Edition",
    price: 89.99,
    modelSrc: "/assets/chair3.gltf",
  }
  
];

export type ProductType = {
  id: string;
  imgSrc: string;
  title: string;
  price: number;
  modelSrc: string;
}

interface CatalogProps{
  selectedProduct: ProductType;
  onproductClick: (product: ProductType) => void;
}

const Catalog = ({selectedProduct,onproductClick}:CatalogProps) => {
  return (
    <div id="catalog" className='max-w-5xl mx-auto'>
      <h2 className='text-2xl font-semibold pl-4 md:pl-16 pb-10'>
        <span className='animate-pulse'>/ </span>
        catalog
      </h2>
      <div className='w-full flex flex-col items-center lg:flex-row gap-6 mx-auto'>
        {products.map((product, index) => (
          <ProductCard
          key={index}
          index={index}
          title={product.title}
          imgSrc={product.imgSrc}
          price={product.price}
          isActive={selectedProduct.id === product.id}
          onClick={() => onproductClick(product)}
          />
        ))}
      </div>
    </div>
  )
}

export default Catalog