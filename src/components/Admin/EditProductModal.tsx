import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Product, Size, Category } from '../../types';
import { X } from 'lucide-react';

interface EditProductModalProps {
  product?: Product | null;
  onClose: () => void;
}

export const EditProductModal: React.FC<EditProductModalProps> = ({ product, onClose }) => {
  const { addProduct, updateProduct, drops } = useApp();

  const [title, setTitle] = useState(product?.title || '');
  const [price, setPrice] = useState(product?.price || 15000);
  const [dropId, setDropId] = useState(product?.dropId || drops[0]?.id || 'drop-1');
  const [category, setCategory] = useState<Category>(product?.category || 'Верхняя одежда');
  const [description, setDescription] = useState(product?.description || '');
  const [composition, setComposition] = useState(product?.composition || '');
  const [imageUrl, setImageUrl] = useState(product?.images[0] || '');
  const [stock, setStock] = useState<Record<Size, number>>(
    product?.stock || { S: 5, M: 5, L: 5, XL: 2 }
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const productPayload = {
      title,
      price: Number(price),
      dropId,
      category,
      description,
      composition,
      images: [imageUrl || 'https://images.unsplash.com/photo-1539533018447-63fcce2678e3?auto=format&fit=crop&w=800&q=80'],
      stock,
      isFeatured: true
    };

    if (product) {
      updateProduct(product.id, productPayload);
    } else {
      addProduct(productPayload);
    }

    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-grace-espresso/70 backdrop-blur-sm animate-fade-in p-0 sm:p-4">
      <div className="relative w-full max-w-md max-h-[90vh] overflow-y-auto bg-grace-bg rounded-t-3xl sm:rounded-3xl shadow-grace-floating flex flex-col no-scrollbar">
        {/* Header */}
        <div className="p-4 border-b border-grace-border/80 flex items-center justify-between sticky top-0 bg-grace-bg z-10">
          <h2 className="text-lg font-serif font-bold text-grace-espresso">
            {product ? 'Редактировать товар' : 'Новый товар в каталог'}
          </h2>
          <button onClick={onClose} className="p-2 rounded-full hover:bg-grace-sand text-grace-espresso">
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-4 space-y-4 text-xs">
          {/* Title & Drop */}
          <div>
            <label className="text-[10px] uppercase font-bold text-grace-muted block mb-1">
              Название модели:
            </label>
            <input
              type="text"
              required
              placeholder="например, Пальто Cashmere Wool Coat"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full px-3 py-2 text-xs bg-grace-card rounded-xl border border-grace-border focus:border-grace-espresso focus:outline-none"
            />
          </div>

          <div className="grid grid-cols-2 gap-2">
            <div>
              <label className="text-[10px] uppercase font-bold text-grace-muted block mb-1">
                Цена (₽):
              </label>
              <input
                type="number"
                required
                value={price}
                onChange={(e) => setPrice(Number(e.target.value))}
                className="w-full px-3 py-2 text-xs bg-grace-card rounded-xl border border-grace-border focus:border-grace-espresso focus:outline-none font-mono"
              />
            </div>

            <div>
              <label className="text-[10px] uppercase font-bold text-grace-muted block mb-1">
                Сезонный Дроп:
              </label>
              <select
                value={dropId}
                onChange={(e) => setDropId(e.target.value)}
                className="w-full px-3 py-2 text-xs bg-grace-card rounded-xl border border-grace-border focus:border-grace-espresso focus:outline-none"
              >
                {drops.map(d => (
                  <option key={d.id} value={d.id}>{d.title}</option>
                ))}
              </select>
            </div>
          </div>

          <div>
            <label className="text-[10px] uppercase font-bold text-grace-muted block mb-1">
              Категория:
            </label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value as Category)}
              className="w-full px-3 py-2 text-xs bg-grace-card rounded-xl border border-grace-border focus:border-grace-espresso focus:outline-none"
            >
              <option value="Верхняя одежда">Верхняя одежда</option>
              <option value="Кашемир и трикотаж">Кашемир и трикотаж</option>
              <option value="Худи и рубашки">Худи и рубашки</option>
              <option value="Брюки">Брюки</option>
              <option value="Аксессуары">Аксессуары</option>
            </select>
          </div>

          {/* Description & Composition */}
          <div>
            <label className="text-[10px] uppercase font-bold text-grace-muted block mb-1">
              Описание:
            </label>
            <textarea
              rows={2}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full px-3 py-2 text-xs bg-grace-card rounded-xl border border-grace-border focus:border-grace-espresso focus:outline-none"
            />
          </div>

          <div>
            <label className="text-[10px] uppercase font-bold text-grace-muted block mb-1">
              Состав и ткани:
            </label>
            <input
              type="text"
              placeholder="например, 80% Virgin Wool, 20% Cashmere"
              value={composition}
              onChange={(e) => setComposition(e.target.value)}
              className="w-full px-3 py-2 text-xs bg-grace-card rounded-xl border border-grace-border focus:border-grace-espresso focus:outline-none"
            />
          </div>

          {/* Image URL */}
          <div>
            <label className="text-[10px] uppercase font-bold text-grace-muted block mb-1">
              Ссылка на фото (Unsplash/CDN URL):
            </label>
            <input
              type="url"
              required
              value={imageUrl}
              onChange={(e) => setImageUrl(e.target.value)}
              className="w-full px-3 py-2 text-xs bg-grace-card rounded-xl border border-grace-border focus:border-grace-espresso focus:outline-none"
            />
          </div>

          {/* Size Inventory Matrix */}
          <div>
            <label className="text-[10px] uppercase font-bold text-grace-muted block mb-2">
              Остатки по размерам (Matrix S/M/L/XL):
            </label>

            <div className="grid grid-cols-4 gap-2">
              {(['S', 'M', 'L', 'XL'] as Size[]).map(sz => (
                <div key={sz} className="p-2 rounded-xl bg-grace-sand/60 border border-grace-border text-center">
                  <span className="font-mono font-bold block text-grace-espresso mb-1">{sz}</span>
                  <input
                    type="number"
                    min={0}
                    value={stock[sz]}
                    onChange={(e) => setStock({ ...stock, [sz]: Math.max(0, Number(e.target.value)) })}
                    className="w-full text-center py-1 text-xs font-mono bg-grace-card rounded border border-grace-border"
                  />
                </div>
              ))}
            </div>
          </div>

          <button
            type="submit"
            className="w-full py-3.5 px-4 rounded-2xl bg-grace-espresso text-white font-semibold text-xs uppercase tracking-widest hover:bg-grace-gold-dark transition-all"
          >
            {product ? 'Сохранить изменения' : 'Создать товар'}
          </button>
        </form>
      </div>
    </div>
  );
};
