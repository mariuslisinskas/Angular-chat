import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { AuthService } from '../auth/auth.service';
import { ChatMessage } from '../models/chatmessage.model';

@Injectable({
  providedIn: 'root'
})
export class MessagesService {

  constructor(private authservice:AuthService, private http:HttpClient) { }


  getMessages(){
      return this.http.get<{[key:string]:ChatMessage}>("https://chat-e9d95-default-rtdb.europe-west1.firebasedatabase.app/messages.json")
      .pipe(map((responseData)=>{
          const messages:ChatMessage[]=[];
          for(const key in responseData){
              messages.push({...responseData[key], id:key})
          }
          return messages;
      }));

    }

  postMessage(text:string){
        const message=new ChatMessage(this.authservice.user.email, this.authservice.user.id, text) 
    
        return this.http.post<{name:string}>("https://chat-e9d95-default-rtdb.europe-west1.firebasedatabase.app/messages.json", message, 
        {
            params:new HttpParams().set('auth', this.authservice.user.token)
        });
    }
}
