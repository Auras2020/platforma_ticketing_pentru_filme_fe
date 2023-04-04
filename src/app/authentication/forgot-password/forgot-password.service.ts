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

  //public email: string = ''

  constructor(private http: HttpClient) { }

  sendForgotPasswordEmail(email: any){
    //this.email = email.email;
    console.log(email);
    console.log(this.url + this.forgotPasswordApi);
    return this.http.post<Email>(this.url + this.forgotPasswordApi, email);
  }
}
