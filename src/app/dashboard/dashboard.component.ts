import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth/auth.service';
import { User } from '../auth/user.model';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

    user:User;

  constructor(private authservice:AuthService) { }

  ngOnInit(): void {
      this.user=this.authservice.user;
  }

  onLogout(){
      this.authservice.logout();
  }

}
