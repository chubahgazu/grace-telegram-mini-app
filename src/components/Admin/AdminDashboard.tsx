import React from 'react';
import { useApp } from '../../context/AppContext';
import { DollarSign, ShoppingBag, AlertTriangle, Layers } from 'lucide-react';
import { formatPrice } from '../../utils/formatters';

export const AdminDashboard: React.FC = () => {
  const { orders, products, drops } = useApp();

  const totalRevenue = orders
    .filter(o => o.status !== 'cancelled')
    .reduce((sum, o) => sum + o.totalAmount, 0);

  const activeOrders = orders.filter(o => o.status === 'paid' || o.status === 'in_delivery');
  
  const lowStockCount = products.filter(p =>
    Object.values(p.stock).some(qty => qty <= 2)
  ).length;

  const currentDrop = drops.find(d => d.isCurrent) || drops[0];

  return (
    <div className="space-y-4 mb-6">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-serif font-bold text-grace-espresso">
          Дашборд магазина
        </h2>
        <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-grace-espresso text-white uppercase tracking-wider">
          Grace Admin
        </span>
      </div>

      <div className="grid grid-cols-2 gap-3">
        {/* Total Revenue */}
        <div className="p-3.5 rounded-2xl bg-grace-card border border-grace-border shadow-grace-subtle">
          <div className="flex items-center gap-2 text-grace-muted mb-1">
            <DollarSign className="w-4 h-4 text-emerald-600" />
            <span className="text-[10px] uppercase font-bold tracking-wider">Выручка</span>
          </div>
          <p className="text-base font-bold font-mono text-grace-espresso">
            {formatPrice(totalRevenue)}
          </p>
        </div>

        {/* Active Orders */}
        <div className="p-3.5 rounded-2xl bg-grace-card border border-grace-border shadow-grace-subtle">
          <div className="flex items-center gap-2 text-grace-muted mb-1">
            <ShoppingBag className="w-4 h-4 text-grace-gold-dark" />
            <span className="text-[10px] uppercase font-bold tracking-wider">Активные заказы</span>
          </div>
          <p className="text-base font-bold font-mono text-grace-espresso">
            {activeOrders.length} / {orders.length} шт.
          </p>
        </div>

        {/* Low Stock Warning */}
        <div className="p-3.5 rounded-2xl bg-grace-card border border-grace-border shadow-grace-subtle">
          <div className="flex items-center gap-2 text-grace-muted mb-1">
            <AlertTriangle className="w-4 h-4 text-amber-600" />
            <span className="text-[10px] uppercase font-bold tracking-wider">Мало на складе</span>
          </div>
          <p className="text-base font-bold font-mono text-grace-espresso">
            {lowStockCount} товаров
          </p>
        </div>

        {/* Active Capsule Drop */}
        <div className="p-3.5 rounded-2xl bg-grace-card border border-grace-border shadow-grace-subtle">
          <div className="flex items-center gap-2 text-grace-muted mb-1">
            <Layers className="w-4 h-4 text-indigo-600" />
            <span className="text-[10px] uppercase font-bold tracking-wider">Текущий дроп</span>
          </div>
          <p className="text-xs font-bold text-grace-espresso truncate">
            {currentDrop?.title || 'Нет'}
          </p>
        </div>
      </div>
    </div>
  );
};
