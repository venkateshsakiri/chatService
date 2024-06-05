import { Component, OnInit } from '@angular/core';
import { CustomerProductService } from '../../services/product/customer-product.service';
import { CommonService } from 'src/app/service/common/common.service';
import { MatTableDataSource } from '@angular/material/table';

export interface PeriodicElement {
  name: string;
  position: number;
  weight: number;
  symbol: string;
}

const ELEMENT_DATA: PeriodicElement[] = [
  {position: 1, name: 'Hydrogen', weight: 1.0079, symbol: 'H'},
  {position: 2, name: 'Helium', weight: 4.0026, symbol: 'He'},
  {position: 3, name: 'Lithium', weight: 6.941, symbol: 'Li'},
  {position: 4, name: 'Beryllium', weight: 9.0122, symbol: 'Be'},
  {position: 5, name: 'Boron', weight: 10.811, symbol: 'B'},
  {position: 6, name: 'Carbon', weight: 12.0107, symbol: 'C'},
  {position: 7, name: 'Nitrogen', weight: 14.0067, symbol: 'N'},
  {position: 8, name: 'Oxygen', weight: 15.9994, symbol: 'O'},
  {position: 9, name: 'Fluorine', weight: 18.9984, symbol: 'F'},
  {position: 10, name: 'Neon', weight: 20.1797, symbol: 'Ne'},
];

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.scss']
})
export class OrdersComponent implements OnInit {
  public ordersList:any;
  public dataSource:any;
  public isLoading:boolean = false;
  constructor(public customerService:CustomerProductService,public commonService:CommonService) { }

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


}
