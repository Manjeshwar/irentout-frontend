import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { FormGroup, FormBuilder,Validators } from '@angular/forms';
import { UserService } from 'src/app/shared/services/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-addresses',
  templateUrl: './addresses.component.html',
  styleUrls: ['./addresses.component.scss']
})
export class AddressesComponent implements OnInit {

  shipAddress=true;
  public billingAddressForm   :  FormGroup;
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

  constructor(private fb: FormBuilder, private userService: UserService, public router:Router) {
    this.billingAddressForm = this.fb.group({
      fname: ['', [Validators.required, Validators.pattern('[a-zA-Z][a-zA-Z ]+[a-zA-Z]$')]],
      companyName:[''],
      gst:[''],
      mobile: ['', [Validators.required, Validators.pattern('[0-9]+')]],
      address: ['', [Validators.required, Validators.maxLength(50)]],
      town: ['', Validators.required],
      state: ['', Validators.required],
      pincode: ['', [Validators.required, Validators.minLength(6)]],
      shipAddress:['']
    });
  }

  ngOnInit(): void {
    this.patchCityState();
  }

  patchCityState() {
    const state = this.cityStateMatch.filter((res) => {
      if (res.city === this.city) {
       return true;
      }
    });
  
    this.billingAddressForm.patchValue({
      town: this.city,
      state: state[0].state
    });
  }

  validatePostal() {
    const pincode = this.billingAddressForm.value.pincode;
    if (pincode.length >= 6) {
      if (this.pincodes[this.city].includes(pincode)) {
        this.invalidPostal = false;
      } else {
        this.invalidPostal = true;
      }
    }
    this.billingAddressForm.patchValue({
      pincode: this.billingAddressForm.value.pincode
    });
  }


  addBillAddress() {
    const controls = this.billingAddressForm.controls;

    Object.keys(controls).forEach(key => {
      controls[key].markAsTouched();
    });

    if(this.billingAddressForm.valid){
      this.userService.getBillAddress(localStorage.getItem('uid')).subscribe((dta) => {
        const ids = ((1 + Math.random())).toString(32).substring(1).replace('.', '');
        const formVal = this.billingAddressForm.value;
        const billAddr = {
          id: ids,
          firstname: formVal.fname,
          comapanyname:formVal.companyName,
          gst:formVal.gst,
          phone: formVal.mobile,
          addr: formVal.address,
          city: formVal.town,
          state: formVal.state,
          postal: formVal.pincode,
          default: true
        };
        const addrFields = JSON.parse(dta[0].billingaddress);
        addrFields.forEach((res) => {
          res.default = false;
        });
        addrFields.push(billAddr);
  
        this.userService.addUpdateBillAddress(localStorage.getItem('uid'), JSON.stringify(addrFields)).subscribe((addrs) => {
          if(this.shipAddress){
            this.userService.getAddress(localStorage.getItem('uid')).subscribe((dta) => {
                
              const shipAddr = {
                id: ids,
                firstname: formVal.fname,
                phone: formVal.mobile,
                addr: formVal.address,
                city: formVal.town,
                state: formVal.state,
                postal: formVal.pincode,
                default: true
              };
  
              const shipAddrFields = JSON.parse(dta[0].address);
              shipAddrFields.forEach((res) => {
                res.default = false;
              });
              shipAddrFields.push(shipAddr);
              this.userService.addUpdateAddress(localStorage.getItem('uid'), JSON.stringify(shipAddrFields)).subscribe((shipAddrs) => {
  
              });
            });          
            let redirect = localStorage.getItem('redirectto');
            redirect = redirect ? localStorage.getItem('redirectto') : '/';
            window.location.href = redirect;
          }
          else{
            this.router.navigate([`/${localStorage.getItem('city')}/add-address`]);
          }          
        });
      });
    }    
  }

}
