import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CustomerProductService } from '../../services/product/customer-product.service';
import { CommonService } from 'src/app/service/common/common.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.scss'],
})
export class ProductDetailsComponent implements OnInit {
  public productList: any = [];
  public categoryList: any;
  public selectedCategoryName: string;
  public isLoadingComplete: boolean = false;
  public wishList:any = [];
  constructor(
    public router: Router,
    public commonService: CommonService,
    public customerService: CustomerProductService,
    private route: ActivatedRoute,
    public snackBar: MatSnackBar
  ) {
    this.selectedCategoryName =
      this.route.snapshot.paramMap.get('categoryName');
  }

  ngOnInit(): void {
    this.categoryList = this.commonService?.categoryList;
    this.getAllProducts();

  }
  public updateCategoryProducts(category: string) {
    if(this.selectedCategoryName !== category){
      this.router.navigate(['/customer/product-details', category]);
      this.selectedCategoryName = category;
      this.getAllProducts();
    }
  }

  public getAllProducts() {
    this.isLoadingComplete = true;
    this.customerService
      .getAllProductsByCategoryName(this.selectedCategoryName)
      .subscribe(
        (res: any) => {
          this.productList = res;
          this.productList.map((ele: any) => {
            ele.imageBase64 = 'data:image/jpeg;base64,' + ele.img;
            ele.isAddFav = false;
            return ele;
          });
          console.log(this.productList);
          this.isLoadingComplete = false;
          this.getAllWishListBasedOnUser();

        },
        (err) => {
          this.isLoadingComplete = false;
          this.snackBar.open(err?.message, 'ERROR', { duration: 5000 });
        }
      );
  }

  public addToCart(product:any) {
    this.isLoadingComplete = true;
    let reqData = {
      'userName':this.commonService.userInfo?.email,
      'productId':product?.id+''
    };
    this.customerService.productAddToCart(reqData).subscribe(
      (res: any) => {
        let data = res;
        this.isLoadingComplete = false;
        this.snackBar.open(data?.message, 'Close', { duration: 5000 });
      },
      (err:any) => {
        this.isLoadingComplete = false;
        // this.snackBar.open(err?.message, 'ERROR', { duration: 5000 });
      }
    );
  }

  public goToOrders(){
    this.router.navigate(['/customer/order-details']);
  }

  public addToFavorite(product:any,isExist:boolean,index:any){
    if(isExist){
      this.isLoadingComplete = true;
      this.customerService.deleteWishList(product?.wishListId).subscribe((res:any)=>{
        this.isLoadingComplete = false;
      },(err)=>{
        this.productList[index].isAddFav = false;
        this.isLoadingComplete = false;
      })
      return;
    }else{
      this.isLoadingComplete = true;
      this.customerService.addProductToFav(this.commonService.userInfo?.email,product?.id+'').subscribe((res:any)=>{
        this.isLoadingComplete = false;
        this.getAllWishListBasedOnUser();
      },(err)=>{
        this.getAllWishListBasedOnUser();
        this.isLoadingComplete = false;
      })
    }

  }

  public getAllWishListBasedOnUser(){
    this.isLoadingComplete = true;
    this.customerService.getAllWishList(this.commonService.userInfo?.email).subscribe((res:any)=>{
      this.isLoadingComplete = false;
      this.wishList = res;
      console.log(res);
      this.checkAddFavExists();
    },()=>{
      this.checkAddFavExists();
      this.isLoadingComplete = false;
    })
  }

  public checkAddFavExists(){
    this.wishList.forEach(ele1 => {
      this.productList.forEach(item2 => {
        if (Number(ele1.productId) === item2.id) {
          item2.isAddFav = true;
          item2.wishListId = ele1.id;
        }
      });
    });
  }
}
