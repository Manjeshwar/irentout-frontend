import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-order-success',
  templateUrl: './order-success.component.html',
  styleUrls: ['./order-success.component.scss']
})
export class OrderSuccessComponent implements OnInit {

  orderid;

  constructor() { }

  ngOnInit() {
    const getid = window.location.search.split('=');
    this.orderid = getid[1];
    this.getOrderDetails(this.orderid);
  }

  getOrderDetails(ordid) {
    
  }

}
