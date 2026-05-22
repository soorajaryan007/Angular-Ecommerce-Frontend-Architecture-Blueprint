import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { CartService } from '../../../../core/services/cart.service';

@Component({
  selector: 'app-cart-page',
  standalone: true,
  imports: [
  CommonModule,
  RouterModule
],
  templateUrl: './cart-page.html',
  styleUrl: './cart-page.scss'
})
export class CartPage {

  cartService = inject(CartService);

}