import { Component, OnInit } from '@angular/core';
import { Product } from '../../../../classes/product';
import { WishlistService } from '../../../../services/wishlist.service';
import { ProductsService } from '../../../../../shared/services/products.service';
import { Observable, of } from 'rxjs';
import { Router } from '@angular/router';
import { EmitService } from '../../../../../shared/services/emit.service';

@Component({
  selector: 'app-topbar',
  templateUrl: './topbar-one.component.html',
  styleUrls: ['./topbar-one.component.scss']
})
export class TopbarOneComponent implements OnInit {
  
  constructor(public productsService: ProductsService, private router: Router, private emitS: EmitService) { }

  display: boolean;
  accountName;

  ngOnInit() {
    this.display = false;
    this.checkIfLogged();
    this.emitS.currentUserName.subscribe(val => {
      if (val) {
        this.accountName = val;
      }
    });
   }


  checkIfLogged() {
    if (localStorage.getItem('token') && localStorage.getItem('token') !== 'undefined') {
      this.display = true;
    }
  }

  login() {
    const location = window.location.href;
    localStorage.setItem('redirectto', location);
    this.router.navigate(['/pages/login']);
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
    this.emitS.changeUserName('My Account');
    this.router.navigateByUrl(`/${city}`);
  }

}
