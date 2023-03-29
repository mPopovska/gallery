import { Injectable } from '@angular/core';
import { Observable, from } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor() { }

  public login(username: string, password: string): Observable<any> {
    return from(fetch('https://dummyjson.com/auth/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({username, password})
    }));
  }

  public logout() {
    localStorage.removeItem('authToken');
  }

  public isAuthenticated() {
    if (localStorage.getItem('authToken')) {
      return true;
    }
    return false;
  }
}
