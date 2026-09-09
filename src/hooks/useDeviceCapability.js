import { useMemo } from 'react';
import { useIsTouchDevice } from './useIsTouchDevice';
import { usePrefersReducedMotion } from './usePrefersReducedMotion';

/**
 * Heurística simples para decidir o "nível de experiência" que o
 * dispositivo do visitante deve receber. Isso é o que permite que o site
 * seja visualmente avançado no desktop e ainda assim leve e fluido no
 * celular, sem apenas "encolher" a versão desktop.
 *
 * Retorna:
 *  - 'full'    -> cena 3D completa (partículas + malha + luz dinâmica)
 *  - 'lite'    -> versão simplificada (menos partículas, sem sombras dinâmicas)
 *  - 'static'  -> sem Three.js: apenas a logo em CSS com glow/parallax leve
 */
export function useDeviceCapability() {
  const isTouch = useIsTouchDevice();
  const prefersReducedMotion = usePrefersReducedMotion();

  return useMemo(() => {
    if (prefersReducedMotion) return 'static';

    const cores = navigator.hardwareConcurrency || 4;
    const memory = navigator.deviceMemory || 4;
    const saveData = navigator.connection?.saveData;
    const slowNetwork = ['slow-2g', '2g'].includes(navigator.connection?.effectiveType);

    if (saveData || slowNetwork) return 'static';
    if (cores <= 2 || memory <= 2) return isTouch ? 'static' : 'lite';
    if (isTouch) return memory <= 4 ? 'lite' : 'full';

    return 'full';
  }, [isTouch, prefersReducedMotion]);
}
