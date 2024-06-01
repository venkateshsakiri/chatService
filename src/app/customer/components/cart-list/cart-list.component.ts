import { Component, OnInit } from '@angular/core';
import { CustomerProductService } from '../../services/product/customer-product.service';
import { CommonService } from 'src/app/service/common/common.service';

@Component({
  selector: 'app-cart-list',
  templateUrl: './cart-list.component.html',
  styleUrls: ['./cart-list.component.scss']
})
export class CartListComponent implements OnInit {

  constructor(public customerService:CustomerProductService,public commonService:CommonService) { }

  ngOnInit(): void {
    this.customerService.getAllCartItems(this.commonService.userInfo?.email).subscribe((res:any)=>{
      console.log(res)
    })
  }

}
