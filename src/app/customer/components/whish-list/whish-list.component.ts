import { Component, OnInit } from '@angular/core';
import { CustomerProductService } from '../../services/product/customer-product.service';
import { CommonService } from 'src/app/service/common/common.service';

@Component({
  selector: 'app-whish-list',
  templateUrl: './whish-list.component.html',
  styleUrls: ['./whish-list.component.scss']
})
export class WhishListComponent implements OnInit {
  public wishList:any=[];
  public isLoadingComplete:boolean = false;

  constructor(public customerService:CustomerProductService,public commonService:CommonService) { }

  ngOnInit(): void {
    this.getWishList();
  }

  public getWishList(){
    this.isLoadingComplete = true;
    this.customerService.getAllWishList(this.commonService.userInfo?.email).subscribe((res:any)=>{
      this.isLoadingComplete = false;
      res?.forEach((element:any) => {
        let data:any;
      (this.getProductById(Number(element?.productId)))

      });
      console.log(this.wishList)
    })
  }

  public getProductById(id:any){
    this.customerService.getProductById(id).subscribe((res:any)=>{
      this.wishList.push(res);
      this.wishList.map((ele: any) => {
        ele.imageBase64 = 'data:image/jpeg;base64,' + ele.img;
        return ele;
      });
    })
  }

  public deleteWishListItem(templateRef:any,row:any){

  }
  public deleteList(){

  }

}
