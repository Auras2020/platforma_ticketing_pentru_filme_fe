import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "../../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class LogoutService {

  url = environment.apiUrl
  logoutApi =  environment.apiEndpoints.logout

  constructor(private http: HttpClient) { }

  public logout(){
    return this.http.post<any>(this.url + this.logoutApi, null);
  }

}
