import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, map, throwError } from 'rxjs';

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

  public getAllProductsByCategoryName(category:string){
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });
    return this.http.get(BASE_URL+`api/admin/products/${category}`,{headers:headers});
  }

  public productAddToCart(product:any){
    return this.http.post(BASE_URL+`api/customer/addcart`,product);
  }

  public getAllCartItems(userName:string){
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });
    return this.http.get(BASE_URL+`api/customer/cart-items/${userName}`,{headers:headers});
  }

  public deleteCart(id:any){
    return this.http.delete(BASE_URL+`api/customer/cart/${id}`);
  }
  private handleError(error: HttpErrorResponse) {
    // Handle different error scenarios here
    if (error.error instanceof ErrorEvent) {
      // A client-side or network error occurred.
      console.error('An error occurred:', error.error.message);
    } else {
      // The backend returned an unsuccessful response code.
      console.error(`Backend returned code ${error.status}, body was: ${error.error}`);
    }
    // Return an observable with a user-facing error message
    return throwError('Something bad happened; please try again later.');
  }
}

