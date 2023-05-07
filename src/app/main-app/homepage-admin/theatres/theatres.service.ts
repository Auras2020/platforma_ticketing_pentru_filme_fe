import { Injectable } from '@angular/core';
import {environment} from "../../../../environments/environment";
import {HttpClient, HttpParams} from "@angular/common/http";
import {Observable} from "rxjs";

export interface Theatre{
  id: number;
  name: string;
  poster: string;
  posterName: string;
  location: string;
  address: string;
  email: string;
  phone: string;
}

export interface TheatreFilters{
  name: string;
  location: string;
  address: string;
  searchString: string;
}

export interface TheatrePage{
  theatres: Theatre[];
  currentPage: number;
  totalItems: number;
  totalPages: number;
}

export class TheatreFilteredPage{
  dto: TheatreFilters = {name:'', location:'', address:'', searchString:''};
  page?: number;
  size?: number;
}

@Injectable({
  providedIn: 'root'
})
export class TheatresService {

  url = environment.apiUrl
  theatres =  environment.apiEndpoints.theatres
  theatrePage = environment.apiEndpoints.theatrePage
  theatrePageFilter = environment.apiEndpoints.theatrePageFilter
  theatreLocations = environment.apiEndpoints.theatreLocations
  theatresFilterd = environment.apiEndpoints.theatresFilterd

  constructor(private http: HttpClient) { }

  createTheatre(poster: any, theatre: any): Observable<Theatre> {
    const formData = new FormData();
    if (poster === null) {
      formData.append('photo', new Blob(), '');
    } else {
      formData.append('photo', poster, poster.name);
    }
    formData.append(
      'theatre',
      new Blob([JSON.stringify(theatre)], {
        type: 'application/json',
      })
    );
    return this.http.put<Theatre>(this.url + this.theatres, formData)
  }

  deleteTheatre(id: number | undefined): Observable<null> {
    return this.http.delete<null>(this.url + this.theatres + id)
  }

  getAllTheatres(): Observable<Theatre[]>{
    return this.http.get<Theatre[]>(this.url + this.theatres);
  }

  getTheatresByPage(page: number, size: number): Observable<TheatrePage>{
    let params = new HttpParams();
    params = params.append('page', page);
    params = params.append('size', size);
    return this.http.get<TheatrePage>(this.url + this.theatrePage, { params: params });
  }

  getTheatresByFiltersPage(theatreFilteredPage: TheatreFilteredPage): Observable<TheatrePage>{
    return this.http.post<TheatrePage>(this.url + this.theatrePageFilter, theatreFilteredPage);
  }

  getTheatre(id: number): Observable<Theatre>{
    return this.http.get<Theatre>(this.url + this.theatres + id);
  }

  getAllTheatresLocations(): Observable<string[]>{
    return this.http.get<string[]>(this.url + this.theatreLocations);
  }

  getTheatresByLocation(location: string): Observable<Theatre[]>{
    return this.http.get<Theatre[]>(this.url + this.theatresFilterd + location)
  }
}
