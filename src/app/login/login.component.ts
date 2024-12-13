import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { AuthService } from '../service/auth/auth.service';
import { CommonService } from '../service/common/common.service';
import { environment } from 'src/environments/environment';

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
      this.isLoader = false;
      this.snackBar.open(response, 'Close',{duration:5000});
      let res;
      if(environment.isNodeJS){
        res = (response);
      }else{
        res = JSON.parse(response);
      }
      // let res = JSON.parse(response);
      if(res){
        if(res?.status == 'SUCCESS'){
          this.commonService.userInfo = res?.user;
          this.snackBar.open(res?.message, 'Close',{duration:5000});
          this.router.navigate(['/dashboard']);
        }else{
          this.snackBar.open(res, 'Close',{duration:5000});
        }

      }


    },(err:any)=>{
      this.isLoader = false;
      console.log(err)
      this.snackBar.open('Login failed. Please try again.', 'Close',{duration:5000, panelClass:'error-snackbar'});
    })
  }
}
