import { Injectable } from '@angular/core';
import { Product } from '../classes/product';
import { CartItem } from '../classes/cart-item';
import { Order } from '../classes/order';
import { Orders } from '../classes/orders';
import { BehaviorSubject, Observable } from 'rxjs';
import { map, filter } from 'rxjs/operators';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})

export class OrderService {
  
  // Array
  public OrderDetails;
  orders_url = `http://localhost:3000/orders`;

  constructor(private router: Router,private http: HttpClient) { }

  // Get order items
  public getOrderItems() : Order {
    return this.OrderDetails;
  }

  public getorders(id): Observable<Orders[]>{
    return this.http.get<Orders[]>(`${this.orders_url}/${id}`);
  }

  // Create order
  public createOrder(product: any, details: any, orderId: any, amount: any) {
    var item = {
        shippingDetails: details,
        product: product,
        orderId: orderId,
        totalAmount: amount
    };
    this.OrderDetails = item;
    this.router.navigate(['/checkout/success']);
  }

}
