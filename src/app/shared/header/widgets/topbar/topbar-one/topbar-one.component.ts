import { Component, OnInit } from '@angular/core';
import { Product } from '../../../../classes/product';
import { WishlistService } from '../../../../services/wishlist.service';
import { ProductsService } from '../../../../../shared/services/products.service';
import { Observable, of } from 'rxjs';
import { Router } from '@angular/router';
import { EmitService } from '../../../../../shared/services/emit.service';
import { UserService } from '../../../../../shared/services/user.service';


@Component({
  selector: 'app-topbar',
  templateUrl: './topbar-one.component.html',
  styleUrls: ['./topbar-one.component.scss']
})
export class TopbarOneComponent implements OnInit {
  
  constructor(public productsService: ProductsService, private router: Router, private emitS: EmitService, private cityService: UserService,) { }

  display: boolean;
  accountName;
  citiesList;
  currentCity= localStorage.getItem('city');

  ngOnInit() {
    this.display = false;
    this.checkIfLogged();
    this.emitS.currentUserName.subscribe(val => {
      if (val) {
        this.accountName = val;
      }
    });
    this.cityService.getAllCities().subscribe((res) => {
         this.citiesList = res;
    });
  }

   getByCity(cityname) {
    localStorage.setItem('city', cityname);
    this.currentCity=cityname;
    this.router.navigate([`/${cityname}`]);
   }

  emitsearch(val) {
    val = val === '' ? 'all' : val;
    const url = `${localStorage.getItem('city')}/category/${val}`;
    this.router.navigate([url]);
  }

  checkIfLogged() {
    if (localStorage.getItem('token') && localStorage.getItem('token') !== 'undefined') {
      this.display = true;
    }
  }

  login() {
    const location = window.location.href;
    const ignoreURL = ['forgotpassword', 'login'];
    if(ignoreURL.includes(location)) {

    }
    localStorage.setItem('redirectto', location);
    this.router.navigate([this.currentCity,'login']);
  }

  logout() {
    const city = localStorage.getItem('city');
    localStorage.removeItem('uname');
    localStorage.removeItem('uid');
    localStorage.removeItem('logintype');
    localStorage.removeItem('token');
    localStorage.removeItem('redirectto');
    localStorage.removeItem('cartItem');
    localStorage.removeItem('existinguser');
    document.querySelector('.cart_qty_cls').textContent = '0';
    this.display = false;
    this.emitS.changeUserName('Login/Signup');
    this.router.navigateByUrl(`/${city}`);
    location.reload();
  }

}
