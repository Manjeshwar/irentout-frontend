import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { UserService } from './shared/services/user.service';
import * as $ from 'jquery';
import { ActivatedRoute, Router} from '@angular/router';
import { EmitService } from './shared/services/emit.service';
import { CartService } from './shared/services/cart.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

   citiesList;
	
   constructor(translate: TranslateService,
      private cityService: UserService,
      private route: ActivatedRoute,
      private router: Router,
      private cart: CartService,
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

      const social = ['google', 'facebook'];
      if (social.includes(localStorage.getItem('logintype'))) {
         this.cart.getCartDetails(localStorage.getItem('token')).subscribe((res) => {
            localStorage.setItem('cartItem', res[0].cart);
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
      } else {
         this.getByCity(cty);
      }
   }

   getByCity(cityname) {
      localStorage.setItem('city', cityname);
      const modalClose: HTMLElement = document.querySelector("#citiesModalTrigger .btn-danger");
      modalClose.click();
      this.emitS.changeCitySelection(cityname);
      const modal: HTMLElement = document.querySelector(".citiesModal");
      this.router.navigate([`/${cityname}`]);
   }
	
}
