import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
const BASE_URL = 'http://localhost:8080/';
@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(public http:HttpClient) { }

  getAllUsersList(){
    return this.http.get(BASE_URL+'api/users');
  }
}
