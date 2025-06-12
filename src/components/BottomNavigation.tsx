
import React from 'react';
import { ShoppingCart, User } from 'lucide-react';
import useStore from '../store/useStore';

const BottomNavigation = () => {
  const { currentPage, setCurrentPage, cartItems } = useStore();
  
  const cartItemCount = cartItems.length;

  const navItems = [
    {
      id: 'menu',
      label: 'Menu',
      icon: '🍽️',
      page: 'menu' as const
    },
    {
      id: 'cart',
      label: 'Giỏ hàng',
      icon: <ShoppingCart className="w-5 h-5" />,
      page: 'cart' as const,
      badge: cartItemCount > 0 ? cartItemCount : undefined
    },
    {
      id: 'payment',
      label: 'Thanh toán',
      icon: '✅',
      page: 'payment' as const
    },
    {
      id: 'account',
      label: 'Tài khoản',
      icon: <User className="w-5 h-5" />,
      page: 'menu' as const
    }
  ];

  if (currentPage === 'login') return null;

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-ushi-red-600 border-t border-ushi-red-700 z-50">
      <div className="grid grid-cols-4 h-16">
        {navItems.map((item) => (
          <button
            key={item.id}
            onClick={() => setCurrentPage(item.page)}
            className={`flex flex-col items-center justify-center text-white relative transition-colors ${
              currentPage === item.page ? 'bg-ushi-red-700' : 'hover:bg-ushi-red-700'
            }`}
          >
            <div className="text-lg mb-1 relative">
              {item.icon}
              {item.badge && (
                <span className="absolute -top-2 -right-2 bg-yellow-400 text-black text-xs rounded-full w-5 h-5 flex items-center justify-center font-bold">
                  {item.badge}
                </span>
              )}
            </div>
            <span className="text-xs">{item.label}</span>
          </button>
        ))}
      </div>
    </nav>
  );
};

export default BottomNavigation;
