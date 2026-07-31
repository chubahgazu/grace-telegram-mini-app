import React from 'react';
import { OrderStatus } from '../types';
import { Clock, CheckCircle, Truck, PackageCheck, XCircle } from 'lucide-react';

interface OrderStatusBadgeProps {
  status: OrderStatus;
}

export const OrderStatusBadge: React.FC<OrderStatusBadgeProps> = ({ status }) => {
  const configMap: Record<OrderStatus, { label: string; bg: string; text: string; icon: any }> = {
    new: { label: 'Новый заказ', bg: 'bg-amber-100 border-amber-200', text: 'text-amber-800', icon: Clock },
    paid: { label: 'Оплачен', bg: 'bg-emerald-100 border-emerald-200', text: 'text-emerald-800', icon: CheckCircle },
    in_delivery: { label: 'В пути / СДЭК', bg: 'bg-blue-100 border-blue-200', text: 'text-blue-800', icon: Truck },
    completed: { label: 'Выполнен', bg: 'bg-gray-100 border-gray-200', text: 'text-gray-800', icon: PackageCheck },
    cancelled: { label: 'Отменен', bg: 'bg-red-100 border-red-200', text: 'text-red-800', icon: XCircle }
  };

  const current = configMap[status] || configMap.new;
  const Icon = current.icon;

  return (
    <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full border text-[10px] font-semibold tracking-wider uppercase ${current.bg} ${current.text}`}>
      <Icon className="w-3 h-3" />
      {current.label}
    </span>
  );
};
