import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Product } from '../classes/product';
import { BehaviorSubject, Observable, Subscriber } from 'rxjs';
import { HttpClient } from "@angular/common/http";
import { map, filter } from 'rxjs/operators';

// Get product from Localstorage
let products = JSON.parse(localStorage.getItem("wishlistItem")) || [];
let users_url = `http://localhost:3000/users`;

@Injectable({
  providedIn: 'root'
})
export class WishlistService {
  
  // wishlist array
  public wishlistProducts: BehaviorSubject<Product[]> = new BehaviorSubject([]);
  public observer   :  Subscriber<{}>;

  // Initialize 
  constructor(private toastrService: ToastrService, private http: HttpClient) { 
    this.wishlistProducts.subscribe(products => products = products);
  }

  // Get  wishlist Products
  public getProducts(): Observable<Product[]> {
    products = JSON.parse(localStorage.getItem("wishlistItem")) || [];
    const itemsStream = new Observable(observer => {
      observer.next(products);
      observer.complete();
    });
    return <Observable<Product[]>>itemsStream;
  }

  // If item is aleready added In wishlist
  public hasProduct(product: Product): boolean {
    const item = products.find(item => item.prod_id === product.prod_id);
    return item !== undefined;
  }

  // Add to wishlist
  public addToWishlist(product: Product): Product | boolean {
    let item: Product | boolean = false;
    if (this.hasProduct(product)) {
      item = products.filter(item => item.prod_id === product.prod_id)[0];
      const index = products.indexOf(item);
    } else {
      products.push(product);
    }
    
      const allAddedProducts = JSON.stringify(products);
      const uid = localStorage.getItem("uid");
      this.toastrService.success('This product added to Wishlist.'); // toasr services
      this.http.put(`${users_url}/wishlist/${uid}`, { wishlist: allAddedProducts }).subscribe((res) => {
        console.log(res);
      });
      localStorage.setItem("wishlistItem", allAddedProducts);
      return item;
  }

  // Removed Product
  public removeFromWishlist(product: Product) {
    if (product === undefined) { return; }
    const index = products.indexOf(product);
    products.splice(index, 1);
    const allAddedProducts = JSON.stringify(products);
    const uid = localStorage.getItem("uid");
    this.http.put(`${users_url}/wishlist/${uid}`, { wishlist: allAddedProducts }).subscribe((res) => {
      console.log(res);
    });
    localStorage.setItem("wishlistItem", allAddedProducts);
  }

  getwishlistDetails(uid) {
    return this.http.get(`${users_url}/wishlist/${uid}`);
  }
  

}
