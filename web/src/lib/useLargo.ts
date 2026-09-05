'use client';

import { useEffect, useState } from 'react';

/** true acima de 900px (breakpoint de "site vira app" do design system). */
export function useLargo() {
  const [largo, setLargo] = useState(true);
  useEffect(() => {
    const mq = window.matchMedia('(min-width:900px)');
    setLargo(mq.matches);
    const onChange = () => setLargo(mq.matches);
    mq.addEventListener('change', onChange);
    return () => mq.removeEventListener('change', onChange);
  }, []);
  return largo;
}
