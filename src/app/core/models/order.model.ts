import { CartItem } from './cart-item.model';

export interface Order {

  id: string;

  items: CartItem[];

  totalAmount: number;

  createdAt: string;

  status:
    | 'PLACED'
    | 'SHIPPED'
    | 'DELIVERED';
}