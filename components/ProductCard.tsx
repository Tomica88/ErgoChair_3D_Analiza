import Image from 'next/image';
import React from 'react'
import AnimatedContainer from './AnimatedContainer';

interface ProductCardProps{
    index: number;
    imgSrc: string;
    title: string;
    price: number;
    isActive: boolean;
    onClick: () => void;
    onNakupClick: () => void;
}

const ProductCard = ({index, imgSrc, title, price, isActive, onClick, onNakupClick}:ProductCardProps) => {
  return (
    <div onClick={onClick} className={`transition-transform duration-300 ease-in-out hover:scale-105 ${isActive ? 'scale-105' :''}`}>
        <AnimatedContainer delay={index * 0.2} styles={`w-80 h-32 flex flex-row gap-4 rounded-xl transition-all duration-300 cursor-pointer ${isActive ? 'bg-gradient' : 'bg-stone-800'}`}>
            <Image src={imgSrc} alt='product' width={128} height={128} unoptimized={true} className='rounded-xl' />
            <div className='flex flex-col justify-between px-4 py-6 text-slate-200'>
                <h3 className='text-lg font-semibold'>{title}</h3>
                <div className='flex flex-row items-center'>
                    <p className={`pr-4 ${isActive ? 'text-black' : 'text-slate-400'}`}>€{price}</p>
                    <div onClick={(e) => {
                e.preventDefault(); // Prevents default behavior but allows event bubbling
                onNakupClick(); // Execute the specific Nakup button functionality
                onClick(); // Call the parent onClick to activate the gradient and scaling
              }} className='w-16 flex justify-center py-1 text-sm border-[1px] rounded-xl hover:bg-stone-200 transition duration-300 hover:text-stone-800'>Nakup</div>
                </div>
            </div>
        </AnimatedContainer>
    </div>
  )
}

export default ProductCard