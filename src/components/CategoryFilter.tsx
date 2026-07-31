import React from 'react';
import { useApp } from '../context/AppContext';
import { hapticSelection } from '../utils/telegram';

const CATEGORIES: { id: string; label: string }[] = [
  { id: 'All', label: 'Всё' },
  { id: 'Верхняя одежда', label: 'Верхняя одежда' },
  { id: 'Кашемир и трикотаж', label: 'Кашемир и трикотаж' },
  { id: 'Худи и рубашки', label: 'Худи и рубашки' },
  { id: 'Брюки', label: 'Брюки' },
  { id: 'Аксессуары', label: 'Аксессуары' }
];

export const CategoryFilter: React.FC = () => {
  const { selectedCategory, setSelectedCategory } = useApp();

  return (
    <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar py-1 mb-4">
      {CATEGORIES.map((cat) => {
        const isSelected = selectedCategory === cat.id;
        return (
          <button
            key={cat.id}
            onClick={() => {
              hapticSelection();
              setSelectedCategory(cat.id);
            }}
            className={`shrink-0 px-3 py-1.5 rounded-full text-xs transition-all ${
              isSelected
                ? 'bg-grace-sand text-grace-espresso font-semibold border border-grace-border'
                : 'text-grace-muted hover:text-grace-espresso bg-transparent'
            }`}
          >
            {cat.label}
          </button>
        );
      })}
    </div>
  );
};
