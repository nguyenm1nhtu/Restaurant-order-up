
import React, { useState } from 'react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import useStore from '../store/useStore';

const CustomerForm = () => {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const { setCustomer, setCurrentPage } = useStore();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (name.trim() && phone.trim()) {
      setCustomer({ name: name.trim(), phone: phone.trim() });
      setCurrentPage('menu');
    }
  };

  return (
    <div className="min-h-screen gradient-bg flex items-center justify-center p-4">
      <Card className="w-full max-w-md shadow-xl border-0 animate-fadeIn">
        <CardHeader className="text-center pb-6">
          <div className="text-4xl mb-4">🍣</div>
          <CardTitle className="text-2xl font-bold text-ushi-red-600">
            Chào mừng đến với Ushi Mania
          </CardTitle>
          <p className="text-gray-600 mt-2">
            Vui lòng nhập thông tin để tiếp tục đặt món
          </p>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="name" className="text-sm font-medium">
                Họ và tên *
              </Label>
              <Input
                id="name"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Nhập họ và tên của bạn"
                required
                className="h-12 focus:ring-ushi-red-500 focus:border-ushi-red-500"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="phone" className="text-sm font-medium">
                Số điện thoại *
              </Label>
              <Input
                id="phone"
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="Nhập số điện thoại"
                required
                className="h-12 focus:ring-ushi-red-500 focus:border-ushi-red-500"
              />
            </div>
            
            <Button 
              type="submit" 
              className="w-full h-12 bg-ushi-red-600 hover:bg-ushi-red-700 text-white font-medium text-lg transition-colors"
            >
              Hoàn thành
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default CustomerForm;
