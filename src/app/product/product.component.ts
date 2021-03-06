import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Product } from '../shared/classes/product';
import { CartItem } from '../shared/classes/cart-item';
import { ProductsService } from '../shared/services/products.service';
import { WishlistService } from '../shared/services/wishlist.service';
import { CartService } from '../shared/services/cart.service';
import { Observable, of } from 'rxjs';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent implements OnInit {

  @Input() product : Product;

  public url;

  city=localStorage.getItem('city');

  public variantImage  :  any = ''; 
  public selectedItem  :  any = '';

  constructor(private router: Router, public productsService: ProductsService, 
    private wishlistService: WishlistService, private cartService: CartService) { 
  }

  ngOnInit() { 
    if(this.router.url.includes("category")){
      this.url="../../product";
    }
    else{
      this.url="product";
    }
   }

  // Add to cart
  public addToCart(product: Product,  quantity: number = 1,tenures, tenure_price, deliveryDate:Date) {
    this.cartService.addToCart(product, quantity,tenures, tenure_price, deliveryDate);
  }

  // Add to compare
  public addToCompare(product: Product) {
     this.productsService.addToCompare(product);
  }

  // Add to wishlist
  public addToWishlist(product: Product) {
     this.wishlistService.addToWishlist(product);
  }
 
 // Change variant images
  public changeVariantImage(image) {
     this.variantImage = image;
     this.selectedItem = image; 
  } 

}
