
import React, { useState, useMemo } from 'react';
import { Search, Plus } from 'lucide-react';
import { Input } from './ui/input';
import { Button } from './ui/button';
import { Card, CardContent } from './ui/card';
import { Badge } from './ui/badge';
import useStore from '../store/useStore';
import { menuItems, categories } from '../data/mockData';
import { MenuItem } from '../types';
import MenuItemModal from './MenuItemModal';

const MenuPage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState(categories[0]);
  const [selectedMenuItem, setSelectedMenuItem] = useState<MenuItem | null>(null);
  const { tableNumber, addToCart } = useStore();

  const filteredItems = useMemo(() => {
    let items = menuItems;
    
    if (searchTerm) {
      items = items.filter(item => 
        item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.description.toLowerCase().includes(searchTerm.toLowerCase())
      );
    } else {
      items = items.filter(item => item.category === selectedCategory);
    }
    
    return items;
  }, [searchTerm, selectedCategory]);

  const handleQuickAdd = (menuItem: MenuItem) => {
    const cartItem = {
      id: `cart-${Date.now()}-${menuItem.id}`,
      menuItem,
      quantity: 1,
      selected: true
    };
    addToCart(cartItem);
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: 'VND'
    }).format(price);
  };

  return (
    <div className="flex-1 bg-gray-50 pb-20">
      {/* Table Info Bar */}
      <div className="bg-white border-b border-gray-200 px-4 py-3">
        <div className="flex items-center justify-between text-sm">
          <div className="flex items-center space-x-4">
            <span className="font-semibold text-ushi-red-600">Bàn {tableNumber}</span>
            <span className="text-blue-600 cursor-pointer hover:underline">CTKM</span>
            <span className="text-green-600 cursor-pointer hover:underline">Gọi Nhân viên</span>
          </div>
        </div>
      </div>

      {/* Search Bar */}
      <div className="px-4 py-4 bg-white border-b border-gray-200">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          <Input
            type="text"
            placeholder="Tìm kiếm món ăn..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10 h-12 focus:ring-ushi-red-500 focus:border-ushi-red-500"
          />
        </div>
      </div>

      {/* Categories */}
      {!searchTerm && (
        <div className="px-4 py-4 bg-white border-b border-gray-200">
          <div className="flex space-x-2 overflow-x-auto scrollbar-hide">
            {categories.map((category) => (
              <Badge
                key={category}
                variant={selectedCategory === category ? "default" : "outline"}
                className={`whitespace-nowrap cursor-pointer px-4 py-2 ${
                  selectedCategory === category 
                    ? 'bg-ushi-red-600 text-white hover:bg-ushi-red-700' 
                    : 'hover:bg-ushi-red-50 hover:text-ushi-red-600'
                }`}
                onClick={() => setSelectedCategory(category)}
              >
                {category}
              </Badge>
            ))}
          </div>
        </div>
      )}

      {/* Menu Items */}
      <div className="px-4 py-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredItems.map((item) => (
            <Card key={item.id} className="overflow-hidden hover:shadow-lg transition-shadow cursor-pointer">
              <div onClick={() => setSelectedMenuItem(item)}>
                <div className="aspect-video bg-gray-200 relative overflow-hidden">
                  <img 
                    src={item.image} 
                    alt={item.name}
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <CardContent className="p-4">
                  <h3 className="font-semibold text-lg mb-2 line-clamp-1">{item.name}</h3>
                  <p className="text-gray-600 text-sm mb-3 line-clamp-2">{item.description}</p>
                  <div className="flex items-center justify-between">
                    <span className="text-ushi-red-600 font-bold text-lg">
                      {formatPrice(item.price)}
                    </span>
                  </div>
                </CardContent>
              </div>
              <div className="px-4 pb-4">
                <Button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleQuickAdd(item);
                  }}
                  size="sm"
                  className="w-full bg-ushi-red-600 hover:bg-ushi-red-700 text-white"
                >
                  <Plus className="w-4 h-4 mr-2" />
                  Thêm vào giỏ
                </Button>
              </div>
            </Card>
          ))}
        </div>
      </div>

      {selectedMenuItem && (
        <MenuItemModal
          menuItem={selectedMenuItem}
          onClose={() => setSelectedMenuItem(null)}
        />
      )}
    </div>
  );
};

export default MenuPage;
