import React, { useEffect, useState } from 'react';
import { IoClose } from 'react-icons/io5';

interface WindowProps {
  toggleWindow: () => void;
}

const Window = ({ toggleWindow }: WindowProps) => {
    const [orderConfirmed, setOrderConfirmed] = useState(false);

    useEffect(() => {
        document.body.style.overflow = 'hidden';
        return () => {
          document.body.style.overflow = 'unset';
        };
      }, []);

const handleNakupClick = () => {
    setOrderConfirmed(true);
};

  return (
    <div className="fixed bg-stone-800/50 inset-0 w-screen h-screen flex items-center justify-center z-20">
        <div className="relative bg-black px-7 py-3.5 rounded-xl max-w-[600px] min-w-[300px]">
            {orderConfirmed ? (

                <>
                    <h2 className="w-3/4">Hvala za sodelovanje! &#128516;</h2>
                    <h2>Lahko zaprete to stran in nadaljujete z anketo.</h2>
                </>

            ) : (
                <>
                    <h2 className='w-4/5'>Kmalu boste zaključili "nakup".</h2>
                    <h2>Za potrditev pritisnite spodnji gumb. &#128071;</h2>
                    <div onClick={handleNakupClick} className='w-16 flex justify-center mt-3 py-1 text-sm border-[1px] rounded-xl hover:bg-stone-200 transition duration-300 hover:text-stone-800 cursor-pointer'>Potrdi</div>
                </>
            )}

            <IoClose className='w-10 h-10 cursor-pointer absolute top-[5px] right-[5px] px-[7px] py-[5px]'
            onClick={toggleWindow}
            />

        </div>
    </div>
  );
};

export default Window;