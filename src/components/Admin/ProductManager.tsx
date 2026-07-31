import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Product, Size } from '../../types';
import { EditProductModal } from './EditProductModal';
import { Plus, Edit2, Trash2, Layers, Sparkles } from 'lucide-react';
import { formatPrice } from '../../utils/formatters';

export const ProductManager: React.FC = () => {
  const { products, deleteProduct, addDrop } = useApp();

  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [isCreating, setIsCreating] = useState(false);
  const [isAddDropOpen, setIsAddDropOpen] = useState(false);

  // New Drop state
  const [dropTitle, setDropTitle] = useState('');
  const [dropCode, setDropCode] = useState('');
  const [dropBanner, setDropBanner] = useState('');

  const handleCreateDrop = (e: React.FormEvent) => {
    e.preventDefault();
    if (!dropTitle || !dropCode) return;

    addDrop({
      title: dropTitle,
      code: dropCode.toUpperCase(),
      isCurrent: true,
      bannerUrl: dropBanner || 'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&w=1200&q=80',
      description: 'Новый эксклюзивный дроп брендовой одежды Grace.',
      releaseDate: new Date().toISOString().split('T')[0]
    });

    setDropTitle('');
    setDropCode('');
    setDropBanner('');
    setIsAddDropOpen(false);
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-base font-serif font-bold text-grace-espresso">
          Каталог и Дропы
        </h3>
        <div className="flex items-center gap-2">
          <button
            onClick={() => setIsAddDropOpen(!isAddDropOpen)}
            className="px-2.5 py-1.5 rounded-xl bg-grace-sand border border-grace-border text-grace-espresso text-xs font-medium flex items-center gap-1 hover:bg-grace-sand-dark transition-colors"
          >
            <Layers className="w-3.5 h-3.5 text-grace-gold-dark" />
            <span>+ Дроп</span>
          </button>

          <button
            onClick={() => setIsCreating(true)}
            className="px-3 py-1.5 rounded-xl bg-grace-espresso text-white text-xs font-semibold flex items-center gap-1 hover:bg-grace-gold-dark transition-colors shadow-sm"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Товар</span>
          </button>
        </div>
      </div>

      {/* New Drop Drawer */}
      {isAddDropOpen && (
        <form onSubmit={handleCreateDrop} className="p-4 rounded-2xl bg-grace-card border border-grace-border space-y-3 animate-slide-up text-xs">
          <div className="flex items-center justify-between">
            <span className="font-bold font-serif text-grace-espresso">Создать новый Дроп</span>
            <Sparkles className="w-4 h-4 text-grace-gold" />
          </div>
          <div className="grid grid-cols-2 gap-2">
            <input
              type="text"
              required
              placeholder="Название дропа"
              value={dropTitle}
              onChange={(e) => setDropTitle(e.target.value)}
              className="px-3 py-2 bg-grace-bg rounded-xl border border-grace-border"
            />
            <input
              type="text"
              required
              placeholder="Код (например, WINTER-25)"
              value={dropCode}
              onChange={(e) => setDropCode(e.target.value)}
              className="px-3 py-2 bg-grace-bg rounded-xl border border-grace-border uppercase font-mono"
            />
          </div>
          <input
            type="url"
            placeholder="URL баннера (Unsplash)"
            value={dropBanner}
            onChange={(e) => setDropBanner(e.target.value)}
            className="w-full px-3 py-2 bg-grace-bg rounded-xl border border-grace-border"
          />
          <button type="submit" className="w-full py-2 bg-grace-espresso text-white rounded-xl font-bold">
            Опубликовать Дроп
          </button>
        </form>
      )}

      {/* Product List */}
      <div className="space-y-3">
        {products.map(product => (
          <div
            key={product.id}
            className="p-3.5 rounded-2xl bg-grace-card border border-grace-border flex items-center justify-between gap-3 shadow-grace-subtle"
          >
            <div className="flex items-center gap-3 min-w-0">
              <img
                src={product.images[0]}
                alt={product.title}
                className="w-12 h-14 object-cover rounded-xl bg-grace-sand shrink-0"
              />
              <div className="min-w-0">
                <span className="text-[9px] uppercase font-bold text-grace-gold-dark tracking-wider block">
                  {product.category}
                </span>
                <h4 className="text-xs font-semibold text-grace-espresso truncate">
                  {product.title}
                </h4>
                <p className="text-xs font-mono font-bold text-grace-espresso">
                  {formatPrice(product.price)}
                </p>

                {/* Stock Chips */}
                <div className="flex items-center gap-1 mt-1 text-[9px] font-mono">
                  {(['S', 'M', 'L', 'XL'] as Size[]).map(sz => (
                    <span
                      key={sz}
                      className={`px-1 rounded ${product.stock[sz] > 0 ? 'bg-grace-sand text-grace-espresso' : 'bg-red-100 text-red-700'}`}
                    >
                      {sz}:{product.stock[sz]}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            <div className="flex items-center gap-1.5 shrink-0">
              <button
                onClick={() => setEditingProduct(product)}
                className="p-2 rounded-xl bg-grace-sand hover:bg-grace-sand-dark text-grace-espresso transition-colors"
                title="Редактировать"
              >
                <Edit2 className="w-4 h-4" />
              </button>
              <button
                onClick={() => deleteProduct(product.id)}
                className="p-2 rounded-xl bg-red-50 hover:bg-red-100 text-red-600 transition-colors"
                title="Удалить"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Edit / Create Modal */}
      {(isCreating || editingProduct) && (
        <EditProductModal
          product={editingProduct}
          onClose={() => {
            setIsCreating(false);
            setEditingProduct(null);
          }}
        />
      )}
    </div>
  );
};
