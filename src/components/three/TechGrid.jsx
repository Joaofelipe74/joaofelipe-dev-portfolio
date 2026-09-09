import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';

/**
 * Piso/grade tecnológica sutil que recebe a luz azul dinâmica —
 * dá profundidade ao ambiente sem competir com o símbolo JF.
 */
export default function TechGrid({ mouseRef }) {
  const meshRef = useRef(null);

  useFrame(() => {
    const mesh = meshRef.current;
    if (!mesh) return;
    const mouse = mouseRef.current;
    mesh.rotation.z += (mouse.x * 0.05 - mesh.rotation.z) * 0.04;
  });

  return (
    <group position={[0, -1.9, -2.2]} rotation={[-Math.PI / 2.6, 0, 0]}>
      <gridHelper ref={meshRef} args={[16, 24, '#2f8bff', '#101833']} />
    </group>
  );
}
