
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Badge } from '../ui/badge';
import { Search, Pen, Trash2 } from 'lucide-react';
import useAdminStore from '../../store/useAdminStore';
import ConfirmationModal from '../ConfirmationModal';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '../ui/table';

const MenuItemManagement: React.FC = () => {
  const navigate = useNavigate();
  const { menuItems, deleteMenuItem } = useAdminStore();
  const [searchTerm, setSearchTerm] = useState('');
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [itemToDelete, setItemToDelete] = useState<string | null>(null);

  const filteredItems = menuItems.filter(item =>
    item.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleDeleteClick = (itemId: string) => {
    setItemToDelete(itemId);
    setShowDeleteModal(true);
  };

  const handleConfirmDelete = () => {
    if (itemToDelete) {
      deleteMenuItem(itemToDelete);
      setShowDeleteModal(false);
      setItemToDelete(null);
    }
  };

  const handleEditClick = (itemId: string) => {
    navigate(`/admin/menu/edit/${itemId}`);
  };

  const handleAddNew = () => {
    navigate('/admin/menu/add');
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold mb-4">Quản lý menu</h1>
        
        <div className="flex gap-4 mb-6">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <Input
              placeholder="Nhập từ khóa để tìm kiếm món ăn..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-16">STT</TableHead>
              <TableHead>Tên món ăn</TableHead>
              <TableHead>Trạng thái</TableHead>
              <TableHead className="w-24">Sửa</TableHead>
              <TableHead className="w-24">Xóa</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredItems.map((item, index) => (
              <TableRow key={item.id}>
                <TableCell>{index + 1}</TableCell>
                <TableCell className="font-medium">{item.name}</TableCell>
                <TableCell>
                  <Badge variant="secondary" className="bg-green-100 text-green-800">
                    Đang hoạt động
                  </Badge>
                </TableCell>
                <TableCell>
                  <Button 
                    variant="ghost" 
                    size="sm"
                    onClick={() => handleEditClick(item.id)}
                  >
                    <Pen className="h-4 w-4" />
                  </Button>
                </TableCell>
                <TableCell>
                  <Button 
                    variant="ghost" 
                    size="sm"
                    onClick={() => handleDeleteClick(item.id)}
                  >
                    <Trash2 className="h-4 w-4 text-red-600" />
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      <div className="flex justify-between items-center">
        <div className="flex items-center space-x-2">
          <span className="text-sm text-gray-600">Trang:</span>
          <Button variant="outline" size="sm">1</Button>
          <Button variant="ghost" size="sm">2</Button>
          <Button variant="ghost" size="sm">3</Button>
          <Button variant="ghost" size="sm">Next</Button>
        </div>
        
        <Button 
          className="bg-blue-600 hover:bg-blue-700 text-white"
          onClick={handleAddNew}
        >
          Thêm món ăn mới
        </Button>
      </div>

      {showDeleteModal && (
        <ConfirmationModal
          title="Xác nhận xóa"
          message="Bạn có chắc chắn muốn dừng sử dụng món ăn này?"
          onConfirm={handleConfirmDelete}
          onCancel={() => setShowDeleteModal(false)}
          confirmText="Đồng ý"
          cancelText="Quay lại"
        />
      )}
    </div>
  );
};

export default MenuItemManagement;
