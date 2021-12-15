import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AuthService } from '../auth/auth.service';
import { User } from '../auth/user.model';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit, OnDestroy {

    private userSubscription:Subscription;

    public loggedIn=false;
    public user:User=null;

  constructor(private authservice:AuthService, private router:Router) { }

  ngOnInit(): void {
      this.userSubscription=this.authservice.userSub.subscribe((user:User)=>{
        if(user!=null){
            this.loggedIn=true;
            this.user=user;
        }else{
            this.loggedIn=false;
            this.user=null; 
        }
      });
  }

  ngOnDestroy():void{
    this.userSubscription.unsubscribe();
  }

  onLoginLogout(){
      if(this.loggedIn==true){
          this.authservice.logout();
      }else{
          this.router.navigate(['/auth'])
      }
  }

}
