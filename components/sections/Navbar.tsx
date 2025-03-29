import React from 'react'
import Logo from '../Logo'
import Link from 'next/link'

const Navbar = () => {
  return (
    <div className='max-w-5xl flex justify-between items-center p-8 mx-auto'>
      <Logo size="lg"/>
      <div className='flex flex-row gap-8 items-center'>
        <Link href="#catalog" className='hidden md:block font-semibold text-sm text-slate-400'>Catalog</Link>
        <Link href="#features" className='hidden md:block font-semibold text-sm text-slate-400'>Features</Link>
        <Link href="#reviews" className='hidden md:block font-semibold text-sm text-slate-400'>Reviews</Link>
      </div>
    </div>
  )
}

export default Navbar