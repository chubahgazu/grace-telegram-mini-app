import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { DeliveryMethod, PaymentMethod } from '../types';
import { X, Truck, CreditCard, ShieldCheck, MapPin, Phone, User as UserIcon } from 'lucide-react';
import { formatPrice } from '../utils/formatters';

export const CheckoutModal: React.FC = () => {
  const { isCheckoutOpen, setIsCheckoutOpen, cart, cartTotal, createOrder, user } = useApp();

  const [deliveryMethod, setDeliveryMethod] = useState<DeliveryMethod>('cdek_pvz');
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>('sbp');
  const [recipientName, setRecipientName] = useState(
    user.firstName + (user.lastName ? ` ${user.lastName}` : '')
  );
  const [recipientPhone, setRecipientPhone] = useState('+7 (999) 123-45-67');
  const [deliveryAddress, setDeliveryAddress] = useState('г. Москва, ул. Тверская, д. 12 (ПВЗ СДЭК MSK41)');
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!isCheckoutOpen) return null;

  const deliveryCostMap: Record<DeliveryMethod, number> = {
    cdek_pvz: 450,
    cdek_courier: 650,
    express: 950
  };

  const deliveryFee = deliveryCostMap[deliveryMethod];
  const finalTotal = cartTotal + deliveryFee;

  const handleSubmitOrder = (e: React.FormEvent) => {
    e.preventDefault();
    if (cart.length === 0) return;

    setIsSubmitting(true);
    setTimeout(() => {
      createOrder({
        items: cart,
        totalAmount: finalTotal,
        paymentMethod,
        deliveryMethod,
        deliveryAddress,
        recipientName,
        recipientPhone
      });
      setIsSubmitting(false);
    }, 800);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-grace-espresso/75 backdrop-blur-sm animate-fade-in p-0 sm:p-4">
      <div className="relative w-full max-w-md max-h-[92vh] overflow-y-auto bg-grace-bg rounded-t-3xl sm:rounded-3xl shadow-grace-floating flex flex-col no-scrollbar">
        {/* Header */}
        <div className="p-4 border-b border-grace-border/80 flex items-center justify-between sticky top-0 bg-grace-bg z-10">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-5 h-5 text-grace-gold-dark" />
            <h2 className="text-lg font-serif font-bold text-grace-espresso">
              Оформление заказа
            </h2>
          </div>
          <button
            onClick={() => setIsCheckoutOpen(false)}
            className="p-2 rounded-full hover:bg-grace-sand text-grace-espresso transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmitOrder} className="p-4 space-y-5 flex-1">
          {/* Recipient Details Section */}
          <div className="space-y-3">
            <label className="text-[11px] font-semibold uppercase tracking-widest text-grace-muted block">
              1. Данные получателя
            </label>

            <div className="space-y-2">
              <div className="relative">
                <UserIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-grace-muted" />
                <input
                  type="text"
                  required
                  placeholder="ФИО Получателя"
                  value={recipientName}
                  onChange={(e) => setRecipientName(e.target.value)}
                  className="w-full pl-9 pr-3 py-2.5 text-xs bg-grace-card rounded-xl border border-grace-border focus:border-grace-espresso focus:outline-none text-grace-espresso"
                />
              </div>

              <div className="relative">
                <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-grace-muted" />
                <input
                  type="tel"
                  required
                  placeholder="+7 (999) 000-00-00"
                  value={recipientPhone}
                  onChange={(e) => setRecipientPhone(e.target.value)}
                  className="w-full pl-9 pr-3 py-2.5 text-xs bg-grace-card rounded-xl border border-grace-border focus:border-grace-espresso focus:outline-none text-grace-espresso"
                />
              </div>
            </div>
          </div>

          {/* Delivery Method Selection */}
          <div className="space-y-3">
            <label className="text-[11px] font-semibold uppercase tracking-widest text-grace-muted block">
              2. Способ доставки
            </label>

            <div className="space-y-2">
              {[
                { id: 'cdek_pvz', title: 'СДЭК — Пункт выдачи (ПВЗ)', cost: 450, desc: '2-4 дня по России' },
                { id: 'cdek_courier', title: 'СДЭК — Курьером до двери', cost: 650, desc: '1-3 дня до двери' },
                { id: 'express', title: 'Экспресс-Курьер (День в день)', cost: 950, desc: 'По Москве и МО' }
              ].map((method) => {
                const isSelected = deliveryMethod === method.id;
                return (
                  <div
                    key={method.id}
                    onClick={() => setDeliveryMethod(method.id as DeliveryMethod)}
                    className={`p-3 rounded-xl border flex items-center justify-between cursor-pointer transition-all ${
                      isSelected
                        ? 'border-grace-espresso bg-grace-sand/60 shadow-sm'
                        : 'border-grace-border bg-grace-card hover:border-grace-espresso/30'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div className={`p-2 rounded-full ${isSelected ? 'bg-grace-espresso text-white' : 'bg-grace-sand text-grace-muted'}`}>
                        <Truck className="w-4 h-4" />
                      </div>
                      <div>
                        <h4 className="text-xs font-semibold text-grace-espresso">{method.title}</h4>
                        <p className="text-[10px] text-grace-muted font-light">{method.desc}</p>
                      </div>
                    </div>
                    <span className="text-xs font-bold font-mono text-grace-espresso">
                      {formatPrice(method.cost)}
                    </span>
                  </div>
                );
              })}
            </div>

            {/* Address Input */}
            <div className="relative pt-1">
              <MapPin className="absolute left-3 top-4 w-4 h-4 text-grace-muted" />
              <textarea
                rows={2}
                required
                placeholder="Адрес пункта выдачи СДЭК или домашний адрес..."
                value={deliveryAddress}
                onChange={(e) => setDeliveryAddress(e.target.value)}
                className="w-full pl-9 pr-3 py-2 text-xs bg-grace-card rounded-xl border border-grace-border focus:border-grace-espresso focus:outline-none text-grace-espresso resize-none"
              />
            </div>
          </div>

          {/* Payment Method Selection */}
          <div className="space-y-3">
            <label className="text-[11px] font-semibold uppercase tracking-widest text-grace-muted block">
              3. Способ оплаты
            </label>

            <div className="grid grid-cols-2 gap-2">
              {[
                { id: 'sbp', label: 'СБП', desc: 'Быстрый перевод' },
                { id: 'tbank', label: 'T-Pay / Т-Банк', desc: 'Приложение Т-Банк' },
                { id: 'sber', label: 'SberPay / Сбер', desc: 'СберОнлайн' },
                { id: 'card', label: 'Банковская карта', desc: 'Visa / MC / МИР' }
              ].map((pm) => {
                const isSelected = paymentMethod === pm.id;
                return (
                  <button
                    type="button"
                    key={pm.id}
                    onClick={() => setPaymentMethod(pm.id as PaymentMethod)}
                    className={`p-3 rounded-xl border text-left transition-all ${
                      isSelected
                        ? 'border-grace-espresso bg-grace-espresso text-white shadow-sm'
                        : 'border-grace-border bg-grace-card text-grace-espresso hover:border-grace-espresso/30'
                    }`}
                  >
                    <div className="flex items-center gap-1.5 mb-1">
                      <CreditCard className={`w-3.5 h-3.5 ${isSelected ? 'text-grace-gold' : 'text-grace-muted'}`} />
                      <span className="text-xs font-bold">{pm.label}</span>
                    </div>
                    <span className={`text-[9px] block ${isSelected ? 'text-grace-sand/80' : 'text-grace-muted'}`}>
                      {pm.desc}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Price Breakdown */}
          <div className="p-3.5 rounded-2xl bg-grace-sand/60 border border-grace-border space-y-1.5 text-xs">
            <div className="flex justify-between text-grace-muted">
              <span>Товары ({cart.length} шт.):</span>
              <span className="font-mono">{formatPrice(cartTotal)}</span>
            </div>
            <div className="flex justify-between text-grace-muted">
              <span>Доставка:</span>
              <span className="font-mono">{formatPrice(deliveryFee)}</span>
            </div>
            <div className="flex justify-between font-bold text-grace-espresso text-sm pt-2 border-t border-grace-border">
              <span>Итого к оплате:</span>
              <span className="font-mono text-base">{formatPrice(finalTotal)}</span>
            </div>
          </div>

          {/* Submit Action */}
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full py-4 px-4 rounded-2xl bg-grace-espresso text-white font-semibold text-xs uppercase tracking-widest flex items-center justify-center gap-2 shadow-grace-floating hover:bg-grace-gold-dark transition-all active:scale-[0.98] disabled:opacity-50"
          >
            {isSubmitting ? (
              <span className="animate-pulse">Обработка платежа...</span>
            ) : (
              <span>Оплатить {formatPrice(finalTotal)}</span>
            )}
          </button>
        </form>
      </div>
    </div>
  );
};
