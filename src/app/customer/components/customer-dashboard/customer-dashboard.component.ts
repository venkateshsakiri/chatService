import { Component, OnInit } from '@angular/core';
import { CommonService } from 'src/app/service/common/common.service';
import { CustomerProductService } from '../../services/product/customer-product.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

@Component({
  selector: 'app-customer-dashboard',
  templateUrl: './customer-dashboard.component.html',
  styleUrls: ['./customer-dashboard.component.scss']
})
export class CustomerDashboardComponent implements OnInit {
  public categoryList:any;
  public isCompleteLoading:boolean = false;
  public imagePath:any;

  constructor(public commonService:CommonService,public customerProduct:CustomerProductService,public snackBar:MatSnackBar,public router:Router) {
    this.commonService.currentPage = 'ecom-dashboard';
  }

  ngOnInit(): void {
    // this.customerProduct.getAllProducts().subscribe((res:any)=>{
    //   console.log(res);
    // })
    this.getAllCategoryList();
  }

  public getAllCategoryList(){
    this.isCompleteLoading = true;
    this.customerProduct.getAllCategories().subscribe((res:any)=>{
      this.isCompleteLoading = false;
      this.categoryList = res;
      this.commonService.categoryList = res;
      this.categoryList.map((element:any)=>{
        if(element?.name=== 'Home & Furniture'){
          element.imagePath = 'assets/images/furniture.jpg';
        }else if(element?.name=== 'Laptop & Desktop'){
          element.imagePath = 'assets/images/Laptops.jpg';
        }else if(element?.name=== 'Beauty, Toys & More'){
          element.imagePath = 'assets/images/toys.jpg';
        }else if(element?.name=== 'Two Wheelers'){
          element.imagePath = 'assets/images/bike.jpg';
        }
        else{
          element.imagePath = 'assets/images/'+element.name+'.jpg';
        }
      })
    },(err)=>{
      this.isCompleteLoading = false;
      this.snackBar.open(err?.message, 'ERROR',{duration:5000});
    })
  }

  public goToProductDetails(category:string){
    this.router.navigate(['/customer/product-details',category]);
  }

}
