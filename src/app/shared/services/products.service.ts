import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { ToastrService } from 'ngx-toastr';
import { Product } from '../classes/product';
import { BehaviorSubject, Observable, of, Subscriber} from 'rxjs';
import { map, filter, scan } from 'rxjs/operators';

// Get product from Localstorage
let products = JSON.parse(localStorage.getItem("compareItem")) || [];

@Injectable()

export class ProductsService {
  
  public currency : string = 'INR';
  public catalogMode : boolean = false;
  
  public compareProducts : BehaviorSubject<Product[]> = new BehaviorSubject([]);
  public observer   :  Subscriber<{}>;

  // Initialize 
  constructor(private http: Http,private toastrService: ToastrService) { 
     this.compareProducts.subscribe(products => products = products);
  }

  // Observable Product Array
  private products(): Observable<Product[]> {
     return this.http.get(`http://localhost:3000/products/productsByCity/${localStorage.getItem('city')}`).pipe(map((res:any) => res.json()));
  }

  // Get Products
  public getProducts(): Observable<Product[]> {
    return this.products();
  }

  // Get Products By Id
  public getProduct(id: string): Observable<Product> {
    return this.products().pipe(map(items => {
      return items.find((item: Product) => {
        return item.prod_id === id;
      });
    }));
  }

   // Get Products By category
  public getProductByCategory(category: string): Observable<Product[]> {
    return this.products().pipe(map(items =>
       items.filter((item: Product) => {
         if (category === 'all') {
          return item;
         } else {
          /*return item.prod_tags.includes(category.toLowerCase())
            && item.prod_available_cities.includes(localStorage.getItem('city').toLowerCase()); */
            if(item.prod_tags.filter(s => s.includes(category.toLowerCase())).length > 0) {
              return true;
            } else {
              return false;
            }
         }
       })
     ));
  }

  public getAllCategories() {
    this.products().pipe(map(items =>
      items.filter((item: Product) => {
        return item.cat_name;
      })
    ));
  }

   /*
      ---------------------------------------------
      ----------  Compare Product  ----------------
      ---------------------------------------------
   */

  // Get Compare Products
  public getComapreProducts(): Observable<Product[]> {
    const itemsStream = new Observable(observer => {
      observer.next(products);
      observer.complete();
    });
    return <Observable<Product[]>>itemsStream;
  }

  // If item is aleready added In compare
  public hasProduct(product: Product): boolean {
    const item = products.find(item => item.id === product.id);
    return item !== undefined;
  }

  // Add to compare
  public addToCompare(product: Product): Product | boolean {
    var item: Product | boolean = false;
    if (this.hasProduct(product)) {
      item = products.filter(item => item.id === product.id)[0];
      const index = products.indexOf(item);
    } else {
      if(products.length < 4)
        products.push(product);
      else 
        this.toastrService.warning('Maximum 4 products are in compare.'); // toasr services
    }
      localStorage.setItem("compareItem", JSON.stringify(products));
      return item;
  }

  // Removed Product
  public removeFromCompare(product: Product) {
    if (product === undefined) { return; }
    const index = products.indexOf(product);
    products.splice(index, 1);
    localStorage.setItem("compareItem", JSON.stringify(products));
  }
   
}