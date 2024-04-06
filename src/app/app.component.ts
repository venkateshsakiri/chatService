import { Component, OnInit } from '@angular/core';
import { CommonService } from './service/common/common.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  title = 'Ecommerce';
  public isAdminLogin:boolean;
  public isCustomerLogin:boolean;
  constructor(public commonService:CommonService,public router:Router){}

  ngOnInit(): void {
    this.router.events.subscribe((res:any)=>{
      this.isAdminLogin = this.commonService.isAdmin();
      this.isCustomerLogin = this.commonService.isCustomerLogin();
    })
  }


  logOut(){
    this.commonService.userInfo ='';
    this.isAdminLogin = false;
    this.isCustomerLogin = false;
    this.router.navigate(['/login']);
  }
}
