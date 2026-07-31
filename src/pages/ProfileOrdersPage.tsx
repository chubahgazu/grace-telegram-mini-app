import React from 'react';
import { useApp } from '../context/AppContext';
import { OrderStatusBadge } from '../components/OrderStatusBadge';
import { formatPrice, formatDate, getDeliveryMethodLabel } from '../utils/formatters';
import { PackageCheck, Copy, Check } from 'lucide-react';

export const ProfileOrdersPage: React.FC = () => {
  const { user, orders, showToast } = useApp();
  const [copiedTrack, setCopiedTrack] = React.useState<string | null>(null);

  const handleCopyTrack = (track: string) => {
    navigator.clipboard.writeText(track);
    setCopiedTrack(track);
    showToast(`Трек-номер ${track} скопирован в буфер!`, 'info');
    setTimeout(() => setCopiedTrack(null), 2000);
  };

  return (
    <div className="animate-fade-in space-y-6 pb-24">
      {/* Telegram User Profile Card */}
      <div className="p-4 rounded-2xl bg-grace-card border border-grace-border shadow-grace-subtle flex items-center gap-3.5">
        <div className="relative w-14 h-14 rounded-full overflow-hidden bg-grace-sand border-2 border-grace-gold/30 shrink-0">
          {user.photoUrl ? (
            <img src={user.photoUrl} alt={user.firstName} className="w-full h-full object-cover" />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-grace-espresso font-bold text-lg">
              {user.firstName[0]}
            </div>
          )}
        </div>

        <div className="flex-1 min-w-0">
          <h2 className="text-base font-bold text-grace-espresso truncate">
            {user.firstName} {user.lastName || ''}
          </h2>
          <p className="text-xs text-grace-muted font-mono truncate">
            @{user.username || 'telegram_user'} • ID: {user.telegramId}
          </p>
          <span className="inline-block mt-1 text-[9px] font-semibold uppercase tracking-wider px-2 py-0.5 rounded bg-grace-sand text-grace-espresso">
            VIP-клиент Grace
          </span>
        </div>
      </div>

      {/* Orders History Section */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <PackageCheck className="w-5 h-5 text-grace-espresso" />
            <h3 className="text-lg font-serif font-bold text-grace-espresso">
              Мои заказы
            </h3>
          </div>
          <span className="text-xs text-grace-muted font-medium">
            Всего: {orders.length}
          </span>
        </div>

        {orders.length === 0 ? (
          <div className="py-12 text-center bg-grace-card rounded-2xl border border-grace-border p-6">
            <PackageCheck className="w-12 h-12 text-grace-muted/40 mx-auto mb-2 stroke-[1]" />
            <p className="text-sm font-semibold text-grace-espresso mb-1">
              Заказов пока нет
            </p>
            <p className="text-xs text-grace-muted font-light">
              Сделайте свой первый заказ в каталоге Grace
            </p>
          </div>
        ) : (
          orders.map((order) => (
            <div
              key={order.id}
              className="p-4 rounded-2xl bg-grace-card border border-grace-border shadow-grace-subtle space-y-3"
            >
              {/* Order Header */}
              <div className="flex items-center justify-between pb-3 border-b border-grace-border/60">
                <div>
                  <span className="text-sm font-bold font-mono text-grace-espresso block">
                    № {order.orderNumber}
                  </span>
                  <span className="text-[10px] text-grace-muted">
                    {formatDate(order.createdAt)}
                  </span>
                </div>
                <OrderStatusBadge status={order.status} />
              </div>

              {/* Items List */}
              <div className="space-y-2">
                {order.items.map((item) => (
                  <div key={item.id} className="flex items-center justify-between text-xs">
                    <div className="flex items-center gap-2.5 min-w-0">
                      <img
                        src={item.image}
                        alt={item.productTitle}
                        className="w-10 h-12 object-cover rounded-lg bg-grace-sand shrink-0"
                      />
                      <div className="min-w-0">
                        <h4 className="font-semibold text-grace-espresso truncate">
                          {item.productTitle}
                        </h4>
                        <span className="text-[10px] text-grace-muted font-mono">
                          Размер: {item.size} × {item.quantity} шт.
                        </span>
                      </div>
                    </div>
                    <span className="font-mono font-bold text-grace-espresso shrink-0">
                      {formatPrice(item.price * item.quantity)}
                    </span>
                  </div>
                ))}
              </div>

              {/* Tracking Number Banner (If Available) */}
              {order.trackingNumber && (
                <div className="p-3 rounded-xl bg-blue-50 border border-blue-200 flex items-center justify-between">
                  <div>
                    <span className="text-[9px] uppercase font-bold text-blue-800 tracking-wider block">
                      Трек-номер СДЭК:
                    </span>
                    <span className="text-xs font-mono font-bold text-blue-900">
                      {order.trackingNumber}
                    </span>
                  </div>

                  <button
                    onClick={() => handleCopyTrack(order.trackingNumber!)}
                    className="p-1.5 rounded-lg bg-white border border-blue-300 text-blue-800 hover:bg-blue-100 transition-colors flex items-center gap-1 text-[10px] font-bold"
                  >
                    {copiedTrack === order.trackingNumber ? (
                      <Check className="w-3.5 h-3.5 text-emerald-600" />
                    ) : (
                      <Copy className="w-3.5 h-3.5" />
                    )}
                    <span>{copiedTrack === order.trackingNumber ? 'Скопировано' : 'Копировать'}</span>
                  </button>
                </div>
              )}

              {/* Order Footer Summary */}
              <div className="pt-2 border-t border-grace-border/60 flex items-center justify-between text-xs">
                <div className="text-[10px] text-grace-muted">
                  {getDeliveryMethodLabel(order.deliveryMethod)}
                </div>
                <div className="text-right">
                  <span className="text-[10px] text-grace-muted block">Итого к оплате</span>
                  <span className="text-sm font-bold font-mono text-grace-espresso">
                    {formatPrice(order.totalAmount)}
                  </span>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};
