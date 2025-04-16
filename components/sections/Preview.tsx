import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/Addons.js';
import { ProductType } from './Catalog';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { FaRegArrowAltCircleLeft, FaRegArrowAltCircleRight } from 'react-icons/fa';
import { MdOutline3dRotation } from "react-icons/md";
import { TbRotate360 } from "react-icons/tb";
import { TbHandMove } from "react-icons/tb";

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

    // Create the Three.js scene (make sure it's declared here so it's available in inner functions)
    const scene = new THREE.Scene();

    // For mobile: lock the height value at mount time.
    const initialMobileHeight = window.innerHeight / 2;
    let sceneWidth = window.innerWidth;
    let sceneHeight = isMobile ? initialMobileHeight : window.innerHeight;

    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(sceneWidth, sceneHeight);
    renderer.setClearColor(0x0c0a09, 1);

    // Append canvas to the mount element
    const canvas = renderer.domElement;
    canvas.style.width = "100vw";
    canvas.style.maxWidth = "100vw";
    mount.appendChild(canvas);

    const camera = new THREE.PerspectiveCamera(50, sceneWidth / sceneHeight, 0.1, 1000);
    camera.position.set(0, 5, 10);

    let controls: OrbitControls | undefined;
    /*if (!isMobile) {*/
      controls = new OrbitControls(camera, renderer.domElement);

      controls.enableZoom = false;
      if (isMobile) {
      controls.enableZoom = true;
      controls.minDistance = 5;
      controls.maxDistance = 10;
      }
      controls.enablePan = false;
      controls.enableDamping = true;
      controls.dampingFactor = 0.05;
      controls.target = new THREE.Vector3(0, 3, 0);
    /*}*/

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

    // Create materials
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

    // Function to load a new model
    const loadModel = (modelSrc: string) => {
      setIsLoading(true);
      loader.load(
        modelSrc,
        (gltf) => {
          const newModel = gltf.scene;
          newModel.scale.set(1, 1, 1);
          newModel.position.set(0, 12, 0);

          newModel.traverse(child => {
            if (child instanceof THREE.Mesh) {
              if (child.name === "Cube001") child.material = wheelMaterial;
              if (child.name === "Cylinder") child.material = seatMaterial;
              if (child.name === "Cube014") child.material = frameMaterial;
            }
          });

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

    loadModel(selectedProduct.modelSrc);

    // Animation variables and event handlers
    const clock = new THREE.Clock();
    const gravity = 15;
    const bounceFactor = 0.3;
    let groundY = isMobile ? 0 : 0;
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

    // Resize handler – on mobile, we lock the height to the initially captured value.
    const resizeHandler = () => {
      sceneWidth = window.innerWidth;
      if (window.innerWidth < 768) {
        sceneHeight = initialMobileHeight;
      } else {
        sceneHeight = window.innerHeight;
      }
      camera.aspect = sceneWidth / sceneHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(sceneWidth, sceneHeight);
      renderer.setPixelRatio(window.devicePixelRatio);
    };

    let resizeTimeout: ReturnType<typeof setTimeout>;
    window.addEventListener("resize", () => {
      clearTimeout(resizeTimeout);
      resizeTimeout = setTimeout(resizeHandler, 100);
    });

    // Main animation loop
    const animate = () => {
      animationIdRef.current = requestAnimationFrame(animate);
      let delta = clock.getDelta();
      delta = Math.min(delta, 0.05);

      if (modelRef.current) {
        velocityY -= gravity * delta;
        modelRef.current.position.y += velocityY * delta;

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

    return () => {
      if (animationIdRef.current !== undefined) {
        cancelAnimationFrame(animationIdRef.current);
      }
      canvas.removeEventListener("mousedown", onMouseDown);
      canvas.removeEventListener("mouseup", onMouseUp);
      canvas.removeEventListener("mouseleave", onMouseLeave);
      window.removeEventListener("resize", resizeHandler);
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
      <div ref={mountRef} className="w-screen h-[50svh] md:h-full">
        <TbRotate360 className="hidden md:flex absolute w-10 h-10 lg:w-15 lg:h-15 opacity-70 animate-ping left-1/4 mt-85 pointer-events-none" />
        <TbRotate360 className="hidden md:flex absolute w-10 h-10 lg:w-15 lg:h-15 opacity-70 animate-ping right-1/4 mt-85 pointer-events-none rotate-180" />
        <MdOutline3dRotation className="flex md:hidden absolute w-5 h-5 opacity-70 animate-ping left-1/9 mt-9 pointer-events-none" />
        <TbHandMove className="flex md:hidden absolute w-5 h-5 opacity-70 animate-ping left-1/9 mt-22 pointer-events-none" />
        <img className="hidden lg:flex absolute lg:w-43 lg:h-173 opacity-10 left-1/15 mt-28 transform pointer-events-none select-none" src="/assets/ergo_left.png" alt="left text" />
        <img className="hidden lg:flex absolute lg:w-43 lg:h-173 opacity-10 right-1/15 mt-28 transform pointer-events-none select-none" src="/assets/ergo_right.png" alt="right text" />
      </div>
  );
};

export default Preview;
