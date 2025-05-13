import { useEffect, useRef } from 'react';
import mermaid from 'mermaid';

mermaid.initialize({ startOnLoad: false, theme: 'neutral' });

function Mermaid({ chart }) {
  const ref = useRef();

  useEffect(() => {
    if (ref.current) {
      ref.current.innerHTML = chart;
      setTimeout(() => {
        try {
          mermaid.init(undefined, ref.current);
        } catch (error) {
          console.error('Mermaid render failed:', error);
        }
      }, 0);
    }
  }, [chart]);

  return (
    <div
      ref={ref}
      className="overflow-auto bg-white border border-gray-300 rounded-md p-4 mt-4 shadow"
    />
  );
}

export default Mermaid;
