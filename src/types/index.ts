export interface Category {
  id: number;
  name: string;
  slug: string;
  image: string;
  creationAt: string;
  updatedAt: string;
}

export interface Product {
  id: number;
  title: string;
  slug: string;
  price: number;
  description: string;
  category: Category;
  images: string[];
  creationAt: string;
  updatedAt: string;
}

export interface Form {
  title: string;
  description: string;
  price: number;
  categoryId: number;
  images?: string[];
}

export interface Auth {
  access_token: string | undefined;
  refresh_token: string | undefined;
}

export interface User {
  id: number;
  email: string;
  password: string;
  name: string;
  role: 'customer' | 'admin' | 'seller'; // ou apenas "customer" se for fixo
  avatar: string;
  creationAt: string; // ISO date string
  updatedAt: string;
}
