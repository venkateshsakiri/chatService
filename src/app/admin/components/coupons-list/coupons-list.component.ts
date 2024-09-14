import { Component, OnInit } from '@angular/core';
import { AdminService } from '../../services/admin/admin.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { PostCouponsComponent } from '../post-coupons/post-coupons.component';
import { MatSnackBar } from '@angular/material/snack-bar';


@Component({
  selector: 'app-coupons-list',
  templateUrl: './coupons-list.component.html',
  styleUrls: ['./coupons-list.component.scss']
})
export class CouponsListComponent implements OnInit {
  public couponList:any = [];
  public isLoadingComplete:boolean = false;
  displayedColumns: string[] = ['position', 'name', 'code', 'discount','exipryDate','actions'];
  dataSource = new MatTableDataSource();
  selectedRow:any;

  constructor(public adminService:AdminService,public dialog:MatDialog,public snackBar:MatSnackBar) { }

  ngOnInit(): void {
    this.getAllCoupons();
  }


  public getAllCoupons(){
    this.isLoadingComplete = true;
    this.adminService.getAllCoupons().subscribe((res:any)=>{
      this.isLoadingComplete = false;
      if(!this.adminService.editCoupon){
        // this.snackBar.open("All coupons fetched successfully!", 'Close',{duration:5000});
      }
      this.couponList = res;
      this.dataSource = new MatTableDataSource(this.couponList);
      console.log(this.couponList)
    },(err)=>{
      this.isLoadingComplete = false;
      this.snackBar.open(err?.message, 'Error',{duration:5000})
    })
  }


  public openDeletePopup(templeRef:any,row:any){
    this.selectedRow = row;
    let temple = this.dialog.open(templeRef,{
      width:'40%',
      height:'35%'
    })
  }

  public deleteCoupon(){
    this.isLoadingComplete = true;
    this.adminService.deleteCoupon(this.selectedRow?.id).subscribe((res:any)=>{
      this.isLoadingComplete = false;
      this.getAllCoupons();
    },()=>{
      this.isLoadingComplete = false;
    })
  }

  public openEditPopup(row:any){
    this.adminService.editCoupon = row;
    let template = this.dialog.open(PostCouponsComponent,{
      width:'50%',
      height:'60%'
    })
    this.dialog._getAfterAllClosed().subscribe((res:any)=>{
      this.getAllCoupons();
    })
  }

}
