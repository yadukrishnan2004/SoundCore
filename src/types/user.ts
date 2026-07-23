export interface User {
  id: string | number;
  name: string;
  email: string;
  role?: 'admin' | 'user';
  createdAt?: string;
}

export interface WishlistAggregate {
  item: any[];
  count: number;
}
