
import { MenuItem, Voucher, PaymentMethod } from '../types';

export const menuItems: MenuItem[] = [
  {
    id: '1',
    name: 'Thịt Bò Aging Wagyu A5',
    description: 'Thịt bò Wagyu A5 cao cấp, ướp gia vị đặc biệt, nướng trên bếp than hồng',
    price: 890000,
    image: '/placeholder.svg',
    category: 'Thịt bò Aging'
  },
  {
    id: '2',
    name: 'Thịt Bò Sirloin Aging',
    description: 'Thịt bò sirloin thượng hạng, ương 21 ngày, vị ngọt tự nhiên',
    price: 650000,
    image: '/placeholder.svg',
    category: 'Thịt bò Aging'
  },
  {
    id: '3',
    name: 'Salad Rau Củ Tươi',
    description: 'Salad rau củ tươi ngon với sốt đặc biệt của nhà hàng',
    price: 180000,
    image: '/placeholder.svg',
    category: 'Side Dish'
  },
  {
    id: '4',
    name: 'Khoai Tây Nướng Phô Mai',
    description: 'Khoai tây nướng giòn rụm với phô mai Mozzarella tan chảy',
    price: 220000,
    image: '/placeholder.svg',
    category: 'Side Dish'
  },
  {
    id: '5',
    name: 'Cơm Cuộn Sushi',
    description: 'Cơm cuộn sushi truyền thống với cá hồi tươi và rong biển',
    price: 320000,
    image: '/placeholder.svg',
    category: 'Món ăn kèm'
  },
  {
    id: '6',
    name: 'Miso Soup',
    description: 'Súp miso truyền thống Nhật Bản với đậu phụ và rong biển',
    price: 150000,
    image: '/placeholder.svg',
    category: 'Món ăn kèm'
  },
  {
    id: '7',
    name: 'Trà Xanh Matcha',
    description: 'Trà xanh matcha cao cấp, hương vị đậm đà, thanh mát',
    price: 120000,
    image: '/placeholder.svg',
    category: 'Đồ uống'
  },
  {
    id: '8',
    name: 'Nước Cam Tươi',
    description: 'Nước cam tươi vắt 100%, bổ sung vitamin C',
    price: 80000,
    image: '/placeholder.svg',
    category: 'Đồ uống'
  }
];

export const categories = ['Thịt bò Aging', 'Side Dish', 'Món ăn kèm', 'Đồ uống'];

export const vouchers: Voucher[] = [
  {
    id: '1',
    name: 'Giảm 10% cho hóa đơn từ 500k',
    discount: 10,
    minAmount: 500000,
    isEligible: false
  },
  {
    id: '2',
    name: 'Giảm 50k cho hóa đơn từ 300k',
    discount: 50000,
    minAmount: 300000,
    isEligible: false
  },
  {
    id: '3',
    name: 'Giảm 20k cho khách hàng mới',
    discount: 20000,
    minAmount: 0,
    isEligible: true
  }
];

export const paymentMethods: PaymentMethod[] = [
  {
    id: '1',
    name: 'Tiền mặt',
    icon: '💵'
  },
  {
    id: '2',
    name: 'Chuyển khoản',
    icon: '🏦'
  },
  {
    id: '3',
    name: 'QR Code',
    icon: '📱'
  }
];
