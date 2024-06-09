import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { AdminService } from '../../services/admin/admin.service';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.scss']
})
export class OrdersComponent implements OnInit {

  public orderList:any=[];
  public isLoading:boolean = false;
  public dataSource = new MatTableDataSource();
  public displayedColumns: string[] = ['position', 'categoryName', 'productName', 'userName','address','quantity','price','status','actions'];
  constructor(public adminService:AdminService) { }

  ngOnInit(): void {
    this.getAllOrders();
  }
  public getAllOrders(){
    this.isLoading = true;
    this.adminService.getAllOrders().subscribe((res:any)=>{
      this.isLoading = false;
      this.orderList = res?.DATA;
      this.orderList.map((ele:any)=>{
        ele.imageBase64 = 'data:image/jpeg;base64,' + ele?.product?.img;
        ele.address1 = ele?.address?.name+', '+ele?.address?.address+', '+ele?.address?.city+', '+ele?.address?.state+', '+ele?.address?.pincode+', '+ele?.address?.phoneNumber;
        return ele;
      })
      this.dataSource = new MatTableDataSource(this.orderList);
    },()=>{
      this.isLoading = false;
    })
  }

  public updateStatus(status:string,id:any){
    this.isLoading = true;
    this.adminService.updateStatus(status,id).subscribe((res:any)=>{
      this.isLoading = false;
      this.getAllOrders();
    },()=>{
      this.getAllOrders();
      this.isLoading = false;
    })
  }

}
