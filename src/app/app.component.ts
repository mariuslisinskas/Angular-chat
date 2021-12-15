import { Component, OnInit } from '@angular/core';
import { AuthService } from './auth/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'chat';

  constructor(private authservice:AuthService){

  }

  ngOnInit(){
    this.authservice.savedLogin();
  }
}
