import { Injectable } from '@angular/core';
import {
  ShowTimings
} from "../../../homepage-admin/show-timings/show-timings.service";
import {User} from "../../../homepage-admin/user/user.service";
import {environment} from "../../../../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {ProductDetails} from "../../../homepage-admin/products/products.service";

export interface Order{
  showTiming?: ShowTimings;
  user?: User;
  ticketsCount?: number;
  ticketsStatus?: string;
  productsCount?: number;
  productsStatus?: string;
}

export interface OrderFilter {
  theatreLocation: string;
  theatreName: string;
  movieName: string;
  day: Date | null;
  productName: string;
  ticketStatus: string;
  productStatus: string;
  searchString: string;
}

export class OrderFilteredPage {
  user?: User;
  dto: OrderFilter | null = {theatreLocation:'', theatreName: '', movieName: '',
    day: null, productName: '', ticketStatus: '', productStatus: '', searchString:''};
  page?: number;
  size?: number;
}

export class OrderP {
  user?: User;
  page?: number;
  size?: number;
}

export interface OrderPage {
  orders: Order[];
  totalItems: number;
}

@Injectable({
  providedIn: 'root'
})
export class BookedProductsService {

  url = environment.apiUrl
  ordersPage = environment.apiEndpoints.ordersPage
  ordersPageFilter = environment.apiEndpoints.ordersPageFilter
  ordersStatus = environment.apiEndpoints.ordersStatus
  ordersDetails =  environment.apiEndpoints.ordersDetails

  constructor(private http: HttpClient) { }

  getBookedProductsByPage(orderFilteredPage: OrderP): Observable<OrderPage>{
    return this.http.post<OrderPage>(this.url + this.ordersPage, orderFilteredPage);
  }

  getBookedProductsByFiltersPage(orderFilteredPage: OrderFilteredPage): Observable<OrderPage>{
    return this.http.post<OrderPage>(this.url + this.ordersPageFilter, orderFilteredPage);
  }

  changeBookedProductsStatus(order: Order): any{
    return this.http.post(this.url + this.ordersStatus, order);
  }

  getBookedProductsDetails(order: Order): Observable<ProductDetails[]>{
    return this.http.post<ProductDetails[]>(this.url + this.ordersDetails, order);
  }
}
