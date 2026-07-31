import React from 'react';
import { Product, Size } from '../types';
import { useApp } from '../context/AppContext';
import { Heart, Plus } from 'lucide-react';
import { formatPrice } from '../utils/formatters';

interface ProductCardProps {
  product: Product;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { setSelectedProduct, toggleWishlist, isInWishlist } = useApp();

  const isFavorite = isInWishlist(product.id);
  const isSoldOut = Object.values(product.stock).every(qty => qty === 0);

  return (
    <div
      onClick={() => setSelectedProduct(product)}
      className="group relative flex flex-col rounded-3xl bg-grace-card border border-grace-border/80 overflow-hidden shadow-grace-subtle transition-all duration-300 hover:shadow-grace-card hover:border-grace-espresso/30 cursor-pointer"
    >
      {/* Image Container */}
      <div className="relative aspect-[3/4] w-full bg-grace-sand/40 overflow-hidden">
        <img
          src={product.images[0]}
          alt={product.title}
          loading="lazy"
          className="w-full h-full object-cover object-top transition-transform duration-500 group-hover:scale-105"
        />

        {/* Wishlist Heart Overlay */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            toggleWishlist(product.id);
          }}
          className={`absolute top-2.5 right-2.5 w-8 h-8 rounded-full flex items-center justify-center backdrop-blur-md transition-all ${
            isFavorite
              ? 'bg-grace-espresso text-grace-gold shadow-sm scale-110'
              : 'bg-white/70 text-grace-espresso hover:bg-white'
          }`}
          aria-label="В избранное"
        >
          <Heart className={`w-3.5 h-3.5 ${isFavorite ? 'fill-grace-gold text-grace-gold' : ''}`} />
        </button>

        {/* Sold Out or Featured Badge */}
        {isSoldOut ? (
          <div className="absolute inset-0 bg-grace-espresso/60 backdrop-blur-[2px] flex items-center justify-center">
            <span className="px-3 py-1 rounded-full bg-grace-espresso text-white text-[9px] font-bold uppercase tracking-widest border border-white/20">
              Распродано
            </span>
          </div>
        ) : product.isFeatured ? (
          <span className="absolute bottom-2.5 left-2.5 px-2 py-0.5 rounded bg-grace-espresso/90 text-white text-[8px] font-medium tracking-wider uppercase backdrop-blur-sm">
            Хит Дропа
          </span>
        ) : null}
      </div>

      {/* Details Container */}
      <div className="p-3.5 flex flex-col flex-1 justify-between">
        <div>
          <span className="text-[9px] uppercase font-semibold text-grace-muted tracking-wider block mb-0.5">
            {product.category}
          </span>
          <h3 className="text-xs font-medium text-grace-espresso line-clamp-2 leading-snug mb-2 font-sans group-hover:text-grace-gold-dark transition-colors">
            {product.title}
          </h3>
        </div>

        <div>
          {/* Size Pills Preview */}
          <div className="flex items-center gap-1 mb-2.5">
            {(['S', 'M', 'L', 'XL'] as Size[]).map((size) => {
              const count = product.stock[size];
              const inStock = count > 0;
              return (
                <span
                  key={size}
                  className={`text-[9px] font-mono w-5 h-5 rounded flex items-center justify-center border ${
                    inStock
                      ? 'border-grace-border text-grace-espresso font-semibold bg-grace-bg'
                      : 'border-transparent text-grace-muted/30 line-through'
                  }`}
                >
                  {size}
                </span>
              );
            })}
          </div>

          {/* Price & Quick Action */}
          <div className="flex items-center justify-between pt-2 border-t border-grace-border/60">
            <span className="text-xs font-bold text-grace-espresso font-sans">
              {formatPrice(product.price)}
            </span>

            <button
              onClick={(e) => {
                e.stopPropagation();
                setSelectedProduct(product);
              }}
              disabled={isSoldOut}
              className={`w-7 h-7 rounded-full flex items-center justify-center transition-all ${
                isSoldOut
                  ? 'bg-grace-sand text-grace-muted cursor-not-allowed'
                  : 'bg-grace-espresso text-white hover:bg-grace-gold-dark active:scale-95 shadow-sm'
              }`}
              aria-label="Подробнее"
            >
              <Plus className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
