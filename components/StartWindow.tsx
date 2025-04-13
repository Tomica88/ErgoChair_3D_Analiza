import React, { useEffect, useState } from 'react';
import { IoClose } from 'react-icons/io5';
import AnimatedContainer from './AnimatedContainer';

// The component no longer needs to receive a toggle function
const StartWindow = () => {
    // State to control visibility
    const [isVisible, setIsVisible] = useState(true);

    // Function to close the window
    const closeWindow = () => {
        setIsVisible(false);
    };

    useEffect(() => {
        // Only apply when the window is visible
        if (isVisible) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }
        
        return () => {
            document.body.style.overflow = 'unset';
        };
    }, [isVisible]);

    // Don't render anything if not visible
    if (!isVisible) return null;

    return (

            <div className="fixed bg-stone-800/50 inset-0 w-screen h-screen flex items-center justify-center z-20">
                <AnimatedContainer delay={0.5} styles="z-1">
                    <div className="relative bg-black px-7 py-3.5 rounded-xl max-w-[600px] min-w-[300px] text-white m-5">
                        <h2 className=''>Vaša naloga je, da si ogledate celotno spletno stran, izberete vrsto stola in prilagodite barve vseh delov stola po vaši želji. Nato opravite nakup.</h2>
                        <div 
                            onClick={closeWindow} 
                            className='w-16 flex justify-center mt-3 py-1 text-sm border-[1px] rounded-xl hover:bg-stone-200 transition duration-300 hover:text-stone-800 cursor-pointer'
                        >
                            Potrdi
                        </div>

                        <IoClose 
                            className='w-10 h-10 cursor-pointer absolute top-[5px] right-[5px] px-[7px] py-[5px]'
                            onClick={closeWindow}
                        />
                    </div>
                </AnimatedContainer>
            </div>
    );
};

export default StartWindow;