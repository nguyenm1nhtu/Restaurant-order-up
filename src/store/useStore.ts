
import { create } from 'zustand';
import { Customer, CartItem, OrderItem, MenuItem, Voucher, PaymentMethod } from '../types';

interface Store {
  // Customer info
  customer: Customer | null;
  setCustomer: (customer: Customer) => void;
  
  // Table info
  tableNumber: string;
  setTableNumber: (table: string) => void;
  
  // Cart
  cartItems: CartItem[];
  addToCart: (item: CartItem) => void;
  updateCartItem: (id: string, updates: Partial<CartItem>) => void;
  removeFromCart: (id: string) => void;
  clearCart: () => void;
  toggleCartItemSelection: (id: string) => void;
  
  // Orders
  orderItems: OrderItem[];
  addToOrder: (items: CartItem[]) => void;
  updateOrderStatus: (id: string, status: OrderItem['status']) => void;
  
  // Selected voucher
  selectedVoucher: Voucher | null;
  setSelectedVoucher: (voucher: Voucher | null) => void;
  
  // Selected payment method
  selectedPaymentMethod: PaymentMethod | null;
  setSelectedPaymentMethod: (method: PaymentMethod | null) => void;
  
  // UI state
  currentPage: 'login' | 'menu' | 'cart' | 'payment';
  setCurrentPage: (page: 'login' | 'menu' | 'cart' | 'payment') => void;
}

const useStore = create<Store>((set, get) => ({
  customer: null,
  setCustomer: (customer) => set({ customer }),
  
  tableNumber: 'B2',
  setTableNumber: (table) => set({ tableNumber: table }),
  
  cartItems: [],
  addToCart: (item) => set((state) => ({ 
    cartItems: [...state.cartItems, item] 
  })),
  updateCartItem: (id, updates) => set((state) => ({
    cartItems: state.cartItems.map(item => 
      item.id === id ? { ...item, ...updates } : item
    )
  })),
  removeFromCart: (id) => set((state) => ({
    cartItems: state.cartItems.filter(item => item.id !== id)
  })),
  clearCart: () => set({ cartItems: [] }),
  toggleCartItemSelection: (id) => set((state) => ({
    cartItems: state.cartItems.map(item =>
      item.id === id ? { ...item, selected: !item.selected } : item
    )
  })),
  
  orderItems: [],
  addToOrder: (items) => set((state) => ({
    orderItems: [
      ...state.orderItems,
      ...items.map(item => ({
        id: `order-${Date.now()}-${item.id}`,
        menuItem: item.menuItem,
        quantity: item.quantity,
        note: item.note,
        status: 'preparing' as const,
      }))
    ]
  })),
  updateOrderStatus: (id, status) => set((state) => ({
    orderItems: state.orderItems.map(item =>
      item.id === id ? { ...item, status } : item
    )
  })),
  
  selectedVoucher: null,
  setSelectedVoucher: (voucher) => set({ selectedVoucher: voucher }),
  
  selectedPaymentMethod: null,
  setSelectedPaymentMethod: (method) => set({ selectedPaymentMethod: method }),
  
  currentPage: 'login',
  setCurrentPage: (page) => set({ currentPage: page }),
}));

export default useStore;
