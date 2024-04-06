import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class WebSocketService {
  webSocket: WebSocket;
  constructor() { }

  public openWebSocket(){
    this.webSocket = new WebSocket('ws://localhost:8080/chat');


    this.webSocket.onopen = (event)=>{
      console.log('open',event);
    }

    this.webSocket.onmessage = (event)=>{
      console.log('msg',event);
    }

    this.webSocket.onclose = (event)=>{
      console.log('close',event);
    }


  }

  public sendMessagesToOthers(msg:any){
    this.webSocket.send(JSON.stringify(msg))
  }

  public closeWebSocket(){
    this.webSocket.close();
  }
}
