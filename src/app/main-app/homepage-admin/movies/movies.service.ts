import { Injectable } from '@angular/core';
import {environment} from "../../../../environments/environment";
import {HttpClient, HttpParams} from "@angular/common/http";
import {Observable} from "rxjs";

export interface Movie{
  id: number;
  name: string;
  rating: number;
  recommendedAge: number;
  poster: string;
  posterName: string;
  genre: string;
  duration: number;
  actors: string;
  director: string;
  synopsis: string;
  note: number;
  trailerName: string;
}

export interface MovieFilters{
  name: string;
  recommendedAge: string;
  genre: string;
  duration: string;
  actors: string;
  director: string;
  synopsis: string;
  searchString: string;
}

export interface MoviePage{
  movies: Movie[];
  currentPage: number;
  totalItems: number;
  totalPages: number;
}

export class MovieFilteredPage{
  dto: MovieFilters = {name:'', recommendedAge:'', genre:'', duration:'', actors:'', director:'', synopsis:'', searchString:''};
  page?: number;
  size?: number;
}

export class MovieTimes{
  movie?: Movie;
  times?: string[];
}

export interface TheatreMovieDay {
  theatreId: number;
  movieId: number;
  day: Date;
}

export interface MovieFilterAge {
  movieFilter: MovieFilters;
  age: number;
}

@Injectable({
  providedIn: 'root'
})
export class MoviesService {

  url = environment.apiUrl
  movies =  environment.apiEndpoints.movies
  moviePage = environment.apiEndpoints.moviePage
  moviePageFilter = environment.apiEndpoints.moviePageFilter
  movieTheatreDay = environment.apiEndpoints.movieTheatreDay
  currentRunning = environment.apiEndpoints.currentRunning
  soonRunning = environment.apiEndpoints.soonRunning
  moviesTheatre = environment.apiEndpoints.moviesTheatre
  movieShowTimings = environment.apiEndpoints.movieShowTimings
  theatreDay = environment.apiEndpoints.theatreDay
  movieAge = environment.apiEndpoints.movieAge

  constructor(private http: HttpClient) { }

  createMovie(poster: any, trailer: any, movie: any): Observable<Movie> {
    const formData = new FormData();
    if (poster === null) {
      formData.append('photo', new Blob(), '');
    } else {
      formData.append('photo', poster, poster.name);
    }
    formData.append('trailer', trailer);
    formData.append(
      'movie',
      new Blob([JSON.stringify(movie)], {
        type: 'application/json',
      })
    );
    return this.http.put<Movie>(this.url + this.movies, formData)
  }

  deleteMovie(id: number | undefined): Observable<null> {
    return this.http.delete<null>(this.url + this.movies + id)
  }

  getAllMovies(): Observable<Movie[]>{
    return this.http.get<Movie[]>(this.url + this.movies);
  }

  getMoviesByPage(page: number, size: number): Observable<MoviePage>{
    let params = new HttpParams();
    params = params.append('page', page);
    params = params.append('size', size);
    return this.http.get<MoviePage>(this.url + this.moviePage, { params: params });
  }

  getMoviesByFiltersPage(movieFilteredPage: MovieFilteredPage): Observable<MoviePage>{
    return this.http.post<MoviePage>(this.url + this.moviePageFilter, movieFilteredPage);
  }

  getMovie(id: string): Observable<Movie>{
    return this.http.get<Movie>(this.url + this.movies + id);
  }

  getAllMoviesFromATheatreAtAGivenDay(theatreDay: any): Observable<MovieTimes[]>{
    return this.http.post<MovieTimes[]>(this.url + this.movieTheatreDay, theatreDay);
  }

  getAllMoviesCurrentlyRunning(movieFilters: any): Observable<Movie[]>{
    return this.http.post<Movie[]>(this.url + this.currentRunning, movieFilters);
  }

  getAllMoviesRunningSoon(movieFilters: any): Observable<Movie[]>{
    return this.http.post<Movie[]>(this.url + this.soonRunning, movieFilters);
  }

  getRecomendedMovies(movieFilterAge: any): Observable<Movie[]>{
    return this.http.post<Movie[]>(this.url + this.movieAge, movieFilterAge);
  }

  getAllMoviesFromATheatre(id?: number): Observable<Movie[]>{
    return this.http.get<Movie[]>(this.url + this.moviesTheatre + id);
  }

  getAllTimesByShowTiming(theatreMovieDate: any): Observable<string[]>{
    return this.http.post<string[]>(this.url + this.movieShowTimings, theatreMovieDate);
  }
}
