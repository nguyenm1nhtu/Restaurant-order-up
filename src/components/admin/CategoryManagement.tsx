
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

const CategoryManagement: React.FC = () => {
  const navigate = useNavigate();
  const { categories, deleteCategory } = useAdminStore();
  const [searchTerm, setSearchTerm] = useState('');
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [categoryToDelete, setCategoryToDelete] = useState<string | null>(null);

  const filteredCategories = categories.filter(category =>
    category.name.toLowerCase().includes(searchTerm.toLowerCase()) && category.status === 'active'
  );

  const handleDeleteClick = (categoryId: string) => {
    setCategoryToDelete(categoryId);
    setShowDeleteModal(true);
  };

  const handleConfirmDelete = () => {
    if (categoryToDelete) {
      deleteCategory(categoryToDelete);
      setShowDeleteModal(false);
      setCategoryToDelete(null);
    }
  };

  const handleEditClick = (categoryId: string) => {
    navigate(`/admin/category/edit/${categoryId}`);
  };

  const handleAddNew = () => {
    navigate('/admin/category/add');
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold mb-4">Quản lý danh mục menu</h1>
        
        <div className="flex gap-4 mb-6">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <Input
              placeholder="Nhập từ khóa để tìm kiếm danh mục..."
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
              <TableHead>Tên danh mục</TableHead>
              <TableHead>Trạng thái</TableHead>
              <TableHead className="w-24">Sửa</TableHead>
              <TableHead className="w-24">Xóa</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredCategories.map((category, index) => (
              <TableRow key={category.id}>
                <TableCell>{index + 1}</TableCell>
                <TableCell className="font-medium">{category.name}</TableCell>
                <TableCell>
                  <Badge variant="secondary" className="bg-green-100 text-green-800">
                    Đang hoạt động
                  </Badge>
                </TableCell>
                <TableCell>
                  <Button 
                    variant="ghost" 
                    size="sm"
                    onClick={() => handleEditClick(category.id)}
                  >
                    <Pen className="h-4 w-4" />
                  </Button>
                </TableCell>
                <TableCell>
                  <Button 
                    variant="ghost" 
                    size="sm"
                    onClick={() => handleDeleteClick(category.id)}
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
          Thêm danh mục mới
        </Button>
      </div>

      {showDeleteModal && (
        <ConfirmationModal
          title="Xác nhận xóa"
          message="Bạn có chắc chắn muốn dừng sử dụng danh mục này?"
          onConfirm={handleConfirmDelete}
          onCancel={() => setShowDeleteModal(false)}
          confirmText="Đồng ý"
          cancelText="Quay lại"
        />
      )}
    </div>
  );
};

export default CategoryManagement;
