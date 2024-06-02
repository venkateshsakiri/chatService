import { Component, OnInit } from '@angular/core';
import { CustomerProductService } from '../../services/product/customer-product.service';
import { CommonService } from 'src/app/service/common/common.service';

@Component({
  selector: 'app-cart-list',
  templateUrl: './cart-list.component.html',
  styleUrls: ['./cart-list.component.scss']
})
export class CartListComponent implements OnInit {
  public cartList:any;
  public isLoadingComplete:boolean = false;
  public updatedQuantity:any = 1;
  constructor(public customerService:CustomerProductService,public commonService:CommonService) { }

  ngOnInit(): void {
    this.getAllCartList();
  }

  public getAllCartList(){
    this.isLoadingComplete = true;
    this.customerService.getAllCartItems(this.commonService.userInfo?.email).subscribe((res:any)=>{
      this.isLoadingComplete = false;
      this.cartList = res?.products;
      this.cartList.map((ele:any)=>{
        ele.imageBase64 = 'data:image/jpeg;base64,' + ele.img;
        return ele;
      })
      console.log(res)
    },(err:any)=>{
      this.isLoadingComplete = false;
    })
  }

}
