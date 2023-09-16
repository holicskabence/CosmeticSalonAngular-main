import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
    providedIn: 'root'
})
export class ApiService {

    router: Router

    constructor(router: Router) {
        this.router = router
    }

    public isLoggedIn(): boolean {
        let token = localStorage.getItem('BookingApp-token');
        let expiration = localStorage.getItem('BookingApp-token-expiration');
      
        if (token && expiration) {
            let expirationDate = new Date(expiration);
            let currentDate = new Date();
      
          if (currentDate > expirationDate) {
            this.router.navigate(['/logout'])
            return false;
          }
        }
      
        return token !== null;
      }

    public canActivate() : boolean {
        if (!this.isLoggedIn()) {
            this.router.navigate(['/login'])
            return false
        }
        return true
    }
}
