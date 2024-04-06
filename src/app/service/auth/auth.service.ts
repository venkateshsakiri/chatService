import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { CommonService } from '../common/common.service';

const BASIC_URL = 'http://localhost:8080/';
@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(public http: HttpClient,public commonService:CommonService) {}

  public isLogin(){
    if(this.commonService.userInfo){
      return true;
    }else{
      return false;
    }
  }

  register(req: any): Observable<any> {
    let reqData = {
      name: req.name,
      email: req.email,
      password: req.password,
    };
    if (environment.isChat) {
      return this.http.post(BASIC_URL + 'api/create', reqData, {
        responseType: 'text',
      });
    } else {
      return this.http.post(BASIC_URL + 'sign-up', req);
    }
  }

  login(req:any){
    let reqData = {
      name: "",
      email: req.email,
      password: req.password,
    };
    if (environment.isChat) {
      return this.http.post(BASIC_URL + 'api/login', reqData, {
        responseType: 'text',
      });
    } else {
      return this.http.post(BASIC_URL + 'sign-up', req);
    }
  }
}
