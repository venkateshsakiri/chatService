import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

const BASIC_URL = 'http://localhost:8080/';
@Injectable({
  providedIn: 'root'
})
export class AdminService {

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
    return this.http.post(BASIC_URL+'api/admin/product',product,{ headers: headers });
  }

  getProducts(product:any){
    return this.http.get(BASIC_URL+'api/admin/products');
  }
}
