import React, { createContext, useContext, useState, useEffect } from 'react';
import { User, SeasonDrop, Product, CartItem, Order, OrderStatus, Size, ToastNotification, Role } from '../types';
import { INITIAL_DROPS, INITIAL_PRODUCTS, INITIAL_ORDERS } from '../mock/initialData';
import { getTelegramUser, hapticImpact, hapticNotification, hapticSelection } from '../utils/telegram';

interface AppContextType {
  user: User;
  setUserRole: (role: Role) => void;
  
  // Admin Authorization & Security
  adminWhitelist: string[];
  adminPin: string;
  isAdminAuthorized: boolean;
  verifyAdminPin: (pin: string) => boolean;
  addAdminToWhitelist: (identifier: string) => void;
  removeAdminFromWhitelist: (identifier: string) => void;
  updateAdminPin: (newPin: string) => void;
  isPinModalOpen: boolean;
  setIsPinModalOpen: (open: boolean) => void;

  drops: SeasonDrop[];
  selectedDropId: string;
  setSelectedDropId: (id: string) => void;
  addDrop: (drop: Omit<SeasonDrop, 'id'>) => void;

  products: Product[];
  addProduct: (product: Omit<Product, 'id' | 'createdAt'>) => void;
  updateProduct: (id: string, updated: Partial<Product>) => void;
  deleteProduct: (id: string) => void;

  wishlist: string[];
  toggleWishlist: (productId: string) => void;
  isInWishlist: (productId: string) => boolean;

  cart: CartItem[];
  addToCart: (product: Product, size: Size) => void;
  removeFromCart: (cartItemId: string) => void;
  updateCartQuantity: (cartItemId: string, delta: number) => void;
  clearCart: () => void;
  cartTotal: number;

  orders: Order[];
  createOrder: (orderData: Omit<Order, 'id' | 'orderNumber' | 'createdAt' | 'updatedAt' | 'userId' | 'telegramId' | 'status'>) => Order;
  updateOrderStatus: (orderId: string, status: OrderStatus, trackingNumber?: string) => void;

  selectedProduct: Product | null;
  setSelectedProduct: (product: Product | null) => void;

  isCartOpen: boolean;
  setIsCartOpen: (open: boolean) => void;

  isCheckoutOpen: boolean;
  setIsCheckoutOpen: (open: boolean) => void;

  activeTab: 'catalog' | 'wishlist' | 'orders' | 'admin';
  setActiveTab: (tab: 'catalog' | 'wishlist' | 'orders' | 'admin') => void;

  toast: ToastNotification | null;
  showToast: (message: string, type?: 'success' | 'error' | 'info') => void;

  // Search & Filter
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  selectedCategory: string;
  setSelectedCategory: (category: string) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

// Default Admin Telegram usernames & numeric IDs
const INITIAL_ADMIN_WHITELIST = ['ibrahimmagomaev', 'grace_admin'];

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const tgUser = getTelegramUser();

  // Admin Whitelist State
  const [adminWhitelist, setAdminWhitelist] = useState<string[]>(() => {
    const saved = localStorage.getItem('grace_admin_whitelist');
    return saved ? JSON.parse(saved) : INITIAL_ADMIN_WHITELIST;
  });

  // Check if Telegram user is in Whitelist
  const isWhitelisted = adminWhitelist.some(item => {
    const cleanItem = item.toLowerCase().replace('@', '');
    const userTgId = String(tgUser.id).toLowerCase();
    const userUsername = tgUser.username ? tgUser.username.toLowerCase() : '';
    return cleanItem === userTgId || (userUsername && cleanItem === userUsername);
  });

  const isAdminAuthorized = isWhitelisted;

  const [user, setUser] = useState<User>(() => {
    const saved = localStorage.getItem('grace_user');
    const parsed = saved ? JSON.parse(saved) : null;
    return {
      id: 'usr-' + tgUser.id,
      telegramId: tgUser.id,
      username: tgUser.username,
      firstName: tgUser.first_name,
      lastName: tgUser.last_name,
      photoUrl: tgUser.photo_url,
      // Strictly enforce customer role for non-whitelisted users!
      role: isWhitelisted && parsed?.role === 'admin' ? 'admin' : 'customer',
      createdAt: new Date().toISOString()
    };
  });

  const [adminPin, setAdminPinState] = useState<string>(() => {
    const saved = localStorage.getItem('grace_admin_pin');
    return saved || '7788';
  });

  const [isPinModalOpen, setIsPinModalOpen] = useState(false);

  const [drops, setDrops] = useState<SeasonDrop[]>(() => {
    const savedVer = localStorage.getItem('grace_lang_version');
    if (savedVer !== 'v3_security') {
      localStorage.setItem('grace_lang_version', 'v3_security');
      localStorage.setItem('grace_drops', JSON.stringify(INITIAL_DROPS));
      localStorage.setItem('grace_products', JSON.stringify(INITIAL_PRODUCTS));
      localStorage.setItem('grace_orders', JSON.stringify(INITIAL_ORDERS));
      return INITIAL_DROPS;
    }
    const saved = localStorage.getItem('grace_drops');
    return saved ? JSON.parse(saved) : INITIAL_DROPS;
  });

  const [selectedDropId, setSelectedDropId] = useState<string>(() => {
    const current = drops.find(d => d.isCurrent);
    return current ? current.id : drops[0]?.id || 'drop-1';
  });

  const [products, setProducts] = useState<Product[]>(() => {
    const savedVer = localStorage.getItem('grace_lang_version');
    if (savedVer !== 'v3_security') {
      return INITIAL_PRODUCTS;
    }
    const saved = localStorage.getItem('grace_products');
    return saved ? JSON.parse(saved) : INITIAL_PRODUCTS;
  });

  const [wishlist, setWishlist] = useState<string[]>(() => {
    const saved = localStorage.getItem('grace_wishlist');
    return saved ? JSON.parse(saved) : ['prod-1', 'prod-2'];
  });

  const [cart, setCart] = useState<CartItem[]>(() => {
    const saved = localStorage.getItem('grace_cart');
    return saved ? JSON.parse(saved) : [];
  });

  const [orders, setOrders] = useState<Order[]>(() => {
    const saved = localStorage.getItem('grace_orders');
    return saved ? JSON.parse(saved) : INITIAL_ORDERS;
  });

  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<'catalog' | 'wishlist' | 'orders' | 'admin'>('catalog');
  const [toast, setToast] = useState<ToastNotification | null>(null);

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');

  // Strict Tab Safety: Redirect to catalog if non-whitelisted user tries to access admin tab
  useEffect(() => {
    if (!isAdminAuthorized && activeTab === 'admin') {
      setActiveTab('catalog');
    }
  }, [isAdminAuthorized, activeTab]);

  // Persistence Sync
  useEffect(() => {
    localStorage.setItem('grace_user', JSON.stringify(user));
  }, [user]);

  useEffect(() => {
    localStorage.setItem('grace_admin_whitelist', JSON.stringify(adminWhitelist));
  }, [adminWhitelist]);

  useEffect(() => {
    localStorage.setItem('grace_admin_pin', adminPin);
  }, [adminPin]);

  useEffect(() => {
    localStorage.setItem('grace_drops', JSON.stringify(drops));
  }, [drops]);

  useEffect(() => {
    localStorage.setItem('grace_products', JSON.stringify(products));
  }, [products]);

  useEffect(() => {
    localStorage.setItem('grace_wishlist', JSON.stringify(wishlist));
  }, [wishlist]);

  useEffect(() => {
    localStorage.setItem('grace_cart', JSON.stringify(cart));
  }, [cart]);

  useEffect(() => {
    localStorage.setItem('grace_orders', JSON.stringify(orders));
  }, [orders]);

  const showToast = (message: string, type: 'success' | 'error' | 'info' = 'success') => {
    const id = Math.random().toString();
    setToast({ id, type, message });
    setTimeout(() => setToast(null), 3000);
  };

  const setUserRole = (role: Role) => {
    if (role === 'admin' && !isAdminAuthorized) {
      showToast('Доступ запрещен. Ваш Telegram ID не в списке администраторов.', 'error');
      return;
    }
    hapticImpact('medium');
    setUser(prev => ({ ...prev, role }));
    showToast(`Режим изменен: ${role === 'admin' ? 'Администратор' : 'Покупатель'}`, 'info');
  };

  const verifyAdminPin = (pin: string): boolean => {
    if (pin === adminPin) {
      hapticNotification('success');
      // Add current Telegram user ID to Whitelist!
      const currentTgId = String(tgUser.id);
      if (!adminWhitelist.includes(currentTgId)) {
        setAdminWhitelist(prev => [...prev, currentTgId]);
      }
      setUser(prev => ({ ...prev, role: 'admin' }));
      setIsPinModalOpen(false);
      showToast('Ваш Telegram ID внесен в список администраторов!', 'success');
      return true;
    } else {
      hapticNotification('error');
      showToast('Неверный PIN-код администратора', 'error');
      return false;
    }
  };

  const addAdminToWhitelist = (identifier: string) => {
    const clean = identifier.trim().toLowerCase().replace('@', '');
    if (!clean) return;
    if (adminWhitelist.some(i => i.toLowerCase().replace('@', '') === clean)) {
      showToast('Сотрудник уже в списке доступа', 'info');
      return;
    }
    setAdminWhitelist(prev => [...prev, clean]);
    showToast(`Сотрудник @${clean} добавлен в список администраторов`, 'success');
  };

  const removeAdminFromWhitelist = (identifier: string) => {
    setAdminWhitelist(prev => prev.filter(i => i.toLowerCase().replace('@', '') !== identifier.toLowerCase().replace('@', '')));
    showToast(`Сотрудник ${identifier} удален из списка доступа`, 'info');
  };

  const updateAdminPin = (newPin: string) => {
    if (newPin.length < 4) {
      showToast('PIN-код должен быть не менее 4 цифр', 'error');
      return;
    }
    setAdminPinState(newPin);
    showToast('Новый PIN-код сохранен', 'success');
  };

  const addDrop = (newDrop: Omit<SeasonDrop, 'id'>) => {
    const id = 'drop-' + (drops.length + 1);
    const drop: SeasonDrop = { ...newDrop, id };
    setDrops(prev => [drop, ...prev]);
    showToast('Новый дроп успешно создан!', 'success');
  };

  const addProduct = (newProd: Omit<Product, 'id' | 'createdAt'>) => {
    const id = 'prod-' + (products.length + 1);
    const product: Product = {
      ...newProd,
      id,
      createdAt: new Date().toISOString()
    };
    setProducts(prev => [product, ...prev]);
    showToast('Товар добавлен в каталог!', 'success');
  };

  const updateProduct = (id: string, updated: Partial<Product>) => {
    setProducts(prev => prev.map(p => p.id === id ? { ...p, ...updated } : p));
    showToast('Карточка товара обновлена', 'info');
  };

  const deleteProduct = (id: string) => {
    setProducts(prev => prev.filter(p => p.id !== id));
    showToast('Товар удален из каталога', 'info');
  };

  const toggleWishlist = (productId: string) => {
    hapticSelection();
    setWishlist(prev => {
      const exists = prev.includes(productId);
      if (exists) {
        showToast('Удалено из Избранного', 'info');
        return prev.filter(id => id !== productId);
      } else {
        showToast('Добавлено в Избранное', 'success');
        return [...prev, productId];
      }
    });
  };

  const isInWishlist = (productId: string) => wishlist.includes(productId);

  const addToCart = (product: Product, size: Size) => {
    if (product.stock[size] <= 0) {
      hapticNotification('error');
      showToast(`Размер ${size} временно распродан!`, 'error');
      return;
    }

    hapticImpact('medium');
    const cartItemId = `${product.id}-${size}`;

    setCart(prev => {
      const existing = prev.find(item => item.id === cartItemId);
      if (existing) {
        if (existing.quantity >= product.stock[size]) {
          showToast(`Достигнут максимум доступных единиц товара!`, 'info');
          return prev;
        }
        return prev.map(item =>
          item.id === cartItemId ? { ...item, quantity: item.quantity + 1 } : item
        );
      } else {
        return [
          ...prev,
          {
            id: cartItemId,
            productId: product.id,
            productTitle: product.title,
            image: product.images[0] || '',
            size,
            price: product.price,
            quantity: 1
          }
        ];
      }
    });

    showToast(`Товар добавлен в корзину (Размер ${size})`, 'success');
  };

  const removeFromCart = (cartItemId: string) => {
    hapticSelection();
    setCart(prev => prev.filter(item => item.id !== cartItemId));
    showToast('Товар удален из корзины', 'info');
  };

  const updateCartQuantity = (cartItemId: string, delta: number) => {
    hapticSelection();
    setCart(prev => {
      return prev.map(item => {
        if (item.id === cartItemId) {
          const newQty = item.quantity + delta;
          if (newQty <= 0) return null;
          
          const product = products.find(p => p.id === item.productId);
          if (product && newQty > product.stock[item.size]) {
            showToast(`Максимум ${product.stock[item.size]} шт. в наличии`, 'info');
            return item;
          }
          return { ...item, quantity: newQty };
        }
        return item;
      }).filter(Boolean) as CartItem[];
    });
  };

  const clearCart = () => setCart([]);

  const cartTotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const createOrder = (orderData: Omit<Order, 'id' | 'orderNumber' | 'createdAt' | 'updatedAt' | 'userId' | 'telegramId' | 'status'>): Order => {
    hapticNotification('success');
    const orderNumber = `GR-${Math.floor(1000 + Math.random() * 9000)}`;
    const newOrder: Order = {
      ...orderData,
      id: 'ord-' + Date.now(),
      orderNumber,
      userId: user.id,
      telegramId: user.telegramId,
      status: 'paid',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };

    setProducts(prevProducts => {
      return prevProducts.map(prod => {
        const orderedItem = orderData.items.find(i => i.productId === prod.id);
        if (orderedItem) {
          const currentStock = prod.stock[orderedItem.size] || 0;
          const newStock = Math.max(0, currentStock - orderedItem.quantity);
          return {
            ...prod,
            stock: {
              ...prod.stock,
              [orderedItem.size]: newStock
            }
          };
        }
        return prod;
      });
    });

    setOrders(prev => [newOrder, ...prev]);
    clearCart();
    setIsCheckoutOpen(false);
    setIsCartOpen(false);
    setActiveTab('orders');
    showToast(`Заказ №${orderNumber} успешно оформлен!`, 'success');
    return newOrder;
  };

  const updateOrderStatus = (orderId: string, status: OrderStatus, trackingNumber?: string) => {
    hapticImpact('medium');
    setOrders(prev => prev.map(o => {
      if (o.id === orderId) {
        return {
          ...o,
          status,
          trackingNumber: trackingNumber !== undefined ? trackingNumber : o.trackingNumber,
          updatedAt: new Date().toISOString()
        };
      }
      return o;
    }));
    showToast(`Статус заказа обновлен: ${status}`, 'info');
  };

  return (
    <AppContext.Provider
      value={{
        user,
        setUserRole,
        adminWhitelist,
        adminPin,
        isAdminAuthorized,
        verifyAdminPin,
        addAdminToWhitelist,
        removeAdminFromWhitelist,
        updateAdminPin,
        isPinModalOpen,
        setIsPinModalOpen,
        drops,
        selectedDropId,
        setSelectedDropId,
        addDrop,
        products,
        addProduct,
        updateProduct,
        deleteProduct,
        wishlist,
        toggleWishlist,
        isInWishlist,
        cart,
        addToCart,
        removeFromCart,
        updateCartQuantity,
        clearCart,
        cartTotal,
        orders,
        createOrder,
        updateOrderStatus,
        selectedProduct,
        setSelectedProduct,
        isCartOpen,
        setIsCartOpen,
        isCheckoutOpen,
        setIsCheckoutOpen,
        activeTab,
        setActiveTab,
        toast,
        showToast,
        searchQuery,
        setSearchQuery,
        selectedCategory,
        setSelectedCategory
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
