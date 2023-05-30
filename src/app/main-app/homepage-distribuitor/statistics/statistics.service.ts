import { Injectable } from '@angular/core';
import {Observable} from "rxjs";
import {environment} from "../../../../environments/environment";
import {HttpClient} from "@angular/common/http";

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

export interface ProductsPrice {
  name: string;
  value: number;
}

@Injectable({
  providedIn: 'root'
})
export class StatisticsService {

  url = environment.apiUrl
  ticketsNrChart = environment.apiEndpoints.ticketsNrChart
  ticketsPriceChart = environment.apiEndpoints.ticketsPriceChart
  productsNrChart = environment.apiEndpoints.productsNrChart
  //productsPriceChart = environment.apiEndpoints.productsPriceChart

  constructor(private http: HttpClient) { }

  getTicketsNumber(): Observable<TicketsNr[]>{
    return this.http.get<TicketsNr[]>(this.url + this.ticketsNrChart);
  }

  getTicketsPrice(): Observable<TicketsPrice[]>{
    return this.http.get<TicketsPrice[]>(this.url + this.ticketsPriceChart);
  }

  getProductsNumber(): Observable<ProductsNr[]>{
    return this.http.get<ProductsNr[]>(this.url + this.productsNrChart);
  }

  /*getProductsPrice(): Observable<ProductsPrice[]>{
    return this.http.get<ProductsPrice[]>(this.url + this.productsPriceChart);
  }*/
}
