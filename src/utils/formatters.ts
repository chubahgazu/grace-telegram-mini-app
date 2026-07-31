export const formatPrice = (price: number): string => {
  return new Intl.NumberFormat('ru-RU', {
    style: 'currency',
    currency: 'RUB',
    maximumFractionDigits: 0
  }).format(price);
};

export const formatDate = (dateString: string): string => {
  const date = new Date(dateString);
  return new Intl.DateTimeFormat('ru-RU', {
    day: 'numeric',
    month: 'long',
    hour: '2-digit',
    minute: '2-digit'
  }).format(date);
};

export const getDeliveryMethodLabel = (method: string): string => {
  switch (method) {
    case 'cdek_pvz':
      return 'СДЭК — Пункт выдачи (ПВЗ)';
    case 'cdek_courier':
      return 'СДЭК — Доставка курьером';
    case 'express':
      return 'Экспресс-курьер (День в день)';
    default:
      return method;
  }
};

export const getPaymentMethodLabel = (method: string): string => {
  switch (method) {
    case 'sbp':
      return 'СБП (Система быстрых платежей)';
    case 'sber':
      return 'SberPay / Сбер';
    case 'tbank':
      return 'T-Pay / Т-Банк';
    case 'card':
      return 'Банковская карта';
    default:
      return method;
  }
};
