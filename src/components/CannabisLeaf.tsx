import React, { useEffect, useState } from 'react';

interface CannabisLeafProps {
  className?: string;
  glow?: boolean;
}

export default function CannabisLeaf({ className = '', glow = true }: CannabisLeafProps) {
  const [processedSrc, setProcessedSrc] = useState<string | null>(null);
  const src = new URL('../public/images/cannamed_isolated_leaf_1780361525104.png', import.meta.url).href;

  useEffect(() => {
    let active = true;
    const img = new Image();
    img.src = src;
    img.onload = () => {
      if (!active) return;
      const canvas = document.createElement('canvas');
      canvas.width = img.naturalWidth;
      canvas.height = img.naturalHeight;
      const ctx = canvas.getContext('2d');
      if (!ctx) return;

      ctx.drawImage(img, 0, 0);
      const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
      const data = imageData.data;

      // Real-time canvas chroma keying to wipe out black background pixels
      // with feathered transparency on the margins.
      for (let i = 0; i < data.length; i += 4) {
        const r = data[i];
        const g = data[i + 1];
        const b = data[i + 2];
        
        // Find peak light channel
        const maxVal = Math.max(r, g, b);
        
        // Solid black background threshold
        const lowThreshold = 24;
        const highThreshold = 65;
        
        if (maxVal < lowThreshold) {
          data[i + 3] = 0; // Pure transparent alpha
        } else if (maxVal < highThreshold) {
          // If it is a green pixel (part of leaf), keep it or minimize transparent keying
          const isGreenValue = g > r * 1.05 && g > b * 1.05;
          if (!isGreenValue) {
            // Smooth blend
            const ratio = (maxVal - lowThreshold) / (highThreshold - lowThreshold);
            data[i + 3] = Math.floor(ratio * 255);
          }
        }
      }

      ctx.putImageData(imageData, 0, 0);
      try {
        const dataUrl = canvas.toDataURL('image/png');
        if (active) {
          setProcessedSrc(dataUrl);
        }
      } catch (err) {
        if (active) {
          setProcessedSrc(src); // fallback
        }
      }
    };
    img.onerror = () => {
      if (active) {
        setProcessedSrc(src);
      }
    };

    return () => {
      active = false;
    };
  }, [src]);

  // Fallback beautiful stylized green SVG skeleton leaf during image processing
  if (!processedSrc) {
    return (
      <div className={`relative ${className} flex items-center justify-center animate-pulse`}>
        <div className="w-12 h-12 rounded-full border-2 border-[#1ca233]/40 border-t-[#1ca233] animate-spin" />
      </div>
    );
  }

  return (
    <div className={`relative ${className} select-none pointer-events-none transition-all duration-500`}>
      <img
        src={processedSrc}
        alt="Cannabis Leaf"
        className={`w-full h-full object-contain ${
          glow ? 'filter drop-shadow-[0_0_24px_rgba(28,162,51,0.45)]' : ''
        }`}
        referrerPolicy="no-referrer"
      />
    </div>
  );
}
