// src/components/ThreeCanvas.js
import React, { useEffect, useRef } from "react";
import * as THREE from "three";

const ThreeCanvas = () => {
  const canvasRef = useRef(null); // This will reference the canvas element

  useEffect(() => {

    const scene = new THREE.Scene();
    
    const parameters = {
        materialColor: '#ffeded'
    }

    const particlesCount = 200
    const positions = new Float32Array(particlesCount * 3)
    for(let i = 0; i < particlesCount; i++)
      {
          positions[i * 3 + 0] = (Math.random() - 0.5) * 10
          positions[i * 3 + 1] = 10 * 0.8 - Math.random() * 10
          positions[i * 3 + 2] = (Math.random() - 0.5) * 10
      }
    
    const particlesGeometry = new THREE.BufferGeometry()
    particlesGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3))

    const particlesMaterial = new THREE.PointsMaterial({
      color: parameters.materialColor,
      sizeAttenuation: true,
      size: 0.03
    })

    const particles = new THREE.Points(particlesGeometry, particlesMaterial)
    scene.add(particles)

  const sizes = {
    width: window.innerWidth,
    height: window.innerHeight
  }

  const cameraGroup = new THREE.Group()
  scene.add(cameraGroup)

  const camera = new THREE.PerspectiveCamera(35, window.innerWidth / window.innerHeight, 0.1, 1000)
  camera.position.z = 6
  cameraGroup.add(camera)

  // Set up WebGL renderer
  const renderer = new THREE.WebGLRenderer({ canvas: canvasRef.current, alpha: true });
  renderer.setSize(window.innerWidth, window.innerHeight); // Full-screen canvas
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
  renderer.setClearColor(0x000000, 0); // Transparent background

  const cursor = { x: 0, y: 0 };

  const handleMouseMove = (event) => {
    cursor.x = event.clientX / sizes.width - 0.5;
    cursor.y = event.clientY / sizes.height - 0.5;
  };

  window.addEventListener("mousemove", handleMouseMove);

  const clock = new THREE.Clock()
  let previousTime = 0

  let animationId;
  const animate = () => {
  animationId = requestAnimationFrame(animate);

  const elapsedTime = clock.getElapsedTime()
  const deltaTime = elapsedTime - previousTime
  previousTime = elapsedTime

  renderer.render(scene, camera);

  };

  animate();

  return () => {
    window.removeEventListener("mousemove", handleMouseMove);
    if (animationId) cancelAnimationFrame(animationId);
    particlesGeometry.dispose();
    particlesMaterial.dispose();
  };

  }, []);

  return <canvas ref={canvasRef} style={{ 
    position: "absolute", 
    top: 0, 
    left: 0, 
    zIndex: -1,
    width: "100vw", 
    height: "100vh",
    maxWidth: "100vw", 
    maxHeight: "100vh"
   }} />;
};

export default ThreeCanvas;