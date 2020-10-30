import { Component,DoCheck,Injectable, OnInit } from '@angular/core';
import { ActivatedRoute, Router} from '@angular/router';
import { Product } from '../../shared/classes/product';
import { ProductsService } from '../../shared/services/products.service';
import { WishlistService } from '../../shared/services/wishlist.service';
import { CartService } from '../../shared/services/cart.service';
import {NgbDateStruct, NgbDatepickerConfig, NgbDateParserFormatter, NgbCalendar} from '@ng-bootstrap/ng-bootstrap';
import { Observable, of } from 'rxjs';
import { UserService } from 'src/app/shared/services/user.service';

@Injectable()
export class CustomDateParserFormatter extends NgbDateParserFormatter {

  readonly DELIMITER = '/';

  parse(value: string): NgbDateStruct | null {
    if (value) {
      let date = value.split(this.DELIMITER);
      return {
        day : parseInt(date[0], 10),
        month : parseInt(date[1], 10),
        year : parseInt(date[2], 10)
      };
    }
    return null;
  }

  format(date: NgbDateStruct | null): string {
    return date ? date.day + this.DELIMITER + date.month + this.DELIMITER + date.year : '';
  }
}

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.scss'],
  providers: [
    {provide: NgbDateParserFormatter, useClass: CustomDateParserFormatter}
  ]
})
export class ProductDetailsComponent implements OnInit {

  public product:   Product = {};
  public products:   Product[] = [];
  public counter = 1;
  public selectedSize:   any = '';
  model2;

  mySolidWishlist:boolean=false;

  tenures = 3;
  tenure_price;
  security_deposit = 0;
  addDays;
  deliveryDate:string;
  productId:string;

  // Get Product By Id
  constructor(private route: ActivatedRoute, private router: Router,
    public productsService: ProductsService, private wishlistService: WishlistService,
    private us: UserService,
    private cartService: CartService, private config: NgbDatepickerConfig, private calendar: NgbCalendar) {
      this.route.params.subscribe(params => {
        // const id: string = params['id'];
        this.productId= params['id'];
        const uid=localStorage.getItem('uid');
        this.productsService.getProduct(this.productId).subscribe(product => {
          this.product = product;          
          this.security_deposit = parseInt(product.prod_price);
          this.tenure_price = product.prod_tenure[0][1];

          this.addDays = this.product.prod_deliveryDate;
          const current = new Date();
          let minDate={ year: current.getFullYear(), month:
            current.getMonth() + 1, day: current.getDate() + this.addDays };
          this.config.minDate = minDate;
          this.model2=minDate;
          this.config.outsideDays = 'hidden';
          this.addDays = `${current.getDate() + this.addDays}-${current.getMonth() + 1}-${current.getFullYear()}`;
        });

        this.wishlistService.getwishlistDetails(uid).subscribe((res:any)=>{
          const wlData=res[0].wishlist;
          wlData.split(" ").filter((wlres)=>{
            if(wlres.includes(this.productId)){
              this.mySolidWishlist=true;
            }
          });
        });
      });
  }

  ngOnInit() {
  //   this.us.getAllCities().subscribe((res: any) => {
  //     if (res) {
  //       var a = res.filter((res) => {
  //           if(res.cityname === localStorage.getItem('city')) {
  //             return res;
  //           }
  //       });

  //       this.addDays = a[0].tentitiveDeleivery;
  //       const current = new Date();
  //       let minDate={ year: current.getFullYear(), month:
  //         current.getMonth() + 1, day: current.getDate() + this.addDays }
  //       this.config.minDate = minDate;
  //       this.model2=minDate;
  //       this.config.outsideDays = 'hidden';
  //       this.addDays = `${current.getDate() + this.addDays}-${current.getMonth() + 1}-${current.getFullYear()}`; 
  //     }
  //  });
     this.productsService.getProducts().subscribe(product => this.products = product);
     this.getDate();
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
    autoplay: true,
  };

  public slideNavConfig = {
    vertical: false,
    slidesToShow: 5,
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

  getDate(){    
    var day = this.model2.day;
    var month = this.model2.month;
    var year = this.model2.year;
    this.deliveryDate= day + '/' + month + '/' + year;
    // console.log(this.deliveryDate);
  }

  // Add to cart
  public addToCart(product: Product, quantity, tenures, tenure_price, deliveryDate) {
    if (quantity == 0) return false;
    this.cartService.addToCart(product, parseInt(quantity), tenures, tenure_price, deliveryDate);
  }

  // Add to cart
  public buyNow(product: Product, quantity,tenures, tenure_price, deliveryDate) {
     if (quantity > 0) 
       this.cartService.addToCart(product,parseInt(quantity),tenures, tenure_price, deliveryDate);
       const url = `/${localStorage.getItem('city')}`;
       this.router.navigate([`${url}/checkout`]);
  }

  // Add to wishlist
  public addToWishlist(product: Product) {
     if(!this.mySolidWishlist) {
      this.wishlistService.addToWishlist(product);    
     }
     else{
      this.wishlistService.removeFromWishlist(product);
     }
      
  }
  
  // Change size variant
  public changeSizeVariant(variant) {
     this.selectedSize = variant;
  }

}
