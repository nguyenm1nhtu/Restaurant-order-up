
import React from 'react';
import { X } from 'lucide-react';
import { Button } from './ui/button';
import { RadioGroup, RadioGroupItem } from './ui/radio-group';
import { Label } from './ui/label';
import useStore from '../store/useStore';
import { Voucher } from '../types';

interface VoucherModalProps {
  vouchers: Voucher[];
  onClose: () => void;
}

const VoucherModal: React.FC<VoucherModalProps> = ({ vouchers, onClose }) => {
  const { selectedVoucher, setSelectedVoucher } = useStore();

  const handleApplyVoucher = () => {
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
      <div className="bg-white rounded-lg max-w-md w-full max-h-[80vh] overflow-y-auto animate-fadeIn">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <h2 className="text-xl font-bold">Chọn Voucher</h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-full"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Voucher List */}
        <div className="p-6">
          <RadioGroup
            value={selectedVoucher?.id || ''}
            onValueChange={(value) => {
              const voucher = vouchers.find(v => v.id === value && v.isEligible);
              setSelectedVoucher(voucher || null);
            }}
          >
            {vouchers.map((voucher) => (
              <div
                key={voucher.id}
                className={`border rounded-lg p-4 transition-colors ${
                  voucher.isEligible 
                    ? 'border-gray-200 hover:border-ushi-red-300' 
                    : 'border-gray-100 bg-gray-50 opacity-50'
                }`}
              >
                <div className="flex items-start space-x-3">
                  <RadioGroupItem 
                    value={voucher.id} 
                    id={voucher.id}
                    disabled={!voucher.isEligible}
                    className="mt-1"
                  />
                  <Label 
                    htmlFor={voucher.id} 
                    className={`flex-1 cursor-pointer ${!voucher.isEligible ? 'cursor-not-allowed' : ''}`}
                  >
                    <div className="font-semibold text-ushi-red-600 mb-1">
                      {voucher.name}
                    </div>
                    <div className="text-sm text-gray-600">
                      Giảm {voucher.discount < 1 
                        ? `${voucher.discount * 100}%` 
                        : formatPrice(voucher.discount)
                      }
                    </div>
                    <div className="text-xs text-gray-500 mt-1">
                      Áp dụng cho đơn hàng từ {formatPrice(voucher.minAmount)}
                    </div>
                    {!voucher.isEligible && (
                      <div className="text-xs text-red-500 mt-1">
                        Không đủ điều kiện áp dụng
                      </div>
                    )}
                  </Label>
                </div>
              </div>
            ))}
          </RadioGroup>
        </div>

        {/* Footer */}
        <div className="p-6 border-t border-gray-200">
          <Button
            onClick={handleApplyVoucher}
            className="w-full bg-ushi-red-600 hover:bg-ushi-red-700 text-white"
          >
            Áp dụng
          </Button>
        </div>
      </div>
    </div>
  );
};

export default VoucherModal;
