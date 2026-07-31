import React from 'react';
import { useApp } from '../context/AppContext';
import { ProductCard } from '../components/ProductCard';
import { Heart } from 'lucide-react';

export const WishlistPage: React.FC = () => {
  const { products, wishlist } = useApp();

  const wishlistProducts = products.filter(p => wishlist.includes(p.id));

  return (
    <div className="animate-fade-in pb-24">
      <div className="flex items-center gap-2 mb-4">
        <Heart className="w-5 h-5 text-grace-gold fill-grace-gold" />
        <h2 className="text-xl font-serif font-bold text-grace-espresso">
          Избранные вещи
        </h2>
        <span className="text-xs text-grace-muted font-medium">
          ({wishlistProducts.length})
        </span>
      </div>

      {wishlistProducts.length === 0 ? (
        <div className="py-16 text-center flex flex-col items-center justify-center bg-grace-card rounded-2xl border border-grace-border p-6 my-4">
          <Heart className="w-12 h-12 text-grace-muted/40 mb-3 stroke-[1]" />
          <h3 className="text-base font-serif font-bold text-grace-espresso mb-1">
            Список избранного пуст
          </h3>
          <p className="text-xs text-grace-muted max-w-xs font-light">
            Нажимайте на иконку сердечка на карточках товаров, чтобы сохранять их сюда.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-2 gap-3.5">
          {wishlistProducts.map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </div>
  );
};
