
import React, { useState } from 'react';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import useAdminStore from '../../store/useAdminStore';
import { useNavigate } from 'react-router-dom';

const AdminLogin: React.FC = () => {
  const [employeeCode, setEmployeeCode] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  
  const { login } = useAdminStore();
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');
    
    try {
      const success = await login(employeeCode, password);
      if (success) {
        navigate('/admin');
      } else {
        setError('Mã nhân viên hoặc mật khẩu không đúng');
      }
    } catch (err) {
      setError('Đã có lỗi xảy ra, vui lòng thử lại');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
          <div className="mx-auto h-20 w-20 flex items-center justify-center bg-ushi-red-600 rounded-full">
            <span className="text-white text-2xl font-bold">🍣</span>
          </div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            USHI MANIA
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            Đăng nhập hệ thống quản lý
          </p>
        </div>
        
        <form className="mt-8 space-y-6" onSubmit={handleLogin}>
          <div className="space-y-4">
            <div>
              <Label htmlFor="employee-code">Mã nhân viên</Label>
              <Input
                id="employee-code"
                type="text"
                required
                value={employeeCode}
                onChange={(e) => setEmployeeCode(e.target.value)}
                placeholder="Nhập mã nhân viên"
                className="mt-1"
              />
            </div>
            
            <div>
              <Label htmlFor="password">Mật khẩu</Label>
              <Input
                id="password"
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Nhập mật khẩu"
                className="mt-1"
              />
            </div>
          </div>

          {error && (
            <div className="text-red-600 text-sm text-center">
              {error}
            </div>
          )}

          <Button
            type="submit"
            disabled={isLoading}
            className="w-full bg-ushi-red-600 hover:bg-ushi-red-700 text-white"
          >
            {isLoading ? 'Đang đăng nhập...' : 'Đăng nhập'}
          </Button>
          
          <div className="text-xs text-center text-gray-500 mt-4">
            Demo: ADMIN001 / admin123
          </div>
        </form>
      </div>
    </div>
  );
};

export default AdminLogin;
