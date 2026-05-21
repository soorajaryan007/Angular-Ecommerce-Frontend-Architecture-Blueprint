import { Component, Input, inject } from '@angular/core';

import { CommonModule } from '@angular/common';

import { RouterLink } from '@angular/router';

import { Product } from '../../../core/models/product.model';

import { CartService } from '../../../core/services/cart.service';

@Component({
  selector: 'app-product-card',
  standalone: true,
  imports: [
    CommonModule,
    RouterLink
  ],
  templateUrl: './product-card.html',
  styleUrl: './product-card.scss'
})
export class ProductCard {

  @Input() product!: Product;

  private cartService = inject(CartService);

  addToCart(): void {

    this.cartService.addToCart(this.product);
  }

}