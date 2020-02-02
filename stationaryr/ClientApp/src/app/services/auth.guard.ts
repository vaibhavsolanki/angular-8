import { Injectable, OnInit } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';

import { AuthenticationService } from './authentication.service';

@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate,OnInit {
  
    constructor(
        private router: Router,
        private authenticationService: AuthenticationService
  ) { }




  ngOnInit() {




  }
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
      
     
    const currentUser = "dd";//sthis.authenticationService.currentUserValue;
        if (currentUser) {
      
        
         
         
            // authorised so return true
            return true;
      }


      
        // not logged in so redirect to login page with the return url
       this.router.navigate(['/login'], { queryParams: { returnUrl: state.url } });
        return false;
  }

  
}
