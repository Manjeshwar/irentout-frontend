import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { UserService } from './shared/services/user.service';
import * as $ from 'jquery';
import { ActivatedRoute, Router, NavigationEnd} from '@angular/router';
import { EmitService } from './shared/services/emit.service';
import { CartService } from './shared/services/cart.service';
SeoService
import { map, catchError, filter,mergeMap } from 'rxjs/operators';

import { HttpClient } from "@angular/common/http";
import { SeoService } from './shared/services/seo.service';
import { WishlistService } from './shared/services/wishlist.service';

let users_url = `http://localhost:3000/users`;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

   citiesList;
   public url : any; 
	
   constructor(translate: TranslateService,
      private cityService: UserService,
      private wishlistService:WishlistService,
      private cartService: CartService,
      public seoService:SeoService,
      private route: ActivatedRoute,
      private router: Router,
      private cart: CartService,
      private http: HttpClient,
      private emitS: EmitService) {
         // this.router.events.subscribe((event) => {
         //    if (event instanceof NavigationEnd) {
         //      this.url = event.url;
         //      if(this.url.includes('Bangalore')){
         //         localStorage.setItem('city', 'Bangalore')
         //      }
         //    }
         //  });
      translate.setDefaultLang('en');
      translate.addLangs(['en', 'fr']);
      
   }

   ngOnInit() {
      this.router.events.pipe(
         filter((event) => event instanceof NavigationEnd),
         map(() => this.route),
         map((route) => {
           while (route.firstChild) route = route.firstChild;
           return route;
         }),
         filter((route) => route.outlet === 'primary'),
         mergeMap((route) => route.data)
        )
        .subscribe((event) => {
          this.seoService.updateTitle(event['title']);
          this.seoService.updateOgUrl(event['ogUrl']);
          this.seoService.updateOgType(event['ogType']);
          this.seoService.updateOgTitle(event['ogTitle']);
          this.seoService.updateOgDescription(event['ogDescription']);
          this.seoService.updateOgImage(event['ogImage']);
          //Updating Description tag dynamically with title
          this.seoService.updateDescription(event['title'] + event['description'])
        }); 

      const parm = window.location.search;
      const arr = parm.split('&');
      let arr1 = [];
      arr.forEach((i) => {
         arr1.push(i.split('='));
      });
      let arr2 = []
      arr1.forEach((val) => {
         let keyVal = val[0];
         keyVal = (keyVal === '?uid') ? 'uid' : keyVal;
         localStorage.setItem(keyVal, val[1]);
      });

      const social = ['google', 'facebook', 'web'];
      if (social.includes(localStorage.getItem('logintype'))) {
         this.cart.getCartDetails(localStorage.getItem('uid')).subscribe((res) => {
            if(localStorage.getItem('cartItem')) {
               this.pushLocalCartToLogin(res[0].cart, localStorage.getItem('uid'));
            } else {
               localStorage.setItem('cartItem', res[0].cart);
            }

            localStorage.setItem('uname', res[0].uname);
            this.emitS.changeUserName(localStorage.getItem('uname') || 'Login/Signup');
            this.cart.getItems();
         });
         this.wishlistService.getwishlistDetails(localStorage.getItem('uid')).subscribe((res) => {
            if(localStorage.getItem('wishlistItem')) {
               this.pushLocalwishlistToLogin(res[0].wishlist, localStorage.getItem('uid'));
            } else {
               localStorage.setItem('wishlistItem', res[0].wishlist);
            }

            localStorage.setItem('uname', res[0].uname);
            this.emitS.changeUserName(localStorage.getItem('uname') || 'Login/Signup');
            this.cart.getItems();
         });
      }


      const cty = localStorage.getItem('city');
      this.emitS.changeCitySelection(cty);
      const modal: HTMLElement = document.querySelector(".citiesModal");
      if(!cty) {
         this.cityService.getAllCities().subscribe((res) => {
            if (res) {
               this.citiesList = res;
               modal.click();
            }
         });
      } else{
         this.getByCity(cty);
      }
   }

   pushLocalCartToLogin(loggedInCartDet, uid) {
      let localCart = JSON.parse(localStorage.getItem('cartItem'));
      let loggedInCart = JSON.parse(loggedInCartDet);

      let nonAddedProduct = [];
      loggedInCart.forEach((res, j) => {
         nonAddedProduct.push(res.product.prod_id);
      });

      let newStorageCart = [];
      localCart.forEach((res, i) => {
         if(!nonAddedProduct.includes(res.product.prod_id)) {
            // this.cartService.addToCart(res.product, res.quantity, res.tenures, res.tenure_price, null);
            newStorageCart.push(res);
         }
     });

     const finalCartItems = JSON.stringify(loggedInCart.concat(newStorageCart));

     localStorage.setItem('cartItem', finalCartItems);
     this.http.put(`${users_url}/cart/${uid}`, { cart: finalCartItems }).subscribe((res) => {
      console.log(res);
      });
   }

   pushLocalwishlistToLogin(loggedInWishlistDet, uid) {
      let localWL = JSON.parse(localStorage.getItem('wishlistItem'));
      let loggedInwishlist = JSON.parse(loggedInWishlistDet);

      let nonAddedProduct = [];
      loggedInwishlist.forEach((res, j) => {
         nonAddedProduct.push(res.product.prod_id);
      });

      let newStorageCart = [];
      localWL.forEach((res, i) => {
         if(!nonAddedProduct.includes(res.product.prod_id)) {
            // this.cartService.addToCart(res.product, res.quantity, res.tenures, res.tenure_price, null);
            newStorageCart.push(res);
         }
     });

     const finalWishlistItems = JSON.stringify(loggedInwishlist.concat(newStorageCart));

     localStorage.setItem('wishlistItem', finalWishlistItems);
     this.http.put(`${users_url}/wishlist/${uid}`, { wishlist: finalWishlistItems }).subscribe((res) => {
      console.log(res);
      });
   }

   getByCity(cityname) {
      localStorage.setItem('city', cityname);
      // const modalClose: HTMLElement = document.querySelector("#citiesModalTrigger .btn-danger");
      // modalClose.click();
      this.emitS.changeCitySelection(cityname);
      const modal: HTMLElement = document.querySelector(".citiesModal");
      const pathName=location.pathname;
      if(pathName==='/'){
         this.router.navigate([`/${cityname}`]);
      }
      
   }

   refresh(): void {
      window.location.reload();
   }
	
}
