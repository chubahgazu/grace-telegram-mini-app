import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { OrderStatus } from '../../types';
import { OrderStatusBadge } from '../OrderStatusBadge';
import { formatPrice, formatDate, getDeliveryMethodLabel, getPaymentMethodLabel } from '../../utils/formatters';
import { Phone, MapPin, Send, ChevronDown, ChevronUp } from 'lucide-react';

export const OrderManager: React.FC = () => {
  const { orders, updateOrderStatus, showToast } = useApp();

  const [filterStatus, setFilterStatus] = useState<string>('all');
  const [expandedOrderId, setExpandedOrderId] = useState<string | null>(null);
  const [trackInputs, setTrackInputs] = useState<Record<string, string>>({});

  const filteredOrders = orders.filter(o =>
    filterStatus === 'all' ? true : o.status === filterStatus
  );

  const handleTrackChange = (orderId: string, value: string) => {
    setTrackInputs(prev => ({ ...prev, [orderId]: value }));
  };

  const handleSaveTrack = (orderId: string, currentStatus: OrderStatus) => {
    const track = trackInputs[orderId];
    if (!track) {
      showToast('Введите номер трек-кода СДЭК', 'error');
      return;
    }
    // Update status to in_delivery if it was paid
    const newStatus = currentStatus === 'paid' ? 'in_delivery' : currentStatus;
    updateOrderStatus(orderId, newStatus, track);
    showToast(`Трек-номер ${track} сохранён и передан клиенту!`, 'success');
  };

  const handleSimulateBotNotify = (orderNumber: string) => {
    showToast(`Telegram-уведомление менеджерам по заказу ${orderNumber} отправлено в канал!`, 'info');
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-base font-serif font-bold text-grace-espresso">
          Управление заказами
        </h3>
        <span className="text-xs text-grace-muted font-medium">
          Всего: {orders.length}
        </span>
      </div>

      {/* Filter Tabs */}
      <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar pb-1">
        {[
          { id: 'all', label: 'Все' },
          { id: 'paid', label: 'Оплачены' },
          { id: 'in_delivery', label: 'В пути' },
          { id: 'completed', label: 'Завершены' },
          { id: 'cancelled', label: 'Отменены' }
        ].map(tab => (
          <button
            key={tab.id}
            onClick={() => setFilterStatus(tab.id)}
            className={`px-3 py-1.5 rounded-full text-xs font-medium transition-all shrink-0 ${
              filterStatus === tab.id
                ? 'bg-grace-espresso text-white shadow-sm'
                : 'bg-grace-card text-grace-espresso border border-grace-border hover:border-grace-espresso/30'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Orders List */}
      <div className="space-y-3">
        {filteredOrders.length === 0 ? (
          <div className="py-8 text-center bg-grace-card rounded-2xl border border-grace-border">
            <p className="text-xs text-grace-muted">Заказы с таким статусом отсутствуют</p>
          </div>
        ) : (
          filteredOrders.map(order => {
            const isExpanded = expandedOrderId === order.id;

            return (
              <div
                key={order.id}
                className="bg-grace-card rounded-2xl border border-grace-border overflow-hidden shadow-grace-subtle"
              >
                {/* Order Row Header */}
                <div
                  onClick={() => setExpandedOrderId(isExpanded ? null : order.id)}
                  className="p-4 flex items-center justify-between cursor-pointer hover:bg-grace-sand/30 transition-colors"
                >
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-sm font-bold font-mono text-grace-espresso">
                        № {order.orderNumber}
                      </span>
                      <OrderStatusBadge status={order.status} />
                    </div>
                    <p className="text-[11px] text-grace-muted font-light">
                      {formatDate(order.createdAt)} • {order.recipientName}
                    </p>
                  </div>

                  <div className="flex items-center gap-3">
                    <span className="text-xs font-bold font-mono text-grace-espresso">
                      {formatPrice(order.totalAmount)}
                    </span>
                    {isExpanded ? (
                      <ChevronUp className="w-4 h-4 text-grace-muted" />
                    ) : (
                      <ChevronDown className="w-4 h-4 text-grace-muted" />
                    )}
                  </div>
                </div>

                {/* Expanded Details & Actions */}
                {isExpanded && (
                  <div className="p-4 border-t border-grace-border/60 bg-grace-sand/20 space-y-4 text-xs">
                    {/* Customer & Address */}
                    <div className="grid grid-cols-1 gap-2 p-3 rounded-xl bg-grace-card border border-grace-border">
                      <div className="flex items-center gap-2 text-grace-espresso">
                        <Phone className="w-3.5 h-3.5 text-grace-muted shrink-0" />
                        <span className="font-semibold">{order.recipientPhone}</span>
                      </div>
                      <div className="flex items-start gap-2 text-grace-espresso">
                        <MapPin className="w-3.5 h-3.5 text-grace-muted shrink-0 mt-0.5" />
                        <span className="font-light">{order.deliveryAddress}</span>
                      </div>
                      <div className="text-[10px] text-grace-muted pt-1 border-t border-grace-border/40">
                        Способ: {getDeliveryMethodLabel(order.deliveryMethod)} | Оплата: {getPaymentMethodLabel(order.paymentMethod)}
                      </div>
                    </div>

                    {/* Items List */}
                    <div className="space-y-2">
                      <span className="text-[10px] uppercase font-bold text-grace-muted tracking-wider">
                        Состав заказа:
                      </span>
                      {order.items.map(item => (
                        <div key={item.id} className="flex items-center justify-between text-xs py-1 border-b border-grace-border/40 last:border-none">
                          <div className="flex items-center gap-2">
                            <img src={item.image} alt="" className="w-8 h-10 object-cover rounded bg-grace-sand" />
                            <div>
                              <p className="font-semibold text-grace-espresso">{item.productTitle}</p>
                              <span className="text-[10px] text-grace-muted">Размер {item.size} × {item.quantity} шт.</span>
                            </div>
                          </div>
                          <span className="font-mono font-bold text-grace-espresso">
                            {formatPrice(item.price * item.quantity)}
                          </span>
                        </div>
                      ))}
                    </div>

                    {/* Order Status Change */}
                    <div className="space-y-2 pt-2 border-t border-grace-border">
                      <label className="text-[10px] uppercase font-bold text-grace-muted tracking-wider block">
                        Изменить статус заказа:
                      </label>
                      <div className="flex flex-wrap gap-1.5">
                        {(['paid', 'in_delivery', 'completed', 'cancelled'] as OrderStatus[]).map(st => (
                          <button
                            key={st}
                            onClick={() => updateOrderStatus(order.id, st)}
                            className={`px-2.5 py-1 rounded-lg text-[10px] font-bold uppercase transition-all border ${
                              order.status === st
                                ? 'bg-grace-espresso text-white border-grace-espresso'
                                : 'bg-grace-card text-grace-espresso border-grace-border hover:bg-grace-sand'
                            }`}
                          >
                            {st}
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* CDEK Tracking Input */}
                    <div className="space-y-2">
                      <label className="text-[10px] uppercase font-bold text-grace-muted tracking-wider block">
                        Трек-номер доставки СДЭК:
                      </label>
                      <div className="flex gap-2">
                        <input
                          type="text"
                          placeholder="например, CDEK-9481029"
                          value={trackInputs[order.id] !== undefined ? trackInputs[order.id] : (order.trackingNumber || '')}
                          onChange={(e) => handleTrackChange(order.id, e.target.value)}
                          className="flex-1 px-3 py-1.5 text-xs bg-grace-card rounded-xl border border-grace-border focus:border-grace-espresso focus:outline-none"
                        />
                        <button
                          onClick={() => handleSaveTrack(order.id, order.status)}
                          className="px-3 py-1.5 rounded-xl bg-grace-espresso text-white text-xs font-semibold hover:bg-grace-gold-dark transition-colors shrink-0"
                        >
                          Сохранить
                        </button>
                      </div>
                    </div>

                    {/* Telegram Bot Simulation */}
                    <button
                      onClick={() => handleSimulateBotNotify(order.orderNumber)}
                      className="w-full py-2 px-3 rounded-xl bg-grace-sand hover:bg-grace-sand-dark text-grace-espresso text-xs font-medium flex items-center justify-center gap-1.5 transition-colors"
                    >
                      <Send className="w-3.5 h-3.5 text-blue-600" />
                      <span>Отправить копию в Telegram Bot менеджеров</span>
                    </button>
                  </div>
                )}
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};
