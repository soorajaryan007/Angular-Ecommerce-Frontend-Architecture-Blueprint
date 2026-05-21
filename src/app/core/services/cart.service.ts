import { Injectable, signal } from '@angular/core';

import { CartItem } from '../models/cart-item.model';
import { Product } from '../models/product.model';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  cartItems = signal<CartItem[]>([]);

  addToCart(product: Product): void {

    const items = this.cartItems();

    const existingItem = items.find(
      item => item.product.id === product.id
    );

    if (existingItem) {

      existingItem.quantity += 1;

      this.cartItems.set([...items]);

    } else {

      this.cartItems.set([
        ...items,
        {
          product,
          quantity: 1
        }
      ]);
    }
  }

  removeFromCart(productId: string): void {

    this.cartItems.set(
      this.cartItems().filter(
        item => item.product.id !== productId
      )
    );
  }

  getCartTotal(): number {

    return this.cartItems()
      .reduce(
        (total, item) =>
          total +
          item.product.discountPrice *
          item.quantity,
        0
      );
  }
}