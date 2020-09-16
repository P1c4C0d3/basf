import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Session } from 'protractor';
import { threadId } from 'worker_threads';
import { Message } from '../models/message.model';
import { UserType } from '../models/user-type.enum';
import { ChatService} from '../services/chat.service';

@Component({
  selector: 'app-chat-box',
  templateUrl: './chat-box.component.html',
  styleUrls: ['./chat-box.component.css']
})
export class ChatBoxComponent implements OnInit {

  public session: string;
  public message: string;
  public messageList: Array<Message>;
  public UserType = UserType;
  

  constructor(private service: ChatService) { }

  @ViewChild('scrollMe') private myScrollContainer: ElementRef;
  
  ngOnInit(): void {
    this.messageList = new Array<Message>();
    this.service.startSession().subscribe((data: any) => {
      this.session = data.session_id;
      this.service.sendInput(this.session,"").subscribe(answer=>this.addMessageToList(answer));
      this.scrollToBottom();  
    });
  }

    ngAfterViewChecked() {        
        this.scrollToBottom();        
    } 

    scrollToBottom(): void {
        try {
            this.myScrollContainer.nativeElement.scrollTop = this.myScrollContainer.nativeElement.scrollHeight;
        } catch(err) { }                 
    }

  public addMessageToList(message: Message){
    this.messageList.push(message);
  }

  public sendLogic(){
      let userMessage = new Message();
      userMessage.text= this.message;
      userMessage.user= UserType.User;
      this.addMessageToList(userMessage);
      this.message = "";
      this.service.sendInput(this.session, userMessage.text).subscribe(answer => {
      this.addMessageToList(answer);
    })
  }

  handleKeyUp(e){
    if(e.keyCode === 13){
       this.sendLogic();
    }
 }
}
