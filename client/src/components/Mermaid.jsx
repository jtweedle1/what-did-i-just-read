import { useEffect, useRef, useState } from 'react';
import mermaid from 'mermaid';

mermaid.initialize({ startOnLoad: false, theme: 'neutral' });

function Mermaid({ chart }) {
  const containerRef = useRef();
  const [isRendered, setIsRendered] = useState(false);

  useEffect(() => {
    if (containerRef.current) {
      containerRef.current.innerHTML = chart;
      setTimeout(() => {
        try {
          mermaid.init(undefined, containerRef.current);
          setIsRendered(true);
        } catch (error) {
          console.error('Mermaid render failed:', error);
        }
      }, 0);
    }
  }, [chart]);

  useEffect(() => {
    if (isRendered && containerRef.current) {
      const svgElement = containerRef.current.querySelector('svg');
      if (svgElement) {
        svgElement.setAttribute('width', '100%');
        svgElement.setAttribute('height', 'auto');
        svgElement.style.maxWidth = '100%';
        svgElement.style.height = 'auto';
        svgElement.style.display = 'block';
      }
    }
  }, [isRendered]);

  const handleDownload = () => {
    const svgElement = containerRef.current.querySelector('svg');
    if (!svgElement) return;

    const svgBlob = new Blob([svgElement.outerHTML], { type: 'image/svg+xml' });
    const url = URL.createObjectURL(svgBlob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'diagram.svg';
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
   <>
      <div
        style={{ overflow: 'auto', maxHeight: '80vh', border: '1px solid #ccc', width: '100%' }}
        className="bg-white border border-gray-300 rounded-md p-4 mt-4 shadow"
      >
        <div ref={containerRef} style={{ width: '100%' }} />
              <button
        onClick={handleDownload}
        className="mt-2 bg-blue-500 hover:bg-blue-600 text-white font-semibold py-1 px-3 rounded"
      >
        Download Diagram
      </button>
      </div>
    </>
  );
}

export default Mermaid;
