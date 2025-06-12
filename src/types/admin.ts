
export interface AdminUser {
  id: string;
  employeeCode: string;
  name: string;
  role: 'admin' | 'manager';
}

export interface Category {
  id: string;
  name: string;
  description: string;
  image?: string;
  status: 'active' | 'inactive';
  menuItems?: MenuItem[];
}

export interface MenuItem {
  id: string;
  name: string;
  categoryId: string;
  category: string;
  price: number;
  type: 'combo' | 'single';
  description: string;
  image?: string;
  status: 'active' | 'inactive';
  comboItems?: string[];
}
