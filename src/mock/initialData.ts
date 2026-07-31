import { SeasonDrop, Product, Order } from '../types';

export const INITIAL_DROPS: SeasonDrop[] = [
  {
    id: 'drop-1',
    title: 'Осень-Зима: Олд Мани & Урбан',
    code: 'ОСЕНЬ-ЗИМА-24',
    isCurrent: true,
    bannerUrl: 'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&w=1200&q=80',
    description: 'Осенне-зимний капсульный дроп. Итальянский шерстяной драп, мягчайший кашемир и безупречный крой.',
    releaseDate: '2024-10-15'
  },
  {
    id: 'drop-2',
    title: 'Лимитированная серия — Кашемир Essentials',
    code: 'КАШЕМИР-КАПСУЛА',
    isCurrent: false,
    bannerUrl: 'https://images.unsplash.com/photo-1489987707025-afc232f7ea0f?auto=format&fit=crop&w=1200&q=80',
    description: 'Ограниченный дроп изделий из монгольского 100% кашемира плотностью 450г/м².',
    releaseDate: '2024-09-01'
  },
  {
    id: 'drop-3',
    title: 'Городской силуэт — Костюмная капсула',
    code: 'ВЕСНА-ЛЕТО-24',
    isCurrent: false,
    bannerUrl: 'https://images.unsplash.com/photo-1445205170230-053b83016050?auto=format&fit=crop&w=1200&q=80',
    description: 'Свободный городской стиль: костюмная группа из премиального льна и формоустойчивого хлопка.',
    releaseDate: '2024-05-20'
  }
];

export const INITIAL_PRODUCTS: Product[] = [
  {
    id: 'prod-1',
    title: 'Двубортное пальто из шерсти и кашемира',
    price: 48900,
    dropId: 'drop-1',
    category: 'Верхняя одежда',
    description: 'Премиальное пальто свободного кроя с акцентными плечами. Модель выполнена из плотной шерсти Loro Piana с добавлением кашемира.',
    composition: '80% Шерсть Virgin Wool, 20% Кашемир. Подкладка: 100% Вискоза.',
    images: [
      'https://images.unsplash.com/photo-1539533018447-63fcce2678e3?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=800&q=80'
    ],
    stock: { S: 2, M: 4, L: 1, XL: 0 },
    isFeatured: true,
    createdAt: '2024-10-15T10:00:00Z'
  },
  {
    id: 'prod-2',
    title: 'Кашемировый свитер свободного кроя',
    price: 26500,
    dropId: 'drop-1',
    category: 'Кашемир и трикотаж',
    description: 'Свитер крупной вязки с высоким воротником-стойкой. Спущенная линия плеча и глубокий бежевый оттенок Шампань.',
    composition: '100% Монгольский кашемир премиальной очистки.',
    images: [
      'https://images.unsplash.com/photo-1576566588028-4147f3842f27?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?auto=format&fit=crop&w=800&q=80'
    ],
    stock: { S: 5, M: 8, L: 3, XL: 2 },
    isFeatured: true,
    createdAt: '2024-10-15T10:05:00Z'
  },
  {
    id: 'prod-3',
    title: 'Плотный худи Grace из японского хлопка',
    price: 14800,
    dropId: 'drop-1',
    category: 'Худи и рубашки',
    description: 'Плотный худи из японского хлопка 520г/м² без начёса. Минималистичная вышивка логотипа Grace на груди.',
    composition: '100% Органический японский хлопок.',
    images: [
      'https://images.unsplash.com/photo-1556905055-8f358a7a47b2?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1509967419530-da38b4704bc6?auto=format&fit=crop&w=800&q=80'
    ],
    stock: { S: 10, M: 12, L: 8, XL: 4 },
    isFeatured: true,
    createdAt: '2024-10-15T10:10:00Z'
  },
  {
    id: 'prod-4',
    title: 'Шерстяные брюки со стрелками Олд Мани',
    price: 19500,
    dropId: 'drop-1',
    category: 'Брюки',
    description: 'Классические широкие брюки со защипами у пояса и мягкой драпировкой. Идеальная посадка Олд Мани.',
    composition: '95% Шерсть Cool Wool, 5% Эластан.',
    images: [
      'https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1506629082955-511b1aa562c8?auto=format&fit=crop&w=800&q=80'
    ],
    stock: { S: 3, M: 6, L: 4, XL: 1 },
    isFeatured: false,
    createdAt: '2024-10-15T10:15:00Z'
  },
  {
    id: 'prod-5',
    title: 'Рубашка из натурального шелка Mulberry',
    price: 22000,
    dropId: 'drop-1',
    category: 'Худи и рубашки',
    description: 'Рубашка из натурального шелка Mulberry с матовым финишем. Перламутровые пуговицы из ракушки.',
    composition: '100% Натуральный шелк Mulberry.',
    images: [
      'https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?auto=format&fit=crop&w=800&q=80'
    ],
    stock: { S: 4, M: 2, L: 0, XL: 0 },
    isFeatured: false,
    createdAt: '2024-10-15T10:20:00Z'
  },
  {
    id: 'prod-6',
    title: 'Кожаная рельефная сумка-тоут Grace',
    price: 34000,
    dropId: 'drop-1',
    category: 'Аксессуары',
    description: 'Вместительный тоут из зернистой телячьей кожи с внутренним органайзером и замшевой отделкой.',
    composition: '100% Натуральная телячья кожа, замша.',
    images: [
      'https://images.unsplash.com/photo-1548036328-c9fa89d128fa?auto=format&fit=crop&w=800&q=80'
    ],
    stock: { S: 5, M: 5, L: 5, XL: 5 },
    isFeatured: true,
    createdAt: '2024-10-15T10:25:00Z'
  }
];

export const INITIAL_ORDERS: Order[] = [
  {
    id: 'ord-101',
    orderNumber: 'GR-8921',
    userId: 'user-1',
    telegramId: 9948102,
    items: [
      {
        id: 'cart-1',
        productId: 'prod-2',
        productTitle: 'Кашемировый свитер свободного кроя',
        image: 'https://images.unsplash.com/photo-1576566588028-4147f3842f27?auto=format&fit=crop&w=800&q=80',
        size: 'M',
        price: 26500,
        quantity: 1
      }
    ],
    totalAmount: 26500,
    paymentMethod: 'sbp',
    deliveryMethod: 'cdek_pvz',
    deliveryAddress: 'г. Москва, ул. Тверская, д. 12 (СДЭК MSK41)',
    recipientName: 'Константин Алексеев',
    recipientPhone: '+7 (999) 123-45-67',
    status: 'in_delivery',
    trackingNumber: 'CDEK-984102948',
    createdAt: '2024-10-28T14:30:00Z',
    updatedAt: '2024-10-28T16:00:00Z'
  },
  {
    id: 'ord-100',
    orderNumber: 'GR-8890',
    userId: 'user-1',
    telegramId: 9948102,
    items: [
      {
        id: 'cart-2',
        productId: 'prod-3',
        productTitle: 'Плотный худи Grace из японского хлопка',
        image: 'https://images.unsplash.com/photo-1556905055-8f358a7a47b2?auto=format&fit=crop&w=800&q=80',
        size: 'L',
        price: 14800,
        quantity: 1
      }
    ],
    totalAmount: 14800,
    paymentMethod: 'tbank',
    deliveryMethod: 'cdek_courier',
    deliveryAddress: 'г. Москва, ул. Большая Дмитровка, д. 8, кв. 14',
    recipientName: 'Константин Алексеев',
    recipientPhone: '+7 (999) 123-45-67',
    status: 'completed',
    trackingNumber: 'CDEK-771920311',
    createdAt: '2024-10-18T11:20:00Z',
    updatedAt: '2024-10-20T12:00:00Z'
  }
];
