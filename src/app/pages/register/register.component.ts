import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup,FormControl, Validators, ValidatorFn } from '@angular/forms';
import { UserService } from 'src/app/shared/services/user.service';
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
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  registerForm: FormGroup;
  fa:string="fa-eye-slash";
  fa1:string="fa-eye-slash";
  show: boolean=false;
  show1: boolean=false;
  constructor(private formBuilder: FormBuilder, private rs: UserService, private router: Router) { }

  ngOnInit() {
    this.registerForm = this.formBuilder.group({
      firstName: ['', [Validators.required, Validators.pattern('[a-zA-Z][a-zA-Z ]+[a-zA-Z]$')]],
      lastName: ['', [Validators.required, Validators.pattern('[a-zA-Z][a-zA-Z ]+[a-zA-Z]$')]],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', [Validators.required, Validators.pattern('[0-9]+')]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', [Validators.required, Validators.minLength(6), passwordMatchValidator('password')]],
      username: ''
  });
  }

  registerUserForm() {
    const controls = this.registerForm.controls;

    Object.keys(controls).forEach(key => {
      controls[key].markAsTouched();
    })
    const cty = localStorage.getItem('city');
    this.registerForm.patchValue({
      username: `${this.registerForm.value.firstName} ${this.registerForm.value.lastName}`
    });
    if ((this.registerForm.value.password === this.registerForm.value.confirmPassword) && this.registerForm.valid) {
      this.rs.register(this.registerForm.value).subscribe((res: any) => {
        if (res.authenticated) {
          this.router.navigate([cty,'login']);
        }
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

  passwordVisibility1(){
    this.show1 = !this.show1;
    if(this.show1){
      this.fa1="fa-eye";
    }
    else{
      this.fa1="fa-eye-slash";
    }
  }
  

}
