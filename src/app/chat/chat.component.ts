import { Component, OnInit, inject } from '@angular/core';
import { ChatService } from './services/chat.service';
import { SharedModule } from 'src/app/shared/shared.module';
import { CommonModule } from '@angular/common';
import { getUserData } from '../core/get-user-data.constant';
import { IMessage } from './interfaces/chat.interfaces';

@Component({
  standalone: true,
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss'],
  imports: [SharedModule, CommonModule]
})
export class ChatComponent implements OnInit {
  public message!: string;
  public messages: IMessage[] = [];

  constructor(private chatService: ChatService) { }

  ngOnInit(): void {
    this.chatService.onMessageReceived().subscribe(data => {
      this.handleNewMessage(data);
    });
    this.chatService.getAllMessages().subscribe((data) =>
      this.messages = data
    );
  }

  public handleSubmitNewMessage(): void {
    if (this.message) {
      let name = ''
      localStorage.getItem('name') ? name = localStorage.getItem('name')! : name = getUserData().name;
      this.chatService.sendMessage(name, getUserData().email, this.message);
      this.message = '';
    };
  }

  public handleNewMessage(message: IMessage): void {
    this.messages.push(message);
  }

  deleteMess(){
    this.chatService.deleteAllMessages().subscribe((data)=>
      data ? this.messages = [] : ''
    )
  }
}
