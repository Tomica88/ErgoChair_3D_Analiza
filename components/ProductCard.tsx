import Image from 'next/image';
import React, { useState, useRef, useEffect } from 'react';
import AnimatedContainer from './AnimatedContainer';

interface ProductCardProps {
  index: number;
  imgSrc: string;
  title: string;
  price: number;
  isActive: boolean;
  onClick: () => void;
  onNakupClick: () => void;
}

interface DropdownRadioProps {
  label: string;
  options: string[];
  optionColors?: string[]; // Array of background color classes (e.g., ["bg-red-500", "bg-green-500", ...])
  name: string;
  dropAlign?: 'left' | 'center' | 'right';
  width?: string;
  onDropdownClick: () => void;
}

const DropdownRadio: React.FC<DropdownRadioProps> = ({
  label,
  options,
  optionColors,
  name,
  dropAlign = 'right',
  width = 'w-36',
  onDropdownClick,
}) => {
  const [open, setOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const ref = useRef<HTMLDivElement>(null);

  const toggleDropdown = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    // Inform parent container the dropdown has been clicked
    onDropdownClick();

    if (!open) {
      setTimeout(() => {
        setOpen(true);
      }, 150);
    } else {
      setOpen(false);
    }
  };

  useEffect(() => {
    const handleOutsideClick = (event: MouseEvent) => {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener('click', handleOutsideClick, true);
    return () => {
      document.removeEventListener('click', handleOutsideClick, true);
    };
  }, []);

  let alignmentClass = '';
  if (dropAlign === 'left') {
    alignmentClass = 'right-0';
  } else if (dropAlign === 'center') {
    alignmentClass = 'left-1/2 transform -translate-x-1/2';
  } else {
    alignmentClass = 'left-0';
  }

  const handleOptionSelect = (option: string) => {
    setSelectedOption(option);
    onDropdownClick();
    setTimeout(() => {
      setOpen(false);
    }, 150);
  };

  // Calculate the index of the selected option and pick the corresponding background color,
  // defaulting to bg-stone-950 if nothing is selected or no color provided.
  const selectedIndex = selectedOption ? options.indexOf(selectedOption) : -1;
  const selectedColor =
    selectedIndex !== -1 && optionColors && optionColors[selectedIndex]
      ? optionColors[selectedIndex]
      : 'bg-stone-950';

  // When bg-[#e7e5e4] is selected, set the text color for the button to black; otherwise, use white.
  const buttonTextColor = selectedColor === 'bg-[#e7e5e4]' ? 'text-black' : 'text-white';

  return (
    <div ref={ref} className="relative z-50">
      <button
        onClick={toggleDropdown}
        type="button"
        className={`${buttonTextColor} ${selectedColor} hover:opacity-90 focus:ring-4 focus:outline-none rounded-full focus:ring-stone-950 text-sm px-4 py-2 text-center inline-flex items-center`}
      >
        {/* Always display the label regardless of selection */}
        {label}
        <svg
          className="w-2.5 h-2.5 ml-2"
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 10 6"
        >
          <path
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="m1 1 4 4 4-4"
          />
        </svg>
      </button>
      <div
        className={`absolute mt-2 ${width} ${alignmentClass} rounded-lg bg-stone-950 shadow-lg z-[100] transition-all duration-300 ease-in-out transform origin-top ${
          open ? 'opacity-100 scale-100' : 'opacity-0 scale-95 invisible'
        }`}
      >
        <ul className="p-2 space-y-1 text-sm">
          {options.map((option, index) => {
            // Get the custom background color for the option, if provided.
            const optionColorClass = optionColors && optionColors[index] ? optionColors[index] : '';
            return (
              <li key={index}>
                <div className={`flex items-center height-20 ${optionColorClass} hover:bg-gray-100`}>
                  {/* Radio button with removed dot */}
                  <input
                    type="radio"
                    id={`${name}-${index}`}
                    name={name}
                    value={option}
                    checked={selectedOption === option}
                    onChange={() => handleOptionSelect(option)}
                    className="w-4 h-8 border-gray-300 focus:ring-blue-500 appearance-none"
                  />
                  {/* Option text hidden using opacity-0 to keep clickability */}
                  <label
                    htmlFor={`${name}-${index}`}
                    className="ml-2 block opacity-0 w-full cursor-pointer"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleOptionSelect(option);
                    }}
                  >
                    {option}
                  </label>
                </div>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
};

const ProductCard = ({
  index,
  imgSrc,
  title,
  price,
  isActive,
  onClick,
  onNakupClick,
}: ProductCardProps) => {
  return (
    <div
      onClick={onClick}
      className={`transition-transform duration-300 ease-in-out hover:scale-105 z-10 hover:z-20 ${
        isActive ? 'scale-105 z-20' : ''
      }`}
    >
      <AnimatedContainer
        delay={index * 0.2}
        styles={`w-80 h-50 flex flex-col gap-4 rounded-xl transition-all duration-300 cursor-pointer relative ${
          isActive ? 'bg-gradient' : 'bg-stone-800'
        }`}
      >
        <div className="flex flex-row gap-2">
          <Image
            src={imgSrc}
            alt="product"
            width={128}
            height={128}
            unoptimized={true}
            className="rounded-xl"
          />
          <div className="flex flex-col justify-between px-2 py-4 text-slate-200">
            <h3 className="text-lg font-semibold">{title}</h3>
            <div className="flex flex-row items-center">
              <p className={`pr-4 text-xl ${isActive ? 'text-black' : 'text-slate-400'}`}>€{price}</p>
              <div
                onClick={(e) => {
                  e.stopPropagation();
                  onNakupClick();
                }}
                className="w-16 flex justify-center py-2 px-2 text-l border-[1px] rounded-xl hover:bg-stone-200 transition duration-300 hover:text-stone-800"
              >
                Nakup
              </div>
            </div>
          </div>
        </div>
        {/* Dropdown button row */}
        <div className="flex justify-between px-3">
          <DropdownRadio
            label="Nasloni"
            options={['Radio 1', 'Radio 2', 'Radio 3', 'Radio 4', 'Radio 5']}
            optionColors={[
              'bg-[#e7e5e4]',
              'bg-stone-950',
              'bg-[#b91c1c]',
              'bg-[#a16207]',
              'bg-[#1e3a8a]',
            ]}
            name={`dropdown1-${index}`}
            onDropdownClick={onClick}
          />
          <DropdownRadio
            label="Ogrodje"
            options={['Radio 1', 'Radio 2', 'Radio 3', 'Radio 4', 'Radio 5']}
            optionColors={[
              'bg-[#e7e5e4]',
              'bg-stone-950',
              'bg-[#b91c1c]',
              'bg-[#a16207]',
              'bg-[#1e3a8a]',
            ]}
            name={`dropdown2-${index}`}
            dropAlign="center"
            onDropdownClick={onClick}
          />
          <DropdownRadio
            label="Kolesa"
            options={['Radio 1', 'Radio 2', 'Radio 3', 'Radio 4', 'Radio 5']}
            optionColors={[
              'bg-[#e7e5e4]',
              'bg-stone-950',
              'bg-[#b91c1c]',
              'bg-[#a16207]',
              'bg-[#1e3a8a]',
            ]}
            name={`dropdown3-${index}`}
            dropAlign="left"
            onDropdownClick={onClick}
          />
        </div>
      </AnimatedContainer>
    </div>
  );
};

export default ProductCard;
