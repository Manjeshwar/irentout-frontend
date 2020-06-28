import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/shared/services/user.service';

@Component({
  selector: 'app-order-success',
  templateUrl: './order-success.component.html',
  styleUrls: ['./order-success.component.scss']
})
export class OrderSuccessComponent implements OnInit {

  orderid;
  addressDta = {
    address: 'test',
    state: 'test',
    city: ''
  };

  constructor(private order: UserService) { }

  ngOnInit() {
    const getid = window.location.search.split('=');
    this.orderid = getid[1];
    this.getOrderDetails(this.orderid);
  }

  getOrderDetails(ordid) {
    this.order.ordDetails(ordid).subscribe((res) => {
      const OrderDetails = res[0];
      this.addressDta = {
        address: OrderDetails.address,
        state: OrderDetails.state,
        city: OrderDetails.city
      }
    });
  }

}
