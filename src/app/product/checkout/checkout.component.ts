import { Component, OnInit, ChangeDetectorRef,ViewChild, ElementRef } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { PayPalConfig, PayPalEnvironment, PayPalIntegrationType } from 'ngx-paypal';
// import {  IPayPalConfig,  ICreateOrderRequest } from 'ngx-paypal';
import { CartItem } from '../../shared/classes/cart-item';
import { ProductsService } from '../../shared/services/products.service';
import { CartService } from '../../shared/services/cart.service';
import { OrderService } from '../../shared/services/order.service';
import { UserService } from 'src/app/shared/services/user.service';
import { Observable, of, Subscription } from 'rxjs';
import { Router } from '@angular/router';
declare const $ :any;
declare const bolt :any;
declare const jQuery:any;

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.scss']
})
export class CheckoutComponent implements OnInit {

  @ViewChild('changeAddressModal') changeAddressModal: ElementRef;

countVal = 0;
// form group
public checkoutForm   :  FormGroup;
public cartItems      :  Observable<CartItem[]> = of([]);
public checkOutItems  :  CartItem[] = [];
public orderDetails   :  any[] = [];
public amount         :  number;
public payPalConfig ? : PayPalConfig;
hashSubscription: Subscription;
gst: number;
totalprice;
deliveryFee = 200;
taxInfo = '';
grandTotal;
getTenureVal;
grandDeposit;
cartProducts = [];
addressForm = false;
defaultAddress = false;
defaultBillAddress = false;
addAddress = false;
billAddress = false;
allDelvAddress;
allBillAddress;

defaultAddressFields = {
  name: '',
  lname:'',
  addresstype:'',
  phone: '',
  address: '',
  city: '',
  state: '',
  pincode: ''
};

defaultBillAddressFields = {
  name: '',
  lname:'',
  companyName:'',
  gst:'',
  phone: '',
  address: '',
  city: '',
  state: '',
  pincode: ''
};


pincodes = {
  'Bangalore': ['530068', '560001', '560002', '560003', '560004', '560005', '560006', '560007', '560008', '560009', '560010', '560011', '560012', '560013', '560014', '560015', '560016', '560017', '560018', '560019', '560020', '560021', '560022', '560023', '560024', '560025', '560026', '560027', '560028', '560029', '560030', '560031', '560032', '560033', '560034', '560035', '560036', '560037', '560038', '560039', '560040', '560041', '560042', '560043', '560045', '560046', '560047', '560048', '560049', '560050', '560051', '560052', '560053', '560054', '560055', '560056', '560057', '560058', '560059', '560060', '560061', '560062', '560063', '560064', '560065', '560066', '560067', '560068', '560069', '560070', '560071', '560072', '560073', '560074', '560075', '560076', '560077', '560078', '560079', '560080', '560081', '560082', '560083', '560084', '560085', '560086', '560087', '560088', '560089', '560090', '560091', '560092', '560093', '560094', '560095', '560096', '560097', '560098', '560099', '560100', '560102', '560103', '560104', '560105', '560107', '560108', '560109', '560110', '560111', '560113', '560114', '560140', '561229', '562107', '562109', '562112', '562114', '562123', '562125', '562129', '562130', '562149', '562157', '562162', '563160', '635103', '635124'],
  'Mumbai': ['230532', '400001', '400002', '400003', '400004', '400005', '400006', '400007', '400008', '400009', '400010', '400011', '400012', '400013', '400014', '400015', '400016', '400017', '400018', '400019', '400020', '400021', '400022', '400023', '400024', '400025', '400026', '400027', '400028', '400029', '400030', '400031', '400032', '400033', '400034', '400035', '400036', '400037', '400039', '400042', '400043', '400047', '400049', '400050', '400051', '400052', '400053', '400054', '400055', '400056', '400057', '400058', '400059', '400060', '400061', '400062', '400063', '400064', '400065', '400066', '400067', '400068', '400069', '400070', '400071', '400072', '400074', '400075', '400076', '400077', '400078', '400079', '400080', '400081', '400082', '400083', '400084', '400085', '400086', '400087', '400088', '400089', '400090', '400091', '400092', '400093', '400094', '400095', '400096', '400097', '400098', '400099', '400101', '400102', '400103', '400104', '400603', '400607', '400610', '400615', '400708']
};

cityStateMatch = [
  {state: 'Karnataka', city: 'Bangalore'},
  {state: 'Maharastra', city: 'Mumbai'}
];

city = localStorage.getItem('city');

invalidPostal = false;
displayAddrForm=false;
displayBillForm=false;

// Form Validator
constructor(
  private fb: FormBuilder,
  private cartService: CartService,
  private us: UserService,
  public productsService: ProductsService,
  private orderService: OrderService,
  public router: Router,
  private cd: ChangeDetectorRef) {
  this.checkoutForm = this.fb.group({
    uid: localStorage.getItem('uid'),
    udf5: 'BOLT_KIT_NODE_JS',
    surl: '',
    key: 'LLb865rB',
    salt: 'm5sx41HICr',
    txnid: '',
    amount: '',
    securityDeposit: '',
    checkoutProductsInfo: '',
    pinfo: '',
    fname: ['', [Validators.required, Validators.pattern('[a-zA-Z][a-zA-Z ]+[a-zA-Z]$')]],
    mobile: ['', [Validators.required, Validators.pattern('[0-9]+')]],
    email: ['', [Validators.required, Validators.email]],
    address: ['', [Validators.required, Validators.maxLength(255)]],
    town: ['', Validators.required],
    state: ['', Validators.required],
    pincode: ['', [Validators.required, Validators.minLength(6)]],
    selfPickup: false,
    addresstype: 'home',
    hash: '',
    city: ''
  });
}


ngOnInit() {
  if (!localStorage.getItem('uid')) {
    const location = window.location.href;
    localStorage.setItem('redirectto', location);
    this.router.navigate([this.city, 'login']);
  }
  this.us.getAllCities().subscribe((res: any) => {
    if (res) {
      const a = res.filter((city) => {
        if (city.cityname === localStorage.getItem('city')) {
          return city;
        }
      });
      this.gst = parseFloat(a[0].taxes);
      this.taxInfoDisp(a[0].cityname);

      this.getDeposit();
      this.getTenure();
      this.calculateTotal();
      this.transactionId();
    }
    
  });

  this.us.getUserDetailsByUid(localStorage.getItem('uid')).subscribe((dta) => {
    if(dta[0]) {
      this.checkoutForm.patchValue({
        email: dta[0].email
      });
      let addrFields = JSON.parse(dta[0].address);
      let billAddrsFields = JSON.parse(dta[0].billingaddress);
      this.allDelvAddress = addrFields;
      this.allBillAddress = billAddrsFields;
      
      billAddrsFields = billAddrsFields.filter(bill => bill.default);
      if (billAddrsFields.length > 0) {
        this.defaultBillAddress = true;
        this.billAddress = false;
        this.patchBillForm(billAddrsFields[0]);
      } else {
        this.defaultBillAddress = false;
        this.billAddress = true;
        // this.router.navigate([this.city,`add-address`]); 
      }
      
      addrFields = addrFields.filter(res => res.default);
      if (addrFields.length > 0) {
        this.defaultAddress = true;
        this.addAddress = false;
        this.patchFormValues(addrFields[0]);      
      } else {
        this.defaultAddress = false;
        this.addAddress = true;
        const location = window.location.href;
        localStorage.setItem('redirectto', location);
        this.router.navigate([this.city,`addresses`]); 
      }
    }
  });

  this.cartItems = this.cartService.getItems();
  this.cartItems.subscribe(products => this.checkOutItems = products);
  this.getTotal().subscribe(amount => this.amount = amount);

  this.patchCityState();
  this.getProducts();
  this.generateCheckoutDta();
}

changeAddr(id) {
  const addrFields = this.allDelvAddress.filter(res => res.id === id);
  // this.allDelvAddress.forEach(res => {
  //   if (res.id === id) {
  //     res.default = true;
  //   } else {
  //     res.default = false;
  //   }
  // });
  this.patchFormValues(addrFields[0]);
  // this.updateDefaultAddress(this.allDelvAddress);
  this.displayAddrForm=false;
}

setDefaultAddr(id){
  const addrFields = this.allDelvAddress.filter(res => res.id === id);
  this.allDelvAddress.forEach(res => {
    if (res.id === id) {
      res.default = true;
    } else {
      res.default = false;
    }
  });
  this.patchFormValues(addrFields[0]);
  this.updateDefaultAddress(this.allDelvAddress);
}

changeDefaultBillAddr(id) {
  const billAddrFields = this.allBillAddress.filter(res => res.id === id);
  // this.allBillAddress.forEach(res => {
  //   if (res.id === id) {
  //     res.default = true;
  //   } else {
  //     res.default = false;
  //   }
  // });
  this.patchBillForm(billAddrFields[0]);
  // this.updateDefaultBillAddress(this.allBillAddress);
  this.displayBillForm=false;
}

setDefaultBillAddr(id){
  const billAddrFields = this.allBillAddress.filter(res => res.id === id);
  this.allBillAddress.forEach(res => {
    if (res.id === id) {
      res.default = true;
    } else {
      res.default = false;
    }
  });
  this.patchBillForm(billAddrFields[0]);
  this.updateDefaultBillAddress(this.allBillAddress);
}

patchFormValues(addrFields) {
  this.defaultAddressFields = {
    name: addrFields.firstname,
    lname: addrFields.lastname,
    addresstype: addrFields.addresstype,
    phone: addrFields.phone,
    address: addrFields.addr,
    city: addrFields.city,
    state: addrFields.state,
    pincode: addrFields.postal
  };  

  this.checkoutForm.patchValue({
    fname: addrFields.firstname,
    addresstype:addrFields.addresstype,
    mobile: addrFields.phone,
    address: addrFields.addr,
    town: addrFields.city,
    state: addrFields.state,
    pincode: addrFields.postal,
  });

  this.generateHash();
  $('#changeAddressModal').modal('hide');
}

patchBillForm(billAddressFields){
  this.defaultBillAddressFields = {
    name: billAddressFields.firstname,
    lname: billAddressFields.lastname,
    companyName:billAddressFields.companyName,
    gst:billAddressFields.gst,
    phone: billAddressFields.phone,
    address: billAddressFields.addr,
    city: billAddressFields.city,
    state: billAddressFields.state,
    pincode: billAddressFields.postal
  };
  // this.generateHash();
  $('#billAddressModal').modal('hide');
}

getProducts() {
  this.cartItems.subscribe((res) => {
    res.forEach((dta) => {
     this.cartProducts.push(dta.product.prod_id);
    });
    this.checkoutForm.patchValue({
      pinfo: JSON.stringify(this.cartProducts)
    });
  });
}


transactionId() {
  const subCity = this.city.substring(0, 3);
  const rand = JSON.stringify(Math.random() * 9999);
  const dte = new Date();
  const ordId = subCity + rand +
  dte.getMonth() +
  dte.getFullYear() +
  dte.getHours() +
  dte.getMinutes() +
  dte.getSeconds() +
  dte.getMilliseconds();
  this.checkoutForm.patchValue({
    txnid: ordId
  });
}


taxInfoDisp(city) {
  if (city === 'Bangalore') {
    const a = this.gst / 2;
    this.taxInfo = `CGST = ${a}% and SGST = ${a}%`;
  } else {
    this.taxInfo = `IGST ${this.gst}%`;
  }
}

patchCityState() {

  const state = this.cityStateMatch.filter((res) => {
    if (res.city === this.city) {
     return true;
    }
  });

  this.checkoutForm.patchValue({
    town: this.city,
    state: state[0].state
  });
}

validatePostal() {
  const pincode = this.checkoutForm.value.pincode;
  if (pincode.length >= 6) {
    if (this.pincodes[this.city].includes(pincode)) {
      this.invalidPostal = false;
    } else {
      this.invalidPostal = true;
    }
  }
  this.checkoutForm.patchValue({
    pincode: this.checkoutForm.value.pincode
  });
}


// Get sub Total
public getTotal(): Observable<number> {
  return this.cartService.getTotalAmount();
}

// Get Tenure price only
public getTenure() {
  this.cartService.getTotalTenureAmount().subscribe((res) => {
    this.getTenureVal = res;
  });
}

// Get Security Deposit price only
public getDeposit() {
  this.cartService.getTotalDepositAmount().subscribe((res) => {
    this.grandDeposit = res;
  });
  this.checkoutForm.patchValue({
    securityDeposit: this.grandDeposit
  });
}

calculateTotal() {
  this.grandTotal = this.grandDeposit + (parseInt(this.getTenureVal) * (this.gst)/100) + parseInt(this.getTenureVal);
  this.checkoutForm.patchValue({
    amount: this.grandTotal
  });
}

delivery(evt) {
  if (evt.target.checked) {
    this.deliveryFee = 0;
    this.grandTotal = this.grandTotal - 200;
    this.checkoutForm.patchValue({
      selfPickup: true
    });
  } else {
    this.deliveryFee = 200;
    this.grandTotal = this.grandTotal + 200;
    this.checkoutForm.patchValue({
      selfPickup: false
    });
  }
  this.checkoutForm.patchValue({
    amount: this.grandTotal
  });

  this.generateHash();
}


generateHash() {
  // if(this.hashSubscription) {
  //   this.hashSubscription.unsubscribe();
  // }
  this.checkoutForm.patchValue({
    surl: 'http://localhost:3000/payments/response'
  });
  this.us.getHash(this.checkoutForm.value).subscribe((res) => {
    this.checkoutForm.patchValue({
      hash: res
    });
    console.log(res);
  });
}

generateCheckoutDta() {
  const delvDta = [];
  this.checkOutItems.forEach((res) => {
    delvDta.push({id: res.product.prod_id, delvdate: res.deliveryDate, qty: res.quantity, price: res.tenure_price, tenure: res.tenures});
  });
  this.checkoutForm.patchValue({
    checkoutProductsInfo: JSON.stringify(delvDta)
  });
}

setFirstJsonAddress() {
  const ids = ((1 + Math.random())).toString(32).substring(1).replace('.', '');
  const formVal = this.checkoutForm.value;
  const addr = {
    id: ids,
    firstname: formVal.fname,
    addresstype:formVal.addresstype,
    phone: formVal.mobile,
    addr: formVal.address,
    city: formVal.town,
    state: formVal.state,
    postal: formVal.pincode,
    default: true
  };

  return addr;
}

changeAddress() {
  this.router.navigate([`/${localStorage.getItem('city')}/add-address`]);
}

updateDefaultAddress(addr) {
  this.us.addUpdateAddress(localStorage.getItem('uid'), JSON.stringify(addr)).subscribe((addrs) => {
    console.log(addrs);
  });
}

updateDefaultBillAddress(addr) {
  this.us.addUpdateBillAddress(localStorage.getItem('uid'), JSON.stringify(addr)).subscribe((addrs) => {
    console.log(addrs);
  });
}

// deleteAddress(id){
//   this.us.deleteAddress(id).subscribe();
// }

newAddressAdded() {
  this.us.getUserDetailsByUid(localStorage.getItem('uid')).subscribe((dta) => {
    let addrFields = JSON.parse(dta[0].address);
    this.allDelvAddress = addrFields;
    addrFields = addrFields.filter(res => res.default);

    this.changeAddr(addrFields[0].id);
    // this.changeAddressModal.nativeElement.click();
  });
}

newBillAddressAdded() {
  this.us.getUserDetailsByUid(localStorage.getItem('uid')).subscribe((dta) => {
    let billAddrFields = JSON.parse(dta[0].billingaddress);
    this.allBillAddress = billAddrFields;
    billAddrFields = billAddrFields.filter(bill => bill.default);

    this.changeDefaultBillAddr(billAddrFields[0].id);
  });
}

startPayment() {
  const controls = this.checkoutForm.controls;

  Object.keys(controls).forEach(key => {
    controls[key].markAsTouched();
  });

  if (this.checkoutForm.valid) {
    // save address
    if (!this.defaultAddress) {
      const addr = [this.setFirstJsonAddress()];
      this.updateDefaultAddress(addr);
    }

    this.us.initiateTransaction(this.checkoutForm.value).subscribe((res) => {
      if (res) {
        this.launchBOLT();
      }
    }, (error) => {
      alert('Internal Server Error');
    });
  }
}

launchBOLT() {
  const usBk = this.us;

  bolt.launch({
    key: $('#key').val(),
    txnid: $('#txnid').val(),
    hash: $('#hash').val(),
    amount: $('#amount').val(),
    firstname: this.checkoutForm.value.fname,
    email: this.checkoutForm.value.email,
    phone: this.checkoutForm.value.mobile,
    productinfo: this.checkoutForm.value.pinfo,
    udf5: $('#udf5').val(),
    surl : $('#surl').val(),
    furl: $('#surl').val(),
    city: localStorage.getItem('city'),
    uid: localStorage.getItem('uid')
  }, {
      responseHandler: function(BOLT) {
      let status = BOLT.response.txnStatus;
      if (BOLT.response.txnStatus === 'CANCEL') {
        status = 'Payment cancelled';
        usBk.deleteTransaction({txnid: $('#txnid').val()}).subscribe((res) => {
          alert('Transaction cancelled');
        });
      }

    usBk.updateTransaction({txnid: $('#txnid').val(), status: status}).subscribe((res) => {
      if (res) {
        if (BOLT.response.txnStatus !== 'CANCEL') {
          const fr = `<form action='${$('#surl').val()}' method='post'>
          <input type='hidden' name='key' value='${BOLT.response.key}' />
          <input type='hidden' name='city' value='${localStorage.getItem('city')}' />
          <input type='hidden' name='uid' value='${localStorage.getItem('uid')}' />
          <input type='hidden' name='txnid' value='${BOLT.response.txnid}' />
          <input type='hidden' name='amount' value='${BOLT.response.amount}' />
          <input type='hidden' name='productinfo' value='${BOLT.response.productinfo}' />
          <input type='hidden' name='firstname' value='${BOLT.response.firstname}' />
          <input type='hidden' name='email' value='${BOLT.response.email}' />
          <input type='hidden' name='udf5' value='${BOLT.response.udf5}' />
          <input type='hidden' name='mihpayid' value='${BOLT.response.mihpayid}' />
          <input type='hidden' name='status' value='${BOLT.response.status}' />
          <input type='hidden' name='hash' value='${BOLT.response.hash}' />
          </form>`;
          localStorage.setItem('cartItem', '[]');
          const form = jQuery(fr);
          jQuery('body').append(form);
          form.submit();
      }
      }
    }, (error) => {
      alert('Internal Server Error');
    });
  },
      catchException: function(BOLT) {
           console.log(BOLT.message );
      }
  });
  }

}
