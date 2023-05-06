import { Injectable } from '@angular/core';
import {Movie} from "../movies/movies.service";
import {Theatre} from "../theatres/theatres.service";
import {environment} from "../../../../environments/environment";
import {HttpClient, HttpParams} from "@angular/common/http";
import {Observable} from "rxjs";

export interface ShowTimings{
  id: number;
  movie: Movie;
  theatre: Theatre;
  startDate: Date;
  endDate: Date;
  time: string;
  day: Date;
  price: number;
}

export interface ShowTimingsFilter{
  movieName: string;
  theatreName: string;
  startDate: Date | null;
  endDate: Date | null;
  day: Date | null;
  searchString: string;
}

export interface ShowTimingsPage{
  showTimings: ShowTimings[];
  currentPage: number;
  totalItems: number;
  totalPages: number;
}

export class ShowTimingsFilteredPage{
  dto: ShowTimingsFilter = {movieName:'',  theatreName:'', startDate: null, endDate: null, day: null, searchString:''};
  page?: number;
  size?: number;
}

@Injectable({
  providedIn: 'root'
})
export class ShowTimingsService {

  url = environment.apiUrl
  showTimings =  environment.apiEndpoints.showTimings
  showTimingsPage = environment.apiEndpoints.showTimingsPage
  showTimingsPageFilter = environment.apiEndpoints.showTimingsPageFilter

  constructor(private http: HttpClient) { }

  createShowTiming(showTiming: any): Observable<ShowTimings> {
    return this.http.put<ShowTimings>(this.url + this.showTimings, showTiming)
  }

  deleteShowTiming(id: number | undefined): Observable<null> {
    return this.http.delete<null>(this.url + this.showTimings + id)
  }

  getShowTimingsByPage(page: number, size: number): Observable<ShowTimingsPage>{
    let params = new HttpParams();
    params = params.append('page', page);
    params = params.append('size', size);
    return this.http.get<ShowTimingsPage>(this.url + this.showTimingsPage,{ params: params });
  }

  getShowTimingsByFiltersPage(showTimingsFilteredPage: ShowTimingsFilteredPage): Observable<ShowTimingsPage>{
    return this.http.post<ShowTimingsPage>(this.url + this.showTimingsPageFilter, showTimingsFilteredPage);
  }
}
