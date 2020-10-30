import { Component, OnInit, ViewChild, ElementRef, Inject  } from '@angular/core';
import { ActivatedRoute, Router, NavigationEnd } from "@angular/router";
import { UserService } from '../../shared/services/user.service';
import { OrderService } from '../../shared/services/order.service';
import { Orders } from '../../shared/classes/orders';
import { Product } from '../../shared/classes/product';
import { ProductsService } from 'src/app/shared/services/products.service';
import { Observable, of } from 'rxjs';
import * as jsPDF from 'jspdf'

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.scss'],
  providers: [
    { provide: 'Window',  useValue: window }
  ]
})

export class OrdersComponent implements OnInit {
  @ViewChild('pdfTable', {static: false}) pdfTable: ElementRef;

  city=localStorage.getItem('city');
  uid=localStorage.getItem('uid');
  url;
  breadcrum;
  public order: Observable<Orders[]> = of([]);
  public orders:   Orders[] = [];
  public product:   Product = {};
  public products:   Product[] = [];
  public finalOrders = []

  constructor(@Inject('Window') private window: Window,private us: UserService, private os:OrderService, private ps:ProductsService, public router:Router) { }

  ngOnInit(): void {
    this.router.events.subscribe(event =>{
      if (event instanceof NavigationEnd){
        this.url=event.url;
        this.breadcrum = this.url.match(/[^\/]+$/)[0];
      }
    });
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

  public downloadAsPDF() {
    var doc = new jsPDF();
    const specialElementHandlers = {
      '#editor': function (element, renderer) {
        return true;
      }
    };

    const pdfTable = this.pdfTable.nativeElement;
    doc.fromHTML(pdfTable.innerHTML, 15, 15, {
      // width: 190,
      'elementHandlers': specialElementHandlers
    });
    doc.save('Invoice.pdf');
  }

}
