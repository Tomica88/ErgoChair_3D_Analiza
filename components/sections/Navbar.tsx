import React from 'react'
import Logo from '../Logo'
import Link from 'next/link'

const Navbar = () => {
  return (
    <div className='max-w-5xl flex justify-between items-center p-8 mx-auto'>
      <Logo size="lg"/>
      <div className='flex flex-row gap-8 items-center z-20'>
        <Link href="#catalog" className='hidden md:block font-semibold text-sm text-slate-400'>Konfigurator</Link>
        <Link href="#features" className='hidden md:block font-semibold text-sm text-slate-400'>Lastnosti</Link>
        <Link href="#reviews" className='hidden md:block font-semibold text-sm text-slate-400'>Ocene</Link>
      </div>
    </div>
  )
}

export default Navbar