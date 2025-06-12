
export interface Customer {
  name: string;
  phone: string;
}

export interface MenuItem {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  category: string;
}

export interface CartItem {
  id: string;
  menuItem: MenuItem;
  quantity: number;
  note?: string;
  selected: boolean;
}

export interface OrderItem {
  id: string;
  menuItem: MenuItem;
  quantity: number;
  note?: string;
  status: 'preparing' | 'cooking' | 'completed';
}

export interface Voucher {
  id: string;
  name: string;
  discount: number;
  minAmount: number;
  isEligible: boolean;
}

export interface PaymentMethod {
  id: string;
  name: string;
  icon: string;
}
