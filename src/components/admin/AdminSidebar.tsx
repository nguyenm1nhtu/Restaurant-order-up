
import React from 'react';
import { cn } from '../../lib/utils';

interface AdminSidebarProps {
  currentPage: string;
  onPageChange: (page: string) => void;
}

const AdminSidebar: React.FC<AdminSidebarProps> = ({ currentPage, onPageChange }) => {
  const menuItems = [
    { id: 'categories', label: 'Quản lý danh mục menu' },
    { id: 'menu', label: 'Quản lý menu' },
    { id: 'inactive', label: 'Các món ngưng bán' },
  ];

  return (
    <div className="w-64 bg-white shadow-lg h-full">
      <div className="bg-ushi-red-600 text-white p-4">
        <h3 className="font-bold text-lg">Thực đơn nhà hàng</h3>
      </div>
      
      <nav className="mt-4">
        {menuItems.map((item) => (
          <button
            key={item.id}
            onClick={() => onPageChange(item.id)}
            className={cn(
              "w-full text-left px-4 py-3 hover:bg-gray-100 transition-colors",
              currentPage === item.id 
                ? "text-ushi-red-600 font-medium border-r-2 border-ushi-red-600 bg-red-50" 
                : "text-gray-700"
            )}
          >
            {item.label}
          </button>
        ))}
      </nav>
    </div>
  );
};

export default AdminSidebar;
