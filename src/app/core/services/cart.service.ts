import {
  Injectable,
  signal,
  computed
} from '@angular/core';

import { CartItem } from '../models/cart-item.model';

import { Product } from '../models/product.model';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  cartItems =
    signal<CartItem[]>([]);

  totalPrice =
    computed(() => {

      return this.cartItems()
        .reduce(

          (total, item) =>

            total +
            (
              item.product.discountPrice *
              item.quantity
            ),

          0
        );
    });

  addToCart(
    product: Product
  ): void {

    const items =
      this.cartItems();

    const existingItem =
      items.find(

        item =>
          item.product.id === product.id
      );

    if (existingItem) {

      existingItem.quantity++;
    }

    else {

      items.push({

        product,
        quantity: 1
      });
    }

    this.cartItems.set([...items]);
  }

  removeFromCart(
    productId: string
  ): void {

    const filteredItems =
      this.cartItems()
        .filter(

          item =>
            item.product.id !== productId
        );

    this.cartItems.set(filteredItems);
  }

  clearCart(): void {

    this.cartItems.set([]);
  }
}