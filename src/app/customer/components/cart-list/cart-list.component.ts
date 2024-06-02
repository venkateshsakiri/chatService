import { Component, OnInit } from '@angular/core';
import { CustomerProductService } from '../../services/product/customer-product.service';
import { CommonService } from 'src/app/service/common/common.service';
import {
  calculateDecreaseAmount,
  calculateIncreaseAmount,
  calculateTotalAmount,
} from 'src/app/utility/common';
import { MatSnackBar } from '@angular/material/snack-bar';
import { DatePipe } from '@angular/common';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-cart-list',
  templateUrl: './cart-list.component.html',
  styleUrls: ['./cart-list.component.scss'],
  providers: [DatePipe],
})
export class CartListComponent implements OnInit {
  public cartList: any;
  public isLoadingComplete: boolean = false;
  public cartResponse: any;
  public totalAmount: any;
  public cartIds: any;
  public discountAmount: number = 200;
  public packingCharges: number = 99;
  public priceOfItems: number = 0;
  public deliveryDate: any;
  public deleteProductId: any;
  constructor(
    public customerService: CustomerProductService,
    public commonService: CommonService,
    public snackBar: MatSnackBar,
    private datePipe: DatePipe,
    public dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.getAllCartList();
    const result = new Date(new Date());
    this.deliveryDate = result.setDate(result.getDate() + 6);
  }

  public getAllCartList() {
    this.isLoadingComplete = true;
    this.customerService
      .getAllCartItems(this.commonService.userInfo?.email)
      .subscribe(
        (res: any) => {
          this.isLoadingComplete = false;
          this.cartResponse = res;
          this.cartIds = res?.cartList;
          this.cartList = res?.products;
          this.cartList.map((ele: any) => {
            ele.imageBase64 = 'data:image/jpeg;base64,' + ele.img;
            ele.updatedQuantity = 1;
            return ele;
          });
          this.calculateAmount();
        },
        (err: any) => {
          this.isLoadingComplete = false;
        }
      );
  }

  public calculateAmount() {
    let totalAmount = calculateTotalAmount(this.cartList);
    this.priceOfItems = totalAmount;
    this.totalAmount = totalAmount - this.discountAmount + this.packingCharges;
  }

  public deleteCartItem(tempRef: any, product: any) {
    this.deleteProductId = product?.id;
    let dialogRef = this.dialog.open(tempRef, {
      width: '30%',
    });
  }

  public deleteCart() {
    this.isLoadingComplete = true;
    let cart = this.cartIds.find(
      (ele: any) => ele.productId == this.deleteProductId
    );
    this.customerService.deleteCart(cart?.id).subscribe(
      (res: any) => {
        this.getAllCartList();
        this.isLoadingComplete = false;
        this.snackBar.open(res, 'Close', { duration: 5000 });
      },
      (err: any) => {
        this.getAllCartList();
        this.isLoadingComplete = false;
        // this.snackBar.open(err?.message, 'ERROR', { duration: 5000 });
      }
    );
  }

  public increaseItems(amount: any, index: any) {
    if (this.cartList[index].updatedQuantity == 6) {
      return;
    }
    this.cartList[index].updatedQuantity++;
    this.priceOfItems =
      this.totalAmount -
      this.packingCharges +
      this.discountAmount +
      Number(amount);
    this.totalAmount = calculateIncreaseAmount(
      this.totalAmount,
      Number(amount)
    );
  }

  public decreaseItems(amount: any, index: any) {
    if (this.cartList[index].updatedQuantity == 1) {
      return;
    }
    this.cartList[index].updatedQuantity--;
    this.priceOfItems =
      this.totalAmount -
      this.packingCharges +
      this.discountAmount -
      Number(amount);
    this.totalAmount = calculateDecreaseAmount(
      this.totalAmount,
      Number(amount)
    );
  }
}
