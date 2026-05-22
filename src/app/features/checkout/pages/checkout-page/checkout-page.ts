import {
  Component,
  inject
} from '@angular/core';

import { CommonModule } from '@angular/common';

import {
  FormBuilder,
  ReactiveFormsModule,
  Validators
} from '@angular/forms';

import { Router } from '@angular/router';

import { CartService } from '../../../../core/services/cart.service';

import { OrderService } from '../../../../core/services/order.service';

import { Order } from '../../../../core/models/order.model';

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

  private fb =
    inject(FormBuilder);

  private cartService =
    inject(CartService);

  private orderService =
    inject(OrderService);

  private router =
    inject(Router);

  cartItems =
    this.cartService.cartItems;

  totalPrice =
    this.cartService.totalPrice;

  checkoutForm =
    this.fb.group({

      customerName: [
        '',
        Validators.required
      ],

      phone: [
        '',
        Validators.required
      ],

      address: [
        '',
        Validators.required
      ],

      city: [
        '',
        Validators.required
      ],

      state: [
        '',
        Validators.required
      ],

      pincode: [
        '',
        Validators.required
      ]
    });

  placeOrder(): void {

    if (
      this.checkoutForm.invalid
    ) {

      this.checkoutForm
        .markAllAsTouched();

      return;
    }

    if (
      this.cartItems().length === 0
    ) {

      alert(
        'Cart is empty'
      );

      return;
    }

    const formValue =
      this.checkoutForm.value;

    const order: Order = {

      customerName:
        formValue.customerName || '',

      phone:
        formValue.phone || '',

      address:
        formValue.address || '',

      city:
        formValue.city || '',

      state:
        formValue.state || '',

      pincode:
        formValue.pincode || '',

      items:
        this.cartItems(),

      totalAmount:
        this.totalPrice(),

      status: 'PLACED',

      createdAt:
        new Date().toISOString()
    };

    this.orderService
      .placeOrder(order)
      .subscribe({

        next: () => {

          this.cartService
            .clearCart();

          alert(
            'Order placed successfully 🚀'
          );

          this.router.navigate(
            ['/orders']
          );
        },

        error: () => {

          alert(
            'Failed to place order'
          );
        }
      });
  }
}