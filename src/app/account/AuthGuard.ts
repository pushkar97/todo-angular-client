import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { UsersService } from './users.service';

@Injectable({
    providedIn: 'root'
  })
export class AuthGuard implements CanActivate {

    isLoggedIn = false;

    constructor(private userService: UsersService,
                private router: Router) {
    }
    canActivate(route: ActivatedRouteSnapshot
            ,   state: RouterStateSnapshot): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
        if (this.userService.currentUser){
            return true;
        }
        this.router.navigate(['/login'], {queryParams: {returnUrl: state.url}});
        return false;
    }

}
