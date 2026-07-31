import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { AdminDashboard } from '../components/Admin/AdminDashboard';
import { OrderManager } from '../components/Admin/OrderManager';
import { ProductManager } from '../components/Admin/ProductManager';
import { AdminSecurityManager } from '../components/Admin/AdminSecurityManager';
import { PackageSearch, Boxes, ShieldCheck, Lock } from 'lucide-react';

export const AdminPage: React.FC = () => {
  const { isAdminAuthorized, setIsPinModalOpen } = useApp();
  const [adminTab, setAdminTab] = useState<'orders' | 'products' | 'security'>('orders');

  if (!isAdminAuthorized) {
    return (
      <div className="py-20 text-center flex flex-col items-center justify-center bg-grace-card rounded-3xl border border-grace-border p-6 my-4 animate-fade-in shadow-grace-subtle">
        <div className="w-14 h-14 rounded-full bg-grace-sand text-grace-espresso flex items-center justify-center mb-3">
          <Lock className="w-6 h-6 text-grace-gold-dark" />
        </div>
        <h3 className="text-lg font-serif font-bold text-grace-espresso mb-1">
          Доступ только для сотрудников
        </h3>
        <p className="text-xs text-grace-muted max-w-xs font-light mb-5 leading-relaxed">
          Панель управления магазином доступна только авторизованным сотрудникам Grace.
        </p>
        <button
          onClick={() => setIsPinModalOpen(true)}
          className="py-3 px-6 rounded-full bg-grace-espresso text-white text-xs font-semibold uppercase tracking-widest hover:bg-grace-gold-dark transition-all shadow-sm"
        >
          Ввести PIN-код доступа
        </button>
      </div>
    );
  }

  return (
    <div className="animate-fade-in space-y-6 pb-24">
      {/* Analytics KPI Dashboard */}
      <AdminDashboard />

      {/* Admin Section Tabs */}
      <div className="flex items-center gap-1.5 p-1 bg-grace-sand/70 rounded-2xl border border-grace-border overflow-x-auto no-scrollbar">
        <button
          onClick={() => setAdminTab('orders')}
          className={`flex-1 py-2 px-2.5 rounded-xl text-xs font-semibold flex items-center justify-center gap-1 transition-all shrink-0 ${
            adminTab === 'orders'
              ? 'bg-grace-espresso text-white shadow-sm'
              : 'text-grace-muted hover:text-grace-espresso'
          }`}
        >
          <PackageSearch className="w-3.5 h-3.5" />
          <span>Заказы</span>
        </button>

        <button
          onClick={() => setAdminTab('products')}
          className={`flex-1 py-2 px-2.5 rounded-xl text-xs font-semibold flex items-center justify-center gap-1 transition-all shrink-0 ${
            adminTab === 'products'
              ? 'bg-grace-espresso text-white shadow-sm'
              : 'text-grace-muted hover:text-grace-espresso'
          }`}
        >
          <Boxes className="w-3.5 h-3.5" />
          <span>Каталог</span>
        </button>

        <button
          onClick={() => setAdminTab('security')}
          className={`flex-1 py-2 px-2.5 rounded-xl text-xs font-semibold flex items-center justify-center gap-1 transition-all shrink-0 ${
            adminTab === 'security'
              ? 'bg-grace-espresso text-white shadow-sm'
              : 'text-grace-muted hover:text-grace-espresso'
          }`}
        >
          <ShieldCheck className="w-3.5 h-3.5" />
          <span>Сотрудники</span>
        </button>
      </div>

      {/* Tab Content */}
      {adminTab === 'orders' && <OrderManager />}
      {adminTab === 'products' && <ProductManager />}
      {adminTab === 'security' && <AdminSecurityManager />}
    </div>
  );
};
