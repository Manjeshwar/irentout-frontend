import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from 'src/app/shared/services/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;
  authenticated:boolean=false;
  dbVerifiedPassword = false;
  submitted:boolean=false;
  city=localStorage.getItem('city');
  emailExist;
  emailMessage;

  constructor(private formBuilder: FormBuilder, private us: UserService, private router: Router) { }

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      logintype: 'web'
  });
  }

  loginUserForm() {
    this.submitted=true;
    this.dbVerifiedPassword=false;
    // const controls = this.loginForm.controls;

    // Object.keys(controls).forEach(key => {
    //   controls[key].markAsTouched();
    // })
    if(this.loginForm.valid) {
      let token;
      this.us.userLogin(this.loginForm.value).subscribe((res: any) => {
        const email=this.loginForm.value.email;
        this.us.checkmailidexists(email).subscribe((emailVal) => {
          this.emailExist = emailVal['status'];
          this.emailMessage = emailVal['message'];
          if(this.emailExist) {
            this.us.forgotMail(email, this.city).subscribe(success => {
              console.log(success);
            }, error => {
              console.log("error mail");
            });
          }
        });
        
        if(res.authenticated) {
          this.authenticated=true;
          console.log(this.authenticated);
          token = res.token;
          this.us.getUserDetails(res.token).subscribe((res: any) => {
            if(res.authenticated) {
              const uname = res.data[0].uname;
              const uid = res.data[0].uid;
              const logintype = res.data[0].logintype;
              const cart = res.data[0].cart;
  
              localStorage.setItem('uname', uname);
              localStorage.setItem('uid', uid);
              localStorage.setItem('logintype', logintype);
              localStorage.setItem('token', token);
              localStorage.setItem('cartItem', cart);
              const redirect = localStorage.getItem('redirectto');
              window.location.href = redirect;
            }
          });
        } else {
          this.dbVerifiedPassword=true;
        }
      });
    }    
  }

  registerRedirect() {
    const cty = localStorage.getItem('city');
    this.router.navigate([`${cty}/register`]);
  }

}
