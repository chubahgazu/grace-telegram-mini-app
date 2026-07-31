import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { Size } from '../types';
import { X, Heart, ShoppingBag, ShieldAlert } from 'lucide-react';
import { formatPrice } from '../utils/formatters';
import { hapticSelection } from '../utils/telegram';

export const ProductModal: React.FC = () => {
  const { selectedProduct, setSelectedProduct, addToCart, toggleWishlist, isInWishlist } = useApp();

  const [activeImageIdx, setActiveImageIdx] = useState(0);
  const [selectedSize, setSelectedSize] = useState<Size | null>(null);

  if (!selectedProduct) return null;

  const isFavorite = isInWishlist(selectedProduct.id);
  const isSoldOut = Object.values(selectedProduct.stock).every(qty => qty === 0);

  const handleAddToCart = () => {
    if (!selectedSize) return;
    addToCart(selectedProduct, selectedSize);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-grace-espresso/70 backdrop-blur-sm animate-fade-in p-0 sm:p-4">
      {/* Modal Sheet */}
      <div className="relative w-full max-w-md max-h-[90vh] overflow-y-auto bg-grace-bg rounded-t-4xl sm:rounded-4xl shadow-grace-floating flex flex-col no-scrollbar">
        {/* Top Floating Actions */}
        <div className="sticky top-0 z-10 flex items-center justify-between p-4 bg-gradient-to-b from-grace-bg via-grace-bg/80 to-transparent">
          <button
            onClick={() => {
              toggleWishlist(selectedProduct.id);
            }}
            className={`w-9 h-9 rounded-full flex items-center justify-center backdrop-blur-md transition-all ${
              isFavorite ? 'bg-grace-espresso text-grace-gold' : 'bg-white/80 text-grace-espresso'
            }`}
          >
            <Heart className={`w-4 h-4 ${isFavorite ? 'fill-grace-gold text-grace-gold' : ''}`} />
          </button>

          <button
            onClick={() => setSelectedProduct(null)}
            className="w-9 h-9 rounded-full flex items-center justify-center bg-white/80 text-grace-espresso hover:bg-white transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Image Section */}
        <div className="-mt-16 px-4 pt-4">
          <div className="relative aspect-[3/4] w-full rounded-3xl overflow-hidden bg-grace-sand/40 shadow-inner">
            <img
              src={selectedProduct.images[activeImageIdx] || selectedProduct.images[0]}
              alt={selectedProduct.title}
              className="w-full h-full object-cover object-top"
            />
          </div>

          {/* Thumbnail Strip */}
          {selectedProduct.images.length > 1 && (
            <div className="flex items-center gap-2 mt-3 overflow-x-auto pb-1 justify-center">
              {selectedProduct.images.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveImageIdx(idx)}
                  className={`w-12 h-14 rounded-xl overflow-hidden border-2 transition-all ${
                    activeImageIdx === idx ? 'border-grace-espresso scale-105' : 'border-transparent opacity-60'
                  }`}
                >
                  <img src={img} alt="" className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Content Details */}
        <div className="p-5 flex-1 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between gap-2 mb-1">
              <span className="text-[10px] font-semibold uppercase tracking-widest text-grace-gold-dark">
                {selectedProduct.category}
              </span>
              <span className="text-base font-bold text-grace-espresso">
                {formatPrice(selectedProduct.price)}
              </span>
            </div>

            <h2 className="text-xl font-serif font-bold text-grace-espresso leading-snug mb-2">
              {selectedProduct.title}
            </h2>

            <p className="text-xs text-grace-muted font-light leading-relaxed mb-4">
              {selectedProduct.description}
            </p>

            {/* Fabric Summary */}
            <div className="p-3 rounded-2xl bg-grace-sand/60 border border-grace-border mb-5 flex items-center justify-between text-xs">
              <span className="font-semibold text-grace-espresso">Состав:</span>
              <span className="text-grace-muted font-light">{selectedProduct.composition}</span>
            </div>

            {/* Size Selector */}
            <div className="mb-6">
              <div className="flex items-center justify-between mb-2 px-0.5">
                <span className="text-xs font-semibold uppercase tracking-wider text-grace-espresso">
                  Выберите размер:
                </span>
                {selectedSize && (
                  <span className="text-[11px] text-grace-gold-dark font-mono">
                    В наличии: {selectedProduct.stock[selectedSize]} шт.
                  </span>
                )}
              </div>

              <div className="grid grid-cols-4 gap-2">
                {(['S', 'M', 'L', 'XL'] as Size[]).map((size) => {
                  const count = selectedProduct.stock[size];
                  const inStock = count > 0;
                  const isSelected = selectedSize === size;

                  return (
                    <button
                      key={size}
                      disabled={!inStock}
                      onClick={() => {
                        hapticSelection();
                        setSelectedSize(size);
                      }}
                      className={`py-3 rounded-2xl border flex flex-col items-center justify-center transition-all ${
                        !inStock
                          ? 'border-grace-border/40 text-grace-muted/30 bg-grace-sand/20 cursor-not-allowed line-through'
                          : isSelected
                          ? 'border-grace-espresso bg-grace-espresso text-white shadow-grace-subtle scale-105'
                          : 'border-grace-border bg-grace-card text-grace-espresso hover:border-grace-espresso/40'
                      }`}
                    >
                      <span className="text-xs font-bold font-mono">{size}</span>
                      <span className="text-[9px] opacity-70">
                        {inStock ? `${count} шт.` : '—'}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Add to Cart CTA */}
          <div className="pt-2 sticky bottom-0 bg-grace-bg pb-2">
            <button
              onClick={handleAddToCart}
              disabled={isSoldOut || !selectedSize}
              className={`w-full py-3.5 px-6 rounded-full flex items-center justify-center gap-2 font-semibold text-xs uppercase tracking-widest transition-all ${
                isSoldOut
                  ? 'bg-grace-sand text-grace-muted cursor-not-allowed'
                  : !selectedSize
                  ? 'bg-grace-sand border border-grace-border text-grace-espresso/70'
                  : 'bg-grace-espresso text-white hover:bg-grace-gold-dark shadow-grace-floating active:scale-[0.98]'
              }`}
            >
              {isSoldOut ? (
                <>
                  <ShieldAlert className="w-4 h-4" />
                  Распродано
                </>
              ) : !selectedSize ? (
                <span>Выберите размер выше</span>
              ) : (
                <>
                  <ShoppingBag className="w-4 h-4" />
                  Добавить — {formatPrice(selectedProduct.price)}
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
