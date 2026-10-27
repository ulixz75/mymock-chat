import React, { useLayoutEffect, useRef, useState } from 'react';

/** Escala sólo el contenedor exterior; el nodo exportado conserva sus píxeles originales. */
export function MeetingPreviewFit({ enabled, children }: { enabled: boolean; children: React.ReactNode }) {
  const host = useRef<HTMLDivElement>(null);
  const [size, setSize] = useState({ width: 1008, height: 648, scale: 1 });
  useLayoutEffect(() => {
    if (!enabled || !host.current) return;
    const element = host.current;
    const content = element.querySelector('#export-canvas-target') as HTMLElement;
    if (!content) return;
    const measure = () => {
      const width = content.offsetWidth;
      const height = content.offsetHeight;
      setSize({ width, height, scale: Math.min(1, element.clientWidth / width) });
    };
    const observer = new ResizeObserver(measure);
    observer.observe(element);
    observer.observe(content);
    measure();
    return () => observer.disconnect();
  }, [enabled]);
  if (!enabled) return <>{children}</>;
  return <div ref={host} style={{ width: '100%', height: size.height * size.scale, flexShrink: 0 }}>
    <div style={{ width: 'max-content', transform: `scale(${size.scale})`, transformOrigin: 'top left' }}>{children}</div>
  </div>;
}
