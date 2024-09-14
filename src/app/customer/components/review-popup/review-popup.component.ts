import { Component, Inject, OnInit, inject } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { CustomerProductService } from '../../services/product/customer-product.service';
import { CommonService } from 'src/app/service/common/common.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-review-popup',
  templateUrl: './review-popup.component.html',
  styleUrls: ['./review-popup.component.scss']
})
export class ReviewPopupComponent implements OnInit {
    signupForm:FormGroup
  constructor(private fb:FormBuilder,@Inject(MAT_DIALOG_DATA) public data: {data: any},public orderService:CustomerProductService,public commonService:CommonService,public snackBar:MatSnackBar,public dialog:MatDialog) { }

  ngOnInit(): void {
   this.signupForm=new FormGroup({
   description : new FormControl('',Validators.required),
   rating : new FormControl('1',Validators.required),

  })
  console.log(this.data?.data)
  }
  onSubmit() {
    if(this.signupForm.valid){
      let obj = {
        'email':this.commonService.userInfo?.email,
        'rating':this.signupForm.controls['rating'].value,
        'description':this.signupForm.controls['description'].value,
        'productId':this.data.data.product?.id+''
      }
      this.orderService.postReview(obj).subscribe((res:any)=>{
        this.snackBar.open(res?.message, 'Close', { duration: 5000 });
        this.dialog.closeAll();
      },()=>{

      })
    }
    console.log(this.signupForm.value);
  }

}
