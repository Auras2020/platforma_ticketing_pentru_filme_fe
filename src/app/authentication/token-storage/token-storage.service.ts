import {Injectable} from '@angular/core';
import {BehaviorSubject} from "rxjs";
import {JwtHelperService} from '@auth0/angular-jwt';
import {Router} from "@angular/router";

const TOKEN_KEY = 'auth-token';
const USER_KEY = 'auth-user';

@Injectable({
  providedIn: 'root'
})
export class TokenStorageService {

  private loggedIn: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(this.getIsLoggedInStatus());

  constructor(private router: Router) { }

  /*reloadPage(): void {
    window.location.reload();
  }*/

  public signOut(): void {
    window.localStorage.clear();
    this.loggedIn.next(false);
    this.router.navigate(['/login']);
  }

  private getIsLoggedInStatus(): any {
    const jwtHelper = new JwtHelperService();
    const token = window.localStorage.getItem(TOKEN_KEY);
    return token ? !jwtHelper.isTokenExpired(token) : false;
  }

  get isLoggedIn(): any {
    return this.loggedIn.asObservable();
  }


  public login(isLoggedIn: boolean): void {
    if (isLoggedIn) {
      this.loggedIn.next(true);
    }
  }

  public saveToken(token: string): void {
    window.localStorage.removeItem(TOKEN_KEY);
    window.localStorage.setItem(TOKEN_KEY, token);
  }

  public getToken(): string | null {
    return window.localStorage.getItem(TOKEN_KEY);
  }

  public saveUser(user: any): void {
    window.localStorage.removeItem(USER_KEY);
    window.localStorage.setItem(USER_KEY, JSON.stringify(user));
  }

  public getUser(): any {
    const user = window.localStorage.getItem(USER_KEY);
    if (user) {
      return JSON.parse(user);
    }

    return null;
  }
}
