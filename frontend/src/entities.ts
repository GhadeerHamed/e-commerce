
export interface User {
  id: number;
  name: string;
  email: string;
  role: 'customer' | 'supplier' | string;
  email_verified_at?: string | null;
  created_at?: string;
  updated_at?: string;
}

export interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  quantity: number;
  supplier?: string;
}

export interface CartItem {
  id: number;
  quantity: number;
  unit_price: number;
  total_price: number;
  product: Product;
}

export interface Cart {
  id: number;
  items: CartItem[];
  total_price: number;
}

export interface Order {
  id: number;
  total_price: number;
  status: string;
  created_at: string;
  user?: Pick<User, 'id' | 'name'>;
  items?: CartItem[];
}

export interface PaginationLinks {
  first: string;
  last: string;
  prev: string | null;
  next: string | null;
}

export interface PaginationMeta {
  current_page: number;
  from: number;
  last_page: number;
  links: Array<{
    url: string | null;
    label: string;
    active: boolean;
  }>;
  path: string;
  per_page: number;
  to: number;
  total: number;
}

export interface PaginatedResponse<T> {
  data: T[];
  links: PaginationLinks;
  meta: PaginationMeta;
}