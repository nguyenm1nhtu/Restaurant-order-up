
import React, { useState } from 'react';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Badge } from '../ui/badge';
import { Search, RotateCcw } from 'lucide-react';
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

const InactiveItemsManagement: React.FC = () => {
  const { inactiveMenuItems, restoreMenuItem } = useAdminStore();
  const [searchTerm, setSearchTerm] = useState('');
  const [showRestoreModal, setShowRestoreModal] = useState(false);
  const [itemToRestore, setItemToRestore] = useState<string | null>(null);

  const filteredItems = inactiveMenuItems.filter(item =>
    item.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleRestoreClick = (itemId: string) => {
    setItemToRestore(itemId);
    setShowRestoreModal(true);
  };

  const handleConfirmRestore = () => {
    if (itemToRestore) {
      restoreMenuItem(itemToRestore);
      setShowRestoreModal(false);
      setItemToRestore(null);
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold mb-4">Các món ngưng bán</h1>
        
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
              <TableHead>Danh mục</TableHead>
              <TableHead className="w-24">Khôi phục</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredItems.map((item, index) => (
              <TableRow key={item.id}>
                <TableCell>{index + 1}</TableCell>
                <TableCell className="font-medium">{item.name}</TableCell>
                <TableCell>{item.category}</TableCell>
                <TableCell>
                  <Button 
                    variant="ghost" 
                    size="sm"
                    onClick={() => handleRestoreClick(item.id)}
                  >
                    <RotateCcw className="h-4 w-4 text-green-600" />
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
      </div>

      {showRestoreModal && (
        <ConfirmationModal
          title="Xác nhận khôi phục"
          message="Bạn có chắc chắn muốn khôi phục món ăn này?"
          onConfirm={handleConfirmRestore}
          onCancel={() => setShowRestoreModal(false)}
          confirmText="Đồng ý"
          cancelText="Quay lại"
        />
      )}
    </div>
  );
};

export default InactiveItemsManagement;
