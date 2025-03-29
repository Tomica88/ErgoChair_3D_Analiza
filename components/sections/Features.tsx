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
    title: "Unmatched Comfort",
    description: "A comfortable office chair is essential for productivity, providing support for long hours of sitting."
  },
  {
    icon: SiSpine,
    title: "Ergonomic Design",
    description: "Its ergonomic design promotes proper posture, reduces strain on the back and neck, and ensures comfort, allowing focus and comfort throughout the workday."
  },
  {
    icon: DiMaterializecss,
    title: "Premium Material",
    description: "The material of an office chair greatly impacts comfort and durability. Breathable mesh keeps you cool, while cushioned fabric or leather offers a soft, supportive feel."
  },
  {
    icon: FaGear,
    title: "5 Seperate Adjustments",
    description: "Adjustable features in an office chair, such as seat height, armrests, and tilt, ensure personalized comfort."
  }
];


const Features = () => {
  return (
    <div id="features" className='max-w-5xl mx-auto pt-8'>
      <h2 className='text-2xl font-semibold pl-4 md:pl-16 pb-10'>
        <span className='animate-pulse'>/ </span>
        features
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