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
  public base64Format:any;
  public categoryName:any;
  constructor(public adminService:AdminService, public snackBar:MatSnackBar, public router:Router) { }

  ngOnInit(): void {
    this.productForm = new FormGroup({
      name: new FormControl('',Validators.required),
      brandName: new FormControl('',Validators.required),
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
  public getCategoryName(opt:any){
    this.categoryName = opt.name;
  }
  addProduct(){
    if(this.productForm.valid){
      this.isLoadingComplete = true;
      let id = this.productForm.controls['categoryId'].value+'';
      this.productForm.controls['categoryId'].setValue(id);

      let reqObj = {
        name: this.productForm.controls['name'].value,
        brandName: this.productForm.controls['brandName'].value,
        amount:this.productForm.controls['price'].value,
        description:this.productForm.controls['description'].value,
        updatedUategoryId:this.productForm.controls['categoryId'].value,
        categoryName:this.categoryName,
        byteImg:this.base64Format
      }

      this.adminService.addProduct(reqObj).subscribe((res:any)=>{
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
      const base64String = (reader.result as string).replace(/^data:image\/[a-z]+;base64,/, '');
      this.base64Format = base64String;
      console.log(this.base64Format)
    }
    reader.readAsDataURL(this.selectedFile);
  }

}
