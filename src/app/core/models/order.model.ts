import { CartItem } from './cart-item.model';

export interface Order {

  id?: string;

  customerName: string;

  phone: string;

  address: string;

  city: string;

  state: string;

  pincode: string;

  items: CartItem[];

  totalAmount: number;

  status: string;

  createdAt: string;
}