import { Injectable } from '@angular/core';
import {MovieFilters} from "../../homepage-admin/movies/movies.service";
import {MoviePResponse, TheatreP} from "../movies1/movies1.service";
import {ShowTimings, ShowTimingsFilter} from "../../homepage-admin/show-timings/show-timings.service";
import {environment} from "../../../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";

export interface TheatreManagerShowTimings {
  showTimingFilterDto: ShowTimingsFilter;
  theatreDto: TheatreP;
}

export interface ShowTimingPResponse {
  showTimings: ShowTimings[];
  totalItems: number;
}

@Injectable({
  providedIn: 'root'
})
export class ShowTimings1Service {

  url = environment.apiUrl
  theatreManagerShowTimings = environment.apiEndpoints.theatreManagerShowTimings
  theatreManagerShowTimingsFiltered = environment.apiEndpoints.theatreManagerShowTimingsFiltered

  constructor(private http: HttpClient) { }

  getAllShowTimingsFromATheatre(theatreP: any): Observable<ShowTimingPResponse>{
    return this.http.post<ShowTimingPResponse>(this.url + this.theatreManagerShowTimings, theatreP);
  }

  getAllFilteredShowTimingsFromATheatre(theatreManagerShowTimings: any): Observable<ShowTimingPResponse>{
    return this.http.post<ShowTimingPResponse>(this.url + this.theatreManagerShowTimingsFiltered, theatreManagerShowTimings);
  }
}
