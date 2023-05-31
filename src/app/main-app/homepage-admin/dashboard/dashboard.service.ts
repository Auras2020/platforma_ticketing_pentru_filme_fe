import { Injectable } from '@angular/core';
import {environment} from "../../../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";

export interface Dashboard{
  theatres: number;
  movies: number;
  users: number;
  tickets: number;
  products: number;
  reviews: number;
}

@Injectable({
  providedIn: 'root'
})
export class DashboardService {

  url = environment.apiUrl
  dashboard = environment.apiEndpoints.dashboard

  constructor(private http: HttpClient) { }

  getCurrentInfo(): Observable<Dashboard>{
    return this.http.get<Dashboard>(this.url + this.dashboard);
  }
}
