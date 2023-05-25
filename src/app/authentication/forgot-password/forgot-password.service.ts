import { Injectable } from '@angular/core';
import {environment} from "../../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";

export interface Email{
  subject: string,
  body: string,
  email: string | null
}

@Injectable({
  providedIn: 'root'
})
export class ForgotPasswordService {

  url = environment.apiUrl
  forgotPasswordApi =  environment.apiEndpoints.forgotPassword

  constructor(private http: HttpClient) { }

  sendForgotPasswordEmail(email: any){
    return this.http.post<Email>(this.url + this.forgotPasswordApi, email);
  }
}
