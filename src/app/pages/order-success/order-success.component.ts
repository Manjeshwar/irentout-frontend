import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/shared/services/user.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-order-success',
  templateUrl: './order-success.component.html',
  styleUrls: ['./order-success.component.scss']
})
export class OrderSuccessComponent implements OnInit {

  orderid;
  addressDta = {
    address: '',
    state: '',
    city: '',
    pincode: '',
    mobile: '',
    orderId: '',
    orderDate: '',
    orderTotal: '',
    deliveryDate: '',
  };
  orderedProducts;
  allOrderDetails;

  constructor(private order: UserService, private http: HttpClient) { }

  ngOnInit() {
    const getid = window.location.search.split('=');
    this.orderid = getid[1];
    this.getOrderDetails(this.orderid);
  }

  getOrderDetails(ordid) {
    this.order.ordDetails(ordid).subscribe((res) => {
      const OrderDetails = res[0];
      this.allOrderDetails = res[0];
      this.addressDta = {
        address: OrderDetails.address,
        state: OrderDetails.state,
        city: OrderDetails.city,
        pincode: OrderDetails.pincode,
        mobile: OrderDetails.mobile,
        orderId: OrderDetails.txnid,
        orderDate: OrderDetails.orderdate[0],
        orderTotal: OrderDetails.amount,
        deliveryDate: '',
      };
      this.orderedProducts = OrderDetails.checkoutItemData;
    });
  }

}
