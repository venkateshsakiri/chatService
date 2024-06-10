import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AdminService } from '../../services/admin/admin.service';
import { DatePipe } from '@angular/common';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-post-coupons',
  templateUrl: './post-coupons.component.html',
  styleUrls: ['./post-coupons.component.scss'],
  providers:[DatePipe]
})
export class PostCouponsComponent implements OnInit {
  public postCouponForm!:FormGroup;
  public isLoadingComplete:boolean = false;
  public minExpiryDate = new Date();

  constructor(public adminService:AdminService,public datePipe:DatePipe,public snackBar:MatSnackBar) { }

  ngOnInit(): void {
    this.postCouponForm = new FormGroup({
      name: new FormControl('',Validators.required),
      code: new FormControl('',Validators.required),
      discount: new FormControl('',Validators.required),
      expiryDate: new FormControl('',Validators.required)
    })
  }

  public addCoupon(){
    if(this.postCouponForm.valid){
      console.log(this.postCouponForm.value)
      let reqData = {
        'name': this.postCouponForm.controls['name'].value,
        'code': this.postCouponForm.controls['code'].value,
        'discount': this.postCouponForm.controls['discount'].value,
        'exipryDate': this.postCouponForm.controls['expiryDate'].value? this.datePipe.transform(this.postCouponForm.controls['expiryDate'].value,'dd/MM/yyyy') : ''
      }
      this.isLoadingComplete = true;
      this.adminService.postCoupon(reqData).subscribe((res:any)=>{
        this.isLoadingComplete = false;
        this.snackBar.open(res, 'Close',{duration:5000});
      },(err)=>{
        this.snackBar.open(err, 'Error',{duration:5000});
        this.isLoadingComplete = false;
      })
    }
  }

}
