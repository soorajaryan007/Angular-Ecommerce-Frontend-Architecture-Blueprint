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
      '/assets/mock/products.json'
    );
  }

  getProductById(
    id: string
  ): Observable<Product | undefined> {

    return this.http
      .get<Product[]>('/mock/products.json')
      .pipe(
        map(products =>
          products.find(
            product => product.id === id
          )
        )
      );
  }

}