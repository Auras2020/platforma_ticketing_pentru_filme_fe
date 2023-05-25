import { Injectable } from '@angular/core';
import {ShowTimings} from "../../homepage-admin/show-timings/show-timings.service";
import {User} from "../../homepage-admin/user/user.service";
import {environment} from "../../../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {ProductDetails} from "../../homepage-admin/products/products.service";

export interface Order{
  showTiming?: ShowTimings;
  user?: User;
  ticketsCount?: number;
  ticketsStatus?: string;
  productsCount?: number;
  productsStatus?: string;
  createdDate?: Date;
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

export interface TicketDetails {
  id: number;
  venueNumber: number;
  price: number;
  seat: string;
}

export interface UserShowTiming {
  userId: number;
  showTimingId: number;
}

@Injectable({
  providedIn: 'root'
})
export class OrdersService {

  url = environment.apiUrl
  ordersPage = environment.apiEndpoints.ordersPage
  ordersPageFilter = environment.apiEndpoints.ordersPageFilter
  ordersStatus = environment.apiEndpoints.ordersStatus
  ordersTicketsDetails =  environment.apiEndpoints.ordersTicketsDetails
  ordersProductsDetails =  environment.apiEndpoints.ordersProductsDetails
  ordersDate = environment.apiEndpoints.ordersDate

  constructor(private http: HttpClient) { }

  getOrdersByPage(orderFilteredPage: OrderP): Observable<OrderPage>{
    return this.http.post<OrderPage>(this.url + this.ordersPage, orderFilteredPage);
  }

  getOrdersByFiltersPage(orderFilteredPage: OrderFilteredPage): Observable<OrderPage>{
    return this.http.post<OrderPage>(this.url + this.ordersPageFilter, orderFilteredPage);
  }

  changeOrderStatus(order: Order): any{
    return this.http.post(this.url + this.ordersStatus, order);
  }

  getTicketsDetails(order: Order): Observable<TicketDetails[]>{
    return this.http.post<TicketDetails[]>(this.url + this.ordersTicketsDetails, order);
  }

  getBookedProductsDetails(order: Order): Observable<ProductDetails[]>{
    return this.http.post<ProductDetails[]>(this.url + this.ordersProductsDetails, order);
  }

  getLastOrderCreatedByUserAndShowTiming(userShowTiming: UserShowTiming): Observable<Date>{
    return this.http.post<Date>(this.url + this.ordersDate, userShowTiming);
  }
}
