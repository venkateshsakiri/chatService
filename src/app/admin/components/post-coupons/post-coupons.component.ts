import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AdminService } from '../../services/admin/admin.service';
import { DatePipe } from '@angular/common';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';

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
  public data:any;

  constructor(public adminService:AdminService,public datePipe:DatePipe,public snackBar:MatSnackBar,public dialog:MatDialog) {
    this.data = this.adminService.editCoupon;
  }

  ngOnInit(): void {

    console.log(this.data)

    this.postCouponForm = new FormGroup({
      name: new FormControl('',Validators.required),
      code: new FormControl('',Validators.required),
      discount: new FormControl('',Validators.required),
      expiryDate: new FormControl('',Validators.required)
    })
    this.data? this.postCouponForm.patchValue(this.data) : '';
    // this.postCouponForm.controls['expiryDate'].setValue(this.datePipe.transform(new Date(this.data?.exipryDate),'MM/dd/yyyy'));
  }

  public addCoupon(){
    if(this.postCouponForm.valid){
      console.log(this.postCouponForm.value)
      let reqData = {
        'name': this.postCouponForm.controls['name'].value,
        'code': this.postCouponForm.controls['code'].value,
        'discount': this.postCouponForm.controls['discount'].value,
        'exipryDate': this.postCouponForm.controls['expiryDate'].value? this.datePipe.transform(this.postCouponForm.controls['expiryDate'].value,'dd/MM/yyyy') : '',
        ...(this.data? {
          'id':this.data?.id
        }: '')
      }
      this.isLoadingComplete = true;
      this.adminService.postCoupon(reqData,this.data).subscribe((res:any)=>{
        this.isLoadingComplete = false;
        console.log(res)
        this.data? '' : this.snackBar.open(res, 'Close',{duration:5000});
        this.snackBar.open(res, 'Close',{duration:5000})
      },(err)=>{
        // this.data? '' : this.snackBar.open(err, 'Error',{duration:5000});
        // this.snackBar.open(err, 'Error',{duration:5000})
        this.isLoadingComplete = false;
      })
      this.data? this.dialog.closeAll() : '';
      this.adminService.editCoupon = null;
    }
  }

}
