import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AdminService } from '../../services/admin/admin.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

@Component({
  selector: 'app-post-category',
  templateUrl: './post-category.component.html',
  styleUrls: ['./post-category.component.scss']
})
export class PostCategoryComponent implements OnInit {

  public categoryForm!:FormGroup;
  constructor(public adminService:AdminService,public snackBar:MatSnackBar,public router:Router) { }

  ngOnInit(): void {
    this.categoryForm = new FormGroup({
      name:new FormControl('',Validators.required),
      description: new FormControl('',Validators.required)
    })
  }

  addCategory(){
    if(this.categoryForm.valid){
      this.adminService.addCategory(this.categoryForm.value).subscribe((res:any)=>{
        console.log(res)
        if(res?.id != null){
          this.snackBar.open('Category added successfully!', 'Close',{duration:5000});
          this.router.navigate(['/admin/dashboard']);
        }
      })
    }else{
      this.categoryForm.markAllAsTouched();
    }
  }

}
