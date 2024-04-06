import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CommonService } from 'src/app/service/common/common.service';
import { webSocket, WebSocketSubject } from 'rxjs/webSocket';
const BASE_URL = 'http://localhost:8080/';

@Injectable({
  providedIn: 'root'
})
export class ChatService {

  constructor(public http:HttpClient,public commonService:CommonService) {

   }



  getAllRecentChatList(){
    return this.http.get(BASE_URL+'chat/get-recent-messages'+`?email=${this.commonService?.userInfo?.email}`);
  }

  getAllChatBetweenUsers(sender:any,receiver:any){
    let data = {
      'senderEmail':sender,
      'receiverEmail':receiver
    }
    return this.http.get(BASE_URL+'chat/findMessagesBetweenUsers'+`?senderEmail=${sender}&receiverEmail=${receiver}`);
  }

  sendMessageToOthers(sender:any,receiver:any,msg:any){
    let reqData = {
      senderEmail:sender,
      receiverEmail:receiver,
      replymessage:msg
    }
    return this.http.post(BASE_URL+'chat/create',reqData);
  }
}
