"use client"

import React from 'react'
import { PiOfficeChairFill } from 'react-icons/pi';
import { FaGear } from "react-icons/fa6";
import { DiMaterializecss } from "react-icons/di";
import { SiSpine } from "react-icons/si";

import FeatureCard from '../FeatureCard';

const features = [
  {
    icon: PiOfficeChairFill,
    title: "Udobje Brez Primere",
    description: "Udoben pisarniški stol, ki vam bo ključnega pomena pri produktivnosti, saj nudi oporo pri dolgotrajnem sedenju."
  },
  {
    icon: SiSpine,
    title: "Ergonomska Oblika",
    description: "Njegova ergonomska zasnova spodbuja pravilno držo, zmanjšuje obremenitev hrbta in vratu ter zagotavlja udobje, kar omogoča osredotočenost in udobje skozi celoten delovni dan."
  },
  {
    icon: DiMaterializecss,
    title: "Premium Material",
    description: "Uporabljeni premium materiali, močno vplivajo na udobje in vzdržljivost. Zračna mreža vas ohranja hladne, medtem ko oblazinjen tekstil ali usnje ponuja mehak in podporen občutek."
  },
  {
    icon: FaGear,
    title: "5 Ločenih Prilagoditev",
    description: "Nastavljive funkcije, vgrajene v stol ErgoChair, kot so višina sedeža, nasloni za roke in nagib, zagotavljajo prilagojeno udobje."
  }
];


const Features = () => {
  return (
    <div id="features" className='max-w-5xl mx-auto pt-8 overflow-hidden md:overflow-visible'>
      <h2 className='text-2xl font-semibold pl-4 md:pl-16 pb-10'>
        <span className='animate-pulse'>/ </span>
        lastnosti
      </h2>
      <div className='flex flex-wrap items-center justify-center gap-8 max-w-4xl mx-auto'>
        {features.map((feature, index) => (
        <FeatureCard
        key={index}
        index={index}
        title={feature.title}
        icon={feature.icon}
        description={feature.description}
        />
      ))}
        
      </div>
    </div>
  )
}

export default Features