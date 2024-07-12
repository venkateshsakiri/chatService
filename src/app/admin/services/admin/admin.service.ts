import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

const BASIC_URL = 'http://localhost:8080/';
@Injectable({
  providedIn: 'root'
})
export class AdminService {

  public editCoupon:any;

  constructor(public http:HttpClient) { }

  addCategory(category:any){
    return this.http.post(BASIC_URL+'api/admin/category',category);
  }

  getCategories(){
    return this.http.get(BASIC_URL+'api/admin/category');
  }

  addProduct(product:any){
    const headers = new HttpHeaders();
    headers.append('Content-Type', 'multipart/form-data');
    return this.http.post(BASIC_URL+'api/admin/product',product);
  }

  getProducts(){
    return this.http.get(BASIC_URL+'api/admin/products');
  }

  getAllOrders(){
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });
    return this.http.get(BASIC_URL+`api/admin/orders`,{headers:headers});
  }

  updateStatus(status:any,order:any){
    let reqData = {
      "id": order?.id,
      "productId": order?.productId,
      "addressId": order?.addressId,
      "quantity": order?.quantity,
      "price": order?.price,
      "email": order?.email,
      "status": status
    }
    return this.http.put(BASIC_URL+`api/admin/orders`,reqData);
  }

  postCoupon(reqData:any,isEdit:any){
    if(isEdit){
      return this.http.put(BASIC_URL+`api/admin/edit-coupon`,reqData);
    }else{
      return this.http.post(BASIC_URL+`api/admin/coupon`,reqData);
    }
  }

  getAllCoupons(){
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });
    return this.http.get(BASIC_URL+`api/admin/coupon`,{headers:headers});
  }

  deleteCoupon(id:any){
    return this.http.delete(BASIC_URL+`api/admin/coupon/${id}`);
  }
}
