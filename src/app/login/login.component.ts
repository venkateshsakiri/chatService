import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { AuthService } from '../service/auth/auth.service';
import { CommonService } from '../service/common/common.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  public loginForm!:FormGroup;
  public isLoader:boolean = false;
  public hidePassword:boolean = true;
   constructor(public router:Router, public snackBar:MatSnackBar,public authService:AuthService,public commonService:CommonService) {
     this.loginForm = new FormGroup({
       email:new FormControl('admin@gmail.com',[Validators.required,Validators.email]),
       password:new FormControl('123456',Validators.required)
     })
   }

  ngOnInit(): void {
  }

  togglePasswordVisibility(field:any){
    this.hidePassword = !this.hidePassword;
  }

  onSubmit(){
    this.isLoader = true;
    this.authService.login(this.loginForm.value).subscribe((response:any)=>{
      this.isLoader = true;
      this.snackBar.open(response, 'Close',{duration:5000});
      let res = JSON.parse(response);
      if(res){
        if(res?.status == 'SUCCESS'){
          this.commonService.userInfo = res?.user;
          this.snackBar.open(res?.message, 'Close',{duration:5000});
          // if(this.commonService.isAdmin()){
          //   this.router.navigate(['/admin/dashboard']);
          // }else if(this.commonService.isCustomerLogin()){
          //   this.router.navigate(['/customer/dashboard']);
          // }
          this.router.navigate(['/chat']);
          // this.router.navigate(['/dashboard']);
        }else{
          this.snackBar.open(res, 'Close',{duration:5000});
        }

      }


    },(err:any)=>{
      this.isLoader = true;
      console.log(err)
      this.snackBar.open('Sign up failed. Please try again.', 'Close',{duration:5000, panelClass:'error-snackbar'});
    })
  }
}
