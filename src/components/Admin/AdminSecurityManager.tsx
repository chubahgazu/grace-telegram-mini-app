import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { ShieldCheck, UserPlus, Trash2, KeyRound, UserCheck } from 'lucide-react';

export const AdminSecurityManager: React.FC = () => {
  const {
    adminWhitelist,
    addAdminToWhitelist,
    removeAdminFromWhitelist,
    adminPin,
    updateAdminPin
  } = useApp();

  const [newAdminInput, setNewAdminInput] = useState('');
  const [newPinInput, setNewPinInput] = useState('');

  const handleAddAdmin = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newAdminInput.trim()) return;
    addAdminToWhitelist(newAdminInput);
    setNewAdminInput('');
  };

  const handleUpdatePin = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newPinInput.trim()) return;
    updateAdminPin(newPinInput);
    setNewPinInput('');
  };

  return (
    <div className="space-y-5">
      <div className="flex items-center justify-between">
        <h3 className="text-base font-serif font-bold text-grace-espresso flex items-center gap-2">
          <ShieldCheck className="w-5 h-5 text-grace-gold-dark" />
          <span>Безопасность и Доступ сотрудников</span>
        </h3>
      </div>

      {/* Allowed Employees List */}
      <div className="p-4 rounded-2xl bg-grace-card border border-grace-border space-y-3 shadow-grace-subtle text-xs">
        <label className="text-[10px] uppercase font-bold text-grace-muted block">
          Список сотрудников с доступом к админке:
        </label>

        <form onSubmit={handleAddAdmin} className="flex gap-2">
          <input
            type="text"
            placeholder="@username или Telegram ID..."
            value={newAdminInput}
            onChange={(e) => setNewAdminInput(e.target.value)}
            className="flex-1 px-3 py-2 bg-grace-bg rounded-xl border border-grace-border focus:border-grace-espresso focus:outline-none"
          />
          <button
            type="submit"
            className="px-3.5 py-2 rounded-xl bg-grace-espresso text-white font-semibold flex items-center gap-1 hover:bg-grace-gold-dark transition-colors shrink-0"
          >
            <UserPlus className="w-3.5 h-3.5" />
            <span>Добавить</span>
          </button>
        </form>

        <div className="space-y-2 pt-2">
          {adminWhitelist.map((item) => (
            <div
              key={item}
              className="flex items-center justify-between p-2.5 rounded-xl bg-grace-sand/60 border border-grace-border"
            >
              <div className="flex items-center gap-2">
                <UserCheck className="w-4 h-4 text-emerald-700" />
                <span className="font-mono font-bold text-grace-espresso">{item}</span>
              </div>

              {adminWhitelist.length > 1 && (
                <button
                  onClick={() => removeAdminFromWhitelist(item)}
                  className="p-1 text-grace-muted hover:text-red-600 transition-colors"
                  title="Удалить доступ"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Change PIN Code */}
      <div className="p-4 rounded-2xl bg-grace-card border border-grace-border space-y-3 shadow-grace-subtle text-xs">
        <div className="flex items-center justify-between">
          <label className="text-[10px] uppercase font-bold text-grace-muted block">
            Смена PIN-кода администратора:
          </label>
          <span className="text-[10px] font-mono text-grace-espresso">
            Текущий PIN: <strong className="font-bold">{adminPin}</strong>
          </span>
        </div>

        <form onSubmit={handleUpdatePin} className="flex gap-2">
          <input
            type="text"
            maxLength={8}
            placeholder="Новый PIN-код (например 8899)..."
            value={newPinInput}
            onChange={(e) => setNewPinInput(e.target.value)}
            className="flex-1 px-3 py-2 bg-grace-bg rounded-xl border border-grace-border focus:border-grace-espresso focus:outline-none font-mono"
          />
          <button
            type="submit"
            className="px-3.5 py-2 rounded-xl bg-grace-espresso text-white font-semibold flex items-center gap-1 hover:bg-grace-gold-dark transition-colors shrink-0"
          >
            <KeyRound className="w-3.5 h-3.5" />
            <span>Обновить PIN</span>
          </button>
        </form>
      </div>
    </div>
  );
};
