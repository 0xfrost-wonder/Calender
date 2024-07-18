import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LoginPersistanceService {

  constructor() { }

  persistLogin(user): void {
    localStorage.setItem('loggedInUser', JSON.stringify(user));
  }

  isUserLoggedIn() {
    return localStorage.getItem('loggedInUser');
  }

  removeLogin(): void {
    localStorage.removeItem('loggedInUser');
  }
}
