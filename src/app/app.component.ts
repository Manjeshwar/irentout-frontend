import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { UserService } from './shared/services/user.service';
import * as $ from 'jquery';
import { Router } from '@angular/router';
import { EmitService } from './shared/services/emit.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

   citiesList;
	
   constructor(translate: TranslateService,
      private cityService: UserService,
      private router: Router,
      private emitS: EmitService) {
      translate.setDefaultLang('en');
      translate.addLangs(['en', 'fr']);
   }

   ngOnInit() {
      const cty = localStorage.getItem('city');
      this.emitS.changeCitySelection(cty);
      const modal: HTMLElement = document.querySelector(".citiesModal");
      if(!cty) {
         this.cityService.getAllCities().subscribe((res) => {
            if(res){
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
      this.emitS.changeCitySelection(cityname);
      const modal: HTMLElement = document.querySelector(".citiesModal");
      modal.click();
      this.router.navigate([`/${cityname}`]);
   }
	
}
