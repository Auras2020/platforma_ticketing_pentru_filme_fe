import { Injectable } from '@angular/core';
import {environment} from "../../../environments/environment";
import {HttpClient} from "@angular/common/http";

export interface ResetPassword{
  subject: string,
  body: string,
  email: string | null,
  password: string | null
}

@Injectable({
  providedIn: 'root'
})
export class ResetPasswordService {
  url = environment.apiUrl
  resetPasswordApi =  environment.apiEndpoints.resetPassword
  constructor(private http: HttpClient) { }

  resetPassword(resetPassword: any){
    return this.http.post<ResetPassword>(this.url + this.resetPasswordApi, resetPassword);
  }
}
