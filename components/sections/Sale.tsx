"use client"

import { Canvas, useFrame, useLoader } from '@react-three/fiber';
import { useInView } from 'framer-motion';
import Link from 'next/link'
import * as THREE from 'three';
import React, { useEffect, useRef, useState } from 'react'
import { GLTFLoader } from 'three/examples/jsm/Addons.js';
import { a, easings, useSpring } from '@react-spring/three';

interface ModelProps{
  url: string;
  initialPosition: [number, number, number];
  FinalPosition: [number, number, number];
  rotation: [number, number, number];
  scale: [number, number, number];

}

const clock = new THREE.Clock();
let delta = clock.getDelta();

const Model = ({url, initialPosition, FinalPosition, rotation, scale}:ModelProps) => {
  const model = useLoader(GLTFLoader, url);
  const modelRef = useRef<THREE.Mesh>(null);

  const { position } = useSpring({
    from: {position: initialPosition},
    to: {position: FinalPosition},
    config: { duration: 1500, easing: easings.easeInOutCubic},
    delay: 200
  })

  useFrame((state, delta) => {
    if (modelRef.current) {
      modelRef.current.rotation.y += 0.3 * delta / 1.7; // Adjust speed by changing 0.01
    }
  });

  return(

    <a.mesh
    ref={modelRef}
    position={position}
    rotation={rotation}
    scale={scale}
    
    >
      <primitive object={model.scene}/>
    </a.mesh>
  )
}

const Sale = () => {
  const mountRef = useRef(null);
  const isInView = useInView(mountRef, {once: true});

  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      if (typeof window !== 'undefined') {
        setIsMobile(window.innerWidth < 768);
      }
  };

    handleResize();
    window.addEventListener('resize', handleResize); 

    return () => {
      window.removeEventListener('resize', handleResize); 
    };
  }, []);

  const scale: [number, number, number] = [0.3, 0.3, 0.3];

  const leftModelInitialPosition: [number, number, number] = [-6, -1.3, 0];
  const rightModelInitialPosition: [number, number, number] = [6, -1.8, 0];

  const leftModelFinalPosition: [number, number, number] = isMobile ? [0, -1.9, 0] : [-1.8, -1.9, 0];
  const rightModelFinalPosition: [number, number, number] = [1.8, -1.9, 0];

  const modelRotationLeft: [number, number, number] = [
    Math.PI / 10,
    (Math.PI / 180) * 70,
    (Math.PI / 180) * 0,
  ]

  const modelRotationRight: [number, number, number] = [
    Math.PI / 10,
    (Math.PI / 180) * -70,
    (Math.PI / 180) * 0,
  ]

  return (
    <div className='max-w-[1536px] flex flex-col items-center gap-8 pt-32 mx-auto'>
      <h2 className='text-4xl md:text-5xl font-bold text-center'>Omejena prodaja <br/> na voljo</h2>
      <p className='uppercase text-sm font-bold bg-gradient bg-clip-text text-transparent'>popusti do 30%</p>
      <Link href='#catalog' className='w-36 flex flex-col items-center py-3 rounded-xl text-xs bg-gradient'>
      Naroči ErgoChair
      </Link>
    </div>
  )
}

export default Sale