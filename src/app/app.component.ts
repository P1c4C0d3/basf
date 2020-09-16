import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ChatBoxComponent } from './chat-box/chat-box.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'SolucionChatbox';

  constructor (public matDialog: MatDialog){}

  ngOnInit(): void {
    this.matDialog.open(ChatBoxComponent);
  }
}
