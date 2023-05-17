import { Injectable } from '@angular/core';
import {Theatre} from "../theatres/theatres.service";
import {environment} from "../../../../environments/environment";
import {HttpClient, HttpParams} from "@angular/common/http";
import {Observable} from "rxjs";

export interface Venue {
  id: number;
  theatre: Theatre;
  venueNumber: number;
  rowsNumber: number;
  columnsNumber: number;
}

export interface VenuesFilter {
  location: string;
  theatreName: string;
  searchString: string;
}

export interface VenuesPage {
  venues: Venue[];
  currentPage: number;
  totalItems: number;
  totalPages: number;
}

export class VenuesFilteredPage{
  dto: VenuesFilter = {location: '',  theatreName:'', /*movieName:'', day: null,*/ searchString:''};
  page?: number;
  size?: number;
}

export interface ShowTimingVenue {
  theatreId: number;
  movieId: number;
  day: Date;
  time: string;
}

@Injectable({
  providedIn: 'root'
})
export class VenuesService {
  url = environment.apiUrl
  venues =  environment.apiEndpoints.venues
  venuesPage = environment.apiEndpoints.venuesPage
  venuesPageFilter = environment.apiEndpoints.venuesPageFilter
  venuesTheatre = environment.apiEndpoints.venuesTheatre

  constructor(private http: HttpClient) { }

  createVenue(venue: any): Observable<Venue> {
    return this.http.put<Venue>(this.url + this.venues, venue)
  }

  deleteVenue(id: number | undefined): Observable<null> {
    return this.http.delete<null>(this.url + this.venues + id)
  }

  getVenuesByPage(page: number, size: number): Observable<VenuesPage>{
    let params = new HttpParams();
    params = params.append('page', page);
    params = params.append('size', size);
    return this.http.get<VenuesPage>(this.url + this.venuesPage,{ params: params });
  }

  getVenuesByFiltersPage(venuesFilteredPage: VenuesFilteredPage): Observable<VenuesPage>{
    return this.http.post<VenuesPage>(this.url + this.venuesPageFilter, venuesFilteredPage);
  }

  getAllVenueNumbersOfGivenTheatre(id: number | undefined): Observable<Venue[]> {
    return this.http.get<Venue[]>(this.url + this.venuesTheatre + id)
  }

  getVenue(id: string): Observable<Venue>{
    return this.http.get<Venue>(this.url + this.venues + id);
  }
}
