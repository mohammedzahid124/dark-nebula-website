"use client";

import React, { useEffect, useRef, useState } from "react";
import * as THREE from "three";

export default function FuturisticGalaxy() {
  const containerRef = useRef<HTMLDivElement>(null);
  const sceneRef = useRef<THREE.Scene | null>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const animationRef = useRef<number | null>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted || !containerRef.current) return;

    // Scene setup
    const scene = new THREE.Scene();
    sceneRef.current = scene;
    
    const camera = new THREE.PerspectiveCamera(
      75,
      containerRef.current.clientWidth / containerRef.current.clientHeight,
      0.1,
      10000
    );
    camera.position.z = 60;

    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    rendererRef.current = renderer;
    renderer.setSize(containerRef.current.clientWidth, containerRef.current.clientHeight);
    renderer.setClearColor(0x000000, 0.1);
    containerRef.current.appendChild(renderer.domElement);

    // Add colorful twinkling stars with different sizes
    const starsGeometry = new THREE.BufferGeometry();
    const starsVertices: number[] = [];
    const starsColors: number[] = [];
    const starsSizes: number[] = [];

    const starColors = [
      new THREE.Color(0x00d9ff), // Cyan
      new THREE.Color(0x0088ff), // Blue
      new THREE.Color(0x9333ea), // Purple
      new THREE.Color(0xffffff), // White
    ];

    for (let i = 0; i < 1500; i++) {
      starsVertices.push(
        (Math.random() - 0.5) * 400,
        (Math.random() - 0.5) * 400,
        (Math.random() - 0.5) * 400
      );
      
      const colorIndex = Math.floor(Math.random() * starColors.length);
      const color = starColors[colorIndex];
      starsColors.push(color.r, color.g, color.b);
      
      starsSizes.push(Math.random() * 1.5 + 0.3);
    }

    starsGeometry.setAttribute("position", new THREE.BufferAttribute(new Float32Array(starsVertices), 3));
    starsGeometry.setAttribute("color", new THREE.BufferAttribute(new Float32Array(starsColors), 3));
    starsGeometry.setAttribute("size", new THREE.BufferAttribute(new Float32Array(starsSizes), 1));

    const starsMaterial = new THREE.PointsMaterial({
      size: 1,
      sizeAttenuation: true,
      transparent: true,
      opacity: 0.8,
      vertexColors: true,
    });

    const stars = new THREE.Points(starsGeometry, starsMaterial);
    scene.add(stars);

    // Central glowing orb
    const orbGeometry = new THREE.SphereGeometry(15, 64, 64);
    const orbMaterial = new THREE.MeshStandardMaterial({
      color: 0x6b21ff,
      emissive: 0x9333ea,
      emissiveIntensity: 1.5,
      metalness: 0.3,
      roughness: 0.4,
    });
    const orb = new THREE.Mesh(orbGeometry, orbMaterial);
    scene.add(orb);

    // Glow effect for orb
    const glowGeometry = new THREE.SphereGeometry(16, 32, 32);
    const glowMaterial = new THREE.MeshBasicMaterial({
      color: 0x6b21ff,
      transparent: true,
      opacity: 0.3,
      side: THREE.BackSide,
    });
    const glowMesh = new THREE.Mesh(glowGeometry, glowMaterial);
    orb.add(glowMesh);

    // Energy waves (rings)
    for (let i = 0; i < 3; i++) {
      const ringGeometry = new THREE.TorusGeometry(25 + i * 8, 1, 32, 100);
      const ringMaterial = new THREE.MeshBasicMaterial({
        color: new THREE.Color().setHSL(0.7 + i * 0.1, 1, 0.5),
        transparent: true,
        opacity: 0.6 - i * 0.15,
      });
      const ring = new THREE.Mesh(ringGeometry, ringMaterial);
      ring.rotation.x = Math.random() * Math.PI;
      ring.rotation.y = Math.random() * Math.PI;
      ring.userData.rotationSpeed = (Math.random() - 0.5) * 0.01;
      ring.userData.axis = new THREE.Vector3(
        Math.random() - 0.5,
        Math.random() - 0.5,
        Math.random() - 0.5
      ).normalize();
      scene.add(ring);
    }

    // Spiral galaxy particles
    const particlesGeometry = new THREE.BufferGeometry();
    const particlesCount = 2000;
    const particlesPositions = new Float32Array(particlesCount * 3);
    const particlesMaterial = new THREE.PointsMaterial({
      color: 0x00d9ff,
      size: 0.5,
      sizeAttenuation: true,
      transparent: true,
      opacity: 0.8,
    });

    for (let i = 0; i < particlesCount * 3; i += 3) {
      const distance = Math.random() * 50 + 20;
      const angle = Math.random() * Math.PI * 2;
      const y = (Math.random() - 0.5) * 40;

      particlesPositions[i] = Math.cos(angle) * distance;
      particlesPositions[i + 1] = y;
      particlesPositions[i + 2] = Math.sin(angle) * distance;
    }

    particlesGeometry.setAttribute("position", new THREE.BufferAttribute(particlesPositions, 3));
    const particles = new THREE.Points(particlesGeometry, particlesMaterial);
    scene.add(particles);

    // Lighting
    const pointLight = new THREE.PointLight(0x9333ea, 2, 100);
    pointLight.position.set(0, 0, 20);
    scene.add(pointLight);

    const ambientLight = new THREE.AmbientLight(0x333366, 0.5);
    scene.add(ambientLight);

    // Animation loop
    let time = 0;
    const animate = () => {
      time += 0.001;

      // Twinkle stars
      if (stars.geometry.attributes.size) {
        const sizes = stars.geometry.attributes.size.array as Float32Array;
        const originalSizes = Array.from(sizes);
        for (let i = 0; i < sizes.length; i++) {
          const twinkle = Math.sin(time * 3 + i * 0.5) * 0.5 + 0.5;
          sizes[i] = originalSizes[i] * (0.5 + twinkle * 0.5);
        }
        stars.geometry.attributes.size.needsUpdate = true;
      }

      // Rotate orb
      orb.rotation.x += 0.0003;
      orb.rotation.y += 0.0005;

      // Rotate rings
      scene.children.forEach((child) => {
        if (child instanceof THREE.Mesh && child.userData.rotationSpeed) {
          child.rotation.x += child.userData.rotationSpeed;
          child.rotation.y += child.userData.rotationSpeed * 0.8;
        }
      });

      // Animate particles
      if (particles.geometry.attributes.position) {
        const positions = particles.geometry.attributes.position.array as Float32Array;
        for (let i = 0; i < positions.length; i += 3) {
          const x = positions[i];
          const z = positions[i + 2];
          const distance = Math.sqrt(x * x + z * z);
          const angle = Math.atan2(z, x) + 0.001;

          positions[i] = Math.cos(angle) * distance;
          positions[i + 2] = Math.sin(angle) * distance;
        }
        particles.geometry.attributes.position.needsUpdate = true;
      }

      // Pulse orb emission
      const pulseIntensity = 1.5 + Math.sin(time * 3) * 0.5;
      orbMaterial.emissiveIntensity = pulseIntensity;

      renderer.render(scene, camera);
      animationRef.current = requestAnimationFrame(animate);
    };

    animate();

    // Handle resize
    const handleResize = () => {
      if (!containerRef.current) return;
      const width = containerRef.current.clientWidth;
      const height = containerRef.current.clientHeight;
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
      if (animationRef.current) cancelAnimationFrame(animationRef.current);
      renderer.dispose();
      containerRef.current?.removeChild(renderer.domElement);
    };
  }, [mounted]);

  return (
    <div
      ref={containerRef}
      className="absolute inset-0 w-full h-full"
      style={{ background: "radial-gradient(ellipse at center, #0a0015 0%, #000000 100%)" }}
    />
  );
}
