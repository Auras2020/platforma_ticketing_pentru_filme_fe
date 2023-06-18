import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {environment} from "../../../../environments/environment";
import {Theatre} from "../theatres/theatres.service";
export interface User{
  name: string;
  age: number;
  email: string;
  password: string;
  token: string;
  role: string;
  createdDate: Date;
  theatre: Theatre;
  pending: boolean;
}

export interface UserFilters{
  name: string;
  email: string;
  role: string;
  ageInterval: string;
  searchString: string;
}

export class UserFilteredPage{
  dto: UserFilters = {name:'', email:'', role:'', ageInterval: '', searchString:''};
  page?: number;
  size?: number;
}

export interface UserPage{
  users: User[];
  currentPage: number;
  totalItems: number;
  totalPages: number;
}

export class UserP {
  page?: number;
  size?: number;
}

export interface AdminUsers {
  userFilterDto: UserFilters;
  dto: UserP;
}

export interface UserPResponse {
  users: User[];
  totalItems: number;
}

@Injectable({
  providedIn: 'root'
})
export class UserService {

  url = environment.apiUrl
  users =  environment.apiEndpoints.users
  activeUserPage = environment.apiEndpoints.activeUserPage
  activeUserPageFilter = environment.apiEndpoints.activeUserPageFilter

  constructor(private http: HttpClient) { }

  createUser(user: any): Observable<User> {
    return this.http.put<User>(this.url + this.users, user)
  }

  deleteUser(email: string | undefined): Observable<null> {
    return this.http.delete<null>(this.url + this.users + email)
  }

  getAllActiveAccounts(userP: any): Observable<UserPResponse>{
    return this.http.post<UserPResponse>(this.url + this.activeUserPage, userP);
  }

  getAllFilteredActiveAccounts(adminUsers: any): Observable<UserPResponse>{
    return this.http.post<UserPResponse>(this.url + this.activeUserPageFilter, adminUsers);
  }

  getUserByEmail(email: any): Observable<User>{
    return this.http.get<User>(this.url + this.users + email);
  }
}
