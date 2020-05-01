import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from 'src/app/shared/services/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;

  constructor(private formBuilder: FormBuilder, private us: UserService) { }

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      logintype: 'web'
  });
  }

  loginUserForm() {
    let token;
    this.us.userLogin(this.loginForm.value).subscribe((res: any) => {
      if(res.authenticated) {
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
      }
    });
  }

}
