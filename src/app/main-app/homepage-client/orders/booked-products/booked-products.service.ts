import { Injectable } from '@angular/core';
import {
  ShowTimings
} from "../../../homepage-admin/show-timings/show-timings.service";
import {User} from "../../../homepage-admin/user/user.service";
import {ProductDetails} from "../../../homepage-admin/products/products.service";
import {environment} from "../../../../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";

export interface BookedProduct{
  showTiming?: ShowTimings;
  user?: User;
  //productDetails: ProductDetails[];
  count?: number;
  status?: string;
}

export interface BookedProductFilter {
  theatreLocation: string;
  theatreName: string;
  movieName: string;
  day: Date | null;
  name: string;
  status: string;
  searchString: string;
}

export class BookedProductFilteredPage {
  user?: User;
  dto: BookedProductFilter | null = {theatreLocation:'', theatreName: '', movieName: '', day: null, name:'', status:'', searchString:''};
  page?: number;
  size?: number;
}

export class BookedProductP {
  user?: User;
  page?: number;
  size?: number;
}

export interface BookedProductPage {
  bookedProducts: BookedProduct[];
  //currentPage: number;
  totalItems: number;
  //totalPages: number;
}

@Injectable({
  providedIn: 'root'
})
export class BookedProductsService {

  url = environment.apiUrl
  bookedProductsPage = environment.apiEndpoints.bookedProductsPage
  bookedProductsPageFilter = environment.apiEndpoints.bookedProductsPageFilter
  bookedProductsStatus = environment.apiEndpoints.bookedProductsStatus

  constructor(private http: HttpClient) { }

  getBookedProductsByPage(bookedProductFilteredPage: BookedProductP): Observable<BookedProductPage>{
    return this.http.post<BookedProductPage>(this.url + this.bookedProductsPage,bookedProductFilteredPage);
  }

  getBookedProductsByFiltersPage(bookedProductFilteredPage: BookedProductFilteredPage): Observable<BookedProductPage>{
    return this.http.post<BookedProductPage>(this.url + this.bookedProductsPageFilter, bookedProductFilteredPage);
  }

  changeBookedProductsStatus(bookedProduct: BookedProduct): any{
    return this.http.post(this.url + this.bookedProductsStatus, bookedProduct);
  }
}
