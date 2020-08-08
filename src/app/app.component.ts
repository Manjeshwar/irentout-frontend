import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { UserService } from './shared/services/user.service';
import * as $ from 'jquery';
import { ActivatedRoute, Router} from '@angular/router';
import { EmitService } from './shared/services/emit.service';
import { CartService } from './shared/services/cart.service';

import { HttpClient } from "@angular/common/http";

let users_url = `http://localhost:3000/users`;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

   citiesList;
	
   constructor(translate: TranslateService,
      private cityService: UserService,
      private cartService: CartService,
      private route: ActivatedRoute,
      private router: Router,
      private cart: CartService,
      private http: HttpClient,
      private emitS: EmitService) {
      translate.setDefaultLang('en');
      translate.addLangs(['en', 'fr']);
   }

   ngOnInit() {
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
         this.cart.getCartDetails(localStorage.getItem('token')).subscribe((res) => {
            if(localStorage.getItem('cartItem')) {
               this.pushLocalCartToLogin(res[0].cart, localStorage.getItem('uid'));
            } else {
               localStorage.setItem('cartItem', res[0].cart);
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

   getByCity(cityname) {
      localStorage.setItem('city', cityname);
      const modalClose: HTMLElement = document.querySelector("#citiesModalTrigger .btn-danger");
      modalClose.click();
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
