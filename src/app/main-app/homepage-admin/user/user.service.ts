import { Injectable } from '@angular/core';
import {HttpClient, HttpParams} from "@angular/common/http";
import {Observable} from "rxjs";
import {environment} from "../../../../environments/environment";

export interface User{
  name: string;
  age: number;
  email: string;
  password: string;
  token: string;
  role: string;
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

@Injectable({
  providedIn: 'root'
})
export class UserService {

  url = environment.apiUrl
  users =  environment.apiEndpoints.users
  userPage = environment.apiEndpoints.userPage
  userPageFilter = environment.apiEndpoints.userPageFilter

  constructor(private http: HttpClient) { }

  createUser(user: any): Observable<User> {
    return this.http.put<User>(this.url + this.users, user)
  }

  deleteUser(email: string | undefined): Observable<null> {
    return this.http.delete<null>(this.url + this.users + email)
  }

  getUsersByPage(page: number, size: number): Observable<UserPage>{
    let params = new HttpParams();
    params = params.append('page', page);
    params = params.append('size', size);
    return this.http.get<UserPage>(this.url + this.userPage,{ params: params });
  }

  getUsersByFiltersPage(usersFilteredPage: UserFilteredPage): Observable<UserPage>{
    return this.http.post<UserPage>(this.url + this.userPageFilter, usersFilteredPage);
  }

  getUserByEmail(email: any): Observable<User>{
    return this.http.get<User>(this.url + this.users + email);
  }
}
