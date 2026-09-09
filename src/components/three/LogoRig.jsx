import { useRef } from 'react';
import { useFrame, useLoader } from '@react-three/fiber';
import { TextureLoader, AdditiveBlending } from 'three';

/**
 * O símbolo JF como um objeto "tridimensional" flutuante:
 *  - duas cópias da mesma textura (a oficial, sem qualquer redesenho):
 *    uma nítida por cima, outra maior/aditiva por trás para simular glow;
 *  - rotaciona suavemente seguindo o mouse (profundidade/parallax);
 *  - reage muito sutilmente ao scroll (posição/escala/perspectiva).
 */
export default function LogoRig({ mouseRef, scrollRef, quality = 'full' }) {
  const texture = useLoader(TextureLoader, '/assets/logo/jf-emblem.webp');
  const groupRef = useRef(null);
  const idle = useRef(0);

  useFrame((_, delta) => {
    const group = groupRef.current;
    if (!group) return;

    idle.current += delta;
    const mouse = mouseRef.current;
    const scroll = scrollRef.current; // 0 (topo) -> 1 (saiu da hero)

    const idleSway = Math.sin(idle.current * 0.35) * 0.035;

    const targetRotY = mouse.x * 0.32 + idleSway;
    const targetRotX = -mouse.y * 0.22 + Math.cos(idle.current * 0.28) * 0.02;
    const targetPosX = mouse.x * 0.35;
    const targetPosY = -mouse.y * 0.22 - scroll * 1.1;

    const lerpSpeed = quality === 'full' ? 0.055 : 0.09;

    group.rotation.y += (targetRotY - group.rotation.y) * lerpSpeed;
    group.rotation.x += (targetRotX - group.rotation.x) * lerpSpeed;
    group.position.x += (targetPosX - group.position.x) * lerpSpeed;
    group.position.y += (targetPosY - group.position.y) * lerpSpeed;

    const targetScale = 1 - scroll * 0.16;
    group.scale.x += (targetScale - group.scale.x) * lerpSpeed;
    group.scale.y += (targetScale - group.scale.y) * lerpSpeed;
    group.scale.z += (targetScale - group.scale.z) * lerpSpeed;
  });

  const aspect = texture.image ? texture.image.width / texture.image.height : 1.5;
  const width = 4.6;
  const height = width / aspect;

  return (
    <group ref={groupRef}>
      {/* Halo aditivo (glow) atrás do símbolo nítido */}
      <mesh position={[0, 0, -0.35]} scale={1.22}>
        <planeGeometry args={[width, height]} />
        <meshBasicMaterial
          map={texture}
          transparent
          opacity={0.45}
          blending={AdditiveBlending}
          depthWrite={false}
          toneMapped={false}
        />
      </mesh>

      {/* Símbolo nítido, cores fiéis ao arquivo original */}
      <mesh>
        <planeGeometry args={[width, height]} />
        <meshBasicMaterial map={texture} transparent depthWrite={false} toneMapped={false} />
      </mesh>
    </group>
  );
}
