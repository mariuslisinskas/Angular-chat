import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Subject } from 'rxjs';
import { tap } from 'rxjs/operators'
import { User } from './user.model';

export interface AuthResponse{
    idToken:string, //A Firebase Auth ID token for the newly created user.
    email:string,	//The email for the newly created user.
    refreshToken:string, 	//A Firebase Auth refresh token for the newly created user.
    expiresIn:string,	//The number of seconds in which the ID token expires.
    localId:string //The uid of the authenticated user.
    registered?:boolean	//Whether the email is for an existing account.
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {

    public user:User;

    //jei useris bus kaip subjektas prie kurio
    //subscibintu pvz navbar meniu kuris visad butu rodomas
    // public userSub=new Subject<User>();

    //kad headeris matytu kad esame prisijunge perkkrovus puslapi
    //gaus pradine issaugota reiksme is autologin-savedlogin
    public userSub = new BehaviorSubject<User>(null);


  constructor(private http:HttpClient, private router:Router) { 
    
  }

  private userAuth(response:AuthResponse){
       this.user=new User(
            response.email, 
            response.localId, 
            response.idToken, 
            new Date(new Date().getTime()+ +response.expiresIn*1000)
            );
            //pranesame kad useris subject prisijunge
            //ir tada galime pakeisti nemiu ziurint ar useris 
            //prisijunges ar ne
            this.userSub.next(this.user);

            localStorage.setItem('user', JSON.stringify(this.user));
  }

  signup(email:string, password:string){
    return this.http.post<AuthResponse>('https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyDBM80jkt7xvGSRTeIJL6kLaE865WrVCJc', {
        email:email,
        password:password,
        returnSecureToken:true
    }).pipe(tap((response)=>{
       this.userAuth(response);
    }));
  }

  login(email:string, password:string){
    return this.http.post<AuthResponse>('https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyDBM80jkt7xvGSRTeIJL6kLaE865WrVCJc', {
        email:email,
        password:password,
        returnSecureToken:true
    }).pipe(tap((response)=>{
        this.userAuth(response);
     }));
  }

  savedLogin(){
      const user=JSON.parse(localStorage.getItem('user'));
      if(!user) return;
      if(new Date(user.expires)<new Date()) return;
      this.user=new User(user.email, user.id, user.token, new Date(user.expires));
        this.userSub.next(this.user);
      this.router.navigate(['/']);
    }

    logout(){
        this.user=null;
        this.userSub.next(null);
        localStorage.removeItem('user');
        this.router.navigate(['/auth']);
    }


}
