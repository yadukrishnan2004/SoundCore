export interface Product {
  id: string | number;
  name: string;
  price: number;
  offerprice?: number;
  offer?: number;
  image?: string;
  images?: string[];
  category?: string;
  desc?: string;
  description?: string;
  stock?: number;
  rating?: number;
  reviewsCount?: number;
}

export interface CartItem {
  id: string | number;
  product_id?: string | number;
  productId?: string | number;
  product?: Product;
  quantity: number;
  price?: number;
  total_price?: number;
  sub_total?: number;
  name?: string;
  product_name?: string;
  image?: string;
}

export interface CartAggregate {
  items: CartItem[];
  grand_total: number;
  count: number;
}
