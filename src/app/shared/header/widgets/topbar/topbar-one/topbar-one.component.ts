import { Component, OnInit } from '@angular/core';
import { Product } from '../../../../classes/product';
import { WishlistService } from '../../../../services/wishlist.service';
import { ProductsService } from '../../../../../shared/services/products.service';
import { Observable, of } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-topbar',
  templateUrl: './topbar-one.component.html',
  styleUrls: ['./topbar-one.component.scss']
})
export class TopbarOneComponent implements OnInit {
  
  constructor(public productsService: ProductsService, private router: Router) { }

  display: boolean;

  ngOnInit() {
    this.display = false;
    this.checkIfLogged();
   }


  checkIfLogged() {
    if (localStorage.getItem('token')) {
      this.display = true;
    }
  }

  login() {
    const location = window.location.href;
    localStorage.setItem('redirectto', location);
    this.router.navigate(['/pages/login']);
  }

  logout() {
    localStorage.removeItem('uname');
    localStorage.removeItem('uid');
    localStorage.removeItem('logintype');
    localStorage.removeItem('token');
    localStorage.removeItem('redirectto');
    this.router.navigate(['']);
  }

}
