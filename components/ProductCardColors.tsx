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
