import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/Addons.js';
import { ProductType } from './Catalog';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { FaRegArrowAltCircleLeft, FaRegArrowAltCircleRight } from 'react-icons/fa';

interface PreviewProps {
  selectedProduct: ProductType;
  wheelColor: THREE.Color;
  seatColor: THREE.Color;
  frameColor: THREE.Color;
}

const Preview = ({ selectedProduct, wheelColor, seatColor, frameColor }: PreviewProps) => {
  const mountRef = useRef<HTMLDivElement | null>(null);
  const modelRef = useRef<THREE.Object3D | null>(null);
  const animationIdRef = useRef<number | undefined>(undefined);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;

    const loader = new GLTFLoader();
    const isMobile = window.innerWidth < 768;

    // Create the Three.js scene, renderer, and camera
    const scene = new THREE.Scene();
    let sceneWidth = window.innerWidth;
<<<<<<< HEAD
    let sceneHeight = isMobile 
    ? (window.visualViewport?.height ?? window.innerHeight) / 2 
    : (window.visualViewport?.height ?? window.innerHeight);
=======
    let sceneHeight = isMobile
      ? (window.visualViewport?.height ?? window.innerHeight) / 2
      : (window.visualViewport?.height ?? window.innerHeight);
>>>>>>> 63ea30eaf54d2d1537f0851cd404eb0fec8d1733

    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(sceneWidth, sceneHeight);
    renderer.setClearColor(0x0c0a09, 1); // Opaque background

    // Append the renderer's canvas to the DOM
    const canvas = renderer.domElement;
    canvas.style.width = "100vw";
    canvas.style.maxWidth = "100vw";
    mount.appendChild(canvas);

    const camera = new THREE.PerspectiveCamera(50, sceneWidth / sceneHeight, 0.1, 1000);
    camera.position.set(0, 5, 10);

    let controls: OrbitControls | undefined;
    if (!isMobile) {
      controls = new OrbitControls(camera, renderer.domElement);
      controls.enableZoom = false;
      controls.enablePan = false;
      controls.enableDamping = true;
      controls.dampingFactor = 0.05;
      controls.target = new THREE.Vector3(0, 3, 0);
    }

    // Lights for the scene
    scene.add(new THREE.AmbientLight(0xffffff, 0.5));
    const lightTop = new THREE.DirectionalLight(0xffffff, 1);
    lightTop.position.set(5, 10, 7.5);
    scene.add(lightTop);
    const lightLeft = new THREE.DirectionalLight(0xffffff, 1);
    lightLeft.position.set(-10, 5, 0);
    scene.add(lightLeft);
    const lightRight = new THREE.DirectionalLight(0xffffff, 1);
    lightRight.position.set(10, 5, 0);
    scene.add(lightRight);

    // Create materials with the given colors
    const wheelMaterial = new THREE.MeshStandardMaterial({ color: wheelColor });
    const seatMaterial = new THREE.MeshStandardMaterial({ color: seatColor });
    const frameMaterial = new THREE.MeshStandardMaterial({ color: frameColor });

    // Helper function to dispose of a model’s resources
    const disposeModel = (model: THREE.Object3D) => {
      model.traverse(child => {
        if ((child as THREE.Mesh).geometry) (child as THREE.Mesh).geometry.dispose();
        if ((child as THREE.Mesh).material) {
          const material = (child as THREE.Mesh).material;
          if (Array.isArray(material)) material.forEach(m => m.dispose());
          else material.dispose();
        }
      });
    };

    // Function to load a new model without immediately removing the current one.
    // The new model is added to the scene first for continuity; then the old model is removed and its resources disposed.
    const loadModel = (modelSrc: string) => {
      setIsLoading(true);
      loader.load(
        modelSrc,
        (gltf) => {
          const newModel = gltf.scene;
          newModel.scale.set(1, 1, 1);
          newModel.position.set(0, 12, 0);

          // Apply material changes on specific child meshes
          newModel.traverse(child => {
            if (child instanceof THREE.Mesh) {
              if (child.name === "Cube001") child.material = wheelMaterial;
              if (child.name === "Cylinder") child.material = seatMaterial;
              if (child.name === "Cube014") child.material = frameMaterial;
            }
          });

          // Add the new model before removing the old one to ensure continuity
          scene.add(newModel);
          if (modelRef.current) {
            scene.remove(modelRef.current);
            disposeModel(modelRef.current);
          }
          modelRef.current = newModel;
          renderer.compile(scene, camera);
          setIsLoading(false);
        },
        undefined,
        (error) => {
          console.error('Error loading model:', error);
          setIsLoading(false);
        }
      );
    };

    // Load the initial model
    loadModel(selectedProduct.modelSrc);

    // Animation variables and event handlers for interactivity
    const clock = new THREE.Clock();
    const gravity = 15;
    const bounceFactor = 0.3;
    let groundY = isMobile ? 2.2 : 0;
    let velocityY = 0;
    let isBouncing = false;
    let rotating = true;

    const onMouseDown = () => (rotating = false);
    const onMouseUp = () => (rotating = true);
    const onMouseLeave = () => (rotating = true);

    canvas.addEventListener("mousedown", onMouseDown);
    canvas.addEventListener("mouseup", onMouseUp);
    canvas.addEventListener("mouseleave", onMouseLeave);
    document.addEventListener('visibilitychange', () => {
      rotating = document.visibilityState === 'visible';
    });

    // Resize handler to adjust the scene on window size change
    const resizeHandler = () => {
      sceneWidth = window.innerWidth;
      let sceneHeight = isMobile
      ? window.innerHeight / 2
      : window.innerHeight;
      camera.aspect = sceneWidth / sceneHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(sceneWidth, sceneHeight);
      renderer.setPixelRatio(window.devicePixelRatio);
    };

<<<<<<< HEAD
=======
    // Improved debounce logic: only trigger a resize if change is significant
    let resizeTimeout: ReturnType<typeof setTimeout>;
    let currentWidth = window.innerWidth;
    let currentHeight = window.visualViewport?.height ?? window.innerHeight;
    const threshold = 50; // Only trigger if width/height changes more than 50px

    const resizeListener = () => {
      clearTimeout(resizeTimeout);
      resizeTimeout = setTimeout(() => {
        const newWidth = window.innerWidth;
        const newHeight = window.visualViewport?.height ?? window.innerHeight;
        if (
          Math.abs(newWidth - currentWidth) > threshold ||
          Math.abs(newHeight - currentHeight) > threshold
        ) {
          currentWidth = newWidth;
          currentHeight = newHeight;
          resizeHandler();
        }
      }, 200);
    };

    window.addEventListener("resize", resizeListener);

>>>>>>> 63ea30eaf54d2d1537f0851cd404eb0fec8d1733
    // Main animation loop
    const animate = () => {
      animationIdRef.current = requestAnimationFrame(animate);
      const delta = clock.getDelta();

      if (modelRef.current) {
        velocityY -= gravity * delta;
        modelRef.current.position.y += velocityY * delta;

        // Bounce when model hits the ground
        if (modelRef.current.position.y <= groundY) {
          modelRef.current.position.y = groundY;
          velocityY *= -bounceFactor;
          isBouncing = true;
        } else {
          isBouncing = false;
        }
        if (Math.abs(velocityY) < 0.01 && isBouncing) {
          velocityY = 0;
        }
        if (rotating) {
          scene.rotation.y += (1 * delta) / 1.7;
        }
      }

      if (controls) controls.update();
      renderer.render(scene, camera);
    };

    animate();

    // Cleanup on unmount
    return () => {
      if (animationIdRef.current !== undefined) {
        cancelAnimationFrame(animationIdRef.current);
      }
      canvas.removeEventListener("mousedown", onMouseDown);
      canvas.removeEventListener("mouseup", onMouseUp);
      canvas.removeEventListener("mouseleave", onMouseLeave);
      window.removeEventListener("resize", resizeListener);
      if (controls) {
        controls.dispose();
      }
      if (modelRef.current) {
        modelRef.current.traverse(child => {
          if ((child as THREE.Mesh).geometry) (child as THREE.Mesh).geometry.dispose();
          if ((child as THREE.Mesh).material) {
            const material = (child as THREE.Mesh).material;
            if (Array.isArray(material)) material.forEach(m => m.dispose());
            else material.dispose();
          }
        });
      }
      if (mount.contains(renderer.domElement)) {
        mount.removeChild(renderer.domElement);
      }
      renderer.forceContextLoss();
      renderer.dispose();
    };
  }, [selectedProduct, wheelColor, seatColor, frameColor]);

  return (
    <div>
      <div ref={mountRef} className="w-screen h-[50dvh] md:h-full">
        <FaRegArrowAltCircleLeft className="hidden md:flex absolute w-10 h-10 lg:w-15 lg:h-15 opacity-70 animate-ping left-1/4 mt-85 pointer-events-none" />
        <FaRegArrowAltCircleRight className="hidden md:flex absolute w-10 h-10 lg:w-15 lg:h-15 opacity-70 animate-ping right-1/4 mt-85 pointer-events-none" />
        <img className="hidden lg:flex absolute lg:w-43 lg:h-173 opacity-10 left-1/15 mt-28 transform pointer-events-none select-none" src="/assets/ergo_left.png" alt="left text" />
        <img className="hidden lg:flex absolute lg:w-43 lg:h-173 opacity-10 right-1/15 mt-28 transform pointer-events-none select-none" src="/assets/ergo_right.png" alt="right text" />
      </div>
    </div>
  );
};

export default Preview;
