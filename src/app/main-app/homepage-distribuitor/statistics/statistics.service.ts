import { Injectable } from '@angular/core';
import {Observable} from "rxjs";
import {environment} from "../../../../environments/environment";
import {HttpClient} from "@angular/common/http";

export interface TicketsNr {
  name: string;
  value: number;
}

@Injectable({
  providedIn: 'root'
})
export class StatisticsService {

  url = environment.apiUrl
  ticketsNrChart = environment.apiEndpoints.ticketsNrChart

  constructor(private http: HttpClient) { }

  getTicketsNumber(): Observable<TicketsNr[]>{
    return this.http.get<TicketsNr[]>(this.url + this.ticketsNrChart);
  }
}
