import { Component, OnInit } from '@angular/core';
import { CommonService } from './service/common/common.service';
import { Router } from '@angular/router';
import { animate, query, stagger, style, transition, trigger } from '@angular/animations';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  animations: [
    trigger('fadeInOut', [
      transition(':enter', [
        style({ 'height': '0px' }),
        animate(500, style({ height: '*' }))
      ]),
      transition(':leave', [
        style({ 'height': '*' }),
        animate(250, style({ height: '0px' }))
      ])
    ]),

    trigger('listAnimation', [
      transition('* => *', [

        query(':leave', [
          style({ opacity: 1 }),
          stagger(-50, [
            animate(50, style({ opacity: 0 }))
          ])
        ], { optional: true }),
        query(':enter', [
          style({ opacity: 0 }),
          stagger(100, [
            animate(400, style({ opacity: 1 }))
          ])
        ], { optional: true })
      ])
    ])
  ]
})
export class AppComponent implements OnInit {
  title = 'Ecommerce';
  public isChatApplication:boolean = false;
  public isAdminLogin: boolean;
  public profile:boolean = false;
  public isCustomerLogin: boolean;
  constructor(public commonService: CommonService, public router: Router) {}

  ngOnInit(): void {
    // this.router.events.subscribe((res:any)=>{
    //   this.isAdminLogin = this.commonService.isAdmin();
    //   this.isCustomerLogin = this.commonService.isCustomerLogin();
    // })
  }

  public goToProject(type: string) {
    this.isAdminLogin = this.commonService.isAdmin();
    this.isCustomerLogin = this.commonService.isCustomerLogin();
    if (type === 'ecom') {
      if (this.commonService.isAdmin()) {
        this.router.navigate(['/admin/dashboard']);
      } else if (this.commonService.isCustomerLogin()) {
        this.router.navigate(['/customer/dashboard']);
      }
      this.isChatApplication = false;
    } else if (type === 'chat') {
      this.isChatApplication = true;
      this.router.navigate(['/chat']);
    }
  }

  logOut() {
    this.commonService.userInfo = '';
    this.isAdminLogin = false;
    this.isCustomerLogin = false;
    this.isChatApplication = false;
    this.router.navigate(['/login']);
  }
}
