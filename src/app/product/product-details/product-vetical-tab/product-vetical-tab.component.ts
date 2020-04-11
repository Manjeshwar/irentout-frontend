import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router} from '@angular/router';
import { Product } from '../../../shared/classes/product';
import { ProductsService } from '../../../shared/services/products.service';
import { WishlistService } from '../../../shared/services/wishlist.service';
import { CartService } from '../../../shared/services/cart.service';
import { Observable, of } from 'rxjs';

@Component({
  selector: 'app-product-vetical-tab',
  templateUrl: './product-vetical-tab.component.html',
  styleUrls: ['./product-vetical-tab.component.scss']
})
export class ProductVeticalTabComponent implements OnInit {

  public product            :   Product = {};
  public products           :   Product[] = [];
  public counter            :   number = 1; 
  public selectedSize       :   any = '';
  
  tenures = 3;
  tenure_price = 2999;
  security_deposit= 0;
  
  //Get Product By Id
  constructor(private route: ActivatedRoute, private router: Router,
    public productsService: ProductsService, private wishlistService: WishlistService,
    private cartService: CartService) {
      this.route.params.subscribe(params => {
        const id: string = params['id'];
        this.productsService.getProduct(id).subscribe(product => {
          this.product = product;
          this.security_deposit = parseInt(product.prod_price);
          this.tenure_price = product.prod_tenure[0][1];
        })
      });
  }

  ngOnInit() {
     this.productsService.getProducts().subscribe(product => this.products = product);
  }

  calcPrice(price,deposit, month){
    this.tenure_price=price;
    this.security_deposit=deposit;
    this.tenures = month;
  }

  public slideConfig = {
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: true,
    fade: true,
  };

  public slideNavConfig = {
    vertical: false,
    slidesToShow: 3,
    slidesToScroll: 1,
    asNavFor: '.product-slick',
    arrows: false,
    dots: false,
    focusOnSelect: true
  }

  public increment() { 
      this.counter += 1;
  }
  
  public decrement() {
      if(this.counter >1){
          this.counter -= 1;
      }
  }

  // Add to cart
  public addToCart(product: Product, quantity) {
    if (quantity == 0) return false;
    this.cartService.addToCart(product, parseInt(quantity));
  }

  // Add to cart
  public buyNow(product: Product, quantity) {
     if (quantity > 0) 
       this.cartService.addToCart(product,parseInt(quantity));
       this.router.navigate(['/home/checkout']);
  }

  // Add to wishlist
  public addToWishlist(product: Product) {
     this.wishlistService.addToWishlist(product);
  }
  
  // Change size variant
  public changeSizeVariant(variant) {
     this.selectedSize = variant;
  }

}
