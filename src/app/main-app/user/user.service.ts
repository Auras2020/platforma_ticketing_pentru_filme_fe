import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {environment} from "../../../environments/environment";

export interface User{
  name: string,
  age: number,
  email: string,
  password: string,
  token: string,
  role: string
}
@Injectable({
  providedIn: 'root'
})
export class UserService {

  url = environment.apiUrl
  users =  environment.apiEndpoints.users
  constructor(private http: HttpClient) { }

  createUser(user: any): Observable<User> {
    return this.http.put<User>(this.url + this.users, user)
  }

  updateUser(user: any) {
    return this.http.post<User>(this.url + this.users, user)
  }
}
