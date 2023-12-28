import React, { Suspense } from 'react';
import { useLoader } from '@react-three/fiber';
import { OBJLoader } from 'three/addons/loaders/OBJLoader';

const Model = () => {
  const obj = useLoader(OBJLoader, 'https://3d-images-solarhub.s3.eu-central-1.amazonaws.com/Destination/Germany/Baden-Württemberg/Waldkirch/Schwarzwaldstraße 63/Building 1/Green/Waldkirch_183.obj');

  return (
    <Suspense fallback={null}>
      <primitive object={obj} />
    </Suspense>
  );
};

export default Model;