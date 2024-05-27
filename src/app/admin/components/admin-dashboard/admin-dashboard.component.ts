import { Component, OnInit } from '@angular/core';
import { CommonService } from 'src/app/service/common/common.service';
import { AdminService } from '../../services/admin/admin.service';

@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.scss']
})
export class AdminDashboardComponent implements OnInit {

  constructor(public commonService:CommonService,public adminService:AdminService) {
    this.commonService.currentPage = 'ecom-dashboard';
  }

  ngOnInit(): void {
  }

}
