import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {TokenStorageService} from "../token-storage/token-storage.service";
import {User} from "../../main-app/homepage-admin/user/user.service";
import {environment} from "../../../environments/environment";
import {Observable} from "rxjs";
import {Router} from "@angular/router";

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  url = environment.apiUrl
  loginApi =  environment.apiEndpoints.login

  constructor(private http: HttpClient,
              private tokenStorage: TokenStorageService,
              private router: Router) { }

  public findAccount(email: string | null | undefined, password: string | null | undefined): Observable<User>{
    const findAccountApi = environment.apiEndpoints.findAccount;
    return this.http.post<User>(this.url + findAccountApi, {
      email, password
    })
  }

  public findEmail(email: string | null | undefined): Observable<any>{
    const findEmail = environment.apiEndpoints.findEmail;
    return this.http.get<any>(this.url + findEmail + email)
  }

  public login(email: string | null | undefined, password: string | null | undefined, rememberMe: boolean | null | undefined): Observable<any> {
    return this.http.post<any>(this.url + this.loginApi, {
      email,
      password,
      rememberMe
    });
  }

  public handleLogin(data: User): void {
    this.tokenStorage.saveToken(data.token);
    this.tokenStorage.saveUser(data);
    this.tokenStorage.login(true);
    console.log(data.role);
    if(data.role === 'ADMIN'){
      this.router.navigate(['/homepage-admin']);
    } else if(data.role === 'DISTRIBUITOR') {
      this.router.navigate(['/homepage-distribuitor']);
    } else if(data.role === 'CLIENT') {
      this.router.navigate(['/homepage-client']);
    } else {
      this.router.navigate(['/page-not-found']);
    }
  }
}
