
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AdminSidebar from './AdminSidebar';
import CategoryManagement from './CategoryManagement';
import MenuItemManagement from './MenuItemManagement';
import InactiveItemsManagement from './InactiveItemsManagement';
import { Button } from '../ui/button';
import useAdminStore from '../../store/useAdminStore';

const MenuManagement: React.FC = () => {
  const [currentPage, setCurrentPage] = useState('categories');
  const navigate = useNavigate();
  const { logout } = useAdminStore();

  const handleLogout = () => {
    logout();
    navigate('/admin/login');
  };

  const renderContent = () => {
    switch (currentPage) {
      case 'categories':
        return <CategoryManagement />;
      case 'menu':
        return <MenuItemManagement />;
      case 'inactive':
        return <InactiveItemsManagement />;
      default:
        return <CategoryManagement />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-white shadow-sm border-b">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center">
            <span className="text-2xl font-bold text-ushi-red-600">🍣 USHI MANIA</span>
            <span className="ml-4 text-gray-600">- Quản lý thực đơn</span>
          </div>
          <div className="flex gap-4">
            <Button
              onClick={() => navigate('/admin')}
              variant="outline"
            >
              Về trang chủ
            </Button>
            <Button
              onClick={handleLogout}
              variant="outline"
              className="text-red-600 border-red-600 hover:bg-red-50"
            >
              Đăng xuất
            </Button>
          </div>
        </div>
      </div>

      <div className="flex">
        <AdminSidebar currentPage={currentPage} onPageChange={setCurrentPage} />
        <div className="flex-1 p-6">
          {renderContent()}
        </div>
      </div>
    </div>
  );
};

export default MenuManagement;
