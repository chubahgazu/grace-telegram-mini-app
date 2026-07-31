import React from 'react';
import { useApp } from '../context/AppContext';
import { hapticSelection } from '../utils/telegram';

export const DropSelector: React.FC = () => {
  const { drops, selectedDropId, setSelectedDropId } = useApp();

  return (
    <div className="mb-3.5">
      <div className="flex items-center justify-between mb-2 px-0.5">
        <span className="text-[10px] font-semibold uppercase tracking-widest text-grace-muted">
          Коллекции
        </span>
        <span className="text-[10px] text-grace-gold-dark font-mono">
          {drops.length} сезонов
        </span>
      </div>

      <div className="flex items-center gap-2 overflow-x-auto no-scrollbar pb-1">
        {drops.map((drop) => {
          const isSelected = drop.id === selectedDropId;
          return (
            <button
              key={drop.id}
              onClick={() => {
                hapticSelection();
                setSelectedDropId(drop.id);
              }}
              className={`shrink-0 px-3.5 py-1.5 rounded-full text-xs font-medium transition-all duration-200 border ${
                isSelected
                  ? 'bg-grace-espresso text-white border-grace-espresso shadow-grace-subtle'
                  : 'bg-grace-card text-grace-espresso border-grace-border hover:border-grace-espresso/30'
              }`}
            >
              <div className="flex items-center gap-1.5">
                <span>{drop.title}</span>
                {drop.isCurrent && (
                  <span className={`w-1.5 h-1.5 rounded-full ${isSelected ? 'bg-grace-gold' : 'bg-emerald-500'}`} />
                )}
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
};
