// src/components/ThreeCanvas.js
import React, { useEffect, useRef } from "react";
import * as THREE from "three";

const ThreeCanvas = () => {
  const canvasRef = useRef(null); // This will reference the canvas element

  useEffect(() => {
    // Set up scene, camera, and renderer
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

window.addEventListener('resize', () =>
{
  // Update sizes
  sizes.width = window.innerWidth
  sizes.height = window.innerHeight

  // Update camera
  camera.aspect = sizes.width / sizes.height
  camera.updateProjectionMatrix()

  // Update renderer
  renderer.setSize(sizes.width, sizes.height)
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
})

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

/**
 * Cursor
 */
const cursor = {}
cursor.x = 0
cursor.y = 0

window.addEventListener('mousemove', (event) =>
{
    cursor.x = event.clientX / sizes.width - 0.5
    cursor.y = event.clientY / sizes.height - 0.5
})

    const clock = new THREE.Clock()
    let previousTime = 0

    const animate = () => {

    const elapsedTime = clock.getElapsedTime()
    const deltaTime = elapsedTime - previousTime
    previousTime = elapsedTime

    const parallaxX = cursor.x * 0.5
    const parallaxY = - cursor.y * 0.5
    cameraGroup.position.x += (parallaxX - cameraGroup.position.x) * 5 * deltaTime
    cameraGroup.position.y += (parallaxY - cameraGroup.position.y) * 5 * deltaTime

    requestAnimationFrame(animate);
    renderer.render(scene, camera);

    };

    animate();

  }, []);

  return <canvas ref={canvasRef} style={{ position: "absolute", top: 0, left: 0, zIndex: -1 }} />;
};

export default ThreeCanvas;