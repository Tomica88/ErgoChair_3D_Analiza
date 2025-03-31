import Image from 'next/image';
import React from 'react'
import AnimatedContainer from './AnimatedContainer';

interface ProductColors{
  changeWheelColor: (color: string) => void;
  changeSeatColor: (color: string) => void;
  changeFrameColor: (color: string) => void;
}

const ProductCardColors: React.FC<ProductColors> = ({ changeWheelColor, changeSeatColor, changeFrameColor }) => {
  return (
    
    <div className="">
        
    </div>
  )
}

export default ProductCardColors



/*

import React from 'react'
import ProductCard from '../ProductCard';
import AnimatedContainer from '../AnimatedContainer';
import ProductCardColors from '../ProductCardColors';

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

interface CatalogProps {
  selectedProduct: ProductType;
  onProductClick: (product: ProductType) => void;
  changeWheelColor: (color: string) => void;
  changeSeatColor: (color: string) => void;
  changeFrameColor: (color: string) => void;
}

interface CatalogProps{
  selectedProduct: ProductType;
  onProductClick: (product: ProductType) => void;
}

const Catalog = ({
  selectedProduct,
  onProductClick,
  changeWheelColor,
  changeSeatColor,
  changeFrameColor
}: CatalogProps) => {
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
          onClick={() => onProductClick(product)}
          />
        ))}
      </div>
      
      <AnimatedContainer delay={0.5} styles="z-1 hover:scale-105">
      <div className='bg-stone-800 rounded-xl p-2 mt-6 lg:flex justify-between flex-1 gap-4 text-center w-full'>

        <div className="w-full">
          <p className="text-white font-bold text-sm mb-2">W H E E L S</p>
          <div className="flex gap-3 justify-center mb-1">
            <button onClick={() => changeWheelColor('#e7e5e4')} className="w-9 h-9 bg-stone-200 rounded-full hover:border-[5px] hover:border-stone-800 transition duration-300" />
            <button onClick={() => changeWheelColor('#1c1917')} className="w-9 h-9 bg-stone-900 rounded-full hover:border-[5px] hover:border-stone-800 transition duration-300" />
            <button onClick={() => changeWheelColor('#b91c1c')} className="w-9 h-9 bg-red-700 rounded-full hover:border-[5px] hover:border-stone-800 transition duration-300" />
            <button onClick={() => changeWheelColor('#a16207')} className="w-9 h-9 bg-yellow-700 rounded-full hover:border-[5px] hover:border-stone-800 transition duration-300" />
            <button onClick={() => changeWheelColor('#1e3a8a')} className="w-9 h-9 bg-blue-900 rounded-full hover:border-[5px] hover:border-stone-800 transition duration-300" />
          </div>
        </div>
        
        <div className="w-full">
          <p className="text-white font-bold text-sm mb-2">S E A T</p>
          <div className="flex gap-3 justify-center mb-1 ">
            <button onClick={() => changeSeatColor('#e7e5e4')} className="w-9 h-9 bg-stone-200 rounded-full hover:border-[5px] hover:border-stone-800 transition duration-300" />
            <button onClick={() => changeSeatColor('#1c1917')} className="w-9 h-9 bg-stone-900 rounded-full hover:border-[5px] hover:border-stone-800 transition duration-300" />
            <button onClick={() => changeSeatColor('#b91c1c')} className="w-9 h-9 bg-red-700 rounded-full hover:border-[5px] hover:border-stone-800 transition duration-300" />
            <button onClick={() => changeSeatColor('#a16207')} className="w-9 h-9 bg-yellow-700 rounded-full hover:border-[5px] hover:border-stone-800 transition duration-300" />
            <button onClick={() => changeSeatColor('#1e3a8a')} className="w-9 h-9 bg-blue-900 rounded-full hover:border-[5px] hover:border-stone-800 transition duration-300" />
          </div>
        </div>
        
        <div className="w-full">
          <p className="text-white font-bold text-sm mb-2">F R A M E</p>
          <div className="flex gap-3 justify-center mb-3 lg:mb-1 ">
            <button onClick={() => changeFrameColor('#e7e5e4')} className="w-9 h-9 bg-stone-200 rounded-full hover:border-[5px] hover:border-stone-800 transition duration-300" />
            <button onClick={() => changeFrameColor('#1c1917')} className="w-9 h-9 bg-stone-900 rounded-full hover:border-[5px] hover:border-stone-800 transition duration-300" />
            <button onClick={() => changeFrameColor('#b91c1c')} className="w-9 h-9 bg-red-700 rounded-full hover:border-[5px] hover:border-stone-800 transition duration-300" />
            <button onClick={() => changeFrameColor('#a16207')} className="w-9 h-9 bg-yellow-700 rounded-full hover:border-[5px] hover:border-stone-800 transition duration-300" />
            <button onClick={() => changeFrameColor('#1e3a8a')} className="w-9 h-9 bg-blue-900 rounded-full hover:border-[5px] hover:border-stone-800 transition duration-300" />
          </div>
        </div>
      </div>
      </AnimatedContainer>

      </div>

  )
}

export default Catalog

*/