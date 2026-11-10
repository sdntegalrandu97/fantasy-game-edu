import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

export default function ThreeDice({ targetValue = 1, isRolling = false, onRollComplete, size = 160 }) {
  const mountRef = useRef(null);
  const diceRef = useRef(null);
  const animFrameId = useRef(null);

  const faceRotations = {
    1: { x: 0, y: 0 },
    6: { x: Math.PI, y: 0 },
    2: { x: 0, y: -Math.PI / 2 },
    5: { x: 0, y: Math.PI / 2 },
    3: { x: Math.PI / 2, y: 0 },
    4: { x: -Math.PI / 2, y: 0 },
  };

  useEffect(() => {
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(45, 1, 0.1, 1000);
    camera.position.z = 4.2;

    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setSize(size, size);
    if (mountRef.current) {
      mountRef.current.innerHTML = '';
      mountRef.current.appendChild(renderer.domElement);
    }

    const ambientLight = new THREE.AmbientLight(0xffffff, 0.9);
    scene.add(ambientLight);
    const dirLight = new THREE.DirectionalLight(0xfff7ed, 1.2);
    dirLight.position.set(5, 8, 5);
    scene.add(dirLight);

    const createFace = (num) => {
      const c = document.createElement('canvas');
      c.width = 128; c.height = 128;
      const ctx = c.getContext('2d');
      ctx.fillStyle = '#ffffff';
      ctx.fillRect(0, 0, 128, 128);
      ctx.lineWidth = 10;
      ctx.strokeStyle = '#e2e8f0';
      ctx.strokeRect(5, 5, 118, 118);
      ctx.fillStyle = num === 1 ? '#ef4444' : '#1e293b';

      const dot = (x, y) => {
        ctx.beginPath();
        ctx.arc(x, y, num === 1 ? 16 : 10, 0, Math.PI * 2);
        ctx.fill();
      };
      if (num === 1) dot(64, 64);
      if (num === 2) { dot(36, 36); dot(92, 92); }
      if (num === 3) { dot(32, 32); dot(64, 64); dot(96, 96); }
      if (num === 4) { dot(36, 36); dot(92, 36); dot(36, 92); dot(92, 92); }
      if (num === 5) { dot(34, 34); dot(94, 34); dot(64, 64); dot(34, 94); dot(94, 94); }
      if (num === 6) { dot(34, 30); dot(94, 30); dot(34, 64); dot(94, 64); dot(34, 98); dot(94, 98); }

      return new THREE.MeshStandardMaterial({ map: new THREE.CanvasTexture(c), roughness: 0.3 });
    };

    const mats = [createFace(2), createFace(5), createFace(4), createFace(3), createFace(1), createFace(6)];
    const dice = new THREE.Mesh(new THREE.BoxGeometry(1.8, 1.8, 1.8), mats);
    scene.add(dice);
    diceRef.current = dice;

    const animate = () => {
      animFrameId.current = requestAnimationFrame(animate);
      renderer.render(scene, camera);
    };
    animate();

    return () => {
      cancelAnimationFrame(animFrameId.current);
      renderer.dispose();
    };
  }, [size]);

  useEffect(() => {
    if (!diceRef.current) return;
    const d = diceRef.current;
    if (isRolling) {
      let speed = 0.45;
      let time = 0;
      const timer = setInterval(() => {
        d.rotation.x += speed;
        d.rotation.y += speed * 0.8;
        time += 50;
        speed *= 0.95;
        if (time >= 1200) {
          clearInterval(timer);
          const tgt = faceRotations[targetValue] || faceRotations[1];
          d.rotation.x = tgt.x;
          d.rotation.y = tgt.y;
          d.rotation.z = 0;
          if (onRollComplete) onRollComplete(targetValue);
        }
      }, 50);
      return () => clearInterval(timer);
    } else {
      const tgt = faceRotations[targetValue] || faceRotations[1];
      d.rotation.x = tgt.x;
      d.rotation.y = tgt.y;
      d.rotation.z = 0;
    }
  }, [isRolling, targetValue]);

  return <div ref={mountRef} className="cursor-pointer" />;
}