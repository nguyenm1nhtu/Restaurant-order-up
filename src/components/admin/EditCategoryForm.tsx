
import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Textarea } from '../ui/textarea';
import useAdminStore from '../../store/useAdminStore';
import AdminSidebar from './AdminSidebar';

const EditCategoryForm: React.FC = () => {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const { categories, updateCategory, logout } = useAdminStore();
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    image: ''
  });

  useEffect(() => {
    if (id) {
      const category = categories.find(cat => cat.id === id);
      if (category) {
        setFormData({
          name: category.name,
          description: category.description,
          image: category.image || ''
        });
      }
    }
  }, [id, categories]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (id) {
      updateCategory(id, formData);
      navigate('/admin/menu');
    }
  };

  const handleLogout = () => {
    logout();
    navigate('/admin/login');
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
            <Button onClick={() => navigate('/admin')} variant="outline">
              Về trang chủ
            </Button>
            <Button onClick={handleLogout} variant="outline" className="text-red-600 border-red-600 hover:bg-red-50">
              Đăng xuất
            </Button>
          </div>
        </div>
      </div>

      <div className="flex">
        <AdminSidebar currentPage="categories" onPageChange={() => {}} />
        <div className="flex-1 p-6">
          <div className="max-w-2xl mx-auto">
            <h1 className="text-2xl font-bold mb-6">Chỉnh sửa danh mục</h1>
            
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <Label htmlFor="name">Tên danh mục</Label>
                <Input
                  id="name"
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="Nhập tên danh mục"
                  required
                />
              </div>

              <div>
                <Label htmlFor="description">Mô tả</Label>
                <Textarea
                  id="description"
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  placeholder="Nhập mô tả danh mục"
                  rows={4}
                />
              </div>

              <div>
                <Label htmlFor="image">Hình ảnh</Label>
                <Input
                  id="image"
                  type="file"
                  accept="image/*"
                  onChange={(e) => {
                    const file = e.target.files?.[0];
                    if (file) {
                      const reader = new FileReader();
                      reader.onload = (e) => {
                        setFormData({ ...formData, image: e.target?.result as string });
                      };
                      reader.readAsDataURL(file);
                    }
                  }}
                />
              </div>

              <div>
                <Label>Trạng thái</Label>
                <div className="mt-2">
                  <span className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-green-100 text-green-800">
                    Đang hoạt động
                  </span>
                </div>
              </div>

              <div className="flex justify-end">
                <Button type="submit" className="bg-blue-600 hover:bg-blue-700 text-white">
                  Lưu
                </Button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditCategoryForm;
