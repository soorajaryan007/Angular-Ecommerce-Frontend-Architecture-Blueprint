import {
  Component,
  OnInit,
  inject
} from '@angular/core';

import { CommonModule } from '@angular/common';

import { ActivatedRoute } from '@angular/router';

import { ProductService } from '../../../../core/services/product.service';

import { Product } from '../../../../core/models/product.model';

@Component({
  selector: 'app-product-detail',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './product-detail.html',
  styleUrls: ['./product-detail.scss']
})
export class ProductDetail implements OnInit {

  private route = inject(ActivatedRoute);

  private productService = inject(ProductService);

  product: Product | null = null;

  ngOnInit(): void {

    const productId =
      this.route.snapshot.paramMap.get('productId');

    console.log(productId);

    if (productId) {

      this.productService
        .getProductById(productId)
        .subscribe({

          next: (
            response: Product | undefined
          ) => {

            console.log(response);

            if (response) {

              this.product = response;
            }
          },

          error: (error: any) => {

            console.error(error);
          }
        });
    }
  }
}