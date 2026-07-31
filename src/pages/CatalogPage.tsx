import React from 'react';
import { CategoryFilter } from '../components/CategoryFilter';
import { ProductGrid } from '../components/ProductGrid';

export const CatalogPage: React.FC = () => {
  return (
    <div className="animate-fade-in pt-1">
      <CategoryFilter />
      <ProductGrid />
    </div>
  );
};
