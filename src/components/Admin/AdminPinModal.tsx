import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Lock, X, KeyRound } from 'lucide-react';

export const AdminPinModal: React.FC = () => {
  const { isPinModalOpen, setIsPinModalOpen, verifyAdminPin } = useApp();
  const [pinInput, setPinInput] = useState('');

  if (!isPinModalOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (verifyAdminPin(pinInput)) {
      setPinInput('');
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-grace-espresso/80 backdrop-blur-md animate-fade-in p-4">
      <div className="relative w-full max-w-xs bg-grace-bg rounded-3xl p-6 shadow-grace-floating animate-slide-up border border-grace-border text-center">
        <button
          onClick={() => setIsPinModalOpen(false)}
          className="absolute top-4 right-4 p-1.5 rounded-full hover:bg-grace-sand text-grace-espresso transition-colors"
        >
          <X className="w-4 h-4" />
        </button>

        <div className="w-12 h-12 rounded-full bg-grace-espresso text-grace-gold flex items-center justify-center mx-auto mb-3 shadow-sm">
          <Lock className="w-6 h-6" />
        </div>

        <h3 className="text-lg font-serif font-bold text-grace-espresso mb-1">
          Вход для сотрудников
        </h3>
        <p className="text-xs text-grace-muted font-light mb-4">
          Доступ к панели управления защищен. Введите PIN-код администратора:
        </p>

        <form onSubmit={handleSubmit} className="space-y-3">
          <div className="relative">
            <KeyRound className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-grace-muted" />
            <input
              type="password"
              maxLength={8}
              required
              autoFocus
              placeholder="••••"
              value={pinInput}
              onChange={(e) => setPinInput(e.target.value)}
              className="w-full text-center tracking-widest text-lg font-mono font-bold py-2.5 pl-8 pr-4 bg-grace-card rounded-2xl border border-grace-border focus:border-grace-espresso focus:outline-none text-grace-espresso"
            />
          </div>

          <button
            type="submit"
            className="w-full py-3 rounded-full bg-grace-espresso text-white text-xs font-semibold uppercase tracking-widest hover:bg-grace-gold-dark transition-all shadow-sm"
          >
            Войти в Панель
          </button>
        </form>

        <p className="text-[10px] text-grace-muted/70 mt-4">
          По умолчанию PIN: <span className="font-mono font-bold text-grace-espresso">7788</span> (можно изменить в настройках)
        </p>
      </div>
    </div>
  );
};
