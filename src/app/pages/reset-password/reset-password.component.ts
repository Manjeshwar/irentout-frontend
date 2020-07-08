import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators,ValidatorFn,FormControl } from '@angular/forms';
import { UserService } from 'src/app/shared/services/user.service';

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
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.scss']
})
export class ResetPasswordComponent implements OnInit {

  userDetails:any;
  resetForm:FormGroup;
  id:string;
  fa:string="fa-eye-slash";
  show: boolean=false;
  

  constructor(private formBuilder: FormBuilder,public route:ActivatedRoute,private router: Router,private us: UserService) { }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.id= params['id'];
      console.log(this.id);
    });
    this.resetForm = this.formBuilder.group({
      upass: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', [Validators.required, Validators.minLength(6), passwordMatchValidator('upass')]],
    });
  }

  reset(){
    const controls = this.resetForm.controls;
    var city=localStorage.getItem('city');
    Object.keys(controls).forEach(key => {
      controls[key].markAsTouched();
    })
    this.us.getFullUserDetails().subscribe(res =>{
      this.userDetails=res;
      if ((this.resetForm.value.upass === this.resetForm.value.confirmPassword) && this.resetForm.valid) {
        this.userDetails.forEach((dta) => {        
          if(this.id==dta.uid){
            this.us.updatePassword(this.id, this.resetForm.value).subscribe(res=>{
              console.log(res);
              this.router.navigate([city,'login']);
            });
          }
        });
      }      
    });    
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
