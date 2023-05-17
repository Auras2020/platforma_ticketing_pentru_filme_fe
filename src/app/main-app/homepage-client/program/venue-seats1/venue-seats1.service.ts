import { Injectable } from '@angular/core';
import {environment} from "../../../../../environments/environment";
import {ShowTimings} from "../../../homepage-admin/show-timings/show-timings.service";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {User} from "../../../homepage-admin/user/user.service";
import {ProductDetails} from "../../../homepage-admin/products/products.service";

export interface Seat {
  showTiming: ShowTimings;
  seats: string[];
  productDetails: ProductDetails[];
  user: User
}

@Injectable({
  providedIn: 'root'
})
export class VenueSeats1Service {

  url = environment.apiUrl
  seats = environment.apiEndpoints.seats

  constructor(private http: HttpClient) { }

  createSeat(seat: any): Observable<Seat> {
    return this.http.put<Seat>(this.url + this.seats, seat);
  }

  findSeatsByShowTiming(id: string): Observable<string[]>{
    return this.http.get<string[]>(this.url + this.seats + id);
  }
}
