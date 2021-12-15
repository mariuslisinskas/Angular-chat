import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from "@angular/router";
import { AuthService } from "./auth.service";

@Injectable({providedIn:"root"})

export class AuthGuard implements CanActivate{


    constructor(private authservice:AuthService, private router:Router){

    }

    canActivate(
        route:ActivatedRouteSnapshot, 
        state:RouterStateSnapshot):boolean|UrlTree{
        if(this.authservice.user!=undefined) return true;

        return this.router.createUrlTree(['/auth'])
    }
}