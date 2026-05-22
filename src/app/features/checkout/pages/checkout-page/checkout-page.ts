import {
  Component,
  inject
} from '@angular/core';

import { CommonModule } from '@angular/common';

import { ReactiveFormsModule } from '@angular/forms';

import { CartService } from '../../../../core/services/cart.service';

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

  cartItems =
    this.cartService.cartItems;

  totalPrice =
    this.cartService.totalPrice;

  placeOrder(): void {

    alert(
      'Order placed successfully 🚀'
    );

    this.cartService.clearCart();
  }
}