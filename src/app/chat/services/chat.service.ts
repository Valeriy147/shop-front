import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Socket  } from 'ngx-socket-io';
import { IMessage } from '../interfaces/chat.interfaces';


@Injectable({
  providedIn: 'root'
})
export class ChatService {

  constructor(private socket: Socket, private _http: HttpClient) {
   }

  sendMessage(name: string, email: string, message: string): void {
    const mess: IMessage = {name, email, message};
    this.socket.emit('message', mess );
  }

  onMessageReceived(): Observable<IMessage> {
    return this.socket.fromEvent<IMessage>('message');
  }

  getAllMessages(): Observable<IMessage[]>{
    const url = `api/chat`;
    return this._http.get<IMessage[]>(url);
  }

  deleteAllMessages(): Observable<number>{
    const url = `api/chat`;
    return this._http.delete<number>(url);
  }
}
