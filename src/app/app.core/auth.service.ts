import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';



@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(private router: Router) { }

  isAuthenticated(): boolean {
    const helper = new JwtHelperService();
    const token = localStorage.getItem('authorization');
    try {
      return !helper.isTokenExpired(token);
    } catch (ex) {
      return false;
    }
  }

  isValidToken(token: string) {
    const helper = new JwtHelperService();
    try {
      return !helper.isTokenExpired(token);
    } catch (ex) {
      return false;
    }
  }

  decodeToken(): any {
    const helper = new JwtHelperService();
    const token = localStorage.getItem('authorization');
    if (!token) {
      return null;
    }
    return helper.decodeToken(token);
  }

  logOut() {
    localStorage.clear();
    this.router.navigate(['']);
  }

  getCurrentSub(): string {
    const user: any = this.decodeToken();
    return user.sub;
  }

}
