
import { create } from 'zustand';
import { AdminUser, Category, MenuItem } from '../types/admin';

interface AdminStore {
  // Auth
  adminUser: AdminUser | null;
  isAuthenticated: boolean;
  login: (employeeCode: string, password: string) => Promise<boolean>;
  logout: () => void;
  
  // Categories
  categories: Category[];
  setCategories: (categories: Category[]) => void;
  addCategory: (category: Category) => void;
  updateCategory: (id: string, updates: Partial<Category>) => void;
  deleteCategory: (id: string) => void;
  
  // Menu Items
  menuItems: MenuItem[];
  inactiveMenuItems: MenuItem[];
  setMenuItems: (items: MenuItem[]) => void;
  addMenuItem: (item: MenuItem) => void;
  updateMenuItem: (id: string, updates: Partial<MenuItem>) => void;
  deleteMenuItem: (id: string) => void;
  restoreMenuItem: (id: string) => void;
  
  // UI State
  currentAdminPage: string;
  setCurrentAdminPage: (page: string) => void;
}

// Mock data
const mockCategories: Category[] = [
  {
    id: '1',
    name: 'Thịt bò Aging',
    description: 'Thịt bò cao cấp được ủ theo phương pháp truyền thống',
    status: 'active'
  },
  {
    id: '2',
    name: 'Side Dish',
    description: 'Các món ăn kèm đa dạng',
    status: 'active'
  },
  {
    id: '3', 
    name: 'Pasta',
    description: 'Các loại mì Ý',
    status: 'active'
  }
];

const mockMenuItems: MenuItem[] = [
  {
    id: '1',
    name: 'Kazoku Shiawase Combo',
    categoryId: '1',
    category: 'Thịt bò Aging',
    price: 850000,
    type: 'combo',
    description: 'Combo gia đình hạnh phúc với thịt bò cao cấp',
    status: 'active',
    comboItems: ['Thịt bò Wagyu A5', 'Rau củ tươi', 'Cơm trắng']
  },
  {
    id: '2',
    name: 'Wagyu Saiko Combo',
    categoryId: '1',
    category: 'Thịt bò Aging',
    price: 1200000,
    type: 'combo',
    description: 'Combo Wagyu cao cấp nhất',
    status: 'active',
    comboItems: ['Thịt bò Wagyu A5+', 'Rau củ premium', 'Cơm đặc biệt']
  }
];

const useAdminStore = create<AdminStore>((set, get) => ({
  adminUser: null,
  isAuthenticated: false,
  
  login: async (employeeCode: string, password: string) => {
    // Mock login - in real app this would call API
    if (employeeCode === 'ADMIN001' && password === 'admin123') {
      const user: AdminUser = {
        id: '1',
        employeeCode: 'ADMIN001',
        name: 'Quản lý chính',
        role: 'admin'
      };
      set({ adminUser: user, isAuthenticated: true });
      return true;
    }
    return false;
  },
  
  logout: () => {
    set({ adminUser: null, isAuthenticated: false });
  },
  
  categories: mockCategories,
  setCategories: (categories) => set({ categories }),
  addCategory: (category) => set((state) => ({ 
    categories: [...state.categories, category] 
  })),
  updateCategory: (id, updates) => set((state) => ({
    categories: state.categories.map(cat => 
      cat.id === id ? { ...cat, ...updates } : cat
    )
  })),
  deleteCategory: (id) => set((state) => ({
    categories: state.categories.map(cat =>
      cat.id === id ? { ...cat, status: 'inactive' as const } : cat
    )
  })),
  
  menuItems: mockMenuItems,
  inactiveMenuItems: [],
  setMenuItems: (items) => set({ menuItems: items }),
  addMenuItem: (item) => set((state) => ({ 
    menuItems: [...state.menuItems, item] 
  })),
  updateMenuItem: (id, updates) => set((state) => ({
    menuItems: state.menuItems.map(item => 
      item.id === id ? { ...item, ...updates } : item
    )
  })),
  deleteMenuItem: (id) => set((state) => {
    const itemToDelete = state.menuItems.find(item => item.id === id);
    if (itemToDelete) {
      return {
        menuItems: state.menuItems.filter(item => item.id !== id),
        inactiveMenuItems: [...state.inactiveMenuItems, { ...itemToDelete, status: 'inactive' as const }]
      };
    }
    return state;
  }),
  restoreMenuItem: (id) => set((state) => {
    const itemToRestore = state.inactiveMenuItems.find(item => item.id === id);
    if (itemToRestore) {
      return {
        inactiveMenuItems: state.inactiveMenuItems.filter(item => item.id !== id),
        menuItems: [...state.menuItems, { ...itemToRestore, status: 'active' as const }]
      };
    }
    return state;
  }),
  
  currentAdminPage: 'dashboard',
  setCurrentAdminPage: (page) => set({ currentAdminPage: page }),
}));

export default useAdminStore;
