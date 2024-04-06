import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CommonService {

  public userInfo;
  public allUser:any;

  constructor() { }

  public isAdmin(){
    if(this.userInfo?.UserRole === 'ADMIN'){
      return true;
    }
    return false;
  }

  public isCustomerLogin(){
    if(this.userInfo?.UserRole === 'CUSTOMER'){
      return true;
    }
    return false;
  }
}
