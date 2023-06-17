import { Injectable } from '@angular/core';
import {Observable} from "rxjs";
import {Movie, MovieFilters} from "../../homepage-admin/movies/movies.service";
import {environment} from "../../../../environments/environment";
import {HttpClient} from "@angular/common/http";

/*export interface TheatreManagerMovies{
  dto: MovieFilters;
  theatreId: number;
}*/

export class TheatreP {
  theatreId?: number;
  page?: number;
  size?: number;
}

export interface TheatreManagerMovies {
  movieFilterDto: MovieFilters;
  theatreDto: TheatreP;
}

export interface MoviePResponse {
  movies: Movie[];
  totalItems: number;
}

@Injectable({
  providedIn: 'root'
})
export class Movies1Service {

  url = environment.apiUrl
  theatreManagerMovies = environment.apiEndpoints.theatreManagerMovies
  theatreManagerMoviesFiltered = environment.apiEndpoints.theatreManagerMoviesFiltered

  constructor(private http: HttpClient) { }

  getAllMoviesFromATheatre(theatreP: any): Observable<MoviePResponse>{
    return this.http.post<MoviePResponse>(this.url + this.theatreManagerMovies, theatreP);
  }

  getAllFilteredMoviesFromATheatre(theatreManagerMovies: any): Observable<MoviePResponse>{
    return this.http.post<MoviePResponse>(this.url + this.theatreManagerMoviesFiltered, theatreManagerMovies);
  }
}
