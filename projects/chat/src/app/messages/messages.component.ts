import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnDestroy,
  OnInit,
  Output,
  SimpleChanges,
} from '@angular/core';
import { ChatService } from '../service/chat/chat.service';
import { CommonService } from 'src/app/service/common/common.service';
import TimeAgo from 'javascript-time-ago';
import en from 'javascript-time-ago/locale/en';
import { webSocket } from 'rxjs/webSocket';
import { WebSocketService } from '../service/web-socket.service';

TimeAgo.addDefaultLocale(en)

@Component({
  selector: 'app-messages',
  templateUrl: './messages.component.html',
  styleUrls: ['./messages.component.scss'],
})
export class MessagesComponent implements OnInit, OnChanges , OnDestroy{
  @Input() userInfo: any;
  @Output() updatedRecentChat = new EventEmitter();
  @Input() userList:any;
  @Input() recentChatList:any;

  subjectWeb = webSocket('ws:localhost://8080/chat');

  public isProgress = false;
  public currentChatUser:any;
  public allMessages: any;
  public messageContent:string = '';
  public timeAgo:any;
  public updateNormaTime = new Date();

  constructor(
    public chatService: ChatService,
    public commonService: CommonService,
    public webSocketService:WebSocketService
  ) {
    this.timeAgo = new TimeAgo('en-US');

  }


  ngOnInit(): void {
    // this.updateTheRecentChatUsers();
    this.webSocketService.openWebSocket();
  }

  ngOnDestroy(): void {
    this.webSocketService.closeWebSocket();
  }

  ngOnChanges(): void {
    this.userInfo ? this.getChatsBetweenUsers() : '';
    (this.recentChatList && this.userList)? this.updateTheRecentChatUsers() : '';

  }

  getChatsBetweenUsers() {
    this.isProgress = true;
    this.allMessages = [];
    this.chatService
      .getAllChatBetweenUsers(
        this.commonService?.userInfo?.email,
        this.userInfo
      )
      .subscribe((res: any) => {
        this.allMessages = this.addNamesBasedOnTheMail(res);
        this.isProgress = false;
      });
  }

  addNamesBasedOnTheMail(chat: any) {
    chat.forEach((obj) => {
      let match = this.commonService?.allUser.find((item) => (item.email === obj.senderEmail));
      let match1 = this.commonService?.allUser.find((item) => (item.email === obj.receiverEmail));
      if (match) {
        obj.senderName = match.name;
      }
      if(match1){
        obj.receiverName = match1.name;
      }
    });
    return chat;
  }

  sendMessage(){
    let reqData = {
      senderEmail:this.commonService?.userInfo?.email,
      receiverEmail:this.userInfo,
      replymessage:this.messageContent
    }
    this.chatService.sendMessageToOthers(this.commonService?.userInfo?.email,this.userInfo,this.messageContent).subscribe((res:any)=>{
      this.messageContent = '';
      this.getChatsBetweenUsers();
      this.updatedRecentChat.emit(this.userInfo);
    },()=>{

    })
  }

  goToChat(eve:any){
    this.userInfo = eve?.email;
    if((eve.email !== this.currentChatUser?.email) || !this.currentChatUser){
      this.getChatsBetweenUsers();
    }
    this.currentChatUser = eve;
  }


  updateTheRecentChatUsers(){
    let obj = this.recentChatList;
    this.recentChatList = [];
    this.userList.forEach(element => {
      if(obj.includes(element.email)){
        this.recentChatList.push(element);
      }
    });
    console.log(this.recentChatList)
  }


  updateTimeAgoObj(date:any){
    let obj1 = new Date(date);
    return this.timeAgo.format(obj1);
  }
}
