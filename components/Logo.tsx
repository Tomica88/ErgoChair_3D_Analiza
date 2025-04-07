import Image from 'next/image';
import React from 'react'
import { Bebas_Neue } from 'next/font/google';

const bebasNeue = Bebas_Neue({
  weight: '400',
  subsets: ['latin'],
});

interface LogoProps{
    size?: 'sm' | 'lg';
}

const Logo = ({size = 'sm'}
:LogoProps) => {
    const iconSize = size === 'lg' ? 70 : 70;
  return (
    <div className={`flex flex-row gap-2 items-center ${bebasNeue.className}`}>
        <Image src='/assets/logo.png' alt='logo' width={iconSize} height={iconSize} />
        <p className={`text-slate-400 text-3xl ${size === 'sm' ? 'text-sm' : ''}`}>E r g o  C h a i r</p>
    </div>
  )
}

export default Logo