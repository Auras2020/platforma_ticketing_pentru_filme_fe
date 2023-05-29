import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "../../../../environments/environment";
import {Observable} from "rxjs";
import {ShowTimings} from "../../homepage-admin/show-timings/show-timings.service";

export interface PeoplePromotion{
  id: number;
  adult: number;
  student: number;
  child: number;
  showTiming: ShowTimings;
}

export interface TicketsPromotion{
  id: number;
  nrTickets: number;
  reduction: number;
  showTiming: ShowTimings;
}

export interface ProductsPromotion{
  id: number;
  nrProducts: number;
  reduction: number;
  showTiming: ShowTimings;
}

@Injectable({
  providedIn: 'root'
})
export class PromotionsService {

  url = environment.apiUrl
  peoplePromotions = environment.apiEndpoints.peoplePromotions
  ticketsPromotions = environment.apiEndpoints.ticketsPromotions
  productsPromotions= environment.apiEndpoints.productsPromotions

  constructor(private http: HttpClient) { }

  createPeoplePromotion(peoplePromotion: any): Observable<PeoplePromotion> {
    return this.http.put<PeoplePromotion>(this.url + this.peoplePromotions, peoplePromotion);
  }

  getPeoplePromotionByShowTimingId(id?: number): Observable<PeoplePromotion> {
    return this.http.get<PeoplePromotion>(this.url + this.peoplePromotions + id);
  }

  createTicketsPromotion(ticketsPromotion: any): Observable<TicketsPromotion> {
    return this.http.put<TicketsPromotion>(this.url + this.ticketsPromotions, ticketsPromotion);
  }

  getTicketsPromotionByShowTimingId(id?: number): Observable<TicketsPromotion[]> {
    return this.http.get<TicketsPromotion[]>(this.url + this.ticketsPromotions + id);
  }

  createProductsPromotion(productsPromotion: any): Observable<ProductsPromotion> {
    return this.http.put<ProductsPromotion>(this.url + this.productsPromotions, productsPromotion);
  }

  getProductsPromotionByShowTimingId(id?: number): Observable<ProductsPromotion[]> {
    return this.http.get<ProductsPromotion[]>(this.url + this.productsPromotions + id);
  }
}
