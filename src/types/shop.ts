import type { ReactNode } from 'react';

export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  originalPrice?: number;
  category: string;
  image?: string;
  icon?: ReactNode;
  badge?: string;
  rating?: number;
  reviewCount?: number;
  inStock: boolean;
  createdAt?: string;
}

export interface ProductFilters {
  search?: string;
  category?: string;
  priceRange?: string;
  sortBy?: string;
}

export interface CartItem {
  product: Product;
  quantity: number;
}

export interface ShopState {
  products: Product[];
  cart: CartItem[];
  wishlist: string[];
  filters: ProductFilters;
}