import { Component, OnInit, ViewChild, ElementRef, Output,EventEmitter } from '@angular/core';
import { UserService } from 'src/app/shared/services/user.service';
import { ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { FormGroup, FormBuilder,Validators } from '@angular/forms';

@Component({
  selector: 'app-profile-address',
  templateUrl: './profile-address.component.html',
  styleUrls: ['./profile-address.component.scss']
})
export class ProfileAddressComponent implements OnInit {

  allBillAddress;
  displayForm;
  public editAddressForm   :  FormGroup;
  userId=localStorage.getItem('uid');
  addrId;

  @ViewChild('billAddressModal') billAddressModal: ElementRef;
  @ViewChild('editAddressModal') editAddressModal: ElementRef;
  @ViewChild('deleteModal') deleteModal : ElementRef;

  constructor(public us:UserService,private fb: FormBuilder) { 
    this.editAddressForm = this.fb.group({
      user:['company'],
      addresstype:[''],
      nickname:[''],
      fname: ['', [Validators.required, Validators.pattern('[a-zA-Z][a-zA-Z ]+[a-zA-Z]$')]],
      lname: ['', [Validators.required, Validators.pattern('[a-zA-Z][a-zA-Z ]+[a-zA-Z]$')]],
      companyName:[''],
      gst:[''],
      mobile: ['', [Validators.required, Validators.pattern('[0-9]+')]],
      address: ['', [Validators.required, Validators.maxLength(250)]],
      town: ['', Validators.required],
      state: ['', Validators.required],
      pincode: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  ngOnInit(): void {
    this.getUserDetails();
  }
  getUserDetails(){
    this.us.getUserDetailsByUid(this.userId).subscribe((dta) => {    
      let billAddrsFields = JSON.parse(dta[0].billingaddress);
      this.allBillAddress = billAddrsFields;        
  });
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
    this.updateDefaultBillAddress(this.allBillAddress);
  }

  updateDefaultBillAddress(addr) {
    this.us.addUpdateBillAddress(this.userId, JSON.stringify(addr)).subscribe((addrs) => {
      // console.log(addrs);
    });
  }

  deleteAddress(id){
      let deleteAddress = this.allBillAddress.filter(deleteId => {
        return deleteId.id != id;
      });
      // console.log(deleteAddress);
    this.us.addUpdateBillAddress(this.userId, JSON.stringify(deleteAddress)).subscribe((addrs) => {
      this.getUserDetails();
      this.deleteModal.nativeElement.click();
    });
  }

  newBillAddressAdded() {
    this.us.getUserDetailsByUid(this.userId).subscribe((dta) => {
      let billAddrFields = JSON.parse(dta[0].billingaddress);
      this.allBillAddress = billAddrFields;
      billAddrFields = billAddrFields.filter(bill => bill.default);
      this.billAddressModal.nativeElement.click();
      this.editAddressForm.reset();
    });
  }
  
  getAddress(id){
    this.allBillAddress.filter((res) => {
      if(res.id === id){
        this.addrId=res;
      }      
    });
  }

  changeAddress(){
    this.getUserDetails();
    this.editAddressModal.nativeElement.click();
  }


}
