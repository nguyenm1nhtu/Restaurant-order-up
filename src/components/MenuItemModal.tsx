
import React, { useState } from 'react';
import { X, Minus, Plus } from 'lucide-react';
import { Button } from './ui/button';
import { Textarea } from './ui/textarea';
import { MenuItem } from '../types';
import useStore from '../store/useStore';

interface MenuItemModalProps {
  menuItem: MenuItem;
  onClose: () => void;
}

const MenuItemModal: React.FC<MenuItemModalProps> = ({ menuItem, onClose }) => {
  const [quantity, setQuantity] = useState(1);
  const [note, setNote] = useState('');
  const { addToCart } = useStore();

  const handleAddToCart = () => {
    const cartItem = {
      id: `cart-${Date.now()}-${menuItem.id}`,
      menuItem,
      quantity,
      note: note.trim() || undefined,
      selected: true
    };
    addToCart(cartItem);
    onClose();
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: 'VND'
    }).format(price);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg max-w-md w-full max-h-[90vh] overflow-y-auto animate-fadeIn">
        {/* Header */}
        <div className="relative">
          <div className="aspect-video bg-gray-200">
            <img 
              src={menuItem.image} 
              alt={menuItem.name}
              className="w-full h-full object-cover"
            />
          </div>
          <button
            onClick={onClose}
            className="absolute top-4 right-4 bg-white rounded-full p-2 shadow-lg hover:bg-gray-50"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6">
          <div>
            <h2 className="text-2xl font-bold mb-2">{menuItem.name}</h2>
            <p className="text-gray-600 mb-4">{menuItem.description}</p>
            <div className="text-2xl font-bold text-ushi-red-600">
              {formatPrice(menuItem.price)}
            </div>
          </div>

          {/* Quantity */}
          <div>
            <label className="block text-sm font-medium mb-2">Số lượng</label>
            <div className="flex items-center space-x-3">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                disabled={quantity <= 1}
              >
                <Minus className="w-4 h-4" />
              </Button>
              <span className="text-xl font-semibold w-12 text-center">{quantity}</span>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setQuantity(quantity + 1)}
              >
                <Plus className="w-4 h-4" />
              </Button>
            </div>
          </div>

          {/* Note */}
          <div>
            <label className="block text-sm font-medium mb-2">Ghi chú (tùy chọn)</label>
            <Textarea
              value={note}
              onChange={(e) => setNote(e.target.value)}
              placeholder="Nhập ghi chú đặc biệt cho món ăn..."
              className="resize-none focus:ring-ushi-red-500 focus:border-ushi-red-500"
              rows={3}
            />
          </div>

          {/* Total */}
          <div className="border-t pt-4">
            <div className="flex justify-between items-center mb-4">
              <span className="text-lg font-semibold">Tổng cộng:</span>
              <span className="text-2xl font-bold text-ushi-red-600">
                {formatPrice(menuItem.price * quantity)}
              </span>
            </div>
            <Button
              onClick={handleAddToCart}
              className="w-full h-12 bg-ushi-red-600 hover:bg-ushi-red-700 text-white font-medium text-lg"
            >
              Thêm vào giỏ hàng
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MenuItemModal;
