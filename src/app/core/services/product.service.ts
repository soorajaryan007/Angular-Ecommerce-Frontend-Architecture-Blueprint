import { Injectable, inject } from '@angular/core';

import { HttpClient } from '@angular/common/http';

import { Observable, map } from 'rxjs';

import { Product } from '../models/product.model';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  private http = inject(HttpClient);

  getProducts(): Observable<Product[]> {

    return this.http.get<Product[]>(
      '/mock/products.json'
    );
  }

  getProductById(
    id: string
  ): Observable<Product> {

    return this.http
      .get<Product[]>('/mock/products.json')
      .pipe(
        map(products => {

          const product =
            products.find(
              p => p.id === id
            );

          if (!product) {

            throw new Error(
              'Product not found'
            );
          }

          return product;
        })
      );
  }
}