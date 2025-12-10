import React, { useState, useEffect } from 'react';
import { HIGHLIGHTS } from '../constants';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const Highlights: React.FC = () => {
  const [activeIndex, setActiveIndex] = useState(0);

  // Auto-rotate carousel
  useEffect(() => {
    const interval = setInterval(() => {
      nextSlide();
    }, 5000);
    return () => clearInterval(interval);
  }, [activeIndex]);

  const nextSlide = () => {
    setActiveIndex((prev) => (prev + 1) % HIGHLIGHTS.length);
  };

  const prevSlide = () => {
    setActiveIndex((prev) => (prev - 1 + HIGHLIGHTS.length) % HIGHLIGHTS.length);
  };

  // Helper to determine position relative to active index
  const getPosition = (index: number) => {
    if (index === activeIndex) return 'center';
    
    const len = HIGHLIGHTS.length;
    // Calculate circular distance
    const prevIndex = (activeIndex - 1 + len) % len;
    const nextIndex = (activeIndex + 1) % len;

    if (index === prevIndex) return 'left';
    if (index === nextIndex) return 'right';
    return 'hidden';
  };

  return (
    <section id="highlights" className="py-24 bg-slate-950 border-t border-slate-900 relative overflow-hidden">
       {/* Background accent */}
       <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full max-w-4xl bg-orange-500/5 blur-[120px] rounded-full pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-16">
          <h2 className="font-mono text-3xl md:text-5xl font-bold text-white mb-4">
            HIGHLIGHTS
          </h2>
          <p className="text-slate-400 max-w-xl mx-auto">
            Snapshots of memorable moments, awards, and public engagements.
          </p>
        </div>

        {/* Carousel Container */}
        <div className="relative h-[500px] flex items-center justify-center">
          
          {/* Navigation Buttons */}
          <button 
            onClick={prevSlide}
            className="absolute left-0 md:left-10 z-30 p-3 rounded-full bg-slate-900/80 border border-slate-700 text-white hover:bg-orange-500 hover:border-orange-500 transition-all duration-300 backdrop-blur-sm"
          >
            <ChevronLeft size={24} />
          </button>
          
          <button 
            onClick={nextSlide}
            className="absolute right-0 md:right-10 z-30 p-3 rounded-full bg-slate-900/80 border border-slate-700 text-white hover:bg-orange-500 hover:border-orange-500 transition-all duration-300 backdrop-blur-sm"
          >
            <ChevronRight size={24} />
          </button>

          {/* Cards Container */}
          <div className="relative w-full max-w-5xl h-full flex items-center justify-center perspective-1000">
            {HIGHLIGHTS.map((item, index) => {
              const position = getPosition(index);
              const isCenter = position === 'center';
              const isHidden = position === 'hidden';
              
              // Base styles for transition
              let transformClass = '';
              let zIndex = 0;
              let opacity = 0;

              if (isCenter) {
                transformClass = 'scale-100 translate-x-0';
                zIndex = 20;
                opacity = 1;
              } else if (position === 'left') {
                transformClass = 'scale-75 -translate-x-[60%] md:-translate-x-[350px] rotate-y-12';
                zIndex = 10;
                opacity = 0.4;
              } else if (position === 'right') {
                transformClass = 'scale-75 translate-x-[60%] md:translate-x-[350px] -rotate-y-12';
                zIndex = 10;
                opacity = 0.4;
              } else {
                // Hidden items stay behind center to avoid flying across screen
                transformClass = 'scale-50 translate-x-0 opacity-0';
                zIndex = 0;
              }

              return (
                <div 
                  key={item.id}
                  onClick={() => {
                    if (position === 'left') prevSlide();
                    if (position === 'right') nextSlide();
                  }}
                  className={`
                    absolute transition-all duration-700 ease-[cubic-bezier(0.25,0.46,0.45,0.94)]
                    ${isHidden ? 'pointer-events-none' : 'cursor-pointer'}
                    ${transformClass}
                  `}
                  style={{ 
                    width: 'min(90vw, 500px)',
                    zIndex: zIndex,
                    opacity: isHidden ? 0 : opacity
                  }}
                >
                  {/* Card Content */}
                  <div className={`
                    relative bg-slate-900 rounded-xl p-3 border shadow-2xl overflow-hidden transition-all duration-500
                    ${isCenter ? 'border-orange-500/30 shadow-orange-500/20' : 'border-slate-800 grayscale-[50%] hover:grayscale-0'}
                  `}>
                    
                    {/* Window Header */}
                    <div className="flex items-center gap-2 mb-3 px-1">
                      <div className="flex gap-1.5">
                        <div className={`w-2.5 h-2.5 rounded-full ${isCenter ? 'bg-red-500' : 'bg-slate-700'}`}></div>
                        <div className={`w-2.5 h-2.5 rounded-full ${isCenter ? 'bg-yellow-500' : 'bg-slate-700'}`}></div>
                        <div className={`w-2.5 h-2.5 rounded-full ${isCenter ? 'bg-green-500' : 'bg-slate-700'}`}></div>
                      </div>
                      <div className="flex-1 text-center">
                         <span className={`text-[10px] font-mono uppercase tracking-wider truncate block px-2 ${isCenter ? 'text-slate-500' : 'text-slate-700'}`}>
                           {item.title}
                         </span>
                      </div>
                    </div>

                    {/* Image Area */}
                    <div className="relative aspect-[4/3] overflow-hidden rounded-lg bg-slate-950">
                      <img 
                        src={item.image} 
                        alt={item.title} 
                        className="w-full h-full object-cover"
                      />
                      
                      {/* Overlay (Only visible on center item) */}
                      <div className={`
                        absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent transition-opacity duration-500
                        ${isCenter ? 'opacity-90' : 'opacity-0'}
                      `}>
                        <div className="absolute bottom-0 left-0 right-0 p-6">
                          <h3 className="text-white font-bold text-xl md:text-2xl leading-tight mb-2 drop-shadow-md transform translate-y-0 transition-transform duration-500 delay-100">
                            {item.title}
                          </h3>
                          <p className="text-slate-300 text-sm md:text-base line-clamp-2">
                            {item.description}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Dots Indicator */}
        <div className="flex justify-center gap-2 mt-8">
          {HIGHLIGHTS.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setActiveIndex(idx)}
              className={`
                h-1.5 rounded-full transition-all duration-500 ease-out
                ${idx === activeIndex ? 'w-8 bg-orange-500' : 'w-2 bg-slate-700 hover:bg-slate-600'}
              `}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Highlights;