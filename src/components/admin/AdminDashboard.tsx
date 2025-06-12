
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '../ui/button';
import useAdminStore from '../../store/useAdminStore';

const AdminDashboard: React.FC = () => {
  const navigate = useNavigate();
  const { logout } = useAdminStore();

  const handleLogout = () => {
    logout();
    navigate('/admin/login');
  };

  const dashboardItems = [
    { id: 'invoice', label: 'Hóa đơn nhanh', icon: '🧾' },
    { id: 'table-map', label: 'Mã sơ đồ bàn', icon: '🗺️' },
    { id: 'order-control', label: 'Kiểm soát Order', icon: '📋' },
    { id: 'menu', label: 'Thực đơn nhà hàng', icon: '🍽️' },
    { id: 'shift-close', label: 'Đóng ca thu ngân', icon: '💰' },
  ];

  const handleItemClick = (itemId: string) => {
    if (itemId === 'menu') {
      navigate('/admin/menu');
    }
    // Add other navigation logic here
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-white shadow-sm border-b">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center">
            <span className="text-2xl font-bold text-ushi-red-600">🍣 USHI MANIA</span>
            <span className="ml-4 text-gray-600">- Hệ thống quản lý</span>
          </div>
          <Button
            onClick={handleLogout}
            variant="outline"
            className="text-red-600 border-red-600 hover:bg-red-50"
          >
            Đăng xuất
          </Button>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-center mb-8 text-gray-800">
          Trang quản lý nhà hàng
        </h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-4xl mx-auto">
          {dashboardItems.map((item) => (
            <div
              key={item.id}
              onClick={() => handleItemClick(item.id)}
              className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow cursor-pointer border hover:border-ushi-red-300"
            >
              <div className="text-4xl mb-4 text-center">{item.icon}</div>
              <h3 className="text-lg font-semibold text-center text-gray-800">
                {item.label}
              </h3>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
