export interface Product {
  id: string | number;
  name: string;
  price: number;
  image: string;
  category?: string;
  description?: string;
  stock?: number;
  rating?: number;
  reviewsCount?: number;
}

export interface CartItem {
  id: string | number;
  product_id: string | number;
  product: Product;
  quantity: number;
  total_price: number;

}

export interface CartAggregate {
  items: CartItem[];
  grand_total: number;
  count: number;
}
