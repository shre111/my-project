import React, { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import Model from './Model ';

function ThreeDModelViewer() {
  return (
    <Canvas style={{ width: '800px', height: '600px' }} camera={{ position: [0, 0, 10] }}>
      <ambientLight intensity={0.5} />
      <pointLight position={[10, 10, 10]} intensity={1.0} />
      <Suspense fallback={null}>
        <Model>
          <meshStandardMaterial metalness={0.5} roughness={0.8} />
        </Model>
      </Suspense>
      <OrbitControls />
    </Canvas>
  );
}

export default ThreeDModelViewer;