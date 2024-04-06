import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AdminService } from '../../services/admin/admin.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

@Component({
  selector: 'app-post-product',
  templateUrl: './post-product.component.html',
  styleUrls: ['./post-product.component.scss']
})
export class PostProductComponent implements OnInit {

  public productForm!:FormGroup;
  public listOfCategory:any = [];
  public imgPreview:string | ArrayBuffer | null;
  public selectedFile:File | null;
  public isLoadingComplete:boolean = false;
  constructor(public adminService:AdminService, public snackBar:MatSnackBar, public router:Router) { }

  ngOnInit(): void {
    this.productForm = new FormGroup({
      name: new FormControl('',Validators.required),
      price: new FormControl('',Validators.required),
      description: new FormControl('',Validators.required),
      categoryId: new FormControl('',Validators.required),
    })
    this.getAllCategories();
  }

  public getAllCategories(){
    this.adminService.getCategories().subscribe((res:any)=>{
      this.listOfCategory = res;
    },()=>{

    })
  }
  addProduct(){
    if(this.productForm.valid){
      this.isLoadingComplete = true;
      console.log(typeof(this.productForm.controls['price'].value));
      console.log(this.productForm.value);
      const formData: FormData = new FormData();
      formData.append('img',this.selectedFile);
      formData.append('categoryId',this.productForm.controls['categoryId'].value);
      formData.append('name',this.productForm.controls['name'].value);
      formData.append('price',this.productForm.controls['price'].value);
      formData.append('description',this.productForm.controls['description'].value);
      this.adminService.addProduct(formData).subscribe((res:any)=>{
        this.isLoadingComplete = false;
        if(res?.id != null){
          this.snackBar.open('Product posted successfully!', 'Close',{duration:5000});
          this.router.navigate(['/admin/dashboard']);
        }else{
          this.snackBar.open(res?.message, 'ERROR',{duration:5000});
        }
      },(err)=>{
        this.isLoadingComplete = false;
        this.snackBar.open(err?.message, 'ERROR',{duration:5000});
      })

    }else{
      for(const i in this.productForm.controls){
        this.productForm.controls[i].markAsDirty();
        this.productForm.controls[i].updateValueAndValidity();
      }
    }
  }

  public onFileSelected(event:any){
    this.selectedFile = event.target.files[0];
    this.previewImage();
  }

  public previewImage(){
    const reader = new FileReader();
    reader.onload = () =>{
      this.imgPreview = reader.result;
    }
    reader.readAsDataURL(this.selectedFile);
  }

}
