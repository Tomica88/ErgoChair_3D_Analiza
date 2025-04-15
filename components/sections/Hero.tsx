"use client"

import Image from "next/image"
import Link from "next/link"
import React, { useEffect } from 'react'
import { MdKeyboard, MdKeyboardDoubleArrowDown } from "react-icons/md"
import TypingText from "../typingText"

const Hero = () => {

  return (
    <div id="hero" className="relative h-svh max-w-5xl mx-auto mt-auto flex flex-col p-4 pt-0 sm:pt-8 lg:pt-8 md:p-16">
      <div className="flex flex-col md:flex-col items-center relative">
        <div className="w-full h-full md:w-1/2 flex flex-col gap-4 md:gap-8 z-10 md:bg-gradient-to-r from-stone-950 via-stone-950 to-transparent">
          <div>
            <TypingText text="Vaš stol," textStyles="text-4xl md:text-6xl font-bold"/>
            <TypingText text="vaše udobje." textStyles="text-4xl md:text-6xl font-bold"/>
          </div>
          <p className='text-slate-400 font-semibold text-sm md:text-base'>Odkrijte stol, oblikovan tako za stil kot za udobje, ki zagotavlja neprimerljivo ergonomijo in stil za vaše vsakodnevne potrebe.</p>
          <p className='text-slate-400 font-semibold text-sm md:text-base'>Prilagodite ErgoChair stol po vaši izbiri, s pomočjo 3D konfiguratorja.</p>
          <div className='flex flex-row gap-6'>
            <Link href='#catalog' className='w-36 flex justify-center py-3 rounded-xl text-xs bg-gradient'>Nakup stola</Link>
            <Link href='#features' className='w-36 flex justify-center py-3 rounded-xl text-xs border border-white'>Poglej Več</Link>
          </div>
        </div>
      </div>
      <Link href="#catalog" className="z-20 absolute bottom-24 left-1/2 transform -translate-x-1/2 flex flex-row items-center px-6 py-2 mx-auto mb-16 md:mb-16 mt-auto border border-slate-400 rounded-xl text-sm text-slate-400">
      <MdKeyboardDoubleArrowDown className="w-4 h-4 mr-2 animate-ping"/>
      <span className="text-center">kliknite za pomik navzdol</span>
      <MdKeyboardDoubleArrowDown className="w-4 h-4 ml-2 animate-ping"/>
      </Link>
    </div>
  )
}

export default Hero