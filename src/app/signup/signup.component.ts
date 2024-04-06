import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { AuthService } from '../service/auth/auth.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {
 public signUpForm!:FormGroup;
 public hidePassword:boolean = true;
  constructor(public router:Router, public snackBar:MatSnackBar,public authService:AuthService) {
    this.signUpForm = new FormGroup({
      name:new FormControl('',Validators.required),
      email:new FormControl('',[Validators.required,Validators.email]),
      password:new FormControl('',Validators.required),
      confirmPassword:new FormControl('',Validators.required)
    })
  }

  ngOnInit(): void {
  }
  togglePasswordVisibility(field:any){
    this.hidePassword = !this.hidePassword;
  }

  onSubmit(){
    const password = this.signUpForm.controls['password'].value;
    const confirmPassword = this.signUpForm.controls['confirmPassword'].value;
    if(password != confirmPassword){
      this.snackBar.open('Password do not match.', 'Close',{duration:5000, panelClass:'error-snackbar'});
      return
    }

    this.authService.register(this.signUpForm.value).subscribe((res:any)=>{
      this.snackBar.open('Sign up successfully!.', 'Close',{duration:5000});
      this.router.navigate(['/login']);
    },(err:any)=>{
      console.log(err)
      this.snackBar.open('Sign up failed. Please try again.', 'Close',{duration:5000, panelClass:'error-snackbar'});
    })
  }

}
