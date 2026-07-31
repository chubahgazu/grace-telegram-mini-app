import React from 'react';
import { useApp } from '../context/AppContext';
import { Sparkles, Calendar } from 'lucide-react';

export const HeroBanner: React.FC = () => {
  const { drops, selectedDropId } = useApp();
  const activeDrop = drops.find(d => d.id === selectedDropId) || drops[0];

  if (!activeDrop) return null;

  return (
    <div className="relative overflow-hidden rounded-3xl bg-grace-espresso text-white shadow-grace-card mb-5">
      {/* Background Image with Vignette Overlay */}
      <div className="absolute inset-0">
        <img
          src={activeDrop.bannerUrl}
          alt={activeDrop.title}
          className="w-full h-full object-cover opacity-40 scale-105 transition-transform duration-700 hover:scale-100"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-grace-espresso via-grace-espresso/40 to-transparent" />
      </div>

      {/* Hero Content */}
      <div className="relative p-5 flex flex-col justify-end min-h-[200px]">
        <div className="flex items-center gap-2 mb-2">
          {activeDrop.isCurrent ? (
            <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-grace-gold text-grace-espresso text-[9px] font-bold uppercase tracking-wider shadow-sm">
              <Sparkles className="w-3 h-3 fill-grace-espresso" />
              Активный Дроп
            </span>
          ) : (
            <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-white/20 backdrop-blur-md text-white text-[9px] font-medium uppercase tracking-wider">
              <Calendar className="w-3 h-3" />
              {activeDrop.releaseDate}
            </span>
          )}
          <span className="text-[9px] tracking-widest text-grace-sand/70 font-mono uppercase">
            [{activeDrop.code}]
          </span>
        </div>

        <h2 className="text-xl font-serif font-bold tracking-tight text-white leading-snug mb-1.5">
          {activeDrop.title}
        </h2>

        <p className="text-xs text-grace-sand/80 line-clamp-1 font-light tracking-wide">
          {activeDrop.description}
        </p>
      </div>
    </div>
  );
};
