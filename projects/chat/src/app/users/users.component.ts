import { Component, OnInit } from '@angular/core';
import { UserService } from '../service/user/user.service';
import { ChatService } from '../service/chat/chat.service';
import { CommonService } from 'src/app/service/common/common.service';

interface Message {
  sender: string;
  content: string;
}

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss'],
})
export class UsersComponent implements OnInit {
  public userList: any;
  public recentChatList: any;
  public isLoader: boolean = false;
  public userInfo: any;
  public userEmail:string;
  constructor(
    public userService: UserService,
    public chatService: ChatService,
    public commonService: CommonService
  ) {
    this.userInfo = this.commonService.userInfo;
    this.userEmail = '';
    this.commonService.currentPage = 'chat';
  }

  ngOnInit(): void {
    this.getAllUsers();
    this.getAllRecentChats();
  }

  getAllUsers() {
    this.isLoader = true;
    this.userService.getAllUsersList().subscribe(
      (res: any) => {
        this.isLoader = false;
        // this.userList = res?.allUsers.array.forEach(element => element.email !== this.commonService.userInfo?.email);
        this.userList = res?.allUsers;
        this.commonService.allUser = this.userList;
      },
      () => {
        this.isLoader = false;
      }
    );
  }

  getAllRecentChats(isLoading?:any) {
    this.isLoader = isLoading ? false : true;
    this.chatService.getAllRecentChatList().subscribe(
      (res: any) => {
        console.log(res)
        let uniqueEmails = new Set();
        res.forEach((message) => {
          uniqueEmails.add(message.senderEmail);
          uniqueEmails.add(message.receiverEmail);
        });
        let uniqueEmailList = Array.from(uniqueEmails);
        let filteredArray = uniqueEmailList.filter(item => item !== this.userInfo?.email);
        this.isLoader = isLoading ? false : false;
        this.recentChatList = filteredArray;
      },
      () => {
        this.isLoader = isLoading ? false : false;
      }
    );
  }

  initiatedChat(user:any,type:any){
    if(type === 'recent'){
      this.userEmail = user;
    }else{
      this.userEmail = user?.email;
    }
  }

  updateRecentChatUsers(event:any){
    if(!this.recentChatList.includes(event)){
      this.getAllRecentChats(true);
    }

  }
}
