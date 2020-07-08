import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/shared/services/user.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-forget-password',
  templateUrl: './forget-password.component.html',
  styleUrls: ['./forget-password.component.scss']
})
export class ForgetPasswordComponent implements OnInit {

  forgetForm: FormGroup;
  userDetails:any;
  emailExist:boolean=false;
  emailMessage: string = '';
  city:string= localStorage.getItem('city');
  token:string;

  constructor(private formBuilder: FormBuilder,private us: UserService, public route:ActivatedRoute) { }

  ngOnInit() {
    this.forgetForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      city:[''],
      token:['']
    });
    

  }

  recover(){
    const email=this.forgetForm.value.email;
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

    // this.us.getFullUserDetails().subscribe(res =>{
    //   this.userDetails=res;
    //   this.userDetails.forEach((dta) => {        
    //     if(email==dta.email && dta.logintype=="web"){
    //       this.emailExist=true;
    //       this.token=dta.uid;
    //       this.us.forgotMail(email,this.city,this.token).subscribe(success => {
    //         console.log(success);
    //       }, error => {
    //         console.log("error mail");
    //       });
    //     };
    //   });
    // });    
  }

  

  

}
