import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { ShoppingBag, Search, ShieldCheck, UserCheck, X } from 'lucide-react';
import { hapticImpact } from '../utils/telegram';

export const Navbar: React.FC = () => {
  const { user, setUserRole, cart, setIsCartOpen, searchQuery, setSearchQuery, isAdminAuthorized } = useApp();
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  const cartItemsCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  const handleRoleToggle = () => {
    const nextRole = user.role === 'customer' ? 'admin' : 'customer';
    setUserRole(nextRole);
  };

  return (
    <header className="sticky top-0 z-40 bg-grace-bg/90 backdrop-blur-md border-b border-grace-border/70 transition-all">
      <div className="max-w-md mx-auto px-4 h-14 flex items-center justify-between gap-3">
        {/* Brand Logo */}
        {!isSearchOpen ? (
          <div className="flex items-center">
            <h1 className="text-2xl font-serif tracking-widest font-semibold text-grace-espresso">
              GRACE
            </h1>
          </div>
        ) : (
          <div className="flex-1 flex items-center gap-2">
            <div className="relative flex-1">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-grace-muted" />
              <input
                type="text"
                placeholder="Поиск по названию..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                autoFocus
                className="w-full pl-9 pr-4 py-2 text-xs bg-grace-sand/70 rounded-full border border-grace-border focus:outline-none focus:border-grace-espresso text-grace-espresso placeholder:text-grace-muted"
              />
            </div>
            <button
              onClick={() => {
                setIsSearchOpen(false);
                setSearchQuery('');
              }}
              className="p-1.5 text-grace-muted hover:text-grace-espresso"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        )}

        {/* Action Controls */}
        <div className="flex items-center gap-1.5 shrink-0">
          {!isSearchOpen && (
            <button
              onClick={() => {
                hapticImpact('light');
                setIsSearchOpen(true);
              }}
              className="w-9 h-9 flex items-center justify-center text-grace-espresso hover:text-grace-gold-dark transition-colors rounded-full hover:bg-grace-sand/60"
              aria-label="Поиск"
            >
              <Search className="w-4.5 h-4.5" />
            </button>
          )}

          {/* Quick Admin Role Toggle Pill (Only visible for Whitelisted Admins) */}
          {isAdminAuthorized && (
            <button
              onClick={handleRoleToggle}
              className={`flex items-center gap-1 px-2.5 py-1.5 rounded-full text-[10px] font-semibold tracking-wider transition-all border ${
                user.role === 'admin'
                  ? 'bg-grace-espresso text-white border-grace-espresso shadow-sm'
                  : 'bg-grace-sand text-grace-espresso border-grace-border hover:bg-grace-sand-dark'
              }`}
              title="Переключить режим управления"
            >
              {user.role === 'admin' ? (
                <>
                  <ShieldCheck className="w-3 h-3 text-grace-gold" />
                  <span>АДМИН</span>
                </>
              ) : (
                <>
                  <UserCheck className="w-3 h-3 text-grace-muted" />
                  <span>КЛИЕНТ</span>
                </>
              )}
            </button>
          )}

          {/* Shopping Cart Button */}
          <button
            onClick={() => {
              hapticImpact('medium');
              setIsCartOpen(true);
            }}
            className="relative w-9 h-9 flex items-center justify-center text-grace-espresso hover:text-grace-gold-dark transition-colors rounded-full hover:bg-grace-sand/60"
            aria-label="Корзина"
          >
            <ShoppingBag className="w-4.5 h-4.5" />
            {cartItemsCount > 0 && (
              <span className="absolute top-1 right-1 w-4 h-4 rounded-full bg-grace-espresso text-white text-[9px] font-bold flex items-center justify-center shadow-sm">
                {cartItemsCount}
              </span>
            )}
          </button>
        </div>
      </div>
    </header>
  );
};
