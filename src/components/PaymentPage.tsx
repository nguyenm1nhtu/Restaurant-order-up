
import React, { useState } from 'react';
import { ArrowLeft, ChevronRight } from 'lucide-react';
import { Button } from './ui/button';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { RadioGroup, RadioGroupItem } from './ui/radio-group';
import { Label } from './ui/label';
import useStore from '../store/useStore';
import { vouchers, paymentMethods } from '../data/mockData';
import VoucherModal from './VoucherModal';
import ConfirmationModal from './ConfirmationModal';

const PaymentPage = () => {
  const [showVoucherModal, setShowVoucherModal] = useState(false);
  const [showPaymentConfirm, setShowPaymentConfirm] = useState(false);
  const [showPaymentSuccess, setShowPaymentSuccess] = useState(false);
  
  const { 
    customer,
    tableNumber,
    orderItems, 
    selectedVoucher, 
    selectedPaymentMethod,
    setSelectedPaymentMethod,
    setCurrentPage 
  } = useStore();

  const subtotal = orderItems.reduce((sum, order) => sum + (order.menuItem.price * order.quantity), 0);
  const discount = selectedVoucher 
    ? selectedVoucher.discount < 1 
      ? subtotal * selectedVoucher.discount 
      : selectedVoucher.discount
    : 0;
  const total = subtotal - discount;

  const handlePayment = () => {
    setShowPaymentConfirm(false);
    setShowPaymentSuccess(true);
  };

  const handlePaymentSuccess = () => {
    setShowPaymentSuccess(false);
    setCurrentPage('login');
    // Reset the app state here if needed
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: 'VND'
    }).format(price);
  };

  return (
    <div className="flex-1 bg-gray-50 pb-20">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 px-4 py-4">
        <div className="flex items-center space-x-4">
          <button
            onClick={() => setCurrentPage('cart')}
            className="p-2 hover:bg-gray-100 rounded-full"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <h1 className="text-xl font-bold">Thanh toán</h1>
        </div>
      </div>

      <div className="p-4 space-y-6">
        {/* Customer Info */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Thông tin đơn hàng</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            <div className="flex justify-between">
              <span className="text-gray-600">Bàn:</span>
              <span className="font-semibold">{tableNumber}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Khách hàng:</span>
              <span className="font-semibold">{customer?.name}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Số điện thoại:</span>
              <span className="font-semibold">{customer?.phone}</span>
            </div>
          </CardContent>
        </Card>

        {/* Order Items */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Danh sách món đã gọi</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {orderItems.map((order) => (
              <div key={order.id} className="flex justify-between items-center">
                <div className="flex-1">
                  <div className="font-medium">{order.menuItem.name}</div>
                  <div className="text-sm text-gray-600">x{order.quantity}</div>
                  {order.note && (
                    <div className="text-sm text-gray-500">Ghi chú: {order.note}</div>
                  )}
                </div>
                <div className="font-semibold text-ushi-red-600">
                  {formatPrice(order.menuItem.price * order.quantity)}
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Voucher */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Voucher</CardTitle>
          </CardHeader>
          <CardContent>
            <button
              onClick={() => setShowVoucherModal(true)}
              className="w-full flex items-center justify-between p-3 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
            >
              <div className="text-left">
                {selectedVoucher ? (
                  <>
                    <div className="font-medium text-ushi-red-600">{selectedVoucher.name}</div>
                    <div className="text-sm text-gray-600">
                      Giảm {selectedVoucher.discount < 1 
                        ? `${selectedVoucher.discount * 100}%` 
                        : formatPrice(selectedVoucher.discount)
                      }
                    </div>
                  </>
                ) : (
                  <span className="text-gray-600">Chọn voucher của nhà hàng</span>
                )}
              </div>
              <ChevronRight className="w-5 h-5 text-gray-400" />
            </button>
          </CardContent>
        </Card>

        {/* Payment Method */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Phương thức thanh toán</CardTitle>
          </CardHeader>
          <CardContent>
            <RadioGroup
              value={selectedPaymentMethod?.id || ''}
              onValueChange={(value) => {
                const method = paymentMethods.find(m => m.id === value);
                setSelectedPaymentMethod(method || null);
              }}
            >
              {paymentMethods.map((method) => (
                <div key={method.id} className="flex items-center space-x-2">
                  <RadioGroupItem value={method.id} id={method.id} />
                  <Label htmlFor={method.id} className="flex items-center space-x-2 cursor-pointer">
                    <span className="text-xl">{method.icon}</span>
                    <span>{method.name}</span>
                  </Label>
                </div>
              ))}
            </RadioGroup>
          </CardContent>
        </Card>

        {/* Payment Summary */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Chi tiết thanh toán</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex justify-between">
              <span>Tổng số món:</span>
              <span className="font-semibold">{orderItems.length} món</span>
            </div>
            <div className="flex justify-between">
              <span>Tổng tiền món ăn:</span>
              <span className="font-semibold">{formatPrice(subtotal)}</span>
            </div>
            {selectedVoucher && (
              <div className="flex justify-between text-green-600">
                <span>Giảm giá:</span>
                <span className="font-semibold">-{formatPrice(discount)}</span>
              </div>
            )}
            <div className="border-t pt-3">
              <div className="flex justify-between text-lg font-bold">
                <span>Tổng cộng:</span>
                <span className="text-ushi-red-600">{formatPrice(total)}</span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Payment Button */}
        <Button
          onClick={() => setShowPaymentConfirm(true)}
          disabled={!selectedPaymentMethod || orderItems.length === 0}
          className="w-full h-12 bg-ushi-red-600 hover:bg-ushi-red-700 text-white font-medium text-lg"
        >
          Thanh toán ngay
        </Button>
      </div>

      {/* Modals */}
      {showVoucherModal && (
        <VoucherModal
          vouchers={vouchers.map(v => ({ ...v, isEligible: subtotal >= v.minAmount }))}
          onClose={() => setShowVoucherModal(false)}
        />
      )}

      {showPaymentConfirm && (
        <ConfirmationModal
          title="Xác nhận thanh toán"
          message="Bạn có chắc chắn muốn thanh toán giỏ hàng không?"
          onConfirm={handlePayment}
          onCancel={() => setShowPaymentConfirm(false)}
        />
      )}

      {showPaymentSuccess && (
        <ConfirmationModal
          title="Cảm ơn khách hàng!"
          message="Cảm ơn khách hàng đã sử dụng dịch vụ. Vui lòng chờ một lát để nhân viên sẽ mang hóa đơn đến cho khách hàng."
          onConfirm={handlePaymentSuccess}
          showCancel={false}
          confirmText="Đóng"
        />
      )}
    </div>
  );
};

export default PaymentPage;
