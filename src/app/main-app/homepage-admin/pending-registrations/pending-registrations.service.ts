import { Injectable } from '@angular/core';
import {environment} from "../../../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {UserPResponse} from "../user/user.service";

@Injectable({
  providedIn: 'root'
})
export class PendingRegistrationsService {

  url = environment.apiUrl
  pendingUserPage = environment.apiEndpoints.pendingUserPage
  pendingUserPageFilter = environment.apiEndpoints.pendingUserPageFilter
  usersApproveRequest = environment.apiEndpoints.usersApproveRequest

  constructor(private http: HttpClient) { }

  getAllPendingAccounts(userP: any): Observable<UserPResponse>{
    return this.http.post<UserPResponse>(this.url + this.pendingUserPage, userP);
  }

  getAllFilteredPendingAccounts(adminUsers: any): Observable<UserPResponse>{
    return this.http.post<UserPResponse>(this.url + this.pendingUserPageFilter, adminUsers);
  }

  approveRequest(email: string): Observable<any>{
    return this.http.get(this.url + this.usersApproveRequest + email);
  }
}
