import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Message } from '../models/message.model';
import { UserType } from '../models/user-type.enum';


@Injectable({
  providedIn: 'root'
})
export class ChatService {

  private urlSession = "https://gateway-lon.watsonplatform.net/assistant/api/v2/assistants/62a85bcf-487e-4f42-a3bc-cea06fe818c3/sessions?version=2019-02-28";0
  private urlChat = "https://gateway-lon.watsonplatform.net/assistant/api/v2/assistants/";
  private assistant_id = "62a85bcf-487e-4f42-a3bc-cea06fe818c3"
  constructor(public httpClient: HttpClient) { }

  public startSession(){

   return this.httpClient.post(this.urlSession, {},{headers: new HttpHeaders({
    "Content-Type": "application/json",
    "Authorization": "Basic "+ btoa("apikey:efIGSPM2egVLwidwUGAqJaMafdj3fbkAhdcZ9z8Cg-Fc")
  })});
  }

  public sendInput( session_id: string, mensaje: string): Observable<Message>{

    return this.httpClient.post(
      this.urlChat+this.assistant_id+"/sessions/"+session_id+"/message?version=2019-02-28", 
      {"input": {"text": mensaje}},
      {headers: new HttpHeaders({
      "Content-Type": "application/json",
      "Authorization": "Basic "+ btoa("apikey:efIGSPM2egVLwidwUGAqJaMafdj3fbkAhdcZ9z8Cg-Fc")
    })}).pipe(map((data: any) => {
      let msg = new Message();
      msg.options = new Array<string>();
      msg.user = UserType.Bot;
      msg.text = data.output.generic[0].text;
      if (data.output.generic[1]==null){
      }else{
        data.output.generic[1].options.forEach(e => {
          msg.options.push(e.label);
        });
      }
      return msg;
    }));
  }


}