import {
  Component,
  inject
} from '@angular/core';

import { CommonModule } from '@angular/common';

import { ReactiveFormsModule } from '@angular/forms';

import { CartService } from '../../../../core/services/cart.service';

import { OrderService } from '../../../../core/services/order.service';

@Component({
  selector: 'app-checkout-page',

  standalone: true,

  imports: [
    CommonModule,
    ReactiveFormsModule
  ],

  templateUrl: './checkout-page.html',

  styleUrl: './checkout-page.scss'
})
export class CheckoutPage {

  private cartService =
    inject(CartService);

  private orderService =
  inject(OrderService);

  cartItems =
    this.cartService.cartItems;

  totalPrice =
    this.cartService.totalPrice;

placeOrder(): void {

  const order = {

    id:
      'ORD' + Date.now(),

    items:
      this.cartItems(),

    totalAmount:
      this.totalPrice(),

    createdAt:
      new Date().toISOString(),

    status:
      'PLACED' as const
  };

  this.orderService
    .placeOrder(order);

  this.cartService
    .clearCart();

  alert(
    'Order placed successfully 🚀'
  );
}
}