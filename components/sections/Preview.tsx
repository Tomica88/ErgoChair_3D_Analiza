import React, { useEffect, useRef, useState } from 'react'
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/Addons.js';
import { ProductType } from './Catalog';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { FaRegArrowAltCircleLeft, FaRegArrowAltCircleRight } from "react-icons/fa";
import { lessThan } from 'three/webgpu';
import ProductCardColors from '../ProductCardColors';
import ProductCard from '../ProductCard';
import Products from './Products';

interface PreviewProps {
  selectedProduct: ProductType;
  wheelColor: THREE.Color;
  seatColor: THREE.Color;
  frameColor: THREE.Color;
}

interface PreviewProps{
  selectedProduct: ProductType;
}

const Preview = ({selectedProduct, wheelColor, seatColor, frameColor}: PreviewProps) => {
  const mountRef = useRef<HTMLDivElement | null>(null);
  const modelRef = useRef<THREE.Object3D | null>(null);

  useEffect(() => {
    const mount = mountRef.current;
    if(!mount) return;

    const loader = new GLTFLoader();

    const isMobile = window.innerWidth < 768; // Adjust breakpoint as needed

    const scene = new THREE.Scene();
    let sceneWidth = window.innerWidth;
    let sceneHeight = isMobile 
    ? (window.visualViewport?.height ?? window.innerHeight) / 2 
    : (window.visualViewport?.height ?? window.innerHeight);

    //scene.rotation.x = THREE.MathUtils.degToRad(20)
    //scene.rotation.z = THREE.MathUtils.degToRad(20)
    //scene.rotation.y = THREE.MathUtils.degToRad(-20)

    const renderer = new THREE.WebGLRenderer({antialias: true});
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(sceneWidth, sceneHeight);
    renderer.setClearColor(0x000000, 0)

    const canvas = renderer.domElement;

    canvas.style.width = "100vw";
    canvas.style.maxWidth = "100vw";

    mount.appendChild(canvas);

    const camera = new THREE.PerspectiveCamera(50, sceneWidth/sceneHeight, 0.1, 1000)
    
    let controls: OrbitControls; //////////////////////////////
    
    const ambientLight = new THREE.AmbientLight(0xffffff, 1.5);
    scene.add(ambientLight);

    const directionalLightTop = new THREE.DirectionalLight(0xffffff, 1)
    directionalLightTop.position.set(5, 10, 7.5);
    scene.add(directionalLightTop)

    const directionalLightLeft = new THREE.DirectionalLight(0xffffff, 1)
    directionalLightLeft.position.set(-10, 5, 0);
    scene.add(directionalLightTop)

    const directionalLightRight = new THREE.DirectionalLight(0xffffff, 1)
    directionalLightRight.position.set(10, 5, 0);
    scene.add(directionalLightTop)

    const loadModel = (modelSrc: string) => {
      loader.load(modelSrc, (gltf) => {
        if(modelRef.current){
          scene.remove(modelRef.current)
        }

        const model = gltf.scene;

            model.scale.set(1,1,1);

          model.position.set(0, 12, 0);
          scene.add(model)

        modelRef.current = model;

        model.traverse((child) => {
          if (child instanceof THREE.Mesh) {
            // Store the materials if you want to modify them later
            
            if (child.name === "Cylinder005") {
              child.material = new THREE.MeshStandardMaterial({ color: wheelColor });
            }

            if (child.name === "Cylinder") {
              child.material = new THREE.MeshStandardMaterial({ color: seatColor });
            }

            if (child.name === "Cube014") {
              child.material = new THREE.MeshStandardMaterial({ color: frameColor });
            }

          }
        });
      });
    };

    loadModel(selectedProduct.modelSrc);

    if (!isMobile) {
      controls = new OrbitControls(camera, renderer.domElement);

      controls.enableZoom = false;
      controls.enablePan = false;
      //controls.enableDamping = true;
      controls.target = new THREE.Vector3(0, 3, 0);
      //controls.target = new THREE.Vector3(0, 0, 0);
      //controls.autoRotate = true;

    }

    camera.position.set(0, 5, 10);

    const gravity = 0.002;
    const bounceFactor = 0.3;
    let groundY =0;
    if (!isMobile) {
      groundY = 0;
    }else{
      groundY = 2.2;
    }
    let velocityY = 0;
    let isBouncing = false;

    let rotating = true; // Control variable

    canvas.addEventListener("mousedown", () => {
      rotating = false; // Stop rotation when mouse is held down
    });

    canvas.addEventListener("mouseup", () => {
      rotating = true; // Resume rotation when mouse is released
    });

    canvas.addEventListener("mouseleave", () => {
      rotating = true;
    });
    
    const clock = new THREE.Clock();

    window.addEventListener("resize", ()=>{
      sceneWidth = window.innerWidth;
      const isMobileResize = window.innerWidth < 768;

      sceneHeight = isMobileResize 
      ? (window.visualViewport?.height ?? window.innerHeight) / 2 
    : (window.visualViewport?.height ?? window.innerHeight);

      camera.aspect = sceneWidth/sceneHeight;
      camera.updateProjectionMatrix();

      renderer.setSize(sceneWidth, sceneHeight);
      renderer.setPixelRatio(window.devicePixelRatio);
    })

    function animate(){

      requestAnimationFrame(animate)

      let delta = clock.getDelta();

      if (modelRef.current) {
        // Apply gravity
        velocityY -= gravity;
        modelRef.current.position.y += velocityY;

        

        // Check if the model hits the ground
        if (modelRef.current.position.y <= groundY) {
            modelRef.current.position.y = groundY; // Reset to ground level
            velocityY *= -bounceFactor; // Invert velocityY for bouncing effect
            isBouncing = true; // Mark as bouncing
        } else {
            isBouncing = false; // Not bouncing
        }

        // Optionally reduce bounce velocityY over time
        if (Math.abs(velocityY) < 0.01 && isBouncing) {
            velocityY = 0;
        }
        
    }

      if (rotating) {
      scene.rotation.y += 1 * delta / 1.7; // Spin around Y-axis
      }
      //camera.lookAt(1.5, 2.5, 0); //1.5 2.5 0
      //camera.lookAt(scene.position);
      //controls.target = new THREE.Vector3(-1, 0, -3);
      
      if (controls) controls.update(); // Only update controls if they exist
      renderer.render(scene, camera);
    }
    
    animate();

    return () => {
      if(mount){
        mount.removeChild(renderer.domElement)
      }
    }

  }, [selectedProduct, wheelColor, seatColor, frameColor]);

  return (
    <div>
      <div ref={mountRef} className='w-screen h-[50dvh] md:h-full'>
        <FaRegArrowAltCircleLeft className='hidden md:flex absolute w-10 h-10 lg:w-15 lg:h-15 opacity-70  animate-ping left-1/4 mt-85 pointer-events-none' />
        <FaRegArrowAltCircleRight className='hidden md:flex absolute w-10 h-10 lg:w-15 lg:h-15 opacity-70 animate-ping right-1/4 mt-85 pointer-events-none' />
        <img className='hidden lg:flex absolute lg:w-43 lg:h-173 opacity-30 left-1/15 mt-28 transform pointer-events-none' src="/assets/ergo_left.png" alt="left text"/>
        <img className='hidden lg:flex absolute lg:w-43 lg:h-173 opacity-30 right-1/15 mt-28 transform pointer-events-none' src="/assets/ergo_right.png" alt="right text"/>
      </div>
    </div>
  )
}


export default Preview