import React from 'react';
import { useApp } from '../context/AppContext';
import { Compass, Heart, PackageCheck, Settings2 } from 'lucide-react';
import { hapticImpact } from '../utils/telegram';

export const BottomNav: React.FC = () => {
  const { activeTab, setActiveTab, wishlist, orders, isAdminAuthorized } = useApp();

  const activeOrdersCount = orders.filter(o => o.status !== 'completed' && o.status !== 'cancelled').length;

  const tabs = [
    { id: 'catalog', label: 'Каталог', icon: Compass },
    { id: 'wishlist', label: 'Избранное', icon: Heart, badge: wishlist.length },
    { id: 'orders', label: 'Мои заказы', icon: PackageCheck, badge: activeOrdersCount },
    ...(isAdminAuthorized ? [{ id: 'admin', label: 'Админка', icon: Settings2 }] : [])
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-40 bg-grace-bg/95 backdrop-blur-md border-t border-grace-border/80 pb-safe">
      <div className="max-w-md mx-auto px-4 h-16 flex items-center justify-around">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => {
                hapticImpact('light');
                setActiveTab(tab.id as any);
              }}
              className={`relative flex flex-col items-center justify-center w-16 h-full transition-all duration-200 ${
                isActive ? 'text-grace-espresso font-medium scale-105' : 'text-grace-muted hover:text-grace-espresso/70'
              }`}
            >
              <div className="relative">
                <Icon className={`w-5 h-5 transition-transform ${isActive ? 'stroke-[2.25px]' : 'stroke-[1.5px]'}`} />
                {!!tab.badge && tab.badge > 0 && (
                  <span className="absolute -top-1.5 -right-2.5 min-w-[16px] h-4 px-1 rounded-full bg-grace-gold text-white text-[9px] font-bold flex items-center justify-center">
                    {tab.badge}
                  </span>
                )}
              </div>
              <span className={`text-[10px] mt-1 tracking-tight ${isActive ? 'font-semibold text-grace-espresso' : 'font-normal text-grace-muted'}`}>
                {tab.label}
              </span>
              {isActive && (
                <span className="absolute bottom-1.5 w-1 h-1 rounded-full bg-grace-espresso animate-fade-in" />
              )}
            </button>
          );
        })}
      </div>
    </nav>
  );
};
