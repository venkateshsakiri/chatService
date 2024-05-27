import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

const BASE_URL= 'http://localhost:8080/';
@Injectable({
  providedIn: 'root'
})
export class CustomerProductService {

  constructor(public http:HttpClient) { }

  public getAllProducts(){
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });
    return this.http.get(BASE_URL+'api/admin/products',{headers:headers});
  }

  public getAllCategories(){
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });
    return this.http.get(BASE_URL+'api/admin/category',{headers:headers});
  }
}