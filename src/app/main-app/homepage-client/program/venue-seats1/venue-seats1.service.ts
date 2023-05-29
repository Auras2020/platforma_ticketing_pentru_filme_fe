import { Injectable } from '@angular/core';
import {environment} from "../../../../../environments/environment";
import {ShowTimings} from "../../../homepage-admin/show-timings/show-timings.service";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {User} from "../../../homepage-admin/user/user.service";
import {ProductDetails} from "../../../homepage-admin/products/products.service";

export interface TicketsProducts {
  showTiming: ShowTimings;
  seats: string[];
  productDetails: ProductDetails[];
  user: User;
  ticketStatus: string;
  productStatus: string;
  nrAdults: number;
  nrStudents: number;
  nrChilds: number;
  ticketsPrice: number;
  ticketsDiscount: number;
  productsPrice: number;
  productsDiscount: number;
}

export interface SeatTicketStatusDto {
  seats: string;
  ticketsStatus: string;
}

@Injectable({
  providedIn: 'root'
})
export class VenueSeats1Service {

  url = environment.apiUrl
  orders = environment.apiEndpoints.orders

  constructor(private http: HttpClient) { }

  createSeat(ticketsProducts: any): Observable<any> {
    return this.http.put<any>(this.url + this.orders, ticketsProducts);
  }

  findSeatsAndTicketsStatusByShowTiming(id: string): Observable<SeatTicketStatusDto[]>{
    return this.http.get<SeatTicketStatusDto[]>(this.url + this.orders + id);
  }
}
