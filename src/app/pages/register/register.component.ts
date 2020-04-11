import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from 'src/app/shared/services/user.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  registerForm: FormGroup;

  constructor(private formBuilder: FormBuilder, private rs: UserService) { }

  ngOnInit() {
    this.registerForm = this.formBuilder.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', Validators.required],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', Validators.required],
      username: ''
  });
  }

  registerUserForm() {
    this.registerForm.patchValue({
      username: `${this.registerForm.value.firstName} ${this.registerForm.value.lastName}`
    })
    if ((this.registerForm.value.password === this.registerForm.value.confirmPassword) && this.registerForm.valid) {
      this.rs.register(this.registerForm.value).subscribe((res) => {
        console.log(res);
      });
    }
  }

}
