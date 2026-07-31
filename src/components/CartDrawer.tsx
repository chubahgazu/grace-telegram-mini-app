import React from 'react';
import { useApp } from '../context/AppContext';
import { X, Trash2, Plus, Minus, ArrowRight, ShoppingBag } from 'lucide-react';
import { formatPrice } from '../utils/formatters';

export const CartDrawer: React.FC = () => {
  const { cart, isCartOpen, setIsCartOpen, removeFromCart, updateCartQuantity, cartTotal, setIsCheckoutOpen } = useApp();

  if (!isCartOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center bg-grace-espresso/70 backdrop-blur-sm animate-fade-in">
      <div className="relative w-full max-w-md max-h-[85vh] bg-grace-bg rounded-t-3xl shadow-grace-floating flex flex-col animate-slide-up">
        {/* Top Header */}
        <div className="p-4 border-b border-grace-border/80 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <ShoppingBag className="w-5 h-5 text-grace-espresso" />
            <h2 className="text-lg font-serif font-bold text-grace-espresso">
              Ваша корзина
            </h2>
            <span className="text-xs text-grace-muted font-medium">
              ({cart.reduce((sum, i) => sum + i.quantity, 0)})
            </span>
          </div>

          <button
            onClick={() => setIsCartOpen(false)}
            className="p-2 rounded-full hover:bg-grace-sand transition-colors text-grace-espresso"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Cart Items List */}
        <div className="flex-1 overflow-y-auto p-4 space-y-3 no-scrollbar">
          {cart.length === 0 ? (
            <div className="py-12 text-center flex flex-col items-center justify-center">
              <ShoppingBag className="w-12 h-12 text-grace-muted/50 mb-3 stroke-[1]" />
              <p className="text-sm font-medium text-grace-espresso mb-1">
                Корзина пуста
              </p>
              <p className="text-xs text-grace-muted font-light max-w-xs">
                Добавьте понравившиеся вещи из актуального дропа Grace
              </p>
            </div>
          ) : (
            cart.map((item) => (
              <div
                key={item.id}
                className="flex items-center gap-3 p-3 rounded-2xl bg-grace-card border border-grace-border/70 shadow-grace-subtle"
              >
                <img
                  src={item.image}
                  alt={item.productTitle}
                  className="w-16 h-20 object-cover object-top rounded-xl bg-grace-sand/40 shrink-0"
                />

                <div className="flex-1 min-w-0">
                  <h4 className="text-xs font-semibold text-grace-espresso truncate mb-1">
                    {item.productTitle}
                  </h4>
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-[10px] font-mono font-bold px-1.5 py-0.5 rounded bg-grace-sand text-grace-espresso border border-grace-border">
                      Размер {item.size}
                    </span>
                    <span className="text-xs font-bold text-grace-espresso">
                      {formatPrice(item.price)}
                    </span>
                  </div>

                  {/* Quantity Stepper */}
                  <div className="flex items-center gap-3">
                    <div className="flex items-center gap-2 bg-grace-sand/70 rounded-lg p-1 border border-grace-border">
                      <button
                        onClick={() => updateCartQuantity(item.id, -1)}
                        className="p-1 hover:bg-white rounded text-grace-espresso transition-colors"
                      >
                        <Minus className="w-3 h-3" />
                      </button>
                      <span className="text-xs font-bold font-mono px-1 min-w-[16px] text-center">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() => updateCartQuantity(item.id, 1)}
                        className="p-1 hover:bg-white rounded text-grace-espresso transition-colors"
                      >
                        <Plus className="w-3 h-3" />
                      </button>
                    </div>

                    <button
                      onClick={() => removeFromCart(item.id)}
                      className="p-1.5 text-grace-muted hover:text-red-600 transition-colors ml-auto"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer Summary & Checkout Button */}
        {cart.length > 0 && (
          <div className="p-4 border-t border-grace-border/80 bg-grace-bg space-y-3">
            <div className="flex items-center justify-between text-xs">
              <span className="text-grace-muted">Итого по товарам:</span>
              <span className="text-base font-bold text-grace-espresso font-mono">
                {formatPrice(cartTotal)}
              </span>
            </div>

            <button
              onClick={() => {
                setIsCartOpen(false);
                setIsCheckoutOpen(true);
              }}
              className="w-full py-3.5 px-4 rounded-2xl bg-grace-espresso text-white font-semibold text-xs uppercase tracking-widest flex items-center justify-center gap-2 shadow-grace-floating hover:bg-grace-gold-dark transition-all active:scale-[0.98]"
            >
              <span>Оформить заказ</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
