import {
  Injectable,
  inject
} from '@angular/core';

import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs';

import { environment } from '../../../environments/environment';

import { Order } from '../models/order.model';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  private http =
    inject(HttpClient);

  placeOrder(
    order: Order
  ): Observable<Order> {

    return this.http.post<Order>(

      `${environment.apiBaseUrl}/orders`,
      order
    );
  }

  getOrders(): Observable<Order[]> {

    return this.http.get<Order[]>(

      `${environment.apiBaseUrl}/orders`
    );
  }
}