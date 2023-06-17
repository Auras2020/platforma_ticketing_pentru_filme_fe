import { Injectable } from '@angular/core';
import {environment} from "../../../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";

export interface TheatreManagerDashboard{
  movies: number;
  venues: number;
  tickets: number;
  products: number;
}

@Injectable({
  providedIn: 'root'
})
export class Dashboard1Service {

  url = environment.apiUrl
  theatreManagerDashboard = environment.apiEndpoints.theatreManagerDashboard

  constructor(private http: HttpClient) { }

  getCurrentInfoTheatreManager(id: number): Observable<TheatreManagerDashboard>{
    return this.http.get<TheatreManagerDashboard>(this.url + this.theatreManagerDashboard + id);
  }
}
