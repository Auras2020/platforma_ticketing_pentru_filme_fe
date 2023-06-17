import { Injectable } from '@angular/core';
import {environment} from "../../../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";

export interface TicketsNr {
  name: string;
  value: number;
}

export interface TicketsPrice {
  name: string;
  value: number;
}

export interface ProductsNr {
  name: string;
  value: number;
}

@Injectable({
  providedIn: 'root'
})
export class Statistics2Service {

  url = environment.apiUrl
  ticketsNrChart = environment.apiEndpoints.ticketsNrChart
  ticketsPriceChart = environment.apiEndpoints.ticketsPriceChart
  productsNrChart = environment.apiEndpoints.productsNrChart

  constructor(private http: HttpClient) { }

  getTicketsNumberFromGivenTheatre(id: number): Observable<TicketsNr[]>{
    return this.http.get<TicketsNr[]>(this.url + this.ticketsNrChart + id);
  }

  getTicketsPriceFromGivenTheatre(id: number): Observable<TicketsPrice[]>{
    return this.http.get<TicketsPrice[]>(this.url + this.ticketsPriceChart + id);
  }

  getProductsNumberFromGivenTheatre(id: number): Observable<ProductsNr[]>{
    return this.http.get<ProductsNr[]>(this.url + this.productsNrChart + id);
  }
}
