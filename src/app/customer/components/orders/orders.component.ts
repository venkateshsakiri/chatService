import { Component, OnInit } from '@angular/core';
import { CustomerProductService } from '../../services/product/customer-product.service';
import { CommonService } from 'src/app/service/common/common.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { ReviewPopupComponent } from '../review-popup/review-popup.component';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.scss']
})
export class OrdersComponent implements OnInit {
  public ordersList:any;
  public dataSource:any;
  public isLoading:boolean = false;
  constructor(public customerService:CustomerProductService,public commonService:CommonService,public dialog:MatDialog) { }

  ngOnInit(): void {
    this.getAllOrdersList();
  }
  displayedColumns: string[] = ['position', 'img', 'description', 'quantity','price','address','status'];

  public applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  public getAllOrdersList(){
    this.isLoading = true;
    this.customerService.getAllOrders(this.commonService.userInfo?.email).subscribe((res:any)=>{
      this.isLoading = false;
      this.ordersList = res?.products;
      this.ordersList.map((ele:any)=>{
        ele.imageBase64 = 'data:image/jpeg;base64,' + ele?.product?.img;
        ele.description =  ele?.product?.description;
        ele.address = ele?.address?.name+', '+ele?.address?.address+', '+ele?.address?.city+', '+ele?.address?.state+', '+ele?.address?.pincode+', '+ele?.address?.phoneNumber;
        return ele;
      })
      this.dataSource = new MatTableDataSource(this.ordersList);
      console.log(res)
    },(err:any)=>{
      this.isLoading = false;
    })
  }

  public openReviewPopup(row:any){
    let dialog = this.dialog.open(ReviewPopupComponent,{
      width:'40%',
      height:'50%',
      data:{data : row}
    })
  }

}
