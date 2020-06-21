import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { PayPalConfig, PayPalEnvironment, PayPalIntegrationType } from 'ngx-paypal';
// import {  IPayPalConfig,  ICreateOrderRequest } from 'ngx-paypal';
import { CartItem } from '../../shared/classes/cart-item';
import { ProductsService } from '../../shared/services/products.service';
import { CartService } from '../../shared/services/cart.service';
import { OrderService } from '../../shared/services/order.service';
import { UserService } from 'src/app/shared/services/user.service';
import { Observable, of } from 'rxjs';
declare var jquery:any;
declare var $ :any;
declare var bolt :any;
declare var jQuery:any;

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.scss']
})
export class CheckoutComponent implements OnInit {

// form group
public checkoutForm   :  FormGroup;
public paymentForm: FormGroup;
public cartItems      :  Observable<CartItem[]> = of([]);
public checkOutItems  :  CartItem[] = [];
public orderDetails   :  any[] = [];
public amount         :  number;
public payPalConfig ? : PayPalConfig;
gst:number;
totalprice;
deliveryFee:number=200;
taxInfo = "";
grandTotal;
getTenureVal;
grandDeposit;


pincodes = {
  'Bangalore': ['530068', '560001', '560002', '560003', '560004', '560005', '560006', '560007', '560008', '560009', '560010', '560011', '560012', '560013', '560014', '560015', '560016', '560017', '560018', '560019', '560020', '560021', '560022', '560023', '560024', '560025', '560026', '560027', '560028', '560029', '560030', '560031', '560032', '560033', '560034', '560035', '560036', '560037', '560038', '560039', '560040', '560041', '560042', '560043', '560045', '560046', '560047', '560048', '560049', '560050', '560051', '560052', '560053', '560054', '560055', '560056', '560057', '560058', '560059', '560060', '560061', '560062', '560063', '560064', '560065', '560066', '560067', '560068', '560069', '560070', '560071', '560072', '560073', '560074', '560075', '560076', '560077', '560078', '560079', '560080', '560081', '560082', '560083', '560084', '560085', '560086', '560087', '560088', '560089', '560090', '560091', '560092', '560093', '560094', '560095', '560096', '560097', '560098', '560099', '560100', '560102', '560103', '560104', '560105', '560107', '560108', '560109', '560110', '560111', '560113', '560114', '560140', '561229', '562107', '562109', '562112', '562114', '562123', '562125', '562129', '562130', '562149', '562157', '562162', '563160', '635103', '635124'],
  'Mumbai': ['230532', '400001', '400002', '400003', '400004', '400005', '400006', '400007', '400008', '400009', '400010', '400011', '400012', '400013', '400014', '400015', '400016', '400017', '400018', '400019', '400020', '400021', '400022', '400023', '400024', '400025', '400026', '400027', '400028', '400029', '400030', '400031', '400032', '400033', '400034', '400035', '400036', '400037', '400039', '400042', '400043', '400047', '400049', '400050', '400051', '400052', '400053', '400054', '400055', '400056', '400057', '400058', '400059', '400060', '400061', '400062', '400063', '400064', '400065', '400066', '400067', '400068', '400069', '400070', '400071', '400072', '400074', '400075', '400076', '400077', '400078', '400079', '400080', '400081', '400082', '400083', '400084', '400085', '400086', '400087', '400088', '400089', '400090', '400091', '400092', '400093', '400094', '400095', '400096', '400097', '400098', '400099', '400101', '400102', '400103', '400104', '400603', '400607', '400610', '400615', '400708']
}

cityStateMatch = [
  {state: 'Karnataka', city: 'Bangalore'},
  {state: 'Maharastra', city: 'Mumbai'}
]

city = localStorage.getItem('city');

invalidPostal = false;
  

// Form Validator
constructor(private fb: FormBuilder, private cartService: CartService, private cityService: UserService, 
  public productsService: ProductsService, private orderService: OrderService) {
  this.checkoutForm = this.fb.group({
    firstname: ['', [Validators.required, Validators.pattern('[a-zA-Z][a-zA-Z ]+[a-zA-Z]$')]],
    lastname: ['', [Validators.required, Validators.pattern('[a-zA-Z][a-zA-Z ]+[a-zA-Z]$')]],
    phone: ['', [Validators.required, Validators.pattern('[0-9]+')]],
    email: ['', [Validators.required, Validators.email]],
    address: ['', [Validators.required, Validators.maxLength(50)]],
    country: ['', Validators.required],
    town: ['', Validators.required],
    state: ['', Validators.required],
    postalcode: ['', [Validators.required, Validators.minLength(6)]]
  });
}

ngOnInit() {
  this.cityService.getAllCities().subscribe((res: any) => {
    if (res) {
      var a = res.filter((res) => {
        if(res.cityname === localStorage.getItem('city')) {
          return res;
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

 this.paymentForm = this.fb.group({
  udf5: 'BOLT_KIT_NODE_JS',
  surl: '',
  key: 'LLb865rB',
  salt: 'm5sx41HICr',
  txnid: 'ORD567',
  amount: '',
  pinfo: 'P01,P02',
  fname: '',
  email: '',
  mobile: '',
  hash: ''
});

  this.cartItems = this.cartService.getItems();
  this.cartItems.subscribe(products => this.checkOutItems = products);
  this.getTotal().subscribe(amount => this.amount = amount);
  this.initConfig();
  this.patchCityState();
}

transactionId(){
  var subCity=this.city.substring(0,3);
  var rand = JSON.stringify(Math.random()*9999);
  var dte = new Date();
  var ordId=subCity +
  rand +
  dte.getMonth() +
  ":" +
  dte.getFullYear() +
  "-" +
  dte.getHours() +
  "-" +
  dte.getMinutes() +
  "-" +
  dte.getSeconds() +
  "-" +
  dte.getMilliseconds();
  console.log(ordId);
}


taxInfoDisp(city) {
  if(city=='Bangalore') {
    var a = this.gst / 2;
    this.taxInfo = `CGST = ${a}% and SGST = ${a}%`
  } else {
    this.taxInfo = `IGST ${this.gst}%`;
  }
}

patchCityState() {
  
  let state = this.cityStateMatch.filter((res) => {
    if(res.city === this.city) {
     return true;
    } 
  });

  this.checkoutForm.patchValue({
    town: this.city,
    state: state[0].state
  })
}

validatePostal() {
  const postalCode = this.checkoutForm.value.postalcode;
  if(postalCode.length >= 6) {
    if(this.pincodes[this.city].includes(postalCode)) {
      this.invalidPostal = false;
    } else {
      this.invalidPostal = true;
    }
  }
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
}

calculateTotal() {
  this.grandTotal =this.grandDeposit + (parseInt(this.getTenureVal) * (this.gst)/100) + parseInt(this.getTenureVal);
  this.paymentForm.patchValue({
    amount: this.grandTotal
  });
}

delivery(evt){
  if(evt.target.checked){
    this.deliveryFee=0;
    this.grandTotal = this.grandTotal - 200;
  }
  else{
    this.deliveryFee=200;
    this.grandTotal = this.grandTotal + 200;
  }
  this.paymentForm.patchValue({
    amount: this.grandTotal
  });

  this.generateHash();
  
}


// stripe payment gateway
stripeCheckout() {
    var handler = (<any>window).StripeCheckout.configure({
      key: 'PUBLISHBLE_KEY', // publishble key
      locale: 'auto',
      token: (token: any) => {
        // You can access the token ID with `token.id`.
        // Get the token ID to your server-side code for use.
        this.orderService.createOrder(this.checkOutItems, this.checkoutForm.value, token.id, this.amount);
      }
    });
    handler.open({
      name: 'Multikart',
      description: 'Online Fashion Store',
      amount: this.amount * 100
    })
}

// Paypal payment gateway
private initConfig(): void {
    this.payPalConfig = new PayPalConfig(PayPalIntegrationType.ClientSideREST, PayPalEnvironment.Sandbox, {
      commit: true,
      client: {
        sandbox: 'CLIENT_ID', // client Id
      },
      button: {
        label: 'paypal',
        size:  'small',    // small | medium | large | responsive
        shape: 'rect',     // pill | rect
        // color: 'blue',   // gold | blue | silver | black
        // tagline: false
      },
      onPaymentComplete: (data, actions) => {
        this.orderService.createOrder(this.checkOutItems, this.checkoutForm.value, data.orderID, this.amount);
      },
      onCancel: (data, actions) => {
        console.log('OnCancel');
      },
      onError: (err) => {
        console.log('OnError');
      },
      transactions: [{
        amount: {
          currency: this.productsService.currency,
          total: this.amount
        }
      }]
    });
}

generateHash() {
  this.paymentForm.patchValue({
    surl: 'http://localhost:3000/payments/response'
  });
  this.cityService.getHash(this.paymentForm.value).subscribe((res) => {
    this.paymentForm.patchValue({
      hash: res
    });
  });
}

startPayment() {
  // generate order id and tran id
  // store in db
  // get the response - pass tranid from db
  this.launchBOLT();
}

launchBOLT()
  {
      bolt.launch({
      key: $('#key').val(),
      txnid: $('#txnid').val(), 
      hash: $('#hash').val(),
      amount: $('#amount').val(),
      firstname: $('#fname').val(),
      email: $('#email').val(),
      phone: $('#mobile').val(),
      productinfo: $('#pinfo').val(),
      udf5: $('#udf5').val(),
      surl : $('#surl').val(),
      furl: $('#surl').val()
  },{ responseHandler: function(BOLT){
      console.log( BOLT.response.txnStatus );		
      if(BOLT.response.txnStatus != 'CANCEL')
      {
          //Salt is passd here for demo purpose only. For practical use keep salt at server side only.
          var fr = '<form action=\"'+$('#surl').val()+'\" method=\"post\">' +
          '<input type=\"hidden\" name=\"key\" value=\"'+BOLT.response.key+'\" />' +
          '<input type=\"hidden\" name=\"salt\" value=\"'+$('#salt').val()+'\" />' +
          '<input type=\"hidden\" name=\"txnid\" value=\"'+BOLT.response.txnid+'\" />' +
          '<input type=\"hidden\" name=\"amount\" value=\"'+BOLT.response.amount+'\" />' +
          '<input type=\"hidden\" name=\"productinfo\" value=\"'+BOLT.response.productinfo+'\" />' +
          '<input type=\"hidden\" name=\"firstname\" value=\"'+BOLT.response.firstname+'\" />' +
          '<input type=\"hidden\" name=\"email\" value=\"'+BOLT.response.email+'\" />' +
          '<input type=\"hidden\" name=\"udf5\" value=\"'+BOLT.response.udf5+'\" />' +
          '<input type=\"hidden\" name=\"mihpayid\" value=\"'+BOLT.response.mihpayid+'\" />' +
          '<input type=\"hidden\" name=\"status\" value=\"'+BOLT.response.status+'\" />' +
          '<input type=\"hidden\" name=\"hash\" value=\"'+BOLT.response.hash+'\" />' +
          '</form>';
          var form = jQuery(fr);
          jQuery('body').append(form);								
          form.submit();
      }

      if(BOLT.response.txnStatus === 'CANCEL') {
        alert('Payment cancelled');
      }
  },
      catchException: function(BOLT){
           alert( BOLT.message );
      }
  });
  }

}
