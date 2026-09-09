import { Suspense, useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Sparkles } from '@react-three/drei';
import LogoRig from './LogoRig';
import TechGrid from './TechGrid';

function DynamicLight({ mouseRef }) {
  const lightRef = useRef(null);

  useFrame(() => {
    const light = lightRef.current;
    if (!light) return;
    const mouse = mouseRef.current;
    light.position.x += (mouse.x * 3 - light.position.x) * 0.06;
    light.position.y += (-mouse.y * 2 + 1 - light.position.y) * 0.06;
  });

  return <pointLight ref={lightRef} position={[0, 1, 2.5]} intensity={12} color="#2f8bff" distance={10} />;
}

/**
 * Cena 3D do Hero. `quality` controla a densidade de partículas e a
 * presença ou não da grade tecnológica, permitindo degradar a experiência
 * com elegância em dispositivos mais fracos sem "desligar" o efeito por
 * completo.
 */
export default function HeroScene({ mouseRef, scrollRef, quality = 'full', active = true }) {
  const particleCount = quality === 'full' ? 90 : 40;

  return (
    <Canvas
      dpr={quality === 'full' ? [1, 1.6] : [1, 1]}
      camera={{ position: [0, 0, 6], fov: 42 }}
      gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
      frameloop={active ? 'always' : 'never'}
    >
      <ambientLight intensity={0.25} color="#7fc0ff" />
      <DynamicLight mouseRef={mouseRef} />

      <Suspense fallback={null}>
        <LogoRig mouseRef={mouseRef} scrollRef={scrollRef} quality={quality} />
        {quality === 'full' && <TechGrid mouseRef={mouseRef} />}
        <Sparkles
          count={particleCount}
          scale={[7, 4.5, 4]}
          size={1.4}
          speed={0.18}
          color="#7fc0ff"
          opacity={0.45}
        />
      </Suspense>
    </Canvas>
  );
}
