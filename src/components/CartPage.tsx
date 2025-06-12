
import React, { useState } from 'react';
import { ArrowLeft, Trash2 } from 'lucide-react';
import { Button } from './ui/button';
import { Card, CardContent } from './ui/card';
import { Checkbox } from './ui/checkbox';
import { Badge } from './ui/badge';
import useStore from '../store/useStore';
import ConfirmationModal from './ConfirmationModal';

const CartPage = () => {
  const [activeTab, setActiveTab] = useState<'cart' | 'orders'>('cart');
  const [showConfirmOrder, setShowConfirmOrder] = useState(false);
  const [showOrderSuccess, setShowOrderSuccess] = useState(false);
  
  const { 
    cartItems, 
    orderItems, 
    toggleCartItemSelection, 
    removeFromCart, 
    addToOrder, 
    clearCart,
    setCurrentPage 
  } = useStore();

  const selectedCartItems = cartItems.filter(item => item.selected);
  const totalAmount = selectedCartItems.reduce((sum, item) => sum + (item.menuItem.price * item.quantity), 0);

  const handleConfirmOrder = () => {
    if (selectedCartItems.length > 0) {
      addToOrder(selectedCartItems);
      // Remove ordered items from cart
      selectedCartItems.forEach(item => removeFromCart(item.id));
      setShowConfirmOrder(false);
      setShowOrderSuccess(true);
    }
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: 'VND'
    }).format(price);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'preparing': return 'bg-yellow-500';
      case 'cooking': return 'bg-orange-500';
      case 'completed': return 'bg-green-500';
      default: return 'bg-gray-500';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'preparing': return 'Chưa chế biến';
      case 'cooking': return 'Đang chế biến';
      case 'completed': return 'Đã hoàn thành';
      default: return 'Không xác định';
    }
  };

  return (
    <div className="flex-1 bg-gray-50 pb-20">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 px-4 py-4">
        <div className="flex items-center space-x-4">
          <button
            onClick={() => setCurrentPage('menu')}
            className="p-2 hover:bg-gray-100 rounded-full"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <h1 className="text-xl font-bold">Giỏ hàng</h1>
        </div>
      </div>

      {/* Tabs */}
      <div className="bg-white border-b border-gray-200">
        <div className="flex">
          <button
            onClick={() => setActiveTab('cart')}
            className={`flex-1 py-4 text-center font-medium border-b-2 transition-colors ${
              activeTab === 'cart'
                ? 'border-ushi-red-600 text-ushi-red-600'
                : 'border-transparent text-gray-500 hover:text-gray-700'
            }`}
          >
            Giỏ đồ ăn ({cartItems.length})
          </button>
          <button
            onClick={() => setActiveTab('orders')}
            className={`flex-1 py-4 text-center font-medium border-b-2 transition-colors ${
              activeTab === 'orders'
                ? 'border-ushi-red-600 text-ushi-red-600'
                : 'border-transparent text-gray-500 hover:text-gray-700'
            }`}
          >
            Món đã gọi ({orderItems.length})
          </button>
        </div>
      </div>

      {/* Cart Tab Content */}
      {activeTab === 'cart' && (
        <div className="flex-1">
          {cartItems.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-20">
              <div className="text-6xl mb-4">🛒</div>
              <p className="text-gray-500 text-lg mb-6">Giỏ hàng của bạn đang trống</p>
              <Button
                onClick={() => setCurrentPage('menu')}
                className="bg-ushi-red-600 hover:bg-ushi-red-700 text-white"
              >
                Quay lại menu
              </Button>
            </div>
          ) : (
            <>
              <div className="p-4 space-y-4">
                {cartItems.map((item) => (
                  <Card key={item.id} className="overflow-hidden">
                    <CardContent className="p-4">
                      <div className="flex items-start space-x-4">
                        <Checkbox
                          checked={item.selected}
                          onCheckedChange={() => toggleCartItemSelection(item.id)}
                          className="mt-1"
                        />
                        <div className="w-20 h-20 bg-gray-200 rounded-lg overflow-hidden flex-shrink-0">
                          <img 
                            src={item.menuItem.image} 
                            alt={item.menuItem.name}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div className="flex-1 min-w-0">
                          <h3 className="font-semibold text-lg mb-1">{item.menuItem.name}</h3>
                          <p className="text-gray-600 text-sm mb-2">Số lượng: {item.quantity}</p>
                          {item.note && (
                            <p className="text-gray-500 text-sm mb-2">Ghi chú: {item.note}</p>
                          )}
                          <div className="text-ushi-red-600 font-bold">
                            {formatPrice(item.menuItem.price * item.quantity)}
                          </div>
                        </div>
                        <button
                          onClick={() => removeFromCart(item.id)}
                          className="p-2 text-red-500 hover:bg-red-50 rounded-full"
                        >
                          <Trash2 className="w-5 h-5" />
                        </button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>

              {/* Order Summary */}
              {selectedCartItems.length > 0 && (
                <div className="bg-white border-t border-gray-200 p-4">
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-lg font-semibold">
                      Tổng cộng ({selectedCartItems.length} món):
                    </span>
                    <span className="text-xl font-bold text-ushi-red-600">
                      {formatPrice(totalAmount)}
                    </span>
                  </div>
                  <Button
                    onClick={() => setShowConfirmOrder(true)}
                    className="w-full h-12 bg-ushi-red-600 hover:bg-ushi-red-700 text-white font-medium"
                  >
                    Xác nhận đặt món
                  </Button>
                </div>
              )}
            </>
          )}
        </div>
      )}

      {/* Orders Tab Content */}
      {activeTab === 'orders' && (
        <div className="flex-1">
          {orderItems.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-20">
              <div className="text-6xl mb-4">📝</div>
              <p className="text-gray-500 text-lg">Chưa có món nào được đặt</p>
            </div>
          ) : (
            <>
              <div className="p-4 space-y-4">
                {orderItems.map((order) => (
                  <Card key={order.id} className="overflow-hidden">
                    <CardContent className="p-4">
                      <div className="flex items-start space-x-4">
                        <div className="w-20 h-20 bg-gray-200 rounded-lg overflow-hidden flex-shrink-0">
                          <img 
                            src={order.menuItem.image} 
                            alt={order.menuItem.name}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div className="flex-1 min-w-0">
                          <h3 className="font-semibold text-lg mb-1">{order.menuItem.name}</h3>
                          <p className="text-gray-600 text-sm mb-2">Số lượng: {order.quantity}</p>
                          {order.note && (
                            <p className="text-gray-500 text-sm mb-2">Ghi chú: {order.note}</p>
                          )}
                          <div className="flex items-center justify-between">
                            <div className="text-ushi-red-600 font-bold">
                              {formatPrice(order.menuItem.price * order.quantity)}
                            </div>
                            <Badge className={`${getStatusColor(order.status)} text-white`}>
                              {getStatusText(order.status)}
                            </Badge>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>

              <div className="bg-white border-t border-gray-200 p-4">
                <Button
                  onClick={() => setCurrentPage('payment')}
                  className="w-full h-12 bg-green-600 hover:bg-green-700 text-white font-medium"
                >
                  Kết thúc dịch vụ
                </Button>
              </div>
            </>
          )}
        </div>
      )}

      {/* Confirmation Modals */}
      {showConfirmOrder && (
        <ConfirmationModal
          title="Xác nhận đặt món"
          message="Bạn có chắc chắn muốn đặt món không?"
          onConfirm={handleConfirmOrder}
          onCancel={() => setShowConfirmOrder(false)}
        />
      )}

      {showOrderSuccess && (
        <ConfirmationModal
          title="Đặt món thành công"
          message="Món ăn đã được gửi đến bếp!"
          onConfirm={() => setShowOrderSuccess(false)}
          showCancel={false}
          confirmText="Đóng"
        />
      )}
    </div>
  );
};

export default CartPage;
