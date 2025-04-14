import React, { useState } from 'react'
import ProductCard from '../ProductCard';
import AnimatedContainer from '../AnimatedContainer';
import ProductCardColors from '../ProductCardColors';
import Window from '../Window';

const products = [
  {
    id: "1",
    imgSrc: "/assets/chair1.png",
    title: "Standardna izdaja",
    price: 179.99,
    modelSrc: "/assets/chair1.gltf",
  },
  {
    id: "2",
    imgSrc: "/assets/chair2.png",
    title: "Temna izdaja",
    price: 199.99,
    modelSrc: "/assets/chair2.gltf",
  },
  {
    id: "3",
    imgSrc: "/assets/chair3.png",
    title: "Omejena izdaja",
    price: 219.99,
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

const Catalog = ({
  selectedProduct,
  onProductClick,
  changeWheelColor,
  changeSeatColor,
  changeFrameColor
}: CatalogProps) => {
  const [selectedWheelColor, setSelectedWheelColor] = useState<string>('');
  const [selectedSeatColor, setSelectedSeatColor] = useState<string>('');
  const [selectedFrameColor, setSelectedFrameColor] = useState<string>('');

  const [isWindowOpen, setIsWindowOpen] = useState(false);
  const toggleWindow = () => {
    setIsWindowOpen(prev => !prev);
  };

  const colorButtonClass = (selected: string, color: string) => {

    const isLight = color === '#e7e5e4';
    const isSelected = selected === color;

    return `w-9 h-9 rounded-full
      ${isLight ? 'hover:border-[7px] hover:border-black' : 'hover:border-[7px] hover:border-stone-200'} 
      ${isSelected ? (isLight ? 'border-4 border-black' : 'border-4 border-stone-200') : ''}`;
  };

  return (
    <div id="catalog" className='max-w-5xl mx-auto'>
      <h2 className='text-2xl font-semibold pl-4 md:pl-16 pb-10'>
        <span className='animate-pulse'>/ </span>
        konfigurator
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
            onNakupClick={toggleWindow}
          />
        ))}
      </div>

      <AnimatedContainer delay={0.5} styles="z-1">
        <div className='bg-stone-800 rounded-xl p-2 mt-6 lg:flex justify-between flex-1 gap-4 text-center w-full'>

        <div className="w-full">
            <p className="text-white font-bold text-sm mb-2 mt-2">O G R O D J E</p>
            <div className="flex gap-3 justify-center mb-1">
              {['#e7e5e4', '#1c1917', '#b91c1c', '#a16207', '#1e3a8a'].map((color) => (
                <button
                  key={color}
                  onClick={() => {
                    setSelectedFrameColor(color);
                    changeFrameColor(color);
                  }}
                  className={`${colorButtonClass(selectedFrameColor, color)} bg-[${color}]`}
                  style={{ backgroundColor: color }}
                />
              ))}
            </div>
          </div>

          <div className="w-full">
            <p className="text-white font-bold text-sm mb-2 mt-2">N O G E</p>
            <div className="flex gap-3 justify-center mb-1">
              {['#e7e5e4', '#1c1917', '#b91c1c', '#a16207', '#1e3a8a'].map((color) => (
                <button
                  key={color}
                  onClick={() => {
                    setSelectedSeatColor(color);
                    changeSeatColor(color);
                  }}
                  className={`${colorButtonClass(selectedSeatColor, color)} bg-[${color}]`}
                  style={{ backgroundColor: color }}
                />
              ))}
            </div>
          </div>

          <div className="w-full">
            <p className="text-white font-bold text-sm mb-2 mt-2">N A S L O N I</p>
            <div className="flex gap-3 justify-center mb-3 lg:mb-1">
              {['#e7e5e4', '#1c1917', '#b91c1c', '#a16207', '#1e3a8a'].map((color) => (
                <button
                  key={color}
                  onClick={() => {
                    setSelectedWheelColor(color);
                    changeWheelColor(color);
                  }}
                  className={`${colorButtonClass(selectedWheelColor, color)} bg-[${color}]`}
                  style={{ backgroundColor: color }}
                />
              ))}
            </div>
          </div>
        </div>
      </AnimatedContainer>

      {isWindowOpen && <Window toggleWindow={toggleWindow} />}

    </div>
  );
};

export default Catalog;
