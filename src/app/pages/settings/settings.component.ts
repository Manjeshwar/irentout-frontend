import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { UserService } from 'src/app/shared/services/user.service';
import { FormGroup, FormControl, Validators, ValidatorFn, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';

function passwordMatchValidator(password: string): ValidatorFn {
  return (control: FormControl) => {
    console.log(control)
    if (!control || !control.parent) {  
      return null;
    }
    return control.parent.get(password).value === control.value ? null : { mismatch: true };
  };
}

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss']
})
export class SettingsComponent implements OnInit {

  @ViewChild('nameChange') nameChange: ElementRef;
  @ViewChild('emailChange') emailChange: ElementRef;
  @ViewChild('mobileChange') mobileChange: ElementRef;
  @ViewChild('passwordChange') passwordChange: ElementRef;

  userId=localStorage.getItem('uid');
  city=localStorage.getItem('city');
  userData;
  editName: FormGroup;
  editEmail: FormGroup;
  editPassword: FormGroup;
  editMobile: FormGroup;
  fa = 'fa-eye-slash';
  show = false;

  constructor(private formBuilder: FormBuilder, private router: Router, public us: UserService) { }

  ngOnInit(): void {
    this.getUserData();
    this.editName = this.formBuilder.group({
      firstName: ['', [Validators.required, Validators.pattern('[a-zA-Z][a-zA-Z ]+[a-zA-Z]$')]],
      lastName: ['', [Validators.required, Validators.pattern('[a-zA-Z][a-zA-Z ]+[a-zA-Z]$')]]
    });

    this.editEmail = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]]
    });

    this.editPassword = this.formBuilder.group({
      upass: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', [Validators.required, Validators.minLength(6), passwordMatchValidator('upass')]],
    });

    this.editMobile = this.formBuilder.group({
      mobile: ['', [Validators.required, Validators.pattern('[0-9]+')]],
    });
  }

  getUserData(){
    this.us.getUserDetailsByUid(this.userId).subscribe((user)=>{
      this.userData=user;
    });
  }

  updateName() {
    const controls = this.editName.controls;
    Object.keys(controls).forEach(key => {
      controls[key].markAsTouched();
    });
    
    if (this.editName.valid) {
      this.us.updateUser(this.userId, this.editName.value).subscribe(res=>{
        console.log(res);
        this.getUserData();
        this.nameChange.nativeElement.click();
        this.editName.reset();
      });
    }        
  }

  updateEmail() {
    const controls = this.editEmail.controls;
    Object.keys(controls).forEach(key => {
      controls[key].markAsTouched();
    });
    
    if (this.editEmail.valid) {
      this.us.updateEmail(this.userId, this.editEmail.value).subscribe(res=>{
        console.log(res);
        this.getUserData();
        this.emailChange.nativeElement.click();
        this.editEmail.reset();
      });
    }        
  }

  updateMobile(){
    const controls = this.editMobile.controls;
    Object.keys(controls).forEach(key => {
      controls[key].markAsTouched();
    });

    if (this.editMobile.valid) {
      this.us.updateMobile(this.userId, this.editMobile.value).subscribe(res=>{
        console.log(res);
        this.getUserData();
        this.mobileChange.nativeElement.click();
        this.editMobile.reset();
      });
    }
  }

  updatePassword() {
    const controls = this.editPassword.controls;
    Object.keys(controls).forEach(key => {
      controls[key].markAsTouched();
    });
    
    if ((this.editPassword.value.upass === this.editPassword.value.confirmPassword) && this.editPassword.valid) {
      this.us.updateProfilePassword(this.userId, this.editPassword.value).subscribe(res=>{
        console.log(res);
        this.passwordChange.nativeElement.click();
        this.editPassword.reset();
      });
    } 
  }

  passwordVisibility(){
    this.show = !this.show;
    if(this.show){
      this.fa="fa-eye";
    }
    else{
      this.fa="fa-eye-slash";
    }
  }

}
