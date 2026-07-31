import React, { useEffect } from 'react';
import { AppProvider, useApp } from './context/AppContext';
import { initTelegramSDK } from './utils/telegram';
import { Navbar } from './components/Navbar';
import { BottomNav } from './components/BottomNav';
import { CatalogPage } from './pages/CatalogPage';
import { WishlistPage } from './pages/WishlistPage';
import { ProfileOrdersPage } from './pages/ProfileOrdersPage';
import { AdminPage } from './pages/AdminPage';
import { ProductModal } from './components/ProductModal';
import { CartDrawer } from './components/CartDrawer';
import { CheckoutModal } from './components/CheckoutModal';
import { Toast } from './components/Toast';
import { AdminPinModal } from './components/Admin/AdminPinModal';

const MainContent: React.FC = () => {
  const { activeTab } = useApp();

  useEffect(() => {
    initTelegramSDK();
  }, []);

  return (
    <div className="min-h-screen bg-grace-bg text-grace-espresso font-sans selection:bg-grace-gold selection:text-white flex flex-col">
      {/* Top Header */}
      <Navbar />

      {/* Main Body */}
      <main className="flex-1 max-w-md w-full mx-auto px-4 pt-4">
        {activeTab === 'catalog' && <CatalogPage />}
        {activeTab === 'wishlist' && <WishlistPage />}
        {activeTab === 'orders' && <ProfileOrdersPage />}
        {activeTab === 'admin' && <AdminPage />}
      </main>

      {/* Bottom Floating Navigation Bar */}
      <BottomNav />

      {/* Global Modals & Drawers */}
      <ProductModal />
      <CartDrawer />
      <CheckoutModal />
      <AdminPinModal />
      <Toast />
    </div>
  );
};

export function App() {
  return (
    <AppProvider>
      <MainContent />
    </AppProvider>
  );
}

export default App;
