
import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Textarea } from '../ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import useAdminStore from '../../store/useAdminStore';
import AdminSidebar from './AdminSidebar';

const EditMenuItemForm: React.FC = () => {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const { categories, menuItems, updateMenuItem, logout } = useAdminStore();
  const [formData, setFormData] = useState({
    name: '',
    categoryId: '',
    price: '',
    type: 'single' as 'combo' | 'single',
    description: '',
    image: ''
  });

  useEffect(() => {
    if (id) {
      const menuItem = menuItems.find(item => item.id === id);
      if (menuItem) {
        setFormData({
          name: menuItem.name,
          categoryId: menuItem.categoryId,
          price: menuItem.price.toString(),
          type: menuItem.type,
          description: menuItem.description,
          image: menuItem.image || ''
        });
      }
    }
  }, [id, menuItems]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (id) {
      const selectedCategory = categories.find(cat => cat.id === formData.categoryId);
      updateMenuItem(id, {
        name: formData.name,
        categoryId: formData.categoryId,
        category: selectedCategory?.name || '',
        price: parseInt(formData.price),
        type: formData.type,
        description: formData.description,
        image: formData.image
      });
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
        <AdminSidebar currentPage="menu" onPageChange={() => {}} />
        <div className="flex-1 p-6">
          <div className="max-w-2xl mx-auto">
            <h1 className="text-2xl font-bold mb-6">Chỉnh sửa món ăn</h1>
            
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <Label htmlFor="name">Tên món ăn</Label>
                <Input
                  id="name"
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="Nhập tên món ăn"
                  required
                />
              </div>

              <div>
                <Label htmlFor="category">Danh mục</Label>
                <Select value={formData.categoryId} onValueChange={(value) => setFormData({ ...formData, categoryId: value })}>
                  <SelectTrigger>
                    <SelectValue placeholder="Chọn danh mục" />
                  </SelectTrigger>
                  <SelectContent>
                    {categories.map((category) => (
                      <SelectItem key={category.id} value={category.id}>
                        {category.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="price">Giá bán</Label>
                <Input
                  id="price"
                  type="number"
                  value={formData.price}
                  onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                  placeholder="Nhập giá bán"
                  required
                />
              </div>

              <div>
                <Label htmlFor="type">Loại món</Label>
                <Select value={formData.type} onValueChange={(value: 'combo' | 'single') => setFormData({ ...formData, type: value })}>
                  <SelectTrigger>
                    <SelectValue placeholder="Chọn loại món" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="single">Món lẻ</SelectItem>
                    <SelectItem value="combo">Combo</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="description">Mô tả</Label>
                <Textarea
                  id="description"
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  placeholder="Nhập mô tả món ăn"
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

export default EditMenuItemForm;
