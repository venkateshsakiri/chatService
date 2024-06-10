import { Component, OnInit } from '@angular/core';
import { AdminService } from '../../services/admin/admin.service';

@Component({
  selector: 'app-coupons-list',
  templateUrl: './coupons-list.component.html',
  styleUrls: ['./coupons-list.component.scss']
})
export class CouponsListComponent implements OnInit {
  public couponList:any = [];
  public isLoadingComplete:boolean = false;
  constructor(public adminService:AdminService) { }

  ngOnInit(): void {
    this.getAllCoupons();
  }

  public getAllCoupons(){
    this.isLoadingComplete = true;
    this.adminService.getAllCoupons().subscribe((res:any)=>{
      this.isLoadingComplete = false;
      this.couponList = res;
      console.log(this.couponList)
    },()=>{
      this.isLoadingComplete = false;
    })
  }

}
