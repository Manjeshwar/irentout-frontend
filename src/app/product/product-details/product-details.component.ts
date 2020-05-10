import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router} from '@angular/router';
import { Product } from '../../shared/classes/product';
import { ProductsService } from '../../shared/services/products.service';
import { WishlistService } from '../../shared/services/wishlist.service';
import { CartService } from '../../shared/services/cart.service';
import {NgbDateStruct, NgbDatepickerConfig} from '@ng-bootstrap/ng-bootstrap';
import { Observable, of } from 'rxjs';
import { UserService } from 'src/app/shared/services/user.service';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.scss']
})
export class ProductDetailsComponent implements OnInit {

  public product:   Product = {};
  public products:   Product[] = [];
  public counter = 1;
  public selectedSize:   any = '';
  model: NgbDateStruct;

  tenures = 3;
  tenure_price;
  security_deposit = 0;
  addDays = 0;

  // Get Product By Id
  constructor(private route: ActivatedRoute, private router: Router,
    public productsService: ProductsService, private wishlistService: WishlistService,
    private cityService: UserService,
    private cartService: CartService, private config: NgbDatepickerConfig) {
      this.route.params.subscribe(params => {
        const id: string = params['id'];
        this.productsService.getProduct(id).subscribe(product => {
          this.product = product;
          this.security_deposit = parseInt(product.prod_price);
          this.tenure_price = product.prod_tenure[0][1];
        });
      });
  }

  ngOnInit() {
    this.cityService.getAllCities().subscribe((res: any) => {
      if (res) {
        var a = res.filter((res) => {
          if(res.cityname === localStorage.getItem('city')) {
            return res.tentitiveDeleivery;
          }
      });
      this.addDays = a[0].tentitiveDeleivery;
        const current = new Date();
        this.config.minDate = { year: current.getFullYear(), month:
        current.getMonth() + 1, day: current.getDate() + this.addDays };
        this.config.outsideDays = 'hidden';
      }
   });
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
  public addToCart(product: Product, quantity, tenures, tenure_price) {
    if (quantity == 0) return false;
    this.cartService.addToCart(product, parseInt(quantity), tenures, tenure_price);
  }

  // Add to cart
  public buyNow(product: Product, quantity,tenures, tenure_price) {
     if (quantity > 0) 
       this.cartService.addToCart(product,parseInt(quantity),tenures, tenure_price);
       const url = `/${localStorage.getItem('city')}`;
       this.router.navigate([`${url}/checkout`]);
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
