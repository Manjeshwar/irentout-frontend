import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from '../../shared/services/user.service';
import { OrderService } from '../../shared/services/order.service';
import { Orders } from '../../shared/classes/orders';
import { Product } from '../../shared/classes/product';
import { ProductsService } from 'src/app/shared/services/products.service';
import { Observable, of } from 'rxjs';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.scss']
})
export class OrdersComponent implements OnInit {

  city=localStorage.getItem('city');
  uid=localStorage.getItem('uid');
  public order: Observable<Orders[]> = of([]);
  public orders:   Orders[] = [];
  public product:   Product = {};
  public products:   Product[] = [];
  public finalOrders = []

  constructor(private us: UserService, private os:OrderService, private ps:ProductsService, public router:Router) { }

  ngOnInit(): void {
    if(!this.uid){
      this.router.navigate([this.city]);
    }
    this.getOrders();
  }

  // Fetches orders Details
  getOrders(){
    this.os.getorders(this.uid).subscribe((orders)=>{
      this.orders=orders;
      // orders.forEach((dta)=>{
      //   for(let i=0;i<dta.pinfo.length;i++){
      //     this.ps.getProduct(dta.pinfo[i]).subscribe((products)=>{
      //       this.products.push(products);
      //       // console.log(this.products);
      //     });
      //   }
      // });
    });
  }

}
