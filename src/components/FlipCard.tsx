import React, { useState } from 'react';

interface FlipCardProps {
  frontClass?: string;
  frontContent: React.ReactNode;
  backImage: string;
  backTitle?: string;
  backDescription?: string;
  className?: string;
}

export default function FlipCard({
  frontClass = '',
  frontContent,
  backImage,
  backTitle,
  backDescription,
  className = '',
}: FlipCardProps) {
  const [isFlipped, setIsFlipped] = useState(false);

  return (
    <div
      className={`perspective-1000 w-full h-full min-h-[160px] cursor-pointer ${className}`}
      onMouseEnter={() => setIsFlipped(true)}
      onMouseLeave={() => setIsFlipped(false)}
      onClick={() => setIsFlipped(!isFlipped)}
    >
      <div
        className={`relative w-full h-full preserve-3d transform-transition rounded-xl ${
          isFlipped ? 'rotate-y-180' : ''
        }`}
      >
        {/* FRONT SIDE */}
        <div className={`absolute inset-0 backface-hidden rounded-xl overflow-hidden ${frontClass}`}>
          {frontContent}
        </div>

        {/* BACK SIDE */}
        <div className="absolute inset-0 backface-hidden rotate-y-180 rounded-xl overflow-hidden bg-black border border-white/10 flex flex-col justify-end p-5 md:p-6">
          {/* Background image on the back */}
          <div className="absolute inset-0 z-0">
            <img
              src={backImage}
              alt={backTitle || 'Details'}
              className="w-full h-full object-cover brightness-[0.55] contrast-[1.1] saturate-[1.1] object-center transition-transform duration-700 hover:scale-105"
              referrerPolicy="no-referrer"
            />
            {/* Gradient overlay for text contrast */}
            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/45 to-transparent" />
            <div className="absolute inset-0 bg-gradient-to-b from-[#051a09]/15 to-transparent" />
          </div>

          {/* Context content on the back */}
          <div className="relative z-10">
            {backTitle && (
              <span className="font-mono text-[9px] tracking-widest text-[#4ade80] uppercase font-bold block mb-1">
                {backTitle}
              </span>
            )}
            {backDescription && (
              <p className="font-sans text-[11px] md:text-xs text-zinc-150 font-medium leading-relaxed drop-shadow-sm">
                {backDescription}
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
