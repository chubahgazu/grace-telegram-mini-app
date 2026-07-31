import React from 'react';
import { useApp } from '../context/AppContext';
import { ProductCard } from './ProductCard';
import { PackageX } from 'lucide-react';

export const ProductGrid: React.FC = () => {
  const { products, selectedCategory, searchQuery } = useApp();

  const filteredProducts = products.filter((p) => {
    const matchesCategory = selectedCategory === 'All' || p.category === selectedCategory;
    const matchesSearch =
      searchQuery === '' ||
      p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.composition.toLowerCase().includes(searchQuery.toLowerCase());

    return matchesCategory && matchesSearch;
  });

  if (filteredProducts.length === 0) {
    return (
      <div className="py-16 text-center flex flex-col items-center justify-center bg-grace-card rounded-2xl border border-grace-border/80 p-6 my-4">
        <PackageX className="w-10 h-10 text-grace-muted mb-3 stroke-[1.5]" />
        <h3 className="text-base font-serif font-bold text-grace-espresso mb-1">
          Товары не найдены
        </h3>
        <p className="text-xs text-grace-muted max-w-xs font-light">
          Попробуйте выбрать другую категорию.
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-2 gap-3.5 pb-24">
      {filteredProducts.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
};
