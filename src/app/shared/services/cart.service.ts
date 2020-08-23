import { Injectable } from "@angular/core";
import { Product } from "../classes/product";
import { CartItem } from "../classes/cart-item";
import { ToastrService } from "ngx-toastr";
import { BehaviorSubject, Observable, Subscriber } from "rxjs";
import { map, filter } from "rxjs/operators";
import { HttpClient } from "@angular/common/http";

// Get product from Localstorage
let products = JSON.parse(localStorage.getItem("cartItem")) || [];
let users_url = `http://localhost:3000/users`;


@Injectable({
  providedIn: "root",
})
export class CartService {
  // Array
  public cartItems: BehaviorSubject<CartItem[]> = new BehaviorSubject([]);
  public observer: Subscriber<{}>;
  constructor(private toastrService: ToastrService, private http: HttpClient) {
    this.cartItems.subscribe((products) => (products = products));
  }

  // Get Products
  public getItems(): Observable<CartItem[]> {
    products = JSON.parse(localStorage.getItem("cartItem")) || [];
    const itemsStream = new Observable((observer) => {
      observer.next(products);
      observer.complete();
    });
    return <Observable<CartItem[]>>itemsStream;
  }

  // Add to cart
  public addToCart(product: Product, quantity: number,tenures:number, tenure_price: number, deliveryDate:Date): CartItem | boolean{
    var item: CartItem | boolean = false;
    // If Products exist
    let hasItem = products.find((items, index) => {
      if (items.product.prod_id == product.prod_id) {
        let qty = products[index].quantity + quantity;
        products[index].tenures=tenures;
        products[index].tenure_price=tenure_price;
        products[index].deliveryDate=deliveryDate;
        //let stock = this.calculateStockCounts(products[index], quantity);
        // if (qty != 0 && stock) {
        if (qty !== 0) {
          products[index]["quantity"] = qty;
          this.toastrService.success("This product has been added.");
        }        
        return true;
      }
    });
    // If Products does not exist (Add New Products)
    if(!hasItem) {
        item = { product: product, quantity: quantity, tenures: tenures, tenure_price: tenure_price, deliveryDate : deliveryDate};
        products.push(item);
        this.toastrService.success('This product has been added.');
    }

    const allAddedProducts = JSON.stringify(products);
    const uid = localStorage.getItem("uid");

    document.querySelector('.cart_qty_cls').textContent = products.length;

    this.http.put(`${users_url}/cart/${uid}`, { cart: allAddedProducts }).subscribe((res) => {
      console.log(res);
    });

    localStorage.setItem("cartItem", allAddedProducts);
    return item;
  }

  // Update Cart Value
  public updateCartQuantity(
    product: Product,
    quantity: number
  ): CartItem | boolean {
    return products.find((items, index) => {
      if (items.product.prod_id == product.prod_id) {
        let qty = products[index].quantity + quantity;
        let stock = this.calculateStockCounts(products[index], quantity);
        if (qty !== 0 && stock) {products[index]['quantity'] = qty };
        const allAddedProducts = JSON.stringify(products);
        const uid = localStorage.getItem('uid');
        const email = localStorage.getItem('email');

        this.http.put(`${users_url}/cart/${uid}`, { cart: allAddedProducts, email: email }).subscribe((res) => {
          console.log(res);
        })
        localStorage.setItem('cartItem', JSON.stringify(products));
        return true;
      }
    });
  }

  // Calculate Product stock Counts
  public calculateStockCounts(product: CartItem, quantity): CartItem | Boolean {
    let qty = product.quantity + quantity;
    let stock = product.product.stock;
    if (stock < qty) {
      this.toastrService.error(
        "You can not add more items than available. In stock " +
          stock +
          " items."
      );
      return false;
    }
    return true;
  }

  // Removed in cart
  public removeFromCart(item: CartItem) {
    if (item === undefined) return false;
    const index = products.indexOf(item);
    products.splice(index, 1);
    localStorage.setItem("cartItem", JSON.stringify(products));
    const uid = localStorage.getItem('uid');
    this.http.put(`${users_url}/cart/${uid}`, { cart: JSON.stringify(products) }).subscribe((res) => {
      console.log(res);
    });
    document.querySelector('.cart_qty_cls').textContent = products.length;
  }


  // Total amount
  public getTotalAmount(): Observable<number> {
    return this.cartItems.pipe(
      map((product: CartItem[]) => {
        return products.reduce((prev, curr: any) => {
          return prev + (parseInt(curr.tenure_price)+curr.product.prod_price) * curr.quantity;
        }, 0);
      })
    );
  }

  public getTotalTenureAmount(): Observable<number> {
    return this.cartItems.pipe(
      map((product: CartItem[]) => {
        return products.reduce((prev, curr: any) => {
          return prev + (parseInt(curr.tenure_price)) * curr.quantity;
        }, 0);
      })
    );
  }

  public getTotalDepositAmount(): Observable<number> {
    return this.cartItems.pipe(
      map((product: CartItem[]) => {
        return products.reduce((prev, curr: any) => {
          return prev + (curr.product.prod_price) * curr.quantity;
        }, 0);
      })
    );
  }

  getCartDetails(uid) {
    return this.http.get(`${users_url}/cart/${uid}`);
  }
}
